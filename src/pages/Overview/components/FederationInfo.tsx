import { Table } from "@/components/Table";
import { Text } from "@/components/Text";
import { Status, StatusValue } from "@/components/Status";

export default function FederationInfo() {
  return (
    <>
      <Text type="title">Federation Info</Text>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Karmada Version</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Creation Time</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.version}</Table.Cell>
              <Table.Cell>
                <Status value={item.status as StatusValue} />
              </Table.Cell>
              <Table.Cell>{item.time}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}

const items = [
  {
    id: 1,
    version: "v1.13.0",
    status: "ready",
    time: "2025-04-05 13:52:32",
  },
];
