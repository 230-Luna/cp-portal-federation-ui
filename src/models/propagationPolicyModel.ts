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
