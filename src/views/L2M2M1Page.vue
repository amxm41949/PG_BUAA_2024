<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
                <div class="header-content">
                    <el-button type="info" @click="goBack" class="back-button">Back</el-button>
                    <span class="text-large font-600 mr-3 title">L2M2M1</span>
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
            imageSrc: '/pictures/level2/L2M2M1.png', // 替换为您的图片路径
            hotspots: [
                {
                    id: '1',
                    shape: 'poly',
                    coords: '935,578,936,673,939,683,944,688,953,693,1260,693,1269,688,1275,681,1279,679,1280,575,1274,566,1267,559,953,557,938,564',
                    href: '/l2m2m2'
                },
                {
                    id: '1',
                    shape: 'poly',
                    coords: '19, 121, 219, 120, 231, 114, 237, 111, 242, 105, 242, 3, 237, -4, 233, -10, 224, -13, 21, -12, 4, -11, -1, 1, -1, 7, 2, 107, 9, 116',
                    href: '/next-level/2'
                },//连接管理模块
                // 更多热点区域...
            ],
            markdownText: `**总览**

> 进行词法分析、语法分析和语义分析生成查询树，并且判断sql语句类型。

**数据流信息**

- 查询语句query_string

> 用户发送的sql语句字符串

- 分析树parsetree_list

> 经过词法分析和语法分析生成的分析树parsetree_list，postgre单独定义了一种结构体List来存放这类数据：

\`\`\`C++
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

- Query结构体

> 用来存放查询功能用到的关键属性，例如查询命令类型，查询范围等等，以便后续的查询重写和查询规划。

\`\`\`C++
 typedef struct Query
 {
   NodeTag   type;
   CmdType   commandType;  /* select|insert|update|delete|merge|utility /
*   QuerySource querySource;  /* where did I come from? /
*   int     resultRelation; /* rtable index of target relation for
                  * INSERT/UPDATE/DELETE/MERGE; 0 for SELECT */
   List     rtable;     / list of range table entries */
   FromExpr   jointree;   / table join tree (FROM and WHERE clauses);
                  * also USING clause for MERGE */
   List     targetList;   / target list (of TargetEntry) */
 } Query;
\`\`\`
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
    computed: {
        // 计算属性用于解析Markdown
        compiledMarkdown() {
            return this.md.render(this.markdownText);
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