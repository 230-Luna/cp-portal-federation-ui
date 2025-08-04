import React from 'react';
import { Button } from '@/components/Button';

interface StatefulSetDeleteButtonProps {
  statefulSetName: string;
  onDelete: () => void;
}

export default function StatefulSetDeleteButton({
  statefulSetName,
  onDelete,
}: StatefulSetDeleteButtonProps) {
  return (
    <Button variant='redOutline' size='sm' onClick={onDelete}>
      Delete
    </Button>
  );
}
