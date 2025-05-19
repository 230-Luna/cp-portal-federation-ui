import { getNamespaceListApi } from "@/apis/namespace";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Namespace() {
    {
    onValueChange,
  }: {
    onValueChange: (value: string) => void;
  }

  const [value, setValue] = useState<string[]>([]);

  const handleSelectValueChange = (event:  ) => {
    setValue(event.value)
  }

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
        width="170px"
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
