import { getClusterDetailApi } from "@/apis/cluster";
import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { useQuery } from "@tanstack/react-query";
import { Box, Drawer, Portal } from "@chakra-ui/react";
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
      {open === true ? <ClusterYamlViwerDrawer clusterId={clusterId} /> : null}
    </Drawer.Root>
  );
}

function ClusterYamlViwerDrawer({ clusterId }: { clusterId: string }) {
  const { data: clusterDetail } = useQuery({
    queryKey: ["getClusterDetailApi", clusterId],
    queryFn: () => getClusterDetailApi(clusterId),
  });

  return clusterDetail == null ? null : (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{clusterDetail.name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Box height="92vh">
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
            </Box>
          </Drawer.Body>
          <Drawer.CloseTrigger asChild>
            <CloseButton />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
}
