import {
  getPropagationPolicyDetailApi,
  updatePropagationPolicyApi,
} from "@/apis/propagationPolicy";
import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { toaster } from "@/components/Toaster";
import { Box, Drawer, Portal } from "@chakra-ui/react";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { monaco, MonacoDiffEditor } from "react-monaco-editor";

export default function PropagationPolicyViewButton({
  namespace,
  name,
}: {
  namespace: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root
      size="full"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Drawer.Trigger asChild>
        <Button variant="blueGhost">View</Button>
      </Drawer.Trigger>
      {open === true ? (
        <PropagationPolicyYamlViwerDrawer
          namespace={namespace}
          name={name}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </Drawer.Root>
  );
}

function PropagationPolicyYamlViwerDrawer({
  namespace,
  name,
  onClose,
}: {
  namespace: string;
  name: string;
  onClose: () => void;
}) {
  const [propagationPolicyData, setPropagationPolicyData] = useState("");
  const editorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);

  const queryClient = useQueryClient();

  const { data: propagationPolicyDetail } = useSuspenseQuery({
    queryKey: ["getPropagationPolicyDetailApi", namespace, name],
    queryFn: () => getPropagationPolicyDetailApi({ namespace, name }),
  });

  useEffect(() => {
    if (propagationPolicyDetail?.yaml) {
      setPropagationPolicyData(propagationPolicyDetail.yaml);
    }
  }, [propagationPolicyDetail]);

  const handleEditPropagationPolicy = useMutation({
    mutationKey: ["handleEditPropagationPolicy", namespace, name],
    mutationFn: async () => {
      let loadingToaster;
      try {
        onClose();
        loadingToaster = toaster.create({
          type: "loading",
          description: `Policy를 수정하고 있습니다.`,
        });
        await updatePropagationPolicyApi({
          namespace,
          name,
          data: propagationPolicyData,
        });
        toaster.remove(loadingToaster);
        toaster.success({
          description: `${name} Policy가 수정되었습니다.`,
        });
        queryClient.invalidateQueries({
          queryKey: ["getPropagationPolicyListApi"],
        });
      } catch (error: any) {
        console.error(error.response.data.message);
        toaster.error({
          type: "error",
          description: `${error.response.data.message || "알 수 없는 오류"}`,
        });
      } finally {
        if (loadingToaster) {
          toaster.remove(loadingToaster);
        }
      }
    },
  });

  const editPropagationPolicyMutationCount = useIsMutating({
    mutationKey: ["handleEditPropagationPolicy", namespace, name],
  });

  const handleEditorChange = (value: string | undefined) => {
    if (value != null) {
      setPropagationPolicyData(value);
    }
  };

  const handleEditorMount = (editor: monaco.editor.IStandaloneDiffEditor) => {
    editorRef.current = editor;
  };

  return propagationPolicyDetail == null ? null : (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{propagationPolicyDetail.name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Box height="92%">
              <MonacoDiffEditor
                original={propagationPolicyDetail.yaml}
                value={propagationPolicyDetail.yaml}
                onChange={handleEditorChange}
                editorDidMount={handleEditorMount}
                language="yaml"
                height="100%"
                options={{
                  scrollbar: {
                    vertical: "auto",
                    horizontal: "auto",
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
              <Button variant="blueOutline">Cancel</Button>
            </Drawer.ActionTrigger>
            <Button
              variant="blue"
              disabled={editPropagationPolicyMutationCount > 0}
              onClick={() => handleEditPropagationPolicy.mutate()}
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
