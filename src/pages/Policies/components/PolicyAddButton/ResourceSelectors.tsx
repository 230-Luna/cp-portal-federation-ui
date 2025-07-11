import { Card } from "@/components/Card";
import { Dialog } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { CloseButton } from "@/components/CloseButton";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { FaPlus } from "react-icons/fa";
import { Flex } from "@/components/Flex";
import { SegmentGroup } from "@/components/SegmentGroup";
import { Field } from "@/components/Field";
import {
  Portal,
  HStack,
  NativeSelect,
  Badge,
  ButtonGroup,
  Input,
  SegmentGroupValueChangeDetails,
  Select,
  createListCollection,
  SelectValueChangeDetails,
  Checkbox,
  Highlight,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  getResourceLabelListApi,
  getResourceNameListApi,
  getResourceNamespaceListApi,
} from "@/apis/resource";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormValues } from ".";

export default function ResourceSelectors({
  onPrev,
  onNext,
  resetData,
}: {
  onPrev: () => void;
  onNext: () => void;
  resetData: boolean;
}) {
  return (
    <>
      <Heading variant="center" marginTop="2%" marginBottom="3%">
        Resource Selectors
        <Dialog.Root
          variant="resourceSetUp"
          key="creator"
          closeOnInteractOutside={false}
        >
          <Dialog.Trigger>
            <Button type="button" variant="smallBlue" marginLeft="3%">
              <FaPlus />
            </Button>
          </Dialog.Trigger>
          <ResourceSelectorCreator />
        </Dialog.Root>
      </Heading>

      <Flex
        gap="2"
        flexWrap="wrap"
        overflow="auto"
        height="400px"
        maxHeight="400px"
      >
        <ResouceSelectorViewer resetData={resetData} />
      </Flex>
      <StepActionButtons onPrev={onPrev} onNext={onNext} />
    </>
  );
}

function ResouceSelectorViewer({ resetData }: { resetData: boolean }) {
  const { control, resetField } = useFormContext<FormValues>();
  // const { field,  fieldState: { error }, } = useController({
  //   name: "data.resourceSelectors",
  //   control,
    // rules: { required: "resourceSelector가 적어도 하나 필요합니다" },
  // });
  const { remove } = useFieldArray({
    control,
    name: "data.resourceSelectors",
  });

  const resourceSelectors = useWatch({
    control,
    name: "data.resourceSelectors",
  });

  useEffect(() => {
    if (resetData) {
      resetField("data.resourceSelectors", { defaultValue: [] });
    }
  }, [resetData]);

  return (
    <>
      {resourceSelectors.map((item, index) => {
        return (
          <Card.Root key={index} variant="small" width="49%">
            <Card.Body variant="small">
              <CloseButton
                onClick={() => remove(index)}
                variant="inbox"
                padding="5%"
              />
              <Field.Root variant="horizontal" width="80%">
                <HStack>
                  <Field.Label>Kind</Field.Label>
                  <Text variant="small">{item.kind}</Text>
                </HStack>
              </Field.Root>
              {item.namespace && (
                <Field.Root variant="horizontal">
                  <HStack>
                    <Field.Label>Namespace</Field.Label>
                    <Text variant="small">{item.namespace}</Text>
                  </HStack>
                </Field.Root>
              )}
              {item.name && (
                <Field.Root variant="horizontal">
                  <HStack>
                    <Field.Label>Name</Field.Label>
                    <Text variant="small">{item.name}</Text>
                  </HStack>
                </Field.Root>
              )}
              {Array.isArray(item.labelSelectors) &&
                item.labelSelectors.length > 0 && (
                  <Field.Root variant="horizontal">
                    <HStack flexWrap="wrap">
                      <Field.Label>LabelSelectors</Field.Label>
                      {item.labelSelectors.map((label) => (
                        <Badge key={label}>{label}</Badge>
                      ))}
                    </HStack>
                  </Field.Root>
                )}
            </Card.Body>
          </Card.Root>
        );
      })}
    </>
  );
}

