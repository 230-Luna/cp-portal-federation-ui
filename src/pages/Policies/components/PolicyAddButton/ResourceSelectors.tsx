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
  SegmentGroupValueChangeDetails,
  Select,
  createListCollection,
  Stack,
  FieldErrorText,
  Input,
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

export default function ResourceSelectors({
  onPrev,
  onNext,
  onSubmit,
}: {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "resourceSelectors",
  });

  return (
    <>
      <Dialog.Root variant="resourceSetUp">
        <Heading variant="center" marginTop="2%" marginBottom="3%">
          Resource Selectors
          <Dialog.Trigger>
            <Button
              variant="smallBlue"
              marginLeft="3%"
              onClick={() =>
                append({
                  resourceSelector: {
                    kind: "Deployment",
                    namespace: "",
                    name: "",
                    label: "",
                  },
                })
              }
            >
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
  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content variant="resourceSetUp" margin="10px auto">
          <Dialog.Body variant="resourceSetUp" margin="2%">
            <KindSelectRadioField />
            <NamespaceSelectField />
            {/* <NameSelectField />
            <LabelSelectField /> */}
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger>
              <Button variant="blueOutline">Cancel</Button>
            </Dialog.ActionTrigger>
            <Dialog.Trigger>
              <Button variant="blue">Save</Button>
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

function KindSelectRadioField() {
  const { control } = useFormContext();

  const kindOptions = [
    "Deployment",
    "Statefulset",
    "Daemonset",
    "Cronjob",
    "Job",
  ];

  return (
    <Controller
      name="resourceSelectors.resourceSelector.kind"
      control={control}
      defaultValue="Deployment"
      render={({ field }) => {
        const handleValueChange = (details: SegmentGroupValueChangeDetails) => {
          if (details.value !== null) {
            field.onChange(details.value);
          }
        };
        return (
          <Field.Root required variant="horizontal">
            <Field.Label>
              Kind
              <Field.RequiredIndicator />
            </Field.Label>
            <SegmentGroup.Root
              value={field.value}
              onValueChange={handleValueChange}
              variant="large"
              width="100%"
            >
              <SegmentGroup.Indicator />
              {kindOptions.map((kind) => (
                <SegmentGroup.Item key={kind} value={kind}>
                  <SegmentGroup.ItemHiddenInput />
                  <SegmentGroup.ItemText>{kind}</SegmentGroup.ItemText>
                </SegmentGroup.Item>
              ))}
            </SegmentGroup.Root>
          </Field.Root>
        );
      }}
    />
  );
}

function NamespaceSelectField() {
  const { control } = useFormContext();
  const watchLevel = useWatch({ name: "metadata.level" });
  const watchNamespace = useWatch({ name: "metadata.namespace" });
  const watchKind = useWatch({
    name: "resourceSelectors.resourceSelector.kind",
  });
  console.log("watchLevel", watchLevel);
  console.log("watchNamespace", watchNamespace);
  console.log("watchKind", watchKind);

  const { data: resourceNamespaceList } = useSuspenseQuery({
    queryKey: ["getResourceNamespaceListApi", "resourceSelector", "namespace"],
    queryFn: () => {
      return getResourceNamespaceListApi({
        kind: watchKind.toLowerCase(),
      });
    },
  });
  console.log(resourceNamespaceList);
  return (
    <Controller
      name="resourceSelectors.resourceSelector.namespace"
      control={control}
      defaultValue=""
      render={({ field }) => {
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
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
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
      }}
    />
  );
}

function NameSelectField() {
  const { control } = useFormContext();
  const watchKind = useWatch({
    name: "resourceSelectors.resourceSelector.kind",
  });
  const watchNamespace = useWatch({
    name: "resourceSelectors.resourceSelector.namespace",
  });

  const { data: resourceNameList } = useSuspenseQuery({
    queryKey: ["getResourceNameListApi", "resourceSelectors", "name"],
    queryFn: () => {
      if (watchNamespace != null) {
        return getResourceNameListApi({
          kind: watchKind.toLowerCase(),
          namespace: watchNamespace,
        });
      }
      return getResourceNameListApi({
        kind: watchKind.toLowerCase(),
      });
    },
  });
  return (
    <Controller
      name="resourceSelectors.resourceSelector.name"
      control={control}
      defaultValue=""
      render={({ field }) => {
        return (
          <Field.Root variant="horizontal">
            <Field.Label>Name</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                name="name"
                placeholder="Select Name"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
              >
                {resourceNameList.names.map((name) => (
                  <option value={name} key={name}>
                    {name}
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

function LabelSelectField() {
  const { control } = useFormContext();
  const watchKind = useWatch({
    name: "resourceSelectors.resourceSelector.kind",
  });
  const watchNamespace = useWatch({
    name: "resourceSelectors.resourceSelector.namespace",
  });

  const { data: resourceLabelList } = useSuspenseQuery({
    queryKey: ["getResourceLabelListApi", "resourceSelector", "label"],
    queryFn: () => {
      if (watchNamespace != null) {
        return getResourceLabelListApi({
          kind: watchKind.toLowerCase(),
          namespace: watchNamespace,
        });
      }
      return getResourceLabelListApi({
        kind: watchKind.toLowerCase(),
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
