import { getNamespaceListApi } from "@/apis/namespace";
import {
  Portal,
  Select,
  SelectValueChangeDetails,
  createListCollection,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function NamespaceSelect({
  onValueChange,
}: {
  onValueChange: (namespace: string) => void;
}) {
  const [value, setValue] = useState<string[]>([]);

  const handleSelectValueChange = (details: SelectValueChangeDetails) => {
    setValue(details.value);
    if (details.value[0] === "all") {
      onValueChange("");
    } else {
      onValueChange(details.value[0]);
    }
  };

  const { data: namespaceList } = useSuspenseQuery({
    queryKey: ["getNamespaceListApi"],
    queryFn: () => getNamespaceListApi(),
  });

  const collection = createListCollection({
    items: namespaceList.namespaces,
    itemToValue: (item) => item,
    itemToString: (item) => item,
  });

  return (
    <>
      <Select.Root
        collection={collection}
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
    </>
  );
}
