import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  preview: {
    host: process.env.VITE_HOST || "0.0.0.0", // 컨테이너 외부 접속 허용
    port: 4173, // Vite 프리뷰 서버 포트
    strictPort: true, // 포트 충돌 시 에러 발생하도록 설정
    allowedHosts: [
      process.env.VITE_HOST || "dev.modie.site",
      "localhost",
      "0.0.0.0",
    ], // 동적으로 환경 변수 적용
  },
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
