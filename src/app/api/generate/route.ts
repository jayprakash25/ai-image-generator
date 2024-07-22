import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

// Simulated list of pre-downloaded images
const preDownloadedImages = [
 'd1',
 'd2',
 'd3'
];

export async function POST(req: NextRequest) {
  try {
    // Authenticate the user
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Check rate limit
    const userGenerationCount = await kv.get<number>(`user:${userId}:generationCount`) || 0;
    if (userGenerationCount >= 3) {
      const lastGenerationTime = await kv.get<number>(`user:${userId}:lastGenerationTime`) || 0;
      const oneHourAgo = Date.now() - 3600000; // 1 hour in milliseconds

      if (lastGenerationTime > oneHourAgo) {
        return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
      } else {
        // Reset count if it's been more than an hour
        await kv.set(`user:${userId}:generationCount`, 0);
      }
    }

    // Parse the request body
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Simulate image generation by selecting a random pre-downloaded image
    const generatedImageUrl = preDownloadedImages[Math.floor(Math.random() * preDownloadedImages.length)];

    // Update user's generation count and last generation time
    await kv.incr(`user:${userId}:generationCount`);
    await kv.set(`user:${userId}:lastGenerationTime`, Date.now());

    // Store generation history
    await kv.lpush(`user:${userId}:history`, JSON.stringify({
      prompt,
      imageUrl: generatedImageUrl,
      timestamp: Date.now(),
    }));

    // Return the "generated" image URL
    return NextResponse.json({ imageUrl: generatedImageUrl });

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}