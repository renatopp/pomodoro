import { createApp } from "vue";
import App from "./App.vue";
import "./style/main.scss";
import store from "./store";

(window as any).store = store;
createApp(App).mount("#app");
