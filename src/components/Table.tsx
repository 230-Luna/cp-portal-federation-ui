import { Table as ChakraTable } from "@chakra-ui/react";

export const Table = {
  Root: (props: React.ComponentProps<typeof ChakraTable.Root>) => (
    <ChakraTable.Root
      size="sm"
      mb="17px"
      pb="17px"
      borderTop="2px solid #333333"
      backgroundColor="#fff"
      {...props}
    />
  ),
  Header: ChakraTable.Header,
  Row: ChakraTable.Row,
  ColumnHeader: (
    props: React.ComponentProps<typeof ChakraTable.ColumnHeader>
  ) => (
    <ChakraTable.ColumnHeader
      textAlign="center"
      color="#47494d"
      backgroundColor="#f7f7f7"
      padding="12px 11px 10px 11px"
      borderBottom="1px solid #ebebeb"
      borderLeft="1px solid #ebebeb"
      fontFamily='"Apple SD Gothic Neo", "Noto Sans KR", "맑은 고딕", "Font Awesome 5 Free"'
      fontWeight="500"
      {...props}
    />
  ),
  Body: ChakraTable.Body,
  Cell: (props: React.ComponentProps<typeof ChakraTable.Cell>) => (
    <ChakraTable.Cell
      textAlign="center"
      border="1px solid #ebebeb"
      borderLeft="0"
      padding="18px 11px 16px 11px"
      color="#818894"
      fontSize="15px"
      whiteSpace="normal"
      letterSpacing="-0.2px"
      {...props}
    />
  ),
};
