import { Product, ProductsApiResponse } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * API service for handling product-related requests
 */
export class ProductsApiService {
  /**
   * Fetch all products from the API
   */
  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductsApiResponse = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  static async getProductById(id: string): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const product: Product = await response.json();
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  /**
   * Fetch products by category
   */
  static async getProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?category=${categoryId}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductsApiResponse = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Failed to fetch products by category');
    }
  }

  /**
   * Search products by name or description
   */
  static async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductsApiResponse = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }
  }

  /**
   * Fetch products with filters
   */
  static async getProductsWithFilters(filters: {
    category?: string;
    tag?: string;
    minPrice?: number;
    maxPrice?: number;
    sizes?: string[];
    colors?: string[];
  }): Promise<Product[]> {
    try {
      const searchParams = new URLSearchParams();

      if (filters.category) searchParams.append('category', filters.category);
      if (filters.tag) searchParams.append('tag', filters.tag);
      if (filters.minPrice)
        searchParams.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice)
        searchParams.append('maxPrice', filters.maxPrice.toString());
      if (filters.sizes)
        filters.sizes.forEach((size) => searchParams.append('size', size));
      if (filters.colors)
        filters.colors.forEach((color) => searchParams.append('color', color));

      const response = await fetch(
        `${API_BASE_URL}/products?${searchParams.toString()}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductsApiResponse = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      throw new Error('Failed to fetch filtered products');
    }
  }
}

/**
 * Hook-like functions for use in React components
 */
export const api = {
  products: ProductsApiService,
};

// Example usage in components:
//
// For PLP:
// const products = await api.products.getAllProducts();
//
// For PDP:
// const product = await api.products.getProductById(id);
//
// For filtered results:
// const filteredProducts = await api.products.getProductsWithFilters({
//   category: 'everyday-luxe',
//   tag: 'popular'
// });
