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
                                    <span>M1</span>
                                </span>
                            </template>
                            <a style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">索引插入模块</a>
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
            imageSrc: '/pictures/level3/L3M3M1M1.png', // 替换为您的图片路径
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
            markdownText: `整个插入流程由若干个函数组成；
- btinsert。这是插入索引元组的顶层函数，负责执行整个插入过程。
- bt_myscankey。该函数负责创建扫描键(BTScanKey结构体)。在构建扫描键的过程中会给每个索引属性列一个比较函数，这个比较函数就是定义某种类型的属性的值应该如何进行比较（比如：定义字符串类型的属性值按照字典序来进行比较等）。
- index_getattr。这个宏函数负责取出元组的和索引有关的属性值来将它们赋给扫描键中的属性，以便后面用扫描键去和索引树上的索引元组做比较。
- _bt_search。该函数在b树上进行遍历搜索，以找到在保持b树的有序的性质下刚才构建出来的扫描键应该插入到的目标页面节点。
- _bt_getroot。该函数负责取b树的根节点。
- _bt_moveright。该函数负责达到遍历过程中在b树层内右移的效果。
- _bt_compare。如前文所述，进行属性的比较。
- _bt_binsrch。该函数负责在页内二分搜索。
- _BTreeTupleGetDownLink。该函数负责遍历过程中b树内下降一层的效果。
- _bt_findinsertloc。该函数负责确定目标页面内部应该插在的具体偏移号。由于b树节点页面中的若干个索引元组是有序排列的，因此为了追求更高的查找效率，这个过程通过二分查找这一常见算法实现。
- _bt_insertonpg。该函数会在上面找到的具体插入位置处，执行将待插入的索引元组加入到目标位置的操作。这个函数其实就是调用了名为PageAddItem的宏函数（这个函数在本报告中也是做了详细解释了的），其将待插入的索引元组的内容memcpy到页面的对应位置上，同时维护页面PageHeaderData结构中的linp数组，将新插入索引元组的ItemIdData结构插入到linp数组对应的位置上，完成插入元组的操作。
- _bt_split。如果_bt_findinsertloc没有发现空余空间，那么_bt_insertonpg函数会调用该函数，触发页面分裂。
- _bt_insert_parent。该函数将指向分裂后的右页面的索引元组插入到父页面中，维护好父子之间的指针，彻底完成分裂。`,
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