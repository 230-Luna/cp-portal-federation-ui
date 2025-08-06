import {
  CreateResourceRequest,
  Labels,
  Names,
  Namespaces,
  ResourceDetail,
  ResourceKind,
  ResourceResponse,
  Resources,
  UpdateResourceRequest,
} from '@/models/resourceModel';
import { httpClient } from '@/utils/httpClient';

export async function getResourceNamespaceListApi({ kind }: { kind?: string }) {
  const params = new URLSearchParams();

  if (kind) {
    params.append('kind', kind.toLowerCase());
  }

  return httpClient.get<Namespaces>(
    `/api/v1/resource/namespaces?${params.toString()}`
  );
}

export async function getResourceNameListApi({
  kind,
  namespace,
}: {
  kind: string;
  namespace?: string;
}) {
  const params = new URLSearchParams();

  if (namespace) {
    params.append('namespace', namespace);
  }

  params.append('kind', kind.toLowerCase());

  return httpClient.get<Names>(`/api/v1/resource/names?${params.toString()}`);
}

export async function getResourceLabelListApi({
  kind,
  namespace,
}: {
  kind: string;
  namespace?: string;
}) {
  const params = new URLSearchParams();

  if (namespace) {
    params.append('namespace', namespace);
  }

  params.append('kind', kind.toLowerCase());

  return httpClient.get<Labels>(`/api/v1/resource/labels?${params.toString()}`);
}

export async function getResourceListApi({
  kind,
  namespace,
  filterBy,
  page = 1,
  itemsPerPage = 10,
  sort = 'd,creationTimestamp',
}: {
  kind: ResourceKind;
  namespace?: string;
  filterBy?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
}) {
  const params = new URLSearchParams();

  if (namespace) {
    params.append('namespace', namespace);
  }

  if (filterBy) {
    params.append('filterBy', `name,${filterBy}`);
  }

  if (sort) {
    params.append('sortBy', sort);
  }

  if (page) {
    params.append('page', page.toString());
  }
  if (itemsPerPage) {
    params.append('itemsPerPage', itemsPerPage.toString());
  }

  const RESOURCE_API_URL = `/api/v1/resource/${kind}?${params.toString()}`;

  return httpClient.get<Resources>(RESOURCE_API_URL);
}

export async function getResourceDetailApi({
  kind,
  namespace,
  name,
}: {
  kind: ResourceKind;
  namespace: string;
  name: string;
}) {
  return httpClient.get<ResourceDetail>(
    `/api/v1/resource/${kind}/namespace/${namespace}/name/${name}`
  );
}

export async function createResourceApi(data: CreateResourceRequest) {
  return httpClient.post<ResourceResponse>(`/api/v1/resource`, data);
}

export async function updateResourceApi(data: UpdateResourceRequest) {
  return httpClient.put<ResourceResponse>(`/api/v1/resource`, data);
}

export async function deleteResourceApi({
  kind,
  namespace,
  name,
}: {
  kind: ResourceKind;
  namespace: string;
  name: string;
}) {
  return httpClient.delete<ResourceResponse>(
    `/api/v1/resource/${kind}/namespace/${namespace}/name/${name}`
  );
}
