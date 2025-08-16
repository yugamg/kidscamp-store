import { NextResponse } from 'next/server';
import productsData from '../products.json';

export async function GET() {
  return NextResponse.json({ products: productsData.products });
}
