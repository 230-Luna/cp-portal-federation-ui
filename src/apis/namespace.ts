import { Namespaces } from "@/models/namespaceModel";
import { httpClient } from "@/utils/httpClient";

export async function getNamespaceListApi() {
  return httpClient.get<Namespaces>(`/api/v1/namespace-names`);
}
