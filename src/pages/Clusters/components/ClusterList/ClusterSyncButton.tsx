import { getSyncListApi } from "@/apis/sync";
import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { Collapsible } from "@/components/Collapsible";
import {
  Accordion,
  Box,
  Checkbox,
  CheckboxGroup,
  Drawer,
  Fieldset,
  For,
  HStack,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function ClusterSyncButton({
  clusterId,
}: {
  clusterId: string;
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
  const { data: syncNamespaceList } = useSuspenseQuery({
    queryKey: ["getClusterResourceSyncApi", clusterId, "namespace"],
    queryFn: () => getSyncListApi({ clusterId, kind: "namespace" }),
  });

  const [expandedNamespaces, setExpandedNamespaces] = useState<string[]>([]);
  const [checkedNamespaces, setCheckedNamespaces] = useState<string[]>([]);

  console.log("expandedNamespaces: ", expandedNamespaces);
  console.log("checkedNamespaces: ", checkedNamespaces);

  const kindOptions = [
    "Deployment",
    "Statefulset",
    "Daemonset",
    "Cronjob",
    "Job",
  ];

  return (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{clusterId}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Accordion.Root
              multiple
              value={expandedNamespaces}
              onValueChange={(details) => setExpandedNamespaces(details.value)}
            >
              <Stack gap="2">
                {syncNamespaceList.map((ns) => (
                  <Accordion.Item key={ns.name} value={ns.name}>
                    <HStack>
                      <Checkbox.Root
                        checked={checkedNamespaces.includes(ns.name)}
                        onCheckedChange={(checked) => {
                          setCheckedNamespaces((prev) =>
                            checked
                              ? [...prev, ns.name]
                              : prev.filter((n) => n !== ns.name)
                          );
                        }}
                        width="100%"
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label>{ns.name}</Checkbox.Label>
                      </Checkbox.Root>
                      <Accordion.ItemTrigger>
                        <FaPlus />
                      </Accordion.ItemTrigger>
                    </HStack>
                    <Accordion.ItemContent>
                      <Accordion.ItemBody>
                        <Stack marginLeft="20%">
                          <Accordion.Root
                            multiple
                            value={expandedNamespaces}
                            onValueChange={(details) =>
                              setExpandedNamespaces(details.value)
                            }
                          >
                            <Stack gap="2">
                              {kindOptions.map((kind) => (
                                <Accordion.Item key={kind} value={kind}>
                                  <HStack>
                                    <Checkbox.Root key={kind} value={kind}>
                                      <Checkbox.HiddenInput />
                                      <Checkbox.Control>
                                        <Checkbox.Indicator />
                                      </Checkbox.Control>
                                      <Checkbox.Label>{kind}</Checkbox.Label>
                                    </Checkbox.Root>
                                    <Accordion.ItemTrigger>
                                      <FaPlus />
                                    </Accordion.ItemTrigger>
                                  </HStack>
                                  <Accordion.ItemContent>
                                    <Accordion.ItemBody>
                                      <Stack marginLeft="30%">
                                        <Checkbox.Root key="a" value="a">
                                          <Checkbox.HiddenInput />
                                          <Checkbox.Control>
                                            <Checkbox.Indicator />
                                          </Checkbox.Control>
                                          <Checkbox.Label>a</Checkbox.Label>
                                        </Checkbox.Root>
                                      </Stack>
                                    </Accordion.ItemBody>
                                  </Accordion.ItemContent>
                                </Accordion.Item>
                              ))}
                            </Stack>
                          </Accordion.Root>
                        </Stack>
                      </Accordion.ItemBody>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                ))}
              </Stack>
            </Accordion.Root>
          </Drawer.Body>
          <Drawer.CloseTrigger asChild>
            <CloseButton />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
}

{
  /* <NamespaceDeployments
  clusterId={clusterId}
  namespace={ns.name}
  checkedDeployments={checkedDeployments[ns.name] || []}
  onChange={(newChecked) => {
    setCheckedDeployments((prev) => ({
      ...prev,
      [ns.name]: newChecked,
    }));
  }}
/>; */
}

function NamespaceDeployments({
  clusterId,
  namespace,
  checkedDeployments,
  onChange,
}: {
  clusterId: string;
  namespace: string;
  checkedDeployments: string[];
  onChange: (val: string[]) => void;
}) {
  const { data: deployments } = useSuspenseQuery({
    queryKey: ["getClusterResourceSyncApi", clusterId, namespace],
    queryFn: () =>
      getSyncListApi({
        clusterId,
        kind: "deployment",
        namespace,
      }),
  });

  return (
    <Stack pl="4">
      {deployments.map((deploy: any) => (
        <Checkbox.Root
          key={deploy.name}
          checked={checkedDeployments.includes(deploy.name)}
          onCheckedChange={(checked) => {
            onChange(
              checked
                ? [...checkedDeployments, deploy.name]
                : checkedDeployments.filter((n) => n !== deploy.name)
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>{deploy.name}</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Stack>
  );
}
