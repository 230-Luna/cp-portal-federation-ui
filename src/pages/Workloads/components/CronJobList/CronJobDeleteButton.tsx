import React from "react";
import { Button } from "@/components/Button";

interface CronJobDeleteButtonProps {
  cronJobName: string;
  onDelete: () => void;
}

export default function CronJobDeleteButton({
  cronJobName,
  onDelete,
}: CronJobDeleteButtonProps) {
  return (
    <Button variant="redOutline" size="sm" onClick={onDelete}>
      Delete
    </Button>
  );
}
