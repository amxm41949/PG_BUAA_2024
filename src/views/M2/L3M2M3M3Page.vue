<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
                <div class="header-content">
                    <el-button type="info" @click="goBack" class="back-button">Back</el-button>
                    <span class="text-large font-600 mr-3 title">L3M2M3M3(查询规划——计划生成)</span>
                </div>
                <div style="margin-top: 20px;"></div> <!-- 增加顶部空白 -->
            </el-header>
            <el-main>
                <div class="image-container">
                    <img id="mapAll" ref="mapAll" :src="imageSrc" usemap="#image-map"
                        style="width: 100%; height: 100%; object-fit: contain;" />
                    <map name="image-map" id="image-map">
                        <area v-for="hotspot in hotspots" :key="hotspot.id" :shape="hotspot.shape"
                            :coords="hotspot.coords" :href="hotspot.href" @click.prevent="navigateTo(hotspot.href)"
                            @mouseover="highlightHotspot(hotspot.id)" @mouseout="unhighlightHotspot(hotspot.id)" />
                    </map>
                </div>
                <div style="margin-top: 30px;"></div> <!-- 增加顶部空白 -->
                <el-steps style="max-width: 600px" :active="active" finish-status="success" align-center>
                    <el-step title="Step 1" />
                    <el-step title="Step 2" />
                    <el-step title="Step 3" />
                </el-steps>
                <el-button class="next-button" style="margin-top: 12px" @click="next">Next step</el-button>
                <div v-html="compiledMarkdown" class="markdown-body"></div>
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
            imageSrc: '/pictures/level3/L3M2M3M3.png', // 替换为您的图片路径
            hotspots: [
                // ...您的热点数据
                {
                    id: '1',
                    shape: 'poly',
                    coords: '82,215,292,217,303,211,307,200,309,191,307,103,305,93,296,85,82,85,72,94,69,101,70,198,73,208',
                    href: '/l3m2m3m2'
                },
                {
                    id: '2',
                    shape: 'poly',
                    coords: '1414,958,1625,958,1636,953,1639,948,1640,939,1640,837,1635,830,1629,823,1624,820,1417,819,1410,820,1404,828,1397,838,1398,940,1406,951',
                    href: '/l2m2m4'
                },
            ],
            markdownText: `**总览**

> 从路径生成计划

**数据流信息**

- 路径信息以及规划信息(Path 从规划信息中得出)
- 计划语句\`PlannedStmt\`（内含计划树\`Plan*\`）构成的计划树链表

简单来讲其实是一个逐层打包的过程

- **路径（Path）**
  - 在路径中，主要包含访问方法、成本估算、连接类型等信息。
  - 路径不包含执行逻辑或操作步骤。
- **计划树（Plan）**
  - 在计划树中，添加了执行逻辑、操作步骤、输入输出关系等。
  - 每个计划节点不仅包含操作类型，还包含执行该操作所需的参数和状态信息。
- **计划语句(PlannedStmt)**
  - 打包了额外的上下文信息，如查询的类型（\`commandType\`）、是否有返回值（\`hasReturning\`）、是否涉及角色依赖（\`dependsOnRole\`）等。
  - 包含了查询的结果关系、子查询计划、游标处理信息等

            `,
            md: new MarkdownIt({
                html: false,        // 禁用 HTML 解析
                xhtmlOut: false,    // 禁用 XHTML 输出
                breaks: false,      // 不自动将换行符转换为 <br> 标签
                linkify: true,      // 自动链接 URL
                typographer: true,  // 启用排版功能（如引号、破折号等自动转换）
                validate: true      // 启用严格模式
            })
        };
    },
    computed: {
        // 计算属性用于解析Markdown
        compiledMarkdown() {
            return this.md.render(this.markdownText);
        }
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
        goBack() {
            this.$router.go(-1)
        }
    },
    mounted() {
        $('#mapAll').mapster({
            fillColor: '1AC4F9',
            strokeColor: "FFFFFF",
            strokeWidth: 3,
            fillOpacity: 0.6,
            singleSelect: true,
        });
    }
};
</script>

<style scoped>
.common-layout {
    height: 100%;
    /* 使布局填满整个视口高度 */
}

.image-container {
    position: relative;
    width: 100%;
    height: 100%;
    /* 设置容器高度为视口高度 */
    overflow: hidden;
    /* 防止图片超出容器范围 */
}

img {
    width: 100%;
    /* 宽度始终填满容器 */
    height: 100%;
    /* 高度始终填满容器 */
    object-fit: contain;
    /* 保持图片比例，同时确保不会超出容器 */
}

.rounded-box {
    position: absolute;
    top: 20%;
    /* 顶部偏移量 */
    left: 30%;
    /* 左边偏移量 */
    width: 200px;
    /* 圆角框宽度 */
    height: 100px;
    /* 圆角框高度 */
    background-color: rgba(255, 255, 255, 0.5);
    /* 半透明白色背景 */
    border: 2px solid black;
    /* 黑色边框 */
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box-content p {
    margin: 0;
    font-size: 16px;
    color: black;
}

.header-content {
    display: flex;
    align-items: center;
    /* 垂直居中对齐 */
    justify-content: flex-start;
    gap: 10px;
    /* 按钮与标题之间的间隔 */
}

.header-content .back-button {
    line-height: 40px;
    /* 调整按钮文字的垂直对齐 */
    padding: 10px 25px;
    /* 给按钮添加适当的内边距 */
    font-size: 20px;
    /* 设置按钮的字体大小，调大文字 */
    /* 调整按钮的垂直对齐 */
}


.header-content .title {
    font-size: 40px;
    /* 增大标题的字体大小 */
    font-weight: bold;
    /* 设置标题为加粗 */
    line-height: 40px;
    /* 调整标题的垂直对齐 */
}

.next-button {
    font-size: 22px;
    /* 增大按钮文字的字体大小 */
    padding: 15px 30px;
    /* 增大按钮的内边距 */
    height: 60px;
    /* 设置按钮的高度 */
    width: 200px;
    /* 设置按钮的宽度 */
    line-height: 60px;
    /* 让文字垂直居中 */
    border-radius: 5px;
    /* 设置按钮的圆角 */
}
</style>