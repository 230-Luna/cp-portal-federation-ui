import { CheckboxCard as ChakraCheckboxCard } from "@chakra-ui/react";

export const CheckboxCard = {
  Root: ({ ...props }) => (
    <ChakraCheckboxCard.Root width="auto" colorPalette="blue" {...props} />
  ),
  HiddenInput: ChakraCheckboxCard.HiddenInput,
  Control: ChakraCheckboxCard.Control,
  Content: ChakraCheckboxCard.Content,
  Description: ChakraCheckboxCard.Description,
  Label: ChakraCheckboxCard.Label,
  Indicator: ChakraCheckboxCard.Indicator,
};
