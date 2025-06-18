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
  HStack,
  Checkbox,
  Box,
  CheckboxGroup,
  ButtonGroup,
} from "@chakra-ui/react";
import { toaster } from "@/components/Toaster";

export default function Placement({
  onPrev,
  onSubmit,
}: {
  onPrev: () => void;
  onSubmit: () => void;
}) {
  const [isType, setIsType] = useState(false);
  const [isDividedType, setIsDividedType] = useState(false);
  const [isWeighted, setIsWeighted] = useState(false);

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
          <Field.Label whiteSpace="nowrap">Cluster Names</Field.Label>
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
      <Text variant="subTitle" marginTop="1.5%">
        Replica Scheduling
      </Text>
      <Flex marginBottom="2%">
        <Field.Root variant="horizontal" width="180px">
          <Field.Label>
            <Checkbox.Root
              colorPalette="blue"
              onChange={() => {
                setIsType(!isType);
                setIsDividedType(false);
                setIsWeighted(false);
              }}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Type</Checkbox.Label>
            </Checkbox.Root>
          </Field.Label>
        </Field.Root>
        {isType === true ? (
          <RadioCard.Root
            name="type"
            defaultValue="duplicated"
            onValueChange={() => {
              setIsDividedType(!isDividedType);
              setIsWeighted(false);
            }}
          >
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
        ) : null}
      </Flex>
      {isType === true ? (
        <>
          {isDividedType === true ? (
            <>
              <Flex marginBottom="2%">
                <Field.Root variant="horizontal" width="180px">
                  <Field.Label whiteSpace="nowrap">
                    Division Preference
                  </Field.Label>
                </Field.Root>
                <RadioCard.Root
                  name="divisionPreference"
                  defaultValue="aggregated"
                  onValueChange={() => setIsWeighted(!isWeighted)}
                >
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
              </Flex>
              {isWeighted === true ? (
                <>
                  <Field.Root variant="horizontal" marginBottom="1%">
                    <HStack gap="3">
                      <Field.Label whiteSpace="nowrap">
                        Weight Preference
                      </Field.Label>
                      <Button variant="smallBlue">
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
                            <Field.Label whiteSpace="nowrap">
                              - Target Cluster
                              <Field.RequiredIndicator />
                            </Field.Label>
                          </Field.Root>
                          <CheckboxGroup>
                            <Flex justify="flex-start">
                              <Box>
                                <CheckboxCard.Root>
                                  <CheckboxCard.HiddenInput />
                                  <CheckboxCard.Control>
                                    <CheckboxCard.Label>
                                      member1
                                    </CheckboxCard.Label>
                                    <CheckboxCard.Indicator />
                                  </CheckboxCard.Control>
                                </CheckboxCard.Root>
                              </Box>
                              <Box>
                                <CheckboxCard.Root>
                                  <CheckboxCard.HiddenInput />
                                  <CheckboxCard.Control>
                                    <CheckboxCard.Label>
                                      member2
                                    </CheckboxCard.Label>
                                    <CheckboxCard.Indicator />
                                  </CheckboxCard.Control>
                                </CheckboxCard.Root>
                              </Box>
                              <Box>
                                <CheckboxCard.Root>
                                  <CheckboxCard.HiddenInput />
                                  <CheckboxCard.Control>
                                    <CheckboxCard.Label>
                                      member23
                                    </CheckboxCard.Label>
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
                          <Field.Label mr="7%">
                            - Weight
                            <Field.RequiredIndicator />
                          </Field.Label>
                          <Input />
                        </Field.Root>
                      </Box>
                    </Box>
                  </Flex>
                </>
              ) : null}
            </>
          ) : null}
        </>
      ) : null}
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
          </Flex>
          <Button onClick={() => onSubmit()} variant="blue" marginLeft="5px">
            Apply
          </Button>
        </Flex>
      </ButtonGroup>
    </>
  );
}
