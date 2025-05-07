import { Skeleton } from "@chakra-ui/react";
import { Table } from "@/components/Table";

export default function LoadingSkeleton() {
  return (
    <Table.Root>
      <Table.Header>
        <Skeleton key={0} height="100px">
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Kubernetes Version</Table.ColumnHeader>
            <Table.ColumnHeader>Cluster Status</Table.ColumnHeader>
            <Table.ColumnHeader>Node Status</Table.ColumnHeader>
            <Table.ColumnHeader>CPU Usage</Table.ColumnHeader>
            <Table.ColumnHeader>Memory Usage</Table.ColumnHeader>
            <Table.ColumnHeader>Operation</Table.ColumnHeader>
          </Table.Row>
        </Skeleton>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
        <Skeleton key={1} height="100px">
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Skeleton>
        <Skeleton key={2} height="100px">
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Skeleton>
      </Table.Body>
    </Table.Root>
  );
}
