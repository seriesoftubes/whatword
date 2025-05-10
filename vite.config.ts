import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import { VitePWA } from 'vite-plugin-pwa';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  test: {
    include: ['src/**/*test.ts'],
  },
  base: mode == 'production' ? "https://seriesoftubes.github.io/whatword/" : '/',
  plugins: [
    basicSsl({
      name: 'seriesoftubes',
      domains: ['seriesoftubes.github.io'],
      certDir: './certs',
    }),
    react(),
    checker({ typescript: true }),
    VitePWA({
      strategies: 'generateSW',
      injectRegister: false,
      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module'
      },
      workbox: {
        globDirectory: 'dist/',
        globPatterns: ["**/*"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        swDest: 'dist/sw.js',
        navigateFallback: 'index.html'
      },
      includeAssets: ["**/*"],
      // Updates the SW whenever a new one is detected
      registerType: 'autoUpdate',
      manifest: {
        "id": "https://seriesoftubes.github.io/whatword",
        "name": "WhatWord",
        "short_name": "WhatWord",
        "start_url": "/whatword",
        "scope": "/whatword",
        "lang": "en-US",
        "display": "standalone",
        "background_color": "#f0f0fb",
        "theme_color": "#beadff",
        "dir": "ltr",
        "orientation": "portrait",
        "categories": [
          "games"
        ],
        "screenshots": [
          {
            "src": "screenshot-1.png",
            "sizes": "1125x2436",
            "type": "image/png"
          }
        ],
        "icons": [
          {
            "purpose": "any",
            "sizes": "512x512",
            "src": "favicon-512x512.png",
            "type": "image/png"
          }
        ]
      }
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure sourcemaps are off for the generated SW in production
    sourcemap: false,
  },
}));
