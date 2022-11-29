import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";
import VueClickAway from "vue3-click-away";
import router from "./router/router";

// Icon css
import "./css/icon.css";
import "./css/tooltip.css";
const eventBus = mitt();
const app = createApp(App);
app.use(VueClickAway);
app.use(router);
app.config.globalProperties.eventBus = eventBus;
app.mount("#app");
