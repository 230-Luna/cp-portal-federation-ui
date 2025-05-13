import { getClusterDetailApi } from "@/apis/cluster";
import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { useQuery } from "@tanstack/react-query";
import { ClusterDetail } from "@/models/clustersModel";
import { Drawer, Portal } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function ClusterViewButton({
  clusterId,
}: {
  clusterId: string;
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
      {open && <ClusterInfoYamlViwerDrawer clusterId={clusterId} />}
    </Drawer.Root>
  );
}

function ClusterInfoYamlViwerDrawer({ clusterId }: { clusterId: string }) {
  const { data: clusterDetail } = useQuery<ClusterDetail>({
    queryKey: ["clusterDetail", clusterId],
    queryFn: () => getClusterDetailApi(clusterId),
  });

  return (
    clusterDetail && (
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{clusterDetail.name}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <div style={{ height: "92vh" }}>
                <Editor
                  height="90vh"
                  defaultLanguage="yaml"
                  defaultValue={clusterDetail.yaml}
                  options={{
                    readOnly: true,
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
    )
  );
}
