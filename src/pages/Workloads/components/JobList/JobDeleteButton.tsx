import React from "react";
import { Button } from "@/components/Button";

interface JobDeleteButtonProps {
  jobName: string;
  onDelete: () => void;
}

export default function JobDeleteButton({
  jobName,
  onDelete,
}: JobDeleteButtonProps) {
  return (
    <Button variant="redOutline" size="sm" onClick={onDelete}>
      Delete
    </Button>
  );
}
