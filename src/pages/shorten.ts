import type { APIRoute } from "astro";
import { md5 } from 'js-md5';

export const prerender = false;

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface Body {
  url: string;
}

export const POST: APIRoute = async ({ request }) => {
  const { url } = await request.json() as Body;
  if (!url) {
    return new Response(JSON.stringify({ error: "URL is required" }), { status: 400 });
  }

  let hashed = parseInt(md5.hex(url), 16);
  let slug = '';
  for (let i = 0; i < 6; i++) {
    slug += charset[hashed % charset.length];
    hashed = Math.floor(hashed / charset.length);
  }
  return new Response(JSON.stringify({ slug }));
}
