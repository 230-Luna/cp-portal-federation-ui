import { Sync } from "@/models/sync";
import { httpClient } from "@/utils/httpClient";

export async function getSyncListApi({
  clusterId,
  kind,
  namespace,
}: {
  clusterId: string;
  kind?: string;
  namespace?: string;
}) {
  const params = new URLSearchParams();

  if (kind) {
    params.append("kind", kind.toLowerCase());
  }

  if (namespace) {
    params.append("namespace", namespace.toLowerCase());
  }

  console.log("sync api : ", params.toString());

  return httpClient.get<Sync[]>(
    `/api/v1/sync/resource/${clusterId}?${params.toString()}`
  );
}
