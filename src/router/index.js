import { createRouter, createWebHistory } from 'vue-router';
import DataFlowPage from '../views/DataFlowPage.vue';
import NextLevelPage from '../views/NextLevelPage.vue';
import L1M1Page from '@/views/M1/L1M1Page.vue';
import L1M2Page from '@/views/M2/L1M2Page.vue';
import L1M4Page from "@/views/M4/L1M4Page.vue";
import L1M3Page from '@/views/M3/L1M3Page.vue';
import L2M2M1Page from '@/views/M2/L2M2M1Page.vue';
import L2M2M2Page from '@/views/M2/L2M2M2Page.vue';
import L2M2M3Page from '@/views/M2/L2M2M3Page.vue';
import L2M2M4Page from '@/views/M2/L2M2M4Page.vue';

import L2M3M1Page from '@/views/M3/L2M3M1Page.vue';
import L2M3M2Page from '@/views/M3/L2M3M2Page.vue';
import L2M3M2M1Page from '@/views/M3/L2M3M2M1Page.vue';
import L2M3M3Page from '@/views/M3/L2M3M3Page.vue';
import L2M3M3M1Page from '@/views/M3/L2M3M3M1Page.vue';
import L2M3M3M2Page from '@/views/M3/L2M3M3M2Page.vue';
import L2M3M3M4Page from '@/views/M3/L2M3M3M4Page.vue';

import L2M4M1Page from "@/views/M4/L2M4M1Page.vue";
import L2M4M2Page from "@/views/M4/L2M4M2Page.vue";
import L2M4M3Page from "@/views/M4/L2M4M3Page.vue";
import L3M2M3M1Page from '@/views/M2/L3M2M3M1Page.vue';
import L3M2M3M2Page from '@/views/M2/L3M2M3M2Page.vue';
import L3M2M3M3Page from '@/views/M2/L3M2M3M3Page.vue';
import L3M3M1M1Page from '@/views/M3/L3M3M1M1Page.vue';
import L3M3M1M2Page from '@/views/M3/L3M3M1M2Page.vue';
import L3M3M1M3Page from '@/views/M3/L3M3M1M3Page.vue';
import L3M4M1M1Page from "@/views/M4/L3M4M1M1Page.vue";
import L3M4M1M2Page from "@/views/M4/L3M4M1M2Page.vue";
import L3M4M2M1Page from "@/views/M4/L3M4M2M1Page.vue";
import L4M2M3M2M1Page from '@/views/M2/L4M2M3M2M1Page.vue';
import L4M4M1M2M1Page from "@/views/M4/L4M4M1M2M1Page.vue";

const routes = [
    { path: '/', component: DataFlowPage },
    { path: '/l1m1', component: L1M1Page },
    { path: '/l1m2', component: L1M2Page },
    { path: '/l1m3', component: L1M3Page },
    { path: '/l1m4', component: L1M4Page },
    { path: '/l2m2m1', component: L2M2M1Page },
    { path: '/l2m2m2', component: L2M2M2Page },
    { path: '/l2m2m3', component: L2M2M3Page },
    { path: '/l2m2m4', component: L2M2M4Page },

    { path: '/l2m3m1', component: L2M3M1Page },
    { path: '/l2m3m2', component: L2M3M2Page },
    { path: '/l2m3m2m1', component: L2M3M2M1Page },
    { path: '/l2m3m3', component: L2M3M3Page },
    { path: '/l2m3m3m1', component: L2M3M3M1Page },
    { path: '/l2m3m3m2', component: L2M3M3M2Page },
    { path: '/l2m3m3m4', component: L2M3M3M4Page },
    
    { path: '/l2m4m1', component: L2M4M1Page },
    { path: '/l2m4m2', component: L2M4M2Page },
    { path: '/l2m4m3', component: L2M4M3Page },
    { path: '/l3m2m3m1', component: L3M2M3M1Page },
    { path: '/l3m2m3m2', component: L3M2M3M2Page },
    { path: '/l3m2m3m3', component: L3M2M3M3Page },
    { path: '/l3m3m1m1', component: L3M3M1M1Page },
    { path: '/l3m3m1m2', component: L3M3M1M2Page },
    { path: '/l3m3m1m3', component: L3M3M1M3Page },
    { path: '/l3m4m1m1', component: L3M4M1M1Page },
    { path: '/l3m4m1m2', component: L3M4M1M2Page },
    { path: '/l3m4m2m1', component: L3M4M2M1Page },
    { path: '/l4m2m3m2m1', component: L4M2M3M2M1Page },
    { path: '/l4m4m1m2m1', component: L4M4M1M2M1Page },
    { path: '/next-level/:id', component: NextLevelPage }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
