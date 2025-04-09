import { Text } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

export default function FederationInfo() {
  return (
    <>
      <Text textStyle="2xl" className="component-title">
        Federation Info
      </Text>
      <Table.Root size="sm" variant="outline" className="table-root">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader className="table-column-header">
              Karmada Version
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-column-header">
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-column-header">
              Creation Time
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell className="table-cell">{item.version}</Table.Cell>
              <Table.Cell className="table-cell">{item.status}</Table.Cell>
              <Table.Cell className="table-cell">{item.time}</Table.Cell>
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
    status: "Running",
    time: "2025-04-05 13:52:32",
  },
];
