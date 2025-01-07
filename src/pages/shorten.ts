import type { APIRoute } from "astro";
import { md5 } from 'js-md5';

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
  const body = await request.json();
  const url = new URL(body.url);
  let hashed = parseInt(md5.hex(url.href), 16);
  let slug = '';
  for (let i = 0; i < 6; i++) {
    slug += charset[hashed % charset.length];
    hashed = Math.floor(hashed / charset.length);
  }
  const { SHORT_TO_URL } = locals.runtime.env;
  await SHORT_TO_URL.put(slug, url.href);
  return new Response(JSON.stringify({ slug }));
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid URL" }), { status: 400 });
  }
}
