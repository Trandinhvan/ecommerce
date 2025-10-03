import { getCategories, getProducts } from '@/services/catalogService'
import { Product } from '@/types/Product'
import { Category } from '@/types/Category'
import CatalogClient from '../CatalogClient'

// Next.js 15 -> params là Promise<{ slug: string }>
type Params = Promise<{ slug: string }>

export default async function CatalogByCategory(props: { params: Params }) {
  const params = await props.params
  const { slug } = params

  const products: Product[] = await getProducts()
  const categories: Category[] = await getCategories()

  const targetCategory = categories.find((cat) => cat.name === slug)
  const categoryId = targetCategory?.id

  const filtered = categoryId
    ? products.filter(
        (p) =>
          p.categoryId &&
          p.categoryId.toLowerCase() === categoryId.toLowerCase(),
      )
    : products

  return <CatalogClient products={filtered} />
}

// ✅ generateStaticParams vẫn return object thường, không cần Promise
export async function generateStaticParams() {
  const categories: Category[] = await getCategories()
  return categories.map((cat) => ({
    slug: cat.name,
  }))
}
