import { Tabs as ChakraTabs } from "@chakra-ui/react";

export const Tabs = {
  Root: (props: React.ComponentProps<typeof ChakraTabs.Root>) => (
    <ChakraTabs.Root size="lg" {...props} />
  ),
  List: ChakraTabs.List,
  Trigger: ChakraTabs.Trigger,
  Content: (props: React.ComponentProps<typeof ChakraTabs.Content>) => (
    <ChakraTabs.Content padding="15px" {...props} />
  ),
};
