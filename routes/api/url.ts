import { FreshContext } from "$fresh/server.ts";
import { kv } from "../../util/database.ts";
import { createAlias } from "../../util/index.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  const alias = createAlias(5);
  const { url, expireTimestamp } = await req.json() as NewUrl;
  if (expireTimestamp) {
    await kv.set([alias], [url], { expireIn: expireTimestamp });
  } else {
    await kv.set([alias], [url]);
  }
  return new Response(JSON.stringify({
    alias,
    url,
  }));
};

interface NewUrl {
  url: string;
  expireTimestamp?: number | null;
}
