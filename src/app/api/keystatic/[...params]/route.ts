import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

const handler = makeRouteHandler({ config });

/**
 * Keystatic builds its GitHub callback URL from the request URL. On Netlify that can be the
 * internal deploy address (e.g. 6af9…--site.netlify.app) instead of the domain the editor is
 * using, which breaks GitHub sign-in. Rebuild the URL from the browser-facing host.
 */
function withPublicOrigin(req: Request): Request {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!host) return req;
  const url = new URL(req.url);
  if (url.host === host) return req;
  url.host = host;
  url.protocol = (req.headers.get("x-forwarded-proto") ?? "https").split(",")[0] + ":";
  url.port = "";
  return new Request(url, req);
}

export const GET = (req: Request) => handler.GET(withPublicOrigin(req));
export const POST = (req: Request) => handler.POST(withPublicOrigin(req));
