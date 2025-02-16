import { Redis } from "@upstash/redis";
import { redirect } from "next/navigation";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// ✅ Explicitly type the component props
interface ShortRedirectProps {
  params: {
    short: string;
  };
}

export default async function ShortRedirectPage({ params }: ShortRedirectProps) {
  const originalUrl = (await redis.get(params.short)) as string | null;

  if (originalUrl) {
    redirect(originalUrl);
  }

  return <p>URL not found.</p>;
}