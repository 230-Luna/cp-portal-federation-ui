import { getResourceDetailApi, updateResourceApi } from '@/apis/resource';
import { Button } from '@/components/Button';
import { CloseButton } from '@/components/CloseButton';
import { toaster } from '@/components/Toaster';
import { Box, Drawer, Portal } from '@chakra-ui/react';
import {
  useIsMutating,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { MonacoDiffEditor, monaco } from 'react-monaco-editor';

export default function DaemonSetViewButton({
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
        <Button variant='blueGhost'>View</Button>
      </Drawer.Trigger>
      {open === true ? (
        <DaemonSetYamlViwerDrawer
          namespace={namespace}
          name={name}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </Drawer.Root>
  );
}

function DaemonSetYamlViwerDrawer({
  namespace,
  name,
  onClose,
}: {
  namespace: string;
  name: string;
  onClose: () => void;
}) {
  const [daemonSetData, setDaemonSetData] = useState('');
  const editorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);

  const queryClient = useQueryClient();

  const { data: daemonSetDetail } = useSuspenseQuery({
    queryKey: ['getResourceDetailApi', 'daemonset', namespace, name],
    queryFn: () => getResourceDetailApi({ kind: 'daemonset', namespace, name }),
  });

  useEffect(() => {
    if (daemonSetDetail?.yaml) {
      setDaemonSetData(daemonSetDetail.yaml);
    }
  }, [daemonSetDetail]);

  const handleEditDaemonSet = useMutation({
    mutationKey: ['handleEditDaemonSet', 'daemonset', namespace, name],
    mutationFn: async () => {
      let loadingToaster;
      try {
        onClose();
        loadingToaster = toaster.create({
          type: 'loading',
          description: `DaemonSet를 수정하고 있습니다.`,
        });
        await updateResourceApi({
          data: daemonSetData,
        });
        toaster.remove(loadingToaster);
        toaster.success({
          description: `${name} DaemonSet가 수정되었습니다.`,
        });
        queryClient.invalidateQueries({
          queryKey: ['getResourceDetailApi', 'daemonset', namespace, name],
        });
      } catch (error: any) {
        toaster.error({
          description: `${error.response.data.message || '알 수 없는 오류'}`,
        });
      } finally {
        if (loadingToaster) {
          toaster.remove(loadingToaster);
        }
      }
    },
  });

  const editDaemonSetMutationCount = useIsMutating({
    mutationKey: ['handleEditDaemonSet', 'daemonset', namespace, name],
  });

  const handleEditorChange = (value: string | undefined) => {
    if (value != null) {
      setDaemonSetData(value);
    }
  };
  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneDiffEditor
  ) => {
    editorRef.current = editor;
  };

  return daemonSetDetail == null ? null : (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{daemonSetDetail.name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Box height='92%'>
              <MonacoDiffEditor
                original={daemonSetDetail.yaml}
                value={daemonSetData}
                onChange={handleEditorChange}
                editorDidMount={handleEditorDidMount}
                language='yaml'
                height='100%'
                options={{
                  scrollbar: {
                    vertical: 'auto',
                    horizontal: 'auto',
                    handleMouseWheel: true,
                  },
                  overviewRulerLanes: 0,
                  scrollBeyondLastLine: false,
                  renderOverviewRuler: false,
                  renderSideBySide: false,
                }}
              />
            </Box>
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.ActionTrigger asChild>
              <Button variant='blueOutline'>Cancel</Button>
            </Drawer.ActionTrigger>
            <Button
              variant='blue'
                disabled={editDaemonSetMutationCount > 0}
              onClick={() => handleEditDaemonSet.mutate()}
            >
              Edit
            </Button>
          </Drawer.Footer>
          <Drawer.CloseTrigger asChild>
            <CloseButton />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
}
