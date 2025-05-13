import { httpClient } from "@/utils/httpClient";
import { Clusters, ClusterDetail } from "@/models/clustersModel";

export async function getClusterListApi() {
  return httpClient.get<Clusters>(`/api/v1/cluster`);
}

export async function getClusterDetailApi(clusterId: string) {
  return httpClient.get<ClusterDetail>(`/api/v1/cluster/${clusterId}`);
}

export async function deleteClusterApi(clusterId: string) {
  return httpClient.delete(`/api/v1/cluster/${clusterId}`);
}

export async function registerClustersApi(clusterIds: string[]) {
  console.log("clusterId: ", clusterIds);
  return httpClient.post(`/api/v1/cluster`, clusterIds);
}

export async function getRegisterableClusterListApi() {
  return httpClient.get<Clusters>(`/api/v1/registrable-clusters`);
}
