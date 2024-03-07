import { useState } from "preact/hooks";

export default function Form() {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const store = async () => {
    const res = await fetch(location.href + "api/url", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
    const data = await res.json() as { alias: string; url: string };
    setShortUrl(`${location.href}${data.alias}`);
  };

  return (
    <div class="border-dotted border-black border-2 mx-auto w-3/5 rounded-md py-8 px-3 shadow-lg">
      <form class="gap-5 flex flex-col items-center">
        <input
          type="url"
          name="url"
          id="url"
          placeholder="Paste long url here..."
          value={url}
          onInput={(e) => setUrl((e.target as HTMLInputElement).value)}
          class="rounded-md px-2 hover:outline-none focus:outline-none shadow-lg py-2 border-dotted border-black border-2 w-full"
        />
        <div class="mr-auto gap-2 flex flex-col">
          <label
            htmlFor="expires_at"
            class=""
          >
            Expires At
          </label>
          <input
            type="date"
            name="expires_at"
            id="expires_at"
            class="border-dotted border-black border-2 shadow-lg w-fit px-2 py-1 rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={() => store()}
          class="border-dotted border-black border-2 shadow-lg w-fit px-2 py-1 rounded-md hover:text-white hover:bg-blue-400"
        >
          Shorten URL
        </button>
      </form>
      {shortUrl}
    </div>
  );
}

// interface FormState {
//   url: string;
//   shortUrl: string;
//   expire;
// }
