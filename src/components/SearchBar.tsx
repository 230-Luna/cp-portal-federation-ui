import { CloseButton } from "@/components/CloseButton";
import { Input } from "@/components/Input";
import { InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useRef } from "react";

export default function SearchBar({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
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
