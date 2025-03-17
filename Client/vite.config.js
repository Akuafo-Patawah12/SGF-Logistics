import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import visualizer from "rollup-plugin-visualizer";
import compression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    visualizer({
      filename: "stats.html", // Output file for visualization
      open: true, // Automatically open the report in the browser
      gzipSize: true, // Show gzip size
      brotliSize: true, // Show brotli size
    }), 
    svgr({
      svgrOptions: {
        icon: true, // Optional: Treat SVGs as icons
      },
    }),
    compression({ algorithm: 'gzip' }), // Enable Gzip compression
    compression({ algorithm: 'brotliCompress' }) // Enable Brotli compression
  ],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendors': ['react', 'react-dom'], // Example chunk splitting
          'mapbox': ['mapbox-gl']
        }
      }
    }
  }
 
})
