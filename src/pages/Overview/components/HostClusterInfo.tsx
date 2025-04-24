import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";
import { Status, Variant } from "@/components/Status";
import { Progress } from "@/components/Progress";
import { Flex } from "@/components/Flex";
import { Stack } from "@chakra-ui/react";

export default function HostClusterInfo() {
  return (
    <>
      <Heading variant="left" marginTop="1%" marginBottom="1.2%">
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
            <Progress kind="CPU" value={73.5} />
            <Progress kind="Memory" value={23.52} />
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
