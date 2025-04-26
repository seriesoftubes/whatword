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
  plugins: [
    basicSsl(),
    react(),
    checker({ typescript: true }),
    VitePWA({
      workbox: {
        globDirectory: 'dist/',
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg}',
        ],
        swDest: 'dist/sw.js',
      },
      // Updates the SW whenever a new one is detected
      registerType: 'autoUpdate',
      manifest: {
        "id": "https://seriesoftubes.github.io/wordle",
        "name": "Wordle",
        "short_name": "Wordle",
        "start_url": "/",
        "scope": "/",
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
            "sizes": "1280x720",
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
