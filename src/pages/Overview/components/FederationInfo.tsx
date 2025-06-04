import { Heading } from "@/components/Heading";
import { Table } from "@/components/Table";
import { ClusterResourceStatus } from "@/models/overviewModel";

export default function FederationInfo({
  resources,
}: {
  resources: ClusterResourceStatus;
}) {
  return (
    <>
      <Heading variant="leftSide" marginTop="1%" marginBottom="1.2%">
        Resource Info
      </Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Propagation Policy</Table.ColumnHeader>
            <Table.ColumnHeader>Namespace</Table.ColumnHeader>
            <Table.ColumnHeader>Workloads</Table.ColumnHeader>
            <Table.ColumnHeader>Networks</Table.ColumnHeader>
            <Table.ColumnHeader>ConfigMaps & Secrets</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row key={resources.propagationPolicyNum}>
            <Table.Cell>{resources.namespaceNum}</Table.Cell>
            <Table.Cell>{resources.workloadNum}</Table.Cell>
            <Table.Cell>{resources.serviceNum}</Table.Cell>
            <Table.Cell>{resources.serviceNum}</Table.Cell>
            <Table.Cell>{resources.configNum}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </>
  );
}
