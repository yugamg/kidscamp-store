'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header/Header';
import NavBar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from '../page.module.scss';
import { useProducts } from '@/hooks/useProducts';
import {
  filterProductsByQuery,
  getSearchResultText,
} from '@/app/(pages)/products/[searchText]/search.utils';

export default function ProductSearchResultsPage({
  params,
}: {
  params: Promise<{ searchText: string }>;
}) {
  const [query, setQuery] = useState<string>('');
  const { products, loading, error } = useProducts();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { searchText } = await params;
        if (isMounted) {
          setQuery(decodeURIComponent(searchText || '').trim());
        }
      } catch {
        if (isMounted) setQuery('');
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [params]);

  const filteredProducts = useMemo(() => {
    return filterProductsByQuery(products, query);
  }, [products, query]);

  if (loading) {
    return (
      <>
        <Header />
        <NavBar />
        <div className={styles.container}>
          <div className={styles.loading}>Loading products...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <NavBar />
        <div className={styles.container}>
          <div className={styles.loading}>{error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <NavBar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Search results for: {query}</h1>
          <p className={styles.subtitle}>
            {getSearchResultText(filteredProducts.length, query)}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className={styles.loading}>{getSearchResultText(0, query)}</div>
        ) : (
          <div className={styles.productGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} rating={4} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
