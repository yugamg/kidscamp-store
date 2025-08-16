'use client';
import React, { useState } from 'react';
import styles from './ProductDetails.module.scss';
import ProductDescription from '../ProductDescription/ProductDescription';
import { Product } from '@/types/product';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import { useCartStore } from '@/services/cartStore';
import { getSpecificPrice, formatCategoryName } from '@/utils/productUtils';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.color_variants[0] || '',
  );
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const addToCart = useCartStore((s) => s.addItem);

  const categoryName = formatCategoryName(product.category_id);
  const currentPricing =
    selectedColor && selectedSize
      ? getSpecificPrice(product, selectedColor, selectedSize)
      : { price: 0, hasDiscount: false };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedSize('');
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const isAddToCartEnabled = selectedColor && selectedSize;

  const onAddToCart = () => {
    if (!isAddToCartEnabled) return;
    const { price } = getSpecificPrice(product, selectedColor, selectedSize);
    addToCart({
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      name: product.name,
      imageUrl: (product.imgUrl && product.imgUrl[0]) || undefined,
      unitPrice: price,
      quantity,
    });
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.category}>{categoryName}</div>
      <h1 className={styles.productName}>{product.name}</h1>
      <p className={styles.shortDescription}>{product.short_description}</p>

      <div className={styles.priceSection}>
        {selectedColor && selectedSize ? (
          <div className={styles.priceContainer}>
            <span className={styles.price}>${currentPricing.price}</span>
            {currentPricing.hasDiscount && currentPricing.originalPrice && (
              <span className={styles.originalPrice}>
                ${currentPricing.originalPrice}
              </span>
            )}
          </div>
        ) : (
          <div className={styles.priceHint}>
            Select color and size to see price
          </div>
        )}
      </div>

      <div className={styles.colorSelector}>
        <label>Color</label>
        <div className={styles.colorOptions}>
          {product.color_variants.map((color) => (
            <button
              key={color}
              className={`${styles.colorButton} ${selectedColor === color ? styles.selected : ''}`}
              onClick={() => handleColorChange(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sizeSelector}>
        <label>Size</label>
        <div className={styles.sizeOptions}>
          {product.size_variants.map((size) => (
            <button
              key={size}
              className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`}
              onClick={() => handleSizeChange(size)}
              disabled={
                !!selectedColor && !product.prices[selectedColor]?.[size]
              }
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.productInfo}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Made in:</span>
          <span className={styles.value}>{product.made_in}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Materials:</span>
          <span className={styles.value}>{product.materials_used}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Tag:</span>
          <span className={`${styles.tag} ${styles[product.tag]}`}>
            {product.tag}
          </span>
        </div>
      </div>

      <div className={styles.addToCartRow}>
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <button
          className={`${styles.addToCartButton} ${!isAddToCartEnabled ? styles.disabled : ''}`}
          disabled={!isAddToCartEnabled}
          onClick={onAddToCart}
        >
          {isAddToCartEnabled ? 'Add to Cart' : 'Select Color & Size'}
        </button>
      </div>

      <ProductDescription description={product.long_description} />
    </div>
  );
};

export default ProductDetails;
