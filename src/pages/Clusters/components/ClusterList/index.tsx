import { Table } from "@/components/Table";
import { Status } from "@/components/Status";
import { Flex } from "@/components/Flex";
import { ProgressWithMarker } from "@/components/ProgressWithMarker";
import ClusterViewButton from "./ClusterViewButton";
import ClusterExcludeButton from "./ClusterExcludeButton";
import { getClusterListApi } from "@/apis/cluster";
import { Cluster } from "@/models/clustersModel";
import { useSuspenseQuery } from "@tanstack/react-query";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import { Heading } from "@/components/Heading";
import ClusterSyncButton from "./ClusterSyncButton";

export default function ClusterList() {
  const itemsPerPage = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || undefined;
  const filterBy = searchParams.get("filterBy") || undefined;
  const currentPage = Number(searchParams.get("page") ?? "1");
  const setCurrentPage = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const { data: clusterList } = useSuspenseQuery({
    queryKey: [
      "getClusterListApi",
      filterBy,
      currentPage,
      itemsPerPage,
      sortBy,
    ],
    queryFn: () => {
      return getClusterListApi({
        filterBy: filterBy,
        page: currentPage,
        itemsPerPage: itemsPerPage,
        sort: sortBy,
      });
    },
  });

  if (clusterList.clusters.length === 0) {
    return (
      <Heading variant="center" marginTop="10%">
        클러스터가 없습니다.
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
                <Flex justify="space-evenly">
                  <ClusterViewButton clusterId={cluster.clusterId} />
                  <ClusterExcludeButton
                    clusterId={cluster.clusterId}
                    clusterName={cluster.name}
                  />
                  <ClusterSyncButton
                    clusterStatus={cluster.status}
                    clusterId={cluster.clusterId}
                    clusterName={cluster.name}
                  />
                  {/* <FaSyncAlt /> */}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        totalItemCount={clusterList.listMeta.totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
