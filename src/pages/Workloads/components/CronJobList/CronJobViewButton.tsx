import React from "react";
import { Button } from "@/components/Button";

interface CronJobViewButtonProps {
  cronJobName: string;
  onClick: () => void;
}

export default function CronJobViewButton({
  cronJobName,
  onClick,
}: CronJobViewButtonProps) {
  return (
    <Button variant="blueOutline" size="sm" onClick={onClick}>
      View
    </Button>
  );
}
