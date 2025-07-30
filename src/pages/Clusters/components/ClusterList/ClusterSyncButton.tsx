import { getSyncListApi, postSyncListApi } from "@/apis/sync";
import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { toaster } from "@/components/Toaster";
import {
  Box,
  Checkbox,
  createTreeCollection,
  Drawer,
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

const KIND_OPTIONS = [
  "Deployment",
  "StatefulSet",
  "DaemonSet",
  "CronJob",
  "Job",
] as const;

const DRAWER_SIZE = "lg" as const;
const TREE_SIZE = "md" as const;
const TREE_MAX_WIDTH = "sm" as const;

type ClusterStatus = "ready" | "not ready" | "unknown";
type KindOption = (typeof KIND_OPTIONS)[number];

interface ClusterSyncButtonProps {
  clusterStatus: ClusterStatus;
  clusterId: string;
  clusterName: string;
}

interface ClusterResourceSyncDrawerProps {
  clusterId: string;
  clusterName: string;
  onClose: () => void;
}

interface TreeNode {
  id: string;
  name: string;
  kind: string;
  namespace?: string;
  isDuplicated?: boolean;
  isPlaceholder?: boolean;
  children?: TreeNode[];
}

interface ResourceTreeMap {
  [namespace: string]: {
    [kind: string]: { name: string; isDuplicated: boolean }[];
  };
}

interface CheckedResources {
  [namespace: string]: {
    [kind: string]: string[];
  };
}

function useSyncResourceList(clusterId: string) {
  return useSuspenseQuery({
    queryKey: ["getSyncListApi", clusterId, "namespace"],
    queryFn: () => getSyncListApi({ clusterId, kind: "namespace" }),
  });
}

function useSyncMutation(
  clusterId: string,
  clusterName: string,
  onClose: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["handleApplySync", clusterId],
    mutationFn: async (data: SyncPostBody) => {
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
}

function NamespaceNode({
  node,
  nodeState,
  checkedNamespaces,
  onNamespaceExpand,
  onCheckedNamespaceChange,
}: {
  node: TreeNode;
  nodeState: any;
  checkedNamespaces: string[];
  onNamespaceExpand: (
    name: string,
    namespace: string,
    kind: ResourceKindLowercase
  ) => void;
  onCheckedNamespaceChange: (checked: CheckedState, name: string) => void;
}) {
  const { name, isDuplicated } = node;

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <TreeView.BranchControl
        onClick={() =>
          onNamespaceExpand(name, name, "namespace" as ResourceKindLowercase)
        }
      >
        {nodeState.expanded ? <LuSquareMinus /> : <LuSquarePlus />}
      </TreeView.BranchControl>
      <Checkbox.Root
        checked={checkedNamespaces.includes(name)}
        disabled={isDuplicated}
        onCheckedChange={(detail) =>
          onCheckedNamespaceChange(detail.checked, name)
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

function KindNode({
  node,
  nodeState,
  onKindExpand,
}: {
  node: TreeNode;
  nodeState: any;
  onKindExpand: (
    name: string,
    namespace: string,
    kind: ResourceKindLowercase
  ) => void;
}) {
  const { name, kind, namespace } = node;

  return (
    <>
      {nodeState.isBranch ? (
        <TreeView.BranchControl
          onClick={() =>
            onKindExpand(name, namespace!, kind as ResourceKindLowercase)
          }
        >
          {nodeState.expanded ? <LuSquareMinus /> : <LuSquarePlus />}
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

function ResourceNode({
  node,
  isChecked,
  isDuplicated,
  onCheckedChange,
}: {
  node: TreeNode;
  isChecked: boolean;
  isDuplicated: boolean;
  onCheckedChange: (detail: CheckedChangeDetails) => void;
}) {
  const { name } = node;

  return (
    <Box
      as="div"
      display="flex"
      alignItems="center"
      gap="2"
      width="100%"
      cursor={!isDuplicated ? "pointer" : "default"}
      _hover={!isDuplicated ? { bg: "gray.50" } : {}}
      pl="14"
      pr="2"
      py="1"
      borderRadius="md"
      fontSize="sm"
      position="relative"
    >
      <Checkbox.Root
        checked={isChecked}
        disabled={isDuplicated}
        onCheckedChange={onCheckedChange}
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

function DrawerFooter({
  onCancel,
  onApply,
  isApplyDisabled,
}: {
  onCancel: () => void;
  onApply: () => void;
  isApplyDisabled: boolean;
}) {
  return (
    <Drawer.Footer>
      <Drawer.ActionTrigger asChild>
        <Button variant="blueOutline" onClick={onCancel}>
          Cancel
        </Button>
      </Drawer.ActionTrigger>
      <Button variant="blue" disabled={isApplyDisabled} onClick={onApply}>
        Apply
      </Button>
    </Drawer.Footer>
  );
}

export default function ClusterSyncButton({
  clusterStatus,
  clusterId,
  clusterName,
}: ClusterSyncButtonProps) {
  const [open, setOpen] = useState(false);

  const applySyncMutationCount = useIsMutating({
    mutationKey: ["handleApplySync", clusterId],
  });

  const isDisabled = clusterStatus !== "ready" || applySyncMutationCount > 0;

  return (
    <Drawer.Root
      size={DRAWER_SIZE}
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Drawer.Trigger asChild>
        <Button variant="blackGhost" disabled={isDisabled}>
          Sync
        </Button>
      </Drawer.Trigger>
      {open && (
        <ClusterResourceSyncDrawer
          clusterId={clusterId}
          clusterName={clusterName}
          onClose={() => setOpen(false)}
        />
      )}
    </Drawer.Root>
  );
}

function ClusterResourceSyncDrawer({
  clusterId,
  clusterName,
  onClose,
}: ClusterResourceSyncDrawerProps) {
  const { data: syncResourceList } = useSyncResourceList(clusterId);
  const syncMutation = useSyncMutation(clusterId, clusterName, onClose);

  const [checkedNamespaces, setCheckedNamespaces] = useState<string[]>([]);
  const [checkedResources, setCheckedResources] = useState<CheckedResources>(
    {}
  );
  const [resourceTreeMap, setResourceTreeMap] = useState<ResourceTreeMap>({});

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
    setResourceTreeMap((prev) => ({
      ...prev,
      [namespace]: {
        ...prev[namespace],
        [kind]: res,
      },
    }));
  };

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
    setResourceTreeMap((prev) => ({
      ...prev,
      [namespace]: {
        ...prev[namespace],
        [kind]: res,
      },
    }));
  };

  const handleCheckedNamespaceChange = (
    checked: CheckedState,
    name: string
  ) => {
    setCheckedNamespaces((prev) =>
      checked === true ? [...prev, name] : prev.filter((n) => n !== name)
    );
  };

  const treeData = useMemo(() => {
    return syncResourceList.map((namespace) => ({
      id: `ns-${namespace.name}`,
      name: namespace.name,
      kind: "namespace",
      isDuplicated: namespace.isDuplicated,
      children: KIND_OPTIONS.map((kind) => ({
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
  }, [syncResourceList, resourceTreeMap]);

  const collection = useMemo(() => {
    return createTreeCollection({
      rootNode: { id: "root", name: "ROOT", children: treeData },
      nodeToValue: (node) => node.id,
      nodeToString: (node) => node.name,
    });
  }, [treeData]);

  const generateSyncPostData = (): SyncPostBody => {
    const namespaces = Object.keys(checkedResources).filter(
      (namespace) => Object.keys(checkedResources[namespace]).length > 0
    );

    return {
      createNamespace: checkedNamespaces,
      data: namespaces.map((namespace) => {
        const kinds = checkedResources[namespace];
        return {
          namespace,
          list: Object.entries(kinds)
            .filter(([_, resources]) => resources.length > 0)
            .map(([kind, resources]) => ({
              kind: kind.toLowerCase() as ResourceKindLowercase,
              list: resources,
            })),
        };
      }),
    };
  };

  const syncPostData = generateSyncPostData();
  const isApplyDisabled =
    syncPostData.createNamespace.length < 1 && syncPostData.data.length < 1;

  const handleApply = () => {
    syncMutation.mutate(syncPostData);
  };

  const renderNode = ({
    node,
    nodeState,
  }: {
    node: TreeNode;
    nodeState: any;
  }) => {
    const { children, isPlaceholder, kind, name, isDuplicated, namespace } =
      node;

    if (kind === "namespace") {
      return (
        <NamespaceNode
          node={node}
          nodeState={nodeState}
          checkedNamespaces={checkedNamespaces}
          onNamespaceExpand={handleNamespaceExpand}
          onCheckedNamespaceChange={handleCheckedNamespaceChange}
        />
      );
    }

    if (KIND_OPTIONS.includes(kind as KindOption) && children) {
      return (
        <KindNode
          node={node}
          nodeState={nodeState}
          onKindExpand={handleKindExpand}
        />
      );
    }

    if (KIND_OPTIONS.includes(kind as KindOption) && !children) {
      if (isPlaceholder) return null;

      const isChecked = !!checkedResources[namespace!]?.[kind]?.includes(name);

      return (
        <ResourceNode
          node={node}
          isChecked={isChecked}
          isDuplicated={isDuplicated!}
          onCheckedChange={(detail: CheckedChangeDetails) => {
            updateCheckedResource(namespace!, kind, name, detail.checked);
          }}
        />
      );
    }

    return null;
  };

  return (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{clusterName}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <TreeView.Root
              maxW={TREE_MAX_WIDTH}
              size={TREE_SIZE}
              collection={collection}
            >
              <TreeView.Tree>
                <TreeView.Node
                  indentGuide={<TreeView.BranchIndentGuide />}
                  render={renderNode}
                />
              </TreeView.Tree>
            </TreeView.Root>
          </Drawer.Body>
          <DrawerFooter
            onCancel={onClose}
            onApply={handleApply}
            isApplyDisabled={isApplyDisabled}
          />
          <Drawer.CloseTrigger asChild>
            <CloseButton />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
}
