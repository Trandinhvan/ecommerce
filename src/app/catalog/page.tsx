import { getProducts } from '@/services/catalogService';
import { Product } from '@/types/Product';
import { Cat } from 'lucide-react';
import React from 'react'
import CatalogClient from './CatalogClient';

export default async function Catalog() {
    // SSR: fetch data mới mỗi request
    const products: Product[] = await getProducts();

    // Truyền dữ liệu từ server -> client component
    return <CatalogClient products={products} />;
}

