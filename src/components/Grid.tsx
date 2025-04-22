import { Grid as ChakraGrid } from "@chakra-ui/react";

export const Grid = ({ ...props }) => {
  return <ChakraGrid templateColumns="repeat(2, 1fr)" gap="6" {...props} />;
};
