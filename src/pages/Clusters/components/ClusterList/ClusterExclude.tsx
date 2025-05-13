import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { CloseButton } from "@/components/CloseButton";
import { Portal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteClusterApi } from "@/apis/cluster";
import { toaster } from "@/components/Toaster";

export default function ClusterExcludeButton({
  clusterId,
  clusterName,
}: {
  clusterId: string;
  clusterName: string;
}) {
  const [open, setOpen] = useState(false);
  const excludeClusterMutationCount = useIsMutating({
    mutationKey: ["handleExcludeCluster", clusterId],
  });

  return (
    <Dialog.Root
      variant="alert"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Dialog.Trigger>
        <Button variant="redGhost" disabled={excludeClusterMutationCount > 0}>
          Exclude
        </Button>
      </Dialog.Trigger>
      {open === true ? (
        <ClusterExcludeConfirmDialog
          clusterId={clusterId}
          clusterName={clusterName}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </Dialog.Root>
  );
}

function ClusterExcludeConfirmDialog({
  clusterId,
  clusterName,
  onClose,
}: {
  clusterId: string;
  clusterName: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const handleExcludeCluster = useMutation({
    mutationKey: ["handleExcludeCluster", clusterId],
    mutationFn: async () => {
      try {
        onClose();
        const loadingToasterId = toaster.create({
          type: "loading",
          description: `${clusterName}를 멤버 클러스터에 제외하고 있습니다.`,
        });
        await deleteClusterApi(clusterId);
        toaster.remove(loadingToasterId);
        toaster.success({
          description: `${clusterName}가 멤버 클러스터에서 제외되었습니다.`,
        });
        queryClient.invalidateQueries({ queryKey: ["getClusterListApi"] });
      } catch {
        toaster.error({
          description: `${clusterName}를 제외하는 데 오류가 발생했습니다.`,
        });
      }
    },
  });

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content variant="alert">
          <Dialog.Body variant="alert" marginTop="8%">
            {clusterName}를 멤버 클러스터에서 제외시키겠습니까?
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger>
              <Button variant="redOutline">Cancel</Button>
            </Dialog.ActionTrigger>
            <Button variant="red" onClick={() => handleExcludeCluster.mutate()}>
              Exclude
            </Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger>
            <CloseButton />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}
