export interface ListMeta {
  totalItems: number;
}

export interface NodeSummary {
  totalNum: number;
  readyNum: number;
}

export interface RealTimeUsage {
  cpu: number;
  memory: number;
}

export interface RequestUsage {
  cpu: number;
  memory: number;
}

export interface Cluster {
  clusterId: string;
  name: string;
  uid: string;
  kubernetesVersion: string;
  status: "ready" | "not ready";
  nodeSummary: NodeSummary;
  syncMode: "Push" | "Pull";
  realTimeUsage: RealTimeUsage;
  requestUsage: RequestUsage;
}

export interface Clusters {
  listMeta: ListMeta;
  clusters: Cluster[];
}

export interface ClusterDetail {
  clusterId: string;
  name: string;
  uid: string;
  yaml: string;
}

export interface ClusterYamlProps {
  clusterYaml: string;
}

export interface ClusterIdProps {
  clusterId: string;
}

export interface ClusterExcludeProps extends ClusterIdProps {
  isExcluding?: boolean;
  setIsExcluding?: (clusterId: string, value: boolean) => void;
}

export interface ClusterExcludeProtalProps extends ClusterIdProps {
  onClose: () => void;
  setIsExcluding: (clusterId: string, value: boolean) => void;
}
