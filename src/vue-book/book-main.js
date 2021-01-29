import { createApp } from "vue";
import { VueBookComponents, createRoute } from "vue-book";
import { createRouter, createWebHashHistory } from "vue-router";

import AppBook from "./AppBook.vue";

const routes = [
  createRoute({
    requireContext: require.context("../components", true, /.demo.vue$/),
    path: "/demo",
  }),
  {
    path: "/:pathMatch(.*)*",
    redirect: "/demo",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(AppBook);

app.use(router);

app.use(VueBookComponents);

app.mount("#app");
