import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { CloseButton } from "@/components/CloseButton";
import { DialogOpenChangeDetails, Portal } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Metadata from "./Metadata";
import ResourceSelectors from "./ResourceSelectors";
import Placement from "./Placement";
import { Progress } from "@/components/Progress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { toaster } from "@/components/Toaster";
import { createPropagationPolicyApi } from "@/apis/propagationPolicy";
import { ResourceSelector } from "@/models/propagationPolicyModel";

type Step = "Metadata" | "ResourceSelectors" | "Placement";

export type FormValues = {
  level: string;
  data: {
    metadata: {
      name: string;
      namespace: string;
      labels: string[];
      annotations: string[];
      preserveResourceOnDeletion: boolean;
    };
    resourceSelectors: ResourceSelector[];
    placement: {
      clusternames: string[];
      replicaScheduiling: Record<string, any>;
    };
  };
};

export default function PolicyAddButton() {
  const [open, setOpen] = useState(false);

  const steps = ["Metadata", "ResourceSelectors", "Placement"];
  const [currentStep, setCurrentStep] = useState<Step>("Metadata");
  const currentStepIndex = steps.indexOf(currentStep);

  const formData = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      level: "namespace",
      data: {
        metadata: {
          name: "",
          namespace: "",
          labels: [],
          annotations: [],
          preserveResourceOnDeletion: false,
        },
        resourceSelectors: [],
        placement: {
          clusternames: [],
          replicaScheduiling: {},
        },
      },
    },
  });

  const [lastSelecteddLevel, setLastSelectedLevel] = useState("namespace");
  const [resetData, setResetData] = useState(false);

  const queryClient = useQueryClient();

  const handleSubmitForm = useMutation({
    mutationKey: [
      "createPropagationPolicyApi",
      formData.getValues().level,
      formData.getValues().data.metadata.name,
    ],
    mutationFn: async () => {
      let loadingToaster;

      try {
        setOpen(false);
        loadingToaster = toaster.create({
          type: "loading",
          description: `Policy를 추가하고 있습니다.`,
        });

        await createPropagationPolicyApi({
          level: formData.getValues().level,
          data: formData.getValues().data,
        });

        toaster.remove(loadingToaster);
        toaster.success({
          description: `${name} Policy가 추가되었습니다.`,
        });
        queryClient.invalidateQueries({
          queryKey: ["getPropagationPolicyListApi"],
        });
      } catch (error: any) {
        console.error(error.response.data.message);
        toaster.error({
          type: "error",
          description: `${error.response.data.message || "알 수 없는 오류"}`,
        });
      } finally {
        if (loadingToaster) {
          toaster.remove(loadingToaster);
        }
      }
    },
  });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details: DialogOpenChangeDetails) => setOpen(details.open)}
      variant="resourceSetUp"
      closeOnInteractOutside={false}
      onExitComplete={() => setCurrentStep("Metadata")}
      scrollBehavior="outside"
    >
      <Dialog.Trigger>
        <Button variant="largeBlue">
          <FaPlus /> Add
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content variant="resourceSetUp" margin="10px auto">
            <Dialog.Body variant="resourceSetUp" margin="5%">
              <Progress value={((currentStepIndex + 1) / steps.length) * 100} />
              <FormProvider {...formData}>
                {currentStep === "Metadata" && (
                  <Metadata
                    onNext={async () => {
                      const isValid = await formData.trigger([
                        "level",
                        "data.metadata.name",
                        "data.metadata.namespace",
                      ]);
                      if (!isValid) {
                        return;
                      }

                      const currentLevel = formData.getValues("level");
                      if (currentLevel !== lastSelecteddLevel) {
                        setResetData(true);
                        setLastSelectedLevel(currentLevel);
                      } else {
                        setResetData(false);
                      }
                      setCurrentStep("ResourceSelectors");
                    }}
                  />
                )}
                {currentStep === "ResourceSelectors" && (
                  <Suspense fallback={null}>
                    <ResourceSelectors
                      onPrev={() => {
                        setResetData(false);
                        setCurrentStep("Metadata");
                      }}
                      onNext={async () => {
                        const isValid = await formData.trigger([
                          "data.resourceSelectors",
                        ]);
                        if (!isValid) {
                          return;
                        }
                        setCurrentStep("Placement");
                      }}
                      resetData={resetData}
                    />
                  </Suspense>
                )}
                {currentStep === "Placement" && (
                  <Placement
                    onPrev={() => {
                      setResetData(false);
                      setCurrentStep("ResourceSelectors");
                    }}
                    onSubmit={async () => {
                      const isValid = await formData.trigger([
                        "data.placement.clusternames",
                      ]);
                      if (!isValid) {
                        return;
                      }
                      handleSubmitForm.mutate();
                    }}
                    resetData={resetData}
                  />
                )}
              </FormProvider>
            </Dialog.Body>
            <Dialog.CloseTrigger>
              <CloseButton onClick={() => formData.reset()} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
      <DevTool control={formData.control} placement="left" />
    </Dialog.Root>
  );
}
