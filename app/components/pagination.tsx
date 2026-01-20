"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pathname = usePathname();
  const params = useSearchParams();

  // REMOVE blur after navigation completes
  useEffect(() => {
    document.body.classList.remove("page-loading-blur");
  }, [pathname, params]);

  const showLoadingBlur = () => document.body.classList.add("page-loading-blur");

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams({ ...searchParams, page: String(page) });
    return `${baseUrl}?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex items-center justify-center gap-1">
      {currentPage <= 1 ? (
        <span className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-400 cursor-not-allowed bg-gray-100">
          <ChevronLeft /> Previous
        </span>
      ) : (
        <Link
          href={getPageUrl(currentPage - 1)}
          onClick={showLoadingBlur}
          className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"
        >
          <ChevronLeft /> Previous
        </Link>
      )}

      {visiblePages.map((page, key) => {
        if (page === "...") {
          return (
            <span key={key} className="px-3 py-2 text-sm text-gray-500">
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isCurrentPage = pageNumber === currentPage;

        return (
          <Link
            key={key}
            href={getPageUrl(pageNumber)}
            onClick={!isCurrentPage ? showLoadingBlur : undefined}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${
              isCurrentPage
                ? "bg-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}

      {currentPage >= totalPages ? (
        <span className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-400 cursor-not-allowed bg-gray-100">
          <ChevronRight /> Next
        </span>
      ) : (
        <Link
          href={getPageUrl(currentPage + 1)}
          onClick={showLoadingBlur}
          className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"
        >
          <ChevronRight /> Next
        </Link>
      )}
    </nav>
  );
}
