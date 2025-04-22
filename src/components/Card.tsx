import { Card as ChakraCard } from "@chakra-ui/react";
import type { ComponentProps } from "react";

type Type = "wide" | "medium" | "small";

const rootStyleMap: Record<Type, ComponentProps<typeof ChakraCard.Root>> = {
  wide: {
    size: "lg",
    marginBottom: "17px",
    color: "#47494d",
  },
  medium: {
    variant: "elevated",
    height: "270px",
    width: "345px",
  },
  small: {
    overflow: "auto",
    width: "350px",
    variant: "outline",
    maxW: "350px",
    maxH: "200px",
    position: "relative",
  },
};

const bodyStyleMap: Record<Type, ComponentProps<typeof ChakraCard.Body>> = {
  wide: {},
  medium: {},
  small: {
    gap: "1",
    overflowX: "hidden",
    overflowY: "auto",
  },
};

export const Card = {
  Root: ({
    type,
    ...props
  }: { type: Type } & ComponentProps<typeof ChakraCard.Root>) => (
    <ChakraCard.Root {...rootStyleMap[type]} {...props} />
  ),

  Header: ChakraCard.Header,
  Title: ChakraCard.Title,
  Description: ChakraCard.Description,

  Body: ({
    type,
    ...props
  }: { type?: Type } & ComponentProps<typeof ChakraCard.Body>) => (
    <ChakraCard.Body {...(type ? bodyStyleMap[type] : {})} {...props} />
  ),
};
