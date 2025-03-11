import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      includeAssets: [
        "/favicon.ico",
        "/apple-touch-icon.png",
        "/mask-icon.svg",
      ],
      manifest: {
        name: "modie-client",
        short_name: "modie-client",
        display: "standalone",
        theme_color: "#00B4D8",
        icons: [
          {
            src: "/apple-touch-icon-60x60.png",
            sizes: "60x60",
            type: "image/png",
          },
          {
            src: "/apple-touch-icon-76x76.png",
            sizes: "76x76",
            type: "image/png",
          },
          {
            src: "/apple-touch-icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/apple-touch-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
    tailwindcss(),
  ],
});
