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
                                    <span>M2</span>
                                </span>
                            </template>
                            <a style="font-size: 32px;
                            font-weight: 600;">查询重写模块 </a>
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
    },
};
</script>