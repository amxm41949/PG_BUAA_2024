<template>
    <div class="common-layout">
        <el-container>
            <el-header style="align-content: center;">
                <div class="header-content">
                    <span class="text-large font-600 mr-3 title">L0(系统总体结构)</span>
                </div>
            </el-header>

            <el-main style="padding: 10px;">
                <!-- 使用 Flexbox 布局，使图片和Markdown内容分别位于两侧 -->
                <div class="content-wrapper">
                    <!-- 图像容器，左侧 -->
                    <div class="image-container">
                        <img id="mapAll" ref="mapAll" :src="imageSrc" usemap="#image-map" class="image" />
                        <map name="image-map" id="image-map">
                            <area v-for="hotspot in hotspots" :key="hotspot.id" :shape="hotspot.shape"
                                :coords="hotspot.coords" :href="hotspot.href" @click.prevent="navigateTo(hotspot.href)"
                                @mouseover="highlightHotspot(hotspot.id)" @mouseout="unhighlightHotspot(hotspot.id)" />
                        </map>

                        <!-- 步骤条和按钮放到同一个容器 -->
                        <div class="steps-button-container">
                            <el-steps :active="active" finish-status="success" align-center style="width: 100%;">
                                <el-step title="Step 1" />
                                <el-step title="Step 2" />
                                <el-step title="Step 3" />
                            </el-steps>

                            <el-button class="next-button" style="margin-top: 20px;" @click="next">
                                Next step
                            </el-button>
                        </div>
                    </div>

                    <!-- Markdown 内容容器，右侧 -->
                    <div class="markdown-container">
                        <div v-html="compiledMarkdown" class="markdown-body"></div>
                    </div>
                </div>

                <!-- 圆角框，仅在 Step 1 完成时显示 -->
                <div v-if="active >= 1" class="rounded-box">
                    <div class="box-content">
                        <p>Some Text</p>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import $ from 'jquery';
import 'imagemapster';
import MarkdownIt from 'markdown-it';

export default {
    data() {
        return {
            active: 0,
            imageSrc: '/pictures/level0/L0.png', // 替换为您的图片路径
            hotspots: [
                // ...您的热点数据
                {
                    id: '4',
                    shape: 'poly',
                    coords: '74,455,382,455,398,451,401,441,406,439,406,427,408,413,408,298,403,288,398,282,393,277,384,275,75,274,65,275,56,279,51,285,47,292,46,429,49,439,58,449,66,454', // Y 坐标减去 15
                    href: '/l1m1'
                },
                {
                    id: '1',
                    shape: 'poly',
                    coords: '75,844,383,844,399,840,402,830,407,828,407,816,409,802,409,687,404,677,399,671,394,666,385,664,76,663,66,664,57,668,52,674,48,681,47,818,50,828,59,838,67,843',
                    href: '/l1m2'
                },
                {
                    id: '2',
                    shape: 'poly',
                    coords: '74,1230,382,1230,398,1226,401,1216,406,1214,406,1202,408,1188,408,1073,403,1063,398,1057,393,1052,384,1050,75,1049,65,1050,56,1054,51,1060,47,1067,46,1204,49,1214,58,1224,66,1229',
                    href: '/l1m5'
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '948,841,1256,841,1272,837,1275,827,1280,825,1280,813,1282,799,1282,684,1277,674,1272,668,1267,663,1258,661,949,660,939,661,930,665,925,671,921,678,920,815,923,825,932,835,940,840',
                    href: '/l1m4'
                },
            ],
            markdownText:
                `**流程图**
  
  ![img](https://s21.ax1x.com/2024/12/06/pA79Al6.png)
  
  **总览**
  
  > PostgreSQL 数据库是一种几乎可以运行在各种平台上的免费开源对象关系数据库，它是一种以关系型数据库和 SQL 为基础，扩展了抽象数据类型，从而具备面向对象特性的数据库。PostgreSQL 数据库主要由连接模块、查询模块、存储模块、事务模块四部分组成。
  
  **模块信息**
  
  - 连接模块
      
      > 接受外部操作对系统的请求，对操作请求进行预处理和分发，起系统逻辑控制作用。
  
  - 查询模块
  
      > 完成操作请求在数据库中的分析处理和转化工作，最终实现物理存储介质中数据的操作。
  
  - 事务模块：
  
      > 负责存储和管理物理数据，提供对编译查询系统的支持。
  
  - 存储模块：
  
      > 完成对操作请求处理的事务一致性支持，提供对并发访问数据的一致性支持。
  
  **数据流信息**
  
  - 日志
  
      > 写日志信息，日志恢复请求，如ereport。
  
  - 锁请求
  
      > 获取、释放锁请求。
  
  - 事务指令
  
      > 调用事务模块相关处理函数，如BeginTransactionBlock、RequireTransactionBlock、RollbackToSavepoint等。
  
  - 内存指令
      
      > 调用的内存模块相关处理函数，如AlterTable、DefineIndex、RemoveRelations等。
              `,
            md: new MarkdownIt({
                html: false,
                xhtmlOut: false,
                breaks: false,
                linkify: true,
                typographer: true,
                validate: true,
            }),
        };
    },
    computed: {
        compiledMarkdown() {
            return this.md.render(this.markdownText);
        },
    },
    methods: {
        next() {
            if (this.active++ > 2) this.active = 0;
        },
        navigateTo(url) {
            this.$router.push(url); // 使用Vue Router进行导航
        },
        highlightHotspot(id) {
            const $map = $('#mapAll');
            $map.mapster('highlight', true, id); // 高亮显示热点
        },
        unhighlightHotspot(id) {
            const $map = $('#mapAll');
            $map.mapster('set', false, id); // 取消高亮显示
        },
    },
    mounted() {
        $('#mapAll').mapster({
            fillColor: '1AC4F9',
            strokeColor: 'FFFFFF',
            strokeWidth: 3,
            fillOpacity: 0.6,
            singleSelect: true,
        });
    },
};
</script>

