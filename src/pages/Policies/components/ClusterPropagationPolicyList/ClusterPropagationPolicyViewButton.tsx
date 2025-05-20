import { getClusterPropagationPolicyDetailApi } from "@/apis/clusterPropagationPolicy";
import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { Drawer, Portal } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ClusterPropagationPolicyViewButton({
  name,
}: {
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
        <ClusterPropagationPolicyYamlViwerDrawer name={name} />
      ) : null}
    </Drawer.Root>
  );
}

function ClusterPropagationPolicyYamlViwerDrawer({ name }: { name: string }) {
  const { data: clusterPropagationPolicyDetail } = useQuery({
    queryKey: ["getClusterPropagationPolicyDetailApi", name],
    queryFn: () => getClusterPropagationPolicyDetailApi({ name }),
  });

  return clusterPropagationPolicyDetail == null ? null : (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{clusterPropagationPolicyDetail.name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <div style={{ height: "92vh" }}>
              <Editor
                height="90vh"
                defaultLanguage="yaml"
                defaultValue={clusterPropagationPolicyDetail.yaml}
                options={{
                  scrollbar: {
                    vertical: "hidden",
                    horizontal: "hidden",
                    handleMouseWheel: true,
                  },
                  overviewRulerLanes: 0,
                }}
              />
            </div>
          </Drawer.Body>
          <Drawer.CloseTrigger asChild>
            <CloseButton />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
}
