import { kv } from "@vercel/kv";

// User generation history
export async function addGenerationToHistory(userId: string, prompt: string, imageUrl: string) {
  const key = `user:${userId}:history`;
  const generation = { prompt, imageUrl, timestamp: Date.now() };
  await kv.lpush(key, JSON.stringify(generation));
  await kv.ltrim(key, 0, 49); // Keep only the last 50 generations
}

export async function getGenerationHistory(userId: string) {
  const key = `user:${userId}:history`;
  const history = await kv.lrange(key, 0, -1);
  return history.map(item => JSON.parse(item));
}

// Rate limiting
export async function canUserGenerate(userId: string): Promise<boolean> {
  const key = `user:${userId}:generate_count`;
  const count = await kv.get(key) as number || 0;
  return count < 3;
}

export async function incrementUserGenerationCount(userId: string): Promise<void> {
  const key = `user:${userId}:generate_count`;
  await kv.incr(key);
  await kv.expire(key, 3600); // Expire after 1 hour
}

// Explore page
export async function addToExplorePage(imageUrl: string, prompt: string) {
  const key = 'explore:images';
  const item = { imageUrl, prompt, timestamp: Date.now() };
  await kv.lpush(key, JSON.stringify(item));
  await kv.ltrim(key, 0, 99); // Keep only the last 100 images
}

export async function getExplorePageImages(page: number = 1, pageSize: number = 20) {
  const key = 'explore:images';
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;
  const images = await kv.lrange(key, start, end);
  return images.map(item => JSON.parse(item));
}