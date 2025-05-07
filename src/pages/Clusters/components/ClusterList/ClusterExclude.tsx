import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { CloseButton } from "@/components/CloseButton";
import { Portal } from "@chakra-ui/react";

export default function ClusterExclude() {
  return (
    <Dialog.Root variant="alert">
      <Dialog.Trigger asChild>
        <Button variant="redGhost">Exclude</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content variant="alert">
            <Dialog.Body variant="alert" marginTop="8%">
              <p>멤버 클러스터에서 제외시키겠습니까?</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger>
                <Button variant="redOutline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button variant="red">Exloude</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
