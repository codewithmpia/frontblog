import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router'
import { usePostStore } from '@/stores/usePostStore';

const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        name: "index",
        component: () => import("@/views/IndexView.vue"),
        meta: { title: "Tous les articles | codewithmpia" }
      },
      {
        path: ":slug",
        name: "detail",
        component: () => import("@/views/DetailView.vue"),
        meta: { title: "Détail | codewithmpia" },
        beforeEnter: async (to, from, next) => {
          const postStore = usePostStore();
          await postStore.fetchPost(to.params.slug);
          if (postStore.post && Object.keys(postStore.post).length > 0) {
            next();
          } else {
            next({ name: "not-found" });
          }
        }
      }
    ]
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/ContactView.vue"),
        meta: { title: "Contact | codewithmpia" }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFoundView.vue"),
    meta: { title: "Page introuvable | codewithmpia" }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Accueil";
  next();
});

router.afterEach((to) => {
  const postStore = usePostStore();
  if (to.name === 'detail' && postStore.post) {
    document.title = `${postStore.post.title} | codewithmpia`;
  } else {
    document.title = to.meta.title || "Accueil";
  }
});

router.onError((error) => {
  if (isNavigationFailure(error)) {
    // Handle navigation failure
    console.log('Navigation failure:', error);
  } else {
    // Handle other errors
    router.push({ name: 'not-found' });
  }
});

export default router;