<style scoped>
/* 炫酷暗黑主题 */
.common-layout {
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg, #2a2a2a, #111111);
    /* 渐变灰黑色背景 */
    color: #f0f0f0;
    /* 浅灰色文字 */
    font-family: 'Roboto', sans-serif;
}

.content-wrapper {
    display: flex;
    justify-content: space-between;
    /* 图片和文字左右分布 */
    align-items: flex-start;
    gap: 20px;
    /* 图片和文字之间的间距 */
    margin-top: 20px;
    width: 100%;
}

.image-container {
    width: 50%;
    /* 图片部分占一半宽度 */
    display: flex;
    flex-direction: column;
    /* 让图片和步骤排列成垂直布局 */
    align-items: center;
    /* 水平居中对齐 */
    position: relative;
}

.image {
    max-width: 100%;
    max-height: 100vh;
    /* 限制最大高度，避免过大 */
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
    /* 增加阴影效果 */
}

.steps-button-container {
    width: 100%;
    background: linear-gradient(135deg, #2d2d2d, #272727);
    /* 渐变效果 */
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
}

.next-button {
    font-size: 22px;
    padding: 15px 30px;
    height: 60px;
    width: 200px;
    line-height: 60px;
    border-radius: 5px;
    background: linear-gradient(135deg, #4e5d6b, #3c444e);
    /* 渐变按钮背景：深灰蓝色到深灰色 */
    color: #f0f0f0;
    /* 浅灰色文字，确保在暗黑背景下清晰可见 */
    border: none;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    /* 增加按钮阴影，增强立体感 */
    transition: all 0.3s ease;
    /* 平滑过渡效果 */
}

.next-button:hover {
    background: linear-gradient(135deg, #3c444e, #4e5d6b);
    /* 鼠标悬停时按钮背景渐变反转 */
    transform: scale(1.05);
    /* 悬停时按钮略微放大 */
}

.markdown-container {
    width: 50%;
    /* 文字部分占一半宽度 */
    max-height: 100vh;
    /* 设置最大高度 */
    overflow-y: auto;
    /* 超出部分可滚动 */
    padding: 20px;
    border: 1px solid #444;
    /* 边框颜色为深灰色 */
    border-radius: 8px;
    background-color: #333;
    /* 深灰色背景 */
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
    /* 增加阴影效果 */
}

.markdown-container::-webkit-scrollbar {
    width: 0;
    /* 不显示滚动条 */
    height: 0;
}

.rounded-box {
    position: absolute;
    top: 20%;
    left: 30%;
    width: 200px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.1);
    /* 半透明背景 */
    border: 2px solid #666;
    /* 边框为浅灰色 */
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 1.5s infinite;
    /* 动画效果：轻微脉动 */
}

.box-content p {
    margin: 0;
    font-size: 16px;
    color: #e0e0e0;
    /* 浅灰色文字 */
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.header-content .title {
    font-size: 40px;
    font-weight: bold;
    line-height: 40px;
    color: #e0e0e0;
    /* 标题文字颜色 */
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    /* 标题文字阴影效果 */
}


@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}
</style>