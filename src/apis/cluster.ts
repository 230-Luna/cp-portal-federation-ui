import { httpClient } from "@/utils/httpClient";

export async function getClusterList() {
  return httpClient.get<{ temp: 1 }>("/clusters");
}

// "listMeta": {
//             "totalItems": 3
//         },
//         "clusters": [
//             {
//                 "clusterId": "kjh",
//                 "name": "kjhdev",
//                 "uid": "28888888884",
//                 "kubernetesVersion": "v1.31.4",
//                 "status": "ready",
//                 "nodeSummary": {
//                     "totalNum": 4,
//                     "readyNum": 4
//                 },
//                 "syncMode": "Push",
//                 "cpuUsage": 78.84,
//                 "memoryUsage": 14.83
//             },
//             {
//                 "clusterId": "cluster3",
//                 "name": "ndev",
//                 "uid": "528888888884",
//                 "kubernetesVersion": "v1.30.4",
//                 "status": "ready",
//                 "nodeSummary": {
//                     "totalNum": 2,
//                     "readyNum": 2
//                 },
//                 "syncMode": "Push",
//                 "cpuUsage": 44.19,
//                 "memoryUsage": 6.85
//             },
//             {
//                 "clusterId": "cluster2",
//                 "name": "nprod",
//                 "uid": "2288888888846",
//                 "kubernetesVersion": "v1.30.4",
//                 "status": "ready",
//                 "nodeSummary": {
//                     "totalNum": 2,
//                     "readyNum": 2
//                 },
//                 "syncMode": "Push",
//                 "cpuUsage": 44.19,
//                 "memoryUsage": 6.85
//             }
//         ],
//         "errors": []
//     }
