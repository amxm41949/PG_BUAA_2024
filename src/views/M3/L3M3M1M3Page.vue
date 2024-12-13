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
                                    <span>M3</span>
                                </span>
                            </template>
                            <a style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">索引查询模块</a>
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
            markdownText: `索引查询的顶层函数为index_get_next_tid。该函数作用为返回B树上下一个符合查询条件的索引元组。具体逻辑如下：
- 调用btgettuple函数，开始主干逻辑的执行。
- 若btgettuple函数第一次被调用，则执行_bt_first函数。_bt_first函数首先依据查询条件构建扫描键，遍历b树，拿这个扫描键来不断和树上索引元组的键值进行比较，从而决定是要往什么样的方向（向右移还是向下移）去向目标页面靠近。_bt_search负责找到目标页面，而_bt_binsrch函数会在目标页面内二分查找，找到目标页面内符合查询条件的第一个索引元组的偏移offnum。在之后，_bt_first会调用_bt_readpage函数从上一步得到的第一个位置开始往后遍历，将当前页面后面的所有符合查询条件的索引元组全部保存下来，并记录当前的偏移量为0。
- 若btgettuple函数不是头一次调用，则直接将上一步中的存储的索引元组的偏移量+1， 即可直接获取到下一个符合条件的索引元组。`,
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