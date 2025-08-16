import styles from './Nav.module.scss';
import Link from 'next/link';
import { NAV_ITEMS } from '@/utils/constants';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        {NAV_ITEMS.map((item) => (
          <li key={item.title} className={styles.menuItem}>
            <Link href={item.href} className={styles.link}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
