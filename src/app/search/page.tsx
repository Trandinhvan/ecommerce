'use client';

import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/services/searchService";
import { Product } from "@/types/Product";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim() !== "") {
      (async () => {
        try {
          const res = await searchProducts(query);
          setResults(res);
        } catch (err) {
          console.error("❌ Lỗi search:", err);
        }
      })();
    }
  }, [query]);

  return (
    <div className="container mx-auto p-4 grid grid-cols-4 gap-4">
      {results.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Đang tải kết quả...</div>}>
      <SearchContent />
    </Suspense>
  );
}
