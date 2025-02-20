import axios from 'axios';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('url');
  if (!slug)
    return NextResponse.json(
      { error: 'Missing slug parameter' },
      { status: 400 }
    );

  try {
    const response = await axios.get(slug, {
      headers: DEFAULT_HEADERS,
      timeout: 12000,
    });

    const contentType = response.headers['content-type'];
    const data = response.data;

    if (contentType?.includes('application/json')) {
      return NextResponse.json(data);
    }
    return new Response(data, {
      headers: { 'Content-Type': contentType || 'text/plain' },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch URL', details: (error as Error).message },
      { status: 500 }
    );
  }
}
