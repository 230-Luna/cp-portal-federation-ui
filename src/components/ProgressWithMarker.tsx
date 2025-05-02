import { Progress, Box, HStack } from "@chakra-ui/react";
import { Tooltip } from "@/components/Tooltip";

export const ProgressWithMarker = ({
  realTimeUsage: realTimeUsage,
  requestUsage: requestUsage,
  kind,
}: {
  realTimeUsage: number;
  requestUsage: number;
  kind: string;
}) => {
  const colorPalette =
    kind === "CPU" ? "yellow" : kind === "Memory" ? "green" : "blue";

  const triangleSize = 10;
  const textSize = "12px";

  return (
    <Box width="100%" padding="10px">
      <Progress.Root
        value={realTimeUsage}
        colorPalette={colorPalette}
        size="lg"
      >
        <HStack gap="2">
          <Progress.Label width="55px">{kind}</Progress.Label>
          <Box width="100%" position="relative">
            <Progress.Track flex="1" height="30px">
              <Progress.Range position="relative">
                <Progress.ValueText
                  position="absolute"
                  left="50%"
                  color="black"
                >
                  {realTimeUsage}%
                </Progress.ValueText>
              </Progress.Range>
            </Progress.Track>
            <Tooltip showArrow content={`Request Usage: ${requestUsage}%`}>
              <Box
                position="absolute"
                left={`calc(${requestUsage}% - ${triangleSize / 2}px)`}
                top="-50%"
                transform="translateY(50%)"
                width="0"
                height="0"
                borderLeft={`${triangleSize / 2}px solid transparent`}
                borderRight={`${triangleSize / 2}px solid transparent `}
                borderTop={`${triangleSize}px solid #47494d`}
              />
            </Tooltip>
            {/* <Text
              position="absolute"
              left={`calc(${requestUsage}% - ${triangleSize / 2}px + ${
                triangleSize / 2
              }px)`}
              top="-90%"
              transform="translateX(-50%)"
              fontWeight="bold"
              fontSize={textSize}
              color="#47494d"
            >
              {`${requestUsage}%`}
            </Text> */}
          </Box>
          {/* <Progress.ValueText>{realTimeUsage}%</Progress.ValueText> */}
        </HStack>
      </Progress.Root>
    </Box>
  );
};
