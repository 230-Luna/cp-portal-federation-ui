import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";
import { Status, Variant } from "@/components/Status";
import { Flex } from "@/components/Flex";
import { Stack } from "@chakra-ui/react";
import { ProgressWithMarker } from "@/components/ProgressWithMarker";
import { MemberClusterStatus } from "@/models/overviewModel";

export default function MemberClusterInfo({
  memberClusters,
}: {
  memberClusters: MemberClusterStatus[];
}) {
  return (
    <>
      <Heading variant="leftSide" marginTop="1%" marginBottom="1.2%">
        Member Cluster Info
      </Heading>
      <Flex overflowX="auto" maxHeight="550px">
        {memberClusters.length > 0
          ? memberClusters.map((memberCluster) => (
              <Card.Root variant="medium" key={memberCluster.name}>
                <Card.Header>
                  <Card.Title>
                    <Flex>
                      {memberCluster.name}
                      <Flex>
                        <Status variant={memberCluster.status as Variant} />
                      </Flex>
                    </Flex>
                  </Card.Title>
                  <Card.Description>
                    Nodes {memberCluster.nodeSummary.readyNum}/
                    {memberCluster.nodeSummary.totalNum}
                  </Card.Description>
                </Card.Header>
                <Card.Body variant="medium">
                  <Stack>
                    <ProgressWithMarker
                      realTimeUsage={memberCluster.realTimeUsage.cpu}
                      requestUsage={memberCluster.requestUsage.cpu}
                      kind="CPU"
                      label={true}
                    />
                    <ProgressWithMarker
                      realTimeUsage={memberCluster.realTimeUsage.memory}
                      requestUsage={memberCluster.requestUsage.memory}
                      kind="Memory"
                      label={true}
                    />
                  </Stack>
                </Card.Body>
              </Card.Root>
            ))
          : null}
      </Flex>
    </>
  );
}
