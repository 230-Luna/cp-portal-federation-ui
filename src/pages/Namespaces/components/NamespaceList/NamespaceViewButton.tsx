import { Button } from '@/components/Button';
import { CloseButton } from '@/components/CloseButton';
import { useQuery } from '@tanstack/react-query';
import { Box, Drawer, Portal } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { getNamespaceDetailApi } from '@/apis/namespace';

export default function NamespaceViewButton({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root
      size='lg'
      open={open}
      onOpenChange={details => setOpen(details.open)}
    >
      <Drawer.Trigger asChild>
        <Button variant='blueGhost'>View</Button>
      </Drawer.Trigger>
      {open === true ? <NamespaceYamlViwerDrawer name={name} /> : null}
    </Drawer.Root>
  );
}

function NamespaceYamlViwerDrawer({ name }: { name: string }) {
  const { data: namespaceDetail } = useQuery({
    queryKey: ['getNamespaceDetailApi', name],
    queryFn: () => getNamespaceDetailApi({ name }),
  });

  return namespaceDetail == null ? null : (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{namespaceDetail.name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Box height='92vh'>
              <Editor
                height='90vh'
                defaultLanguage='yaml'
                defaultValue={namespaceDetail.yaml}
                options={{
                  readOnly: true,
                  scrollbar: {
                    vertical: 'hidden',
                    horizontal: 'hidden',
                    handleMouseWheel: true,
                  },
                  overviewRulerLanes: 0,
                }}
              />
            </Box>
          </Drawer.Body>
          <Drawer.CloseTrigger asChild>
            <CloseButton />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
}
