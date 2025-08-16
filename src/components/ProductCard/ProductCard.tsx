'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.scss';
import { Product } from '@/types/product';
import {
  getProductPriceInfo,
  formatCategoryName,
  isNewProduct,
} from '@/utils/productUtils';
import demoImage from '@/assets/images/demoImage.jpg';

interface ProductCardProps {
  product: Product;
  rating?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, rating = 0 }) => {
  const priceInfo = getProductPriceInfo(product);
  const categoryName = formatCategoryName(product.category_id);
  const isNew = isNewProduct(product);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${styles.star} ${i <= rating ? styles.filled : ''}`}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  return (
    <Link href={`/product/${product.id}`} className={styles.productCard} data-testid="product-link">
      <div className={styles.imageContainer}>
        <Image
          src={product.imgUrl.length > 0 ? product.imgUrl[0] : demoImage}
          alt={''}
          width={300}
          height={300}
          className={styles.productImage}
        />
        {isNew && <div className={styles.newBadge} data-testid="product-badge-new">NEW</div>}
        {priceInfo.hasDiscount && (
          <div className={styles.discountBadge}>SALE</div>
        )}
      </div>

      <div className={styles.productInfo}>
        <div className={styles.brand}>{categoryName}</div>
        <h3 className={styles.productName} data-testid="product-name">{product.name}</h3>
        <p className={styles.shortDescription} data-testid="product-short-description">{product.short_description}</p>

        <div className={styles.rating}>{renderStars(rating)}</div>

        <div className={styles.priceContainer}>
          <span className={styles.price} data-testid="product-price">
            ${priceInfo.lowestPrice.toFixed(2)}
          </span>
          {priceInfo.originalPrice && (
            <span className={styles.originalPrice}>
              ${priceInfo.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className={styles.productTags}>
          <span className={`${styles.tag} ${styles[product.tag]}`}>
            {product.tag}
          </span>
          <span className={styles.madeIn}>Made in {product.made_in}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
