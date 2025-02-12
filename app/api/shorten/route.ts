import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: Request) {
  const { url } = await req.json();
  
  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const shortId = Math.random().toString(36).substring(2, 8);
  await redis.set(shortId, url);

  return NextResponse.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
}
