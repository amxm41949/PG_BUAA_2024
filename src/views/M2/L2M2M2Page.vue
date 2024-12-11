<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
                <div class="header-content">
                    <el-button type="info" @click="goBack" class="back-button">Back</el-button>
                    <span class="text-large font-600 mr-3 title">L2M2M2(查询重写模块)</span>
                </div>
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
            imageSrc: '/pictures/level2/L2M2M2.png', // 替换为您的图片路径
            hotspots: [
                {
                    id: '1',
                    shape: 'poly',
                    coords: '9,103,188,102,199,98,204,94,205,80,204,16,201,7,195,4,192,1,16,1,7,3,4,6,1,19,1,90,3,97',
                    href: '/l2m2m1'
                },
                {
                    id: '2',
                    shape: 'poly',
                    coords: '675,720,854,719,865,715,870,711,871,697,870,633,867,624,861,621,858,618,682,618,673,620,670,623,667,636,667,707,669,714',
                    href: '/l2m2m3'
                },
                // 更多热点区域...
            ],
            markdownText: 
`**总览**

> 根据已定义的规则对查询树进行重写

**数据流信息**

- \`Query\`，查询结构体

- 以List*结构体构建的 \`querytree_list\` 查询树链表，重写后可能变为0-N个查询树，因此变为链表

**图内数据结构及重要节点展示：**

- Query ：查询结构体，已在L2M2M1展示过\

- querytree_list 实际上是List*, 节点内装入Query*，简单的链表结构

- 入口函数：在此处将查询结构体区分为 \`utilitie\` (非数据检索任务，如数据定义\`CREATE TABLE\`等)和 非\`utilitie\`，前者不进行重写，统一数据结构后直接结束本模块

- 查询结构体表生成器(\`list_make1\`)：主要功能是统一输出，将\`utilitie\`方向的输出从单个\`Query\`变为一个链表

- 规则：查询重写的核心是规则系统，可以是通过CREATE RULE定义，也可以是“视图”(PG的视图实际上是定义了一个规则)。规则按命令分为 **SELECT/INSERT/UPDATE/DELETE**， 按动作分为**INSTEAD/ALSO**
  
    - INSTEAD将原来的操作替换，ALSO在原操作基础上额外做动作
    
    - SELECT规则为一个动作的无条件INSTEAD规则（安全性等诸多因素限制）
    
    - SELECT规则别称RIR规则，这是历史遗留，在古代（PostQUEL时代）的RETRIEVE对应于现在的SELECT，所以全称是\`RETRIEVE-INSTEAD-RULE\`

- 非RIR规则应用：对INSERT/UPDATE/DELETE处理，主要调整CTE(\`Common\`**\` \`**\`Table\`**\` \`**\`Expressions\` 公用表表达式 / 临时结果集)和\`TargetList\`

- RIR规则应用：对SELECT处理，调整RTE(\`Range Table\`范围表，可以是表或子查询)和CTE

- 设置命令结果标签：标识出哪个\`Query\`是重写后查询的最终结果，即字段\`canSetTag\`
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