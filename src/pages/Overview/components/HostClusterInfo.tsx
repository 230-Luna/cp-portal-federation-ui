import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";
import { Status, Variant } from "@/components/Status";
import { Flex } from "@/components/Flex";
import { Stack } from "@chakra-ui/react";
import { ProgressWithMarker } from "@/components/ProgressWithMarker";

export default function HostClusterInfo() {
  return (
    <>
      <Heading variant="leftSide" marginTop="1%" marginBottom="1.2%">
        Host Cluster Info
      </Heading>
      <Card.Root variant="wide" marginBottom="17px">
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
        <Card.Body variant="wide">
          <Stack>
            <ProgressWithMarker
              realTimeUsage={item.cpuUsage}
              requestUsage={item.cpuRequests}
              kind="CPU"
            />
            <ProgressWithMarker
              realTimeUsage={item.memoryUsage}
              requestUsage={item.memoryRequests}
              kind="Memory"
            />
          </Stack>
        </Card.Body>
      </Card.Root>
    </>
  );
}

const item = {
  name: "host-cluster",
  totalNum: 4,
  readyNum: 3,
  cpuUsage: 39,
  cpuRequests: 49,
  memoryUsage: 60,
  memoryRequests: 30,
  status: "ready",
};
