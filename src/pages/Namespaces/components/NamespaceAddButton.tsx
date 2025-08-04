import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { CloseButton } from "@/components/CloseButton";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toaster } from "@/components/Toaster";
import { MouseEvent, Suspense, useState } from "react";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createNamespaceApi } from "@/apis/namespace";
import { Input } from "@/components/Input";
import { Field } from "@/components/Field";
import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  Badge,
  Collapsible,
  Fieldset,
  Flex,
  HStack,
  Portal,
  Tag,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/Tooltip";

type FormValues = {
  name: string;
  labels: string[];
};

export default function NamespaceAddButton() {
  const [open, setOpen] = useState(false);
  const namespaceAddMutationCount = useIsMutating({
    mutationKey: ["handleAddNamespace"],
  });

  return (
    <Dialog.Root
      variant="resourceSetUp"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Dialog.Trigger>
        <Button
          colorPalette="blue"
          variant="largeBlue"
          disabled={namespaceAddMutationCount > 0}
        >
          <FaPlus /> Add
        </Button>
      </Dialog.Trigger>
      {open === true ? (
        <NamespaceAddDialog onClose={() => setOpen(false)} />
      ) : null}
    </Dialog.Root>
  );
}

function NamespaceAddDialog({ onClose }: { onClose: () => void }) {
  const formData = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      labels: [],
    },
  });
  const nameValue = formData.watch("name");
  const queryClient = useQueryClient();

  const handleAddNamespace = useMutation({
    mutationKey: ["createNamespaceApi", formData.getValues().name],
    mutationFn: async () => {
      let loadingToaster;

      try {
        onClose();
        loadingToaster = toaster.create({
          type: "loading",
          description: `네임스페이스를 추가하고 있습니다.`,
        });
        await createNamespaceApi(formData.getValues());

        toaster.remove(loadingToaster);
        toaster.success({
          description: `${nameValue} 네임스페이스가 추가되었습니다.`,
        });

        queryClient.invalidateQueries({ queryKey: ["getNamespaceListApi"] });
      } catch (error: any) {
        console.error(error.response.data.message);
        toaster.error({
          type: "error",
          description: `${error.response.data.message || "알 수 없는 오류"}`,
        });
      } finally {
        if (loadingToaster) {
          toaster.remove(loadingToaster);
        }
        formData.reset();
      }
    },
  });

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content variant="resourceSetUp" margin="10px auto">
          <Heading variant="center" marginTop="2%">
            Namespace Add
          </Heading>
          <Dialog.Body variant="resourceSetUp" margin="2%">
            <Suspense fallback="">
              <FormProvider {...formData}>
                <AddNamespace
                  onValueChange={(newData) => {
                    formData.setValue("name", newData.name);
                    formData.setValue("labels", newData.labels);
                  }}
                />
              </FormProvider>
            </Suspense>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger>
              <Button variant="blueOutline">Cancel</Button>
            </Dialog.ActionTrigger>
            <Button
              variant="blue"
              disabled={nameValue === ""}
              loading={handleAddNamespace.isPending}
              onClick={() => handleAddNamespace.mutate()}
            >
              Apply
            </Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger>
            <CloseButton />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}

