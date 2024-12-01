import { useApi } from "./useApi"

    
export interface Product {
  id: number,
  title: string,
  price: number,
  description: string,
  image: string,
  category: string
}

export const useProducts = () => {
  const { data, error, isLoading } = useApi<Product[]>('products', ['products'])

  return { products: data, error, isLoading }
}

export const useProductDetails = (id: string) => {
  const { data, error, isLoading } = useApi<Product>('products/' + id, ['products/', id])

  return { productDetail: data, error, isLoading}
}