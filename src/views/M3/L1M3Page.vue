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
            // {
            //   id: '2',
            //   shape: 'poly',
            //   coords:
            //     '980,116, 1220,116, 1230,116, 1235,126, 1235,236, 1230,246, 980,246, 970,236, 970,126',
            //   href: '/l2m4m3'
            // },
            // {
            //   id: '4',
            //   shape: 'poly',
            //   coords:
            //     '10,133,12,208,15,217,20,218,24,223,199,223,205,219,215,211,213,132,208,128,205,123,21,123,15,124',
            //   href: '/l2m2m4'
            // },
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
  
  > 管理数据的具体存储，连接了硬件和软件。
  
  **模块信息**
  
  - 索引管理模块
    
    > 负责管理索引，执行索引的增删改查。 
  
  - 内存管理模块
    
    > 提供上下文、缓冲区等内存服务，封装了和外存的交互。
  
  - 外存管理模块
    
    > 负责管理外存，提供数据的持久化存储。
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