import { Product } from '@/types/product';

export function filterProductsByQuery(
  products: Product[],
  query: string,
): Product[] {
  if (!query) return [];

  const lower = query.toLowerCase();

  return products.filter((product) => {
    const textMatch = [
      product.name,
      product.short_description,
      product.long_description,
      product.category_id,
      product.tag,
    ]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(lower));

    const colorMatch = (product.color_variants || []).some((c: string) =>
      c.toLowerCase().includes(lower),
    );

    const sizeMatch = (product.size_variants || []).some((s: string) =>
      s.toLowerCase().includes(lower),
    );

    return textMatch || colorMatch || sizeMatch;
  });
}

export function getSearchResultText(count: number, _query: string): string {
  if (count === 0) {
    return 'No products match your search.';
  }

  return `${count} result${count === 1 ? '' : 's'} found`;
}
