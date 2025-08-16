'use client';

import React from 'react';
import Carousel, { CarouselItem } from './Carousel';

export interface CarouselWrapperProps {
  items?: CarouselItem[];
}

const CarouselWrapper: React.FC<CarouselWrapperProps> = ({ items }) => {
  return (
    <div style={{ padding: '2rem', maxWidth: '100vw', margin: '0 auto' }}>
      <Carousel
        items={items as CarouselItem[]}
        autoPlay={false}
        autoPlayInterval={4000}
        showIndicators={true}
        showArrows={true}
      />
    </div>
  );
};

export default CarouselWrapper;
