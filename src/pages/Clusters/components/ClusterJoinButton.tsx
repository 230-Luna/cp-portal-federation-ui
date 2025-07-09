import { Grid } from "@/components/Grid";
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { CheckboxCard } from "@/components/CheckboxCard";
import { CloseButton } from "@/components/CloseButton";
import { CheckboxGroup, Portal } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { toaster } from "@/components/Toaster";
import { Suspense, useState } from "react";
import {
  getRegisterableClusterListApi,
  registerClustersApi,
} from "@/apis/cluster";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Text } from "@/components/Text";

export default function ClusterJoinButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root
      variant="resourceSetUp"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Dialog.Trigger>
        <Button colorPalette="blue" variant="largeBlue">
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
  const [isExistRegisterableClusters, setIsExistRegisterableClusters] =
    useState(true);
  const queryClient = useQueryClient();

  const handleRegisterCluster = useMutation({
    mutationFn: async () => {
      let loadingToaster;
      try {
        onClose();
        loadingToaster = toaster.create({
          type: "loading",
          description: `멤버 클러스터를 추가하고 있습니다.`,
        });
        const response = await registerClustersApi({
          clusterIds: selectedData,
        });
        toaster.remove(loadingToaster);
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
                description: `${cluster.name}가 멤버클러스터 등록에 실패하였습니다.`,
              });
            } else {
              toaster.create({
                type: "success",
                description: `${cluster.name}가 멤버클러스터로 등록되었습니다.`,
              });
            }
          }
        );
        queryClient.invalidateQueries({ queryKey: ["getClusterListApi"] });
      } catch (error: any) {
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

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content variant="resourceSetUp" margin="10px auto">
          <Heading variant="center" marginTop="2%">
            Cluster Join
          </Heading>
          <Dialog.Body variant="resourceSetUp" margin="2%">
            <Suspense fallback={<LoadingSkeleton />}>
              <RegisterableClusters
                onValueChange={setSelectedData}
                onRegisterableClustersChange={setIsExistRegisterableClusters}
              />
            </Suspense>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger>
              <Button variant="blueOutline">Cancel</Button>
            </Dialog.ActionTrigger>
            {isExistRegisterableClusters === true ? (
              <Button
                variant="blue"
                loading={handleRegisterCluster.isPending}
                onClick={() => handleRegisterCluster.mutate()}
              >
                Apply
              </Button>
            ) : null}
          </Dialog.Footer>
          <Dialog.CloseTrigger>
            <CloseButton />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}

function RegisterableClusters({
  onValueChange,
  onRegisterableClustersChange,
}: {
  onValueChange: (newData: string[]) => void;
  onRegisterableClustersChange: (registerableClusters: boolean) => void;
}) {
  const { data: registerableClusterList } = useSuspenseQuery({
    queryKey: ["registerableClusterList"],
    queryFn: () => getRegisterableClusterListApi(),
  });

  if (registerableClusterList.clusters === null) {
    onRegisterableClustersChange(false);
  }

  return (
    <Grid>
      <CheckboxGroup onValueChange={(value) => onValueChange(value)}>
        {registerableClusterList.clusters != null ? (
          registerableClusterList.clusters.map((cluster) => (
            <CheckboxCard.Root
              key={cluster.clusterId}
              value={cluster.clusterId}
            >
              <CheckboxCard.HiddenInput />
              <CheckboxCard.Control>
                <CheckboxCard.Content>
                  <CheckboxCard.Label>{cluster.name}</CheckboxCard.Label>
                </CheckboxCard.Content>
                <CheckboxCard.Indicator />
              </CheckboxCard.Control>
            </CheckboxCard.Root>
          ))
        ) : (
          <Text variant="small">등록 가능한 클러스터가 없습니다.</Text>
        )}
      </CheckboxGroup>
    </Grid>
  );
}
