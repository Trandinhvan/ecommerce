"use client"
import HeroSlider from "@/components/HeroSlider";
import NotificationList from "@/components/NotificationList";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/catalogService";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
      
      // useEffect(() => {
      //     getProducts().then(setProducts).catch(console.error);
      // },[])
  
      return (
        <Fragment>
          <NotificationList></NotificationList>
          <HeroSlider></HeroSlider>
          <div className="container mx-auto p-4 grid grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                imageUrl={p.imageUrl}
              />
            ))}
          </div>
        </Fragment>
      );
}
