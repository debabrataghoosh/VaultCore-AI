
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // No database, just return success
  return NextResponse.json({ success: true });
}
