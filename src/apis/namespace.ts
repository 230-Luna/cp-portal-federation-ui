import { httpClient } from '@/utils/httpClient';
import {
  Namespaces,
  NamespaceDetail,
  CreateNamespaceRequest,
  DeleteNamespaceResponse,
} from '@/models/namespaceModel';

export async function getNamespaceListApi({
  filterBy,
  page = 1,
  itemsPerPage = 10,
  sort = 'd,creationTimestamp',
}: {
  filterBy?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
}) {
  const params = new URLSearchParams();

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

  const NAMESPACE_API_URL = `/api/v1/namespace?${params.toString()}`;

  return httpClient.get<Namespaces>(NAMESPACE_API_URL);
}

export async function getNamespaceDetailApi({ name }: { name: string }) {
  return httpClient.get<NamespaceDetail>(`/api/v1/namespace/${name}`);
}

export async function deleteNamespaceApi({ name }: { name: string }) {
  return httpClient.delete<DeleteNamespaceResponse>(
    `/api/v1/namespace/${name}`
  );
}

export async function createNamespaceApi(data: CreateNamespaceRequest) {
  return httpClient.post(`/api/v1/namespace`, data);
}
