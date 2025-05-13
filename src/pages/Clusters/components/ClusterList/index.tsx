import { Table } from "@/components/Table";
import { Status } from "@/components/Status";
import { Flex } from "@/components/Flex";
import { ProgressWithMarker } from "@/components/ProgressWithMarker";
import ClusterViewButton from "./ClusterView";
import ClusterExcludeButton from "./ClusterExclude";
import { getClusterListApi } from "@/apis/cluster";
import { Cluster } from "@/models/clustersModel";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function ClusterList({ value }: { value: string }) {
  const { data: clusterList } = useSuspenseQuery({
    queryKey: ["getClusterListApi", value],
    queryFn: () => {
      if (value === "") {
        return getClusterListApi();
      }
      return getClusterListApi(value);
    },
  });

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
        {clusterList == null
          ? null
          : clusterList.clusters.map((cluster: Cluster) => (
              <Table.Row key={cluster.uid}>
                <Table.Cell>{cluster.name}</Table.Cell>
                <Table.Cell>{cluster.kubernetesVersion}</Table.Cell>
                <Table.Cell>
                  <Flex justify="center">
                    <Status variant={cluster.status} />
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
                  <ClusterViewButton clusterId={cluster.clusterId} />
                  <ClusterExcludeButton
                    clusterId={cluster.clusterId}
                    clusterName={cluster.name}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
      </Table.Body>
    </Table.Root>
  );
}
