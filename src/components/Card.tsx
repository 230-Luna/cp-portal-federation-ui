import { Card as ChakraCard } from "@chakra-ui/react";
import type { ComponentProps } from "react";

type CardStyle = "wide" | "medium" | "small";

type CardSubComponent =
  | typeof ChakraCard.Root
  | typeof ChakraCard.Body
  | typeof ChakraCard.Header
  | typeof ChakraCard.Title
  | typeof ChakraCard.Footer
  | typeof ChakraCard.Description;

type CardProps<T extends CardSubComponent> = ComponentProps<T> & {
  cardStyle: CardStyle;
};

const rootStyleConfig: Record<
  CardStyle,
  ComponentProps<typeof ChakraCard.Root>
> = {
  wide: {
    color: "#47494d",
    size: "lg",
  },
  medium: {
    variant: "elevated",
    height: "270px",
    width: "345px",
  },
  small: {
    variant: "outline",
    width: "350px",
    maxW: "350px",
    maxH: "200px",
    position: "relative",
    overflow: "auto",
  },
};

const bodyStyleConfig: Record<
  CardStyle,
  ComponentProps<typeof ChakraCard.Body>
> = {
  wide: {},
  medium: {},
  small: {
    gap: "1",
    overflowX: "hidden",
    overflowY: "auto",
  },
};

export const Card = {
  Root: ({ cardStyle, ...props }: CardProps<typeof ChakraCard.Root>) => (
    <ChakraCard.Root {...rootStyleConfig[cardStyle]} {...props} />
  ),
  Header: ChakraCard.Header,
  Title: ChakraCard.Title,
  Description: ChakraCard.Description,
  Body: ({ cardStyle, ...props }: CardProps<typeof ChakraCard.Body>) => (
    <ChakraCard.Body {...bodyStyleConfig[cardStyle]} {...props} />
  ),
  Footer: ChakraCard.Footer,
};
