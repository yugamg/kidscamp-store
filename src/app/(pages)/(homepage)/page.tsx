import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import NavBar from '@/components/Navbar/Navbar';
import CarouselWrapper from '@/components/ImageCarousel/CarouselWrapper';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import { client } from '@/services/contentful';
import {
  mapHeroAssetsToCarouselItems,
  mapFeaturedProductsToProductItems,
  fetchHomePageCmsData,
  processHeroImage,
} from './homepage.utils';
import { Metadata, ResolvingMetadata } from 'next';

// ISR Configuration - revalidate every 1 minute
export const revalidate = 60;

export async function generateMetadata(
  _: { params: Promise<Record<string, unknown>> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { heroData } = await fetchHomePageCmsData();
  const parentMetadata = await parent;

  let baseMetadata: Metadata = {};

  if (heroData) {
    const typedHeroData = heroData as Record<string, unknown>;
    const ogImage = processHeroImage(typedHeroData.heroImage);

    baseMetadata = {
      ...baseMetadata,
      title: (typedHeroData.metaTitle as string) || 'KidsCamp Store - Premium Kids Products',
      description:
        (typedHeroData.metaDescription as string) ||
        'Discover amazing products for kids at KidsCamp Store. From toys to clothing, we have everything your little ones need.',
      keywords:
        (typedHeroData.metaKeywords as string) ||
        'kids store, children products, toys, kids clothing, baby products',
      authors: [{ name: 'KidsCamp Store' }],
      creator: 'KidsCamp Store',
      publisher: 'KidsCamp Store',
      robots: { index: true, follow: true },
      alternates: {
        canonical: 'http://localhost:3000',
      },
      openGraph: {
        ...parentMetadata.openGraph,
        title: (typedHeroData.metaTitle as string) || 'KidsCamp Store - Premium Kids Products',
        description:
          (typedHeroData.metaDescription as string) ||
          'Discover amazing products for kids at KidsCamp Store. From toys to clothing, we have everything your little ones need.',
        type: 'website',
        locale: 'en_US',
        images: ogImage,
        siteName: 'KidsCamp Store',
        url: 'http://localhost:3000',
      },
      twitter: {
        card: 'summary_large_image',
        title: (typedHeroData.metaTitle as string) || 'KidsCamp Store - Premium Kids Products',
        description:
          (typedHeroData.metaDescription as string) ||
          'Discover amazing products for kids at KidsCamp Store. From toys to clothing, we have everything your little ones need.',
        images: ogImage ? [ogImage[0].url] : undefined,
        creator: '@kidscampstore',
        site: '@kidscampstore',
      },
      other: { 'theme-color': '#4F46E5', 'color-scheme': 'light' },
    };
  } else {
    baseMetadata = {
      title: 'KidsCamp Store - Premium Kids Products',
      description:
        'Discover amazing products for kids at KidsCamp Store. From toys to clothing, we have everything your little ones need.',
      keywords:
        'kids store, children products, toys, kids clothing, baby products',
      authors: [{ name: 'KidsCamp Store' }],
      creator: 'KidsCamp Store',
      publisher: 'KidsCamp Store',
      robots: { index: true, follow: true },
      alternates: { canonical: 'http://localhost:3000' },
      openGraph: {
        ...parentMetadata.openGraph,
        title: 'KidsCamp Store - Premium Kids Products',
        description:
          'Discover amazing products for kids at KidsCamp Store. From toys to clothing, we have everything your little ones need.',
        type: 'website',
        locale: 'en_US',
        siteName: 'KidsCamp Store',
        url: 'http://localhost:3000',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'KidsCamp Store - Premium Kids Products',
        description:
          'Discover amazing products for kids at KidsCamp Store. From toys to clothing, we have everything your little ones need.',
        creator: '@kidscampstore',
        site: '@kidscampstore',
      },
      other: { 'theme-color': '#4F46E5', 'color-scheme': 'light' },
    };
  }

  return baseMetadata;
}

export default async function Home() {
  const response = await client.getEntries({
    content_type: 'homepage',
    limit: 10,
  });

  const homepage = response.items[0]?.fields;
  const [heroImages, featuredProducts] = [
    homepage.heroImage,
    homepage.featuredProducts,
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
