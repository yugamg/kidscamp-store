'use client';
import React from 'react';
import styles from './Search.module.scss';

interface SearchProps {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({
  className = '',
  placeholder = 'Search for anything',
  value,
  onChange,
  onSearch,
}) => {
  const handleSearchKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key === 'Enter') {
      const query = value.trim();
      if (query.length > 0) {
        onSearch(query);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleSearchKeyDown}
        aria-label="Search"
      />
    </div>
  );
};

export default Search;
