export interface ListMeta {
  totalItems: number;
}

export type WorkloadKind =
  | "deployment"
  | "statefulset"
  | "daemonset"
  | "cronjob"
  | "job"
  | "configmap"
  | "secret";

export interface Policy {
  isClusterScope: boolean;
  name: string;
}

export interface Workload {
  namespace: string;
  name: string;
  labels?: Record<string, string>;
  policy: Policy;
}

export interface Workloads {
  listMeta: ListMeta;
  resources: Workload[];
}

export interface WorkloadDetail {
  namespace: string;
  name: string;
  uid: string;
  yaml: string;
}

export interface CreateWorkloadRequest {
  data: string;
}

export interface UpdateWorkloadRequest {
  data: string;
}

export interface WorkloadResponse {
  code: number;
  message: string;
}
