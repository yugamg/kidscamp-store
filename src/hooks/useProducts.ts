import useSWR from 'swr';
import { Product } from '@/types/product';

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data.products;
};

export const useProducts = () => {
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR<Product[]>('/api/products', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // 1 minute
  });

  return {
    products: products || [],
    loading: isLoading,
    error,
    mutate,
  };
};
