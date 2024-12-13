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
/* 基本页面布局 */
html,
body {
  height: 100%;
  font-family: 'Roboto', sans-serif;
  /* 使用现代化的字体 */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 全局暗黑模式背景 */
body {
  background-color: #121212;
  /* 深灰背景，避免纯黑 */
  color: #e0e0e0;
  /* 浅灰色文字，减轻视觉压力 */
}

/* 主容器，垂直居中 */
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #2a2a2a, #111111);
  color: #e0e0e0;
  /* 浅灰文字 */
  padding: 15px;
  box-sizing: border-box;
}

/* 图片或canvas居中样式 */
canvas {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 20px auto;
}

/* Markdown 样式 */
.markdown-body {
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  color: #f1f1f1;
  /* 浅灰文字 */
  background-color: #1e1e1e;
  /* 深灰背景 */
  font-size: 16px;
  line-height: 1.6;
  /* 提升可读性 */
  border-radius: 8px;
  /* 圆角 */
}

/* 小屏幕下保持适配 */
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
    font-size: 14px;
    /* 字体在小屏幕上适度缩小 */
  }
}

/* 表格样式 */
.markdown-body th,
.markdown-body td {
  padding: 10px;
  border: 1px solid #444;
  /* 深灰色边框 */
}

.markdown-body table tr:nth-child(even) {
  background-color: #333 !important;
  /* 偶数行使用深色背景 */
}

.markdown-body tr:nth-child(odd) {
  background-color: #1e1e1e;
  /* 奇数行使用更深色背景 */
}

.markdown-body table th {
  background-color: #444 !important;
  /* 表头使用暗灰色背景 */
  font-weight: bold;
  text-align: left;
  /* 表头左对齐 */
}

/* 引用样式 */
.markdown-body blockquote {
  color: #dcdcdc;
  /* 修改引用字体为较亮的灰色 */
  border-left: 4px solid #4caf50;
  /* 引用边框颜色 */
  padding-left: 15px;
  margin: 10px 0;
}

/* 链接样式 */
.markdown-body a {
  color: #4caf50;
  /* 链接颜色为绿色 */
  text-decoration: none;
  /* 去掉下划线 */
}

.markdown-body a:hover {
  color: #81c784;
  /* 悬浮时变为浅绿色 */
  text-decoration: underline;
  /* 悬浮时加下划线 */
}

.markdown-body pre {
  background-color: #2d2d2d;   /* 深色背景 */
  color: #f8f8f2;              /* 浅色文字 */
  padding: 15px;               /* 内边距 */
  border-radius: 8px;          /* 圆角边框 */
  overflow-x: auto;            /* 滚动条支持 */
  font-size: 14px;             /* 合适的字体大小 */
  line-height: 1.6;            /* 提升可读性 */
  margin: 20px 0;              /* 外边距 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);  /* 阴影效果 */
}

/* 鼠标悬停样式 */
.markdown-body pre:hover {
  background-color: #3d3d3d;  /* 更深背景色 */
}

.markdown-body pre::-webkit-scrollbar {
  height: 8px;                 /* 滚动条高度 */
}

.markdown-body pre::-webkit-scrollbar-track {
  background: #1e1e1e;         /* 滚动条轨道背景（暗色） */
  border-radius: 8px;          /* 圆角轨道 */
}

.markdown-body pre::-webkit-scrollbar-thumb {
  background: #555;            /* 滚动条滑块背景（灰色） */
  border-radius: 8px;          /* 圆角滑块 */
}

.markdown-body pre::-webkit-scrollbar-thumb:hover {
  background: #888;            /* 悬停时变浅 */
}

.markdown-body pre::-webkit-scrollbar-corner {
  background: #1e1e1e;         /* 角部背景（暗色） */
}

/* 输入框样式 */
input,
textarea {
  background-color: #333;
  /* 输入框深色背景 */
  color: #e0e0e0;
  /* 浅灰色文字 */
  border: 1px solid #444;
  /* 深灰色边框 */
  padding: 12px;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #81c784;
  /* 聚焦时，边框变为绿色 */
  box-shadow: 0 0 5px #81c784;
  /* 聚焦时，添加绿色阴影 */
}

/* 响应式设计 */
@media (max-width: 767px) {
  #app {
    padding: 10px;
  }

  .markdown-body {
    padding: 20px;
  }
}
</style>