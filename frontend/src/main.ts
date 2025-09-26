import store from "./store";

import { createApp } from "vue";
import App from "./App.vue";
import "./style/main.scss";

(window as any).$store = store;
(window as any).$state = store.state;

createApp(App).mount("#app");
