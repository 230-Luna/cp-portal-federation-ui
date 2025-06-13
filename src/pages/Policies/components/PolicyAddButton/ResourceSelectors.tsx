import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Card } from "@/components/Card";
import { Dialog } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { CloseButton } from "@/components/CloseButton";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Flex } from "@/components/Flex";
import { SegmentGroup } from "@/components/SegmentGroup";
import { Collapsible } from "@/components/Collapsible";
import { Input } from "@/components/Input";
import { Field } from "@/components/Field";
import {
  Portal,
  HStack,
  NativeSelect,
  Tag,
  Badge,
  ButtonGroup,
  SegmentGroupValueChangeDetails,
  Fieldset,
} from "@chakra-ui/react";
import { toaster } from "@/components/Toaster";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getNamespaceListApi, getNameListApi } from "@/apis/resources";
import { getLabelListApi } from "@/apis/resources";

export default function ResourceSelectors({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) {
  return (
    <>
      <Dialog.Root variant="resourceSetUp">
        <Heading variant="center" marginTop="2%" marginBottom="3%">
          Resource Selectors
          <Dialog.Trigger>
            <Button variant="smallFaPlus" marginLeft="3%">
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
      <StepActionButtons
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
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
  // const [labels, setLabels] = useState<Record<string, string>>({});
  const [labels, setLabels] = useState("");

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content variant="resourceSetUp" margin="10px auto">
          <Dialog.Body variant="resourceSetUp" margin="2%">
            <KindSelectRadioField kind={kind} setKind={setKind} />
            <NamespaceSelectField
              namespace={namespace}
              setNamespace={setNamespace}
            />
            <NameSelectField name={name} setName={setName} />
            <LabelSelectField labels={labels} setLabels={setLabels} />
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
  namespace,
  setNamespace,
}: {
  namespace: string;
  setNamespace: Dispatch<SetStateAction<string>>;
}) {
  const { data: namespaceList } = useSuspenseQuery({
    queryKey: ["getNamespaceListApi", "resourceSelectors"],
    queryFn: () => {
      return getNamespaceListApi();
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
            {namespaceList.namespaces.map((namespace) => (
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
  name,
  setName,
}: {
  name: string;
  setName: (name: string) => void;
}) {
  const { data: nameList } = useSuspenseQuery({
    queryKey: ["getNameListApi", "resourceSelectors"],
    queryFn: () => {
      return getNameListApi();
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
          {nameList.names.map((name) => (
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

function LabelSelectField({
  labels,
  setLabels,
}: {
  // labels: Record<string, string>;
  // setLabels: Dispatch<SetStateAction<Record<string, string>>>;
  labels: string;
  setLabels: Dispatch<SetStateAction<string>>;
}) {
  const { data: labelList } = useSuspenseQuery({
    queryKey: ["getLabelListApi", "resourceSelectors"],
    queryFn: () => {
      return getLabelListApi();
    },
  });
  return (
    <Field.Root variant="horizontal">
      <Field.Label>Label</Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          name="label"
          placeholder="Select Label"
          value={labels}
          onChange={(event) => setLabels(event.target.value)}
        >
          {labelList.labels.map((label) => (
            <option value={label} key={label}>
              {label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
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
              setCurrentStep(currentStep - 1);
            }}
            variant="blueOutline"
            marginRight="5px"
          >
            Back
          </Button>
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
        <Button
          onClick={() => {
            toaster.create({
              description: "Policy가 생성되었습니다.",
              // status: "success",
              duration: 3000,
              closable: true,
            });
          }}
          variant="blue"
          marginLeft="5px"
        >
          Apply
        </Button>
      </Flex>
    </ButtonGroup>
  );
}
