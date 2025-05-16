import {
  ButtonGroup,
  IconButton,
  Pagination as ChakraPagination,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function Pagination({
  totalItemCount,
  currentPage,
  onPageChange,
  pageSize = 10,
}: {
  totalItemCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
}) {
  const pageCount = Math.ceil(totalItemCount / pageSize);

  return (
    <ChakraPagination.Root
      count={pageCount} // 전체 아이템 수
      pageSize={10} // 한페이지당 아이템 수
      page={currentPage}
      defaultPage={1}
      onPageChange={(e) => onPageChange(e.page)}
      textAlign="center"
      paddingTop="50px"
    >
      <ButtonGroup variant="ghost" size="lg">
        <ChakraPagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </ChakraPagination.PrevTrigger>

        <ChakraPagination.Items
          render={(page) => {
            const { type, ...buttonProps } = page;
            return (
              <IconButton
                key={page.value}
                {...buttonProps}
                aria-label={`Page ${page.value}`}
                variant={{ base: "ghost", _selected: "outline" }}
              >
                {page.value}
              </IconButton>
            );
          }}
        />

        <ChakraPagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </ChakraPagination.NextTrigger>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
}
