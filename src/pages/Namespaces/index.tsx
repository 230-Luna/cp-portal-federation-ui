import { Flex } from '@/components/Flex';
import SearchBar from '@/components/SearchBar';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, useEffect } from 'react';
import SortSelect from '@/components/SortSelect';
import { useSearchParams } from 'react-router-dom';
import NamespaceList from './components/NamespaceList';
import NamespaceAddButton from '../Namespaces/components/NamespaceAddButton';

export default function Namespaces() {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    searchParams.delete('filterBy');
    searchParams.delete('page');
    searchParams.delete('sortBy');
    setSearchParams(searchParams);
  }, []);
  return (
    <>
      <Flex justify='flex-end' marginTop='9px' marginBottom='50px'>
        <SearchBar />
        <NamespaceAddButton />
      </Flex>
      <Flex justify='flex-end'>
        <SortSelect level='namespace' />
      </Flex>
      <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
        <Suspense fallback=''>
          <NamespaceList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
