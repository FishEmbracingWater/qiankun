declare module "vite-plugin-qiankun/dist/helper" {
  export const qiankunWindow: any;
  export function renderWithQiankun(lifecycles: any): void;
  export type QiankunProps = Record<string, any>;
}
