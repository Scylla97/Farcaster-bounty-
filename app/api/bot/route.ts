import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Validate request
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 415 }
      );
    }

    const body = await request.json();
    
    // Mock mode for development
    if (process.env.FARCASTER_SECRET === "mock_secret_0x123") {
      return NextResponse.json({
        type: 'frame',
        frameUrl: `${process.env.VERCEL_URL || 'http://localhost:3000'}/frames?text=TEST_MODE_DECRYPT_THIS`
      });
    }

    // Validate Farcaster webhook payload
    if (!body || !body.type || !body.data) {
      return NextResponse.json(
        { error: 'Invalid payload format' },
        { status: 400 }
      );
    }

    // Handle message type
    if (body.type === 'message') {
      const encodedText = body.data.content;
      
      if (!encodedText || typeof encodedText !== 'string') {
        return NextResponse.json(
          { error: 'No encoded text found in message' },
          { status: 400 }
        );
      }

      // Return frame response
      return NextResponse.json({
        type: 'frame',
        frameUrl: `${process.env.VERCEL_URL}/frames?text=${encodeURIComponent(encodedText)}`
      });
    }

    // Default response for other event types
    return NextResponse.json({ 
      status: 'received',
      eventType: body.type 
    });

  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
