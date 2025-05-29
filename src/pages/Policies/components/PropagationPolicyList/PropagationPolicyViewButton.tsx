import {
  getPropagationPolicyDetailApi,
  updatePropagationPolicyApi,
} from "@/apis/propagationPolicy";
import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { toaster } from "@/components/Toaster";
import { PropagationPolicyDetail } from "@/models/propagationPolicyModel";
import { Box, Drawer, Portal } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

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
      size="xl"
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
  const [propagationData, setPropagationData] = useState("");
  const editorRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: propagationPolicyDetail } = useQuery({
    queryKey: ["getPropagationPolicyDetailApi", namespace, name],
    queryFn: () => getPropagationPolicyDetailApi({ namespace, name }),
  });

  const handleEditPropagationPolicy = useMutation({
    mutationFn: async () => {
      console.log("mt: ", propagationData);

      try {
        onClose();
        const loadingToasterId = toaster.create({
          type: "loading",
          description: `Propagation Policy를 수정하고 있습니다.`,
        });
        const response = await updatePropagationPolicyApi({
          namespace,
          name,
          data: propagationData,
        });
        toaster.remove(loadingToasterId);
        if (response.code !== 200) {
          toaster.create({
            type: "error",
            description: `${name} Propagation Policy 수정에 실패하였습니다.`,
          });
        } else {
          toaster.create({
            type: "success",
            description: `${name} Propagation Policy 수정되었습니다.`,
          });
        }

        queryClient.invalidateQueries({
          queryKey: ["getPropagationPolicyListApi"],
        });
      } catch (error) {
        toaster.error({
          type: "error",
          description: `에러가 발생했습니다. ${error || "알 수 없는 오류"}`,
        });
      }
    },
  });

  const handleEditorChange = (value: string | undefined) => {
    if (value != null) {
      setPropagationData(value);
    }
  };

  const handleEditorMount = (editor: any) => {
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
            <Box height="92vh">
              <Editor
                defaultValue={propagationPolicyDetail.yaml}
                value={propagationPolicyDetail.yaml}
                onChange={handleEditorChange}
                onMount={handleEditorMount}
                height="90vh"
                defaultLanguage="yaml"
                options={{
                  scrollbar: {
                    vertical: "hidden",
                    horizontal: "hidden",
                    handleMouseWheel: true,
                  },
                  overviewRulerLanes: 0,
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
