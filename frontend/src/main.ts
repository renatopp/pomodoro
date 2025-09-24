import { createApp } from "vue";
import App from "./App.vue";
import "./style/main.scss";
import store, { State } from "./store";

(window as any).$store = store;
(window as any).$state = store.state;

createApp(App).mount("#app");
