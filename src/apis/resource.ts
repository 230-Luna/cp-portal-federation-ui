import { Labels, Names, Namespaces } from "@/models/resourceModel";

import { httpClient } from "@/utils/httpClient";

export async function getResourceNamespaceListApi({ kind }: { kind?: string }) {
  const params = new URLSearchParams();

  if (kind) {
    params.append("kind", kind.toLowerCase());
  }

  console.log("namespace api : ", params.toString());

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
    params.append("namespace", namespace);
  }

  params.append("kind", kind.toLowerCase());

  console.log("name api : ", params.toString());

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
    params.append("namespace", namespace);
  }

  params.append("kind", kind.toLowerCase());

  console.log("label api : ", params.toString());

  return httpClient.get<Labels>(`/api/v1/resource/labels?${params.toString()}`);
}
