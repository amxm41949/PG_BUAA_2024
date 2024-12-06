<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
                <div class="header-content">
                    <span class="text-large font-600 mr-3 title">L0</span>
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
            imageSrc: '/pictures/level0/L0.png', // 替换为您的图片路径
            hotspots: [
                // ...您的热点数据
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
                    href: '/next-level/2'
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '948,841,1256,841,1272,837,1275,827,1280,825,1280,813,1282,799,1282,684,1277,674,1272,668,1267,663,1258,661,949,660,939,661,930,665,925,671,921,678,920,815,923,825,932,835,940,840',
                    href: '/next-level/2'
                },
            ],
        };
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