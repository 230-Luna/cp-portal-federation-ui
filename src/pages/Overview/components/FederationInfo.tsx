import { Table } from "@/components/Table";
import { Heading } from "@/components/Heading";
import { Status, Variant } from "@/components/Status";

export default function FederationInfo() {
  return (
    <>
      <Heading variant="leftSide" marginTop="1%" marginBottom="1.2%">
        Federation Info
      </Heading>
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
                <Status variant={item.status as Variant} />
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
