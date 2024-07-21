import { kv } from "@vercel/kv";

export async function incrementUserGenerationCount(userId: string): Promise<number> {
    const key = `user:${userId}:generations`;
    const count = await kv.incr(key);
    await kv.expire(key, 3600); // Expire after 1 hour
    return count;
  }
  
  export async function canUserGenerate(userId: string): Promise<boolean> {
    const count = await kv.get(`user:${userId}:generations`) as number;
    return count < 3;
  }