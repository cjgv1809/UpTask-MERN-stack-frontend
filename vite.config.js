import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react()],
    server: {
      open: true,
    },
    envDir: "./env",
    define: {
      "process.env.BACKEND_URL": JSON.stringify(env.BACKEND_URL),
    },
  });
};
