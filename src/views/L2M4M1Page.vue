<script>

import $ from "jquery";

export default {
  data() {
    return {
      imageSrc: '/pictures/level2/L2M4M1.png', // 替换为您的图片路径
      hotspots: [
        {
          id: '1',
          shape: 'poly',
          coords:
              '408,15, 594,15, 600,18, 606,18, 606,115 ,601,116, 590,120, 410,120, 400,118, 396,111, 393,106, 393,26, 400,18',
          href: '/next-level/1'
        },
        {
          id: '2',
          shape: 'poly',
          coords:
              '408,715, 594,715, 600,718, 606,718, 606,815 ,601,816, 590,820, 410,820, 400,818, 396,811, 393,806, 393,726, 400,718',
          href: '/next-level/2'
        },
        // {
        //   id: '3',
        //   shape: 'poly',
        //   coords:
        //       '520,345, 760,345, 770,345, 780,355, 780,465, 770,475, 520,475, 510,465, 510,355',
        //   href: '/next-level/2'
        // },
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

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->

        <span class="text-large font-600 mr-3" style="font-size: 30px;"> L1M4 </span>

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