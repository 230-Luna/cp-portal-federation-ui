import { getNamespaceListApi } from "@/apis/namespace";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { Heading } from "@/components/Heading";
import { Input } from "@/components/Input";
import { RadioCard } from "@/components/RadioCard";
import {
  ButtonGroup,
  Checkbox,
  Collapsible,
  Fieldset,
  Flex,
  HStack,
  NativeSelect,
  RadioCardValueChangeDetails,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Metadata({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) {
  const [level, setLevel] = useState("namespace");
  const [checkedNewNamespace, setCheckedNewNamespace] = useState(false);
  const [namespace, setNamespace] = useState("");
  const [name, setName] = useState("");
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [annotations, setAnnotations] = useState<Record<string, string>>({});

  return (
    <>
      <Heading variant="center" marginTop="2%" marginBottom="3%">
        Metadata
      </Heading>
      <LevelSelectRadioField
        setLevel={setLevel}
        setCheckedNewNamespace={setCheckedNewNamespace}
        setNamespace={setNamespace}
      />
      {level === "namespace" ? (
        <NamespaceField
          namespace={namespace}
          checkedNewNamespace={checkedNewNamespace}
          setCheckedNewNamespace={setCheckedNewNamespace}
          setNamespace={setNamespace}
        />
      ) : null}
      <NameInputField name={name} setName={setName} />
      <LabelCollapsibleInputField labels={labels} setLabels={setLabels} />
      <AnnotationCollapsibleInputField
        annotations={annotations}
        setAnnotations={setAnnotations}
      />
      <StepActionButtons
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  );
}

function LevelSelectRadioField({
  setLevel,
  setCheckedNewNamespace,
  setNamespace,
}: {
  setLevel: Dispatch<SetStateAction<string>>;
  setCheckedNewNamespace: Dispatch<SetStateAction<boolean>>;
  setNamespace: Dispatch<SetStateAction<string>>;
}) {
  const handleValueChange = (details: RadioCardValueChangeDetails) => {
    if (details.value !== null) {
      setLevel(details.value);
      setCheckedNewNamespace(false);
      setNamespace("");
    }
  };

  return (
    <Field.Root required variant="horizontal">
      <Field.Label>
        Level
        <Field.RequiredIndicator />
      </Field.Label>
      <RadioCard.Root
        name="level"
        defaultValue="namespace"
        onValueChange={(details) => handleValueChange(details)}
      >
        <HStack gap="5">
          <RadioCard.Item key="namespace" value="namespace">
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemText>Namespace</RadioCard.ItemText>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
          <RadioCard.Item key="cluster" value="cluster">
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemText>Cluster</RadioCard.ItemText>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        </HStack>
      </RadioCard.Root>
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
    queryKey: ["getNamespaceListApi", "metadata"],
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
                </HStack>
              </Fieldset.Content>
              <Button
                variant="mediumFaPlus"
                onClick={handleAddLabelClick}
                margin="2.5%"
              >
                <FaPlus />
              </Button>
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
                </HStack>
              </Fieldset.Content>
              <Button
                variant="mediumFaPlus"
                onClick={handleAnnotationClick}
                margin="2.5%"
              >
                <FaPlus />
              </Button>
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
              setCurrentStep(currentStep + 1);
            }}
            variant="blueSurface"
            marginLeft="5px"
            marginRight="5px"
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </ButtonGroup>
  );
}
