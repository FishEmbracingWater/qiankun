/**
 * @description
 * vite-plugin-qiankun通过去除入口文件中script[module]，改为import异步导入来支持qiankun
 * qiankun 每个应用的全局都是独立的proxy，
 * vite-plugin-qiankun的修改可能会导致vite插件在入口文件中修改失效，特别是对window操作
 */

import { load } from "cheerio";

const appendBase =
  "(window.proxy ? (window.proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + '..') : '') + ";

const createImport = (src, callback) =>
  `import(${appendBase}'${src}').then(${callback})`;

/**
 * vite-plugin-qiankun导致react-refresh失效
 * 参考
 * url:https://github.com/tengmaoqing/vite-plugin-qiankun/pull/21/files
 */
const createEntry = (window) => `
let RefreshRuntime;
${createImport(
  "/@react-refresh",
  `(module) => {
  RefreshRuntime=module.default
  RefreshRuntime.injectIntoGlobalHook(${window})
}`
)}`;

const injectIntoGlobalHook = () =>
  `${createImport(
    "/plugins/injectHtml/helper",
    `(module) => {
   const globalWindow = module.globalWindow
   ${createEntry("globalWindow")}
}`
  )}`;

/**
 * 注入vite-plugin-checker,qiankun不支持 module属性的script标签
 */
const injectChecker = () => `
  ${createImport(
    "/@vite-plugin-checker-runtime",
    `(module) => {
    const inject=module.inject
    inject({
      overlayConfig: {},
      base: "/",
    })
  }`
  )}`;

export default function injectHtml() {
  return {
    name: "vite-qiankun-inject-html",
    enforce: "post",
    apply: "serve",
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          const end = res.end.bind(res);
          res.end = (...args) => {
            let [htmlStr, ...rest] = args;
            if (typeof htmlStr === "string") {
              const $ = load(htmlStr);
              const scripts = $("script[type=module]");
              if (scripts?.length) {
                scripts.each((_, moduleTag) => {
                  const script$ = $(moduleTag);
                  if (script$.html().includes("react-refresh")) {
                    script$.removeAttr("type").empty();
                    script$.html(injectIntoGlobalHook());
                    htmlStr = $.html();
                  }
                  if (script$.html().includes("checker")) {
                    script$.removeAttr("type").empty();
                    script$.html(injectChecker());
                    htmlStr = $.html();
                  }
                });
              }
            }
            return end(htmlStr, ...rest);
          };
          next();
        });
      };
    },
  };
}
