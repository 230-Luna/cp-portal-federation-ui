import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { CloseButton } from "@/components/CloseButton";
import { Portal } from "@chakra-ui/react";

export default function ClusterExclude() {
  return (
    <Dialog.Root type="alert">
      <Dialog.Trigger>
        <Button buttonStyle="redGhost">Exclude</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content type="alert">
            <Dialog.Body type="alert" marginTop="8%">
              <p>멤버 클러스터에서 제외시키겠습니까?</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger>
                <Button buttonStyle="redOutline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button buttonStyle="red">Exloude</Button>
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
