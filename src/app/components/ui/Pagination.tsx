"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronLeftDouble } from "./icons/MaterialSymbols";

interface PaginationProps {
  page: number;
  totalPages: number;
  query?: string;
  type?: "search" | "discover";
  genreId?: string;
}

export const Pagination = ({
  page,
  totalPages,
  query,
  type,
  genreId,
}: PaginationProps) => {
  const router = useRouter();

  const getPageButtonClass = (i: number) => {
    const baseClass =
      "w-11 h-11 flex items-center justify-center rounded-full text-md border-2 transition-colors duration-200 cursor-pointer font-lobster";
    const activeClass =
      "sm:bg-accent-bg text-accent-bg sm:text-base-bg font-bold border-accent-bg";
    const inactiveClass =
      "bg-base-bg text-accent-bg border-accent-bg hover:bg-accent-bg hover:text-base-bg hover:border-accent-bg hidden sm:block";

    return `${baseClass} ${i === page ? activeClass : inactiveClass}`;
  };
  const iconButtonClass =
    "p-2 text-sm  text-accent-bg disabled:opacity-50 cursor-pointer";

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      if (type === "search") {
        router.push(`/search?query=${query}&page=${newPage}`);
      }
      if (type === "discover") {
        router.push(`/movie/genre/${genreId}?page=${newPage}`);
      }
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={getPageButtonClass(1)}
        >
          1
        </button>
      );

      if (startPage > 2) {
        pages.push(
          <span
            key="start-ellipsis"
            className="px-2 text-accent-bg hidden sm:inline"
          >
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={getPageButtonClass(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span
            key="end-ellipsis"
            className="px-2 text-accent-bg hidden sm:inline"
          >
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={getPageButtonClass(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="my-8 w-full">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className={iconButtonClass}
        >
          <ChevronLeftDouble
            width={20}
            height={20}
            fill={"var(--color-accent-bg)"}
          />
        </button>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className={iconButtonClass}
        >
          <ChevronLeft width={20} height={20} fill={"var(--color-accent-bg)"} />
        </button>
        <div className="flex items-center gap-3">{renderPageNumbers()}</div>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className={iconButtonClass}
        >
          <ChevronLeft
            width={20}
            height={20}
            fill={"var(--color-accent-bg)"}
            className="rotate-180"
          />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          className={iconButtonClass}
        >
          <ChevronLeftDouble
            width={20}
            height={20}
            fill={"var(--color-accent-bg)"}
            className="rotate-180"
          />
        </button>
      </div>
    </div>
  );
};
