import { Table } from '@/components/Table';
import { Flex } from '@/components/Flex';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Box, Tag, VStack } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { getWorkloadListApi } from '@/apis/workload';
import { Workload } from '@/models/workloadModel';
import DeploymentDeleteButton from './DeploymentDeleteButton';
import DeploymentViewButton from './DeploymentViewButton';
import Pagination from '@/components/Pagination';
import { Heading } from '@/components/Heading';

export default function DeploymentList() {
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

  const { data: deploymentList } = useSuspenseQuery({
    queryKey: [
      'getDeploymentListApi',
      namespace,
      filterBy,
      currentPage,
      itemsPerPage,
      sortBy,
    ],
    queryFn: () => {
      return getWorkloadListApi({
        kind: 'deployment',
        namespace,
        filterBy,
        page: currentPage,
        itemsPerPage,
        sort: sortBy,
      });
    },
  });

  if (deploymentList.resources.length === 0) {
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
            <Table.ColumnHeader>Policies</Table.ColumnHeader>
            <Table.ColumnHeader>Operation</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {deploymentList.resources.map((resource: Workload) => (
            <Table.Row key={resource.name}>
              <Table.Cell>{resource.namespace}</Table.Cell>
              <Table.Cell>{resource.name}</Table.Cell>
              <Table.Cell>{resource.policy.name}</Table.Cell>
              <Table.Cell>
                <Flex justify='space-evenly'>
                  <DeploymentViewButton
                    namespace={resource.namespace}
                    name={resource.name}
                  />
                  <DeploymentDeleteButton
                    namespace={resource.namespace}
                    name={resource.name}
                  />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        totalItemCount={deploymentList.listMeta.totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}
