import {
  getClusterPropagationPolicyDetailApi,
  updateClusterPropagationPolicyApi,
} from '@/apis/clusterPropagationPolicy';
import { Button } from '@/components/Button';
import { CloseButton } from '@/components/CloseButton';
import { toaster } from '@/components/Toaster';
import { Box, Drawer, Portal } from '@chakra-ui/react';
import { monaco, MonacoDiffEditor } from 'react-monaco-editor';
import {
  useIsMutating,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

export default function ClusterPropagationPolicyViewButton({
  name,
}: {
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
        <ClusterPropagationPolicyYamlViwerDrawer
          name={name}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </Drawer.Root>
  );
}

function ClusterPropagationPolicyYamlViwerDrawer({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  const [clusterPropagationPolicyData, setClusterPropagationPolicyData] =
    useState('');

  const editorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);

  const queryClient = useQueryClient();

  const { data: clusterPropagationPolicyDetail } = useSuspenseQuery({
    queryKey: ['getClusterPropagationPolicyDetailApi', name],
    queryFn: () => getClusterPropagationPolicyDetailApi({ name }),
  });

  useEffect(() => {
    if (clusterPropagationPolicyDetail?.yaml) {
      setClusterPropagationPolicyData(clusterPropagationPolicyDetail.yaml);
    }
  }, [clusterPropagationPolicyDetail]);

  const handleEditClusterPropagationPolicy = useMutation({
    mutationKey: ['handleEditClusterPropagationPolicy', name],
    mutationFn: async () => {
      let loadingToaster;
      try {
        onClose();
        loadingToaster = toaster.create({
          type: 'loading',
          description: `Policy를 수정하고 있습니다.`,
        });
        await updateClusterPropagationPolicyApi({
          name,
          data: clusterPropagationPolicyData,
        });
        toaster.remove(loadingToaster);
        toaster.success({
          description: `${name} Policy가 수정되었습니다.`,
        });
        queryClient.invalidateQueries({
          queryKey: ['getClusterPropagationPlicyListApi'],
        });
      } catch (error: any) {
        console.error(error.response.data.message);
        toaster.error({
          type: 'error',
          description: `${error.response.data.message || '알 수 없는 오류'}`,
        });
      } finally {
        if (loadingToaster) {
          toaster.remove(loadingToaster);
        }
      }
    },
  });

  const editClusterPropagationPolicyMutationCount = useIsMutating({
    mutationKey: ['handleEditClusterPropagationPolicy', name],
  });

  const handleEditorChange = (value: string | undefined) => {
    if (value != null) {
      setClusterPropagationPolicyData(value);
    }
  };

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneDiffEditor
  ) => {
    editorRef.current = editor;
  };

  return clusterPropagationPolicyDetail == null ? null : (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{clusterPropagationPolicyDetail.name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Box height='92%'>
              <MonacoDiffEditor
                original={clusterPropagationPolicyDetail.yaml}
                value={clusterPropagationPolicyData}
                onChange={handleEditorChange}
                editorDidMount={handleEditorDidMount}
                options={{
                  scrollbar: {
                    vertical: 'visible',
                    horizontal: 'visible',
                  },
                  overviewRulerLanes: 0,
                  scrollBeyondLastLine: false,
                  renderOverviewRuler: false,
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
              disabled={editClusterPropagationPolicyMutationCount > 0}
              onClick={() => handleEditClusterPropagationPolicy.mutate()}
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
