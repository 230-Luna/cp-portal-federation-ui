import { FormEventHandler, useState } from "react";
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
  RadioCardValueChangeDetails,
} from "@chakra-ui/react";
import { toaster } from "@/components/Toaster";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getClusterListApi } from "@/apis/cluster";

export default function Placement({
  onPrev,
  onSubmit,
}: {
  onPrev: () => void;
  onSubmit: () => void;
}) {
  return (
    <>
      <Heading variant="center" marginTop="2%" marginBottom="3%">
        Placement
      </Heading>
      <ClusterAffinity />
      <ReplicaScheduling />
      <StepActionButtons onPrev={onPrev} onSubmit={onSubmit} />
    </>
  );
}

function ClusterAffinity() {
  const { control } = useFormContext();

  const { data: clusterList } = useSuspenseQuery({
    queryKey: [
      "getClusterListApi",
      "placement",
      "clusterAffinity",
      "clusterNames",
    ],
    queryFn: () => {
      return getClusterListApi({});
    },
  });

  return (
    <Controller
      name="placement.clusternames"
      control={control}
      defaultValue={[]}
      render={({ field }) => {
        const handleCheckboxChange = (value: string[]) => {
          field.onChange(value);
        };

        return (
          <>
            <Text variant="subTitle" marginTop="1.5%">
              Cluster Affinity
            </Text>
            <Flex>
              <Field.Root variant="horizontal" width="180px">
                <Field.Label whiteSpace="nowrap">Cluster Names</Field.Label>
              </Field.Root>
              <CheckboxGroup
                onValueChange={(value) => handleCheckboxChange(value)}
              >
                <Flex justify="flex-start">
                  {clusterList.clusters.map((cluster) => {
                    return (
                      <Box key={cluster.name}>
                        <CheckboxCard.Root
                          key={cluster.name}
                          value={cluster.name}
                        >
                          <CheckboxCard.HiddenInput />
                          <CheckboxCard.Control>
                            <CheckboxCard.Label>
                              {cluster.name}
                            </CheckboxCard.Label>
                            <CheckboxCard.Indicator />
                          </CheckboxCard.Control>
                        </CheckboxCard.Root>
                      </Box>
                    );
                  })}
                </Flex>
              </CheckboxGroup>
            </Flex>
          </>
        );
      }}
    />
  );
}

function ReplicaScheduling() {
  const [isType, setIsType] = useState(false);

  const watchType = useWatch({
    name: "placement.replicaScheduiling.replicaSchedulingType",
  });
  const watchDividedType = useWatch({
    name: "placement.replicaScheduiling.replicaDivisionpreference",
  });
  const watchWeightedList = useWatch({
    name: "placement.replicaScheduiling.staticWeightList",
  });

  return (
    <>
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
              }}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Type</Checkbox.Label>
            </Checkbox.Root>
          </Field.Label>
        </Field.Root>
        {isType === true ? <ReplicaSchedulingType /> : null}
      </Flex>
      {isType === true ? (
        <>
          {watchType === "divided" ? (
            <>
              <DivisionPreference />
              {watchDividedType === "weighted" ? <WeightPreference /> : null}
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
}

function ReplicaSchedulingType() {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name="placement.replicaScheduiling.replicaSchedulingType"
      control={control}
      defaultValue="duplicated"
      render={({ field }) => {
        const handleValueChange = (details: RadioCardValueChangeDetails) => {
          if (details.value === "duplicated" || details.value === "divided") {
            field.onChange(details.value);
            setValue(
              "placement.replicaScheduiling.replicaDivisionpreference",
              "aggregated"
            );
            setValue("placement.replicaScheduiling.staticWeightList", []);
          }
        };

        return (
          <RadioCard.Root
            name="type"
            value={field.value}
            onValueChange={handleValueChange}
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
        );
      }}
    />
  );
}
function DivisionPreference() {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name="placement.replicaScheduiling.replicaDivisionpreference"
      control={control}
      defaultValue="aggregated"
      render={({ field }) => {
        const handleValueChange = (details: RadioCardValueChangeDetails) => {
          if (details.value === "aggregated" || details.value === "weighted") {
            field.onChange(details.value);
            setValue("placement.replicaScheduiling.staticWeightList", []);
          }
        };

        return (
          <Flex marginBottom="2%">
            <Field.Root variant="horizontal" width="180px">
              <Field.Label whiteSpace="nowrap">Division Preference</Field.Label>
            </Field.Root>
            <RadioCard.Root
              name="divisionPreference"
              defaultValue="aggregated"
              onValueChange={handleValueChange}
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
        );
      }}
    />
  );
}
function WeightPreference() {
  const { control } = useFormContext();
  const { data: clusterList } = useSuspenseQuery({
    queryKey: [
      "getClusterListApi",
      "placement",
      "replicaScheduiling",
      "replicaDivisionpreference",
    ],
    queryFn: () => {
      return getClusterListApi({});
    },
  });
  return (
    <Controller
      name="placement.replicaScheduiling.replicaDivisionpreference"
      control={control}
      defaultValue="aggregated"
      render={({ field }) => {
        const handleCheckboxChange = (value: string[]) => {
          field.onChange(value);
        };
        return (
          <>
            <Field.Root variant="horizontal" marginBottom="1%">
              <HStack gap="3">
                <Field.Label whiteSpace="nowrap">Weight Preference</Field.Label>
                <Button variant="smallBlue">
                  <FaPlus />
                </Button>
              </HStack>
            </Field.Root>
            <Flex overflowY="auto" maxHeight="250px" width="100%">
              <Box p="2%" bg="gray.100" m="1%" position="relative" width="100%">
                <CloseButton variant="inbox" marginRight="2.5%" />
                <Box width="80%">
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
                    <CheckboxGroup
                      onValueChange={(value) => handleCheckboxChange(value)}
                    >
                      <Flex justify="flex-start">
                        {clusterList.clusters.map((cluster) => {
                          return (
                            <Box key={cluster.name}>
                              <CheckboxCard.Root
                                key={cluster.name}
                                value={cluster.name}
                              >
                                <CheckboxCard.HiddenInput />
                                <CheckboxCard.Control>
                                  <CheckboxCard.Label>
                                    {cluster.name}
                                  </CheckboxCard.Label>
                                  <CheckboxCard.Indicator />
                                </CheckboxCard.Control>
                              </CheckboxCard.Root>
                            </Box>
                          );
                        })}
                      </Flex>
                    </CheckboxGroup>
                  </Flex>
                  <Field.Root
                    required
                    className="basic-font"
                    paddingTop="2%"
                    paddingBottom="1%"
                    orientation="horizontal"
                  >
                    <Field.Label>
                      - Weight
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input width="50px" />
                  </Field.Root>
                </Box>
              </Box>
            </Flex>
          </>
        );
      }}
    />
  );
}

function StepActionButtons({
  onPrev,
  onSubmit,
}: {
  onPrev: () => void;
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
        </Flex>
        <Button onClick={() => onSubmit()} variant="blue" marginLeft="5px">
          Apply
        </Button>
      </Flex>
    </ButtonGroup>
  );
}
