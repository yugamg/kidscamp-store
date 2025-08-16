import styles from './ProductDescription.module.scss';

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Description</h3>
        <p className={styles.sectionText}>{description}</p>
      </div>
    </div>
  );
};

export default ProductDescription;
