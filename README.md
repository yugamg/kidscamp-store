# KidsCamp Store

A modern, performant kids fashion storefront built with Next.js App Router. It showcases a product catalog, product detail pages, client-side search, and CMS-powered homepage content.

## Features
- **CMS-driven homepage**: Hero carousel and featured products from Contentful
- **Product catalog**: Grid listing with responsive cards
- **Product detail (PDP)**: Rich details, gallery carousel, and specs
- **Client-side search**: Filter products by query
- **Global state for cart**: Powered by Zustand (mini cart component)
- **Optimized rendering**: SSR/ISR for server routes, SWR for client caching
- **Type-safe**: End-to-end TypeScript

## Tech Stack
- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: SCSS Modules
- **Data & CMS**: Contentful JS SDK
- **Client caching**: SWR
- **State management**: Zustand
- **Tooling**: ESLint, Prettier

## Project Structure
```
src/
  app/
    (homepage)/
      page.tsx                # ISR-enabled homepage (Contentful)
      homepage.utils.ts       # CMS mappers and helpers
    products/
      page.tsx                # Client page using SWR
      [searchText]/page.tsx   # Client page with search
    product/[id]/page.tsx     # Server-rendered PDP
    api/
      products/route.ts       # GET /api/products (local JSON)
      product/[id]/route.ts   # GET /api/product/:id (local JSON)
  components/                 # UI components
  hooks/                      # SWR hooks (useProducts, useProduct)
  services/                   # contentful.ts, productService.ts, cart store
  types/                      # Domain types (Product)
  utils/                      # Utilities (product utils, constants)
```

## Prerequisites
- Node.js 18.18+ 
- npm 9+

## Environment Variables
Create a `.env` file in the project root (`kidscamp-store/`).

## Scripts
- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint
- `npm run format` — format with Prettier



## Getting Started
1) Install dependencies
```
npm install
```
2) Configure environment
```
cp .env.local.example .env.local  # if you create an example file
# then edit .env.local with real keys
```
3) Run the app
```
npm run dev
```
Open http://localhost:3000

4) Production build
```
npm run build
npm run start
```

## Data Fetching & Caching
- **SWR (client caching)**: Used in `src/hooks/useProducts.ts` and `src/hooks/useProduct.ts`.
  - Deduplication interval is set to 60s for `/api/products`.
  - Focus revalidation disabled to avoid UI jumps.
  - Example:
    ```ts
    // src/hooks/useProducts.ts
    useSWR<Product[]>("/api/products", fetcher, {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
    });
    ```



- **ISR**: Homepage (`src/app/(homepage)/page.tsx`) enables Incremental Static Regeneration with:
  ```ts
  export const revalidate = 60; // Regenerate at most once per minute
  ```
  The page is statically generated and transparently revalidated on subsequent requests.

## API Endpoints
- `GET /api/products` → Returns the product collection (from `src/app/api/products/products.json`).
- `GET /api/product/:id` → Returns a single product by id.

These endpoints are consumed by SWR hooks and PDP server functions.

## CMS: Contentful Setup
1) Create a Contentful space and obtain:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN` (Content Delivery API token)
2) Content model suggestions:
   - `homepage` content type
     - `heroImage` (Array of Assets)
     - `featuredProducts` (Array of Entries → your product content type or JSON)
     - Optional SEO fields: `metaTitle`, `metaDescription`, `metaKeywords`
3) Populate at least one `homepage` entry.
4) Ensure `.env.local` is configured; the homepage will read from Contentful using `src/services/contentful.ts`.

## Non-Functional Requirements (NFR)
- **Performance**: ISR for CMS-backed pages; client caching with SWR; dynamic imports for non-critical components (e.g., Footer) to reduce TTI.
- **Scalability**: App Router architecture, typed APIs, modular services and hooks.
- **Reliability**: Safe data accessors and normalization for product data; graceful error handling in SWR hooks.
- **Security**: Secrets loaded from environment variables; server-only access tokens (no Contentful secrets exposed to client).
- **Accessibility**: Semantic HTML via Next.js/React; keyboard and screen reader-friendly components are encouraged.
- **SEO**: Rich `generateMetadata` on key pages, OpenGraph/Twitter meta, canonical URLs.
- **Maintainability**: Prettier + ESLint; clear module boundaries (`components`, `hooks`, `services`).

## Unit Testing
Testing is planned. Recommended stack:
- **Runner**: Vitest
- **DOM testing**: @testing-library/react, @testing-library/jest-dom


## Deployment
- Deploy to any Node-compatible platform (e.g., Vercel). Ensure environment variables are set in the host.
- ISR works out of the box on platforms that support Next.js App Router.

## Troubleshooting
- Build fails with Contentful-related error: Ensure `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` are set.
- Homepage shows empty sections: Verify you have a `homepage` entry with `heroImage` and `featuredProducts` populated in Contentful.
- SWR requests 404: Make sure `NEXT_PUBLIC_BASE_URL` is correct when running behind a proxy or non-default port.
