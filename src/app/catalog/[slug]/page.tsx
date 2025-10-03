import { getCategories, getProducts } from '@/services/catalogService';
import { Product } from '@/types/Product';
import { Category } from '@/types/Category';
import CatalogClient from '../CatalogClient';
import type PageProps from 'next';

export default async function CatalogByCategory({
  params,
  searchParams,
}: PageProps<"/catalog/[slug]">) {
  const { slug } = await params;

  const products: Product[] = await getProducts();
  const categories: Category[] = await getCategories();

  const targetCategory = categories.find((cat) => cat.name === slug);
  const categoryId = targetCategory?.id;

  const filtered = categoryId
    ? products.filter(
        (p) =>
          p.categoryId &&
          p.categoryId.toLowerCase() === categoryId.toLowerCase(),
      )
    : products;

  return <CatalogClient products={filtered} />;
}

export async function generateStaticParams() {
  const categories: Category[] = await getCategories();
  return categories.map((cat) => ({
    slug: cat.name,
  }));
}
