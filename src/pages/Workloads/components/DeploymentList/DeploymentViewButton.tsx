import { getWorkloadDetailApi } from "@/apis/workload";
import { Button } from "@/components/Button";
import { Box, Drawer } from "@chakra-ui/react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { MonacoDiffEditor, monaco } from "react-monaco-editor";

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
      size="full"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Drawer.Trigger asChild>
        <Button variant="blueGhost">View</Button>
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
  const [deploymentData, setDeploymentData] = useState("");
  const editorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);

  const { data: deploymentDetail } = useSuspenseQuery({
    queryKey: ["getWorkloadDetailApi", namespace, name],
    queryFn: () =>
      getWorkloadDetailApi({ kind: "deployment", namespace, name }),
  });

  useEffect(() => {
    if (deploymentDetail?.yaml) {
      setDeploymentData(deploymentDetail.yaml);
    }
  }, [deploymentDetail]);

  const handleEditorChange = (value: string | undefined) => {
    setDeploymentData(value || "");
  };

  const handleEditorMount = (editor: monaco.editor.IStandaloneDiffEditor) => {
    editorRef.current = editor;
  };

  return (
    <Drawer.Root size="full" open={true} onOpenChange={onClose}>
      <Drawer.Trigger asChild>
        <Button variant="blueGhost">View</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Box>
          <MonacoDiffEditor
            value={deploymentData}
            onChange={handleEditorChange}
          />
        </Box>
      </Drawer.Content>
    </Drawer.Root>
  );
}
