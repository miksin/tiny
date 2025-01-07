import type { APIRoute } from "astro";

export const prerender = false;

interface Body {
    url: string;
}

export const POST: APIRoute = async ({ request }) => {
    const { url } = await request.json() as Body;
    // TODO: shorten the URL
    const shortenURL = url;
    return new Response(JSON.stringify({ shortenURL }));
}
