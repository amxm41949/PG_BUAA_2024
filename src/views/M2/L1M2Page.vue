<template>
    <div class="common-layout">
        <el-container>
            <el-header>

                <div class="header-content">
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane name="first">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>L1</span>
                                </span>
                            </template>
                            <a href="/" target="_self" style="text-decoration: none; color: #ffffff;
                            font-size: 32px; font-weight: 600;">
                                回到顶层</a>
                        </el-tab-pane>
                        <el-tab-pane name="second">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M2</span>
                                </span>
                            </template>
                            <a style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">查询模块</a>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-header>
            <el-main style="padding: 20px;">
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

export default {
    data() {
        return {
            activeName: 'second',
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
                    href: '/l1m3'
                },//存储模块
                {
                    id: '6',
                    shape: 'poly',
                    coords: '367,105,555,105,561,102,565,97,567,90,567,14,564,7,556,2,552,1,367,1,362,4,359,11,355,13,355,92,358,99,363,103',
                    href: '/l1m1'
                },//连接模块
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
            highlight: false,
        });
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
};
</script>