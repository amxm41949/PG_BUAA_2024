<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
                <div class="header-content">
                    <el-button type="info" @click="goBack" class="back-button">Back</el-button>
                    <span class="text-large font-600 mr-3 title">L3M3M1M3(查询规划——预处理)</span>
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

export default {
    data() {
        return {
            active: 0,
            imageSrc: '/pictures/level3/L3M3M1M3.png', // 替换为您的图片路径
            hotspots: [
                // ...您的热点数据
                {
                    id: '1',
                    shape: 'poly',
                    coords: '39,182,247,181,259,174,261,164,262,75,254,66,249,62,35,60,24,66,23,79,21,164,24,173,30,177',
                    href: '/l2m2m2'
                },
                {
                    id: '2',
                    shape: 'poly',
                    coords: '630,943,837,943,846,945,851,951,857,959,857,1055,853,1063,848,1069,842,1073,631,1073,627,1070,621,1064,618,1057,618,959,618,952,624,947',
                    href: '/l3m2m3m2'
                },
            ],
            markdownText: `**总览**

> 预处理和优化查询，生成规划信息用于路径生成，对应于代数优化

**数据流信息**

- 查询树链表的一个子查询(一棵查询树的一个查询节点，图中省略了for each)
- 规划信息 \`PlannerInfo\`
- 提升子链接与子查询：
  - 子查询：完整语句，主要出现在FROM中
  - 子链接：表达式，主要出现在WHERE中
  - 举例展示此过程：
    - 原始：\`select d.name from dept d where d.deptno in (select e.deptno from emp e where e.sal = 1000);\`
    - 先提升子链接为子查询：\`select d.name from dept d (select e.deptno from emp e where e.sal = 1000) as sub where d.deptno = sub.deptno;\`
    - 提升子查询：\`select d.name from dept d, emp e where d.deptno = e.deptno and e.sal = 1000;\`
    - 显然，提升完成后比原意执行要高效得多
- 范围表扫描与优化：遍历查询中的所有 RTE（如表、连接等），并检查是否存在外连接（简单地说，对于连接时不匹配的项，外连接保留，内连接不保留，内连接更省时间）等，进行优化。
            `,
            // md: new MarkdownIt({
            //     html: false,        // 禁用 HTML 解析
            //     xhtmlOut: false,    // 禁用 XHTML 输出
            //     breaks: false,      // 不自动将换行符转换为 <br> 标签
            //     linkify: true,      // 自动链接 URL
            //     typographer: true,  // 启用排版功能（如引号、破折号等自动转换）
            //     validate: true      // 启用严格模式
            // })
        };
    },
    computed: {
        // 计算属性用于解析Markdown
        compiledMarkdown() {
            return this.$md.render(this.markdownText);
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