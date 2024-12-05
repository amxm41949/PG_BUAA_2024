<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->

                <span class="text-large font-600 mr-3" style="font-size: 30px;"> L1M2 </span>

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
            imageSrc: '/pictures/level1/L1M2.png', // 替换为您的图片路径
            hotspots: [
                {
                    id: '1',
                    shape: 'poly',
                    coords: '359,350,358,434,363,444,555,447,564,434,565,352,559,345,384,342,370,345',
                    href: '/next-level/1'
                },
                {
                    id: '2',
                    shape: 'poly',
                    coords: '868,358,870,435,876,447,1123,449,1136,433,1133,356,1130,345,1004,343,877,342',
                    href: '/next-level/2'
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '869,577,869,653,878,670,1119,671,1130,664,1134,623,1134,578,1122,566,884,568',
                    href: '/next-level/2'
                },
                {
                    id: '4',
                    shape: 'poly',
                    coords: '355,621,357,659,370,674,386,673,551,671,564,667,569,621,570,583,562,570,461,567,371,568,357,583,361,573',
                    href: '/next-level/2'
                },
                // 更多热点区域...
            ],
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
    methods: {
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
        }
    },
};
</script>

<style scoped>
.common-layout {
    height: 100vh;
    /* 使布局填满整个视口高度 */
}

.image-container {
    position: relative;
    width: 100%;
    height: 90vh;
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
</style>