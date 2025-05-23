import {
  createListCollection,
  Portal,
  Select,
  SelectValueChangeDetails,
} from "@chakra-ui/react";

export default function SortSelect({
  level,
  onValueChange,
}: {
  level: string;
  onValueChange: (velue: string) => void;
}) {
  let sortOptions: Record<string, string> = {
    newest: "d,creationTimestamp",
    oldest: "a,creationTimestamp",
    name: "a,name",
  };

  if (level === "Namespace level") {
    sortOptions = { ...sortOptions, namespace: "a,namespace" };
  }

  let sort = Object.keys(sortOptions);

  const handleSelectValueChange = (details: SelectValueChangeDetails) => {
    onValueChange(sortOptions[details.value[0]]);
  };

  const sortCollection = createListCollection({
    items: sort,
  });

  return (
    <Select.Root
      collection={sortCollection}
      defaultValue={["newest"]}
      onValueChange={handleSelectValueChange}
      size="sm"
      width="100px"
      marginBottom="10px"
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {sortCollection.items.map((item) => (
              <Select.Item item={item} key={item}>
                {item}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
