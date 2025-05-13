import { httpClient } from "@/utils/httpClient";
import { Clusters, ClusterDetail } from "@/models/clustersModel";

export async function getClusterListApi(filterBy?: string) {
  let CLUSTER_API_URL = "/api/v1/cluster";
  if (filterBy) {
    CLUSTER_API_URL = `/api/v1/cluster?filterBy=name,${filterBy}`;
  }
  return httpClient.get<Clusters>(CLUSTER_API_URL);
}

export async function getClusterDetailApi(clusterId: string) {
  return httpClient.get<ClusterDetail>(`/api/v1/cluster/${clusterId}`);
}

export async function deleteClusterApi(clusterId: string) {
  return httpClient.delete(`/api/v1/cluster/${clusterId}`);
}

export async function registerClustersApi(data: { clusterIds: string[] }) {
  return httpClient.post(`/api/v1/cluster`, data);
}

export async function getRegisterableClusterListApi() {
  return httpClient.get<Clusters>(`/api/v1/registrable-clusters`);
}
