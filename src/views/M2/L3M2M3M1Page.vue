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
                            font-weight: 600;">回到顶层</a>
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
                                    <span>M1</span>
                                </span>
                            </template>
                            <a style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">预处理模块</a>
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
            imageSrc: '/pictures/level3/L3M2M3M1.png', // 替换为您的图片路径
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