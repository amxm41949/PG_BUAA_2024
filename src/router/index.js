import { createRouter, createWebHistory } from 'vue-router';
import DataFlowPage from '../views/DataFlowPage.vue';
import NextLevelPage from '../views/NextLevelPage.vue';
import L1M2Page from '@/views/L1M2Page.vue';

const routes = [
    { path: '/', component: DataFlowPage },
    { path: '/l1m2', component: L1M2Page },
    { path: '/next-level/:id', component: NextLevelPage }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
