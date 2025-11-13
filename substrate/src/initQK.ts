import { registerMicroApps, start } from "qiankun";

// 子应用路径映射
const appPathMap: Record<string, string> = {
  react: "/my-react/",
  vue: "/my-vue/",
};

// 禁用指定子应用的样式
function disableAppStyles(appName: string) {
  const appPath = appPathMap[appName];
  if (!appPath) return;

  const viteStyles = document.querySelectorAll<HTMLStyleElement>(
    `style[data-vite-dev-id]`
  );

  viteStyles.forEach((style) => {
    const devId = style.getAttribute("data-vite-dev-id");
    if (devId && devId.includes(appPath)) {
      // 禁用样式而不是删除
      style.disabled = true;
      // 添加标记，方便后续识别
      style.setAttribute("data-qiankun-app", appName);
      console.log("禁用样式:", devId);
    }
  });
}

// 启用指定子应用的样式
function enableAppStyles(appName: string) {
  const styles = document.querySelectorAll<HTMLStyleElement>(
    `style[data-qiankun-app="${appName}"]`
  );

  styles.forEach((style) => {
    style.disabled = false;
    const devId = style.getAttribute("data-vite-dev-id");
    console.log("启用样式:", devId);
  });
}

export const initQK = () => {
  registerMicroApps(
    [
      {
        name: "react",
        entry: "http://localhost:10000",
        container: "#container",
        activeRule: "/react",
      },
      {
        name: "vue",
        entry: "http://localhost:10001",
        container: "#container",
        activeRule: "/vue",
      },
    ],
    {
      beforeLoad: async () => {
        console.log("beforeLoad");
      },
      beforeMount: async (app) => {
        console.log("beforeMount", app.name);
        // 只在开发环境处理 Vite 注入的样式
        if (import.meta.env.DEV) {
          enableAppStyles(app.name);
        }
      },
      afterMount: async () => {},
      beforeUnmount: async (app) => {
        console.log("beforeUnmount", app.name);
      },
      afterUnmount: async (app) => {
        console.log("afterUnmount", app.name);

        // 清理容器内的所有 style 标签
        const container = document.querySelector("#container");
        if (container) {
          const styles = container.querySelectorAll("style");
          styles.forEach((style) => style.remove());
        }

        // 只在开发环境处理 Vite 注入的样式（生产环境 qiankun 会自动管理 link 标签）
        if (import.meta.env.DEV) {
          disableAppStyles(app.name);
        }
      },
    }
  );

  start({
    sandbox: {
      // 使用严格样式隔离，会使用 Shadow DOM 完全隔离样式
      // strictStyleIsolation: true,
      // 或者同时开启实验性样式隔离作为降级方案
      experimentalStyleIsolation: true,
    },
  });
};
