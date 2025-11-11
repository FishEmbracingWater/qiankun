import { createApp, type App as VueApp } from "vue";
import "./style.css";
import App from "./App.vue";
// @ts-ignore
import {
  qiankunWindow,
  renderWithQiankun,
  type QiankunProps,
} from "vite-plugin-qiankun/dist/helper";

let app: VueApp<Element> | null = null;

function render(props: QiankunProps) {
  const { container } = (props || {}) as { container?: HTMLElement };
  const root = (container || document).querySelector("#app") as Element;
  app = createApp(App);
  app.mount(root);
}

renderWithQiankun({
  bootstrap() {},
  mount(props: QiankunProps) {
    render(props);
  },
  unmount() {
    app?.unmount();
    app = null;
  },
  update() {},
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({} as QiankunProps);
}
