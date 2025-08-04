import React from "react";
import { Button } from "@/components/Button";

interface JobViewButtonProps {
  jobName: string;
  onClick: () => void;
}

export default function JobViewButton({
  jobName,
  onClick,
}: JobViewButtonProps) {
  return (
    <Button variant="blueOutline" size="sm" onClick={onClick}>
      View
    </Button>
  );
}
