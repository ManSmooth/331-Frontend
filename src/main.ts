// import './assets/main.css'
import "./assets/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/services/AxiosInterceptorSetup";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import App from "./App.vue";
import router from "./router";
import "nprogress/nprogress.css";

const app = createApp(App);
library.add(fas, far, fab);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
