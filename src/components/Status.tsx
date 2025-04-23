import type { ColorPalette } from "@chakra-ui/react";
import { Status as ChakraStatus } from "@chakra-ui/react";

export type Type = "ready" | "notready" | "unknown";

interface StatusProps extends ChakraStatus.RootProps {
  value?: Type;
}

const statusColor: Record<Type, ColorPalette> = {
  ready: "green",
  notready: "red",
  unknown: "gray",
};

export const Status = ({ value = "unknown", ...props }: StatusProps) => {
  const colorPalette = statusColor[value];
  return (
    <ChakraStatus.Root
      fontWeight="500"
      color="#47494d"
      colorPalette={colorPalette}
      {...props}
    >
      <ChakraStatus.Indicator />
      {value}
    </ChakraStatus.Root>
  );
};
