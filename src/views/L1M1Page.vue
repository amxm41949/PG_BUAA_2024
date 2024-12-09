<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
                <div class="header-content">
                    <el-button type="info" @click="goBack" class="back-button">Back</el-button>
                    <span class="text-large font-600 mr-3 title">L1M1</span>
                </div>
                <div style="margin-top: 20px;"></div> <!-- 增加顶部空白 -->
            </el-header>
            <el-main>
                <div class="image-container">
                    <img id="mapAll" ref="mapAll" :src="imageSrc" usemap="#image-map"
                        style="width: 100%; height: 100%; object-fit: contain;" />
                </div>
                <div style="margin-top: 30px;"></div> <!-- 增加顶部空白 -->
                <el-steps style="max-width: 600px" :active="active" finish-status="success" align-center>
                    <el-step title="Step 1" />
                    <el-step title="Step 2" />
                    <el-step title="Step 3" />
                </el-steps>
                <el-button class="next-button" style="margin-top: 12px" @click="next">Next step</el-button>
               <div v-html="compiledMarkdown" class="markdown-body"></div>
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
import MarkdownIt from 'markdown-it';

export default {
    data() {
        return {
            active: 0,
            imageSrc: '/pictures/level1/L1M1.png',
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
            md: new MarkdownIt({
                html: false,        // 禁用 HTML 解析
                xhtmlOut: false,    // 禁用 XHTML 输出
                breaks: false,      // 不自动将换行符转换为 <br> 标签
                linkify: true,      // 自动链接 URL
                typographer: true,  // 启用排版功能（如引号、破折号等自动转换）
                validate: true      // 启用严格模式
            })
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
    computed: {
        // 计算属性用于解析Markdown
        compiledMarkdown() {
            return this.md.render(this.markdownText);
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