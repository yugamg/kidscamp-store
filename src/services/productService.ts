import { Product } from '@/types/product';

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/product/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const product = await res.json();

    const cleanProduct: Product = {
      ...product,
      prices: Object.fromEntries(
        Object.entries(product.prices).filter(
          ([, colorPrices]) => colorPrices !== undefined,
        ),
      ) as Record<string, Record<string, number>>,
      discounted_prices: product.discounted_prices
        ? (Object.fromEntries(
            Object.entries(product.discounted_prices).filter(
              ([, colorPrices]) => colorPrices !== undefined,
            ),
          ) as Record<string, Record<string, number>>)
        : undefined,
    };

    return cleanProduct;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
