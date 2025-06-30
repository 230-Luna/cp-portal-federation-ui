import { ResourceKindLowercase } from "./resourceModel";

export interface Sync {
  name: string;
  isDuplicated: boolean;
}

export interface SyncResourceListByKind {
  kind: ResourceKindLowercase;
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
