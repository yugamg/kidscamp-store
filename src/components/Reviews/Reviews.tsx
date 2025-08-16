'use client';
import React, { useState } from 'react';
import styles from './Reviews.module.scss';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  profileImage: string;
}

interface ReviewsProps {
  className?: string;
}

const Reviews: React.FC<ReviewsProps> = ({ className = '' }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const reviews: Review[] = [
    {
      id: '1',
      name: 'Alex Mathio',
      rating: 5,
      date: '13 Oct 2024',
      text: '"NextGen\'s dedication to sustainability and ethical practices resonates strongly with today\'s consumers, positioning the brand as a responsible choice in the fashion world."',
      profileImage:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      rating: 4,
      date: '12 Oct 2024',
      text: '"The quality of the fabric and attention to detail is exceptional. Highly recommend for anyone looking for premium clothing."',
      profileImage:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    {
      id: '3',
      name: 'Michael Chen',
      rating: 5,
      date: '11 Oct 2024',
      text: '"Perfect fit and comfortable material. The shipping was fast and the packaging was eco-friendly."',
      profileImage:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
  ];

  const starDistribution = [
    { stars: 5, count: 35, percentage: 70 },
    { stars: 4, count: 10, percentage: 20 },
    { stars: 3, count: 3, percentage: 6 },
    { stars: 2, count: 1, percentage: 2 },
    { stars: 1, count: 1, percentage: 2 },
  ];

  const totalReviews = 50;
  const averageRating = 4.5;

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={index < rating ? '#FFD700' : 'none'}
        stroke="#FFD700"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  return (
    <section className={`${styles.reviewsSection} ${className}`}>
      <h2 className={styles.title}>Rating & Reviews</h2>

      <div className={styles.reviewsContent}>
        {/* Left Side - Rating Summary */}
        <div className={styles.ratingSummary}>
          <div className={styles.overallRating}>
            <span className={styles.ratingNumber}>{averageRating}</span>
            <span className={styles.ratingMax}>/5</span>
          </div>
          <div className={styles.reviewCount}>({totalReviews} New Reviews)</div>

          <div className={styles.starDistribution}>
            {starDistribution.map((item) => (
              <div key={item.stars} className={styles.distributionRow}>
                <div className={styles.starGroup}>
                  <span className={styles.starLabel}>{item.stars}</span>
                  <svg
                    className={styles.starIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#FFD700"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className={styles.barContainer}>
                  <div
                    className={styles.bar}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Customer Review */}
        <div className={styles.customerReview}>
          <div className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <h3 className={styles.reviewerName}>
                {reviews[currentReviewIndex].name}
              </h3>
              <span className={styles.reviewDate}>
                {reviews[currentReviewIndex].date}
              </span>
            </div>

            <div className={styles.starRating}>
              {renderStars(reviews[currentReviewIndex].rating)}
            </div>

            <p className={styles.reviewText}>
              {reviews[currentReviewIndex].text}
            </p>

            <div className={styles.reviewFooter}>
              <img
                src={reviews[currentReviewIndex].profileImage}
                alt={reviews[currentReviewIndex].name}
                className={styles.profileImage}
              />
              <button className={styles.nextButton} onClick={nextReview}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.paginationDots}>
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentReviewIndex ? styles.active : ''}`}
                onClick={() => setCurrentReviewIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
