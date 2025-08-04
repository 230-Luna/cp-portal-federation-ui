import { httpClient } from "@/utils/httpClient";
import {
  Workloads,
  WorkloadKind,
  WorkloadDetail,
  CreateWorkloadRequest,
  UpdateWorkloadRequest,
  WorkloadResponse,
} from "@/models/workloadModel";

export async function getWorkloadListApi({
  kind,
  namespace,
  filterBy,
  page = 1,
  itemsPerPage = 10,
  sort = "d,creationTimestamp",
}: {
  kind: WorkloadKind;
  namespace?: string;
  filterBy?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
}) {
  const params = new URLSearchParams();

  if (namespace) {
    params.append("namespace", namespace);
  }

  if (filterBy) {
    params.append("filterBy", `name,${filterBy}`);
  }

  if (sort) {
    params.append("sortBy", sort);
  }

  if (page) {
    params.append("page", page.toString());
  }
  if (itemsPerPage) {
    params.append("itemsPerPage", itemsPerPage.toString());
  }

  const WORKLOAD_API_URL = `/api/v1/resource/${kind}?${params.toString()}`;

  return httpClient.get<Workloads>(WORKLOAD_API_URL);
}

export async function getWorkloadDetailApi({
  kind,
  namespace,
  name,
}: {
  kind: WorkloadKind;
  namespace: string;
  name: string;
}) {
  return httpClient.get<WorkloadDetail>(
    `/api/v1/resource/${kind}/namespace/${namespace}/name/${name}`
  );
}

export async function createWorkloadApi(data: CreateWorkloadRequest) {
  return httpClient.post<WorkloadResponse>(`/api/v1/resource`, data);
}

export async function updateWorkloadApi(data: UpdateWorkloadRequest) {
  return httpClient.put<WorkloadResponse>(`/api/v1/resource`, data);
}

export async function deleteWorkloadApi({
  kind,
  namespace,
  name,
}: {
  kind: WorkloadKind;
  namespace: string;
  name: string;
}) {
  return httpClient.delete<WorkloadResponse>(
    `/api/v1/resource/${kind}/namespace/${namespace}/name/${name}`
  );
}
