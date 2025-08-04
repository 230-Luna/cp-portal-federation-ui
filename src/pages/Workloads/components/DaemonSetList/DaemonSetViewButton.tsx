import React from "react";
import { Button } from "@/components/Button";

interface DaemonSetViewButtonProps {
  daemonSetName: string;
  onClick: () => void;
}

export default function DaemonSetViewButton({
  daemonSetName,
  onClick,
}: DaemonSetViewButtonProps) {
  return (
    <Button variant="blueOutline" size="sm" onClick={onClick}>
      View
    </Button>
  );
}
