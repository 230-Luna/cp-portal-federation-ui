import { CloseButton as ChakraCloseButton } from "@chakra-ui/react";
import type { ComponentProps } from "react";

type CloseButtonStyle = "inbox";

type CloseButtonProps = ComponentProps<typeof ChakraCloseButton> & {
  closeButtonStyle?: CloseButtonStyle;
};

const closeButtonStyleConfig: Record<
  CloseButtonStyle,
  ComponentProps<typeof ChakraCloseButton>
> = {
  inbox: {
    size: "sm",
    position: "absolute",
    top: "2",
    right: "2",
  },
};

export const CloseButton = ({
  closeButtonStyle,
  ...props
}: CloseButtonProps) => {
  return (
    <ChakraCloseButton
      {...(closeButtonStyle ? closeButtonStyleConfig[closeButtonStyle] : {})}
      {...props}
    />
  );
};
