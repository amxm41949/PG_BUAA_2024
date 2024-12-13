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
                                现在位于&nbsp;&nbsp;&nbsp;&nbsp;第 3 层</a>
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
                        <el-tab-pane name="fourth">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M1</span>
                                </span>
                            </template>
                            <a style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">表文件管理</a>
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
            active: 0,
            imageSrc: '/pictures/level3/L2M3M3M1.png', // 替换为您的图片路径

            markdownText:
                `**表文件管理总览**

-  postgreSQL DBMS的外存管理并没有非常直接地操作磁盘介质， 而是通过调用WINAPI操作系统接口的方式实现操作。
- postgreSQL DBMS对操作系统的文件系统进行了封装，以适应DBMS本身管理数据，频繁与数据交互的特性，完备本身文件系统的功能，同时可以让DBMS很好的支持跨平台运行，不依赖于底层系统实现

**表文件读取调用流程**

以下是左侧调用流程的具体函数及功能说明：

1. Smgrread
  - 作用: 存储管理器的读取函数，负责接收上层请求，开始表文件的读取操作。
  - 输入: 读取请求的参数（如文件标识和读取位置）。
  - 输出: 调用下层的具体函数进行进一步处理。
2. 函数指针指向
  - 作用: 根据不同存储实现，指向具体的文件读取实现函数（如本地文件系统或外部存储）。
3. Mdread
  - 作用: 处理与元数据相关的读取操作，将读取请求与元数据联系起来。
  - 输入: 目标文件的元数据和偏移量。
  - 输出: 调用文件读取函数。
4. FileRead
  - 作用: 负责完成文件的读取操作。
  - 输入: 文件描述符、偏移量以及读取大小。
  - 输出: 返回读取的数据。
5. pg_pread
  - 作用: 在文件中指定位置读取数据，支持偏移量的精确定位读取。
  - 输入: 文件描述符、偏移量和读取大小。
  - 输出: 返回读取的字节流。
6. ReadFile
  - 作用: 最底层的文件读取操作，与操作系统直接交互，完成实际的 I/O。
  - 输入: 系统调用参数（如文件描述符、偏移量等）。
  - 输出: 返回读取的数据。



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