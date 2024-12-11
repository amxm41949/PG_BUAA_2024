<template>
    <div class="common-layout">
      <el-container>
        <el-header>
          <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
          <div class="header-content">
            <el-button type="info" @click="goBack" class="back-button">Back</el-button>
            <span class="text-large font-600 mr-3 title">L2M3M1</span>
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
        imageSrc: '/pictures/level2/L2M3M1.png', // 替换为您的图片路径
        hotspots: [
          // {
          //   id: '1',
          //   shape: 'poly',
          //   coords: '356,335,357,413,359,422,362,423,365,427,371,429,549,429,555,428,561,425,564,417,566,415,567,338,565,332,561,326,556,325,371,322,363,328,359,327',
          //   href: '/l2m2m1'
          // },
          // {
          //   id: '2',
          //   shape: 'poly',
          //   coords: '355,559,356,637,358,646,361,647,364,651,370,653,548,653,554,652,560,649,563,641,565,639,566,562,564,556,560,550,555,549,370,546,362,552,358,551',
          //   href: '/l2m2m2'
          // },
          // {
          //   id: '3',
          //   shape: 'poly',
          //   coords: '882,429,1117,429,1125,427,1131,420,1131,415,1133,408,1133,336,1129,326,1122,322,881,322,872,326,869,333,866,348,868,413,872,422,876,425',
          //   href: '/l2m2m3'
          // },
          // {
          //   id: '4',
          //   shape: 'poly',
          //   coords: '881,653,1116,653,1124,651,1130,644,1130,639,1132,632,1132,560,1128,550,1121,546,880,546,871,550,868,557,865,572,867,637,871,646,875,649',
          //   href: '/l2m2m4'
          // },
          // {
          //   id: '5',
          //   shape: 'poly',
          //   coords: '0,796,1,874,3,883,6,884,9,888,15,890,193,890,199,889,205,886,208,878,210,876,211,799,209,793,205,787,200,786,15,783,7,789,3,788',
          //   href: '/next-level/4'
          // },
          {
            id: '6',
            shape: 'poly',
            coords: '145,49,1296,49,1306,59,1306,227,1296,237,145,237,135,227,135,59',
            href: '/your-new-route' // 替换为实际的链接
          },
          {
            id: '1',
            shape: 'poly',
            coords: '168,610,308,610,318,620,318,681,308,691,168,691,158,681,158,620',
            href: '/l3m3m1m3' // 替换为实际的链接
          },
          {
            id: '2',
            shape: 'poly',
            coords: '392,603,562,603,567,608,572,613,572,686,567,691,562,696,392,696,387,691,382,686,382,613,387,608',
            href: '/l3m3m1m2' // 替换为实际的链接
          },
          {
            id: '3',
            shape: 'poly',
            coords: '860,603,1050,603,1055,608,1060,613,1060,686,1055,691,1050,696,860,696,855,691,850,686,850,613,855,608',
            href: '/l3m3m1m1' // 替换为实际的链接
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