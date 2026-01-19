
import prisma from "@/lib/prisma";
import { deleteProduct } from "@/lib/actions/products";

interface Props {
  userId: string;
  q: string;
  page: number;
  pageSize: number;
}

export default async function InventoryTable({
  userId,
  q,
  page,
  pageSize,
}: Props) {
  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const items = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  if (items.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-gray-500">
        No products match your search.
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead className="bg-gray-50 sticky top-0 z-10">
        <tr>
          {["Name", "Sku", "Price", "Quantity", "Low Stock At", "Actions"].map(
            (h) => (
              <th
                key={h}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                {h}
              </th>
            )
          )}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {items.map((product) => (
          <tr key={product.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-500">{product.name}</td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {product.sku || "-"}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {Number(product.price).toFixed(2)}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {product.quantity}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {product.lowStockAt || "-"}
            </td>
            <td className="px-6 py-4 text-sm">
              <form
                action={async (formData: FormData) => {
                  "use server";
                  await deleteProduct(formData);
                }}
              >
                <input type="hidden" name="id" value={product.id} />
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
