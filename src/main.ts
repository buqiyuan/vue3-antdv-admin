import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { setAuthExpiredHandler } from "./auth/token";
import { i18n } from "./locales";
import { router } from "./router";
import { bindRouter, useUserStore } from "./stores/user";
import "./styles/globals.css";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(i18n);
app.use(router);

bindRouter(router);
setAuthExpiredHandler(() => {
  useUserStore().resetSession();
  if (router.currentRoute.value.name !== "Login") {
    void router.replace({
      name: "Login",
      query: { redirect: router.currentRoute.value.fullPath },
    });
  }
});

app.mount("#app");
