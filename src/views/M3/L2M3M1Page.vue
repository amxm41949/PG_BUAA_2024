<template>
  <div class="common-layout">
      <el-container>
          <el-header>

              <div class="header-content">
                  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                      <el-tab-pane name="first">
                          <template #label>
                              <span class="custom-tabs-label">
                                  <span>L1</span>
                              </span>
                          </template>
                          <a href="/" target="_self" style="text-decoration: none; color: #ffffff;
                          font-size: 32px; font-weight: 600;">
                              回到顶层</a>
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
                          <a style="font-size: 32px;
                          font-weight: 600;">索引管理模块 </a>
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
          markdownText:
              `**总览**

> 对索引进行操作，可以增删改查索引

**数据流信息**

- 目标页缓冲区
  > 负责存放修改的数据或者要读取的数据，在内存管理的帮助下和外存交互

- 索引描述符Relation
  > 是RelationData的指针形式，存放索引的大部分信息

  \`\`\`C++
  typedef struct RelationData *Relation;
  typedef union ListCell
  {
  void     ptr_value;
  int     int_value;
  Oid     oid_value;
  } ListCell;
  
  typedef struct List
  {
  *   NodeTag   type;     /* T_List, T_IntList, or T_OidList /
  *   int     length;     /* number of elements currently present /
  *   int     max_length;   /* allocated length of elements[] */
  ListCell   elements;   / re-allocatable array of cells /
  *   /* We may allocate some cells along with the List header: /
  ListCell  initial_elements[FLEXIBLE_ARRAY_MEMBER];
  *   /* If elements == initial_elements, it's not a separate allocation */
  } List;
  \`\`\`

          `,
      };
  },
  computed: {
      // 计算属性用于解析Markdown
      compiledMarkdown() {
          return this.$md.render(this.markdownText);
      }
  },
  mounted() {
      // 使用 mapster 插件，注意不需要 resize: true
      $('#mapAll').mapster({
          fillColor: '1AC4F9',
          strokeColor: "FFFFFF",
          strokeWidth: 3,
          fillOpacity: 0.6,
          singleSelect: true,
          highlight: false,
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