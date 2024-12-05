<template>
    <div class="image-container">
        <img id="mapAll" ref="mapAll" :src="imageSrc" usemap="#image-map"
            style="width: 100%; height: 100%; object-fit: contain;" />
        <map name="image-map" id="image-map">
            <area v-for="hotspot in hotspots" :key="hotspot.id" :shape="hotspot.shape" :coords="hotspot.coords"
                :href="hotspot.href" @click.prevent="navigateTo(hotspot.href)" @mouseover="highlightHotspot(hotspot.id)"
                @mouseout="unhighlightHotspot(hotspot.id)" />
        </map>
    </div>
</template>

<script>
import $ from 'jquery';
import 'imagemapster';

export default {
    data() {
        return {
            imageSrc: '/pictures/level0/L0.png', // 替换为您的图片路径
            hotspots: [
                {
                    id: '1',
                    shape: 'poly',
                    coords: '71,831,388,831,397,827,403,822,407,813,409,806,408,677,408,670,406,667,402,657,389,656,388,650,71,651,61,651,52,658,46,668,46,676,46,806,51,821,62,829',
                    href: '/next-level/1'
                },
                {
                    id: '2',
                    shape: 'poly',
                    coords: '70,1219,387,1219,396,1215,402,1210,406,1201,408,1194,407,1065,407,1058,405,1055,401,1045,388,1044,387,1038,70,1039,60,1039,51,1046,45,1056,45,1064,45,1194,50,1209,61,1217',
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
            $map.mapster('highlight', true, id);
        },
        unhighlightHotspot(id) {
            const $map = $('#mapAll');
            $map.mapster('set', false, id); // 取消高亮显示
        }
    },
};
</script>

<style scoped>
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