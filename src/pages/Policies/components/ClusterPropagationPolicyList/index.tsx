import { Table } from "@/components/Table";
import { Flex } from "@/components/Flex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Box, Tag, VStack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { getClusterPropagationPolicyListApi } from "@/apis/clusterPropagationPolicy";
import ClusterPropagationPolicyViewButton from "./ClusterPropagationPolicyViewButton";
import { ClusterPropagationPolicy } from "@/models/clusterPropagationPolicyModel";
import ClusterPropagationPolicyDeleteButton from "./ClusterPropagationPolicyDeleteButton";
import Pagination from "@/components/Pagination";
import { Heading } from "@/components/Heading";

export default function ClusterPropagationPolicyList() {
  const itemsPerPage = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || undefined;
  const filterBy = searchParams.get("filterBy") || undefined;
  const currentPage = Number(searchParams.get("page") ?? "1");
  const setCurrentPage = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const { data: clusterPropagationPolicyList } = useSuspenseQuery({
    queryKey: [
      "getClusterPropagationPolicyListApi",
      filterBy,
      currentPage,
      itemsPerPage,
      sortBy,
    ],
    queryFn: () => {
      return getClusterPropagationPolicyListApi({
        filterBy: filterBy,
        page: currentPage,
        itemsPerPage: itemsPerPage,
        sort: sortBy,
      });
    },
  });

  if (clusterPropagationPolicyList.clusterPropagationPolicies.length === 0) {
    return (
      <Heading variant="center" marginTop="10%">
        결과가 없습니다.
      </Heading>
    );
  }

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Conflict Resolution</Table.ColumnHeader>
            <Table.ColumnHeader>Affected Clusters</Table.ColumnHeader>
            <Table.ColumnHeader>Related Resources</Table.ColumnHeader>
            <Table.ColumnHeader>Operation</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clusterPropagationPolicyList.clusterPropagationPolicies.map(
            (clusterPropagationPolicy: ClusterPropagationPolicy) => (
              <Table.Row key={clusterPropagationPolicy.uid}>
                <Table.Cell>{clusterPropagationPolicy.name}</Table.Cell>
                <Table.Cell>
                  {clusterPropagationPolicy.conflictResolution}
                </Table.Cell>
                <Table.Cell>
                  <VStack>
                    {clusterPropagationPolicy?.relatedClusters.length !== 0 ? (
                      clusterPropagationPolicy.relatedClusters.map(
                        (relatedCluster, index) => (
                          <Tag.Root key={relatedCluster + index} margin={0.5}>
                            <Tag.Label>{relatedCluster}</Tag.Label>
                          </Tag.Root>
                        )
                      )
                    ) : (
                      <Box>-</Box>
                    )}
                  </VStack>
                </Table.Cell>
                <Table.Cell>
                  <VStack>
                    {clusterPropagationPolicy.relatedResources.length !== 0 ? (
                      clusterPropagationPolicy.relatedResources.map(
                        (relatedResource, index) => (
                          <Tag.Root key={relatedResource + index} margin={0.5}>
                            <Tag.Label>{relatedResource}</Tag.Label>
                          </Tag.Root>
                        )
                      )
                    ) : (
                      <Box>-</Box>
                    )}
                  </VStack>
                </Table.Cell>
                <Table.Cell>
                  <Flex justify="space-evenly">
                    <ClusterPropagationPolicyViewButton
                      name={clusterPropagationPolicy.name}
                    />
                    <ClusterPropagationPolicyDeleteButton
                      name={clusterPropagationPolicy.name}
                    />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table.Root>
      <Pagination
        totalItemCount={clusterPropagationPolicyList.listMeta.totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
