import { getSyncListApi, postSyncListApi } from "@/apis/sync";
import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { toaster } from "@/components/Toaster";
import {
  Box,
  Checkbox,
  createTreeCollection,
  Drawer,
  Flex,
  Portal,
  TreeView,
} from "@chakra-ui/react";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { CheckedChangeDetails, CheckedState } from "@zag-js/checkbox";
import { useMemo, useState } from "react";
import { SyncPostBody } from "@/models/sync";
import { ResourceKindLowercase } from "@/models/resourceModel";
import { LuSquareMinus, LuSquarePlus } from "react-icons/lu";

const kindOptions = [
  "Deployment",
  "StatefulSet",
  "DaemonSet",
  "CronJob",
  "Job",
];

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

  const applySyncMutationCount = useIsMutating({
    mutationKey: ["handleApplySync", clusterId],
  });

  return (
    <Drawer.Root
      size="lg"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Drawer.Trigger asChild>
        {clusterStatus === "ready" ? (
          <Button variant="blackGhost" disabled={applySyncMutationCount > 0}>
            Sync
          </Button>
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

  const { data: syncResourceList } = useSuspenseQuery({
    queryKey: ["getSyncListApi", clusterId, "namespace"],
    queryFn: () => getSyncListApi({ clusterId, kind: "namespace" }),
  });

  const [checkedNamespaces, setCheckedNamespaces] = useState<string[]>([]);
  const [checkedResources, setCheckedResources] = useState<
    Record<string, Record<string, string[]>>
  >({});
  const [resourceTreeMap, setResourceTreeMap] = useState<
    Record<string, Record<string, { name: string; isDuplicated: boolean }[]>>
  >({});

  const updateCheckedResource = (
    namespace: string,
    kind: string,
    name: string,
    checked: CheckedState
  ) => {
    setCheckedResources((prev) => {
      const current = prev[namespace]?.[kind] || [];
      const newNamespace = { ...(prev[namespace] || {}) };
      const updatedList =
        checked === true
          ? Array.from(new Set([...current, name]))
          : current.filter((n) => n !== name);

      console.log("-------------------------------------");
      console.log("namespace: ", namespace);
      console.log("kind: ", kind);
      console.log("name: ", name);

      console.log("current: ", current);
      console.log("newNamespace: ", newNamespace);
      console.log("-------------------------------------");

      return {
        ...prev,
        [namespace]: {
          ...newNamespace,
          [kind]: updatedList,
        },
      };
    });
  };

  const handleNamespaceExpand = async (
    name: string,
    namespace: string,
    kind: ResourceKindLowercase
  ) => {
    if (resourceTreeMap[namespace]?.[name]) return;

    const res = await getSyncListApi({
      clusterId,
      namespace,
      kind: kind.toLowerCase(),
    });
    console.log("res: ", res);
    setResourceTreeMap((prev) => ({
      ...prev,
      [namespace]: {
        ...prev[namespace],
        [kind]: res,
      },
    }));
  };
  console.log("handleNamespaceExpand: ", resourceTreeMap);

  const handleKindExpand = async (
    name: string,
    namespace: string,
    kind: ResourceKindLowercase
  ) => {
    if (resourceTreeMap[namespace]?.[name]) return;

    const res = await getSyncListApi({
      clusterId,
      namespace,
      kind: kind.toLowerCase(),
    });
    console.log("res: ", res);
    setResourceTreeMap((prev) => ({
      ...prev,
      [namespace]: {
        ...prev[namespace],
        [kind]: res,
      },
    }));
  };
  console.log("handleKindExpand: ", resourceTreeMap);

  const treeData = useMemo(() => {
    return syncResourceList.map((namespace) => ({
      id: `ns-${namespace.name}`,
      name: namespace.name,
      kind: "namespace",
      isDuplicated: namespace.isDuplicated,
      children: kindOptions.map((kind) => ({
        id: `${namespace.name}-${kind.toLowerCase()}`,
        name: kind,
        kind,
        namespace: namespace.name,
        children: resourceTreeMap[namespace.name]?.[kind]
          ? resourceTreeMap[namespace.name][kind].map((resource) => ({
              id: `${namespace.name}-${kind}-${resource.name}`,
              name: resource.name,
              kind,
              namespace: namespace.name,
              isDuplicated: resource.isDuplicated,
            }))
          : [
              {
                id: `placeholder-${namespace.name}-${kind}`,
                name: "loading...",
                kind,
                namespace: namespace.name,
                isPlaceholder: true,
              },
            ],
      })),
    }));
  }, [syncResourceList, kindOptions, resourceTreeMap]);
  console.log("tree: ", treeData);

  const collection = useMemo(() => {
    return createTreeCollection({
      rootNode: { id: "root", name: "ROOT", children: treeData },
      nodeToValue: (node) => node.id,
      nodeToString: (node) => node.name,
    });
  }, [treeData]);

  const handleCheckedNamespaceChange = (
    checked: CheckedState,
    name: string
  ) => {
    setCheckedNamespaces((prev) =>
      checked === true ? [...prev, name] : prev.filter((n) => n !== name)
    );
  };

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

  return (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{clusterName}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <TreeView.Root maxW="sm" size="md" collection={collection}>
              <TreeView.Tree>
                <TreeView.Node
                  indentGuide={<TreeView.BranchIndentGuide />}
                  render={({ node, nodeState }) => {
                    const {
                      children,
                      isPlaceholder,
                      kind,
                      name,
                      isDuplicated,
                      namespace,
                    } = node;

                    if (kind === "namespace") {
                      return (
                        <Box display="flex" alignItems="center" gap={2}>
                          <TreeView.BranchControl
                            onClick={() =>
                              handleNamespaceExpand(name, namespace, kind)
                            }
                          >
                            {nodeState.expanded ? (
                              <LuSquareMinus />
                            ) : (
                              <LuSquarePlus />
                            )}
                          </TreeView.BranchControl>
                          <Checkbox.Root
                            checked={checkedNamespaces.includes(name)}
                            disabled={!isDuplicated}
                            onCheckedChange={(detail) =>
                              handleCheckedNamespaceChange(detail.checked, name)
                            }
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control>
                              <Checkbox.Indicator />
                            </Checkbox.Control>
                            <Checkbox.Label>{name}</Checkbox.Label>
                          </Checkbox.Root>
                        </Box>
                      );
                    }

                    if (kindOptions.includes(kind) && children) {
                      return (
                        <>
                          {nodeState.isBranch ? (
                            <TreeView.BranchControl
                              onClick={() =>
                                handleKindExpand(name, namespace, kind)
                              }
                            >
                              {nodeState.expanded ? (
                                <LuSquareMinus />
                              ) : (
                                <LuSquarePlus />
                              )}
                              <TreeView.BranchText>{kind}</TreeView.BranchText>
                            </TreeView.BranchControl>
                          ) : (
                            <TreeView.Item>
                              <TreeView.ItemText>{kind}</TreeView.ItemText>
                            </TreeView.Item>
                          )}
                        </>
                      );
                    }

                    if (kindOptions.includes(kind) && !children) {
                      if (isPlaceholder) return null;

                      const isChecked =
                        !!checkedResources[namespace]?.[kind]?.includes(name);

                      return (
                        <Flex direction="row">
                          <Checkbox.Root
                            checked={isChecked}
                            disabled={!isDuplicated}
                            onCheckedChange={(detail: CheckedChangeDetails) => {
                              updateCheckedResource(
                                namespace,
                                kind,
                                name,
                                detail.checked
                              );
                            }}
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control>
                              <Checkbox.Indicator />
                            </Checkbox.Control>
                          </Checkbox.Root>
                          <TreeView.Item>
                            <TreeView.ItemText>{name}</TreeView.ItemText>
                          </TreeView.Item>
                        </Flex>
                      );
                    }

                    return null;
                  }}
                />
              </TreeView.Tree>
            </TreeView.Root>
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.ActionTrigger asChild>
              <Button variant="blueOutline">Cancel</Button>
            </Drawer.ActionTrigger>
            <Button
              variant="blue"
              disabled={
                generateSyncPostData().createNamespace.length < 1 &&
                generateSyncPostData().data.length < 1
              }
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
