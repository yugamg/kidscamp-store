import Link from 'next/link';
import styles from './Footer.module.scss';
import SvgIcon from '../SvgIcon/SvgIcon';
import { FOOTER_CUSTOMER_CARE_LINKS, FOOTER_COMPANY_LINKS, FOOTER_SOCIAL_LINKS } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.mainContent}>
        {/* Left Section - Three Columns */}
        <div className={styles.leftSection}>
          <nav className={styles.section} aria-label="Customer Care">
            <h2 className={styles.heading}>CUSTOMER CARE</h2>
            <ul className={styles.list}>
              {FOOTER_CUSTOMER_CARE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.section} aria-label="Company">
            <h2 className={styles.heading}>COMPANY</h2>
            <ul className={styles.list}>
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className={styles.section} aria-labelledby="contact-heading">
            <h2 className={styles.heading} id="contact-heading">
              CONTACT US
            </h2>
            <address>
              <p className={styles.text}>Mon—Fri: 10am—6pm Eastern</p>
              <p className={styles.text}>
                <a href="mailto:customercare@kidscamp.com">
                  customercare@kidscamp.com
                </a>
              </p>
            </address>
            <div className={styles.social} aria-label="Social Media Links">
              {FOOTER_SOCIAL_LINKS.map((link) => (
                <a key={link.label} href={link.href} aria-label={link.label}>
                  <i className={link.iconClass} />
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Vertical Separator */}
        <div className={styles.separator}></div>

        {/* Right Section - Mailing List & App Download */}
        <div className={styles.rightSection}>
          <section
            className={styles.mailingList}
            aria-labelledby="newsletter-heading"
          >
            <h2 className={styles.heading} id="newsletter-heading">
              JOIN OUR MAILING LIST
            </h2>
            <p className={styles.text}>
              Fresh arrivals, new and new-to-you brands, and expert edits.
              Basically, a bundle of joy in email form.
            </p>
            <form className={styles.subscribe} aria-label="Newsletter Signup">
              <label htmlFor="newsletter-email" className="visually-hidden">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
              />
              <button type="submit" aria-label="Subscribe to newsletter">
                <SvgIcon name="rightArrowSmall" width="16" height="16" />
              </button>
            </form>
          </section>

          <section className={styles.appDownload} aria-labelledby="app-heading">
            <h2 className={styles.heading} id="app-heading">
              DOWNLOAD THE APP
            </h2>
            <p className={styles.text}>
              Download our official app from the app store
            </p>
            <button className={styles.appStoreButton}>
              <SvgIcon name="appStore" width="20" height="24" />
              <span>Download on the App Store</span>
            </button>
          </section>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Kids Camp</p>
      </div>
    </footer>
  );
}
