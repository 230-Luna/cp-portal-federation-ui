import { Button as ChakraButton } from "@chakra-ui/react";
import type { ComponentProps } from "react";

type ButtonStyle =
  | "blue"
  | "largeBlue"
  | "blueOutline"
  | "blueSurface"
  | "blueGhost"
  | "red"
  | "redOutline"
  | "redGhost"
  | "smallFaPlus"
  | "mediumFaPlus";

type ButtonProps = ComponentProps<typeof ChakraButton> & {
  buttonStyle: ButtonStyle;
};

const buttonStyleConfig: Record<
  ButtonStyle,
  ComponentProps<typeof ChakraButton>
> = {
  blue: { colorPalette: "blue", width: "7rem" },
  largeBlue: { colorPalette: "blue", size: "lg", fontSize: "xl" },
  blueOutline: { colorPalette: "blue", width: "7rem", variant: "outline" },
  blueSurface: { colorPalette: "blue", width: "7rem", variant: "surface" },
  blueGhost: { color: "blue.600", variant: "ghost", textStyle: "md" },
  red: { colorPalette: "red", width: "7rem" },
  redOutline: { colorPalette: "red", width: "7rem", variant: "outline" },
  redGhost: {
    color: "red.600",
    width: "7rem",
    variant: "ghost",
    textStyle: "md",
  },
  smallFaPlus: { colorPalette: "blue", size: "2xs", fontSize: "lg" },
  mediumFaPlus: { colorPalette: "blue", size: "sm", fontSize: "xl" },
};

export const Button = ({ buttonStyle, ...props }: ButtonProps) => {
  return <ChakraButton {...buttonStyleConfig[buttonStyle]} {...props} />;
};
