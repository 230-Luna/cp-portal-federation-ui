import { getSyncListApi, postSyncListApi } from "@/apis/sync";
import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { toaster } from "@/components/Toaster";
import { Sync } from "@/models/sync";
import {
  Accordion,
  Checkbox,
  createTreeCollection,
  Drawer,
  HStack,
  Portal,
  Stack,
  TreeView,
} from "@chakra-ui/react";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { CheckedChangeDetails } from "@zag-js/checkbox";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { SyncPostBody } from "./../../../../models/sync";
import { ResourceKindLowercase } from "@/models/resourceModel";
import {
  LuChevronRight,
  LuFile,
  LuFolder,
  LuSquareMinus,
  LuSquarePlus,
} from "react-icons/lu";

export default function ClusterSyncButton({
  clusterStatus,
  clusterId,
  clusterName,
}: {
  clusterStatus: "ready" | "not ready" | "unknown";
  clusterId: string;
  clusterName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root
      size="lg"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Drawer.Trigger asChild>
        {clusterStatus === "ready" ? (
          <Button variant="blackGhost">Sync</Button>
        ) : (
          <Button disabled variant="blackGhost">
            Sync
          </Button>
        )}
      </Drawer.Trigger>
      {open === true ? (
        <ClusterResourceSyncDrawer
          clusterId={clusterId}
          clusterName={clusterName}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </Drawer.Root>
  );
}

function ClusterResourceSyncDrawer({
  clusterId,
  clusterName,
  onClose,
}: {
  clusterId: string;
  clusterName: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const { data: syncNamespaceList } = useSuspenseQuery({
    queryKey: ["getClusterResourceSyncApi", clusterId, "namespace"],
    queryFn: () => getSyncListApi({ clusterId, kind: "namespace" }),
  });

  const [expandedNamespaces, setExpandedNamespaces] = useState<string[]>([]);
  const [checkedNamespaces, setCheckedNamespaces] = useState<string[]>([]);
  const [checkedResources, setCheckedResources] = useState<
    Record<string, Record<string, string[]>>
  >({});

  const handleCheckedNamespaceChange = (
    checked: CheckedChangeDetails,
    name: string
  ) => {
    setCheckedNamespaces((prev) =>
      checked ? [...prev, name] : prev.filter((n) => n !== name)
    );
  };
  // const data: SyncPostBody = {
  //   createNamespace: ["hihihi"],
  //   data: [
  //     {
  //       namespace: "default",
  //       list: [
  //         {
  //           kind: "deployment",
  //           list: ["heheheheh"],
  //         },
  //       ],
  //     },
  //   ],
  // };

  const generateSyncPostData = (): SyncPostBody => {
    const namespaces = Object.keys(checkedResources);

    return {
      createNamespace: checkedNamespaces,
      data: namespaces.map((namespace) => {
        const kinds = checkedResources[namespace];
        return {
          namespace,
          list: Object.entries(kinds).map(([kind, resources]) => ({
            kind: kind.toLowerCase() as ResourceKindLowercase,
            list: resources,
          })),
        };
      }),
    };
  };

  const handleApplySync = useMutation({
    mutationKey: ["handleApplySync", clusterId],
    mutationFn: async () => {
      const data = generateSyncPostData();
      let loadingToaster;
      try {
        onClose();
        loadingToaster = toaster.create({
          type: "loading",
          description: `${clusterName}와 Sync하고 있습니다.`,
        });
        await postSyncListApi({
          clusterId,
          data,
        });
        toaster.remove(loadingToaster);
        toaster.success({
          description: `${clusterName}와 성공적으로 Sync되었습니다.`,
        });
        queryClient.invalidateQueries({
          queryKey: ["getClusterListApi"],
        });
      } catch (error: any) {
        console.error(error.response.data.message);
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

  const applySyncMutationCount = useIsMutating({
    mutationKey: ["handleApplySync", clusterId],
  });

  interface Node {
    id: string;
    name: string;
    children?: Node[];
  }

  const collection = createTreeCollection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
      id: "ROOT",
      name: "",
      children: [
        {
          id: "node_modules",
          name: "node_modules",
          children: [
            { id: "node_modules/zag-js", name: "zag-js" },
            { id: "node_modules/pandacss", name: "panda" },
            {
              id: "node_modules/@types",
              name: "@types",
              children: [
                { id: "node_modules/@types/react", name: "react" },
                { id: "node_modules/@types/react-dom", name: "react-dom" },
              ],
            },
          ],
        },
        {
          id: "src",
          name: "src",
          children: [
            { id: "src/app.tsx", name: "app.tsx" },
            { id: "src/index.ts", name: "index.ts" },
          ],
        },
        { id: "panda.config", name: "panda.config.ts" },
        { id: "package.json", name: "package.json" },
        { id: "renovate.json", name: "renovate.json" },
        { id: "readme.md", name: "README.md" },
      ],
    },
  });

  return (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{clusterName}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <TreeView.Root collection={collection} maxW="sm" size="md">
              <TreeView.Tree>
                <TreeView.Node
                  render={({ node, nodeState }) =>
                    nodeState.isBranch ? (
                      <TreeView.BranchControl>
                        {nodeState.expanded ? (
                          <LuSquareMinus />
                        ) : (
                          <LuSquarePlus />
                        )}
                        <TreeView.BranchText>{node.name}</TreeView.BranchText>
                      </TreeView.BranchControl>
                    ) : (
                      <TreeView.Item>{node.name}</TreeView.Item>
                    )
                  }
                />
              </TreeView.Tree>
            </TreeView.Root>
            <Accordion.Root
              multiple
              value={expandedNamespaces}
              onValueChange={(details) => setExpandedNamespaces(details.value)}
              lazyMount={true}
            >
              <Stack gap="2">
                {syncNamespaceList.map((namespace) => {
                  const name = namespace.name;
                  return (
                    <Accordion.Item key={name} value={name}>
                      <HStack>
                        {namespace.isDuplicated === true ? (
                          <Checkbox.Root
                            checked={checkedNamespaces.includes(name)}
                            onCheckedChange={(checked) =>
                              handleCheckedNamespaceChange(checked, name)
                            }
                            width="100%"
                            disabled={true}
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control>
                              <Checkbox.Indicator />
                            </Checkbox.Control>
                            <Checkbox.Label>{name}</Checkbox.Label>
                          </Checkbox.Root>
                        ) : (
                          <Checkbox.Root
                            checked={checkedNamespaces.includes(name)}
                            onCheckedChange={(checked) =>
                              handleCheckedNamespaceChange(checked, name)
                            }
                            width="100%"
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control>
                              <Checkbox.Indicator />
                            </Checkbox.Control>
                            <Checkbox.Label>{name}</Checkbox.Label>
                          </Checkbox.Root>
                        )}
                        <Accordion.ItemTrigger>
                          <Accordion.ItemIndicator>
                            {expandedNamespaces.includes(name) ? (
                              <FaMinus />
                            ) : (
                              <FaPlus />
                            )}
                          </Accordion.ItemIndicator>
                        </Accordion.ItemTrigger>
                      </HStack>
                      <Accordion.ItemContent>
                        <Accordion.ItemBody>
                          <Stack marginLeft="20%">
                            <KindList
                              clusterId={clusterId}
                              namespace={namespace}
                              checkedResources={checkedResources}
                              setCheckedResources={setCheckedResources}
                            />
                          </Stack>
                        </Accordion.ItemBody>
                      </Accordion.ItemContent>
                    </Accordion.Item>
                  );
                })}
              </Stack>
            </Accordion.Root>
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.ActionTrigger asChild>
              <Button variant="blueOutline">Cancel</Button>
            </Drawer.ActionTrigger>
            <Button
              variant="blue"
              disabled={applySyncMutationCount > 0}
              onClick={() => handleApplySync.mutate()}
            >
              Apply
            </Button>
          </Drawer.Footer>
          <Drawer.CloseTrigger asChild>
            <CloseButton />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
}

function KindList({
  clusterId,
  namespace,
  checkedResources,
  setCheckedResources,
}: {
  clusterId: string;
  namespace: Sync;
  checkedResources: Record<string, Record<string, string[]>>;
  setCheckedResources: React.Dispatch<
    React.SetStateAction<Record<string, Record<string, string[]>>>
  >;
}) {
  const kindOptions = [
    "Deployment",
    "StatefulSet",
    "DaemonSet",
    "CronJob",
    "Job",
  ];

  const [expandedKinds, setExpandedKinds] = useState<Record<string, string[]>>(
    {}
  );

  const [resourceData, setResourceData] = useState<
    Record<string, Record<string, any[]>>
  >({});

  const handleKindExpand = (namespace: string, kinds: string[]) => {
    setExpandedKinds((prev) => ({ ...prev, [namespace]: kinds }));

    kinds.forEach((kind) => {
      if (!resourceData[namespace]?.[kind]) {
        getSyncListApi({
          clusterId,
          kind: kind.toLowerCase(),
          namespace,
        }).then((res) => {
          setResourceData((prev) => ({
            ...prev,
            [namespace]: {
              ...prev[namespace],
              [kind]: res,
            },
          }));
        });
      }
    });
  };

  return (
    <Accordion.Root
      multiple
      lazyMount={true}
      value={expandedKinds[namespace.name] || []}
      onValueChange={(details) =>
        handleKindExpand(namespace.name, details.value)
      }
    >
      <Stack gap="3">
        {kindOptions.map((kind) => (
          <Accordion.Item key={kind} value={kind}>
            <HStack>
              {kind}
              <Accordion.ItemTrigger>
                <Accordion.ItemIndicator>
                  {kind ? <FaMinus /> : <FaPlus />}
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>
            </HStack>
            <Accordion.ItemContent>
              <Accordion.ItemBody pl="8">
                <Stack marginLeft="20%">
                  <NamespaceResources
                    clusterId={clusterId}
                    namespace={namespace.name}
                    kind={kind}
                    checkedResource={
                      checkedResources[namespace.name]?.[kind] || []
                    }
                    onChange={(newChecked) => {
                      setCheckedResources((prev) => ({
                        ...prev,
                        [namespace.name]: {
                          ...prev[namespace.name],
                          [kind]: newChecked,
                        },
                      }));
                    }}
                  />
                </Stack>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Stack>
    </Accordion.Root>
  );
}

function NamespaceResources({
  clusterId,
  namespace,
  kind,
  checkedResource,
  onChange,
}: {
  clusterId: string;
  namespace: string;
  kind: string;
  checkedResource: string[];
  onChange: (val: string[]) => void;
}) {
  const { data: resourceList } = useSuspenseQuery({
    queryKey: ["getClusterResourceSyncApi", clusterId, namespace, kind],
    queryFn: () =>
      getSyncListApi({
        clusterId,
        kind: kind,
        namespace,
      }),
  });

  // const handleCheck = (
  //   namespace: string,
  //   kind: string,
  //   name: string,
  //   checked: boolean
  // ) => {
  //   setCheckedResources((prev) => ({
  //     ...prev,
  //     [namespace]: {
  //       ...prev[namespace],
  //       [kind]: checked
  //         ? [...(prev[namespace]?.[kind] || []), name]
  //         : (prev[namespace]?.[kind] || []).filter((n) => n !== name),
  //     },
  //   }));
  // };

  return (
    <Stack pl="4">
      {resourceList.map((resource: any) => (
        <Checkbox.Root
          key={resource.name}
          checked={checkedResource.includes(resource.name)}
          onCheckedChange={(checked) => {
            onChange(
              checked
                ? [...checkedResource, resource.name]
                : checkedResource.filter((n) => n !== resource.name)
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>{resource.name}</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Stack>
  );
}
