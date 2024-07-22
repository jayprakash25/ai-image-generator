import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(req: NextRequest) {
  try {
    // Authenticate the user
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Retrieve the user's image generation history
    const history = await kv.lrange(`user:${userId}:history`, 0, -1);
    console.log(history)

    // Parse the history
    // const parsedHistory = history.map((item: string) => JSON.parse(item));

    // Return the history
    return NextResponse.json({ history: history });

  } catch (error) {
    console.error('Error fetching image history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
