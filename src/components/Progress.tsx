import { Progress as ChakraProgress, HStack } from "@chakra-ui/react";
import type { ComponentProps } from "react";

type ProgressKind = "CPU" | "Memory" | "bar";
type ProgressValue = number;

type ProgressProps = Omit<
  ComponentProps<typeof ChakraProgress.Root>,
  "children" | "defaultValue" | "colorPalette"
> & {
  kind: ProgressKind;
  value: ProgressValue;
};

export const Progress = ({ kind, value, ...props }: ProgressProps) => {
  const colorPalette =
    kind === "CPU" ? "yellow" : kind === "Memory" ? "green" : "blue";
  return (
    <ChakraProgress.Root
      value={value}
      colorPalette={colorPalette}
      size="lg"
      {...props}
    >
      <HStack gap="2">
        {kind != "bar" && (
          <ChakraProgress.Label width="55px">{kind}</ChakraProgress.Label>
        )}
        <ChakraProgress.Track flex="1">
          <ChakraProgress.Range />
        </ChakraProgress.Track>
        {kind != "bar" && (
          <ChakraProgress.ValueText width="40px">
            {value}%
          </ChakraProgress.ValueText>
        )}
      </HStack>
    </ChakraProgress.Root>
  );
};
