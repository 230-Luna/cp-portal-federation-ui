import { Labels, Names, Namespaces } from "@/models/resourceModel";

import { httpClient } from "@/utils/httpClient";

export async function getResourceNamespaceListApi({ kind }: { kind?: string }) {
  // const params = new URLSearchParams();

  // if (kind) {
  //   params.append("kind", kind);

  // return httpClient.get<Namespaces>(`/api/v1/resource/namespaces?${params.toString()}`);

  const item = { namespaces: ["namespace1", "namespace2", "namespace3"] };
  return item;
}

export async function getResourceNameListApi({
  kind,
  namespace,
}: {
  kind: string;
  namespace?: string;
}) {
  // const params = new URLSearchParams();

  // if (namespace) {
  //   params.append("namespace", namespace);
  // }

  // params.append("kind", kind);

  // return httpClient.get<Names>(`/api/v1/resource/names?${params.toString()}`);

  const item = { names: ["name1", "name2", "name3", kind] };
  return item;
}

export async function getResourceLabelListApi({
  kind,
  namespace,
}: {
  kind: string;
  namespace?: string;
}) {
  // const params = new URLSearchParams();

  // if (namespace) {
  //   params.append("namespace", namespace);
  // }

  // params.append("kind", kind);

  // return httpClient.get<Labels>(`/api/v1/labels?${params.toString()}`);

  const item = { labels: ["label1", "label2", "label3", kind] };
  return item;
}
