import { deletePropagationPolicyApi } from "@/apis/propagationPolicy";
import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { Dialog } from "@/components/Dialog";
import { toaster } from "@/components/Toaster";
import { Portal } from "@chakra-ui/react";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

export default function PropagationPolicyDeleteButton({
  namespace,
  name,
}: {
  namespace: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const deletePropagationPolicyMutationCount = useIsMutating({
    mutationKey: ["handleDeletePropagationPolicy", namespace, name],
  });

  return (
    <Dialog.Root
      variant="alert"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Dialog.Trigger>
        <Button
          variant="redGhost"
          disabled={deletePropagationPolicyMutationCount > 0}
        >
          Delete
        </Button>
      </Dialog.Trigger>
      {open === true ? (
        <DeletePropagationPolicyConfirmDialog
          namespace={namespace}
          name={name}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </Dialog.Root>
  );
}

function DeletePropagationPolicyConfirmDialog({
  namespace,
  name,
  onClose,
}: {
  namespace: string;
  name: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const handleDeletePropagationPolicy = useMutation({
    mutationKey: ["handleDeletePropagationPolicy", namespace, name],
    mutationFn: async () => {
      try {
        onClose();
        const loadingToasterId = toaster.create({
          type: "loading",
          description: `${name}를 삭제하고 있습니다.`,
        });
        await deletePropagationPolicyApi({ namespace, name });
        toaster.remove(loadingToasterId);
        toaster.success({
          description: `${name}가 삭제되었습니다.`,
        });
        queryClient.invalidateQueries({
          queryKey: ["handleDeletePropagationPolicy", namespace, name],
        });
      } catch {
        toaster.error({
          description: `${name}를 삭제하는 데 오류가 발생했습니다.`,
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
            {name}를 삭제하겠습니까?
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger>
              <Button variant="redOutline">Cancel</Button>
            </Dialog.ActionTrigger>
            <Button
              variant="red"
              onClick={() => handleDeletePropagationPolicy.mutate()}
            >
              Delete
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
