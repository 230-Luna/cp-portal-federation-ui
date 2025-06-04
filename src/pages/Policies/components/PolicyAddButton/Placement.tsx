import { useState } from "react";
import { Heading } from "@/components/Heading";
import { CheckboxCard } from "@/components/CheckboxCard";
import { CloseButton } from "@/components/CloseButton";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { FaPlus } from "react-icons/fa";
import { Flex } from "@/components/Flex";
import { RadioCard } from "@/components/RadioCard";
import { Input } from "@/components/Input";
import { Field } from "@/components/Field";
import {
  FieldLabel,
  HStack,
  Checkbox,
  Box,
  CheckboxGroup,
} from "@chakra-ui/react";

export default function Placement() {
  const [isClusterNames, setIsClusterNames] = useState(false);
  const [isType, setIsType] = useState(false);
  const [isDivisionPreference, setIsDivisionPreference] = useState(false);

  return (
    <>
      <Heading variant="center" marginTop="2%" marginBottom="3%">
        Placement
      </Heading>
      <Text variant="subTitle" marginTop="1.5%">
        Cluster Affinity
      </Text>
      <Flex>
        <Field.Root variant="horizontal" width="180px">
          <FieldLabel>
            <Checkbox.Root
              colorPalette="blue"
              onChange={() => setIsClusterNames(!isClusterNames)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label width="180px">Cluster Names</Checkbox.Label>
            </Checkbox.Root>
          </FieldLabel>
        </Field.Root>
        {isClusterNames && (
          <CheckboxGroup>
            <Flex justify="flex-start">
              <Box>
                <CheckboxCard.Root>
                  <CheckboxCard.HiddenInput />
                  <CheckboxCard.Control>
                    <CheckboxCard.Label>member1</CheckboxCard.Label>
                    <CheckboxCard.Indicator />
                  </CheckboxCard.Control>
                </CheckboxCard.Root>
              </Box>
              <Box>
                <CheckboxCard.Root>
                  <CheckboxCard.HiddenInput />
                  <CheckboxCard.Control>
                    <CheckboxCard.Label>member2</CheckboxCard.Label>
                    <CheckboxCard.Indicator />
                  </CheckboxCard.Control>
                </CheckboxCard.Root>
              </Box>
              <Box>
                <CheckboxCard.Root>
                  <CheckboxCard.HiddenInput />
                  <CheckboxCard.Control>
                    <CheckboxCard.Label>member23</CheckboxCard.Label>
                    <CheckboxCard.Indicator />
                  </CheckboxCard.Control>
                </CheckboxCard.Root>
              </Box>
            </Flex>
          </CheckboxGroup>
        )}
      </Flex>
      <Text variant="subTitle" marginTop="1.5%">
        Replica Scheduling
      </Text>
      <Flex marginBottom="2%">
        <Field.Root variant="horizontal" width="180px">
          <FieldLabel>
            <Checkbox.Root
              colorPalette="blue"
              onChange={() => setIsType(!isType)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Type</Checkbox.Label>
            </Checkbox.Root>
          </FieldLabel>
        </Field.Root>
        {isType && (
          <RadioCard.Root>
            <Flex justify="flex-start">
              <RadioCard.Item value="duplicated">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemText>Duplicated</RadioCard.ItemText>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
              <RadioCard.Item value="divided">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemText>Divided</RadioCard.ItemText>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
            </Flex>
          </RadioCard.Root>
        )}
      </Flex>
      <Flex marginBottom="2%">
        <Field.Root variant="horizontal" width="180px">
          <FieldLabel>
            <Checkbox.Root
              colorPalette="blue"
              onChange={() => setIsDivisionPreference(!isDivisionPreference)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label width="180px">Division Preference</Checkbox.Label>
            </Checkbox.Root>
          </FieldLabel>
        </Field.Root>
        {isDivisionPreference && (
          <RadioCard.Root>
            <Flex justify="flex-start">
              <RadioCard.Item value="aggregated">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemText>Aggregated</RadioCard.ItemText>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
              <RadioCard.Item value="weighted">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemText>Weighted</RadioCard.ItemText>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
            </Flex>
          </RadioCard.Root>
        )}
      </Flex>
      <Field.Root variant="horizontal" marginBottom="1%">
        <HStack gap="3">
          <FieldLabel> Weight Preference</FieldLabel>
          <Button variant="smallFaPlus">
            <FaPlus />
          </Button>
        </HStack>
      </Field.Root>
      <Flex overflowY="auto" maxHeight="250px">
        <Box p="2%" bg="gray.100" m="1%" position="relative">
          <CloseButton variant="inbox" marginRight="2.5%" />
          <Box width="680px">
            <Flex>
              <Field.Root
                required
                className="basic-font"
                orientation="horizontal"
                paddingTop="2%"
                paddingBottom="1%"
                width="130px"
              >
                <FieldLabel whiteSpace="nowrap">
                  - Target Cluster
                  <Field.RequiredIndicator />
                </FieldLabel>
              </Field.Root>
              <CheckboxGroup>
                <Flex justify="flex-start">
                  <Box>
                    <CheckboxCard.Root>
                      <CheckboxCard.HiddenInput />
                      <CheckboxCard.Control>
                        <CheckboxCard.Label>member1</CheckboxCard.Label>
                        <CheckboxCard.Indicator />
                      </CheckboxCard.Control>
                    </CheckboxCard.Root>
                  </Box>
                  <Box>
                    <CheckboxCard.Root>
                      <CheckboxCard.HiddenInput />
                      <CheckboxCard.Control>
                        <CheckboxCard.Label>member2</CheckboxCard.Label>
                        <CheckboxCard.Indicator />
                      </CheckboxCard.Control>
                    </CheckboxCard.Root>
                  </Box>
                  <Box>
                    <CheckboxCard.Root>
                      <CheckboxCard.HiddenInput />
                      <CheckboxCard.Control>
                        <CheckboxCard.Label>member23</CheckboxCard.Label>
                        <CheckboxCard.Indicator />
                      </CheckboxCard.Control>
                    </CheckboxCard.Root>
                  </Box>
                </Flex>
              </CheckboxGroup>
            </Flex>
            <Field.Root
              required
              className="basic-font"
              orientation="horizontal"
              paddingTop="2%"
              paddingBottom="1%"
              width="650px"
            >
              <FieldLabel mr="7%">
                - Weight
                <Field.RequiredIndicator />
              </FieldLabel>
              <Input />
            </Field.Root>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
