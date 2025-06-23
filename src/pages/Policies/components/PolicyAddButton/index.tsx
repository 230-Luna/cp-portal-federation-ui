import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { CloseButton } from "@/components/CloseButton";
import { Portal } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Metadata from "./Metadata";
import ResourceSelectors from "./ResourceSelectors";
import Placement from "./Placement";
import { Progress } from "@/components/Progress";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { CreatePropagationPolicy } from "@/models/propagationPolicyModel";

type Step = "Metadata" | "ResourceSelectors" | "Placement";

export default function PolicyAdd() {
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

  const { register, control } = formData;

  const handleSubmitForm = useMutation({
    mutationFn: async () => {
      console.log("apply");
      // API Post
    },
  });

  return (
    <Dialog.Root variant="resourceSetUp">
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
              <CloseButton onClick={() => setCurrentStep("Metadata")} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
      <DevTool control={control} />
    </Dialog.Root>
  );
}
