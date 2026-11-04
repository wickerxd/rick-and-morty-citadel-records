import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Index.vue"),
    meta: { title: "C-137 Explorer" },
  },
  {
    path: "/characters",
    name: "characters",
    component: () => import("@/views/Characters.vue"),
    meta: { title: "Characters · C-137 Explorer" },
  },
  {
    path: "/characters/:characterId",
    name: "character-detail",
    component: () => import("@/views/SelectedCharacter.vue"),
    meta: { title: "Character · C-137 Explorer" },
  },
  {
    path: "/episodes",
    name: "episodes",
    component: () => import("@/views/Episodes.vue"),
    meta: { title: "Episodes · C-137 Explorer" },
  },
  {
    path: "/locations",
    name: "locations",
    component: () => import("@/views/Locations.vue"),
    meta: { title: "Locations · C-137 Explorer" },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),
    meta: { title: "About · C-137 Explorer" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFound.vue"),
    meta: { title: "Page not found · C-137 Explorer" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.afterEach((to) => {
  document.title =
    typeof to.meta.title === "string"
      ? to.meta.title
      : "C-137 Explorer";
});

export default router;
