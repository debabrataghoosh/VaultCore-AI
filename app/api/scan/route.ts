import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { address, results } = body;

  if (!address || !results) {
    return new NextResponse("Address and results are required", { status: 400 });
  }

  return NextResponse.json({ address, results });
}