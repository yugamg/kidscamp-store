'use client';
import React from 'react';
import styles from './QuantitySelector.module.scss';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
}) => {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.btn}
        aria-label="Decrease"
        onClick={decrement}
        disabled={value <= min}
      >
        −
      </button>
      <div className={styles.value}>{value}</div>
      <button
        className={styles.btn}
        aria-label="Increase"
        onClick={increment}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
