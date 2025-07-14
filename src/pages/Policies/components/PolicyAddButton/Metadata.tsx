import { getResourceNamespaceListApi } from "@/apis/resource";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Input } from "@/components/Input";
import { RadioCard } from "@/components/RadioCard";
import {
  Badge,
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
import { MouseEvent, useId, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiCheck, HiX } from "react-icons/hi";
import { Tooltip } from "@/components/Tooltip";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { Field } from "@/components/Field";

export default function Metadata({ onNext }: { onNext: () => void }) {
  const watchLevel = useWatch({ name: "level" });

  return (
    <>
      <Heading variant="center" marginTop="2%" marginBottom="3%">
        Metadata
      </Heading>
      <LevelSelectRadioField />
      {watchLevel === "namespace" ? <NamespaceSelectField /> : null}
      <NameInputField />
      <LabelCollapsibleInputField />
      <AnnotationCollapsibleInputField />
      <PrserveResourceOnDeletionField />
      <StepActionButtons onClick={onNext} />
    </>
  );
}

function LevelSelectRadioField() {
  const { control, setValue } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name: "level",
    control,
    rules: { required: "level을 선택하세요" },
  });

  const watchLevel: string = useWatch({ name: "level" });

  const handleValueChange = (details: RadioCardValueChangeDetails) => {
    if (details.value !== null) {
      if (details.value === "namespace") {
        field.onChange(details.value);
      }
      if (details.value === "cluster") {
        field.onChange(details.value);
        setValue("data.metadata.namespace", "");
      }
    }
  };

  return (
    <Field.Root required invalid={Boolean(error)}>
      <Field.Label>
        Level
        <Field.RequiredIndicator />
      </Field.Label>
      <RadioCard.Root
        name="level"
        defaultValue={watchLevel}
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
      {error ? <Field.ErrorText>{error.message}</Field.ErrorText> : null}
    </Field.Root>
  );
}

function NamespaceSelectField() {
  const { data: resourceNamespaceList } = useSuspenseQuery({
    queryKey: ["getResourceNamespaceListApi", "metadata", "namespace"],
    queryFn: () => {
      return getResourceNamespaceListApi({});
    },
  });

  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name: "data.metadata.namespace",
    control,
    rules: { required: "namespace를 선택하세요" },
  });

  return (
    <Field.Root
      required
      invalid={Boolean(error)}
      variant="vertical"
      height="104px"
    >
      <Field.Label>
        Namespace
        <Field.RequiredIndicator />
      </Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          name={field.name}
          value={field.value}
          onChange={(e) => {
            field.onChange(e);
          }}
          ref={field.ref}
          onBlur={field.onBlur}
          placeholder="Select Namespace"
        >
          {resourceNamespaceList.namespaces.map((namespace) => (
            <option value={namespace} key={namespace}>
              {namespace}
            </option>
          ))}
        </NativeSelect.Field>

        <NativeSelect.Indicator />
      </NativeSelect.Root>
      {error ? <Field.ErrorText>{error.message}</Field.ErrorText> : null}
    </Field.Root>
  );
}

function NameInputField() {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name: "data.metadata.name",
    control,
    rules: { required: "name을 입력하세요" },
  });

  return (
    <Field.Root required invalid={Boolean(error)} height="104px">
      <Field.Label>
        Name
        <Field.RequiredIndicator />
      </Field.Label>
      <Input {...field} placeholder="이름 입력" size="xl" />
      {error ? (
        <Field.ErrorText>{error.message}</Field.ErrorText>
      ) : (
        <Field.HelperText></Field.HelperText>
      )}
    </Field.Root>
  );
}

