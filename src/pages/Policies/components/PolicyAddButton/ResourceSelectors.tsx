import { useState } from "react";
import { Card } from "@/components/Card";
import { Dialog } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { CloseButton } from "@/components/CloseButton";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { FaPlus } from "react-icons/fa";
import { Flex } from "@/components/Flex";
import { SegmentGroup } from "@/components/SegmentGroup";
import { Collapsible } from "@/components/Collapsible";
import { Input } from "@/components/Input";
import { Field } from "@/components/Field";
import {
  Portal,
  HStack,
  Checkbox,
  NativeSelect,
  Tag,
  Badge,
  ButtonGroup,
} from "@chakra-ui/react";
import { toaster } from "@/components/Toaster";

export default function ResourceSelectors({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (value: number) => void;
}) {
  const [isNewNamespace, setIsNewNamespace] = useState(false);

  return (
    <>
      <Dialog.Root variant="resourceSetUp">
        <Heading variant="center" marginTop="2%" marginBottom="3%">
          Resource Selectors
          <Dialog.Trigger>
            <Button variant="smallFaPlus" marginLeft="3%">
              <FaPlus />
            </Button>
          </Dialog.Trigger>
        </Heading>
        <Flex
          gap="2"
          flexWrap="wrap"
          overflow="auto"
          height="400px"
          maxHeight="400px"
        >
          <Card.Root variant="small">
            <Card.Body variant="small">
              <CloseButton variant="inbox" marginRight="2.5%" />
              <Field.Root variant="horizontal">
                <HStack>
                  <Field.Label>Kind</Field.Label>
                  <Text variant="small">Deployment</Text>
                </HStack>
              </Field.Root>
              <Field.Root variant="horizontal">
                <HStack>
                  <Field.Label>Name</Field.Label>
                  <Text variant="small">test</Text>
                </HStack>
              </Field.Root>
              <Field.Root variant="horizontal">
                <HStack>
                  <Field.Label>Namespace</Field.Label>
                  <Text variant="small">default</Text>
                </HStack>
              </Field.Root>
              <Field.Root variant="horizontal">
                <HStack flexWrap="wrap">
                  <Field.Label>LabelSelectors</Field.Label>
                  <Badge>karmada.policy=samle</Badge>
                  <Badge>app=nginx</Badge>
                </HStack>
              </Field.Root>
              <Field.Root variant="horizontal">
                <HStack flexWrap="wrap">
                  <Field.Label>Annotaions</Field.Label>
                  <Badge>karmada.policy=samle</Badge>
                  <Badge>karmada.policy=samle</Badge>
                  <Badge>karmada.policy=samle</Badge>
                  <Badge>karmada.policy=samle</Badge>
                </HStack>
              </Field.Root>
            </Card.Body>
          </Card.Root>
        </Flex>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content variant="resourceSetUp" margin="10px auto">
              <Dialog.Body variant="resourceSetUp" margin="2%">
                <Field.Root required variant="horizontal">
                  <Field.Label>
                    Kind
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <SegmentGroup.Root defaultValue="Deployment" variant="large">
                    <SegmentGroup.Indicator />
                    <SegmentGroup.Items
                      items={[
                        "Deployment",
                        "Statefulset",
                        "Daemonset",
                        "Cronjob",
                        "Job",
                      ]}
                    />
                  </SegmentGroup.Root>
                </Field.Root>
                <Field.Root required variant="vertical">
                  <HStack gap="3" mb="1%">
                    <Field.Label>
                      Namespace
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Checkbox.Root
                      colorPalette="blue"
                      onChange={() => setIsNewNamespace(!isNewNamespace)}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label className="basic-font">
                        네임스페이스 신규 생성하기
                      </Checkbox.Label>
                    </Checkbox.Root>
                  </HStack>
                  {isNewNamespace ? (
                    <Input id="namespace" />
                  ) : (
                    <NativeSelect.Root>
                      <NativeSelect.Field>
                        <option value="1">default</option>
                        <option value="2">name2</option>
                        <option value="3">space2</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  )}
                </Field.Root>
                <Field.Root required variant="horizontal">
                  <Field.Label>
                    Name
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input placeholder="이름 입력" />
                </Field.Root>
                <Field.Root variant="horizontal">
                  <Collapsible.Root>
                    <HStack gap="3">
                      <Field.Label>Labels</Field.Label>
                      <Collapsible.Trigger>
                        <Button variant="smallFaPlus">
                          <FaPlus />
                        </Button>
                      </Collapsible.Trigger>
                      <Flex>
                        <Tag.Root>
                          <Tag.Label>karmada.policy=first-sample</Tag.Label>
                          <Tag.EndElement>
                            <Tag.CloseTrigger />
                          </Tag.EndElement>
                        </Tag.Root>
                        <Tag.Root>
                          <Tag.Label>app=nginx</Tag.Label>
                          <Tag.EndElement>
                            <Tag.CloseTrigger />
                          </Tag.EndElement>
                        </Tag.Root>
                        <Tag.Root>
                          <Tag.Label>
                            karmada.policy=first-sampleeeeeeee
                          </Tag.Label>
                          <Tag.EndElement>
                            <Tag.CloseTrigger />
                          </Tag.EndElement>
                        </Tag.Root>
                        <Tag.Root>
                          <Tag.Label>
                            karmada.policy=first-sampleeeeeeeeeeeeeeeeeee
                          </Tag.Label>
                          <Tag.EndElement>
                            <Tag.CloseTrigger />
                          </Tag.EndElement>
                        </Tag.Root>
                      </Flex>
                    </HStack>
                    <Collapsible.Content marginTop="2%">
                      <HStack gap="4" m="2%">
                        <Field.Root required>
                          <Field.Label>
                            Key <Field.RequiredIndicator />
                          </Field.Label>
                          <Input bg="white" />
                        </Field.Root>
                        <Field.Root required>
                          <Field.Label>
                            Value <Field.RequiredIndicator />
                          </Field.Label>
                          <Input bg="white" />
                        </Field.Root>
                        <Button variant="mediumFaPlus">
                          <FaPlus />
                        </Button>
                      </HStack>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </Field.Root>
                <Field.Root variant="horizontal">
                  <Collapsible.Root>
                    <HStack gap="3">
                      <Field.Label>Annotations</Field.Label>
                      <Collapsible.Trigger>
                        <Button variant="smallFaPlus">
                          <FaPlus />
                        </Button>
                      </Collapsible.Trigger>
                      <Flex>
                        <Tag.Root>
                          <Tag.Label>karmada.policy=first-sample</Tag.Label>
                          <Tag.EndElement>
                            <Tag.CloseTrigger />
                          </Tag.EndElement>
                        </Tag.Root>
                        <Tag.Root>
                          <Tag.Label>app=nginx</Tag.Label>
                          <Tag.EndElement>
                            <Tag.CloseTrigger />
                          </Tag.EndElement>
                        </Tag.Root>
                      </Flex>
                    </HStack>
                    <Collapsible.Content marginTop="2%">
                      <HStack gap="4" m="2%">
                        <Field.Root required>
                          <Field.Label>
                            Key
                            <Field.RequiredIndicator />
                          </Field.Label>
                          <Input bg="white" />
                        </Field.Root>
                        <Field.Root required>
                          <Field.Label>
                            Value
                            <Field.RequiredIndicator />
                          </Field.Label>
                          <Input bg="white" />
                        </Field.Root>
                        <Button variant="mediumFaPlus">
                          <FaPlus />
                        </Button>
                      </HStack>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </Field.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger>
                  <Button variant="blueOutline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Dialog.Root variant="alert">
                  <Dialog.Trigger>
                    <Button variant="blue">Save</Button>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content variant="alert">
                        <Dialog.Body variant="alert" marginTop="8%">
                          <p>
                            host-cluster에 배포되어 있는 리소스인 경우 삭제를
                            진행할까요?
                          </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Dialog.ActionTrigger>
                            <Button variant="blueOutline">No</Button>
                          </Dialog.ActionTrigger>
                          <Button variant="blue">Yes</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger>
                          <CloseButton />
                        </Dialog.CloseTrigger>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>
              </Dialog.Footer>
              <Dialog.CloseTrigger>
                <CloseButton />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <ButtonGroup width="100%" marginTop="3%">
        <Flex justifyContent="flex-end" width="100%">
          <Flex>
            <Button
              onClick={() => {
                setCurrentStep(currentStep - 1);
              }}
              variant="blueOutline"
              marginRight="5px"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                setCurrentStep(currentStep + 1);
              }}
              variant="blueSurface"
              marginLeft="5px"
              marginRight="5px"
            >
              Next
            </Button>
          </Flex>
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
        </Flex>
      </ButtonGroup>
    </>
  );
}
