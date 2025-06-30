import { Placement, ResourceSelector } from "./propagationPolicyModel";

export interface ListMeta {
  totalItems: number;
}

export interface ClusterPropagationPolicy {
  name: string;
  uid: string;
  conflictResolution: "Abort" | "Overwrite";
  accessLevel: "full" | "readonly";
  relatedClusters: string[];
  relatedResources: string[];
}

export interface ClusterPropagationPolicies {
  listMeta: {
    totalItems: number;
  };
  clusterPropagationPolicies: ClusterPropagationPolicy[];
}

export interface ClusterPropagationPolicyDetail {
  name: string;
  uid: string;
  yaml: string;
}

export interface Metadata {
  name: string;
  labels?: string[];
  annotations?: string[];
  preserveResourceOnDeletion: false;
}

export interface CreateClusterPropagationPolicy {
  metadata: Metadata;
  resourceSelectors: ResourceSelector[];
  placement: Placement;
}
