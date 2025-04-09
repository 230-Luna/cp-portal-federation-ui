interface ListMeta {
  totalItems: number;
}

interface PropagationPolicy {
  objectMeta: {
    name: string;
    namespace: string;
    labels: Record<string, string>;
    annotations: Record<string, string>;
    creationTimestamp: string;
    uid: string;
  };
  typeMeta: {
    kind: string;
  };
  schedulerName: string;
  clusterAffinity: {
    clusterNames: string[];
  };
  relatedResources: any[];
}
