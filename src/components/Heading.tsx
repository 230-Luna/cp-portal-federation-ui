import { Heading as ChakraHeading } from "@chakra-ui/react";
import type { ComponentProps } from "react";

export const Heading = ({ ...props }: ComponentProps<typeof ChakraHeading>) => {
  return (
    <ChakraHeading
      w="100%"
      textAlign={"center"}
      fontWeight="400"
      color="#47494d"
      fontFamily='"Apple SD Gothic Neo", "Noto Sans KR", "맑은 고딕", "Font Awesome 5 Free", monospace'
      fontStyle="normal"
      size="2xl"
      {...props}
    />
  );
};
