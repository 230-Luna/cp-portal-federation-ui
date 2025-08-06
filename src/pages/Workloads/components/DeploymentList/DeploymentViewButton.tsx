import { getResourceDetailApi, updateResourceApi } from '@/apis/resource';
import { Button } from '@/components/Button';
import { toaster } from '@/components/Toaster';
import { Box, CloseButton, Drawer, Portal } from '@chakra-ui/react';
import {
  useIsMutating,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { MonacoDiffEditor, monaco } from 'react-monaco-editor';

export default function DeploymentViewButton({
  namespace,
  name,
}: {
  namespace: string;
  name: string;
}) {
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
      {open === true ? (
        <DeploymentYamlViwerDrawer
          namespace={namespace}
          name={name}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </Drawer.Root>
  );
}

function DeploymentYamlViwerDrawer({
  namespace,
  name,
  onClose,
}: {
  namespace: string;
  name: string;
  onClose: () => void;
}) {
  const [deploymentData, setDeploymentData] = useState('');
  const editorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);

  const queryClient = useQueryClient();

  const { data: deploymentDetail } = useSuspenseQuery({
    queryKey: ['getResourceDetailApi', 'deployment', namespace, name],
    queryFn: () =>
      getResourceDetailApi({ kind: 'deployment', namespace, name }),
  });

  useEffect(() => {
    if (deploymentDetail?.yaml) {
      setDeploymentData(deploymentDetail.yaml);
    }
  }, [deploymentDetail]);

  const handleEditDeployment = useMutation({
    mutationKey: ['handleEditDeployment', 'deployment', namespace, name],
    mutationFn: async () => {
      let loadingToaster;
      try {
        onClose();
        loadingToaster = toaster.create({
          type: 'loading',
          description: `Deployment를 수정하고 있습니다.`,
        });
        await updateResourceApi({
          data: deploymentData,
        });
        toaster.remove(loadingToaster);
        toaster.success({
          description: `${name} Deployment가 수정되었습니다.`,
        });
        queryClient.invalidateQueries({
          queryKey: ['getResourceDetailApi', 'deployment', namespace, name],
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

  const editDeploymentMutationCount = useIsMutating({
    mutationKey: ['handleEditDeployment', 'deployment', namespace, name],
  });

  const handleEditorChange = (value: string | undefined) => {
    if (value != null) {
      setDeploymentData(value);
    }
  };
  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneDiffEditor
  ) => {
    editorRef.current = editor;
  };

  return deploymentDetail == null ? null : (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{deploymentDetail.name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Box height='92%'>
              <MonacoDiffEditor
                original={deploymentDetail.yaml}
                value={deploymentData}
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
                  wordWrap: 'on',
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
              disabled={editDeploymentMutationCount > 0}
              onClick={() => handleEditDeployment.mutate()}
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
