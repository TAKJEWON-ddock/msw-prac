import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 


async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  return worker.start();
}

enableMocking().then(() => {
  // Register all Community features
  ModuleRegistry.registerModules([AllCommunityModule]);
  
  const app = createApp(App);
  app.use(Antd);
  app.use(router);
  app.mount("#app");
});
