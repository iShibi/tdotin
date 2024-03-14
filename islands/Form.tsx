import { useState } from "preact/hooks";

const expireAfterOptions = {
  "30 minutes": 30,
  "1 hour": 60,
  "6 hours": 360,
  "12 hours": 720,
  "1 day": 1440,
  "7 days": 10080,
};

export default function Form() {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [expireAfter, setExpireAfter] = useState("never");
  const [expireDate, setExpireDate] = useState("");
  const [expireTime, setExpireTime] = useState("");

  const store = async () => {
    let expireTimestamp;
    if (expireAfter === "never") {
      expireTimestamp = null;
    } else if (expireAfter === "custom") {
      expireTimestamp = new Date(`${expireDate}T${expireTime}`).getTime();
    } else {
      expireTimestamp = new Date(
        new Date().getTime() + Number.parseInt(expireAfter) * 60000,
      )
        .getTime();
    }
    const res = await fetch(location.href + "api/url", {
      method: "POST",
      body: JSON.stringify({ url, expireTimestamp }),
    });
    const data = await res.json() as { alias: string; url: string };
    setShortUrl(`${location.href}${data.alias}`);
    setUrl("");
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrl);
    console.log(`Copied: ${shortUrl}`);
  };

  return (
    <div class="mx-auto w-3/5 grid grid-cols-1 gap-y-4">
      <div class="border-dotted border-black border-2 rounded-md py-8 px-3 shadow-lg">
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
            <label htmlFor="">Expire After</label>
            <select
              class="border-dotted border-black border-2 shadow-lg w-fit px-2 py-1 rounded-md"
              name="expire_after"
              id="expire_after"
              onChange={(e) =>
                setExpireAfter((e.target as HTMLInputElement).value)}
            >
              <option value="never">Never</option>
              {Object.entries(expireAfterOptions).map(([key, value]) => (
                <option key={key} value={value}>{key}</option>
              ))}
              <option value="custom">Custom</option>
            </select>
          </div>
          {expireAfter === "custom"
            ? (
              <div class="mr-auto gap-2 flex flex-row">
                <div class="flex flex-col">
                  <label
                    htmlFor="expire_date"
                    class=""
                  >
                    Expire Date
                  </label>
                  <input
                    type="date"
                    name="expire_date"
                    id="expire_date"
                    onInput={(e) => {
                      const date = (e.target as HTMLInputElement).value;
                      setExpireDate(date);
                    }}
                    class="border-dotted border-black border-2 shadow-lg w-fit px-2 py-1 rounded-md"
                  />
                </div>
                <div class="flex flex-col">
                  <label
                    htmlFor="expire_time"
                    class=""
                  >
                    Expire Time
                  </label>
                  <input
                    type="time"
                    name="expire_time"
                    id="expire_time"
                    onInput={(e) => {
                      const time = (e.target as HTMLInputElement).value;
                      setExpireTime(time);
                    }}
                    class="border-dotted border-black border-2 shadow-lg w-fit px-2 py-1 rounded-md"
                  />
                </div>
              </div>
            )
            : <></>}
          <button
            type="button"
            onClick={() => store()}
            class="border-dotted border-black border-2 shadow-lg w-fit px-2 py-1 rounded-md hover:text-white hover:bg-blue-400"
          >
            Shorten URL
          </button>
        </form>
      </div>

      {shortUrl
        ? (
          <div class="pr-1 pl-2 items-baseline py-2 flex justify-between gap-x-2 border-dotted border-black border-2 w-fit mx-auto rounded-md shadow-lg">
            <p class="text-sm">
              {shortUrl}
            </p>
            <button
              class="bg-green-300 w-fit rounded-md px-2 py-1"
              onClick={copyToClipboard}
            >
              Copy
            </button>
          </div>
        )
        : <></>}
    </div>
  );
}

// interface FormState {
//   url: string;
//   shortUrl: string;
//   expire;
// }
