import { Text } from "@/components/Text";
import { Card } from "@/components/Card";
import { Status, StatusValue } from "@/components/Status";
import { Progress } from "@/components/Progress";
import { Flex } from "@/components/Flex";
import { Stack } from "@chakra-ui/react";

export default function HostClusterInfo() {
  return (
    <>
      <Text type="title">Host Cluster Info</Text>
      <Card.Root type="wide">
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
        <Card.Body>
          <Stack>
            <Progress name="CPU" value={73.5} />
            <Progress name="Memory" value={23.52} />
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
  status: "ready",
};
