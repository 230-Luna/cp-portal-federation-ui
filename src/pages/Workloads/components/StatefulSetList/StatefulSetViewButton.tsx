import React from 'react';
import { Button } from '@/components/Button';

interface StatefulSetViewButtonProps {
  statefulSetName: string;
  onClick: () => void;
}

export default function StatefulSetViewButton({
  statefulSetName,
  onClick,
}: StatefulSetViewButtonProps) {
  return (
    <Button variant='blueOutline' size='sm' onClick={onClick}>
      View
    </Button>
  );
}
