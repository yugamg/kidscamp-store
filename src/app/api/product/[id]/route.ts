import { NextResponse } from 'next/server';
import productsData from '../../products.json';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  console.log('id', id);
  const product = productsData.products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json(
      { error: `Product with id '${id}' not found` },
      { status: 404 },
    );
  }

  return NextResponse.json(product);
}
