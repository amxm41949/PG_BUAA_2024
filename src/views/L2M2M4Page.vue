<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->

                <span class="text-large font-600 mr-3" style="font-size: 30px;"> L2M2M4 </span>

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
            imageSrc: '/pictures/level2/L2M2M4.png', // 替换为您的图片路径
            hotspots: [
                {
                    id: '1',
                    shape: 'poly',
                    coords: '171,326,191,323,199,320,200,313,202,301,202,243,201,232,196,225,187,224,9,222,8,225,4,229,-8,237,-9,307,-8,323',
                    href: '/l2m2m3'
                },
                {
                    id: '2',
                    shape: 'poly',
                    coords: '1251,434,1275,434,1283,431,1284,424,1286,412,1286,354,1285,343,1280,336,1271,335,1093,333,1084,336,1080,340,1076,348,1075,418,1076,435',
                    href: '/next-level/3'
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '1250,204,1274,204,1282,201,1283,194,1285,182,1285,124,1284,113,1279,106,1270,105,1092,103,1083,106,1079,110,1075,118,1074,188,1075,205',
                    href: '/next-level/4'
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