<template>
    <div class="common-layout">
        <el-container>
            <el-header>

                <div class="header-content">
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane name="first">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>L2</span>
                                </span>
                            </template>
                            <a href="/" target="_self" style="text-decoration: none; color: #ffffff;
                            font-size: 32px; font-weight: 600;">
                                现在位于&nbsp;&nbsp;&nbsp;&nbsp;第 2 层</a>
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
                        <el-tab-pane name="third">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M3</span>
                                </span>
                            </template>
                            <a style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">外存模块</a>
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
            activeName: 'third',
            active: 0,
            imageSrc: '/pictures/level2/L2M3M3.png', // 替换为您的图片路径
            hotspots: [
                {
                    id: '1',
                    shape: 'rect',
                    coords: '115,240,215,304',
                    href: '/l2m3m3m1'
                },
                {
                    id: '2',
                    shape: 'rect',
                    coords: '274,244,372,302',
                    href: '/l2m3m3m1'
                },
                {
                    id: '3',
                    shape: 'rect',
                    coords: '429,245,529,302',
                    href: '/l2m3m3m1'
                },
                {
                    id: '4',
                    shape: 'rect',
                    coords: '586,244,686,304',
                    href: '/l2m3m3m1'
                },
                {
                    id: '5',
                    shape: 'rect',
                    coords: '768,191,862,254',
                    href: '/l2m3m3m2'
                },
                {
                    id: '6',
                    shape: 'rect',
                    coords: '271,472,545,535',
                    href: '/l2m3m3m4'
                },
            ],

            markdownText:
                `**总览**

PostgreSQL 中的外存管理模块负责管理数据库数据的存储和检索，确保数据在磁盘上的安全性和效率。

**流程概述**

> 外存管理模块通过 SMGR 接收来自数据库操作的请求，执行相应的表文件管理任务。通过 Vacuum  操作，系统能够有效地维护数据的整洁性和性能。OID 管理为每个对象提供唯一标识，确保数据的有效管理。整体流程保证了 PostgreSQL  在高并发环境下的高效数据存储与访问。

**图中名词解释**

- SMGR：SMGR（存储管理器）介于内存和外存之间，负责管理内外存并作为两者之间的接口进行数据交换等
- 表文件：表文件是PG中真正存储数据的数据结构，拥有唯一标识OID，包含数据文件、VM文件和FSM文件等
- Vacuum机制：PostgreSQL为了实现多版本并发控制（MVCC），当事务删除或者更新元组时，并非从物理上删除，而是将其标记无效，最终再通过VACUUM命令清理这些无效元组
- 空闲空间管理：FSM本质是一个三层树，树上的每个节点是一个FSM页，每个FSM页里是一个数组表示的二叉树，每个节点一个字节。每个叶节点表示一个堆页面或者一个下层FSM页面。在每一个非叶节点中存储了它孩子节点中的最大值
- VFD机制
  - 背景：操作系统能同时打开的文件数量是有上限的，而作为一个数据库，PG很容易就会突破这个上限。PG通过VFD突破对打开文件数量（文件描述符）的限制
  - 过程：VFD将虚拟页号转为物理页号后，调用操作系统接口，将物理文件调入
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