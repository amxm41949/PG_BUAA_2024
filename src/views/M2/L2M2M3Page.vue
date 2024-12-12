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
                            <a href="/" target="_self" style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">回到顶层</a>
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
                                    <span>M3</span>
                                </span>
                            </template>
                            <a style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">查询规划模块</a>
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
            imageSrc: '/pictures/level2/L2M2M3.png', // 替换为您的图片路径
            hotspots: [
                {
                    id: '1',
                    shape: 'poly',
                    coords: '53,191,266,190,276,185,280,180,281,85,276,78,269,72,57,70,47,74,44,80,41,84,40,175,45,184',
                    href: '/l2m2m2' //rewrite
                },
                {
                    id: '2',
                    shape: 'poly',
                    coords: '1142,790,1141,883,1144,890,1147,900,1153,901,1366,901,1375,895,1381,887,1380,787,1377,781,1372,778,1367,773,1158,771,1148,774,1144,780',
                    href: '/l2m2m4' //execute
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '1142,420,1141,513,1144,520,1147,530,1153,531,1366,531,1375,525,1381,517,1380,417,1377,411,1372,408,1367,403,1158,401,1148,404,1144,410',
                    href: '/l3m2m3m3' //plan
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '561,418,560,511,563,518,566,528,572,529,785,529,794,523,800,515,799,415,796,409,791,406,786,401,577,399,567,402,563,408',
                    href: '/l3m2m3m2' //path
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '42,418,41,511,44,518,47,528,53,529,266,529,275,523,281,515,280,415,277,409,272,406,267,401,58,399,48,402,44,408',
                    href: '/l3m2m3m1' //pre
                },
                // 更多热点区域...
            ],
            markdownText: `**总览**

> 根据查询树生成查询计划

**数据流信息**

- \`querytree_list\` 查询树链表
- 以\`PlannedStmt\`结构体构建起的链表\`plantree_list\`

For Each ：在查询规划模块中，接受查询树链表，输出计划树链表，在处理过程中对每棵查询树生成计划树，最后汇总

- 规划信息PlannerInfo：贯穿整个规划过程，记录规划过程中所需要的各种数据，包括路径信息等

\`\`\`C
struct PlannerInfo
{
    NodeTag     type;
    Query      *parse;          /* the Query being planned */ //正在处理的Query
    PlannerGlobal *glob;        /* global info for current planner run */
    Index       query_level;    /* 1 at the outermost Query */
    PlannerInfo *parent_root;   /* NULL at outermost Query */
    List      *plan_params;    /* list of PlannerParamItems, see below */
    Bitmapset  *outer_params;
    struct RelOptInfo **simple_rel_array;   /* All 1-rel RelOptInfos */ 
    int         simple_rel_array_size;  /* allocated size of array */
    //省略N行，非常庞大
};
\`\`\`

- 优化信息RelOptInfo：存放优化信息，最重要的是包含了路径信息

\`\`\`C
typedef struct RelOptInfo
{
        NodeTag                type;
        RelOptKind        reloptkind;
        /* all relations included in this RelOptInfo */
        Relids                relids;                        /* set of base relids (rangetable indexes) */
        /* size estimates generated by planner */
        double                rows;                        /* estimated number of result tuples */
        /* default result targetlist for Paths scanning this relation */
        struct PathTarget *reltarget;        /* list of Vars/Exprs, cost, width */
        /* materialization information */
        List           *pathlist;                /* Path structures */
        List           *ppilist;                /* ParamPathInfos used in pathlist */
        List           *partial_pathlist;        /* partial Paths */
        struct Path *cheapest_startup_path;
        struct Path *cheapest_total_path;
        struct Path *cheapest_unique_path;
        List           *cheapest_parameterized_paths;
        //省略N行，非常庞大
} RelOptInfo;
\`\`\`

- 路径Path：路径信息

\`\`\`C
struct Path
{
    NodeTag     type;

    NodeTag     pathtype;       /* tag identifying scan/join method */

    RelOptInfo *parent;         /* the relation this path can build */
    PathTarget *pathtarget;     /* list of Vars/Exprs, cost, width */
    ParamPathInfo *param_info;  /* parameterization info, or NULL if none */

//并行信息
    bool        parallel_aware; /* engage parallel-aware logic? */
    bool        parallel_safe;  /* OK to use as part of parallel plan? */
    int         parallel_workers;   /* desired # of workers; 0 = not parallel */

//cost信息
    /* estimated size/costs for path (see costsize.c for more info) */
    Cardinality rows;           /* estimated number of result tuples */
    Cost        startup_cost;   /* cost expended before fetching any tuples */
    Cost        total_cost;     /* total cost (assuming all tuples fetched) */

// 路径键
    List       *pathkeys;       /* sort ordering of path's output */
}
\`\`\`

- 预处理模块：进行预处理和优化查询(部分)，生成规划信息用于路径生成
- 路径生成模块：生成查询路径，存放到规划信息中
- 计划生成模块：细化路径（如确定扫描方法），生成足够详细的计划
- 在整个查询规划结束后，N个输入的计划树产生的N个计划语句被打包为一个list运走
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