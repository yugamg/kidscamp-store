import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCorousel from '@/components/ProductCorousel/ProductCorousel';

jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: React.ComponentProps<'img'>) => {
		// eslint-disable-next-line @next/next/no-img-element
		return <img alt="test-image" {...props} />;
	},
}));

jest.mock('@/assets/images/demoImage.jpg', () => 'test-image.jpg');

describe('ProductCorousel', () => {
	const images = [
		'https://example.com/a.jpg',
		'https://example.com/b.jpg',
		'https://example.com/c.jpg',
	];

	it('renders main image and correct number of thumbnails', () => {
		render(<ProductCorousel images={images} alt="Product images" />);

		const mainImg = screen.getByTestId('main-image');
		expect(mainImg).toBeInTheDocument();
		expect(mainImg.getAttribute('src')).toContain(images[0]);

		const thumbnails = screen.getByTestId('thumbnails');
		const thumbnailImgs = within(thumbnails).getAllByTestId('thumbnail-img');
		expect(thumbnailImgs.length).toBe(images.length);
	});

	it('changes main image when a thumbnail is clicked', async () => {
		const user = userEvent.setup();
		render(<ProductCorousel images={images} alt="Product images" />);

		const thumbnails = screen.getByTestId('thumbnails');
		const thumbnailImgs = within(thumbnails).getAllByTestId('thumbnail-img');
		expect(thumbnailImgs.length).toBeGreaterThan(1);

		await user.click(thumbnailImgs[1]);

		const mainImg = screen.getByTestId('main-image');
		expect(mainImg.getAttribute('src')).toContain(images[1]);
	});

	it('navigates images using arrows and wraps correctly', async () => {
		const user = userEvent.setup();
		render(<ProductCorousel images={images} alt="Product images" />);

		const nextButton = screen.getByTestId('arrow-next');
		const prevButton = screen.getByTestId('arrow-prev');

		await user.click(nextButton);
		expect(screen.getByTestId('main-image').getAttribute('src')).toContain(images[1]);

		await user.click(prevButton);
		expect(screen.getByTestId('main-image').getAttribute('src')).toContain(images[0]);

		await user.click(prevButton);
		expect(screen.getByTestId('main-image').getAttribute('src')).toContain(images[images.length - 1]);
	});

	it('uses fallback image when no images are provided', () => {
		render(<ProductCorousel images={[]} alt="No images" />);
		const mainImg = screen.getByTestId('main-image');
		expect(mainImg.getAttribute('src')).toContain('test-image.jpg');
	});
}); 