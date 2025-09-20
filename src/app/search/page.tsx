'use client'
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/services/searchService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        if (query) searchProducts(query as string).then(setResults);
    }, [query]);

    return (
      <div className="container mx-auto p-4 grid grid-cols-4 gap-4">
        {results.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            imageUrl={p.imageUrl}
          />
        ))}
      </div>
    );
}