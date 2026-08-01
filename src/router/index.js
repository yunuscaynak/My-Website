import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    
  ],
  scrollBehavior(to, from, savedPosition) {
    // Handle scrolling correctly for in-page navigation
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth', // Use smooth scrolling
      };
    }
    return { top: 0 }; // Scroll to top
  },
})

export default router;