function ResourceSelectorCreator() {
  const { control } = useFormContext();
  // const { field } = useController({
  //   name: "data.resourceSelectors",
  // defaultValue: "{}",
  //   control,
  // });
  const { append } = useFieldArray({
    control,
    name: "data.resourceSelectors",
  });
  const [resourceSelectorData, setResourceSelectorData] = useState({
    kind: "Deployment",
    namespace: "",
    name: "",
    labelSelectors: [] as string[],
  });

  const handleResouceSelectorSave = () => {
    append(resourceSelectorData);
  };

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content variant="resourceSetUp" margin="10px auto">
          <Dialog.Body variant="resourceSetUp" margin="2%">
            <KindSelectRadioField
              value={resourceSelectorData.kind}
              onChange={(value) => {
                setResourceSelectorData((prev) => ({
                  ...prev,
                  kind: value,
                  namespace: "",
                  name: "",
                  labelSelectors: [],
                }));
              }}
            />
            <NamespaceSelectField
              value={resourceSelectorData.namespace}
              onChange={(value) =>
                setResourceSelectorData((prev) => ({
                  ...prev,
                  namespace: value,
                  name: "",
                  labelSelectors: [],
                }))
              }
            />
            <NameSelectField
              kind={resourceSelectorData.kind}
              namespace={resourceSelectorData.namespace}
              value={resourceSelectorData.name}
              onChange={(value) =>
                setResourceSelectorData((prev) => ({
                  ...prev,
                  name: value,
                  labelSelectors: [],
                }))
              }
            />
            <LabelSelectorsField
              kind={resourceSelectorData.kind}
              namespace={resourceSelectorData.namespace}
              value={resourceSelectorData.labelSelectors}
              onChange={(value) =>
                setResourceSelectorData((prev) => ({
                  ...prev,
                  labelSelectors: value,
                }))
              }
            />
            <CheckWanringInfoField value={resourceSelectorData} />
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger>
              <Button variant="blueOutline">Cancel</Button>
            </Dialog.ActionTrigger>
            <Dialog.Trigger>
              <Button onClick={handleResouceSelectorSave} variant="blue">
                Save
              </Button>
            </Dialog.Trigger>
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
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const kindOptions = [
    "Deployment",
    "Statefulset",
    "Daemonset",
    "Cronjob",
    "Job",
  ];

  const handleKindValueChange = (details: SegmentGroupValueChangeDetails) => {
    if (details.value !== null) {
      onChange(details.value);
    }
  };

  return (
    <Field.Root required variant="horizontal">
      <Field.Label>
        Kind
        <Field.RequiredIndicator />
      </Field.Label>
      <SegmentGroup.Root
        value={value}
        onValueChange={handleKindValueChange}
        variant="large"
        width="100%"
      >
        <SegmentGroup.Indicator width="20%" />
        {kindOptions.map((kind) => (
          <SegmentGroup.Item key={kind} value={kind} width="20%">
            <SegmentGroup.ItemHiddenInput />
            <SegmentGroup.ItemText>{kind}</SegmentGroup.ItemText>
          </SegmentGroup.Item>
        ))}
      </SegmentGroup.Root>
      {(() => {
        return null;
      })()}
    </Field.Root>
  );
}

