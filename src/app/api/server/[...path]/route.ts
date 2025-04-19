import { NextRequest, NextResponse } from 'next/server';
import { tokenHandleRequest } from '@/shared/libs/handler/tokenHandler';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return tokenHandleRequest(req);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return tokenHandleRequest(req);
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  return tokenHandleRequest(req);
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  return tokenHandleRequest(req);
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  return tokenHandleRequest(req);
}
