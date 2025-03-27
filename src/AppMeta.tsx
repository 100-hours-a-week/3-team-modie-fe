import { Helmet } from "react-helmet-async";

export default function AppMeta() {
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="MODiE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:image" content="https://i.ibb.co/v4W38BxK/image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta property="og:description" content="모임을 더 쉽고 편하게!" />
      <meta property="og:locale" content="ko_KR" />

      <meta name="twitter:title" content="MODiE" />
      <meta name="twitter:description" content="모임을 더 쉽고 편하게!" />
      <meta property="og:image" content="https://i.ibb.co/v4W38BxK/image.png" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, viewport-fit=cover"
      />
      <link
        rel="icon"
        href="icons/favicon.ico"
        sizes="any"
        type="image/x-icon"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="icons/apple-touch-icon-180x180.png"
        type="image/png"
      />
      <meta name="theme-color" content="#ffffff" />
      <link rel="manifest" href="/manifest.json" />
      <title>Modie</title>
    </Helmet>
  );
}
