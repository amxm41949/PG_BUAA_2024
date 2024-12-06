<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
        <div class="header-content">
          <el-button type="info" @click="goBack" class="back-button">Back</el-button>
          <span class="text-large font-600 mr-3 title">L1M4</span>
        </div>
        <div style="margin-top: 20px;"></div> <!-- 增加顶部空白 -->
      </el-header>
      <el-main>
        <div class="image-container">
          <img id="mapAll" ref="mapAll" :src="imageSrc" usemap="#image-map"
            style="width: 100%; height: 100%; object-fit: contain;" />
          <map name="image-map" id="image-map">
            <area v-for="hotspot in hotspots" :key="hotspot.id" :shape="hotspot.shape" :coords="hotspot.coords"
              :href="hotspot.href" @click.prevent="navigateTo(hotspot.href)" @mouseover="highlightHotspot(hotspot.id)"
              @mouseout="unhighlightHotspot(hotspot.id)" />
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
      imageSrc: '/pictures/level1/L1M4.png', // 替换为您的图片路径
      hotspots: [
        {
          id: '1',
          shape: 'poly',
          coords:
            '520,116, 760,116, 770,116, 780,126, 780,236, 770,246, 520,246, 510,236, 510,126',
          href: '/l2m4m1'
        },
        {
          id: '3',
          shape: 'poly',
          coords:
            '520,361, 760,361, 770,361, 780,371, 780,481, 770,491, 520,491, 510,481, 510,371',
          href: '/l2m4m2'
        },
        {
          id: '2',
          shape: 'poly',
          coords:
            '980,116, 1220,116, 1230,116, 1235,126, 1235,236, 1230,246, 980,246, 970,236, 970,126',
          href: '/l2m4m3'
        },
        {
          id: '4',
          shape: 'poly',
          coords:
            '10,133,12,208,15,217,20,218,24,223,199,223,205,219,215,211,213,132,208,128,205,123,21,123,15,124',
          href: '/l2m2m4'
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