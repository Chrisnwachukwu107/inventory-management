
"use client";

import { FormEvent, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";


export default function SearchForm() {
  const pathname = usePathname();
  const params = useSearchParams();

  // Remove blur once navigation/search completes
  useEffect(() => {
    document.body.classList.remove("page-loading-blur");
  }, [pathname, params]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    document.body.classList.add("page-loading-blur");
  };

  return (
    <form
      className="grid sm:flex gap-2 items-center"
      action="/inventory"
      method="GET"
      onSubmit={handleSubmit}
    >
      <input
        name="q"
        placeholder="Search products..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
      />
      <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
        Search
      </button>
    </form>
  );
}
