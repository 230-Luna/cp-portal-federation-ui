import { Text } from "@/components/Text";
import { Table } from "@/components/Table";

export default function ResourceInfo() {
  return (
    <>
      <Text type="title">Resource Info</Text>
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
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.policy}</Table.Cell>
              <Table.Cell>{item.namespace}</Table.Cell>
              <Table.Cell>{item.workload}</Table.Cell>
              <Table.Cell>{item.network}</Table.Cell>
              <Table.Cell>{item.configmap}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}

const items = [
  { id: 1, policy: 1, namespace: 5, workload: 3, network: 3, configmap: 8 },
];
