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

  function handleApplyClick() {}
  return (
    <Dialog.Root
      variant="resourceSetUp"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Dialog.Trigger asChild>
        <Button variant="largeBlue">
          <FaPlus /> Join
        </Button>
      </Dialog.Trigger>
      {open && <ClusterJoinPortal />}
    </Dialog.Root>
  );
}

function ClusterJoinPortal() {
  const { mutate: registerClusters } = useMutation({
    mutationFn: () => registerClustersApi(),
    onSuccess: () => {
      console.log("등록 성공");
    },
    onError: (error) => {
      console.error("error : ", error);
    },
  });

  function handleApplyClick() {
    toaster.create({
      description: "클러스터 등록에 성공했습니다.",
      type: "success",
    });
  }

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
            <Button variant="blue" onClick={handleApplyClick}>
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

  function handleClusterSelect(clusterId: string) {}
  return (
    <Grid>
      {registerableClusterList?.clusters.map((cluster) => (
        <CheckboxCard.Root
          key={cluster.clusterId}
          onChange={() => handleClusterSelect(cluster.clusterId)}
        >
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
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
