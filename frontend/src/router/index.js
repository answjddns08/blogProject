import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostView from "@/views/PostView.vue";
import RegisterView from "@/views/RegisterView.vue";
import aboutView from "@/views/aboutView.vue";
import NotFoundView from "@/views/notFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/posts/:folder",
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
    {
      path: "/404",
      name: "notFound",
      component: NotFoundView,
    },
    {
      path: "/:patchMatch(.*)*",
      redirect: "/404",
    },
  ],
});

export default router;
