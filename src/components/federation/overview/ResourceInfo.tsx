import { Text } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";

import React from "react";

export default function ResourceInfo() {
  return (
    <>
      <Text textStyle="2xl" className="component-title">
        Resource Info
      </Text>
      <Table.Root size="sm" variant="outline" className="table-root">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader className="table-column-header">
              Propagation Policy
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-column-header">
              Namespace
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-column-header">
              Workloads
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-column-header">
              Networks
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-column-header">
              ConfigMaps & Secrets
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell className="table-cell">{item.policy}</Table.Cell>
              <Table.Cell className="table-cell">{item.namespace}</Table.Cell>
              <Table.Cell className="table-cell">{item.workload}</Table.Cell>
              <Table.Cell className="table-cell">{item.network}</Table.Cell>
              <Table.Cell className="table-cell">{item.configmap}</Table.Cell>
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
