export interface Namespaces {
  namespaces: string[];
}
export interface Names {
  names: string[];
}

export interface Labels {
  labels: string[];
}

export type ResourceKind =
  | "Deployment"
  | "StatefulSet"
  | "DaemonSet"
  | "CronJob"
  | "Job";

export type ResourceKindLowercase =
  | "deployment"
  | "statefulset"
  | "daemonset"
  | "cronjob"
  | "job";
