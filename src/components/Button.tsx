import { Button as ChakraButton } from "@chakra-ui/react";
import type { ComponentProps } from "react";

type ButtonStyle =
  | "largeBlue"
  | "blueOutline"
  | "blue"
  | "blueSurface"
  | "redOutline"
  | "red"
  | "blueGhost"
  | "redGhost"
  | "smallFaPlus"
  | "mediumFaPlus";

type ButtonProps = ComponentProps<typeof ChakraButton> & {
  buttonStyle?: ButtonStyle;
};

const buttonStyles: Record<
  ButtonStyle,
  Partial<ComponentProps<typeof ChakraButton>>
> = {
  largeBlue: { size: "lg", colorPalette: "blue", fontSize: "xl" },
  blueOutline: { variant: "outline", colorPalette: "blue" },
  blue: { colorPalette: "blue" },
  blueSurface: { colorPalette: "blue", variant: "surface" },
  redOutline: { variant: "outline", colorPalette: "red" },
  red: { colorPalette: "red" },
  blueGhost: { variant: "ghost", color: "blue.600", textStyle: "md" },
  redGhost: { variant: "ghost", color: "red.600", textStyle: "md" },
  smallFaPlus: { size: "2xs", fontSize: "lg", colorPalette: "blue" },
  mediumFaPlus: { size: "sm", colorPalette: "blue", fontSize: "xl" },
};

export const Button = ({ buttonStyle, ...props }: ButtonProps) => {
  const styleProps = buttonStyle ? buttonStyles[buttonStyle] : {};
  return <ChakraButton {...styleProps} {...props} />;
};
