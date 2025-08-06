export interface Namespaces {
  namespaces: string[];
}
export interface Names {
  names: string[];
}

export interface Labels {
  labels: string[];
}

export type WorkloadKind =
  | 'Deployment'
  | 'StatefulSet'
  | 'DaemonSet'
  | 'CronJob'
  | 'Job';

export type WorkloadKindLowercase =
  | 'deployment'
  | 'statefulset'
  | 'daemonset'
  | 'cronjob'
  | 'job';

export interface ListMeta {
  totalItems: number;
}

export type ResourceKind =
  | 'deployment'
  | 'statefulset'
  | 'daemonset'
  | 'cronjob'
  | 'job'
  | 'configmap'
  | 'secret';

export interface Policy {
  isClusterScope: boolean;
  name: string;
}

export interface Resource {
  namespace: string;
  name: string;
  labels?: Record<string, string>;
  policy: Policy;
}

export interface Resources {
  listMeta: ListMeta;
  resources: Resource[];
}

export interface ResourceDetail {
  namespace: string;
  name: string;
  uid: string;
  yaml: string;
}

export interface CreateResourceRequest {
  data: string;
}

export interface UpdateResourceRequest {
  data: string;
}

export interface ResourceResponse {
  code: number;
  message: string;
}
