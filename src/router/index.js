import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostView from "@/views/PostView.vue";
import RegisterView from "@/views/RegisterView.vue";
import aboutView from "@/views/aboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/post/:folder",
      name: "post",
      component: PostView,
    },
    {
      path: "/about",
      name: "about",
      component: aboutView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
  ],
});

export default router;
