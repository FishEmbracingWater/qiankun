import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import qiankun from "vite-plugin-qiankun";
import injectHtml from "./plugins/injectHtml";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: false,
      },
    }),
    // 修复 qiankun 环境下 React Fast Refresh 失效的问题
    injectHtml(),
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
