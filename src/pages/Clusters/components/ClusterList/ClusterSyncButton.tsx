import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import {
  Checkbox,
  CheckboxGroup,
  Drawer,
  Fieldset,
  For,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ClusterSyncButton({
  clusterId,
  clusterName,
}: {
  clusterId: string;
  clusterName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root
      size="sm"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Drawer.Trigger asChild>
        <Button variant="blackGhost">Sync</Button>
      </Drawer.Trigger>
      {open === true ? (
        <ClusterResourceSyncDrawer clusterId={clusterId} />
      ) : null}
    </Drawer.Root>
  );
}

function ClusterResourceSyncDrawer({ clusterId }: { clusterId: string }) {
  // const { data: clusterResourceSync } = useQuery({
  //   queryKey: ["getClusterResourceSyncApi", clusterId],
  //   queryFn: () => getClusterResourceSyncApi({ clusterId }),
  // });

  const initialValues = [
    { label: "aDeploy", checked: false, value: "aDeploy" },
    { label: "bDeploy", checked: false, value: "bDeploy" },
    { label: "cDeploy", checked: false, value: "cDeploy" },
    { label: "dDeploy", checked: false, value: "dDeploy" },
  ];

  const [values, setValues] = useState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((item, index) => (
    <Checkbox.Root
      ms="6"
      key={item.value}
      checked={item.checked}
      onCheckedChange={(e) => {
        setValues((current) => {
          const newValues = [...current];
          newValues[index] = { ...newValues[index], checked: !!e.checked };
          return newValues;
        });
      }}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label>{item.label}</Checkbox.Label>
    </Checkbox.Root>
  ));

  return (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{clusterId}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Stack align="flex-start">
              <Checkbox.Root
                checked={indeterminate ? "indeterminate" : allChecked}
                onCheckedChange={(e) => {
                  setValues((current) =>
                    current.map((value) => ({ ...value, checked: !!e.checked }))
                  );
                }}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>Namespaces</Checkbox.Label>
              </Checkbox.Root>
              {items}
            </Stack>
          </Drawer.Body>
          <Drawer.CloseTrigger asChild>
            <CloseButton />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
}
