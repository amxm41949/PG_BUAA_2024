<template>
    <div class="common-layout">
        <el-container>
            <el-header>

                <div class="header-content">
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane name="first">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>L4</span>
                                </span>
                            </template>
                            <a href="/" target="_self" style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">现在位于&nbsp;&nbsp;&nbsp;&nbsp;第 4 层</a>
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
                            <a href="/l2m2m3" target="_self" style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">查询规划模块</a>
                        </el-tab-pane>
                        <el-tab-pane name="fourth">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M2</span>
                                </span>
                            </template>
                            <a href="/l3m2m3m2" target="_self" style="text-decoration: none; color: #ffffff;font-size: 32px;
                            font-weight: 600;">查询规划——路径生成</a>
                        </el-tab-pane>
                        <el-tab-pane name="fifth">
                            <template #label>
                                <span class="custom-tabs-label">
                                    <span>M1</span>
                                </span>
                            </template>
                            初步路径规划
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
            activeName: 'fifth',
            active: 0,
            imageSrc: '/pictures/level4/L4M2M3M2M1.png', // 替换为您的图片路径
            hotspots: [
                // ...您的热点数据
            ],
            markdownText: `**总览**

> 初步规划路径

**数据流信息**

- PlannerInfo规划信息
- 加入了路径信息的PlannerInfo

> - 基础关系集合是不需要连接的集合，也即先确定有哪些表参与，PG选择用位图表示

> - 基础关系的访问路径指访问该节点的一个Path元，其中记录着Cost与访问方法（如顺序扫描等）

> - 后续连接依靠这些Path元不断合并

> - 在连接时有三种算法可供选择：动态规划，遗传算法，以及为扩展留出的一个hook

**算法解析**

1. 动态规划
   ![img](/pictures/level4/dp.png)

   1.  此动态规划逐层建立连接路径

   2. Level表示已经连接的表数
   3. Bushy Plan会构建起更多样的连接顺序
   4. 分区表：有些表因为大小等原因切割后存储，成为分区表，故而此处要进行针对其的优化
   5. 并行优化指通过gather操作等进行性能优化
2. 遗传算法
   ![img](/pictures/level4/hp.png)

   在此遗传算法中

   1. 基本概念介绍
      - 基因Gene：一个基因代表一个基础关系，用整数表示
      - 染色体Chromosome：
      - \`\`\`C
        typedef struct Chromosome
        {
           Gene     *string;  // 由Gene构成的有序表示
           Cost     worth;    // 染色体的适应度
        } Chromosome;
        \`\`\`

      - 种群Pool：多个染色体形成，代码中为Pool
      - \`\`\`C
        typedef struct Pool {     
            Chromosome *data;     
            int size;             // 种群大小
            int string_length;    // 基因（基础关系）数量 
        } Pool;
        \`\`\`
   2. 关键步骤解析
      - 初始化：使用\`gimme_pool_size()\` 和 \`gimme_number_generations()\` 计算种群的大小和代数
      - 交叉：通过指定的算子生成子代的染色体（查询顺序），例如momma [1,2,3,4] , daddy [2,4,1,3] 生成 [1, 2, 4, 3]
      - 变异：如随机交换基因顺序
      - 评估子代适应度：通过代价函数计算该染色体（查询顺序）代价
      - 推送子代：将子代按适应度加入到Pool的合适位置，会挤出Pool中最差者
      - 停止条件： 达到初始化时计算的代数
      - 注：交叉与变异均因算子而异
            `,
        };
    },
    computed: {
        // 计算属性用于解析Markdown
        compiledMarkdown() {
            return this.$md.render(this.markdownText);
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
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
    mounted() {
        $('#mapAll').mapster({
            fillColor: '1AC4F9',
            strokeColor: "FFFFFF",
            strokeWidth: 3,
            fillOpacity: 0.6,
            singleSelect: true,
        });
    }
};
</script>