import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv, lazyPlugins, type ESBuildOptions } from "vite-plus";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    fmt: {},
    lint: {
      ignorePatterns: ["dist/**", "src/api/backend/**"],
      jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
      rules: { "vite-plus/prefer-vite-plus-imports": "error" },
      options: { typeAware: true, typeCheck: true },
    },
    base: env.VITE_BASE_URL || "/",
    plugins: lazyPlugins(() => [vue(), tailwindcss()]),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 8088,
      proxy: {
        "/api": {
          target: env.VITE_API_PROXY_TARGET || "http://127.0.0.1:7001",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    esbuild: {
      drop: env.VITE_DROP_CONSOLE === "true" ? ["debugger"] : undefined,
      pure: env.VITE_DROP_CONSOLE === "true" ? ["console.log"] : undefined,
    } as ESBuildOptions,
  };
});
