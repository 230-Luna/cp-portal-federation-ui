import { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function useResetLevelChange(fieldPathsToReset: string[]) {
  const { setValue } = useFormContext();
  const level = useWatch({ name: "level" });
  const prevLevel = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (prevLevel.current !== undefined && prevLevel.current !== level) {
      console.log("초기화중...");

      setValue("data.resourceSelectors", []);
      setValue("data.placement.clusternames", []);
      setValue("data.placement.replicaScheduiling", {});
    }

    prevLevel.current = level;
  }, [level, setValue]);
}
