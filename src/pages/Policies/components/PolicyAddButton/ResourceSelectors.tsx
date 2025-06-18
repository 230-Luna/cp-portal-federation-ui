import { Dispatch, SetStateAction, useState } from "react";
import { Card } from "@/components/Card";
import { Dialog } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { CloseButton } from "@/components/CloseButton";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { FaMinus, FaPlus } from "react-icons/fa";
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
} from "@chakra-ui/react";
import { toaster } from "@/components/Toaster";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getResourceNameListApi,
  getResourceNamespaceListApi,
} from "@/apis/resource";
import { getResourceLabelListApi } from "@/apis/resource";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
            <Button variant="smallBlue" marginLeft="3%">
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
  const [kind, setKind] = useState("Deployment");
  const [namespace, setNamespace] = useState("");
  const [name, setName] = useState("");
  const [labels, setLabels] = useState("");

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content variant="resourceSetUp" margin="10px auto">
          <Dialog.Body variant="resourceSetUp" margin="2%">
            <KindSelectRadioField kind={kind} setKind={setKind} />
            <NamespaceSelectField
              kind={kind}
              namespace={namespace}
              setNamespace={setNamespace}
            />
            <NameSelectField
              kind={kind}
              namespace={namespace}
              name={name}
              setName={setName}
            />
            <LabelSelectField
            // kind={kind}
            // namespace={namespace}
            // labels={labels}
            // setLabels={setLabels}
            />
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
        width="100%"
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items
          items={["Deployment", "Statefulset", "Daemonset", "Cronjob", "Job"]}
        />
      </SegmentGroup.Root>
    </Field.Root>
  );
}

function NamespaceSelectField({
  kind,
  namespace,
  setNamespace,
}: {
  kind: string;
  namespace: string;
  setNamespace: Dispatch<SetStateAction<string>>;
}) {
  const { data: resourceNamespaceList } = useSuspenseQuery({
    queryKey: ["getResourceNamespaceListApi", "resourceSelectors", "namespace"],
    queryFn: () => {
      return getResourceNamespaceListApi({
        kind: kind,
      });
    },
  });
  return (
    <>
      <Field.Root variant="vertical" orientation="horizontal">
        <Field.Label>Namespace</Field.Label>
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
    </>
  );
}

function NameSelectField({
  kind,
  namespace,
  name,
  setName,
}: {
  kind: string;
  namespace: string | undefined;
  name: string;
  setName: (name: string) => void;
}) {
  const { data: resourceNameList } = useSuspenseQuery({
    queryKey: ["getResourceNameListApi", "resourceSelectors", "name"],
    queryFn: () => {
      if (namespace != null) {
        return getResourceNameListApi({
          kind: kind,
          namespace: namespace,
        });
      }
      return getResourceNameListApi({
        kind: kind,
      });
    },
  });
  return (
    <Field.Root variant="horizontal">
      <Field.Label>Name</Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          name="name"
          placeholder="Select Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
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
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});
const formSchema = z.object({
  framework: z.string({ message: "Framework is required" }).array(),
});

type FormValues = z.infer<typeof formSchema>;

function LabelSelectField() {
  //   {
  //   kind,
  //   namespace,
  //   labels,
  //   setLabels,
  // }: {
  //   kind: string;
  //   namespace: string | undefined;
  //   labels: string;
  //   setLabels: Dispatch<SetStateAction<string>>;
  // }
  // const { data: labelNameList } = useSuspenseQuery({
  //   queryKey: ["getResourceLabelListApi", "resourceSelectors"],
  //   queryFn: () => {
  //     if (namespace != null) {
  //       return getResourceLabelListApi({
  //         kind: kind,
  //         namespace: namespace,
  //       });
  //     }
  //     return getResourceLabelListApi({
  //       kind: kind,
  //     });
  //   },
  // });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Stack gap="4" align="flex-start">
      <Field.Root variant="horizontal">
        <Field.Label>Labels</Field.Label>
        <Controller
          control={control}
          name="framework"
          render={({ field }) => (
            <Select.Root
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => field.onChange(value)}
              onInteractOutside={() => field.onBlur()}
              collection={frameworks}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select framework" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {frameworks.items.map((framework) => (
                      <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          )}
        />
        <FieldErrorText>{errors.framework?.message}</FieldErrorText>
      </Field.Root>
    </Stack>
    //    <Field.Root variant="horizontal">
    //   <Field.Label>Label</Field.Label>
    //   <NativeSelect.Root>
    //     <NativeSelect.Field
    //       name="label"
    //       placeholder="Select Label"
    //       value={labels}
    //       onChange={(event) => setLabels(event.target.value)}
    //     >
    //       {labelNameList.labels.map((label) => (
    //         <option value={label} key={label}>
    //           {label}
    //         </option>
    //       ))}
    //     </NativeSelect.Field>
    //     <NativeSelect.Indicator />
    //   </NativeSelect.Root>
    // </Field.Root>
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
