import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage(): void;
  prevPage(): void;
}

const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}: PaginationProps) => {
  if (totalPages < 2) {
    return null;
  }

  return (
    <div className="relative h-10 w-full md:container mb-10">
      {currentPage > 1 && (
        <button
          className="absolute top-0 left-0 p-2 border-b-2 border-primary hover:border-secondary"
          type="button"
          onClick={() => prevPage()}
        >
          Previous
        </button>
      )}
      {currentPage < totalPages && (
        <button
          className="absolute top-0 right-0 p-2 border-b-2 border-primary hover:border-secondary"
          type="button"
          onClick={() => nextPage()}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
