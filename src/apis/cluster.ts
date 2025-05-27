import { httpClient } from "@/utils/httpClient";
import { Clusters, ClusterDetail } from "@/models/clustersModel";
import { useSearchParams } from "react-router-dom";

export async function getClusterListApi({
  filterBy,
  page = 1,
  itemsPerPage = 10,
  sort = "newest",
}: {
  filterBy?: string;
  page: number;
  itemsPerPage: number;
  sort?: string;
}) {
  const [searchParams] = useSearchParams();

  if (filterBy) {
    searchParams.append("filterBy", `name,${filterBy}`);
  }

  if (sort) {
    searchParams.append("sortBy", sort);
  }

  searchParams.append("page", page.toString());
  searchParams.append("itemsPerPage", itemsPerPage.toString());

  const CLUSTER_API_URL = `/api/v1/cluster?${searchParams.toString()}`;

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
