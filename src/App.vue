<template>
  <div id="app">
    <!-- 这里是路由的容器，所有的页面组件会渲染到这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import 'github-markdown-css';
export default {
  name: 'App'
};

</script>
<style>
/* Reset 浏览器默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 使页面布局更加适应 */
html,
body {
  height: 100%;
  font-family: Arial, sans-serif;
}

/* 为整个应用提供一个容器样式 */
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  /* 背景色可根据需要调整 */
}

/* 添加canvas容器样式，确保canvas居中并自适应 */
canvas {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 20px auto;
  /* 上下居中 */
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 1250px;
  margin: 0 auto;
  padding: 45px;
  color: #333;
  /* 亮色主题的字体颜色 */
  background-color: #fff;
  /* 亮色主题的背景颜色 */
  font-size: 30px;
  /* 字体大小调整为原来的两倍 */
}

/* 媒体查询保持不变 */
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
    font-size: 16px;
    /* 在小屏幕上也保持字体大小为原来的两倍 */
  }
}
</style>
