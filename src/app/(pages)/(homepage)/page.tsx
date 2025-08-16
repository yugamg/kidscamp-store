import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import NavBar from '@/components/Navbar/Navbar';
import CarouselWrapper from '@/components/ImageCarousel/CarouselWrapper';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import {
  mapHeroAssetsToCarouselItems,
  mapFeaturedProductsToProductItems,
  fetchHomePageCmsData,
} from './homepage.utils';
import { Metadata } from 'next';

// ISR Configuration - revalidate every 1 minute
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'KidsCamp Store - Premium Kids Products',
  description: 'Discover amazing products for kids at KidsCamp Store. From toys to clothing, we have everything your little ones need.',
  keywords: 'kids store, children products, toys, kids clothing, baby products',
  openGraph: {
    title: 'KidsCamp Store - Premium Kids Products',
    description: 'Discover amazing products for kids at KidsCamp Store. From toys to clothing, we have everything your little ones need.',
    type: 'website',
    siteName: 'KidsCamp Store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KidsCamp Store - Premium Kids Products',
    description: 'Discover amazing products for kids at KidsCamp Store. From toys to clothing, we have everything your little ones need.',
  },
};

export default async function Home() {
  const { heroData } = await fetchHomePageCmsData();
  
  const [heroImages, featuredProducts] = [
    heroData?.heroImage,
    heroData?.featuredProducts,
  ];

  const heroItems = mapHeroAssetsToCarouselItems(heroImages);
  const productItems = mapFeaturedProductsToProductItems(featuredProducts);

  return (
    <div>
      <Header />
      <NavBar />
      <CarouselWrapper items={heroItems} />
      <ProductSlider title="Trending Products" products={productItems} />
      <Footer />
    </div>
  );
}
