'use client';

import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.scss';
import SvgIcon from '../SvgIcon/SvgIcon';

export interface CarouselItem {
  id: string;
  imageUrl: string;
  title?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  showArrows = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !isClient) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length, isClient]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  if (!items || items.length === 0) {
    return (
      <div className={styles['carousel-empty']}>No carousel items provided</div>
    );
  }

  return (
    <div className={`${styles.carousel} ${className}`}>
      <div className={styles['carousel-container']}>
        <div
          className={styles['carousel-slides']}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={item.id} className={styles['carousel-slide']}>
              <div className={styles['carousel-image-container']}>
                <img
                  src={item.imageUrl}
                  alt={item.title || `Slide ${index + 1}`}
                  className={styles['carousel-image']}
                />
                <div className={styles['carousel-overlay']}>
                  {item.title && (
                    <div className={styles['carousel-title']}>{item.title}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showArrows && items.length > 1 && (
          <>
            <button
              className={`${styles['carousel-arrow']} ${styles['carousel-arrow-left']}`}
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              <SvgIcon name="carouselLeftArrow" width="24" height="24" />
            </button>
            <button
              className={`${styles['carousel-arrow']} ${styles['carousel-arrow-right']}`}
              onClick={goToNext}
              aria-label="Next slide"
            >
              <SvgIcon name="carouselRightArrow" width="24" height="24" />
            </button>
          </>
        )}

        {showIndicators && items.length > 1 && (
          <div className={styles['carousel-indicators']}>
            {items.map((_, index) => (
              <button
                key={index}
                className={`${styles['carousel-indicator']} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
