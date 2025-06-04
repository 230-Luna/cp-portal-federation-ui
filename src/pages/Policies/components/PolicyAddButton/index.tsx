import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { Flex } from "@/components/Flex";
import { CloseButton } from "@/components/CloseButton";
import { Portal, ButtonGroup } from "@chakra-ui/react";
import Multistep from "@/pages/Policies/components/PolicyAddButton/Multistep";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toaster } from "@/components/Toaster";
import { Progress } from "@/components/Progress";
import Metadata from "./Metadata";
import ResourceSelectors from "./ResourceSelectors";
import Placement from "./Placement";

export default function PolicyAdd() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [formData, setFormData] = useState({});

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
            <Dialog.Body variant="resourceSetUp" margin="2%">
              <Progress value={progress} />
              {step === 1 ? (
                <Metadata />
              ) : step === 2 ? (
                <ResourceSelectors />
              ) : (
                <Placement />
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <ButtonGroup width="100%">
                <Flex justifyContent="flex-end" width="100%">
                  <Flex>
                    {step !== 1 ? (
                      <Button
                        disabled={step === 1}
                        onClick={() => {
                          setStep(step - 1);
                          setProgress(progress - 33.33);
                        }}
                        variant="blueOutline"
                        marginRight="5px"
                      >
                        Back
                      </Button>
                    ) : null}
                    {step !== 3 ? (
                      <Button
                        disabled={step === 3}
                        onClick={() => {
                          setStep(step + 1);
                          if (step === 3) {
                            setProgress(100);
                          } else {
                            setProgress(progress + 33.33);
                          }
                        }}
                        variant="blueSurface"
                        marginLeft="5px"
                        marginRight="5px"
                      >
                        Next
                      </Button>
                    ) : null}
                  </Flex>
                  {step !== 1 ? (
                    <Button
                      onClick={() => {
                        toaster.create({
                          description: "Policy가 생성되었습니다.",
                          // status: "success",
                          duration: 3000,
                          closable: true,
                        });
                      }}
                      variant="blue"
                      marginLeft="5px"
                    >
                      Apply
                    </Button>
                  ) : null}
                </Flex>
              </ButtonGroup>
            </Dialog.Footer>
            <Dialog.CloseTrigger>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
