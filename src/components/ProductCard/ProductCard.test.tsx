import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types/product';

jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: React.ComponentProps<'img'>) => {
		// eslint-disable-next-line @next/next/no-img-element
		return <img alt="test-image" {...props} />;
	},
}));

jest.mock('@/assets/images/demoImage.jpg', () => 'test-image.jpg');

describe('ProductCard', () => {
	it('renders product info and link', () => {
		const product: Product = {
			id: 'p1',
			category_id: 'winter-wear',
			name: 'Cozy Jacket',
			short_description: 'Warm and comfy',
			long_description: 'A long description',
			color_variants: ['Red'],
			size_variants: ['S', 'M'],
			prices: { Red: { S: 20, M: 25 } },
			discounted_prices: undefined,
			midjourney_prompt: '',
			tag: 'popular',
			made_in: 'India',
			materials_used: 'Cotton',
			imgUrl: ['https://example.com/image.jpg'],
		};

		render(<ProductCard product={product} rating={3} />);

		expect(screen.getByTestId('product-name')).toHaveTextContent('Cozy Jacket');
		expect(screen.getByTestId('product-short-description')).toHaveTextContent('Warm and comfy');
		expect(screen.getByText('NEW')).toBeInTheDocument();
		expect(screen.getByTestId('product-price')).toHaveTextContent('$20.00');

		const link = screen.getByTestId('product-link');
		expect(link).toHaveAttribute('href', expect.stringContaining(`/product/${product.id}`));
	});
}); 