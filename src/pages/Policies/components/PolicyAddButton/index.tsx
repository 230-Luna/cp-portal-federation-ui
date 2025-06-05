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

export default function PolicyAdd() {
  const totalStep = 3;
  const [currentStep, setCurrentStep] = useState(1);
  const progress = (100 / totalStep) * currentStep;


  const [formData, setFormData] = useState({
    metadata: {
      level: "",
      namespace: "",
      name: "",
      labels: [""],
      annotations: [""],
    },
    resourceselectors: [
      {
        kind: "",
        namespace: "",
        name: "",
        labels: [""],
        annotations: [""],
      },
    ],
    placement: {
      clusternames: [],
      type: "",
      divisionpreference: "",
      weightpreference: [
        {
          targetcluster: [""],
          weight: 1,
        },
      ],
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
              {currentStep === 1 ? (
                <Metadata
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              ) : currentStep === 2 ? (
                <ResourceSelectors
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              ) : (
                <Placement
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              )}
            </Dialog.Body>
            <Dialog.CloseTrigger>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
