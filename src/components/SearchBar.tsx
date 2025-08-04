import { CloseButton } from '@/components/CloseButton';
import { Input } from '@/components/Input';
import { InputGroup } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';

export default function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const debouncedOnChange = useDebounce(searchText, 300);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(prev => ({ ...prev, filterBy: debouncedOnChange }));
  }, [debouncedOnChange]);

  return (
    <InputGroup
      startElement={<LuSearch size='30px' />}
      endElement={
        searchText.length > 0 ? (
          <CloseButton
            onClick={() => {
              setSearchText('');
              inputRef.current?.focus();
            }}
            marginEnd='-2'
          />
        ) : null
      }
      width='450px'
    >
      <Input
        ref={inputRef}
        placeholder='검색할 키워드를 입력하세요'
        value={searchText}
        onChange={event => setSearchText(event.target.value)}
        size='xl'
      />
    </InputGroup>
  );
}
