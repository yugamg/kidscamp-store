import { Product, ProductPriceInfo } from '@/types/product';


export function getProductPriceInfo(product: Product): ProductPriceInfo {
  let lowestPrice = Infinity;
  let originalPrice: number | undefined;
  let hasDiscount = false;

  // Check regular prices
  Object.values(product.prices).forEach((sizePrice) => {
    Object.values(sizePrice).forEach((price) => {
      if (price < lowestPrice) {
        lowestPrice = price;
      }
    });
  });

  // Check if there are any discounted prices
  if (product.discounted_prices) {
    let lowestDiscountedPrice = Infinity;

    Object.values(product.discounted_prices).forEach((sizePrice) => {
      Object.values(sizePrice).forEach((price) => {
        if (price < lowestDiscountedPrice) {
          lowestDiscountedPrice = price;
        }
      });
    });

    if (lowestDiscountedPrice < Infinity) {
      originalPrice = lowestPrice;
      lowestPrice = lowestDiscountedPrice;
      hasDiscount = true;
    }
  }

  return {
    lowestPrice: lowestPrice === Infinity ? 0 : lowestPrice,
    originalPrice,
    hasDiscount,
  };
}

/**
 * Get price for specific color and size combination
 */
export function getSpecificPrice(
  product: Product,
  color: string,
  size: string,
): { price: number; originalPrice?: number; hasDiscount: boolean } {
  const regularPrice = product.prices[color]?.[size];
  const discountedPrice = product.discounted_prices?.[color]?.[size];

  if (discountedPrice !== undefined && regularPrice !== undefined) {
    return {
      price: discountedPrice,
      originalPrice: regularPrice,
      hasDiscount: true,
    };
  }

  return {
    price: regularPrice || 0,
    hasDiscount: false,
  };
}

/**
 * Generate a placeholder image URL or use midjourney prompt for future image generation
 */
export function getProductImageUrl(
  product: Product,
  index: number = 0,
): string {
  const placeholderImages = [
    'https://images.unsplash.com/photo-1503944168849-6c1ead3ad683?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1596140915636-1503cdc9b95a?w=300&h=300&fit=crop',
  ];

  const imageIndex = (product.id.length + index) % placeholderImages.length;
  return placeholderImages[imageIndex];
}

/**
 * Get multiple product images for carousel
 */
export function getProductImages(
  product: Product,
): string[] {
  return product.imgUrl || [];
}

/**
 * Format category ID to display name
 */
export function formatCategoryName(categoryId: string): string {
  return categoryId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Check if product is new based on tag
 */
export function isNewProduct(product: Product): boolean {
  return product.tag === 'popular' || product.tag === 'essential';
}

/**
 * Get all available sizes for a product across all colors
 */
export function getAllAvailableSizes(product: Product): string[] {
  return product.size_variants;
}

/**
 * Get available sizes for a specific color
 */
export function getAvailableSizesForColor(
  product: Product,
  color: string,
): string[] {
  const colorPrices = product.prices[color];
  if (!colorPrices) return [];

  return Object.keys(colorPrices);
}

/**
 * Check if a specific color/size combination is available
 */
export function isVariantAvailable(
  product: Product,
  color: string,
  size: string,
): boolean {
  return product.prices[color]?.[size] !== undefined;
}

/**
 * Sanitizes a product ID for use in URLs
 * Converts spaces and special characters to URL-safe format
 */
export function sanitizeProductIdForUrl(id: string): string {
  return encodeURIComponent(id);
}

/**
 * Desanitizes a product ID from URL format
 * Converts URL-encoded characters back to their original form
 */
export function desanitizeProductIdFromUrl(encodedId: string): string {
  return decodeURIComponent(encodedId);
}

/**
 * Creates a URL-safe product ID from a product name
 * This is useful for creating SEO-friendly URLs
 */
export function createUrlSafeId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}
