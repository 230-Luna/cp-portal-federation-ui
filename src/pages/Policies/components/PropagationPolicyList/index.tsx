import { Table } from "@/components/Table";
import { Flex } from "@/components/Flex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Heading } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { getPropagationPolicyListApi } from "@/apis/propagationPolicy";
import { PropagationPolicy } from "@/models/propagationPolicyModel";
import PropagationPolicyDeleteButton from "./PropagationPolicyDeleteButton";
import PropagationPolicyViewButton from "./PropagationPolicyViewButton";
import Pagination from "@/components/Pagination";

export default function PropagationPolicyList({
  namespace,
  keyword,
}: {
  namespace: string;
  keyword: string;
}) {
  const itemsPerPage = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");
  const setCurrentPage = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
  };

  const { data: propagationPolicyList } = useSuspenseQuery({
    queryKey: [
      "getPropagationPolicyListApi",
      namespace,
      keyword,
      currentPage,
      itemsPerPage,
    ],
    queryFn: () => {
      return getPropagationPolicyListApi({
        namespace: namespace,
        filterBy: keyword,
        page: currentPage,
        itemsPerPage: itemsPerPage,
      });
    },
  });

  if (propagationPolicyList.propagationPolicies.length === 0) {
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
            <Table.ColumnHeader>Namespace</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Conflict Resolution</Table.ColumnHeader>
            <Table.ColumnHeader>Affected Clusters</Table.ColumnHeader>
            <Table.ColumnHeader>Related Resources</Table.ColumnHeader>
            <Table.ColumnHeader>Operation</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {propagationPolicyList.propagationPolicies.map(
            (propagationPolicy: PropagationPolicy) => (
              <Table.Row key={propagationPolicy.uid}>
                <Table.Cell>{propagationPolicy.namespace}</Table.Cell>
                <Table.Cell>{propagationPolicy.name}</Table.Cell>
                <Table.Cell>{propagationPolicy.conflictResolution}</Table.Cell>
                <Table.Cell>{propagationPolicy.relatedClusters}</Table.Cell>
                <Table.Cell>{propagationPolicy.relatedResources}</Table.Cell>
                <Table.Cell>
                  <Flex justify="space-evenly">
                    <PropagationPolicyViewButton
                      namespace={propagationPolicy.namespace}
                      name={propagationPolicy.name}
                    />
                    <PropagationPolicyDeleteButton
                      namespace={propagationPolicy.namespace}
                      name={propagationPolicy.name}
                    />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table.Root>
      <Pagination
        totalItemCount={propagationPolicyList.listMeta.totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
