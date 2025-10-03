import { getProducts } from '@/services/catalogService';
import { Product } from '@/types/Product';
import CatalogClient from './CatalogClient';
import type PageProps from "next";

export default async function CatalogPage({
  params,
  searchParams,
}: PageProps<"/catalog/[slug]">) {
  const { slug } = await params;

  const products: Product[] = await getProducts();

  return <CatalogClient products={products} />;
}
