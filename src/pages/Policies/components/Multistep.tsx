import { useState } from "react";
import { Card } from "@/components/Card";
import { Dialog } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { CheckboxCard } from "@/components/CheckboxCard";
import { CloseButton } from "@/components/CloseButton";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { FaPlus } from "react-icons/fa";
import { Flex } from "@/components/Flex";
import { Progress } from "@/components/Progress";
import {
  Field,
  FieldLabel,
  Input,
  Portal,
  RadioCard,
  HStack,
  Checkbox,
  NativeSelect,
  Tag,
  SegmentGroup,
  Collapsible,
  Badge,
  Box,
  CheckboxGroup,
} from "@chakra-ui/react";

interface MultistepProps {
  step: number;
  progress: number;
}

export default function Multistep({ step, progress }: MultistepProps) {
  return (
    <>
      <Progress kind="bar" value={progress} />
      {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
    </>
  );
}

const Form1 = () => {
  const [isNewNamespace, setIsNewNamespace] = useState(false);

  return (
    <>
      <Heading variant="center" marginTop="2%" marginBottom="3%">
        Metadata
      </Heading>
      <Field.Root
        mt="2%"
        className="basic-font"
        orientation="horizontal"
        mb="1%"
        required
      >
        <FieldLabel>
          Level
          <Field.RequiredIndicator />
        </FieldLabel>
        <RadioCard.Root
          width="100%"
          defaultValue="namespace"
          colorPalette="blue"
        >
          <HStack gap="5">
            <RadioCard.Item key="namespace" value="namespace" width="100%">
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <RadioCard.ItemText>Namespace</RadioCard.ItemText>
                <RadioCard.ItemIndicator />
              </RadioCard.ItemControl>
            </RadioCard.Item>
            <RadioCard.Item key="cluster" value="cluster" width="100%">
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <RadioCard.ItemText>Cluster</RadioCard.ItemText>
                <RadioCard.ItemIndicator />
              </RadioCard.ItemControl>
            </RadioCard.Item>
          </HStack>
        </RadioCard.Root>
      </Field.Root>
      <Field.Root
        mt="2%"
        className="basic-font"
        orientation="horizontal"
        mb="1%"
        required
      >
        <FieldLabel>
          Name
          <Field.RequiredIndicator />
        </FieldLabel>
        <Input placeholder="이름 입력" />
      </Field.Root>
      <Field.Root mt="2%" className="basic-font" mb="1%" required>
        <HStack gap="3" mb="1%">
          <FieldLabel>
            Namespace
            <Field.RequiredIndicator />
          </FieldLabel>
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
      <Field.Root mt="2%" className="basic-font" mb="1%">
        <Collapsible.Root width="100%">
          <HStack gap="3">
            <FieldLabel>Labels</FieldLabel>
            <Collapsible.Trigger boxSize="10">
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
                <Tag.Label>karmada.policy=first-sampleeeeeeee</Tag.Label>
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
          <Collapsible.Content mt="2%" bg="gray.100">
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
      <Field.Root mt="2%" className="basic-font" mb="1%">
        <Collapsible.Root width="100%">
          <HStack gap="3">
            <FieldLabel>Annotaions</FieldLabel>
            <Collapsible.Trigger boxSize="10">
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
          <Collapsible.Content mt="2%" bg="gray.100">
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
    </>
  );
};

const Form2 = () => {
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
              <Field.Root>
                <HStack>
                  <FieldLabel>Kind</FieldLabel>
                  <Text variant="small">Deployment</Text>
                </HStack>
              </Field.Root>
              <Field.Root>
                <HStack>
                  <FieldLabel>Name</FieldLabel>
                  <Text variant="small">test</Text>
                </HStack>
              </Field.Root>
              <Field.Root>
                <HStack>
                  <FieldLabel>Namespace</FieldLabel>
                  <Text variant="small">default</Text>
                </HStack>
              </Field.Root>
              <Field.Root>
                <HStack>
                  <FieldLabel>LabelSelectors</FieldLabel>
                  <Badge>karmada.policy=samle</Badge>
                  <Badge>app=nginx</Badge>
                </HStack>
              </Field.Root>
              <Field.Root>
                <HStack flexWrap="wrap">
                  <FieldLabel>Annotaions</FieldLabel>
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
                <Field.Root
                  mt="2%"
                  className="basic-font"
                  orientation="horizontal"
                  mb="1%"
                  required
                >
                  <FieldLabel>
                    Kind
                    <Field.RequiredIndicator />
                  </FieldLabel>
                  <SegmentGroup.Root defaultValue="Deployment" size="lg">
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
                <Field.Root
                  mt="2%"
                  className="basic-font"
                  orientation="horizontal"
                  mb="1%"
                  required
                >
                  <FieldLabel>
                    Level
                    <Field.RequiredIndicator />
                  </FieldLabel>
                  <RadioCard.Root
                    width="100%"
                    defaultValue="namespace"
                    colorPalette="blue"
                  >
                    <HStack gap="5">
                      <RadioCard.Item
                        key="namespace"
                        value="namespace"
                        width="100%"
                      >
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl>
                          <RadioCard.ItemText>Namespace</RadioCard.ItemText>
                          <RadioCard.ItemIndicator />
                        </RadioCard.ItemControl>
                      </RadioCard.Item>
                      <RadioCard.Item
                        key="cluster"
                        value="cluster"
                        width="100%"
                      >
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl>
                          <RadioCard.ItemText>Cluster</RadioCard.ItemText>
                          <RadioCard.ItemIndicator />
                        </RadioCard.ItemControl>
                      </RadioCard.Item>
                    </HStack>
                  </RadioCard.Root>
                </Field.Root>
                <Field.Root
                  mt="2%"
                  className="basic-font"
                  orientation="horizontal"
                  mb="1%"
                  required
                >
                  <FieldLabel>
                    Name
                    <Field.RequiredIndicator />
                  </FieldLabel>
                  <Input placeholder="이름 입력" />
                </Field.Root>
                <Field.Root mt="2%" className="basic-font" mb="1%" required>
                  <HStack gap="3" mb="1%">
                    <FieldLabel>
                      Namespace
                      <Field.RequiredIndicator />
                    </FieldLabel>
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
                <Field.Root mt="2%" className="basic-font" mb="1%">
                  <Collapsible.Root width="100%">
                    <HStack gap="3">
                      <FieldLabel>Labels</FieldLabel>
                      <Collapsible.Trigger boxSize="10">
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
                    <Collapsible.Content mt="2%" bg="gray.100">
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
                <Field.Root mt="2%" className="basic-font" mb="1%">
                  <Collapsible.Root width="100%">
                    <HStack gap="3">
                      <FieldLabel>Annotaions</FieldLabel>
                      <Collapsible.Trigger boxSize="10">
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
                    <Collapsible.Content mt="2%" bg="gray.100">
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
    </>
  );
};

