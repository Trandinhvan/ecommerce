"use client";

import HeroSlider from "@/components/HeroSlider";
import NotificationList from "@/components/NotificationList";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/catalogService";
import { Product } from "@/types/Product";
import { Fragment, useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res))
      .catch((err) => console.error("Lỗi load products:", err));
  }, []);

  return (
    <Fragment>
      <NotificationList />
      <HeroSlider />
      <div className="container mx-auto p-4 grid grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Fragment>
  );
}
