import { Redis } from "@upstash/redis";
import { redirect } from "next/navigation";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function ShortRedirectPage({ params }: { params: Record<string, string> }) {
  const originalUrl = (await redis.get(params.short)) as string | null;

  if (originalUrl) {
    redirect(originalUrl);
  }

  return <p>URL not found.</p>;
}