import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Ini akan dipicu oleh webhook Farcaster
  if (body.type === 'message') {
    const encodedText = body.data.content;
    
    // Kirim balasan dengan frame dekripsi
    return NextResponse.json({
      type: 'frame',
      frameUrl: `https://${process.env.VERCEL_URL}/frames?text=${encodedText}`
    });
  }

  return NextResponse.json({ ok: true });
}
