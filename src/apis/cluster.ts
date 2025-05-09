import { httpClient } from "@/utils/httpClient";
import {
  Clusters,
  ClusterDetail,
  ClusterIdProps,
} from "@/models/clustersModel";

export async function getClusterListApi() {
  return httpClient.get<Clusters>(`/api/v1/cluster`);
}

export async function getClusterDetailApi(clusterId: string) {
  return httpClient.get<ClusterDetail>(`/api/v1/cluster/${clusterId}`);
}

export async function deleteClusterApi(clusterId: string) {
  return httpClient.delete<ClusterIdProps>(`/api/v1/cluster/${clusterId}`);
}

export async function registerClustersApi() {
  return;
  // return httpClient.post<ClusterIdProps>(`/api/v1/cluster`);
}

export async function getRegisterableClusterListApi() {
  return httpClient.get<Clusters>(`/api/v1/registrable-clusters`);
}
