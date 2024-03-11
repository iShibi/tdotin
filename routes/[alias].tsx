import { defineRoute, PageProps } from "$fresh/server.ts";
import { kv } from "../util/database.ts";

export default defineRoute(async (req, ctx) => {
  const url = (await kv.get([ctx.params.alias])).value;
  if (!url) {
    // @ts-expect-error type issue
    return ctx.renderNotFound({
      message: "This link is invalid or has been expired.",
    });
  }
  const headers = new Headers();
  headers.set("location", url as string);
  return new Response(null, {
    status: 303,
    headers,
  });
});
