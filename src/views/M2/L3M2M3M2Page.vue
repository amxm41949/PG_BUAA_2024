<template>
    <div class="common-layout">
        <el-container>
            <el-header>

                <div class="header-content">
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane name="first">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>L3</span>
                                </span>
                            </template>
                            <a href="/" target="_self" style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">现在位于&nbsp;&nbsp;&nbsp;&nbsp;第 3 层</a>
                        </el-tab-pane>
                        <el-tab-pane name="second">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M2</span>
                                </span>
                            </template>
                            <a href="/l1m2" target="_self" style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">查询模块</a>
                        </el-tab-pane>
                        <el-tab-pane name="third">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M3</span>
                                </span>
                            </template>
                            <a href="/l2m2m3" target="_self" style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">查询规划模块</a>
                        </el-tab-pane>
                        <el-tab-pane name="fourth">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M2</span>
                                </span>
                            </template>
                            <a style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">路径生成模块</a>
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
            activeName: 'fourth',
            active: 0,
            imageSrc: '/pictures/level3/L3M2M3M2.png', // 替换为您的图片路径
            hotspots: [
                // ...您的热点数据
                {
                    id: '1',
                    shape: 'poly',
                    coords: '135,246,341,245,353,245,357,237,360,230,361,134,357,122,350,119,343,115,140,115,131,118,123,127,121,130,121,227,125,239',
                    href: '/l3m2m3m1'
                },
                {
                    id: '2',
                    shape: 'poly',
                    coords: '560,1726,766,1725,778,1725,782,1717,785,1710,786,1614,782,1602,775,1599,768,1595,565,1595,556,1598,548,1607,546,1610,546,1707,550,1719',
                    href: '/l3m2m3m3'
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '865,1157,1278,1156,1290,1149,1294,1140,1295,1032,1289,1024,1279,1017,861,1017,845,1024,844,1034,845,1141,850,1151,858,1154',
                    href: '/l4m2m3m2m1'
                },
            ],
            markdownText: `**总览**

> 生成最优路径和候选路径

**数据流信息**

- 规划信息PlannerInfo
- 带有路径信息RelOptInfo的规划信息 

> - 集合：指交并差INTERSECT/UNION/MINUS，是这些操作则需要使用集合规划器进行规划

> - 路径键：查询结果的排序顺序。主要作用是帮助优化器确定查询计划中各个步骤的输出是否已经排序，以及排序的顺序是什么

> - 初步路径规划：只考虑如何扫描以及如何连接等基础操作，会生成所有可行路径，其中最优路径带有cheapest标签。物理优化集中于此处。
            `,
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
            highlight: false,
        });
    }
};
</script>