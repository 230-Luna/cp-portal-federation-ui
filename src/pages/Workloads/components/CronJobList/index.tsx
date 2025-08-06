import { getResourceListApi } from '@/apis/resource';
import { Flex } from '@/components/Flex';
import { Heading } from '@/components/Heading';
import Pagination from '@/components/Pagination';
import { Table } from '@/components/Table';
import { Resource } from '@/models/resourceModel';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import CronJobDeleteButton from './CronJobDeleteButton';
import CronJobViewButton from './CronJobViewButton';

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

  const { data: cronJobList } = useSuspenseQuery({
    queryKey: [
      'getCronJobListApi',
      namespace,
      filterBy,
      currentPage,
      itemsPerPage,
      sortBy,
    ],
    queryFn: () => {
      return getResourceListApi({
        kind: 'cronjob',
        namespace,
        filterBy,
        page: currentPage,
        itemsPerPage,
        sort: sortBy,
      });
    },
  });

  if (cronJobList.resources.length === 0) {
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
          {cronJobList.resources.map((resource: Resource) => (
            <Table.Row key={`${resource.namespace}-${resource.name}`}>
              <Table.Cell>{resource.namespace}</Table.Cell>
              <Table.Cell>{resource.name}</Table.Cell>
              <Table.Cell>{resource.policy.name}</Table.Cell>
              <Table.Cell>
                <Flex justify='space-evenly'>
                  <CronJobViewButton
                    namespace={resource.namespace}
                    name={resource.name}
                  />
                  <CronJobDeleteButton
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
        totalItemCount={cronJobList.listMeta.totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}
