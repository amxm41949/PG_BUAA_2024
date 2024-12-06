import { createRouter, createWebHistory } from 'vue-router';
import DataFlowPage from '../views/DataFlowPage.vue';
import NextLevelPage from '../views/NextLevelPage.vue';
import L1M2Page from '@/views/L1M2Page.vue';
import L1M4Page from "@/views/L1M4Page.vue";
import L2M4M1Page from "@/views/L2M4M1Page.vue";

const routes = [
    { path: '/', component: DataFlowPage },
    { path: '/l1m2', component: L1M2Page },
    { path: '/l1m4', component: L1M4Page },
    { path: '/l2m4m1', component: L2M4M1Page },
    { path: '/next-level/:id', component: NextLevelPage }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
