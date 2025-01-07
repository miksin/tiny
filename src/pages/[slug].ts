import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, locals, redirect }) => {
  const slug: string = params.slug ?? '';
  const { SHORT_TO_URL } = locals.runtime.env;
  const url = await SHORT_TO_URL.get(slug);
  if (!url) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
  return redirect(url, 301);
}
