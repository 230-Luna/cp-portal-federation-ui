import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { Heading } from "@/components/Heading";
import { Input } from "@/components/Input";
import { RadioCard } from "@/components/RadioCard";
import {
  Checkbox,
  Collapsible,
  FieldLabel,
  Flex,
  HStack,
  NativeSelect,
  Tag,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Metadata() {
  const [isNewNamespace, setIsNewNamespace] = useState(false);

  return (
    <>
      <Heading variant="center" marginTop="2%" marginBottom="3%">
        Metadata
      </Heading>
      <Field.Root required variant="horizontal">
        <Field.Label>
          Level
          <Field.RequiredIndicator />
        </Field.Label>
        <RadioCard.Root defaultValue="namespace">
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
      <Field.Root required variant="horizontal">
        <FieldLabel>
          Name
          <Field.RequiredIndicator />
        </FieldLabel>
        <Input placeholder="이름 입력" />
      </Field.Root>
      <Field.Root required variant="vertical">
        <HStack gap="3" mb="1%">
          <Field.Label>
            Namespace
            <Field.RequiredIndicator />
          </Field.Label>
          <Checkbox.Root
            colorPalette="blue"
            onChange={() => setIsNewNamespace(!isNewNamespace)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label className="basic-font">
              네임스페이스 신규 생성하기
            </Checkbox.Label>
          </Checkbox.Root>
        </HStack>
        {isNewNamespace ? (
          <Input id="namespace" bg="white" />
        ) : (
          <NativeSelect.Root>
            <NativeSelect.Field>
              <option value="1">default</option>
              <option value="2">name2</option>
              <option value="3">space2</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        )}
      </Field.Root>
      <Field.Root variant="horizontal">
        <Collapsible.Root>
          <HStack gap="3">
            <Field.Label>Labels</Field.Label>
            <Collapsible.Trigger>
              <Button variant="smallFaPlus">
                <FaPlus />
              </Button>
            </Collapsible.Trigger>
            <Flex>
              <Tag.Root>
                <Tag.Label>karmada.policy=first-sample</Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger />
                </Tag.EndElement>
              </Tag.Root>
              <Tag.Root>
                <Tag.Label>app=nginx</Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger />
                </Tag.EndElement>
              </Tag.Root>
              <Tag.Root>
                <Tag.Label>karmada.policy=first-sampleeeeeeee</Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger />
                </Tag.EndElement>
              </Tag.Root>
              <Tag.Root>
                <Tag.Label>
                  karmada.policy=first-sampleeeeeeeeeeeeeeeeeee
                </Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger />
                </Tag.EndElement>
              </Tag.Root>
            </Flex>
          </HStack>
          <Collapsible.Content marginTop="2%">
            <HStack gap="4" m="2%">
              <Field.Root required>
                <Field.Label>
                  Key <Field.RequiredIndicator />
                </Field.Label>
                <Input bg="white" />
              </Field.Root>
              <Field.Root required>
                <Field.Label>
                  Value <Field.RequiredIndicator />
                </Field.Label>
                <Input bg="white" />
              </Field.Root>
              <Button variant="mediumFaPlus">
                <FaPlus />
              </Button>
            </HStack>
          </Collapsible.Content>
        </Collapsible.Root>
      </Field.Root>
      <Field.Root variant="horizontal">
        <Collapsible.Root>
          <HStack gap="3">
            <Field.Label>Annotaions</Field.Label>
            <Collapsible.Trigger>
              <Button variant="smallFaPlus">
                <FaPlus />
              </Button>
            </Collapsible.Trigger>
            <Flex>
              <Tag.Root>
                <Tag.Label>karmada.policy=first-sample</Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger />
                </Tag.EndElement>
              </Tag.Root>
              <Tag.Root>
                <Tag.Label>app=nginx</Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger />
                </Tag.EndElement>
              </Tag.Root>
            </Flex>
          </HStack>
          <Collapsible.Content marginTop="2%">
            <HStack gap="4" m="2%">
              <Field.Root required>
                <Field.Label>
                  Key
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input bg="white" />
              </Field.Root>
              <Field.Root required>
                <Field.Label>
                  Value
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input bg="white" />
              </Field.Root>
              <Button variant="mediumFaPlus">
                <FaPlus />
              </Button>
            </HStack>
          </Collapsible.Content>
        </Collapsible.Root>
      </Field.Root>
    </>
  );
}
