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
import { MouseEvent, useId, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiCheck, HiX } from "react-icons/hi";
import { Tooltip } from "@/components/Tooltip";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Text } from "@/components/Text";

export default function Metadata({ onNext }: { onNext: () => void }) {
  const watchLevel = useWatch({ name: "level" });
  console.log("watch: ", watchLevel);

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

  return (
    <Controller
      name="level"
      control={control}
      render={({ field }) => {
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
          <Field.Root required variant="horizontal">
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
          </Field.Root>
        );
      }}
    />
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

  return (
    <Controller
      name="data.metadata.namespace"
      control={control}
      rules={{ required: "Namespace is required" }}
      render={({ field, fieldState }) => (
        <Field.Root required variant="vertical" orientation="horizontal">
          <Field.Label>
            Namespace
            <Field.RequiredIndicator />
          </Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field {...field} placeholder="Select Namespace">
              {resourceNamespaceList.namespaces.map((namespace) => (
                <option value={namespace} key={namespace}>
                  {namespace}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          {fieldState.error && (
            <Text color="red.500" fontSize="sm">
              {fieldState.error.message}
            </Text>
          )}
        </Field.Root>
      )}
    />
  );
}

function NameInputField() {
  const { control } = useFormContext();

  return (
    <Controller
      name="data.metadata.name"
      control={control}
      rules={{ required: "Name is required" }}
      render={({ field, fieldState }) => (
        <Field.Root required variant="horizontal">
          <Field.Label>
            Name
            <Field.RequiredIndicator />
          </Field.Label>
          <Input {...field} placeholder="이름 입력" size="xl" />
          {fieldState.error && <span>{fieldState.error.message}</span>}
        </Field.Root>
      )}
    />
  );
}

function LabelCollapsibleInputField() {
  const { control } = useFormContext();
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false); //opencollasible

  return (
    <Controller
      name="data.metadata.labels"
      control={control}
      render={({ field, fieldState }) => {
        const labels: string[] = field.value || [];

        const handleAddLabelClick = (event: MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          if (!keyInput.trim() || !valueInput.trim()) {
            // 앞, 중간 공백도 처리해야함. 유효한 특수문자만 넣도록 해야함
            return;
          }

          const updated = [...labels, `${keyInput}=${valueInput}`];
          field.onChange(updated);
          setKeyInput("");
          setValueInput("");
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
                  <Field.Label>Labels</Field.Label>
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
                          <Field.Root required>
                            <Field.Label>
                              Key <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                              value={keyInput}
                              onChange={(event) =>
                                setKeyInput(event.target.value)
                              }
                            />
                          </Field.Root>
                          <Field.Root required>
                            <Field.Label>
                              Value <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                              value={valueInput}
                              onChange={(event) =>
                                setValueInput(event.target.value)
                              }
                            />
                          </Field.Root>
                        </HStack>
                      </Fieldset.Content>
                      <Button
                        variant="mediumBlue"
                        onClick={(e) => handleAddLabelClick(e)}
                        margin="2.5%"
                      >
                        <FaPlus />
                      </Button>
                    </Flex>
                  </Fieldset.Root>
                </Collapsible.Content>
              </Collapsible.Root>
              {fieldState.error && (
                <Text color="red.500" fontSize="sm" marginTop="1">
                  {fieldState.error.message}
                </Text>
              )}
            </Field.Root>
          </Flex>
        );
      }}
    />
  );
}

function AnnotationCollapsibleInputField() {
  const { control } = useFormContext();
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  return (
    <Controller
      name="data.metadata.annotations"
      control={control}
      render={({ field, fieldState }) => {
        const annotations: string[] = field.value || [];

        const handleAnnotationClick = (
          event: MouseEvent<HTMLButtonElement>
        ) => {
          event.preventDefault();
          if (!keyInput.trim() || !valueInput.trim()) {
            // 앞, 중간 공백도 처리해야함. 유효한 특수문자만 넣도록 해야함
            return;
          }

          const updated = [...annotations, `${keyInput}=${valueInput}`];
          field.onChange(updated);
          setKeyInput("");
          setValueInput("");
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
                  <Field.Label>Annotations</Field.Label>
                  <Collapsible.Trigger>
                    {isCollapsibleOpen == true ? <FaMinus /> : <FaPlus />}
                  </Collapsible.Trigger>
                  <Flex gap={1} wrap="wrap" width="80%">
                    {annotations.map((annotation) => (
                      <Tag.Root key={annotation}>
                        <Tag.Label>{annotation}</Tag.Label>
                        <Tag.EndElement>
                          <Tag.CloseTrigger
                            onClick={() =>
                              handleDeleteAnnotationClick(annotation)
                            }
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
                              value={keyInput}
                              onChange={(event) =>
                                setKeyInput(event.target.value)
                              }
                            />
                          </Field.Root>
                          <Field.Root required>
                            <Field.Label>
                              Value <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                              value={valueInput}
                              onChange={(event) =>
                                setValueInput(event.target.value)
                              }
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
              {fieldState.error && (
                <Text color="redd.500" fontSize="sm" marginTop="1">
                  {fieldState.error.message}
                </Text>
              )}
            </Field.Root>
          </Flex>
        );
      }}
    />
  );
}

function PrserveResourceOnDeletionField() {
  const { control } = useFormContext();
  const id = useId();
  return (
    <Controller
      name="data.metadata.preserveResourceOnDeletion"
      control={control}
      render={({ field }) => {
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
      }}
    />
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
