import { Text as ChakraText } from "@chakra-ui/react";
import type { ComponentProps } from "react";

type Type = "title" | "small" | "subTitle";

type TextProps = ComponentProps<typeof ChakraText> & {
  type?: Type;
};

const textStyles: Record<Type, Partial<ComponentProps<typeof ChakraText>>> = {
  title: {
    textStyle: "2xl",
    mt: "1%",
    mb: "1.2%",
  },
  small: {
    textStyle: "sm",
  },
  subTitle: {
    textStyle: "xs",
    mt: "1.5%",
  },
};

export const Text = ({ type, ...props }: TextProps) => {
  const styleProps = type ? textStyles[type] : {};

  return (
    <ChakraText
      fontFamily='"Apple SD Gothic Neo", "Noto Sans KR", "맑은 고딕", "Font Awesome 5 Free", monospace'
      fontStyle="normal"
      color="#47494d"
      fontWeight="400"
      {...styleProps}
      {...props}
    />
  );
};
