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
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getResourceLabelListApi,
  getResourceNameListApi,
  getResourceNamespaceListApi,
} from "@/apis/resource";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useState } from "react";
import { CreatePropagationPolicy } from "@/models/propagationPolicyModel";

export default function ResourceSelectors({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <Dialog.Root variant="resourceSetUp">
        <Heading variant="center" marginTop="2%" marginBottom="3%">
          Resource Selectors
          <Dialog.Trigger>
            <Button type="button" variant="smallBlue" marginLeft="3%">
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
      <StepActionButtons onPrev={onPrev} onNext={onNext} />
    </>
  );
}

function ResouceSelectorViewer() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "resourceSelectors",
  });

  return (
    <Controller
      name={`resourceSelectors`}
      control={control}
      defaultValue="[]"
      render={(field) => {
        console.log("viewer", fields);
        return (
          <>
            {fields.map((item, index) => {
              console.log("item", item);
              return (
                <></>
                // <Card.Root key={item.id} variant="small">
                //   <Card.Body variant="small">
                //     <CloseButton
                //       onClick={() => remove(index)}
                //       variant="inbox"
                //       marginRight="2.5%"
                //     />
                //     <Field.Root variant="horizontal">
                //       <HStack>
                //         <Field.Label>Kind</Field.Label>
                //         <Text variant="small">{item.kind}</Text>
                //       </HStack>
                //     </Field.Root>
                //     {item.namespace && (
                //       <Field.Root variant="horizontal">
                //         <HStack>
                //           <Field.Label>Namespace</Field.Label>
                //           <Text variant="small">{item.namespace}</Text>
                //         </HStack>
                //       </Field.Root>
                //     )}
                //     {item.name && (
                //       <Field.Root variant="horizontal">
                //         <HStack>
                //           <Field.Label>Name</Field.Label>
                //           <Text variant="small">{item.name}</Text>
                //         </HStack>
                //       </Field.Root>
                //     )}
                //     {Array.isArray(item.labelSelectors) &&
                //       item.labelSelectors.length > 0 && (
                //         <Field.Root variant="horizontal">
                //           <HStack flexWrap="wrap">
                //             <Field.Label>LabelSelectors</Field.Label>
                //             {item.labelSelectors.map((label) => (
                //               <Badge key={label}>{label}</Badge>
                //             ))}
                //           </HStack>
                //         </Field.Root>
                //       )}
                //   </Card.Body>
                // </Card.Root>
              );
            })}
          </>
        );
      }}
    />
  );
}

function ResourceSelectorCreator() {
  const { control } = useFormContext();
  const { append } = useFieldArray({
    control,
    name: "resourceSelectors",
  });
  const [resourceSelectorData, setResourceSelectorData] = useState({
    kind: "Deployment",
    namespace: "",
    name: "",
    labelSelectors: [""],
  });

  const handleResouceSelectorSave = () => {
    console.log("handle", resourceSelectorData);
    append(resourceSelectorData);
  };

  return (
    <Controller
      name={`resourceSelectors`}
      control={control}
      defaultValue="{}"
      render={() => {
        return (
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content variant="resourceSetUp" margin="10px auto">
                <Dialog.Body variant="resourceSetUp" margin="2%">
                  <KindSelectRadioField
                    value={resourceSelectorData.kind}
                    onChange={(val) =>
                      setResourceSelectorData((prev) => ({
                        ...prev,
                        kind: val,
                      }))
                    }
                  />
                  <NamespaceSelectField
                    value={resourceSelectorData.namespace}
                    onChange={(val) =>
                      setResourceSelectorData((prev) => ({
                        ...prev,
                        namespace: val,
                      }))
                    }
                  />
                  <NameSelectField
                    kind={resourceSelectorData.kind}
                    namespace={resourceSelectorData.namespace}
                    value={resourceSelectorData.name}
                    onChange={(val) =>
                      setResourceSelectorData((prev) => ({
                        ...prev,
                        name: val,
                      }))
                    }
                  />
                  <LabelSelectorsField
                    kind={resourceSelectorData.kind}
                    namespace={resourceSelectorData.namespace}
                    value={resourceSelectorData.labelSelectors}
                    onChange={(val) =>
                      setResourceSelectorData((prev) => ({
                        ...prev,
                        labelSelectors: val,
                      }))
                    }
                  />
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
      }}
    />
  );
}

function KindSelectRadioField({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const kindOptions = [
    "Deployment",
    "Statefulset",
    "Daemonset",
    "Cronjob",
    "Job",
  ];

  const handleKindValueChange = (details: SegmentGroupValueChangeDetails) => {
    const value = details.value;
    if (value !== null) {
      onChange(value);
    }
  };

  return (
    <Field.Root required variant="horizontal">
      <Field.Label>
        Kind
        <Field.RequiredIndicator />
      </Field.Label>
      <SegmentGroup.Root
        // value={field.value}
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
    </Field.Root>
  );
}

function NamespaceSelectField({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const watchLevel = useWatch({ name: "metadata.level" });
  const watchNamespace = useWatch({ name: "metadata.namespace" });
  const watchKind = useWatch({
    name: "resourceSelectors.kind",
  });

  const { data: resourceNamespaceList } = useSuspenseQuery({
    queryKey: ["getResourceNamespaceListApi", "resourceSelector", "namespace"],
    queryFn: () => {
      return getResourceNamespaceListApi({
        kind: watchKind,
      });
    },
  });

  return (
    <Field.Root variant="vertical" orientation="horizontal">
      <Field.Label>Namespace</Field.Label>
      {watchLevel === "namespace" ? (
        <Input
          disabled
          placeholder={watchNamespace}
          value={watchNamespace}
          onChange={(event) => onChange(watchNamespace)}
          readOnly
        />
      ) : (
        <NativeSelect.Root>
          <NativeSelect.Field
            placeholder="Select Namespace"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          >
            {resourceNamespaceList.namespaces.map((namespace) => (
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
  onChange: (val: string) => void;
}) {
  const { data: resourceNameList } = useSuspenseQuery({
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
      <Field.Label>Name</Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          placeholder="Select Name"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {resourceNameList?.names.map((name) => (
            <option key={name} value={name}>
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
  onChange: (val: string[]) => void;
}) {
  // const watchKind = useWatch({
  //   name: `resourceSelectors.${index}.kind`,
  // });
  // const watchNamespace = useWatch({
  //   name: `resourceSelectors.${index}.namespace`,
  // });

  const { data: resourceLabelList } = useSuspenseQuery({
    queryKey: [
      "getResourceLabelListApi",
      "resourceSelector",
      "labelSelectors",
      kind,
      namespace,
    ],
    queryFn: () => {
      // if (watchNamespace != null) {
      //   return getResourceLabelListApi({
      //     kind: watchKind,
      //     namespace: watchNamespace,
      //   });
      // }
      return getResourceLabelListApi({
        kind: kind,
        namespace: namespace,
      });
    },
  });
  const labelSelectors = createListCollection({
    items: resourceLabelList.labels,
  });
  return (
    <Field.Root variant="horizontal">
      <Field.Label>LabelSelectors</Field.Label>
      <Select.Root multiple collection={labelSelectors} size="md">
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select LabelSelectors" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content zIndex={1400}>
              {labelSelectors.items.map((label) => (
                <Select.Item item={label} key={label}>
                  {label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Field.Root>
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
