import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  qiankunWindow,
  renderWithQiankun,
  type QiankunProps,
} from "vite-plugin-qiankun/dist/helper";

let root: Root | null = null;

function render(props: QiankunProps) {
  const { container } = props as { container: HTMLElement };

  root = createRoot(container.querySelector("#root")!);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

renderWithQiankun({
  mount(props) {
    console.log("mount", props);
    render(props);
  },
  bootstrap() {},
  unmount() {
    root?.unmount();
  },
  update() {},
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({
    container: document as unknown as HTMLElement,
  });
}
