import { getResourceNamespaceListApi } from "@/apis/resource";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { Heading } from "@/components/Heading";
import { Input } from "@/components/Input";
import { RadioCard } from "@/components/RadioCard";
import {
  ButtonGroup,
  Collapsible,
  Fieldset,
  Flex,
  HStack,
  NativeSelect,
  RadioCardValueChangeDetails,
  Switch,
  Tag,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useId,
  useRef,
  useState,
} from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiCheck, HiX } from "react-icons/hi";
import { Tooltip } from "@/components/Tooltip";

export default function Metadata({
  onNext,
  level,
  onLevel,
}: {
  onNext: () => void;
  level: "namespace" | "cluster";
  onLevel: Dispatch<SetStateAction<string>>;
}) {
  const [namespace, setNamespace] = useState("");
  const [name, setName] = useState("");
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [annotations, setAnnotations] = useState<Record<string, string>>({});
  const [preserveResourceOndeletion, setPreserveResourceOndeletion] =
    useState(false);

  console.log("level : ", level);

  return (
    <>
      <Heading variant="center" marginTop="2%" marginBottom="3%">
        Metadata
      </Heading>
      <LevelSelectRadioField onLevel={onLevel} setNamespace={setNamespace} />
      {level === "namespace" ? (
        <NamespaceSelectField
          namespace={namespace}
          setNamespace={setNamespace}
        />
      ) : null}
      <NameInputField name={name} setName={setName} />
      <LabelCollapsibleInputField labels={labels} setLabels={setLabels} />
      <AnnotationCollapsibleInputField
        annotations={annotations}
        setAnnotations={setAnnotations}
      />
      <PrserveResourceOnDeletionField
        checked={preserveResourceOndeletion}
        setChecked={setPreserveResourceOndeletion}
      />
      <StepActionButtons onNext={onNext} />
    </>
  );
}

function LevelSelectRadioField({
  onLevel,
  setNamespace,
}: {
  onLevel: Dispatch<SetStateAction<string>>;
  setNamespace: Dispatch<SetStateAction<string>>;
}) {
  const handleValueChange = (details: RadioCardValueChangeDetails) => {
    if (details.value !== null) {
      console.log("LevelSelect: ", details.value);
      onLevel(details.value);
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

function NamespaceSelectField({
  namespace,
  setNamespace,
}: {
  namespace: string;
  setNamespace: Dispatch<SetStateAction<string>>;
}) {
  const { data: resourceNamespaceList } = useSuspenseQuery({
    queryKey: ["getResourceNamespaceListApi", "metadata", "namespace"],
    queryFn: () => {
      return getResourceNamespaceListApi({});
    },
  });

  return (
    <Field.Root required variant="vertical" orientation="horizontal">
      <Field.Label>
        Namespace
        <Field.RequiredIndicator />
      </Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          name="namespaces"
          placeholder="Select Namespace"
          value={namespace}
          onChange={(event) => setNamespace(event.target.value)}
        >
          {resourceNamespaceList.namespaces.map((namespace) => (
            <option value={namespace} key={namespace}>
              {namespace}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
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

function LabelCollapsibleInputField({
  labels,
  setLabels,
}: {
  labels: Record<string, string>;
  setLabels: Dispatch<SetStateAction<Record<string, string>>>;
}) {
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

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
      <Collapsible.Root
        open={isCollapsibleOpen}
        onOpenChange={() => setIsCollapsibleOpen(!isCollapsibleOpen)}
        width="100%"
      >
        <HStack gap="3">
          <Field.Label>Labels</Field.Label>
          <Collapsible.Trigger>
            {isCollapsibleOpen == true ? <FaMinus /> : <FaPlus />}
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
                variant="mediumBlue"
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
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

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
      <Collapsible.Root
        open={isCollapsibleOpen}
        onOpenChange={() => setIsCollapsibleOpen(!isCollapsibleOpen)}
        width="100%"
      >
        <HStack gap="3">
          <Field.Label>Annotations</Field.Label>
          <Collapsible.Trigger>
            {isCollapsibleOpen == true ? <FaMinus /> : <FaPlus />}
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
                variant="mediumBlue"
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

function PrserveResourceOnDeletionField({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}) {
  const id = useId();
  return (
    <Tooltip
      ids={{ trigger: id }}
      content="해당 policy를 삭제할 때 멤버 클러스터에 전파되어있는 리소스들을 같이 삭제할지 선택하는 옵션"
    >
      <Switch.Root
        ids={{ root: id }}
        checked={checked}
        onCheckedChange={(event) => setChecked(event.checked)}
        marginTop="3%"
        size="lg"
        colorPalette="blue"
      >
        <Switch.Label fontSize="20px">
          Preserve Resource On Deletion
        </Switch.Label>
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb>
            <Switch.ThumbIndicator fallback={<HiX color="black" />}>
              <HiCheck />
            </Switch.ThumbIndicator>
          </Switch.Thumb>
        </Switch.Control>
      </Switch.Root>
    </Tooltip>
  );
}

function StepActionButtons({ onNext }: { onNext: () => void }) {
  return (
    <ButtonGroup width="100%" marginTop="3%">
      <Flex justifyContent="flex-end" width="100%">
        <Flex>
          <Button
            onClick={() => onNext()}
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