const Form3 = () => {
  const [isClusterNames, setIsClusterNames] = useState(false);
  const [isType, setIsType] = useState(false);
  const [isDivisionPreference, setIsDivisionPreference] = useState(false);

  return (
    <>
      <Heading variant="center" marginTop="2%" marginBottom="3%">
        Placement
      </Heading>
      <Text variant="subTitle" marginTop="1.5%">
        Cluster Affinity
      </Text>
      <Flex>
        <Field.Root
          mt="2%"
          className="basic-font"
          orientation="horizontal"
          mb="1%"
          width="180px"
        >
          <FieldLabel>
            <Checkbox.Root
              colorPalette="blue"
              onChange={() => setIsClusterNames(!isClusterNames)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label width="180px">Cluster Names</Checkbox.Label>
            </Checkbox.Root>
          </FieldLabel>
        </Field.Root>
        {isClusterNames && (
          <CheckboxGroup>
            <Flex justify="flex-start">
              <Box>
                <CheckboxCard.Root>
                  <CheckboxCard.HiddenInput />
                  <CheckboxCard.Control>
                    <CheckboxCard.Label>member1</CheckboxCard.Label>
                    <CheckboxCard.Indicator />
                  </CheckboxCard.Control>
                </CheckboxCard.Root>
              </Box>
              <Box>
                <CheckboxCard.Root>
                  <CheckboxCard.HiddenInput />
                  <CheckboxCard.Control>
                    <CheckboxCard.Label>member2</CheckboxCard.Label>
                    <CheckboxCard.Indicator />
                  </CheckboxCard.Control>
                </CheckboxCard.Root>
              </Box>
              <Box>
                <CheckboxCard.Root>
                  <CheckboxCard.HiddenInput />
                  <CheckboxCard.Control>
                    <CheckboxCard.Label>member23</CheckboxCard.Label>
                    <CheckboxCard.Indicator />
                  </CheckboxCard.Control>
                </CheckboxCard.Root>
              </Box>
            </Flex>
          </CheckboxGroup>
        )}
      </Flex>
      <Text variant="subTitle" marginTop="1.5%">
        Replica Scheduling
      </Text>
      <Flex marginBottom="2%">
        <Field.Root
          mt="2%"
          className="basic-font"
          orientation="horizontal"
          mb="1%"
          width="180px"
        >
          <FieldLabel>
            <Checkbox.Root
              colorPalette="blue"
              onChange={() => setIsType(!isType)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label width="180px">Type</Checkbox.Label>
            </Checkbox.Root>
          </FieldLabel>
        </Field.Root>
        {isType && (
          <RadioCard.Root width="100%" colorPalette="blue">
            <Flex justify="flex-start">
              <RadioCard.Item value="duplicated" width="100%">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemText>Duplicated</RadioCard.ItemText>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
              <RadioCard.Item value="divided" width="100%">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemText>Divided</RadioCard.ItemText>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
            </Flex>
          </RadioCard.Root>
        )}
      </Flex>
      <Flex marginBottom="2%">
        <Field.Root
          mt="2%"
          className="basic-font"
          orientation="horizontal"
          mb="1%"
          width="180px"
        >
          <FieldLabel>
            <Checkbox.Root
              colorPalette="blue"
              onChange={() => setIsDivisionPreference(!isDivisionPreference)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label width="180px">Division Preference</Checkbox.Label>
            </Checkbox.Root>
          </FieldLabel>
        </Field.Root>
        {isDivisionPreference && (
          <RadioCard.Root width="100%" colorPalette="blue">
            <Flex justify="flex-start">
              <RadioCard.Item value="aggregated" width="100%">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemText>Aggregated</RadioCard.ItemText>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
              <RadioCard.Item value="weighted" width="100%">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemText>Weighted</RadioCard.ItemText>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
            </Flex>
          </RadioCard.Root>
        )}
      </Flex>
      <Field.Root className="basic-font" mb="1%">
        <HStack gap="3">
          <FieldLabel> Weight Preference</FieldLabel>
          <Button variant="smallFaPlus">
            <FaPlus />
          </Button>
        </HStack>
      </Field.Root>
      <Flex overflowY="auto" maxHeight="250px">
        <Box p="2%" bg="gray.100" m="1%" position="relative">
          <CloseButton variant="inbox" marginRight="2.5%" />
          <Box width="680px">
            <Flex>
              <Field.Root
                mt="2%"
                className="basic-font"
                orientation="horizontal"
                mb="1%"
                required
                width="130px"
              >
                <FieldLabel whiteSpace="nowrap">
                  - Target Cluster
                  <Field.RequiredIndicator />
                </FieldLabel>
              </Field.Root>
              <CheckboxGroup>
                <Flex justify="flex-start">
                  <Box>
                    <CheckboxCard.Root>
                      <CheckboxCard.HiddenInput />
                      <CheckboxCard.Control>
                        <CheckboxCard.Label>member1</CheckboxCard.Label>
                        <CheckboxCard.Indicator />
                      </CheckboxCard.Control>
                    </CheckboxCard.Root>
                  </Box>
                  <Box>
                    <CheckboxCard.Root>
                      <CheckboxCard.HiddenInput />
                      <CheckboxCard.Control>
                        <CheckboxCard.Label>member2</CheckboxCard.Label>
                        <CheckboxCard.Indicator />
                      </CheckboxCard.Control>
                    </CheckboxCard.Root>
                  </Box>
                  <Box>
                    <CheckboxCard.Root>
                      <CheckboxCard.HiddenInput />
                      <CheckboxCard.Control>
                        <CheckboxCard.Label>member23</CheckboxCard.Label>
                        <CheckboxCard.Indicator />
                      </CheckboxCard.Control>
                    </CheckboxCard.Root>
                  </Box>
                </Flex>
              </CheckboxGroup>
            </Flex>
            <Field.Root
              mt="2%"
              className="basic-font"
              orientation="horizontal"
              mb="1%"
              required
              width="650px"
            >
              <FieldLabel mr="7%">
                - Weight
                <Field.RequiredIndicator />
              </FieldLabel>
              <Input />
            </Field.Root>
          </Box>
        </Box>
      </Flex>
    </>
  );
};
