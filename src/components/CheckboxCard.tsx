import { CheckboxCard as ChakraCheckboxCard } from "@chakra-ui/react";
import type { ComponentProps } from "react";

export const CheckboxCard = {
  Root: ({ ...props }: ComponentProps<typeof ChakraCheckboxCard.Root>) => (
    <ChakraCheckboxCard.Root colorPalette="blue" width="auto" {...props} />
  ),
  HiddenInput: ChakraCheckboxCard.HiddenInput,
  Control: ChakraCheckboxCard.Control,
  Content: ChakraCheckboxCard.Content,
  Description: ChakraCheckboxCard.Description,
  Label: ChakraCheckboxCard.Label,
  Indicator: ChakraCheckboxCard.Indicator,
};
