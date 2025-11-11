import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import qiankun from "vite-plugin-qiankun";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 名称需与宿主里 registerMicroApps 的 name 保持一致
    qiankun("vue", {
      useDevMode: true, // 开发模式下修复 @vite/client 模块脚本加载
    }),
  ],
  server: {
    port: 10001,
    cors: true,
    origin: "http://localhost:10001",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    // hmr: {
    //   protocol: "ws",
    //   host: "localhost",
    //   port: 10001,
    //   clientPort: 10001,
    //   overlay: false,
    // },
  },
});
