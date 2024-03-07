import { defineRoute, PageProps } from "$fresh/server.ts";
import { kv } from "../util/database.ts";

export default defineRoute(async (req, ctx) => {
  const url = (await kv.get([ctx.params.alias])).value as string;
  const headers = new Headers();
  headers.set("location", url);
  return new Response(null, {
    status: 303,
    headers,
  });
});
