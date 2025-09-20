import { getCategories, getProducts } from '@/services/catalogService';
import { Product } from '@/types/Product';
import CatalogClient from '../CatalogClient';
import { Category } from '@/types/Category';
import { get } from 'http';

interface Props {
  params: { slug: string };
}

export default async function CatalogByCategory({ params }: Props) {
  const products: Product[] = await getProducts();

  const category: Category[] = await getCategories();
  const categoryMap: Record<string, string> = {};
  category.forEach((cat) => {
    categoryMap[cat.name] = cat.id;
  });
  // Map slug -> categoryId (hardcode tạm)
  // const categoryMap: Record<string, string> = {
  //   "dien-thoai": "1",
  //   "laptop": "550E8400-E29B-41D4-A716-446625640000",
  //   "tablet": "3",
  //   "dong-ho": "4",
  //   "phu-kien": "5",
  //   "pc-gaming": "6",
  //   "may-cu": "7",
  //   "sim-the": "8",
  // };

  const categoryId = categoryMap[params.slug];

  const filtered = categoryId
  ? products.filter((p) => p.categoryId.toLowerCase() === categoryId.toLowerCase())
  : products;


  return <CatalogClient products={filtered} />;
}
