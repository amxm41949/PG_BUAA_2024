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
                                    <span>M2</span>
                                </span>
                            </template>
                            <a style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">查询模块</a>
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
            imageSrc: '/pictures/level1/L1M1.png', // 替换为您的图片路径
            hotspots: [
                {
                    id: '1',
                    shape: 'poly',
                    coords: "685,1134,695,1129,947,1128,958,1132,965,1139,969,1150,970,1251,968,1262,962,1269,954,1272,693,1275,684,1269,679,1261,674,1147",
                    href: '/l1m1'
                    // this is analysis
                },
            ],
            markdownText:
               `**总览**

>接受外部操作对系统的请求，对操作请求进行预处理和分发，起系统逻辑控制作用。

**模块信息**

- 守护进程postmaster
    > 多用户模式下一个数据库实例由守护进程 Postmaster 来管理。它是一个运行在服务器上的总控进程，负责整个系统的启动和关闭，并且在服务进程出现错误时完成系统的恢复。它会为客户端连接请求 fork 一个 Postgres 服务进程，来代表客户端在数据库上执行各种命令。

- 服务进程postgres
    > Postgres进程是实际的接受查询请求并调用相应模块处理查询的服务进程。它直接接受用户的命令进行编译执行，并将结果返回给用户。如此循环，直到用户断开连接。

- ReadCommand
    \`\`\`C++
    /* ----------------
     *                ReadCommand 从前端或标准输入读取命令，如果文件结束，
     *                将其放入 inBuf，并返回信息类型代码（信息的第一个字节）。
     *                则返回 EOF。
     * ----------------
     */
    static int
    ReadCommand(StringInfo inBuf)
    {
            int                        result;

            if (whereToSendOutput == DestRemote)
                    result = SocketBackend(inBuf);
            else
                    result = InteractiveBackend(inBuf);
            return result;
    }
    \`\`\`

**数据流信息**

- 用户命令
    > 用户命令分为两种：一种是查询命令，即插人、删除、更新和选择四种命令。另一种是非查询命令，如创建/删除表、视图、索引等命令。
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