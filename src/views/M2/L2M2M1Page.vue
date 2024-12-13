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
                                回到顶层</a>
                        </el-tab-pane>
                        <el-tab-pane name="second">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M2</span>
                                </span>
                            </template>
                            <a href="/l1m2" target="_self" style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">查询模块</a>
                        </el-tab-pane>
                        <el-tab-pane name="third">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M1</span>
                                </span>
                            </template>
                            <a style="font-size: 32px;
                            font-weight: 600;">查询分析模块 </a>
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
                    href: '/l1m1'
                },//连接管理模块
                // 更多热点区域...
            ],
            markdownText:
                `**总览**

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

    \`\`\`c++
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