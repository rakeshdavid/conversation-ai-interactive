import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Makes Vercel environment variables accessible in client code
      // The value must be JSON.stringified to be treated as a string literal by Vite.
      __APP_ENV__: JSON.stringify(process.env.VITE_VERCEL_ENV || 'development'),
    },
    build: {
      sourcemap: !isProduction,
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [
              'react', 
              'react-dom',
              '@daily-co/daily-js',
              '@daily-co/daily-react',
              'framer-motion'
            ],
            ui: [
              '@radix-ui/react-select',
              '@radix-ui/react-slot',
              '@radix-ui/react-toast',
              'class-variance-authority',
              'clsx',
              'lucide-react',
              'tailwind-merge',
              'tailwindcss-animate'
            ]
          }
        }
      }
    },
  }
})
