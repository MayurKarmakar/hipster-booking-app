import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'bookingApp',
      filename: 'remoteEntry.js',
      exposes: {
        './BookingForm': './src/pages/booking-form.tsx',
        './BookingList': './src/pages/booking-list.tsx',
      },
      remotes: {
        storeApp: "http://localhost:3004/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom", "react-hook-form", "zod", "@hookform/resolvers", "lucide-react", "class-variance-authority", "clsx", "tailwindcss"],
    }),
  ],
  server: {
    port: 3002,
    strictPort: true,
  },
  preview: {
    port: 3002,
    strictPort: true,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
