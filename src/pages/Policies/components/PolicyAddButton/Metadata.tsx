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
  Flex,
  HStack,
  NativeSelect,
  RadioCardValueChangeDetails,
  Tag,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Metadata({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (value: number) => void;
}) {
  const [level, setLevel] = useState("namespace");
  const [checkedNewNamespace, setCheckedNewNamespace] = useState(false);
  const [namespace, setNamespace] = useState("");
  const [name, setName] = useState("");
  const [labels, setLabels] = useState([
    { "karmada.policy": "first-sample" },
    { "test.policy": "test-sample" },
    { thirdpolicy: "sample" },
  ]);

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
      {/* <LabelCollapsibleInputField /> */}
      <Field.Root variant="horizontal">
        <Collapsible.Root>
          <HStack gap="3">
            <Field.Label>Labels</Field.Label>
            <Collapsible.Trigger>
              <Button variant="smallFaPlus">
                <FaPlus />
              </Button>
            </Collapsible.Trigger>
            <Flex gap={1}>
              {labels.map((label) => {
                const [key, value] = Object.entries(label)[0];
                return (
                  <Tag.Root key={key}>
                    <Tag.Label>
                      {key}={value}
                    </Tag.Label>
                    <Tag.EndElement>
                      <Tag.CloseTrigger />
                    </Tag.EndElement>
                  </Tag.Root>
                );
              })}
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
      <AnnotationCollapsibleInputField />
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
  setLevel: (value: string) => void;
  setCheckedNewNamespace: (value: boolean) => void;
  setNamespace: (value: string) => void;
}) {
  const handleLevelChange = (details: RadioCardValueChangeDetails) => {
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
        onValueChange={(details) => handleLevelChange(details)}
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
  setCheckedNewNamespace: (value: boolean) => void;
  setNamespace: (value: string) => void;
}) {
  const { data: namespaceList } = useSuspenseQuery({
    queryKey: ["getNamespaceListApi", "metadata"],
    queryFn: () => {
      return getNamespaceListApi();
    },
  });
  return (
    <Field.Root required variant="vertical">
      <HStack gap="3" mb="1%">
        <Field.Label>
          Namespace
          <Field.RequiredIndicator />
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

function LabelCollapsibleInputField() {
  return (
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
  );
}

function AnnotationCollapsibleInputField() {
  return (
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
  );
}

function StepActionButtons({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (value: number) => void;
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
