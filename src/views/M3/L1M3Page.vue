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
                          <a style="text-decoration: none; color: #ffffff;font-size: 32px;
                          font-weight: 600;">存储模块</a>
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
          activeName: 'second',
          active: 0,
          imageSrc: '/pictures/level1/L1M3.png', // 替换为您的图片路径
          hotspots: [
            {
            id: '1',
            shape: 'poly',
            coords:
              '44,78, 44,225, 60,260, 100,275, 680,275, 720,260, 743,225, 743,78, 720,43, 680,28, 100,28, 60,43, 44,78',
            href: '/l2m2m2'
          },
          {
            id: '2',
            shape: 'rect',
            coords:
              '545,523,798,667',
            href: '/l2m3m2'
          },
          {
            id: '4',
            shape: 'rect',
            coords:
              '542,778,805,900',
            href: '/l2m3m3'
          },
            {
            id: '5',
            shape: 'poly',
            coords: '90,528, 325,528, 330,533, 335,538, 335,653, 330,658, 325,663, 90,663, 85,658, 80,653, 80,538, 85,533',
            href: '/l2m3m1'
            },
            {
              id: '6',
              shape: 'poly',
              coords:
                '872,27, 1158,27, 1163,32, 1168,37, 1168,257, 1163,262, 1158,267, 872,267, 867,262, 862,257, 862,37, 867,32, 872,27',
              href: '/l1m4'
            },
          ],
          markdownText:
              `**总览**

> 完成操作请求在数据库中的分析处理和转化工作，最终实现物理存储介质中数据的操作。

**模块信息**

- 查询分析模块
  
  > 进行词法分析、语法分析和语义分析生成查询树，并且判断sql语句类型。 

- 查询重写模块
  
  > 根据已定义的规则对查询树进行重写

- 查询规划模块
  
  > 根据查询树生成查询计划

- 查询执行模块
  
  > 按照查询计划的安排，调用存储、索引、并发等功能模块，按照各个计划节点的实现算法来执行数据的读取和修改。

**数据流信息**

- 存储指令
  
  > 查询执行模块执行后向存储模块发出的指令
          `,
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
          highlight: false,
      });
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
};
</script>