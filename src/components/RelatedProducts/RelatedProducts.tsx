'use client';
import React from 'react';
import Link from 'next/link';
import styles from './RelatedProducts.module.scss';

interface RelatedProduct {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  currentPrice: number;
  originalPrice?: number;
  discount?: string;
}

interface RelatedProductsProps {
  className?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  className = '',
}) => {
  const relatedProducts: RelatedProduct[] = [
    {
      id: 'denim-overalls',
      name: 'Denim Overalls',
      imageUrl:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
      rating: 4.0,
      currentPrice: 50,
      originalPrice: 55,
      discount: '-9%',
    },
    {
      id: 'linen-summer-shirt',
      name: 'Linen Summer Shirt',
      imageUrl:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop',
      rating: 4.5,
      currentPrice: 40,
    },
    {
      id: 'knit-cardigan',
      name: 'Knit Cardigan',
      imageUrl:
        'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&h=400&fit=crop',
      rating: 4.5,
      currentPrice: 35,
    },
    {
      id: 'puffer-winter-jacket',
      name: 'Puffer Winter Jacket',
      imageUrl:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop',
      rating: 5.0,
      currentPrice: 80,
      originalPrice: 95,
      discount: '-16%',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={index < rating ? '#FFD700' : 'none'}
        stroke="#FFD700"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  return (
    <section className={`${styles.relatedSection} ${className}`}>
      <h2 className={styles.title}>You might also like</h2>

      <div className={styles.productsGrid}>
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className={styles.productCard}
          >
            <div className={styles.imageContainer}>
              {product.discount && (
                <div className={styles.discountTag}>{product.discount}</div>
              )}
              <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.productImage}
              />
            </div>

            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>

              <div className={styles.ratingContainer}>
                <div className={styles.stars}>
                  {renderStars(product.rating)}
                </div>
                <span className={styles.ratingText}>{product.rating}/5</span>
              </div>

              <div className={styles.priceContainer}>
                <span className={styles.currentPrice}>
                  ${product.currentPrice}
                </span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
