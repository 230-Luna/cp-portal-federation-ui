import { httpClient } from "@/utils/httpClient";
import { Clusters } from "@/models/clustersModel";

export async function getClusterList() {
<<<<<<< HEAD
  return httpClient.get<Clusters>("/api/v1/cluster");
=======
  return httpClient.get<{ clusters: Clusters }>("/api/v1/cluster");
>>>>>>> 1bf4f6da2372dffe5e231f3fd93ae46db221d8ef
}
