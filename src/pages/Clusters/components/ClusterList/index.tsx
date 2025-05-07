import { Table } from "@/components/Table";
import { Status, Variant } from "@/components/Status";
import { Flex } from "@/components/Flex";
import { ProgressWithMarker } from "@/components/ProgressWithMarker";
import CusterView from "./ClusterView";
import ClusterExclude from "./ClusterExclude";
import { getClusterList } from "@/apis/cluster";
<<<<<<< HEAD
import { Clusters, Cluster } from "@/models/clustersModel";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function ClusterList() {
  const { data: clusterList } = useSuspenseQuery<Clusters>({
    queryKey: ["clusters"],
    queryFn: getClusterList,
  });
=======
import { useEffect, useState } from "react";
import { Cluster } from "@/models/clustersModel";

export default function ClusterList() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const data = (await getClusterList()).clusters;
        if (Array.isArray(data)) {
          setClusters(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClusters();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
>>>>>>> 1bf4f6da2372dffe5e231f3fd93ae46db221d8ef

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Kubernetes Version</Table.ColumnHeader>
          <Table.ColumnHeader>Cluster Status</Table.ColumnHeader>
          <Table.ColumnHeader>Node Status</Table.ColumnHeader>
          <Table.ColumnHeader>CPU Usage</Table.ColumnHeader>
          <Table.ColumnHeader>Memory Usage</Table.ColumnHeader>
          <Table.ColumnHeader>Operation</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
<<<<<<< HEAD
        {clusterList?.clusters.map((cluster: Cluster) => (
=======
        {clusters.map((cluster) => (
>>>>>>> 1bf4f6da2372dffe5e231f3fd93ae46db221d8ef
          <Table.Row key={cluster.uid}>
            <Table.Cell>{cluster.name}</Table.Cell>
            <Table.Cell>{cluster.kubernetesVersion}</Table.Cell>
            <Table.Cell>
              <Flex justify="center">
                <Status variant={cluster.status as Variant} />
              </Flex>
            </Table.Cell>
            <Table.Cell>
              {cluster.nodeSummary.readyNum}/{cluster.nodeSummary.totalNum}
            </Table.Cell>
            <Table.Cell>
              <ProgressWithMarker
                realTimeUsage={cluster.realTimeUsage.cpu}
                requestUsage={cluster.requestUsage.cpu}
                kind="CPU"
              />
            </Table.Cell>
            <Table.Cell>
              <ProgressWithMarker
                realTimeUsage={cluster.realTimeUsage.memory}
                requestUsage={cluster.requestUsage.memory}
                kind="Memory"
              />
            </Table.Cell>
            <Table.Cell>
              <Flex justify="space-evenly"></Flex>
              <CusterView />
              <ClusterExclude />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
