import { Table } from "@/components/Table";
import { Status } from "@/components/Status";
import { Flex } from "@/components/Flex";
import { ProgressWithMarker } from "@/components/ProgressWithMarker";
import ClusterViewButton from "./ClusterViewButton";
import ClusterExcludeButton from "./ClusterExcludeButton";
import { getClusterListApi } from "@/apis/cluster";
import { Cluster } from "@/models/clustersModel";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import Pagination from "@/components/Pagination";

export default function ClusterList({ keyword }: { keyword: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: clusterList } = useSuspenseQuery({
    queryKey: ["getClusterListApi", keyword, currentPage, pageSize],
    queryFn: () => {
      if (keyword === "") {
        return getClusterListApi({ page: currentPage, itemsPerPage: pageSize });
      }
      return getClusterListApi({
        filterBy: keyword,
        page: currentPage,
        itemsPerPage: pageSize,
      });
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!clusterList) {
    return (
      <Heading size="xl" margin="7%">
        검색 결과가 없습니다.
      </Heading>
    );
  }

  return (
    <>
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
          {clusterList.clusters.map((cluster: Cluster) => (
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
      <Pagination
        totalItemCount={clusterList.listMeta.totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={pageSize}
      />
    </>
  );
}
