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

export interface PropagationPolicyList {
  listMeta: {
    totalItems: number;
  };
  propagationPolicies: PropagationPolicy[];
}
