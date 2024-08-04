import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ContextProvider } from "@/context/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <Component {...pageProps} />
        </NextThemesProvider>
      </NextUIProvider>
    </ContextProvider>
  )
}
