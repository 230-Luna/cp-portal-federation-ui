import { Flex, Status, Stack, Table, Text, Button } from "@chakra-ui/react";

export default function ClusterList() {
  return (
    <Stack gap="10">
      <Table.Root size="sm" variant="outline" className="table-root">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader className="table-column-header">
              Name
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-column-header">
              Kubernetes Version
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-column-header">
              Cluster Status
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-column-header">
              Node Status
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-column-header">
              CPU Usage
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-column-header">
              Memory Usage
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-column-header">
              Operation
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell className="table-cell">{item.name}</Table.Cell>
              <Table.Cell className="table-cell">{item.version}</Table.Cell>
              <Table.Cell className="table-cell">
                <Flex gap="2">
                  <Status.Root colorPalette="green">
                    <Status.Indicator />
                  </Status.Root>
                  <Text textStyle="sm" className="status-text">
                    {item.status}
                  </Text>
                </Flex>
              </Table.Cell>
              <Table.Cell className="table-cell">{item.nodestatus}</Table.Cell>
              <Table.Cell className="table-cell">{item.cpuusage}</Table.Cell>
              <Table.Cell className="table-cell">{item.memoryusage}</Table.Cell>
              <Table.Cell className="table-cell">
                <Flex justify="space-evenly">
                  <Button variant="ghost" color="blue.600" textStyle="md">
                    View
                  </Button>
                  <Button variant="ghost" color="red.600" textStyle="md">
                    Exclude
                  </Button>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
}

const items = [
  {
    id: 1,
    name: "Laptop",
    version: "1.30.1",
    status: "running",
    nodestatus: "2/3",
    cpuusage: "37",
    memoryusage: "28",
  },
  {
    id: 2,
    name: "Coffee Maker",
    version: "1.31.4",
    status: "running",
    nodestatus: "2/3",
    cpuusage: "37",
    memoryusage: "28",
  },
  // {
  //   id: 3,
  //   name: "Desk Chair",
  //   version: "1.30.1",
  //   status: "running",
  //   nodestatus: "2/3",
  //   cpuusage: "37",
  //   memoryusage: "28",
  // },
  // {
  //   id: 4,
  //   name: "Smartphone",
  //   version: "1.30.1",
  //   status: "running",
  //   nodestatus: "2/3",
  //   cpuusage: "37",
  //   memoryusage: "28",
  // },
  // {
  //   id: 5,
  //   name: "Headphones",
  //   version: "1.30.1",
  //   status: "running",
  //   nodestatus: "2/3",
  //   cpuusage: "37",
  //   memoryusage: "28",
  // },
  // {
  //   id: 6,
  //   name: "Laptop",
  //   version: "1.30.1",
  //   status: "running",
  //   nodestatus: "2/3",
  //   cpuusage: "37",
  //   memoryusage: "28",
  // },
  // {
  //   id: 7,
  //   name: "Coffee Maker",
  //   version: "Home Appliances",
  //   status: "running",
  //   nodestatus: "2/3",
  //   cpuusage: "37",
  //   memoryusage: "28",
  // },
  // {
  //   id: 8,
  //   name: "Desk Chair",
  //   version: "1.30.1",
  //   status: "running",
  //   nodestatus: "2/3",
  //   cpuusage: "37",
  //   memoryusage: "28",
  // },
  // {
  //   id: 9,
  //   name: "Smartphone",
  //   version: "1.30.1",
  //   status: "running",
  //   nodestatus: "2/3",
  //   cpuusage: "37",
  //   memoryusage: "28",
  // },
  // {
  //   id: 10,
  //   name: "Headphones",
  //   version: "1.30.1",
  //   status: "running",
  //   nodestatus: "2/3",
  //   cpuusage: "37",
  //   memoryusage: "28",
  // },
];
