<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
                <div class="header-content">
                    <el-button type="info" @click="goBack" class="back-button">Back</el-button>
                    <span class="text-large font-600 mr-3 title">L1M2(查询模块)</span>
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
            imageSrc: '/pictures/level1/L1M2.png', // 替换为您的图片路径
            hotspots: [
                {
                    id: '1',
                    shape: 'poly',
                    coords: '356,335,357,413,359,422,362,423,365,427,371,429,549,429,555,428,561,425,564,417,566,415,567,338,565,332,561,326,556,325,371,322,363,328,359,327',
                    href: '/l2m2m1'
                    // this is analysis
                },
                {
                    id: '2',
                    shape: 'poly',
                    coords: '355,559,356,637,358,646,361,647,364,651,370,653,548,653,554,652,560,649,563,641,565,639,566,562,564,556,560,550,555,549,370,546,362,552,358,551',
                    href: '/l2m2m4'

                    // this is executer
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '882,429,1117,429,1125,427,1131,420,1131,415,1133,408,1133,336,1129,326,1122,322,881,322,872,326,869,333,866,348,868,413,872,422,876,425',
                    href: '/l2m2m2'

                    // this is rewrite
                },
                {
                    id: '4',
                    shape: 'poly',
                    coords: '881,653,1116,653,1124,651,1130,644,1130,639,1132,632,1132,560,1128,550,1121,546,880,546,871,550,868,557,865,572,867,637,871,646,875,649',
                    href: '/l2m2m3'
                },
                {
                    id: '5',
                    shape: 'poly',
                    coords: '0,796,1,874,3,883,6,884,9,888,15,890,193,890,199,889,205,886,208,878,210,876,211,799,209,793,205,787,200,786,15,783,7,789,3,788',
                    href: '/next-level/4'
                },//存储模块
                // 更多热点区域...
            ],
            markdownText:
                `**总览**

> 完成操作请求在数据库中的分析处理和转化工作，最终实现物理存储介质中数据的操作。

**模块信息**

- 查询分析模块
    
    > 进行词法分析、语法分析和语义分析生成查询树，并且判断sql语句类型。 

- 查询重写模块
    
    > 根据已定义的规则对查询树进行重写

- 查询规划模块
    
    > 根据查询树生成查询计划

- 查询执行模块
    
    > 按照查询计划的安排，调用存储、索引、并发等功能模块，按照各个计划节点的实现算法来执行数据的读取和修改。

**数据流信息**

- 存储指令
    
    > 查询执行模块执行后向存储模块发出的指令
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
    mounted() {
        // 使用 mapster 插件，注意不需要 resize: true
        $('#mapAll').mapster({
            fillColor: '1AC4F9',
            strokeColor: "FFFFFF",
            strokeWidth: 3,
            fillOpacity: 0.6,
            singleSelect: true,
        });
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