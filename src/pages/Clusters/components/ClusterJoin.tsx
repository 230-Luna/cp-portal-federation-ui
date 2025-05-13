import { Grid } from "@/components/Grid";
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { CheckboxCard } from "@/components/CheckboxCard";
import { CloseButton } from "@/components/CloseButton";
import { Portal } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { toaster } from "@/components/Toaster";
import { useState } from "react";
import {
  getRegisterableClusterListApi,
  registerClustersApi,
} from "@/apis/cluster";
import { useMutation, useQuery } from "@tanstack/react-query";

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
      {open && <ClusterJoinDialog />}
    </Dialog.Root>
  );
}

function ClusterJoinDialog() {
  let selectedData: string[] = [];

  const handleRegisterCluster = useMutation({
    mutationFn: async () => {
      try {
        await registerClustersApi(selectedData);

        toaster.create({
          type: "success",
          description: "클러스터 등록에 성공했습니다.",
        });
      } catch (error) {
        console.error("에러가 발생했습니다 ", error);

        toaster.error({
          type: "error",
          description: `에러가 발생했습니다.`,
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
            <RegisterSelectedClusters />
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

function RegisterSelectedClusters() {
  const { data: registerableClusterList } = useQuery({
    queryKey: ["registerableClusterList"],
    queryFn: () => getRegisterableClusterListApi(),
  });

  function handleClusterSelect(
    event: React.ChangeEvent<HTMLInputElement>,
    clusterId: string
  ) {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (!selectedData.includes(clusterId)) {
        selectedData.push(clusterId);
      }
    } else {
      selectedData = selectedData.filter((v) => v !== clusterId);
    }
  }

  return (
    <Grid>
      {registerableClusterList?.clusters.map((cluster) => (
        <CheckboxCard.Root key={cluster.clusterId}>
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleClusterSelect(event, cluster.clusterId)
            }
          >
            <CheckboxCard.Content>
              <CheckboxCard.Label>{cluster.name}</CheckboxCard.Label>
            </CheckboxCard.Content>
            <CheckboxCard.Indicator />
          </CheckboxCard.Control>
        </CheckboxCard.Root>
      ))}
    </Grid>
  );
}
