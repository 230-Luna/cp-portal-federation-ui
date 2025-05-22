import { Table } from "@/components/Table";
import { Flex } from "@/components/Flex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Heading, Tag, VStack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { getClusterPropagationPolicyListApi } from "@/apis/clusterPropagationPolicy";
import ClusterPropagationPolicyViewButton from "./ClusterPropagationPolicyViewButton";
import { ClusterPropagationPolicy } from "@/models/clusterPropagationPolicyModel";
import ClusterPropagationPolicyDeleteButton from "./ClusterPropagationPolicyDeleteButton";
import Pagination from "@/components/Pagination";

export default function ClusterPropagationPolicyList({
  keyword,
}: {
  keyword: string;
}) {
  const itemsPerPage = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");
  const setCurrentPage = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
  };

  const { data: clusterPropagationPolicyList } = useSuspenseQuery({
    queryKey: [
      "getClusterPropagationPolicyListApi",
      keyword,
      currentPage,
      itemsPerPage,
    ],
    queryFn: () => {
      return getClusterPropagationPolicyListApi({
        filterBy: keyword,
        page: currentPage,
        itemsPerPage: itemsPerPage,
      });
    },
  });

  if (clusterPropagationPolicyList.clusterPropagationPolicies.length === 0) {
    return (
      <Heading size="xl" margin="7%">
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
                    {clusterPropagationPolicy?.relatedClusters.map(
                      (relatedCluster) => (
                        <Tag.Root margin={0.5}>
                          <Tag.Label>{relatedCluster}</Tag.Label>
                        </Tag.Root>
                      )
                    )}
                  </VStack>
                </Table.Cell>
                <Table.Cell>
                  <VStack>
                    {clusterPropagationPolicy?.relatedResources.map(
                      (relatedResource) => (
                        <Tag.Root margin={0.5}>
                          <Tag.Label>{relatedResource}</Tag.Label>
                        </Tag.Root>
                      )
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
