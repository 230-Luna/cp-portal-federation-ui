import { ResourceKind } from "./resourceModel";

export interface ListMeta {
  totalItems: number;
}

export interface PropagationPolicy {
  namespace: string;
  name: string;
  uid: string;
  conflictResolution: "Abort" | "Overwrite";
  accessLevel: "full" | "readonly";
  relatedClusters: string[];
  relatedResources: string[];
}

export interface PropagationPolicies {
  listMeta: {
    totalItems: number;
  };
  propagationPolicies: PropagationPolicy[];
}

export interface PropagationPolicyDetail {
  namespace: string;
  name: string;
  uid: string;
  yaml: string;
}

type NonEmptyArray<T> = [T, ...T[]];

export interface Metadata {
  name: string;
  namespace: string;
  labels?: string[];
  annotations?: string[];
  preserveResourceOnDeletion: false;
}

export interface ResourceSelector {
  kind: ResourceKind;
  namespace?: string;
  name?: string;
  labelSelectors?: string[];
}

export interface WeightPreference {
  targetClusters: NonEmptyArray<string>;
  weight: number;
}

export interface ReplicaScheduling {
  replicaSchedulingType?: "Divided" | "Duplicated";
  replicaDivisionpreference?: "Aggregated" | "Weighted";
  staticWeightList?: WeightPreference[];
}
export interface Placement {
  clusternames: string[];
  replicaScheduiling: ReplicaScheduling;
}

export interface CreatePropagationPolicy {
  metadata: Metadata;
  resourceSelectors: ResourceSelector[];
  placement: Placement;
}
