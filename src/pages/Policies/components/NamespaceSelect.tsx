import { getNamespaceListApi } from "@/apis/namespace";
import {
  Portal,
  Select,
  SelectValueChangeDetails,
  createListCollection,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function NamespaceSelect() {
  const [value, setValue] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectValueChange = (details: SelectValueChangeDetails) => {
    setValue(details.value);
    if (details.value[0] !== "all") {
      searchParams.set("namespace", details.value[0]);
      setSearchParams(searchParams);
    }
  };

  const { data: namespaceList } = useSuspenseQuery({
    queryKey: ["getNamespaceListApi"],
    queryFn: () => getNamespaceListApi(),
  });

  const namespaceCollection = createListCollection({
    items: namespaceList.namespaces,
  });

  return (
    <Select.Root
      collection={namespaceCollection}
      value={value}
      onValueChange={handleSelectValueChange}
      size="md"
      width="200px"
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select namespace" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.Item item="all" key="all">
              All
              <Select.ItemIndicator />
            </Select.Item>
            {namespaceList.namespaces.map((namespace) => (
              <Select.Item item={namespace} key={namespace}>
                {namespace}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
