import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  page: number;
  pages: number;
  onPageChange: (pageNumber: number) => void;
};

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
  const pagesNumber = [];
  for (let i = 0; i < pages; i++) {
    pagesNumber.push(i + 1);
  }
  return (
    <Pagination>
      <PaginationContent>
        {page !== pagesNumber[0] && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}

        {pagesNumber.map((pageNumber) => (
          <PaginationItem>
            <PaginationLink
              isActive={pageNumber === page}
              href="#"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page < pagesNumber.length && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onPageChange(page + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSelector;
