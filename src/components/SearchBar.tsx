import { CloseButton } from "@/components/CloseButton";
import { Input } from "@/components/Input";
import { InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useEffect, useRef } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  onSearch: (searchKeyword: string) => void;
  placeholder: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debouncedSearchedKeyword = useDebounce<string>(value, 300);

  useEffect(() => {
    onSearch(debouncedSearchedKeyword);
  }, [debouncedSearchedKeyword]);

  return (
    <InputGroup
      startElement={<LuSearch size="30px" />}
      endElement={
        value.length > 0 ? (
          <CloseButton
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            marginEnd="-2"
          />
        ) : undefined
      }
      width="450px"
    >
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
        size="xl"
      />
    </InputGroup>
  );
}
