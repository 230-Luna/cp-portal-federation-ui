import { Table } from '@/components/Table';
import { Flex } from '@/components/Flex';
import { useSuspenseQuery } from '@tanstack/react-query';
import Pagination from '@/components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { Heading } from '@/components/Heading';
import { getNamespaceListApi } from '@/apis/namespace';
import { Namespace } from '@/models/namespaceModel';
import NamespaceViewButton from './NamespaceViewButton';
import NamespaceDeleteButton from './NamespaceDeleteButton';

export default function NamespaceList() {
  const itemsPerPage = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || undefined;
  const filterBy = searchParams.get('filterBy') || undefined;
  const currentPage = Number(searchParams.get('page') ?? '1');
  const setCurrentPage = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const { data: namespaceList } = useSuspenseQuery({
    queryKey: [
      'getNamespaceListApi',
      filterBy,
      currentPage,
      itemsPerPage,
      sortBy,
    ],
    queryFn: () => {
      return getNamespaceListApi({
        filterBy,
        page: currentPage,
        itemsPerPage,
        sort: sortBy,
      });
    },
  });
  if (namespaceList.namespaces.length === 0) {
    return (
      <Heading variant='center' marginTop='10%'>
        네임스페이스가 없습니다.
      </Heading>
    );
  }
  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Creation Time</Table.ColumnHeader>
            <Table.ColumnHeader>Operation</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {namespaceList.namespaces.map((namespace: Namespace) => (
            <Table.Row key={namespace.name}>
              <Table.Cell>{namespace.name}</Table.Cell>
              <Table.Cell>{namespace.status}</Table.Cell>
              <Table.Cell>{namespace.created}</Table.Cell>
              <Table.Cell>
                <Flex justify='space-evenly'>
                  <NamespaceViewButton name={namespace.name} />
                  <NamespaceDeleteButton name={namespace.name} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        totalItemCount={namespaceList.listMeta.totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}
