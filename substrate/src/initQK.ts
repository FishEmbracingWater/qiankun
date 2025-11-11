import { registerMicroApps, start } from "qiankun";

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
      beforeMount: async () => {
        console.log("beforeMount");
      },
      afterMount: async () => {},
    }
  );

  start();
};
