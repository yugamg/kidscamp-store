import { client } from '@/services/contentful';
export interface CarouselItem {
  id: string;
  imageUrl: string;
  title?: string;
}

export type BasicCarouselItem = Pick<CarouselItem, 'id' | 'imageUrl' | 'title'>;

export interface ProductItem {
  id: string;
  imageUrl: string;
  brand: string;
  name: string;
  price: number;
}

interface ContentfulAssetFile {
  url?: string;
}

interface ContentfulAssetFields {
  title?: string;
  file?: ContentfulAssetFile;
}

interface ContentfulSys {
  id?: string;
}

interface ContentfulAssetLike {
  sys?: ContentfulSys;
  fields?: ContentfulAssetFields;
}

interface ContentfulProductFields {
  title?: string;
  productImage?: ContentfulAssetLike;
  subText?: string;
  price?: string;
  description?: string;
}

interface ContentfulProductEntry {
  sys?: ContentfulSys;
  fields?: ContentfulProductFields;
}

function normalizeContentfulUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('//')) return `https:${url}`;
  return url;
}

export function mapHeroAssetsToCarouselItems(
  assets: unknown,
): BasicCarouselItem[] {
  if (!Array.isArray(assets)) return [];

  return (assets as ContentfulAssetLike[])
    .map((asset) => {
      const id = asset?.sys?.id ?? '';
      const imageUrl = normalizeContentfulUrl(asset?.fields?.file?.url) ?? '';
      return { id, imageUrl } as BasicCarouselItem;
    })
    .filter((item) => item.id && item.imageUrl);
}

export function mapFeaturedProductsToProductItems(
  products: unknown,
): ProductItem[] {
  if (!Array.isArray(products)) return [];

  return (products as ContentfulProductEntry[])
    .map((product) => {
      const id = product?.fields?.productImage?.fields?.title ?? '';
      const name = product?.fields?.title ?? '';
      const brand = product?.fields?.subText ?? 'KidsCamp';
      const price = parseFloat(product?.fields?.price?.replace('$', '') ?? '0');
      const imageUrl =
        normalizeContentfulUrl(
          product?.fields?.productImage?.fields?.file?.url,
        ) ?? '';

      return { id, imageUrl, brand, name, price } as ProductItem;
    })
    .filter((item) => item.id && item.imageUrl && item.name);
}

export async function fetchHomePageCmsData() {
  try {
    const response = await client.getEntries({
      content_type: 'homepage',
      limit: 1,
      include: 2,
    });

    const homepage = response.items[0]?.fields as Record<string, unknown>;
    return { heroData: homepage };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return { heroData: null };
  }
}

export function processHeroImage(heroImage: unknown) {
  if (!Array.isArray(heroImage) || heroImage.length === 0) return undefined;

  const firstImage = heroImage[0] as Record<string, unknown>;
  const fields = firstImage?.fields as Record<string, unknown>;
  const file = fields?.file as Record<string, unknown>;
  
  if (!file?.url) return undefined;

  const imageUrl = file.url as string;
  const processedUrl = imageUrl.startsWith('//')
    ? `https:${imageUrl}`
    : imageUrl;

  return [
    {
      url: processedUrl,
      width: 1200,
      height: 630,
      alt:
        typeof fields?.title === 'string'
          ? fields.title as string
          : 'KidsCamp Store',
    },
  ];
}
