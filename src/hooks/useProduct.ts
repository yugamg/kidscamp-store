import useSWR from 'swr';
import { Product } from '@/types/product';

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Product not found');
  }

  const productData = await res.json();

  const cleanProduct: Product = {
    ...productData,
    prices: Object.fromEntries(
      Object.entries(productData.prices).filter(
        ([, colorPrices]) => colorPrices !== undefined,
      ),
    ) as Record<string, Record<string, number>>,
    discounted_prices: productData.discounted_prices
      ? (Object.fromEntries(
          Object.entries(productData.discounted_prices).filter(
            ([, colorPrices]) => colorPrices !== undefined,
          ),
        ) as Record<string, Record<string, number>>)
      : undefined,
  };

  return cleanProduct;
};

export const useProduct = (id: string) => {
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(id ? `/api/product/${id}` : null, fetcher);

  return {
    product: product || null,
    loading: isLoading,
    error: error?.message || null,
  };
};
