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

export default function CronJobViewButton({
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
        <CronJobYamlViwerDrawer
          namespace={namespace}
          name={name}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </Drawer.Root>
  );
}

function CronJobYamlViwerDrawer({
  namespace,
  name,
  onClose,
}: {
  namespace: string;
  name: string;
  onClose: () => void;
}) {
  const [cronJobData, setCronJobData] = useState('');
  const editorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);

  const queryClient = useQueryClient();

  const { data: cronJobDetail } = useSuspenseQuery({
    queryKey: ['getResourceDetailApi', 'cronjob', namespace, name],
    queryFn: () => getResourceDetailApi({ kind: 'cronjob', namespace, name }),
  });

  useEffect(() => {
    if (cronJobDetail?.yaml) {
      setCronJobData(cronJobDetail.yaml);
    }
  }, [cronJobDetail]);

  const handleEditCronJob = useMutation({
    mutationKey: ['handleEditCronJob', 'cronjob', namespace, name],
    mutationFn: async () => {
      let loadingToaster;
      try {
        onClose();
        loadingToaster = toaster.create({
          type: 'loading',
          description: `CronJob를 수정하고 있습니다.`,
        });
        await updateResourceApi({
          data: cronJobData,
        });
        toaster.remove(loadingToaster);
        toaster.success({
          description: `${name} CronJob가 수정되었습니다.`,
        });
        queryClient.invalidateQueries({
          queryKey: ['getResourceDetailApi', 'cronjob', namespace, name],
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

  const editCronJobMutationCount = useIsMutating({
    mutationKey: ['handleEditCronJob', 'cronjob', namespace, name],
  });

  const handleEditorChange = (value: string | undefined) => {
    if (value != null) {
      setCronJobData(value);
    }
  };
  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneDiffEditor
  ) => {
    editorRef.current = editor;
  };

  return cronJobDetail == null ? null : (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{cronJobDetail.name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Box height='92%'>
              <MonacoDiffEditor
                original={cronJobDetail.yaml}
                value={cronJobData}
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
              disabled={editCronJobMutationCount > 0}
              onClick={() => handleEditCronJob.mutate()}
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
