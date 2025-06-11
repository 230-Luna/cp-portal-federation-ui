import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
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
  SegmentGroupValueChangeDetails,
  Fieldset,
} from "@chakra-ui/react";
import { toaster } from "@/components/Toaster";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getNamespaceListApi } from "@/apis/namespace";

export default function ResourceSelectors({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) {
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
          <ResouceSelectorViewer />
        </Flex>
        <ResourceSelectorCreator />
      </Dialog.Root>
      <StepActionButtons
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  );
}

function ResouceSelectorViewer() {
  return (
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
  );
}

function ResourceSelectorCreator() {
  const [kind, setKind] = useState("Deployment");
  const [checkedNewNamespace, setCheckedNewNamespace] = useState(false);
  const [namespace, setNamespace] = useState("");
  const [name, setName] = useState("");
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [annotations, setAnnotations] = useState<Record<string, string>>({});
  console.log(kind);

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content variant="resourceSetUp" margin="10px auto">
          <Dialog.Body variant="resourceSetUp" margin="2%">
            <KindSelectRadioField kind={kind} setKind={setKind} />
            <NamespaceField
              namespace={namespace}
              checkedNewNamespace={checkedNewNamespace}
              setCheckedNewNamespace={setCheckedNewNamespace}
              setNamespace={setNamespace}
            />
            <NameInputField name={name} setName={setName} />
            <LabelCollapsibleInputField labels={labels} setLabels={setLabels} />
            <AnnotationCollapsibleInputField
              annotations={annotations}
              setAnnotations={setAnnotations}
            />
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
  );
}

function KindSelectRadioField({
  kind,
  setKind,
}: {
  kind: string;
  setKind: Dispatch<SetStateAction<string>>;
}) {
  const handleValueChange = (details: SegmentGroupValueChangeDetails) => {
    if (details.value !== null) {
      setKind(details.value);
    }
  };

  return (
    <Field.Root required variant="horizontal">
      <Field.Label>
        Kind
        <Field.RequiredIndicator />
      </Field.Label>
      <SegmentGroup.Root
        defaultValue="Deployment"
        value={kind}
        onValueChange={(details) => handleValueChange(details)}
        variant="large"
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items
          items={["Deployment", "Statefulset", "Daemonset", "Cronjob", "Job"]}
        />
      </SegmentGroup.Root>
    </Field.Root>
  );
}

