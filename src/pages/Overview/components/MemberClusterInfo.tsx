import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";
import { Status, Variant } from "@/components/Status";
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
      <Heading variant="left" marginTop="1%" marginBottom="1.2%">
        Member Cluster Info
      </Heading>
      <Flex overflowX="auto" maxHeight="550px">
        {items.map((item) => (
          <Card.Root variant="medium" key={item.id}>
            <Card.Header>
              <Card.Title>
                <Flex>
                  {item.name}
                  <Flex>
                    <Status variant={item.status as Variant} />
                  </Flex>
                </Flex>
              </Card.Title>
              <Card.Description>
                Nodes {item.readyNum}/{item.totalNum}
              </Card.Description>
            </Card.Header>
            <Card.Body variant="medium">
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
    id: 1,
    name: "member1",
    status: "ready",
    totalNum: 3,
    readyNum: 2,
  },
  {
    id: 2,
    name: "member2",
    status: "ready",
    totalNum: 5,
    readyNum: 1,
  },
  {
    id: 3,

    name: "member3",
    status: "ready",
    totalNum: 4,
    readyNum: 4,
  },
  {
    id: 4,

    name: "member4",
    status: "notready",
    totalNum: 3,
    readyNum: 2,
  },
  {
    id: 5,

    name: "member5",
    status: "ready",
    totalNum: 4,
    readyNum: 4,
  },

  {
    id: 6,
    name: "member6",
    status: "notready",
    totalNum: 3,
    readyNum: 2,
  },
  {
    id: 7,
    name: "member7",
    status: "ready",
    totalNum: 4,
    readyNum: 4,
  },
  {
    id: 8,
    name: "member6",
    status: "notready",
    totalNum: 3,
    readyNum: 2,
  },
];
