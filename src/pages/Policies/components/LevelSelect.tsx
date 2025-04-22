import { SegmentGroup } from "@chakra-ui/react";

export default function LevelSelect() {
  return (
    <SegmentGroup.Root defaultValue="Namespace level" size="md">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["Namespace level", "Cluster level"]} />
    </SegmentGroup.Root>
  );
}
