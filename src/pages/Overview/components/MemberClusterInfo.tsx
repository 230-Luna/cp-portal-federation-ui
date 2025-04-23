import { Text } from "@/components/Text";
import { Card } from "@/components/Card";
import { Status, StatusValue } from "@/components/Status";
import { Flex } from "@/components/Flex";
import { Stack } from "@chakra-ui/react";
import { BarList, type BarListData, useChart } from "@chakra-ui/charts";

export default function MemberClusterInfo() {
  const CPUChart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: [{ name: "CPU", value: 72.5 }],
    series: [{ name: "name", color: "yellow.solid" }],
  });
  const memoryChart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: [{ name: "Memory", value: 2.44 }],
    series: [{ name: "name", color: "green.solid" }],
  });

  return (
    <>
      <Text type="title">Member Cluster Info</Text>
      <Flex maxH="350px" overflowX="auto">
        {items.map((item) => (
          <Card.Root cardStyle="medium">
            <Card.Header>
              <Card.Title>
                <Flex>
                  {item.name}
                  <Flex>
                    <Status value={item.status as StatusValue} />
                  </Flex>
                </Flex>
              </Card.Title>
              <Card.Description>
                Nodes {item.readyNum}/{item.totalNum}
              </Card.Description>
            </Card.Header>
            <Card.Body cardStyle="medium">
              <Stack>
                <BarList.Root chart={CPUChart}>
                  <BarList.Content>
                    <BarList.Bar />
                    <BarList.Value />
                  </BarList.Content>
                </BarList.Root>
                <BarList.Root chart={memoryChart}>
                  <BarList.Content>
                    <BarList.Bar />
                    <BarList.Value />
                  </BarList.Content>
                </BarList.Root>
              </Stack>
            </Card.Body>
          </Card.Root>
        ))}
      </Flex>
    </>
  );
}

const items = [
  {
    name: "member1",
    status: "ready",
    totalNum: 3,
    readyNum: 2,
  },
  {
    name: "member2",
    status: "ready",
    totalNum: 5,
    readyNum: 1,
  },
  {
    name: "member3",
    status: "ready",
    totalNum: 4,
    readyNum: 4,
  },
  {
    name: "member4",
    status: "notready",
    totalNum: 3,
    readyNum: 2,
  },
];
