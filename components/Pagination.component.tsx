import React, { useEffect } from "react";
import { Icon, Box } from "@chakra-ui/react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { usePagination } from "@/hooks/usePagination.hook";
interface PaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage?: number;
  setCurrentPage?: (pageNumber: number) => void;
}

type PaginationArrayItem = number | -1;
type PaginationArray = PaginationArrayItem[];

export const Pagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage = 1,
  setCurrentPage,
}: PaginationProps) => {
  const { paginationArray, startItem, endItem } = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  const handlePageChange = (page: number) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <Box className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg cursor-pointer">
      <Box className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <Box>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{" "}
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{totalCount}</span> results
          </p>
        </Box>
        <Box>
          <Box
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Box
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                handlePageChange(currentPage - 1);
              }}
            >
              <span className="sr-only">Previous</span>
              <Icon as={MdArrowLeft} w={5} h={5}></Icon>
            </Box>
            {paginationArray.map((page: number, index: number) => (
              <Box
                key={index}
                aria-current={currentPage === page ? "page" : undefined}
                className={`relative z-10 inline-flex items-center ${
                  currentPage === page ? "bg-indigo-600" : "bg-white"
                } px-4 py-2 text-sm font-semibold text-${
                  currentPage === page ? "white" : "gray-900"
                } ring-1 ring-inset ring-gray-300 ${
                  currentPage !== page
                    ? "hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                    : ""
                } ${page < 0 ? "cursor-default" : "cursor-pointer"}`}
                onClick={() => {
                  if (page > 0) {
                    handlePageChange(page);
                  }
                }}
              >
                {page === -1 ? "..." : page}
              </Box>
            ))}
            <Box
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                currentPage === paginationArray[paginationArray.length - 1]
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => {
                handlePageChange(currentPage + 1);
              }}
            >
              <span className="sr-only">Next</span>
              <Icon as={MdArrowRight} w={5} h={5}></Icon>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
