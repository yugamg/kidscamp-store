import React from 'react';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import NavBar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
import ProductCorousel from '@/components/ProductCorousel/ProductCorousel';
import { getProductImages } from '@/utils/productUtils';
import { getProductById } from '@/services/productService';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  const parentMetadata = await parent;

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  const firstImageUrl =
    product.imgUrl && product.imgUrl.length > 0
      ? product.imgUrl[0]
      : '/assets/images/logo.png';

  const lowestPrice = Math.min(
    ...Object.values(product.prices).flatMap((colorPrices) =>
      Object.values(colorPrices),
    ),
  );

  const baseMetadata: Metadata = {
    title: `${product.name} - KidsCamp Store`,
    description: `${product.short_description} Starting at $${lowestPrice}. ${product.materials_used}. Made in ${product.made_in}.`,
    alternates: {
      canonical: `/product/${id}`,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      title: product.name,
      description: product.short_description,
      url: `/product/${id}`,
      images: [
        {
          url: firstImageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.short_description,
      images: [firstImageUrl],
    },
  };

  return baseMetadata;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <>
        <Header />
        <NavBar />
        <div className={styles.productPage}>
          <div className={styles.error}>
            <h2>Product not found</h2>
            <Link href="/products" className={styles.backLink}>
              ← Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const productImages = getProductImages(product);

  return (
    <>
      <Header />
      <NavBar />
      <div className={styles.productPage}>
        <div className={styles.breadcrumb}>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>›</span>
          <span>{product.name}</span>
        </div>

        <div className={styles.productContent}>
          <ProductCorousel images={productImages} alt={product.name} />
          <ProductDetails product={product} />
        </div>
      </div>
      <Footer />
    </>
  );
}
