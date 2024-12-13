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
                                    <span>M3</span>
                                </span>
                            </template>
                            <a href="/l1m3" target="_self" style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">存储模块</a>
                        </el-tab-pane>
                        <el-tab-pane name="third">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M1</span>
                                </span>
                            </template>
                            <a href="/l2m3m1" target="_self" style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">索引管理模块</a>
                        </el-tab-pane>
                        <el-tab-pane name="fourth">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M2</span>
                                </span>
                            </template>
                            <a style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">索引创建模块</a>
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
            imageSrc: '/pictures/level3/L3M3M1M2.png', // 替换为您的图片路径
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
            markdownText: `完成b索引树创建任务的顶层函数是btbuild。该函数流程为：
- 在btbuild函数内部，首先执行_bt_spools_heapscan函数来扫描一个个的表元组然后把他们封装成一个个索引元组的数据结构(IndexTuple)。
- 然后btbuild内部再调用_bt_leafbuild函数，并于其中调用tuplesort_performsort函数按照索引键值对索引元组进行排序为之后将他们一个个插入索引树上做准备。
- 接着在_bt_leafbuild函数中循环调用_bt_load函数。_bt_load函数能将单个索引元组插入到树上对应的位置，那么循环调用这个函数就可以将所有的索引元组都插入到树上了。`,
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