import { Progress as ChakraProgress, HStack } from "@chakra-ui/react";

type ProgressName = "CPU" | "Memory";
type ProgressValue = number;

interface ProgressProps extends ChakraProgress.RootProps {
  name: ProgressName;
  value: ProgressValue;
}

export const Progress = ({ name, value, ...props }: ProgressProps) => {
  const colorPalette = name === "CPU" ? "yellow" : "green";
  return (
    <ChakraProgress.Root
      defaultValue={value}
      colorPalette={colorPalette}
      size="lg"
      {...props}
    >
      <HStack gap="2">
        <ChakraProgress.Label width="55px">{name}</ChakraProgress.Label>
        <ChakraProgress.Track flex="1">
          <ChakraProgress.Range />
        </ChakraProgress.Track>
        <ChakraProgress.ValueText width="40px">
          {value}%
        </ChakraProgress.ValueText>
      </HStack>
    </ChakraProgress.Root>
  );
};
