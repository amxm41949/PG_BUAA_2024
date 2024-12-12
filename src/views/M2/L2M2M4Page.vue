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
                                    <span>M2</span>
                                </span>
                            </template>
                            <a href="/l1m2" target="_self" style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">查询模块</a>
                        </el-tab-pane>
                        <el-tab-pane name="third">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M4</span>
                                </span>
                            </template>
                            <a style="font-size: 32px;
                            font-weight: 600;">查询执行模块 </a>
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
            imageSrc: '/pictures/level2/L2M2M4.png', // 替换为您的图片路径
            hotspots: [
                {
                    id: '1',
                    shape: 'poly',
                    coords: '16,231,188,230,197,226,200,223,200,214,199,142,194,134,193,132,187,130,11,130,4,134,2,138,-1,143,-1,215,0,223,6,227',
                    href: '/l2m2m3'
                },
                {
                    id: '2',
                    shape: 'poly',
                    coords: '1094,346,1266,345,1275,341,1278,338,1278,329,1277,257,1272,249,1271,247,1265,245,1089,245,1082,249,1080,253,1077,258,1077,330,1078,338,1084,342',
                    href: '/l1m3' //storage
                },
                {
                    id: '3',
                    shape: 'poly',
                    coords: '1093,119,1265,118,1274,114,1277,111,1277,102,1276,30,1271,22,1270,20,1264,18,1088,18,1081,22,1079,26,1076,31,1076,103,1077,111,1083,115',
                    href: '/l1m4' //thing
                },
                // 更多热点区域...
            ],
            markdownText: `**总述**

  - > 经过前面几部分将sql语句转换成执行计划后，会将执行计划plantree传递给查询执行器。总体上看，查询执行器就是按照查询计划的安排，调用存储、索引、并发等功能模块，按照各个计划节点的实现算法来执行数据的读取和修改。

  - **模块信息**

  - - 策略选择模块 Portal
      - > Portal模块将sql语句划分为两种类型，后续分别执行。整个查询执行的策略选择、启动、回收都由Portal 组件完成。
    - 功能处理器 UtilityProcessor
      - > 处理数据定义语句，根据不同功能分别调用
    - 执行器 Executor
      - > 处理可优化语句，包含若干个查询计划树，严格按计划树执行

  - **数据流信息**

  - - 计划树表 plantree_list
      - > 查询规划模块处理结束后生成的计划树列表。
    - 计划语句 PlannedStmt
      - > 计划语句 PlannedStmt 是计划树表 plantree_list 内的元素，封装了查询规划模块生成的计划树 planTree，包含了一次执行所需的全部信息。

      - \`\`\`SQL
        /* ----------------
         *                PlannedStmt node
         *
         * The output of the planner is a Plan tree headed by a PlannedStmt node.
         * PlannedStmt holds the "one time" information needed by the executor.
         *
         * For simplicity, we also wrap utility statements in PlannedStmt nodes.
         * ----------------
         */
        typedef struct PlannedStmt
        {
                NodeTag                type;
        
                CmdType                commandType;        /* select|insert|update|delete|merge|utility */
        
                /* ... */
                
                struct Plan *planTree;                /* tree of Plan nodes */
                
                /* ... */
        
        } PlannedStmt;
        \`\`\`
    - 查询描述符 QueryDesc
      - > Portal在处理查询语句前会将 plantree_list 封装成查询描述符 QueryDesc，其中包含了执行器执行查询所需的所有内容。

      - \`\`\`C
        /* ----------------
         *                query descriptor:
         *
         *        a QueryDesc encapsulates everything that the executor
         *        needs to execute the query.
         * ---------------------
         */
        typedef struct QueryDesc
        {
                /* These fields are provided by CreateQueryDesc */
                CmdType                operation;                /* CMD_SELECT, CMD_UPDATE, etc. */
                PlannedStmt *plannedstmt;        /* planner's output (could be utility, too) */
                
                /* ... */
                
                /* These fields are set by ExecutorStart */
                TupleDesc        tupDesc;                /* descriptor for result tuples */
                EState           *estate;                        /* executor's query-wide state */
                PlanState  *planstate;                /* tree of per-plan-node state */
        
                /* This field is set by ExecutorRun */
                bool                already_executed;        /* true if previously executed */
        
                /* This is always set NULL by the core system, but plugins can change it */
                struct Instrumentation *totaltime;        /* total time spent in ExecutorRun */
        } QueryDesc;
        \`\`\`

#### 策略选择模块(Portal)

**算法解析**

Portal模块将sql语句划分为两种类型：

- 执行计划树操作  ：可优化语句(DML，如SELECT，INSERT，UPDATE，DELETE)
- 非执行计划树操作 ：数据定义语句(DDL，如CREATE TABLE)

整个查询执行的策略选择、启动、回收 都由Portal 组件完成
![img](/pictures/level2/portal_ari.png)

Portal数据结构：

\`\`\`C++
typedef struct PortalData *Portal;
  
 typedef struct PortalData
 {
     /* Bookkeeping data */
     const char *name;           /* portal's name */
  
     /* The query or queries the portal will execute */
     const char *sourceText;     /* text of query (as of 8.4, never NULL) */
     CommandTag  commandTag;     /* command tag for original query */
     List       *stmts;          /* list of PlannedStmts */
     // 查询树链表
     /* If not NULL, Executor is active; call ExecutorEnd eventually: */
     QueryDesc  *queryDesc;      /* info needed for executor invocation */
     // 查执行所需的所有信息
     /* If portal returns tuples, this is their tupdesc: */
     TupleDesc   tupDesc;        /* descriptor for result tuples */
     // 可能的返回元组的结构
     /* Features/options */
     PortalStrategy strategy;    /* see above */
     
     /* Status data */
     PortalStatus status;        /* see above */
 } PortalData;  
\`\`\`

选择执行策略时主要根据原子操作的命令类型（是否是功能语句）以及查询树链表中原子操作的个数（是否仅为一个）。执行策略共分为以下五种：

\`\`\`C++
typedef enum PortalStrategy
{
    // 处理 SELECT 类语句，调用执行器
    PORTAL_ONE_SELECT,
    // 需要进行元组操作、缓存结果，调用执行器执行
    PORTAL_ONE_RETURNING,
    // 包含 SELECT 查询且有修改的 CTE
    PORTAL_ONE_MOD_WITH,
    // 单一数据定义语句，调用功能处理器
    PORTAL_UTIL_SELECT,
    // 混合策略，处理多个原子操作
    PORTAL_MULTI_QUERY,
} PortalStrategy;
\`\`\`

#### 功能处理器(UtilityProcessor)
![img](/pictures/level2/up.png)

**总述**

> UtilityProcessor 功能处理器负责处理数据定义（DDL）语句，会根据不同功能分别调用功能子函数。入口函数 ProcessUtility 会调用 standard_ProcessUtility，为该函数提供要执行的语句的类型、内容等，在内部依据 nodeTag 分发对应的操作。

**算法解析**

大体上可以将 nodeTag 分为以下类别：

| 节点类型nodeTag        | 核心处理函数          | 功能                                           |
| ---------------------- | --------------------- | ---------------------------------------------- |
| T_TransactionStmt      | BeginTransactionBlock | 标记事务开始                                   |
| EndTransactionBlock    | 结束事务              |                                                |
| DefineSavepoint        | 定义保存点            |                                                |
| RollbackToSavepoint    | 回滚到保存点          |                                                |
| T_PlannedStmt          | PerformCursorOpen     | 打开游标操作，初始化查询                       |
| T_ClosePortalStmt      | PerformPortalClose    | 关闭游标，释放游标占用资源                     |
| T_FetchStmt            | PerformPortalFetch    | 执行 FETCH/MOVE 操作                           |
| T_CreateStmt           | DefineRelation        | 创建关系表                                     |
| T_CreateTableSpaceStmt | CreateTableSpace      | 创建 tablespace，记录在 pg_tablespace 系统表中 |
| T_DropStmt             | RemoveRelations       | 删除关系表                                     |
| RemoveTypes            | 删除自定义类型        |                                                |
| T_CommentStmt          | CommentObiect         | 记录注释信息到 pg_description                  |
| T_CopyStmt             | DoCopy                | 完成 COPY 命令操作                             |
| T_AlterTableStmt       | AlterTable            | 实现 ALTER TABLE 命令                          |
| T_IndexStmt            | DefineIndex           | 创建索引                                       |
| T_CreateSeqStmt        | DefineSequence        | 创建一个用于自增属性的关系表                   |
| T_ExplainStmt          | ExplainQuery          | 执行 EXPLAIN 命令                              |

#### L3M2M4M3(执行器)

对于可优化的语句，psql 最后会生成一个查询计划树。查询逻辑使用逻辑代数表示，在执行时需要物理代数(physical algebra)。

PSQL 中的执行计划可以组织成一个二叉树（查询计划树）：每个物理操作符拥有 0~2 个输入和 1 个输出。在执行时数据流（元组）从下层流向上层，下层节点的输出作为上层节点的输入。根节点的输出即为查询的结果。

![img](/pictures/level2/portal.png)

物理代数的计划节点按照功能分为四类：控制节点(control node)、扫描节点(scan node)、连接节点(join node)和物化节点(materialization node)。他们都继承于公共父类 Plan，并为扫描、连接节点定义了公共父类 Scan，Join。Hash连接属于连接节点，故继承于Join。

\`\`\`C++
// 计划节点数据结构
typedef struct Plan
{
    NodeTag     type;
    /*
     * Common structural data for all Plan types.
     */
    int         plan_node_id;   /* unique across entire final plan tree */
    List       *targetlist;     /* target list to be computed at this node */
    List       *qual;           /* implicitly-ANDed qual conditions */
    struct Plan *lefttree;      /* input plan tree(s) */
    struct Plan *righttree;
    List       *initPlan;       /* Init Plan nodes (un-correlated expr
                                 * subselects) */
    Bitmapset  *extParam;
    Bitmapset  *allParam;
} Plan;

typedef struct Scan
{
    Plan        plan;
    Index       scanrelid;      /* relid is index into the range table */
} Scan;

typedef struct Join
{
    Plan        plan;
    JoinType    jointype;
    bool        inner_unique;
    List       *joinqual;       /* JOIN quals (in addition to plan.qual) */
} Join;
\`\`\`

查询计划树的初始化：Executor对查询计划树的初始化都是从根节点开始，递归对其子节点进行初始化。初始化由 ExeclnitNode 函数进行。每一种计划节点都有专门的初始化函数。在初始化的时候层层向下递归，完成初始化后层层返回。最终构造出完整的计划树：

\`\`\`C++
PlanState *
ExecInitNode(Plan *node, EState *estate, int eflags)
{
    PlanState  *result;
    List       *subps;
    ListCell   *l;
    if (node == NULL)
        return NULL;
    check_stack_depth();

    switch (nodeTag(node))
    {
        case T_Result:
            result = (PlanState *) ExecInitResult((Result *) node, estate, eflags);
            break;
        .........
\`\`\`

查询计划执行：实际执行部分由 ExecutePlan 函数完成。ExecutePlan 实际上是一个大循环，每次循环调用 ExecProcNode，从计划树中获取一个元组并进行相应处理.

执行器清理：当执行器处理完所有可获得的元组后，有ExecutorEnd函数进行善后。该函数的运行逻辑与ExecInitNode本质上一样，针对不同类型节点调用不同的清理函数，并从根节点开始递归清理。
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
