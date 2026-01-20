import { Suspense } from "react";
import InventoryTable from "./InventoryTable";
import InventoryTableSkeleton from "./InventoryTableSkeleton";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import Pagination from "../components/pagination";
import Link from "next/link";
import DashboardLayout from "../components/DashboardLayout";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const pageSize = 5;
  const page = Math.max(1, Number(params.page ?? 1));

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const totalProducts = await prisma.product.findMany({
    where,
  });

  const totalProductsCount = await prisma.product.count({
    where: { userId },
  });

  const [totalCount, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (totalProductsCount === 0) {
    return (
      <DashboardLayout currentPath="/inventory">
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No products added yet
          </h2>
          <p className="text-gray-500 mb-6">
            Start by adding your first product to your inventory.
          </p>
          <Link
            href="/add-product"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Add Product
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPath="/inventory">
    <div className="mb-8 ml-4 sm:ml-0">
      <div className="flex items-center justify-between ml-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Inventory
          </h1>
          <p className="text-sm text-gray-500">
            Manage your products and track inventory levels.
          </p>
        </div>
      </div>
    </div>
    <div className="space-y-4 sm:space-y-6">
      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <form className="grid sm:flex gap-2 items-center" action="/inventory" method="GET">
          <input
            name="q"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
          />
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Search
          </button>
        </form>
      </div>
      {/* Products Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="max-h-[60vh] overflow-y-auto">
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
      </div>

      {totalPages > 1 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/inventory"
            searchParams={{
              q,
              PageSize: String(pageSize),
            }}
          />
        </div>
      )}
    </div>
    </DashboardLayout>
  );
}
