import { CloseButton as ChakraCloseButton } from "@chakra-ui/react";
import type { ComponentProps } from "react";

type CloseButtonStyle = "inbox";

type CloseButtonProps = ComponentProps<typeof ChakraCloseButton> & {
  closeButtonStyle?: CloseButtonStyle;
};

const closeButtonStyles: Record<
  CloseButtonStyle,
  Partial<ComponentProps<typeof ChakraCloseButton>>
> = {
  inbox: {
    position: "absolute",
    top: "2",
    right: "2",
    mr: "2.5%",
  },
};

export const CloseButton = ({
  closeButtonStyle,
  ...props
}: CloseButtonProps) => {
  const styleProps = closeButtonStyle
    ? closeButtonStyles[closeButtonStyle]
    : {};
  return <ChakraCloseButton size="sm" {...styleProps} {...props} />;
};
