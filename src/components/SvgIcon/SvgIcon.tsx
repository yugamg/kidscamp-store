import React from 'react';

interface ImageColorProps extends React.SVGAttributes<SVGElement> {
  width?: string;
  color?: string;
  height?: string;
  className?: string;
}

// Basic Icons
const CartIcon = ({
  className,
  width,
  height,
  ...rest
}: ImageColorProps) => (
  <svg
    width={width ?? '24'}
    height={height ?? '24'}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    {...rest}
  >
    <path
      d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6924 15.5583C21.0581 15.264 21.3085 14.8504 21.4 14.39L23 6H6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WishlistIcon = ({
  className,
  width,
  height,
  ...rest
}: ImageColorProps) => (
  <svg
    width={width ?? '24'}
    height={height ?? '24'}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    {...rest}
  >
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = ({ className, width, height, ...rest }: ImageColorProps) => (
  <svg
    width={width ?? '24'}
    height={height ?? '24'}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    {...rest}
  >
    <path
      d="M3 12H21M3 6H21M3 18H21"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = ({ className, width, height, ...rest }: ImageColorProps) => (
  <svg
    width={width ?? '24'}
    height={height ?? '24'}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    {...rest}
  >
    <path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="7"
      r="4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Carousel Arrow Icons
const CarouselLeftArrow = ({
  className,
  width,
  height,
  color,
  ...rest
}: ImageColorProps) => (
  <svg
    width={width ?? '24'}
    height={height ?? '24'}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...rest}
  >
    <path
      d="M15 18L9 12L15 6"
      stroke={color ?? 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CarouselRightArrow = ({
  className,
  width,
  height,
  color,
  ...rest
}: ImageColorProps) => (
  <svg
    width={width ?? '24'}
    height={height ?? '24'}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...rest}
  >
    <path
      d="M9 18L15 12L9 6"
      stroke={color ?? 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Arrow Icons
const RightArrowSmall = ({
  className,
  width,
  height,
  color,
  ...rest
}: ImageColorProps) => (
  <svg
    width={width ?? '16'}
    height={height ?? '16'}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...rest}
  >
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke={color ?? 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// App Store Icon
const AppStoreIcon = ({
  className,
  width,
  height,
  color,
  ...rest
}: ImageColorProps) => (
  <svg
    width={width ?? '20'}
    height={height ?? '24'}
    viewBox="0 0 24 24"
    fill={color ?? 'currentColor'}
    className={className}
    {...rest}
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

// Icons object for easy access
const icons = {
  cart: CartIcon,
  wishlist: WishlistIcon,
  menu: MenuIcon,
  user: UserIcon,
  rightArrowSmall: RightArrowSmall,
  carouselLeftArrow: CarouselLeftArrow,
  carouselRightArrow: CarouselRightArrow,
  appStore: AppStoreIcon,
};

// Main SvgIcon component interface
export interface SvgIconProps extends React.SVGAttributes<SVGElement> {
  width?: string;
  height?: string;
  className?: string;
  name?: keyof typeof icons;
  color?: string;
  testId?: string;
  role?: string;
  ariaLabel?: 'true' | 'false';
}

// Main SvgIcon component
const SvgIcon = ({
  name = 'cart',
  className,
  height,
  width,
  color,
  testId,
  ...rest
}: SvgIconProps) => {
  const Icon = icons[name];

  if (!Icon) {
    console.warn(`Icon "${name}" not found in SvgIcon component`);
    return null;
  }

  const iconProps = {
    width,
    height,
    color,
    className,
    ...rest,
  };

  if (testId) {
    (iconProps as Record<string, unknown>)['data-testid'] = testId;
  }

  return <Icon {...iconProps} />;
};

export default SvgIcon;
