import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: {
    server: {
      port: 3000,
      http: true,
      hmr: {
        clientPort: 3003,
      },
      watch: {
        usePolling: false,
      },
    }
  },
},
);
