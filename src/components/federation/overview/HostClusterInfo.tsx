import { Text } from "@chakra-ui/react";
import { Card, Stack, Flex, Status, HStack, Progress } from "@chakra-ui/react";

export default function HostClusterInfo() {
  return (
    <>
      <Text textStyle="2xl" className="component-title">
        Host Cluster Info
      </Text>
      <Card.Root size="lg" className="large-card-root">
        <Card.Header>
          <Card.Title>
            <Flex gap="5">
              host-cluster
              <Flex gap="2">
                <Status.Root colorPalette="green">
                  <Status.Indicator />
                </Status.Root>
                <Text textStyle="sm" className="status-text">
                  running
                </Text>
              </Flex>
            </Flex>
          </Card.Title>
          <Card.Description>Nodes 2/4</Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack>
            <Progress.Root defaultValue={72.5} colorPalette="yellow" size="lg">
              <HStack gap="2">
                <Progress.Label className="card-progress-label">
                  CPU
                </Progress.Label>
                <Progress.Track flex="1">
                  <Progress.Range />
                </Progress.Track>
                <Progress.ValueText className="card-progress-value-text">
                  72.5%
                </Progress.ValueText>
              </HStack>
            </Progress.Root>
            <Progress.Root defaultValue={23.77} colorPalette="green" size="lg">
              <HStack gap="2">
                <Progress.Label className="card-progress-label">
                  Memory
                </Progress.Label>
                <Progress.Track flex="1">
                  <Progress.Range />
                </Progress.Track>
                <Progress.ValueText className="card-progress-value-text">
                  23.77%
                </Progress.ValueText>
              </HStack>
            </Progress.Root>
          </Stack>
        </Card.Body>
      </Card.Root>
    </>
  );
}
