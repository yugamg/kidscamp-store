'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { title: 'SALE', href: '/sale' },
  { title: 'BACK TO SCHOOL', href: '/back-to-school' },
  { title: 'DRESS SHOP', href: '/dress-shop' },
  { title: 'NEW & POPULAR', href: '/new-popular' },
  { title: 'BABY', href: '/baby' },
  { title: 'KIDS', href: '/kids' },
  { title: 'TOYS & PLAY', href: '/toys-play' },
  { title: 'HOME', href: '/home' },
  { title: 'GEAR', href: '/gear' },
  { title: 'GIFTS', href: '/gifts' },
  { title: "WOMEN'S", href: '/womens' },
  { title: 'READ', href: '/read' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <nav className={styles.navigation}>
          <ul className={styles.menuList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.title} className={styles.menuItem}>
                <Link
                  href={item.href}
                  className={styles.menuLink}
                  onClick={onClose}
                >
                  <span>{item.title}</span>
                  <svg
                    className={styles.chevron}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
