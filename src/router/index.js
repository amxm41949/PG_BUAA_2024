import { createRouter, createWebHistory } from 'vue-router';
import DataFlowPage from '../views/DataFlowPage.vue';
import NextLevelPage from '../views/NextLevelPage.vue';
import L1M2Page from '@/views/L1M2Page.vue';
import L2M2M1Page from '@/views/L2M2M1Page.vue';
import L2M2M2Page from '@/views/L2M2M2Page.vue';
import L2M2M3Page from '@/views/L2M2M3Page.vue';
import L2M2M4Page from '@/views/L2M2M4Page.vue';

const routes = [
    { path: '/', component: DataFlowPage },
    { path: '/l1m2', component: L1M2Page },
    { path: '/l2m2m1', component: L2M2M1Page },
    { path: '/l2m2m2', component: L2M2M2Page },
    { path: '/l2m2m3', component: L2M2M3Page },
    { path: '/l2m2m4', component: L2M2M4Page },
    { path: '/next-level/:id', component: NextLevelPage }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
