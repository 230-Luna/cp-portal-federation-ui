import { getResourceNamespaceListApi } from '@/apis/resource';
import { NativeSelect } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function WorkloadNamespaceSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');

  useEffect(() => {
    const namespaceFromUrl = searchParams.get('namespace');
    if (namespaceFromUrl) {
      setValue(namespaceFromUrl);
    } else {
      setValue('');
    }
  }, [searchParams]);

  const handleSelectValueChange = (value: string) => {
    setValue(value);
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set('namespace', value);
    } else {
      newSearchParams.delete('namespace');
    }
    setSearchParams(newSearchParams);
  };

  const { data: resourceNamespaceList } = useSuspenseQuery({
    queryKey: ['getResourceNamespaceListApi', 'namespaceSelect'],
    queryFn: () => getResourceNamespaceListApi({}),
  });

  return (
    <NativeSelect.Root size='md' width='200px'>
      <NativeSelect.Field
        name='namespaces'
        placeholder='Select Namespace'
        value={value}
        onChange={event => handleSelectValueChange(event.target.value)}
      >
        {resourceNamespaceList.namespaces.map(namespace => (
          <option value={namespace} key={namespace}>
            {namespace}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
}
