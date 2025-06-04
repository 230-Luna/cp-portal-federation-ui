import { Progress } from "@/components/Progress";
import Metadata from "./Metadata";
import ResourceSelectors from "./ResourceSelectors";
import Placement from "./Placement";

interface MultistepProps {
  step: number;
  progress: number;
}

export default function Multistep({ step, progress }: MultistepProps) {
  return (
    <>
      <Progress value={progress} />
      {step === 1 ? (
        <Metadata />
      ) : step === 2 ? (
        <ResourceSelectors />
      ) : (
        <Placement />
      )}
    </>
  );
}
