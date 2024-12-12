import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import md from './components/markdown.js';
import './views/PageStyle.css';

const app = createApp(App);

// 使用插件
app.use(ElementPlus);
app.use(router);

// 正确地将 `md` 注册到全局属性
app.config.globalProperties.$md = md;

app.mount('#app');
