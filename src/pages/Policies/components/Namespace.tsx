import { Text, Portal, Select, createListCollection } from "@chakra-ui/react";
export default function Namespace() {
  return (
    <>
      <Select.Root collection={frameworks} size="md" width="170px">
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
              <Select.Item item="all">
                All
                <Select.ItemIndicator />
              </Select.Item>
              {frameworks.items.map((framework) => (
                <Select.Item item={framework} key={framework.value}>
                  {framework.label}
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

const frameworks = createListCollection({
  items: [
    { label: "default", value: "react" },
    { label: "name2", value: "vue" },
    { label: "kubename", value: "angular" },
    { label: "spaces", value: "svelte" },
  ],
});
