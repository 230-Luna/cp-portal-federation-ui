import { SegmentGroup } from "@/components/SegmentGroup";
import { SegmentGroupValueChangeDetails } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export type Level = "namespace" | "cluster";

export default function LevelSelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: Level) => void;
}) {
  const handleValueChange = (details: SegmentGroupValueChangeDetails) => {
    const value = details.value as Level;
    if (value !== null) {
      onValueChange(value);
    }
  };

  return (
    <SegmentGroup.Root
      value={value}
      variant="medium"
      onValueChange={handleValueChange}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["namespace", "cluster"]} />
    </SegmentGroup.Root>
  );
}
