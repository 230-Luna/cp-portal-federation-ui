import { SegmentGroup } from "@/components/SegmentGroup";
import { SegmentGroupValueChangeDetails } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export default function LevelSelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleValueChange = (details: SegmentGroupValueChangeDetails) => {
    const value = details.value;
    if (value !== null) {
      onValueChange(value);
      searchParams.set("level", value.split(" ")[0]);
      searchParams.delete("page");
      searchParams.delete("sortBy");
      searchParams.delete("searchWord");
      searchParams.delete("namespace");
      setSearchParams(searchParams);
      console.log("level searchParams: ", searchParams);
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
