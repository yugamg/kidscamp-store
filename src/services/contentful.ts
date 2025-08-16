import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!, // Your Space ID
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!, // Your CDA token
});

// Generic helpers for mapping Contentful data across CMS calls
export interface ContentfulAssetFile {
  url?: string;
}

export interface ContentfulAssetFields {
  title?: string;
  file?: ContentfulAssetFile;
}

export interface ContentfulSys {
  id?: string;
}

export interface ContentfulAssetLike {
  sys?: ContentfulSys;
  fields?: ContentfulAssetFields;
}

export interface BasicCarouselItem {
  id: string;
  imageUrl: string;
  title: string;
}

export function normalizeContentfulUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('//')) return `https:${url}`;
  return url;
}

export function mapAssetsToBasicCarouselItems(
  assets: unknown,
): BasicCarouselItem[] {
  if (!Array.isArray(assets)) return [];

  return (assets as ContentfulAssetLike[])
    .map((asset) => {
      const id = asset?.sys?.id ?? '';
      const title = asset?.fields?.title ?? '';
      const imageUrl = normalizeContentfulUrl(asset?.fields?.file?.url) ?? '';
      return { id, imageUrl, title } as BasicCarouselItem;
    })
    .filter((item) => item.id && item.imageUrl);
}
