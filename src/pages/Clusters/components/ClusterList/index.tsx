import { Table } from "@/components/Table";
import { Status, Variant } from "@/components/Status";
import { Flex } from "@/components/Flex";
import CusterView from "./ClusterView";
import ClusterExclude from "./ClusterExclude";
import { getClusterList } from "@/apis/cluster";
import { useEffect, useState } from "react";

interface Cluster {
  temp: number;
}

export default function ClusterList() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const data = await getClusterList();
        if (Array.isArray(data)) {
          setClusters(data); // 성공적으로 데이터를 가져오면 상태 업데이트
        } else {
          setClusters([data]); // 단일 객체라면 배열로 감싸서 전달
        }
      } catch (error) {
        setError("API 요청 실패: " + error); // 오류 처리
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchClusters();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Kubernetes Version</Table.ColumnHeader>
          <Table.ColumnHeader>Cluster Status</Table.ColumnHeader>
          <Table.ColumnHeader>Node Status</Table.ColumnHeader>
          <Table.ColumnHeader>CPU Usage</Table.ColumnHeader>
          <Table.ColumnHeader>Memory Usage</Table.ColumnHeader>
          <Table.ColumnHeader>Operation</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.uid}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.kubernetesVersion}</Table.Cell>
            <Table.Cell>
              <Flex justify="center">
                <Status variant={item.status as Variant} />
              </Flex>
            </Table.Cell>
            <Table.Cell>
              {item.nodeSummary.readyNum}/{item.nodeSummary.totalNum}
            </Table.Cell>
            <Table.Cell>{item.cpuUsage}</Table.Cell>
            <Table.Cell>{item.memoryUsage}</Table.Cell>
            <Table.Cell>
              <Flex justify="space-evenly"></Flex>
              <CusterView />
              <ClusterExclude />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

const items = [
  {
    name: "member1",
    uid: "d4593f68-847d-4a9b-bc48-a4c55e743fd9",
    kubernetesVersion: "v1.30.4",
    status: "ready",
    nodeSummary: {
      totalNum: 2,
      readyNum: 2,
    },
    syncMode: "Push",
    cpuUsage: 44.19,
    memoryUsage: 6.85,
  },
  {
    name: "member2",
    uid: "45935b30-2d23-46a7-b165-18e12072350f",
    kubernetesVersion: "v1.30.4",
    status: "ready",
    nodeSummary: {
      totalNum: 2,
      readyNum: 2,
    },
    syncMode: "Push",
    cpuUsage: 44.19,
    memoryUsage: 6.85,
  },
  {
    name: "wow",
    uid: "8a59321c-dc29-455d-a812-1ac283296762",
    kubernetesVersion: "v1.30.4",
    status: "notready",
    nodeSummary: {
      totalNum: 3,
      readyNum: 3,
    },
    syncMode: "Push",
    cpuUsage: 67.05,
    memoryUsage: 17.08,
  },
];
