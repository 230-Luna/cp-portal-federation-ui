import { httpClient } from "@/utils/httpClient";
import { Clusters, ClusterDetail } from "@/models/clustersModel";

export async function getClusterList() {
  return httpClient.get<Clusters>(`/api/v1/cluster`);
}

export async function getClusterDetail(clusterId: string) {
  return httpClient.get<ClusterDetail>(`/api/v1/cluster/${clusterId}`);
}
