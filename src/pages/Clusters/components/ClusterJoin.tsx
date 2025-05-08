import { Grid } from "@/components/Grid";
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { CheckboxCard } from "@/components/CheckboxCard";
import { CloseButton } from "@/components/CloseButton";
import { Portal } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { toaster } from "@/components/Toaster";

export default function ClusterJoin() {
  function handleClick() {}

  function handleApplyClick() {
    toaster.create({
      description: "멤버클러스터에서 제외되었습니다.",
      type: "info",
    });
  }
  return (
    <Dialog.Root variant="resourceSetUp">
      <Dialog.Trigger>
        <Button variant="largeBlue">
          <FaPlus /> Join
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content variant="resourceSetUp" margin="10px auto">
            <Heading variant="center" marginTop="2%">
              Cluster Join
            </Heading>
            <Dialog.Body variant="resourceSetUp" margin="2%">
              <Grid>
                {items.map((item) => (
                  <CheckboxCard.Root
                    key={item.id}
                    onChange={() => handleClick()}
                  >
                    <CheckboxCard.HiddenInput />
                    <CheckboxCard.Control>
                      <CheckboxCard.Content>
                        <CheckboxCard.Label>{item.name}</CheckboxCard.Label>
                      </CheckboxCard.Content>
                      <CheckboxCard.Indicator />
                    </CheckboxCard.Control>
                  </CheckboxCard.Root>
                ))}
              </Grid>
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
    </Dialog.Root>
  );
}

const items = [
  {
    id: 1,
    name: "nhn-cluster",
    clustername: "not yet",
  },
  {
    id: 2,
    name: "kt-cluster",
    clustername: "",
  },
  {
    id: 3,
    name: "aws-cluster",
    clustername: "",
  },
  {
    id: 4,
    name: "ncp-cluster",
    clustername: "",
  },
  {
    id: 5,
    name: "google-cluster",
    clustername: "",
  },
];
