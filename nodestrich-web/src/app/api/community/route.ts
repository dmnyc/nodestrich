import { NextResponse } from 'next/server';
import { getFullCommunityInfo } from '@/lib/amboss';

export async function GET() {
  try {
    const result = await getFullCommunityInfo();

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Enable static generation for build-time data fetching
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour