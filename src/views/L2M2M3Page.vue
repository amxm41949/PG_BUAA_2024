<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
                <div class="header-content">
                    <el-button type="info" @click="goBack" class="back-button">Back</el-button>
                    <span class="text-large font-600 mr-3 title">L2M2M3</span>
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
            imageSrc: '/pictures/level2/L2M2M3.png', // 替换为您的图片路径
            hotspots: [
                {
                    id: '1',
                    shape: 'poly',
                    coords: '53,191,266,190,276,185,280,180,281,85,276,78,269,72,57,70,47,74,44,80,41,84,40,175,45,184',
                    href: '/l2m2m2' //rewrite
                },
                {
                    id: '2',
                    shape: 'poly',
                    coords: '1142,790,1141,883,1144,890,1147,900,1153,901,1366,901,1375,895,1381,887,1380,787,1377,781,1372,778,1367,773,1158,771,1148,774,1144,780',
                    href: '/l2m2m4' //execute
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '1142,420,1141,513,1144,520,1147,530,1153,531,1366,531,1375,525,1381,517,1380,417,1377,411,1372,408,1367,403,1158,401,1148,404,1144,410',
                    href: '/l3m2m3m3' //plan
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '561,418,560,511,563,518,566,528,572,529,785,529,794,523,800,515,799,415,796,409,791,406,786,401,577,399,567,402,563,408',
                    href: '/l3m2m3m2' //path
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '42,418,41,511,44,518,47,528,53,529,266,529,275,523,281,515,280,415,277,409,272,406,267,401,58,399,48,402,44,408',
                    href: '/l3m2m3m1' //pre
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

<style scoped>
.common-layout {
    height: 100%;
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

.header-content {
    display: flex;
    align-items: center;
    /* 垂直居中对齐 */
    justify-content: flex-start;
    gap: 10px;
    /* 按钮与标题之间的间隔 */
}

.header-content .back-button {
    line-height: 40px;
    /* 调整按钮文字的垂直对齐 */
    padding: 10px 25px;
    /* 给按钮添加适当的内边距 */
    font-size: 20px;
    /* 设置按钮的字体大小，调大文字 */
    /* 调整按钮的垂直对齐 */
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