function NamespaceField({
  namespace,
  checkedNewNamespace,
  setCheckedNewNamespace,
  setNamespace,
}: {
  namespace: string;
  checkedNewNamespace: boolean;
  setCheckedNewNamespace: Dispatch<SetStateAction<boolean>>;
  setNamespace: Dispatch<SetStateAction<string>>;
}) {
  const { data: namespaceList } = useSuspenseQuery({
    queryKey: ["getNamespaceListApi", "resourceSelectors"],
    queryFn: () => {
      return getNamespaceListApi();
    },
  });
  return (
    <>
      <Field.Root variant="vertical">
        <HStack gap="3" mb="1%">
          <Field.Label>
            Namespace <Text color="red.500">*</Text>
            {/* <Field.RequiredIndicator /> */}
          </Field.Label>
          <Checkbox.Root
            colorPalette="blue"
            checked={checkedNewNamespace}
            onCheckedChange={(e) => {
              setCheckedNewNamespace(!!e.checked);
              setNamespace("");
            }}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>네임스페이스 신규 생성하기</Checkbox.Label>
          </Checkbox.Root>
        </HStack>
      </Field.Root>
      <Field.Root required variant="vertical">
        {checkedNewNamespace ? (
          <Input id="namespace" bg="white" />
        ) : (
          <NativeSelect.Root>
            <NativeSelect.Field
              name="namespaces"
              placeholder="Select Namespace"
              value={namespace}
              onChange={(event) => setNamespace(event.target.value)}
            >
              {namespaceList.namespaces.map((namespace) => (
                <option value={namespace} key={namespace}>
                  {namespace}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        )}
      </Field.Root>
    </>
  );
}

function NameInputField({
  name,
  setName,
}: {
  name: string;
  setName: (name: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Field.Root required variant="horizontal">
      <Field.Label>
        Name
        <Field.RequiredIndicator />
      </Field.Label>
      <Input
        ref={inputRef}
        placeholder="이름 입력"
        value={name}
        onChange={(event) => setName(event.target.value)}
        size="xl"
      />
    </Field.Root>
  );
}

function LabelCollapsibleInputField({
  labels,
  setLabels,
}: {
  labels: Record<string, string>;
  setLabels: Dispatch<SetStateAction<Record<string, string>>>;
}) {
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const handleAddLabelClick = (event: FormEvent) => {
    event.preventDefault();
    setLabels((prev) => ({ ...prev, [keyInput]: valueInput }));
    setKeyInput("");
    setValueInput("");
  };

  const handleDeleteLabelClick = (key: string) => {
    setLabels((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([originKey, _]) => originKey !== key)
      )
    );
  };

  return (
    <Field.Root variant="horizontal">
      <Collapsible.Root width="100%">
        <HStack gap="3">
          <Field.Label>Labels</Field.Label>
          <Collapsible.Trigger>
            <FaPlus />
          </Collapsible.Trigger>
          <Flex gap={1} wrap="wrap" width="80%">
            {Object.entries(labels).map(([key, value]) => (
              <Tag.Root key={key}>
                <Tag.Label>
                  {key}={value}
                </Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger
                    onClick={() => handleDeleteLabelClick(key)}
                  />
                </Tag.EndElement>
              </Tag.Root>
            ))}
          </Flex>
        </HStack>
        <Collapsible.Content marginTop="2%">
          <Fieldset.Root>
            <Flex alignItems="end">
              <Fieldset.Content>
                <HStack gap="4" m="2%">
                  <Field.Root required>
                    <Field.Label>
                      Key <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      bg="white"
                      value={keyInput}
                      onChange={(event) => setKeyInput(event.target.value)}
                    />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>
                      Value <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      bg="white"
                      value={valueInput}
                      onChange={(event) => setValueInput(event.target.value)}
                    />
                  </Field.Root>
                  <Button
                    variant="mediumFaPlus"
                    onClick={handleAddLabelClick}
                    margin="2.5%"
                  >
                    <FaPlus />
                  </Button>
                </HStack>
              </Fieldset.Content>
            </Flex>
          </Fieldset.Root>
        </Collapsible.Content>
      </Collapsible.Root>
    </Field.Root>
  );
}

function AnnotationCollapsibleInputField({
  annotations,
  setAnnotations,
}: {
  annotations: Record<string, string>;
  setAnnotations: Dispatch<SetStateAction<Record<string, string>>>;
}) {
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const handleAnnotationClick = (event: FormEvent) => {
    event.preventDefault();
    setAnnotations((prev) => ({ ...prev, [keyInput]: valueInput }));
    setKeyInput("");
    setValueInput("");
  };

  const handleDeleteAnnotationClick = (key: string) => {
    setAnnotations((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([originKey, _]) => originKey !== key)
      )
    );
  };

  return (
    <Field.Root variant="horizontal">
      <Collapsible.Root width="100%">
        <HStack gap="3">
          <Field.Label>Annotations</Field.Label>
          <Collapsible.Trigger>
            <FaPlus />
          </Collapsible.Trigger>
          <Flex gap={1} wrap="wrap" width="80%">
            {Object.entries(annotations).map(([key, value]) => (
              <Tag.Root key={key}>
                <Tag.Label>
                  {key}={value}
                </Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger
                    onClick={() => handleDeleteAnnotationClick(key)}
                  />
                </Tag.EndElement>
              </Tag.Root>
            ))}
          </Flex>
        </HStack>
        <Collapsible.Content marginTop="2%">
          <Fieldset.Root>
            <Flex alignItems="end">
              <Fieldset.Content>
                <HStack gap="4" m="2%">
                  <Field.Root required>
                    <Field.Label>
                      Key <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      bg="white"
                      value={keyInput}
                      onChange={(event) => setKeyInput(event.target.value)}
                    />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>
                      Value <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      bg="white"
                      value={valueInput}
                      onChange={(event) => setValueInput(event.target.value)}
                    />
                  </Field.Root>
                  <Button
                    variant="mediumFaPlus"
                    onClick={handleAnnotationClick}
                    margin="2.5%"
                  >
                    <FaPlus />
                  </Button>
                </HStack>
              </Fieldset.Content>
            </Flex>
          </Fieldset.Root>
        </Collapsible.Content>
      </Collapsible.Root>
    </Field.Root>
  );
}

function StepActionButtons({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) {
  return (
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
  );
}
