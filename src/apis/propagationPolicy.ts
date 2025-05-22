import {
  PropagationPolicies,
  PropagationPolicyDetail,
} from "@/models/propagationPolicyModel";
import { httpClient } from "@/utils/httpClient";

export async function getPropagationPolicyListApi({
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

  params.append("sortBy", "a,namespace");
  params.append("page", page.toString());
  params.append("itemsPerPage", itemsPerPage.toString());

  const PROPAGATION_POLICY_API_URL = `/api/v1/propagationpolicy?${params.toString()}`;

  return httpClient.get<PropagationPolicies>(PROPAGATION_POLICY_API_URL);
}

export async function getPropagationPolicyDetailApi({
  namespace,
  name,
}: {
  namespace: string;
  name: string;
}) {
  return httpClient.get<PropagationPolicyDetail>(
    `/api/v1/propagationpolicy/namespace/${namespace}/${name}`
  );
}

export async function deletePropagationPolicyApi({
  namespace,
  name,
}: {
  namespace: string;
  name: string;
}) {
  return httpClient.delete(
    `/api/v1/propagationpolicy/namespace/${namespace}/${name}`
  );
}
