import CartProvider from "@/context/cart.context";
import fetcher from "@/libs/fetcher";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <SWRConfig
        value={{ fetcher: (url, ...args) => fetcher({ url, ...args }) }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </CartProvider>
  );
}
