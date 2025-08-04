import React from 'react';
import { Button } from '@/components/Button';

interface DaemonSetDeleteButtonProps {
  daemonSetName: string;
  onDelete: () => void;
}

export default function DaemonSetDeleteButton({
  daemonSetName,
  onDelete,
}: DaemonSetDeleteButtonProps) {
  return (
    <Button variant='redOutline' size='sm' onClick={onDelete}>
      Delete
    </Button>
  );
}
