import { Grid } from "@/components/Grid";
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { CheckboxCard } from "@/components/CheckboxCard";
import { CloseButton } from "@/components/CloseButton";
import { CheckboxGroup, Portal } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { toaster } from "@/components/Toaster";
import { useState } from "react";
import {
  getRegisterableClusterListApi,
  registerClustersApi,
} from "@/apis/cluster";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function ClusterJoin() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root
      variant="resourceSetUp"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Dialog.Trigger>
        <Button variant="largeBlue">
          <FaPlus /> Join
        </Button>
      </Dialog.Trigger>
      {open === true ? (
        <ClusterJoinDialog onClose={() => setOpen(false)} />
      ) : null}
    </Dialog.Root>
  );
}

function ClusterJoinDialog({ onClose }: { onClose: () => void }) {
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const handleRegisterCluster = useMutation({
    mutationFn: async () => {
      try {
        onClose();
        const loadingToasterId = toaster.create({
          type: "loading",
          description: `멤버 클러스터를 추가하고 있습니다.`,
        });
        const response = await registerClustersApi({
          clusterIds: selectedData,
        });
        toaster.remove(loadingToasterId);
        response.clusters.map(
          (cluster: {
            clusterId: string;
            name: string;
            message: string;
            code: number;
          }) => {
            if (cluster.code !== 201) {
              toaster.create({
                type: "error",
                description: `${cluster.clusterId}가 멤버클러스터 등록에 실패하였습니다.`,
              });
            } else {
              toaster.create({
                type: "success",
                description: `${cluster.clusterId}가 멤버클러스터로 등록되었습니다.`,
              });
            }
          }
        );
        queryClient.invalidateQueries({ queryKey: ["getClusterListApi"] });
      } catch (error) {
        toaster.error({
          type: "error",
          description: `에러가 발생했습니다. ${error || "알 수 없는 오류"}`,
        });
      }
    },
  });

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content variant="resourceSetUp" margin="10px auto">
          <Heading variant="center" marginTop="2%">
            Cluster Join
          </Heading>
          <Dialog.Body variant="resourceSetUp" margin="2%">
            <RegisterSelectedClusters setSelectedData={setSelectedData} />
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger>
              <Button variant="blueOutline">Cancel</Button>
            </Dialog.ActionTrigger>
            <Button
              variant="blue"
              loading={handleRegisterCluster.isPending}
              onClick={() => handleRegisterCluster.mutate()}
            >
              Apply
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

function RegisterSelectedClusters({
  setSelectedData,
}: {
  setSelectedData: (newData: string[]) => void;
}) {
  const { data: registerableClusterList } = useQuery({
    queryKey: ["registerableClusterList"],
    queryFn: () => getRegisterableClusterListApi(),
  });

  return (
    <Grid>
      <CheckboxGroup onValueChange={(e) => setSelectedData(e)}>
        {registerableClusterList?.clusters.map((cluster) => (
          <CheckboxCard.Root key={cluster.clusterId} value={cluster.clusterId}>
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Content>
                <CheckboxCard.Label>{cluster.name}</CheckboxCard.Label>
              </CheckboxCard.Content>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        ))}
      </CheckboxGroup>
    </Grid>
  );
}
