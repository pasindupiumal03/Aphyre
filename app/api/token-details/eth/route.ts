// Temporarily disabled ETH Token Details API functionality
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return NextResponse.json({
    error: "ETH Token Details API is temporarily disabled"
  }, { status: 503 });
}