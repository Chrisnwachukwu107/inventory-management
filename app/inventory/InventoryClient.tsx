"use client";

import { Suspense } from "react";
import Pagination from "../components/pagination";
import InventoryTable from "./InventoryTable";
import InventoryTableSkeleton from "./InventoryTableSkeleton";

interface Props {
  userId: string;
  q: string;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function InventoryClient({
  userId,
  q,
  page,
  pageSize,
  totalPages,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-lg border p-6">
        <form method="GET" action="/inventory" className="flex gap-2">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg">
            Search
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border max-h-[60vh] overflow-y-auto">
        <Suspense
          key={`${q}-${page}`}
          fallback={<InventoryTableSkeleton />}
        >
          <InventoryTable
            userId={userId}
            q={q}
            page={page}
            pageSize={pageSize}
          />
        </Suspense>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg border p-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/inventory"
            searchParams={{ q }}
          />
        </div>
      )}
    </div>
  );
}
