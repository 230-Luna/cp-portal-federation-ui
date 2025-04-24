import { SegmentGroup } from "@/components/SegmentGroup";

export default function LevelSelect() {
  return (
    <SegmentGroup.Root defaultValue="Namespace level" variant="medium">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["Namespace level", "Cluster level"]} />
    </SegmentGroup.Root>
  );
}
