import { SegmentGroup } from "@/components/SegmentGroup";
import { SegmentGroupValueChangeDetails } from "@chakra-ui/react";

export default function LevelSelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  const handleValueChange = (details: SegmentGroupValueChangeDetails) => {
    if (details.value !== null) {
      onValueChange(details.value);
    }
  };

  return (
    <SegmentGroup.Root
      value={value}
      variant="medium"
      onValueChange={handleValueChange}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["Namespace level", "Cluster level"]} />
    </SegmentGroup.Root>
  );
}
