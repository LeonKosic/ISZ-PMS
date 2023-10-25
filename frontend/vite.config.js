import solid from "solid-start/vite";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [
    solid({
      ssr: false,
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000, // you can replace this port with any port
  }
});
