export interface Sync {
  name: string;
  isDuplicated: boolean;
}

export type ResourceKind =
  | "deployment"
  | "statefulset"
  | "daemonset"
  | "cronjob"
  | "job";

export interface SyncResourceListByKind {
  kind: ResourceKind;
  list: string[];
}

export interface SyncResourceListByNamespace {
  namespace: string;
  list: SyncResourceListByKind[];
}
export interface SyncPostBody {
  createNamespace: string[];
  data: SyncResourceListByNamespace[];
}
