import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="pt-br">
    <Head />
    <body>
      <Main  />
      <NextScript />
      <Script
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        strategy="beforeInteractive"
        type="module"
      />
      <Script
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        strategy="beforeInteractive"
      />
    </body>
  </Html>
  );
}
