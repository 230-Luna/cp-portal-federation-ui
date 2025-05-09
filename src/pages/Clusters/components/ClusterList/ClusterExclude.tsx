import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { CloseButton } from "@/components/CloseButton";
import { Portal } from "@chakra-ui/react";
import {
  ClusterExcludeProps,
  ClusterExcludeProtalProps,
} from "@/models/clustersModel";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteClusterApi } from "@/apis/cluster";
import { toaster } from "@/components/Toaster";

export default function ClusterExclude({
  clusterId,
  isExcluding = false,
  setIsExcluding = () => {},
}: ClusterExcludeProps) {
  const [open, setOpen] = useState(false);

  console.log(`${clusterId} isExcluding: ${isExcluding} `);

  return (
    <Dialog.Root
      variant="alert"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Dialog.Trigger>
        <Button variant="redGhost" disabled={isExcluding}>
          Exclude
        </Button>
      </Dialog.Trigger>
      {open && (
        <ClusterExcludePortal
          clusterId={clusterId}
          onClose={() => setOpen(false)}
          setIsExcluding={setIsExcluding}
        />
      )}
    </Dialog.Root>
  );
}

function ClusterExcludePortal({
  clusterId,
  onClose,
  setIsExcluding,
}: ClusterExcludeProtalProps) {
  const { mutateAsync: clusterDelete } = useMutation({
    mutationFn: () => deleteClusterApi(clusterId),
  });

  async function handleExcludeCluster() {
    setIsExcluding(clusterId, true);
    onClose();
    console.log("토스트", clusterId);

    try {
      await toaster.promise(clusterDelete(), {
        loading: {
          description: `${clusterId}를 멤버 클러스터에서 제외하고 있습니다.`,
        },
        success: {
          description: `${clusterId}가 멤버 클러스터에서 제외되었습니다.`,
        },
        error: {
          description: `${clusterId}를 제외하는 데 오류가 발생했습니다.`,
        },
      });
    } finally {
      console.log("finally");
      // setIsExcluding(clusterId, false);
    }
  }

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content variant="alert">
          <Dialog.Body variant="alert" marginTop="8%">
            {clusterId}를 멤버 클러스터에서 제외시키겠습니까?
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger>
              <Button variant="redOutline">Cancel</Button>
            </Dialog.ActionTrigger>
            <Button variant="red" onClick={handleExcludeCluster}>
              Exclude
            </Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger asChild>
            <CloseButton />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}
