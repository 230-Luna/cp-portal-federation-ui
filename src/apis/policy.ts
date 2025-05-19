import { httpClient } from "@/utils/httpClient";
import {
  PropagationPolicies,
  PropagationPolicyDetail,
} from "@/models/policyModel";

export async function getPolicyListByNamespaceApi({
  namespace,
  filterBy,
  page = 1,
  itemsPerPage = 10,
}: {
  namespace?: string;
  filterBy?: string;
  page?: number;
  itemsPerPage?: number;
}) {
  const params = new URLSearchParams();

  if (namespace) {
    params.append("namespace", namespace);
  }

  if (filterBy) {
    params.append("filterBy", `name,${filterBy}`);
  }

  params.append("page", page.toString());
  params.append("itemsPerPage", itemsPerPage.toString());

  const PROPAGATIONPOLICY_API_URL = `/api/v1/propagationpolicy?${params.toString()}`;

  return httpClient.get<PropagationPolicies>(PROPAGATIONPOLICY_API_URL);
}

export async function getPolicyByNamespaceDetailApi(clusterId: string) {
  return httpClient.get<PropagationPolicyDetail>(
    `/api/v1/propagationpolicy/${clusterId}`
  );
}

export async function deleteClusterApi(clusterId: string) {
  return httpClient.delete(`/api/v1/cluster/${clusterId}`);
}

export async function registerClustersApi(data: { clusterIds: string[] }) {
  return httpClient.post(`/api/v1/cluster`, data);
}

export async function getRegisterableClusterListApi() {
  return httpClient.get<PropagationPolicies>(`/api/v1/registrable-clusters`);
}
