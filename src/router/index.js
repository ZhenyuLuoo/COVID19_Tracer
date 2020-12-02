import { createRouter, createWebHistory } from 'vue-router';

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'Case Details',
      component: () => import ('@/views/CaseDetail')
    },
    {
      path: '/add',
      name: 'Add Case',
      component: () => import ('@/views/AddCase')
    },
    {
      path: '/modify',
      name: 'Modify Case',
      component: () => import ('@/views/ModifyCase')
    },
    {
      path: '/search',
      name: 'Search Case',
      component: () => import ('@/views/SearchCase')
    },
    {
      path: '/404',
      name: '404',
      meta: {
        hidden: true
      },
      component: () => import ('@/views/NotFound')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      meta: {
        hidden: true
      }
    }
  ]
});

// Add title for pages
router.beforeEach((to, from, next) => {
  window.document.title = to.name + ' - COVID-19 Tracer' || 'COVID-19 Tracer';
  next();
});

export default router;
