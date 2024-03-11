import { Head } from "$fresh/runtime.ts";

export default function Error404(props: Error404Props) {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="min-h-screen flex justify-center items-center">
        <div class="w-full flex flex-col gap-y-1 text-center">
          <h1 class="font-bold text-2xl">404 - Page Not Found</h1>
          <p>{props.data.message}</p>
          <a href="/" class="underline">Home</a>
        </div>
      </div>
    </>
  );
}

interface Error404Props {
  data: {
    message: string;
  };
}
