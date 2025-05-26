import { httpClient } from "@/utils/httpClient";
import {
  ClusterPropagationPolicies,
  ClusterPropagationPolicyDetail,
} from "@/models/clusterPropagationPolicyModel";

export async function getClusterPropagationPolicyListApi({
  filterBy,
  page = 1,
  itemsPerPage = 10,
  sort = "d,creationTimestamp",
}: {
  filterBy?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
}) {
  const params = new URLSearchParams();

  if (filterBy) {
    params.append("filterBy", `name,${filterBy}`);
  }

  if (sort) {
    params.append("sortBy", sort);
  }

  params.append("page", page.toString());
  params.append("itemsPerPage", itemsPerPage.toString());

  const CLUSTER_PROPAGATION_POLICY_API_URL = `/api/v1/clusterpropagationpolicy?${params.toString()}`;
  console.log("cluster: ", params.toString());

  return httpClient.get<ClusterPropagationPolicies>(
    CLUSTER_PROPAGATION_POLICY_API_URL
  );
}

export async function getClusterPropagationPolicyDetailApi({
  name,
}: {
  name: string;
}) {
  return httpClient.get<ClusterPropagationPolicyDetail>(
    `/api/v1/clusterpropagationpolicy/${name}`
  );
}

export async function deleteClusterPropagationPolicyApi({
  name,
}: {
  name: string;
}) {
  return httpClient.delete(`/api/v1/clusterpropagationpolicy/${name}`);
}
