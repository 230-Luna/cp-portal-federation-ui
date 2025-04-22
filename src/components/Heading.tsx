import { Heading as ChakraHeading } from "@chakra-ui/react";

export const Heading = ({ ...props }) => {
  return (
    <ChakraHeading
      w="100%"
      textAlign={"center"}
      fontWeight="300px"
      mb="2%"
      color="#47494d"
      mt="2%"
      {...props}
    />
  );
};
