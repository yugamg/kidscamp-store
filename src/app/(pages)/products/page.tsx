'use client';
import React from 'react';
import Header from '@/components/Header/Header';
import NavBar from '@/components/Navbar/Navbar';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './page.module.scss';
import { useProducts } from '@/hooks/useProducts';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/Footer/Footer'), {
  loading: () => <div>Loading Footer...</div>,
});

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <NavBar />
    <div className={styles.container}>{children}</div>
    <Footer />
  </>
);

export default function ProductListingPage() {
  const { products, loading, error } = useProducts();

  let content;

  if (loading) {
    content = <div className={styles.loading}>Loading products...</div>;
  } else if (error) {
    content = (
      <div className={styles.loading}>
        Error loading products: {error.message}
      </div>
    );
  } else {
    content = (
      <>
        <div className={styles.header}>
          <h1 className={styles.title}>Kids Clothing</h1>
          <p className={styles.subtitle}>
            Discover our complete collection of kids&apos; fashion
          </p>
        </div>

        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} rating={4} />
          ))}
        </div>
      </>
    );
  }

  return <Layout>{content}</Layout>;
}
