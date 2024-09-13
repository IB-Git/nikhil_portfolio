import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <body>
      <Head>
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self';" />
      </Head>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
