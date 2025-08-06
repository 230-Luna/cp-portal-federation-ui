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

export default function JobViewButton({
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
        <JobYamlViwerDrawer
          namespace={namespace}
          name={name}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </Drawer.Root>
  );
}

function JobYamlViwerDrawer({
  namespace,
  name,
  onClose,
}: {
  namespace: string;
  name: string;
  onClose: () => void;
}) {
  const [jobData, setJobData] = useState('');
  const editorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);

  const queryClient = useQueryClient();

  const { data: jobDetail } = useSuspenseQuery({
    queryKey: ['getResourceDetailApi', 'job', namespace, name],
    queryFn: () => getResourceDetailApi({ kind: 'job', namespace, name }),
  });

  useEffect(() => {
    if (jobDetail?.yaml) {
      setJobData(jobDetail.yaml);
    }
  }, [jobDetail]);

  const handleEditJob = useMutation({
    mutationKey: ['handleEditJob', 'job', namespace, name],
    mutationFn: async () => {
      let loadingToaster;
      try {
        onClose();
        loadingToaster = toaster.create({
          type: 'loading',
          description: `Job를 수정하고 있습니다.`,
        });
        await updateResourceApi({
          data: jobData,
        });
        toaster.remove(loadingToaster);
        toaster.success({
          description: `${name} Job가 수정되었습니다.`,
        });
        queryClient.invalidateQueries({
          queryKey: ['getResourceDetailApi', 'job', namespace, name],
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

  const editJobMutationCount = useIsMutating({
    mutationKey: ['handleEditJob', 'job', namespace, name],
  });

  const handleEditorChange = (value: string | undefined) => {
    if (value != null) {
      setJobData(value);
    }
  };
  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneDiffEditor
  ) => {
    editorRef.current = editor;
  };

  return jobDetail == null ? null : (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{jobDetail.name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Box height='92%'>
              <MonacoDiffEditor
                original={jobDetail.yaml}
                value={jobData}
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
              disabled={editJobMutationCount > 0}
              onClick={() => handleEditJob.mutate()}
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