function NamespaceSelectField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const watchLevel = useWatch({ name: "level" });
  const watchNamespace = useWatch({ name: "data.metadata.namespace" });
  const watchKind = useWatch({
    name: "data.resourceSelectors.kind",
  });

  const { data: resourceNamespaceList } = useQuery({
    queryKey: ["getResourceNamespaceListApi", "resourceSelector", "namespace"],
    queryFn: () => {
      return getResourceNamespaceListApi({
        kind: watchKind,
      });
    },
  });

  useEffect(() => {
    if (watchLevel === "namespace" && value !== watchNamespace) {
      onChange(watchNamespace);
    }
  }, [watchLevel, watchNamespace, value]);

  return (
    <Field.Root variant="vertical" orientation="horizontal">
      <Field.Label>
        Namespace{" "}
        <Field.RequiredIndicator
          fallback={
            <Badge size="xs" variant="surface">
              Optional
            </Badge>
          }
        />
      </Field.Label>
      {watchLevel === "namespace" ? (
        <Input disabled value={watchNamespace} readOnly />
      ) : (
        <NativeSelect.Root>
          <NativeSelect.Field
            placeholder="Select Namespace"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          >
            {resourceNamespaceList == null
              ? null
              : resourceNamespaceList.namespaces.map((namespace) => (
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

function NameSelectField({
  kind,
  namespace,
  value,
  onChange,
}: {
  kind: string;
  namespace: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const { data: resourceNameList } = useQuery({
    queryKey: [
      "getResourceNameListApi",
      "resourceSelector",
      "name",
      kind,
      namespace,
    ],
    queryFn: () => getResourceNameListApi({ kind, namespace }),
  });

  return (
    <Field.Root variant="horizontal">
      <Field.Label>
        Name{" "}
        <Field.RequiredIndicator
          fallback={
            <Badge size="xs" variant="surface">
              Optional
            </Badge>
          }
        />
      </Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          placeholder="Select Name"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {resourceNameList == null
            ? null
            : resourceNameList.names.map((name, index) => (
                <option key={name + index} value={name}>
                  {name}
                </option>
              ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  );
}

function LabelSelectorsField({
  kind,
  namespace,
  value,
  onChange,
}: {
  kind: string;
  namespace: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const { data: resourceLabelList } = useQuery({
    queryKey: [
      "getResourceLabelListApi",
      "resourceSelector",
      "labelSelectors",
      kind,
      namespace,
    ],
    queryFn: () => {
      return getResourceLabelListApi({
        kind: kind,
        namespace: namespace,
      });
    },
  });
  const labelSelectors = createListCollection<string>({
    items: resourceLabelList == null ? [] : resourceLabelList.labels,
  });

  const handleLabelValueChange = (details: SelectValueChangeDetails) => {
    if (details.value !== null) {
      onChange(details.value);
    }
  };

  return (
    <Field.Root variant="horizontal">
      <Field.Label>
        LabelSelectors
        <Field.RequiredIndicator
          fallback={
            <Badge size="xs" variant="surface">
              Optional
            </Badge>
          }
        />
      </Field.Label>
      <Select.Root
        multiple
        value={value}
        onValueChange={handleLabelValueChange}
        collection={labelSelectors}
        size="md"
        positioning={{
          placement: "bottom",
          strategy: "fixed",
          sameWidth: true,
        }}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select LabelSelectors" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {labelSelectors.items.map((label, index) => (
              <Select.Item item={label} key={label + index}>
                {label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Field.Root>
  );
}

function CheckWanringInfoField({
  value,
}: {
  value: {
    kind: string;
    namespace: string;
    name: string;
    labelSelectors: string[];
  };
}) {
  return (
    <Flex marginTop="5%">
      {value.namespace === "" &&
      value.name === "" &&
      value.labelSelectors.length === 0 ? (
        <Checkbox.Root colorPalette="blue">
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>
            <Highlight
              query="해당 Kind의 모든 리소스가 전파"
              styles={{ px: "0.5", bg: "yellow.subtle", color: "orange.fg" }}
            >
              Kind 외 옵션이 없을 경우, 해당 Kind의 모든 리소스가 전파되는 것을
              확인했습니다.
            </Highlight>
          </Checkbox.Label>
        </Checkbox.Root>
      ) : (
        <Checkbox.Root disabled checked={true} visibility="hidden">
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label></Checkbox.Label>
        </Checkbox.Root>
      )}
    </Flex>
  );
}

function StepActionButtons({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <ButtonGroup width="100%" marginTop="3%">
      <Flex justifyContent="flex-end" width="100%">
        <Button
          onClick={() => onPrev()}
          variant="blueOutline"
          marginRight="5px"
        >
          Back
        </Button>
        <Button
          onClick={() => onNext()}
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