function LabelCollapsibleInputField() {
  const { control } = useFormContext();
  const { field } = useController({
    name: "data.metadata.labels",
    control,
  });

  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  const labels: string[] = field.value || [];

  const [isKeyValid, setIsKeyValid] = useState(false);
  const [isValueValid, setIsValueValid] = useState(false);

  const handleAddLabelClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!keyInput.trim()) {
      setIsKeyValid(true);

      return;
    }
    if (!valueInput.trim()) {
      setIsValueValid(true);
      if (keyInput.trim()) {
        setIsKeyValid(false);
      }
      return;
    }

    const updated = [
      ...labels.filter((label) => !label.startsWith(`${keyInput}=`)),
      `${keyInput}=${valueInput}`,
    ];
    field.onChange(updated);
    setKeyInput("");
    setValueInput("");
    setIsKeyValid(false);
    setIsValueValid(false);
  };

  const handleDeleteLabelClick = (label: string) => {
    const updated = labels.filter((originLabel) => originLabel !== label);
    field.onChange(updated);
  };

  return (
    <Flex padding="1.5% 0">
      <Field.Root variant="horizontal" height="12%">
        <Collapsible.Root
          open={isCollapsibleOpen}
          onOpenChange={() => setIsCollapsibleOpen(!isCollapsibleOpen)}
          width="100%"
        >
          <HStack gap="3">
            <Field.Label>
              Labels
              <Field.RequiredIndicator
                fallback={
                  <Badge size="xs" variant="surface">
                    Optional
                  </Badge>
                }
              />
            </Field.Label>
            <Collapsible.Trigger>
              {isCollapsibleOpen == true ? <FaMinus /> : <FaPlus />}
            </Collapsible.Trigger>
            <Flex gap={1} wrap="wrap" width="80%">
              {labels.map((label) => (
                <Tag.Root key={label}>
                  <Tag.Label>{label}</Tag.Label>
                  <Tag.EndElement>
                    <Tag.CloseTrigger
                      onClick={() => handleDeleteLabelClick(label)}
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
                    <Field.Root required invalid={isKeyValid}>
                      <Field.Label>
                        Key <Field.RequiredIndicator />
                      </Field.Label>
                      <Input
                        value={keyInput}
                        onChange={(event) => setKeyInput(event.target.value)}
                      />
                      {isKeyValid ? (
                        <Field.ErrorText>Key를 입력하세요</Field.ErrorText>
                      ) : (
                        <Field.HelperText></Field.HelperText>
                      )}
                    </Field.Root>
                    <Field.Root required invalid={isValueValid}>
                      <Field.Label>
                        Value <Field.RequiredIndicator />
                      </Field.Label>
                      <Input
                        value={valueInput}
                        onChange={(event) => setValueInput(event.target.value)}
                      />
                      {isValueValid ? (
                        <Field.ErrorText>Value를 입력하세요</Field.ErrorText>
                      ) : (
                        <Field.HelperText></Field.HelperText>
                      )}
                    </Field.Root>
                  </HStack>
                </Fieldset.Content>
                <Button
                  variant="mediumBlue"
                  onClick={(event) => handleAddLabelClick(event)}
                  margin="2.5%"
                >
                  <FaPlus />
                </Button>
              </Flex>
            </Fieldset.Root>
          </Collapsible.Content>
        </Collapsible.Root>
      </Field.Root>
    </Flex>
  );
}

function AnnotationCollapsibleInputField() {
  const { control } = useFormContext();
  const { field } = useController({
    name: "data.metadata.annotations",
    control,
  });

  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  const annotations: string[] = field.value || [];

  const [isKeyValid, setIsKeyValid] = useState(false);
  const [isValueValid, setIsValueValid] = useState(false);

  const handleAnnotationClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!keyInput.trim()) {
      setIsKeyValid(true);

      return;
    }
    if (!valueInput.trim()) {
      setIsValueValid(true);
      if (keyInput.trim()) {
        setIsKeyValid(false);
      }
      return;
    }

    const updated = [
      ...annotations.filter(
        (annotation) => !annotation.startsWith(`${keyInput}=`)
      ),
      `${keyInput}=${valueInput}`,
    ];
    field.onChange(updated);
    setKeyInput("");
    setValueInput("");
    setIsKeyValid(false);
    setIsValueValid(false);
  };

  const handleDeleteAnnotationClick = (annotation: string) => {
    const updated = annotations.filter(
      (originAnnotation) => originAnnotation !== annotation
    );
    field.onChange(updated);
  };

  return (
    <Flex padding="1.5% 0">
      <Field.Root variant="horizontal">
        <Collapsible.Root
          open={isCollapsibleOpen}
          onOpenChange={() => setIsCollapsibleOpen(!isCollapsibleOpen)}
          width="100%"
        >
          <HStack gap="3">
            <Field.Label>
              Annotations
              <Field.RequiredIndicator
                fallback={
                  <Badge size="xs" variant="surface">
                    Optional
                  </Badge>
                }
              />
            </Field.Label>

            <Collapsible.Trigger>
              {isCollapsibleOpen == true ? <FaMinus /> : <FaPlus />}
            </Collapsible.Trigger>
            <Flex gap={1} wrap="wrap" width="80%">
              {annotations.map((annotation) => (
                <Tag.Root key={annotation}>
                  <Tag.Label>{annotation}</Tag.Label>
                  <Tag.EndElement>
                    <Tag.CloseTrigger
                      onClick={() => handleDeleteAnnotationClick(annotation)}
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
                    <Field.Root required invalid={isKeyValid}>
                      <Field.Label>
                        Key <Field.RequiredIndicator />
                      </Field.Label>
                      <Input
                        value={keyInput}
                        onChange={(event) => setKeyInput(event.target.value)}
                      />
                      {isKeyValid ? (
                        <Field.ErrorText>Key를 입력하세요</Field.ErrorText>
                      ) : (
                        <Field.HelperText></Field.HelperText>
                      )}
                    </Field.Root>
                    <Field.Root required invalid={isValueValid}>
                      <Field.Label>
                        Value <Field.RequiredIndicator />
                      </Field.Label>
                      <Input
                        value={valueInput}
                        onChange={(event) => setValueInput(event.target.value)}
                      />
                      {isValueValid ? (
                        <Field.ErrorText>Value를 입력하세요</Field.ErrorText>
                      ) : (
                        <Field.HelperText></Field.HelperText>
                      )}
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
    </Flex>
  );
}

function PrserveResourceOnDeletionField() {
  const { control } = useFormContext();
  const { field } = useController({
    name: "data.metadata.preserveResourceOnDeletion",
    control,
  });
  const id = useId();
  const isChecked = field.value;

  return (
    <Tooltip
      ids={{ trigger: id }}
      content="해당 policy를 삭제할 때 멤버 클러스터에 전파되어있는 리소스들을 같이 삭제할지 선택하는 옵션"
    >
      <Switch.Root
        ids={{ root: id }}
        checked={isChecked}
        onCheckedChange={(event) => field.onChange(event.checked)}
        marginTop="3%"
        size="lg"
        colorPalette="blue"
        required
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

function StepActionButtons({ onClick }: { onClick: () => void }) {
  return (
    <ButtonGroup width="100%" marginTop="3%">
      <Flex justifyContent="flex-end" width="100%">
        <Button
          onClick={() => onClick()}
          variant="blueSurface"
          marginLeft="5px"
          marginRight="5px"
        >
          Next
        </Button>
      </Flex>
    </ButtonGroup>
  );
}
