import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import qiankun from "vite-plugin-qiankun";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 名称需与宿主里 registerMicroApps 的 name 保持一致
    qiankun("react", {
      useDevMode: true, // 开发模式下修复 @vite/client 模块脚本加载
    }),
  ],
  server: {
    port: 10000,
    cors: true,
    origin: "http://localhost:10000",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
