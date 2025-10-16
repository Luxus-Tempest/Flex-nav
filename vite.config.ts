import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { copyFileSync, readFileSync, writeFileSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'fix-popup-html',
      closeBundle() {
        try {
          // Copy popup.html to root
          copyFileSync('dist/src/popup/index.html', 'dist/popup.html');
          
          // Fix paths in popup.html
          let content = readFileSync('dist/popup.html', 'utf-8');
          content = content.replace(/src="\/popup\.js"/g, 'src="./popup.js"');
          content = content.replace(/href="\/constants\.js"/g, 'href="./constants.js"');
          content = content.replace(/href="\/index\.css"/g, 'href="./index.css"');
          writeFileSync('dist/popup.html', content);
        } catch (err) {
          console.error('Error fixing popup.html:', err);
        }
      }
    }
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup/index.html"),
        background: resolve(__dirname, "src/background/background.ts"),
        content: resolve(__dirname, "src/content/content.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
