import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";
import { Status, Variant } from "@/components/Status";
import { Flex } from "@/components/Flex";
import { Stack } from "@chakra-ui/react";
import { ProgressWithMarker } from "@/components/ProgressWithMarker";

export default function MemberClusterInfo() {
  return (
    <>
      <Heading variant="leftSide" marginTop="1%" marginBottom="1.2%">
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
                <ProgressWithMarker
                  realTimeUsage={item.cpuUsage}
                  requestUsage={item.cpuRequests}
                  kind="CPU"
                  label={true}
                />
                <ProgressWithMarker
                  realTimeUsage={item.memoryUsage}
                  requestUsage={item.memoryRequests}
                  kind="Memory"
                  label={true}
                />
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
    cpuUsage: 0.1,
    cpuRequests: 99,
    memoryUsage: 20,
    memoryRequests: 30,
  },
  {
    id: 2,
    name: "member2",
    status: "ready",
    totalNum: 5,
    readyNum: 1,
    cpuUsage: 75,
    cpuRequests: 50,
    memoryUsage: 30,
    memoryRequests: 10,
  },
  {
    id: 3,

    name: "member3",
    status: "ready",
    totalNum: 4,
    readyNum: 4,
    cpuUsage: 99,
    cpuRequests: 0.5,
    memoryUsage: 5,
    memoryRequests: 70,
  },
  {
    id: 4,

    name: "member4",
    status: "notready",
    totalNum: 3,
    readyNum: 2,
    cpuUsage: 39,
    cpuRequests: 49,
    memoryUsage: 60,
    memoryRequests: 30,
  },
  {
    id: 5,

    name: "member5",
    status: "ready",
    totalNum: 4,
    readyNum: 4,
    cpuUsage: 79,
    cpuRequests: 99,
    memoryUsage: 32,
    memoryRequests: 2,
  },

  {
    id: 6,
    name: "member6",
    status: "notready",
    totalNum: 3,
    readyNum: 2,
    cpuUsage: 17,
    cpuRequests: 37,
    memoryUsage: 20,
    memoryRequests: 30,
  },
  {
    id: 7,
    name: "member7",
    status: "ready",
    totalNum: 4,
    readyNum: 4,
    cpuUsage: 29,
    cpuRequests: 59,
    memoryUsage: 30,
    memoryRequests: 10,
  },
  {
    id: 8,
    name: "member6",
    status: "notready",
    totalNum: 3,
    readyNum: 2,
    cpuUsage: 39,
    cpuRequests: 49,
    memoryUsage: 50,
    memoryRequests: 20,
  },
];
