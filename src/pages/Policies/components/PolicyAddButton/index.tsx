import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { CloseButton } from "@/components/CloseButton";
import { Portal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Metadata from "./Metadata";
import ResourceSelectors from "./ResourceSelectors";
import Placement from "./Placement";
import { Progress } from "@/components/Progress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { CreatePropagationPolicy } from "@/models/propagationPolicyModel";
import { toaster } from "@/components/Toaster";
import { createPropagationPolicyApi } from "@/apis/propagationPolicy";

type Step = "Metadata" | "ResourceSelectors" | "Placement";

export default function PolicyAdd() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const steps: Step[] = ["Metadata", "ResourceSelectors", "Placement"];
  const [currentStep, setCurrentStep] = useState<Step>("Metadata");
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const formData = useForm<CreatePropagationPolicy>({
    defaultValues: {
      metadata: {
        namespace: "",
        name: "",
        labels: [],
        annotations: [],
        preserveResourceOnDeletion: false,
      },
      resourceSelectors: [],
      placement: {
        clusternames: [],
        replicaScheduiling: {
          replicaSchedulingType: "Duplicated",
          replicaDivisionpreference: "Aggregated",
          staticWeightList: [],
        },
      },
    },
  });

  const handleSubmitForm = useMutation({
    mutationKey: [
      "createPropagationPolicyApi",
      formData.getValues().metadata.name,
    ],
    mutationFn: async () => {
      let loadingToaster;
      try {
        setOpen(false);
        loadingToaster = toaster.create({
          type: "loading",
          description: `Policy를 추가하고 있습니다.`,
        });
        await createPropagationPolicyApi(formData.getValues());
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
      onOpenChange={(details) => setOpen(details.open)}
      variant="resourceSetUp"
      closeOnInteractOutside={false}
      // onExitComplete={() => setCurrentStep("Metadata")}
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
              <Progress value={progress} />
              <FormProvider {...formData}>
                {currentStep === "Metadata" && (
                  <Metadata
                    onNext={() => setCurrentStep("ResourceSelectors")}
                  />
                )}
                {currentStep === "ResourceSelectors" && (
                  <ResourceSelectors
                    onPrev={() => setCurrentStep("Metadata")}
                    onNext={() => setCurrentStep("Placement")}
                  />
                )}
                {currentStep === "Placement" && (
                  <Placement
                    onPrev={() => setCurrentStep("ResourceSelectors")}
                    onSubmit={() => handleSubmitForm.mutate()}
                  />
                )}
              </FormProvider>
            </Dialog.Body>
            <Dialog.CloseTrigger>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
      <DevTool control={formData.control} />
    </Dialog.Root>
  );
}
