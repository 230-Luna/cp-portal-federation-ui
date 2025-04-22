import { Flex as ChakraFlex } from "@chakra-ui/react";

export const Flex = ({ ...props }) => {
  return <ChakraFlex gap="2" flexWrap="wrap" {...props} />;
};
