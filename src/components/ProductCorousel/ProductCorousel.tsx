'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ProductCorousel.module.scss';
import demoImage from '@/assets/images/demoImage.jpg';

interface ProductImageCarouselProps {
  images: string[];
  alt: string;
}

const ProductCorousel: React.FC<ProductImageCarouselProps> = ({
  images,
  alt,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleArrowClick = (direction: 'prev' | 'next') => {
    setSelectedImage((prev) => {
      if (direction === 'next') {
        return prev === images.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? images.length - 1 : prev - 1;
      }
    });
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.imageContainer}>
        <button
          className={`${styles.arrow} ${styles.prev}`}
          onClick={() => handleArrowClick('prev')}
          data-testid="arrow-prev"
        >
          ←
        </button>
        <div className={styles.mainImage}>
          <Image
            src={images[selectedImage] || demoImage}
            alt={alt}
            layout="responsive"
            width={500}
            height={500}
            data-testid="main-image"
          />
        </div>
        <button
          className={`${styles.arrow} ${styles.next}`}
          onClick={() => handleArrowClick('next')}
          data-testid="arrow-next"
        >
          →
        </button>
      </div>

      <div className={styles.thumbnails} data-testid="thumbnails">
        {images.map((src, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${selectedImage === index ? styles.selected : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              src={src}
              alt={alt}
              layout="intrinsic"
              width={60}
              height={60}
              data-testid="thumbnail-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCorousel;
