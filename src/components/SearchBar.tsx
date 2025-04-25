import { CloseButton } from "@/components/CloseButton";
import { Input } from "@/components/Input";
import { InputGroup, IconButton } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useRef, useState } from "react";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <InputGroup
      startElement={<LuSearch size="30px" />}
      endElement={
        value.length > 0 ? (
          <CloseButton
            onClick={() => {
              setValue("");
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
        placeholder=" Search Clusters"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        size="xl"
      />
    </InputGroup>
  );
}
