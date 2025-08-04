import { Button } from '@/components/Button';
import { Drawer } from '@chakra-ui/react';
import { useState } from 'react';

export default function DeploymentDeleteButton({
  namespace,
  name,
}: {
  namespace: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root
      size='full'
      open={open}
      onOpenChange={details => setOpen(details.open)}
    >
      <Drawer.Trigger asChild>
        <Button variant='redOutline' size='sm'>
          Delete
        </Button>
      </Drawer.Trigger>
      {open === true ? (
        <DeploymentDeleteDrawer
          namespace={namespace}
          name={name}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </Drawer.Root>
  );
}

function DeploymentDeleteDrawer({
  namespace,
  name,
  onClose,
}: {
  namespace: string;
  name: string;
  onClose: () => void;
}) {
  return (
    <Drawer.Root size='full' open onOpenChange={onClose}>
      <Drawer.Trigger asChild>
        <Button variant='redOutline' size='sm'>
          Delete
        </Button>
      </Drawer.Trigger>
    </Drawer.Root>
  );
}