function AddNamespace({
  onValueChange,
}: {
  onValueChange: (newData: { name: string; labels: string[] }) => void;
}) {
  const { control } = useFormContext();
  const { field: nameField } = useController({
    name: "name",
    control,
  });
  const { field: labelsField } = useController({
    name: "labels",
    control,
  });

  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  const labels: string[] = labelsField.value || [];

  const [isNameValid, setIsNameValid] = useState<false | "empty" | "invalid">(
    false
  );
  const [isKeyValid, setIsKeyValid] = useState<false | "empty" | "invalid">(
    false
  );
  const [isValueValid, setIsValueValid] = useState<false | "empty" | "invalid">(
    false
  );
  const [labelLimitExceeded, setLabelLimitExceeded] = useState(false);
  const labelKeyValueRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-._]*[a-zA-Z0-9])?$/;
  const nameRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;

  const handleAddLabelClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const trimmedKey = keyInput.trim();
    const trimmedValue = valueInput.trim();

    let hasError = false;

    const isDuplicate = labels.some((label) =>
      label.startsWith(`${trimmedKey}=`)
    );
    const willExceedLimit = !isDuplicate && labels.length >= 20;

    if (willExceedLimit) {
      setLabelLimitExceeded(true);
      return;
    } else {
      setLabelLimitExceeded(false);
    }

    if (!trimmedKey) {
      setIsKeyValid("empty");
      hasError = true;
    } else if (trimmedKey.length > 63 || !labelKeyValueRegex.test(trimmedKey)) {
      setIsKeyValid("invalid");
      hasError = true;
    } else {
      setIsKeyValid(false);
    }

    if (!trimmedValue) {
      setIsValueValid("empty");
      hasError = true;
    } else if (
      trimmedValue.length > 63 ||
      !labelKeyValueRegex.test(trimmedValue)
    ) {
      setIsValueValid("invalid");
      hasError = true;
    } else {
      setIsValueValid(false);
    }

    if (hasError) return;

    const updated = [
      ...labels.filter((label) => !label.startsWith(`${trimmedKey}=`)),
      `${trimmedKey}=${trimmedValue}`,
    ];
    onValueChange({ name: nameField.value || "", labels: updated });

    setKeyInput("");
    setValueInput("");
    setIsKeyValid(false);
    setIsValueValid(false);
    setLabelLimitExceeded(false);
  };

  const handleDeleteLabelClick = (label: string) => {
    const updated = labels.filter((originLabel) => originLabel !== label);
    onValueChange({ name: nameField.value || "", labels: updated });
    setLabelLimitExceeded(false);
  };

  return (
    <Fieldset.Root>
      <Fieldset.Content>
        <Flex direction="column" gap="4">
          <Field.Root required invalid={!!isNameValid}>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              value={nameField.value || ""}
              onChange={(event) => {
                const value = event.target.value;
                nameField.onChange(value);

                if (!value.trim()) {
                  setIsNameValid("empty");
                } else if (value.length > 63 || !nameRegex.test(value)) {
                  setIsNameValid("invalid");
                } else {
                  setIsNameValid(false);
                }

                onValueChange({
                  name: value,
                  labels: labelsField.value || [],
                });
              }}
            />
            {isNameValid === "empty" ? (
              <Field.ErrorText>Name을 입력하세요</Field.ErrorText>
            ) : isNameValid === "invalid" ? (
              <Field.ErrorText>
                1~63자의 소문자 또는 숫자로 시작하고 끝나야 하며, '-'를 포함할
                수 있습니다.
              </Field.ErrorText>
            ) : null}
          </Field.Root>
          <Field.Root variant="horizontal" invalid={labelLimitExceeded}>
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
                  {isCollapsibleOpen === true ? <FaMinus /> : <FaPlus />}
                </Collapsible.Trigger>
                <Flex gap={1} wrap="wrap" width="80%">
                  {labels.map((label) => (
                    <Tooltip showArrow content={label} key={label}>
                      <Tag.Root key={label} maxW="300px">
                        <Tag.Label>{label}</Tag.Label>
                        <Tag.EndElement>
                          <Tag.CloseTrigger
                            onClick={() => handleDeleteLabelClick(label)}
                          />
                        </Tag.EndElement>
                      </Tag.Root>
                    </Tooltip>
                  ))}
                </Flex>
              </HStack>
              {labelLimitExceeded === true ? (
                <Field.ErrorText>
                  Label은 최대 20개까지 추가할 수 있습니다.
                </Field.ErrorText>
              ) : (
                <HStack height="20px"></HStack>
              )}
              <Collapsible.Content>
                <Fieldset.Root>
                  <Flex alignItems="flex-start">
                    <Fieldset.Content>
                      <HStack gap="4">
                        <Field.Root
                          required
                          invalid={!!isKeyValid}
                          height="140px"
                        >
                          <Field.Label>
                            Key <Field.RequiredIndicator />
                          </Field.Label>
                          <Input
                            value={keyInput}
                            onChange={(event) =>
                              setKeyInput(event.target.value)
                            }
                          />
                          {isKeyValid === "empty" ? (
                            <Field.ErrorText>Key를 입력하세요</Field.ErrorText>
                          ) : isKeyValid === "invalid" ? (
                            <Field.ErrorText>
                              1~63자의 영문자 또는 숫자로 시작하고 끝나야 하며,
                              '-', '.', '_'를 포함할 수 있습니다.
                            </Field.ErrorText>
                          ) : null}
                        </Field.Root>
                        <Field.Root
                          required
                          invalid={!!isValueValid}
                          height="140px"
                        >
                          <Field.Label>
                            Value <Field.RequiredIndicator />
                          </Field.Label>
                          <Input
                            value={valueInput}
                            onChange={(event) =>
                              setValueInput(event.target.value)
                            }
                          />
                          {isValueValid === "empty" ? (
                            <Field.ErrorText>
                              Value를 입력하세요
                            </Field.ErrorText>
                          ) : isValueValid === "invalid" ? (
                            <Field.ErrorText>
                              1~63자의 영문자 또는 숫자로 시작하고 끝나야 하며,
                              '-', '.', '_'를 포함할 수 있습니다.
                            </Field.ErrorText>
                          ) : null}
                        </Field.Root>
                      </HStack>
                    </Fieldset.Content>
                    <Button
                      variant="mediumBlue"
                      onClick={handleAddLabelClick}
                      margin="2.5%"
                      marginTop="40px"
                    >
                      <FaPlus />
                    </Button>
                  </Flex>
                </Fieldset.Root>
              </Collapsible.Content>
            </Collapsible.Root>
          </Field.Root>
        </Flex>
      </Fieldset.Content>
    </Fieldset.Root>
  );
}
