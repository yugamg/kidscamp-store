'use client';
import React, { useState } from 'react';
import styles from './Header.module.scss';
import Sidebar from '../Sidebar/Sidebar';
import MiniCart from '../MiniCart/MiniCart';
import Search from '../Search/Search';
import { useCartStore } from '@/services/cartStore';
import SvgIcon from '../SvgIcon/SvgIcon';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const itemCount = useCartStore((s) => s.itemCount);
  const toggleCart = useCartStore((s) => s.toggle);
  const isCartOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const closeCart = useCartStore((s) => s.close);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeItem = useCartStore((s) => s.removeItem);
  const router = useRouter();

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleSearch = (query: string) => {
    router.push(`/products/${encodeURIComponent(query)}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topRow}>
          <button
            className={styles.hamburgerMenu}
            aria-label="Menu"
            onClick={openSidebar}
          >
            <SvgIcon name="menu" width="24" height="24" />
          </button>

          <div className={styles.logo}>
            <Link href="/">
              <span className={styles.brandName}>KIDS CAMP</span>
            </Link>
          </div>

          <nav className={styles.mobileNavIcons}>
            <button className={styles.iconBtn} aria-label="User Profile">
              <SvgIcon name="user" width="24" height="24" />
            </button>
            <button
              className={styles.iconBtn}
              aria-label="Cart"
              onClick={toggleCart}
            >
              <SvgIcon name="cart" width="24" height="24" />
              {itemCount > 0 && (
                <span className={styles.badge}>{itemCount}</span>
              )}
            </button>
          </nav>
        </div>

        {/* Search Row - Mobile/Tablet */}
        <div className={styles.searchRow}>
          <Search
            value={searchTerm}
            onChange={handleSearchChange}
            onSearch={handleSearch}
          />
        </div>

        {/* Desktop Layout */}
        <div className={styles.desktopLayout}>
          <div className={styles.logo}>
            <Link href="/">
              <span className={styles.brandName}>KIDS CAMP</span>
            </Link>
          </div>

          <div className={styles.searchWrapper}>
            <Search
              value={searchTerm}
              onChange={handleSearchChange}
              onSearch={handleSearch}
            />
          </div>

          <nav className={styles.navIcons}>
            <button className={styles.iconBtn} aria-label="User Profile">
              <SvgIcon name="user" width="24" height="24" />
            </button>
            <button className={styles.iconBtn} aria-label="Wishlist">
              <SvgIcon name="wishlist" width="24" height="24" />
            </button>
            <button
              className={styles.iconBtn}
              aria-label="Cart"
              onClick={toggleCart}
            >
              <SvgIcon name="cart" width="24" height="24" />
              {itemCount > 0 && (
                <span className={styles.badge}>{itemCount}</span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <MiniCart
        isOpen={isCartOpen}
        items={items}
        subtotal={subtotal}
        onClose={closeCart}
        onIncrement={increment}
        onDecrement={decrement}
        onRemoveItem={removeItem}
      />
    </>
  );
};

export default Header;
