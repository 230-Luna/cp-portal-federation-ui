import { Table } from '@/components/Table';
import { Flex } from '@/components/Flex';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Box, Tag, VStack } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { getPropagationPolicyListApi } from '@/apis/propagationPolicy';
import { PropagationPolicy } from '@/models/propagationPolicyModel';
import PropagationPolicyDeleteButton from './PropagationPolicyDeleteButton';
import PropagationPolicyViewButton from './PropagationPolicyViewButton';
import Pagination from '@/components/Pagination';
import { Heading } from '@/components/Heading';

export default function PropagationPolicyList() {
  const itemsPerPage = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || undefined;
  const filterBy = searchParams.get('filterBy') || undefined;
  const namespace = searchParams.get('namespace') || undefined;
  const currentPage = Number(searchParams.get('page') ?? '1');
  const setCurrentPage = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const { data: propagationPolicyList } = useSuspenseQuery({
    queryKey: [
      'getPropagationPolicyListApi',
      namespace,
      filterBy,
      currentPage,
      itemsPerPage,
      sortBy,
    ],
    queryFn: () => {
      return getPropagationPolicyListApi({
        namespace,
        filterBy,
        page: currentPage,
        itemsPerPage,
        sort: sortBy,
      });
    },
  });

  if (propagationPolicyList.propagationPolicies.length === 0) {
    return (
      <Heading variant='center' marginTop='10%'>
        결과가 없습니다.
      </Heading>
    );
  }

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Namespace</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Conflict Resolution</Table.ColumnHeader>
            <Table.ColumnHeader>Affected Clusters</Table.ColumnHeader>
            <Table.ColumnHeader>Operation</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {propagationPolicyList.propagationPolicies.map(
            (propagationPolicy: PropagationPolicy) => (
              <Table.Row key={propagationPolicy.uid}>
                <Table.Cell>{propagationPolicy.namespace}</Table.Cell>
                <Table.Cell>{propagationPolicy.name}</Table.Cell>
                <Table.Cell>{propagationPolicy.conflictResolution}</Table.Cell>
                <Table.Cell>
                  <VStack>
                    {propagationPolicy.relatedClusters.length !== 0 ? (
                      propagationPolicy.relatedClusters.map(
                        (relatedCluster, index) => (
                          <Tag.Root key={index} margin={0.5}>
                            <Tag.Label>{relatedCluster}</Tag.Label>
                          </Tag.Root>
                        )
                      )
                    ) : (
                      <Box>-</Box>
                    )}
                  </VStack>
                </Table.Cell>
                <Table.Cell>
                  <Flex justify='space-evenly'>
                    <PropagationPolicyViewButton
                      namespace={propagationPolicy.namespace}
                      name={propagationPolicy.name}
                    />
                    <PropagationPolicyDeleteButton
                      namespace={propagationPolicy.namespace}
                      name={propagationPolicy.name}
                    />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table.Root>
      <Pagination
        totalItemCount={propagationPolicyList.listMeta.totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}
