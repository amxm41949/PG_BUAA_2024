import { createRouter, createWebHistory } from 'vue-router';
import DataFlowPage from '../views/DataFlowPage.vue';
import NextLevelPage from '../views/NextLevelPage.vue';

const routes = [
    { path: '/', component: DataFlowPage },
    { path: '/next-level/:id', component: NextLevelPage }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
