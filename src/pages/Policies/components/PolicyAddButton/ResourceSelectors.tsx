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
  onSubmit,
}: {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
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
      <StepActionButtons onPrev={onPrev} onNext={onNext} onSubmit={onSubmit} />
    </>
  );
}

function ResouceSelectorViewer() {
  const { control } = useFormContext<CreatePropagationPolicy>();
  const { fields, append, remove } = useFieldArray<
    CreatePropagationPolicy,
    "resourceSelectors"
  >({
    control,
    name: "resourceSelectors",
  });

  return (
    <>
      {fields.map((field, index) => (
        <Card.Root key={field.id} variant="small">
          <Card.Body variant="small">
            <CloseButton
              onClick={() => remove(index)}
              variant="inbox"
              marginRight="2.5%"
            />
            <Field.Root variant="horizontal">
              <HStack>
                <Field.Label>Kind</Field.Label>
                <Text variant="small">{field.kind}</Text>
              </HStack>
            </Field.Root>
            {field.namespace && (
              <Field.Root variant="horizontal">
                <HStack>
                  <Field.Label>Namespace</Field.Label>
                  <Text variant="small">{field.namespace}</Text>
                </HStack>
              </Field.Root>
            )}
            {field.name && (
              <Field.Root variant="horizontal">
                <HStack>
                  <Field.Label>Name</Field.Label>
                  <Text variant="small">{field.name}</Text>
                </HStack>
              </Field.Root>
            )}
            {Array.isArray(field.labelSelectors) &&
              field.labelSelectors.length > 0 && (
                <Field.Root variant="horizontal">
                  <HStack flexWrap="wrap">
                    <Field.Label>LabelSelectors</Field.Label>
                    {field.labelSelectors.map((label) => (
                      <Badge key={label}>{label}</Badge>
                    ))}
                  </HStack>
                </Field.Root>
              )}
          </Card.Body>
        </Card.Root>
      ))}
    </>
  );
}

function ResourceSelectorCreator() {
  const { control } = useFormContext();
  const { append } = useFieldArray({
    control,
    name: "resourceSelectors",
  });
  const [resourceSelectorData, setResourceSelectorData] = useState({
    kind: "deployment",
    namespace: "",
    name: "",
    labels: [""],
  });

  const handleResouceSelectorSave = () => {
    console.log("handle");
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
              onChange={(val) =>
                setResourceSelectorData((prev) => ({ ...prev, kind: val }))
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
                setResourceSelectorData((prev) => ({ ...prev, name: val }))
              }
            />
            {/* <LabelSelectField
              value={resourceSelectorData.labels}
              onChange={(val) =>
                setResourceSelectorData((prev) => ({
                  ...prev,
                  labels: val,
                }))
              }
            /> */}
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
  onChange: (val: string) => void;
}) {
  const kindOptions = [
    "deployment",
    "statefulset",
    "daemonset",
    "cronjob",
    "job",
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
        value={value}
        onValueChange={handleKindValueChange}
        variant="large"
        width="100%"
      >
        <SegmentGroup.Indicator />
        {kindOptions.map((kind) => (
          <SegmentGroup.Item key={kind} value={kind}>
            <SegmentGroup.ItemHiddenInput />
            <SegmentGroup.ItemText>
              {kind.charAt(0).toUpperCase()}
            </SegmentGroup.ItemText>
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
          readOnly
        />
      ) : (
        <NativeSelect.Root>
          <NativeSelect.Field
            // name="namespaces"
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
    queryKey: ["getResourceNameListApi", kind, namespace],
    queryFn: () => getResourceNameListApi({ kind, namespace }),
  });

  return (
    <Field.Root variant="horizontal">
      <Field.Label>Name</Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          placeholder="Select Name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
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

function LabelSelectField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const { control } = useFormContext();
  const watchKind = useWatch({
    name: "resourceSelectors.kind",
  });
  const watchNamespace = useWatch({
    name: "resourceSelectors.namespace",
  });

  const { data: resourceLabelList } = useSuspenseQuery({
    queryKey: ["getResourceLabelListApi", "resourceSelector", "label"],
    queryFn: () => {
      if (watchNamespace != null) {
        return getResourceLabelListApi({
          kind: watchKind,
          namespace: watchNamespace,
        });
      }
      return getResourceLabelListApi({
        kind: watchKind,
      });
    },
  });

  console.log(resourceLabelList);
  return (
    <Controller
      name="resourceSelectors.resourceSelector.label"
      control={control}
      defaultValue=""
      render={({ field }) => {
        return (
          <Field.Root variant="horizontal">
            <Field.Label>Label</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                name="label"
                placeholder="Select Label"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
              >
                {resourceLabelList.labels.map((label) => (
                  <option value={label} key={label}>
                    {label}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
        );
      }}
    />
  );
}

function StepActionButtons({
  onPrev,
  onNext,
  onSubmit,
}: {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) {
  return (
    <ButtonGroup width="100%" marginTop="3%">
      <Flex justifyContent="flex-end" width="100%">
        <Flex>
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
        <Button onClick={() => onSubmit()} variant="blue" marginLeft="5px">
          Apply
        </Button>
      </Flex>
    </ButtonGroup>
  );
}
