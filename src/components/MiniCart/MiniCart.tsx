'use client';
import React from 'react';
import styles from './MiniCart.module.scss';
import Image from 'next/image';
import { CartItem, CartItemKey } from '@/types/product';

export interface MiniCartProps {
  isOpen: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onIncrement: (key: CartItemKey) => void;
  onDecrement: (key: CartItemKey) => void;
  onRemoveItem: (key: CartItemKey) => void;
}

const MiniCart: React.FC<MiniCartProps> = ({
  isOpen,
  items,
  subtotal,
  onClose,
  onIncrement,
  onDecrement,
  onRemoveItem,
}) => {
  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.show : ''}`}
      onClick={onClose}
    >
      <aside className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.title}>My Bag</div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>Your cart is empty</div>
          ) : (
            items.map((it) => (
              <div
                className={styles.item}
                key={`${it.productId}-${it.color}-${it.size}`}
              >
                {it.imageUrl && (
                  <Image
                    src={it.imageUrl}
                    alt={it.name}
                    width={72}
                    height={72}
                    className={styles.img}
                  />
                )}
                <div className={styles.meta}>
                  <div className={styles.name}>{it.name}</div>
                  <div className={styles.variant}>
                    {it.color} · {it.size}
                  </div>
                  <div className={styles.row}>
                    <div className={styles.qty}>
                      <button
                        onClick={() =>
                          onDecrement({
                            productId: it.productId,
                            color: it.color,
                            size: it.size,
                          })
                        }
                        className={styles.qtyBtn}
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <div className={styles.qtyVal}>{it.quantity}</div>
                      <button
                        onClick={() =>
                          onIncrement({
                            productId: it.productId,
                            color: it.color,
                            size: it.size,
                          })
                        }
                        className={styles.qtyBtn}
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                    <div className={styles.price}>
                      ${(it.unitPrice * it.quantity).toFixed(2)}
                    </div>
                    <button
                      className={styles.remove}
                      onClick={() =>
                        onRemoveItem({
                          productId: it.productId,
                          color: it.color,
                          size: it.size,
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button className={styles.secondary} onClick={onClose}>
            Continue shopping
          </button>
          <button className={styles.primary}>Go to checkout →</button>
        </div>
      </aside>
    </div>
  );
};

export default MiniCart;
