import { useEffect, useState } from 'react';
import { Heading } from '@/components/Heading';
import { CheckboxCard } from '@/components/CheckboxCard';
import { CloseButton } from '@/components/CloseButton';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { FaPlus } from 'react-icons/fa';
import { Flex } from '@/components/Flex';
import { RadioCard } from '@/components/RadioCard';
import { Input } from '@/components/Input';
import { Field } from '@/components/Field';
import {
  HStack,
  Checkbox,
  Box,
  CheckboxGroup,
  ButtonGroup,
  RadioCardValueChangeDetails,
  Badge,
  Stack,
} from '@chakra-ui/react';
import {
  Controller,
  useController,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getClusterListApi } from '@/apis/cluster';

export default function Placement({
  onPrev,
  onSubmit,
  resetData,
}: {
  onPrev: () => void;
  onSubmit: () => void;
  resetData: boolean;
}) {
  return (
    <>
      <Heading variant='center' marginTop='2%' marginBottom='3%'>
        Placement
      </Heading>
      <ClusterAffinity resetData={resetData} />
      <ReplicaScheduling resetData={resetData} />
      <StepActionButtons onPrev={onPrev} onSubmit={onSubmit} />
    </>
  );
}

function ClusterAffinity({ resetData }: { resetData: boolean }) {
  const { control, resetField } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'data.placement.clusternames',
    control,
    rules: { required: 'cluster를 하나이상 선택하세요' },
  });

  const { data: clusterList } = useSuspenseQuery({
    queryKey: [
      'getClusterListApi',
      'placement',
      'clusterAffinity',
      'clusterNames',
    ],
    queryFn: () => {
      return getClusterListApi({});
    },
  });

  useEffect(() => {
    if (resetData) {
      resetField('data.placement.clusternames', { defaultValue: [] });
    }
  }, [resetData]);

  return (
    <>
      <Text variant='subTitle' marginTop='1.5%'>
        Cluster Affinity
      </Text>
      <Flex>
        <Field.Root required invalid={Boolean(error)} width='180px'>
          <Field.Label whiteSpace='nowrap'>
            Cluster Names
            <Field.RequiredIndicator />
          </Field.Label>
          {error ? (
            <Field.ErrorText>{error.message}</Field.ErrorText>
          ) : (
            <Stack height='16px' />
          )}
        </Field.Root>
        <CheckboxGroup value={field.value || []} onValueChange={field.onChange}>
          <Flex justify='flex-start'>
            {clusterList.clusters.map(cluster => {
              return (
                <Box key={cluster.name}>
                  <CheckboxCard.Root key={cluster.name} value={cluster.name}>
                    <CheckboxCard.HiddenInput />
                    <CheckboxCard.Control>
                      <CheckboxCard.Label>{cluster.name}</CheckboxCard.Label>
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
}

function ReplicaScheduling({ resetData }: { resetData: boolean }) {
  const { resetField, setValue } = useFormContext();

  const watchSelectReplicaScheduling = useWatch({
    name: 'selectReplicaScheduling',
  });

  const watchReplicaSchedulingType = useWatch({
    name: 'data.placement.replicaScheduiling.replicaSchedulingType',
  });
  const watchDividedType = useWatch({
    name: 'data.placement.replicaScheduiling.replicaDivisionpreference',
  });

  useEffect(() => {
    if (resetData) {
      setValue('selectReplicaScheduling', false);
      resetField('data.placement.replicaScheduiling.replicaSchedulingType');
      resetField('data.placement.replicaScheduiling.replicaDivisionpreference');
      resetField('data.placement.replicaScheduiling.staticWeightList');
    }
  }, [resetData]);

  return (
    <>
      <Text variant='subTitle' marginTop='1.5%'>
        Replica Scheduling
      </Text>
      <Flex marginBottom='2%'>
        <Field.Root variant='horizontal' width='180px'>
          <Field.Label>
            <Checkbox.Root
              colorPalette='blue'
              checked={watchSelectReplicaScheduling}
              onCheckedChange={() => {
                setValue(
                  'selectReplicaScheduling',
                  !watchSelectReplicaScheduling
                );

                if (watchSelectReplicaScheduling) {
                  setValue(
                    'data.placement.replicaScheduiling.replicaSchedulingType',
                    'Duplicated'
                  );
                  resetField(
                    'data.placement.replicaScheduiling.replicaDivisionpreference'
                  );
                  resetField(
                    'data.placement.replicaScheduiling.staticWeightList'
                  );
                } else {
                  resetField(
                    'data.placement.replicaScheduiling.replicaSchedulingType'
                  );
                  resetField(
                    'data.placement.replicaScheduiling.replicaDivisionpreference'
                  );
                  resetField(
                    'data.placement.replicaScheduiling.staticWeightList'
                  );
                }
              }}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Type</Checkbox.Label>
              <Field.RequiredIndicator
                fallback={
                  <Badge size='xs' variant='surface' colorPalette='gray'>
                    Optional
                  </Badge>
                }
              />
            </Checkbox.Root>
          </Field.Label>
        </Field.Root>
        {watchSelectReplicaScheduling === true ? (
          <ReplicaSchedulingType />
        ) : null}
      </Flex>
      {watchSelectReplicaScheduling === true ? (
        <>
          {watchReplicaSchedulingType === 'Divided' ? (
            <>
              <DivisionPreference />
              {watchDividedType === 'Weighted' ? <WeightPreference /> : null}
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
}

function ReplicaSchedulingType() {
  const { control, setValue } = useFormContext();
  const { field } = useController({
    name: 'data.placement.replicaScheduiling.replicaSchedulingType',
    control,
  });

  const handleValueChange = (details: RadioCardValueChangeDetails) => {
    if (details.value === 'Duplicated' || details.value === 'Divided') {
      field.onChange(details.value);
      setValue(
        'data.placement.replicaScheduiling.replicaDivisionpreference',
        'Aggregated'
      );
      setValue('data.placement.replicaScheduiling.staticWeightList', []);
    }
  };

  return (
    <RadioCard.Root
      name='type'
      defaultValue='Duplicated'
      value={field.value}
      onValueChange={handleValueChange}
    >
      <Flex justify='flex-start'>
        <RadioCard.Item value='Duplicated'>
          <RadioCard.ItemHiddenInput />
          <RadioCard.ItemControl>
            <RadioCard.ItemText>Duplicated</RadioCard.ItemText>
            <RadioCard.ItemIndicator />
          </RadioCard.ItemControl>
        </RadioCard.Item>
        <RadioCard.Item value='Divided'>
          <RadioCard.ItemHiddenInput />
          <RadioCard.ItemControl>
            <RadioCard.ItemText>Divided</RadioCard.ItemText>
            <RadioCard.ItemIndicator />
          </RadioCard.ItemControl>
        </RadioCard.Item>
      </Flex>
    </RadioCard.Root>
  );
}

function DivisionPreference() {
  const { control, setValue } = useFormContext();
  const { field } = useController({
    name: 'data.placement.replicaScheduiling.replicaDivisionpreference',
    control,
  });

  const handleValueChange = (details: RadioCardValueChangeDetails) => {
    if (details.value === 'Aggregated' || details.value === 'Weighted') {
      field.onChange(details.value);
      setValue('data.placement.replicaScheduiling.staticWeightList', []);
    }
  };

  return (
    <Flex marginBottom='2%'>
      <Field.Root variant='horizontal' width='180px'>
        <Field.Label whiteSpace='nowrap'>
          Division Preference
          <Field.RequiredIndicator
            fallback={
              <Badge size='xs' variant='surface'>
                Optional
              </Badge>
            }
          />
        </Field.Label>
      </Field.Root>
      <RadioCard.Root
        name='divisionPreference'
        value={field.value}
        onValueChange={handleValueChange}
      >
        <Flex justify='flex-start'>
          <RadioCard.Item value='Aggregated'>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemText>Aggregated</RadioCard.ItemText>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
          <RadioCard.Item value='Weighted'>
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
}

function WeightPreference() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data.placement.replicaScheduiling.staticWeightList',
  });

  const { data: clusterList } = useSuspenseQuery({
    queryKey: [
      'getClusterListApi',
      'placement',
      'replicaScheduiling',
      'staticWeightList',
    ],
    queryFn: () => {
      return getClusterListApi({});
    },
  });

  const [limitExceeded, setLimitExceeded] = useState(false);

  const handleAddButtonClick = () => {
    if (fields.length >= 20) {
      setLimitExceeded(true);
      return;
    }

    setLimitExceeded(false);
    append({ targetClusters: [], weight: 1 });
  };

  return (
    <>
      <Field.Root variant='horizontal'>
        <HStack gap='3'>
          <Field.Label whiteSpace='nowrap'>
            Weight Preference
            <Field.RequiredIndicator
              fallback={
                <Badge size='xs' variant='surface'>
                  Optional
                </Badge>
              }
            />
          </Field.Label>
          <Button variant='smallBlue' onClick={handleAddButtonClick}>
            <FaPlus />
          </Button>
        </HStack>
        <Field.HelperText>
          {limitExceeded === true ? (
            <Text color='red'>
              Weight Preference는 최대 20개까지 추가할 수 있습니다.
            </Text>
          ) : null}
        </Field.HelperText>
      </Field.Root>
      <Flex overflowY='auto' maxHeight='250px' flexDirection='row' width='100%'>
        {fields.map((item, index) => (
          <Box
            key={item.id}
            position='relative'
            padding='2%'
            backgroundColor='gray.100'
            width='100%'
          >
            <CloseButton
              position='absolute'
              variant='inbox'
              onClick={() => {
                (remove(index), setLimitExceeded(false));
              }}
            />
            <Box width='80%'>
              <Flex margin='2% 0' wrap='wrap'>
                <Field.Root required width='130px' height='82px'>
                  <Field.Label>
                    - Target Clusters
                    <Field.RequiredIndicator />
                  </Field.Label>
                </Field.Root>
                <Controller
                  control={control}
                  name={`data.placement.replicaScheduiling.staticWeightList.${index}.targetClusters`}
                  rules={{
                    validate: value =>
                      Array.isArray(value) && value.length > 0
                        ? true
                        : '최소 하나 이상의 클러스터를 선택해야 합니다.',
                  }}
                  render={({ field, fieldState }) => (
                    <Stack direction='column'>
                      <CheckboxGroup
                        value={field.value}
                        onValueChange={details => {
                          field.onChange(details);
                        }}
                      >
                        <Flex gap='2'>
                          {clusterList.clusters.map(cluster => (
                            <Box key={cluster.name}>
                              <CheckboxCard.Root
                                key={cluster.name}
                                value={cluster.name}
                                backgroundColor='white'
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
                          ))}
                        </Flex>
                      </CheckboxGroup>
                      {fieldState.error == null ? null : (
                        <Text color='red' fontSize='sm'>
                          {fieldState.error.message}
                        </Text>
                      )}
                    </Stack>
                  )}
                />
              </Flex>
              <Flex alignItems='center' margin='2% 0'>
                <Field.Root required width='130px'>
                  <Field.Label>
                    - Weight
                    <Field.RequiredIndicator />
                  </Field.Label>
                </Field.Root>
                <Controller
                  control={control}
                  name={`data.placement.replicaScheduiling.staticWeightList.${index}.weight`}
                  rules={{
                    required: 'Weight 값을 입력해주세요.',
                    validate: value =>
                      value > 0 ? true : '0보다 큰 수를 입력하세요',
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        type='number'
                        value={field.value}
                        onChange={e => field.onChange(Number(e.target.value))}
                        width='100px'
                      />
                      {fieldState.error && (
                        <Text color='red' fontSize='sm' marginLeft='2%'>
                          {fieldState.error.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </Flex>
            </Box>
          </Box>
        ))}
      </Flex>
    </>
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
    <ButtonGroup width='100%' marginTop='3%'>
      <Flex justifyContent='flex-end' width='100%'>
        <Button
          onClick={() => onPrev()}
          variant='blueOutline'
          marginRight='5px'
        >
          Back
        </Button>
        <Button onClick={() => onSubmit()} variant='blue' marginLeft='5px'>
          Apply
        </Button>
      </Flex>
    </ButtonGroup>
  );
}
