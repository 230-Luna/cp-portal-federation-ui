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
  namespace: string;
  name: string;
  labels: string[];
  annotations: string[];
  preserveResourceOnDeletion: false;
}

export interface ResourceSelector {
  kind: "Deployment" | "Statefulset" | "Daemonset" | "Cronjob" | "Job";
  name?: string;
  labels?: string[];
}

export interface ResourceSelectors {
  resourceselectors: NonEmptyArray<ResourceSelector>;
}

export interface WeightPreference {
  targetClusters: NonEmptyArray<string>;
  weight: number;
}

interface BasePlacement {
  clusternames: NonEmptyArray<string>;
}

interface DuplicatedPlacement extends BasePlacement {
  type: "Duplicated";
}

interface DividedAggregatedPlacement extends BasePlacement {
  type: "Divided";
  divisionpreference: "Aggregated";
}

interface DividedWeightedPlacement extends BasePlacement {
  type: "Divided";
  divisionpreference: "Weighted";
  weightpreference: WeightPreference[];
}

type Placement =
  | BasePlacement
  | DuplicatedPlacement
  | DividedAggregatedPlacement
  | DividedWeightedPlacement;
