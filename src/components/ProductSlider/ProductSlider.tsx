'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import styles from './ProductSlider.module.scss';

export interface ProductItem {
  id: string;
  imageUrl: string;
  brand: string;
  name: string;
  price: number;
}

interface ProductSliderProps {
  title: string;
  products: ProductItem[];
  className?: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  title,
  products,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Hydration-safe window width detection
  const getMaxVisible = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 1024) return 3;
      return 5;
    }
    return 5;
  };

  const [maxVisible, setMaxVisible] = useState(() => {
    // Use a default value that matches server-side rendering
    return 5;
  });

  // Set client flag after hydration
  React.useEffect(() => {
    setIsClient(true);
    setMaxVisible(getMaxVisible());

    const handleResize = () => {
      setMaxVisible(getMaxVisible());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - maxVisible);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - go to next
        goToNext();
      } else {
        // Swipe right - go to previous
        goToPrevious();
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  if (!products || products.length === 0) {
    return <div className={styles.empty}>No products available</div>;
  }

  return (
    <section className={`${styles.productSlider} ${className}`}>
      <div className={styles.header}>
        <button
          className={styles.navButton}
          onClick={goToPrevious}
          aria-label="Previous products"
        >
          ‹
        </button>
        <h2 className={styles.title}>{title}</h2>
        <button
          className={styles.navButton}
          onClick={goToNext}
          aria-label="Next products"
        >
          ›
        </button>
      </div>

      <div className={styles.sliderContainer}>
        {isClient ? (
          <div
            ref={sliderRef}
            className={styles.slider}
            style={{
              transform: `translateX(-${currentIndex * (100 / maxVisible)}%)`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className={styles.productCard}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.brand}>{product.brand}</p>
                  <p className={styles.name}>{product.name}</p>
                  <p className={styles.price}>£{product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Server-side fallback - show products in a grid layout
          <div className={styles.slider}>
            {products.slice(0, 5).map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className={styles.productCard}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.brand}>{product.brand}</p>
                  <p className={styles.name}>{product.name}</p>
                  <p className={styles.price}>£{product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSlider;
