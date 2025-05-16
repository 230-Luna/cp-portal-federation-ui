import { CloseButton } from "@/components/CloseButton";
import { Input } from "@/components/Input";
import { InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function SearchBar({
  onChange,
  placeholder,
}: {
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debouncedOnChange = useDebounce(searchInput, 300);

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  onChange(debouncedOnChange);

  return (
    <InputGroup
      startElement={<LuSearch size="30px" />}
      endElement={
        searchInput.length > 0 ? (
          <CloseButton
            onClick={() => {
              setSearchInput("");
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
        value={searchInput}
        onChange={handleChangeSearchInput}
        size="xl"
      />
    </InputGroup>
  );
}
