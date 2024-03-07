import { FreshContext } from "$fresh/server.ts";
import { kv } from "../../util/database.ts";
import { createAlias } from "../../util/index.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  const alias = createAlias(5);
  const { url } = await req.json() as NewUrl;
  await kv.set([alias], [url]);
  return new Response(JSON.stringify({
    alias,
    url,
  }));
};

interface NewUrl {
  url: string;
}
