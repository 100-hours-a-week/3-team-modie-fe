import { Helmet } from "react-helmet-async";

export default function AppMeta() {
  return (
    <Helmet>
      <meta charSet="UTF-8" />
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
