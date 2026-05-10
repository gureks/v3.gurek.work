/// <reference types="vitest/config" />
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers for smaller bundle
    target: 'es2020',
    // Enable source maps only in development
    sourcemap: false,
    // Rollup output options for optimal code splitting
    rollupOptions: {
      output: {
        // Manual chunking — keeps vendor code separate for long-term caching
        manualChunks: {
          // React core — rarely changes
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation library
          'vendor-motion': ['framer-motion', 'motion'],
          // Markdown rendering
          'vendor-markdown': ['react-markdown', 'remark-gfm', 'rehype-highlight', 'rehype-raw'],
          // State management
          'vendor-state': ['zustand'],
        },
      },
    },
    // Warn on chunks > 500kB
    chunkSizeWarningLimit: 500,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
})
