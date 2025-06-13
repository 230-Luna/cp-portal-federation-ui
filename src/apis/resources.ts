import { Namespaces, Names } from "@/models/resourceModel";

import { httpClient } from "@/utils/httpClient";

export async function getNameListApi() {
  //   return httpClient.get<Names>(`/api/v1/names`);

  const result = {
    names: ["test", "test1", "test2"],
  };
  return result;
}

export async function getNamespaceListApi() {
  return httpClient.get<Namespaces>(`/api/v1/namespace-names`);
}

export async function getLabelListApi() {
  //   return httpClient.get<Labels>(`/api/v1/labels`);

  const result = {
    labels: ["test=app", "test1=sample", "test2=abc"],
  };
  return result;
}
