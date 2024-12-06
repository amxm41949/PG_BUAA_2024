<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
                <div class="header-content">
                    <el-button type="info" @click="goBack" class="back-button">Back</el-button>
                    <span class="text-large font-600 mr-3 title">L4M2M3M3M1</span>
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
   1. ![img](https://xcnxiwfp39pl.feishu.cn/space/api/box/stream/download/asynccode/?code=OWVlMmRjZTBjYjg5MTYwMWMzYjg2YTFiMTBlMzFjMWVfUXFHc0Rta0YzZ2J1N0tRYllKNVViYUhOdzlncGptUmZfVG9rZW46RjNBSGI5MW95bzlwRml4cWg4emNWQlpkbkJkXzE3MzM0NjAyMTg6MTczMzQ2MzgxOF9WNA)

   2.  此动态规划逐层建立连接路径

   3. Level表示已经连接的表数
   4. Bushy Plan会构建起更多样的连接顺序
   5. 分区表：有些表因为大小等原因切割后存储，成为分区表，故而此处要进行针对其的优化
   6. 并行优化指通过gather操作等进行性能优化
2. 遗传算法
   1. ![img](https://xcnxiwfp39pl.feishu.cn/space/api/box/stream/download/asynccode/?code=NzEwYTNjYzI1YjQzZTVmNmI4NDRhYzg3ZTRlYjk1MDVfY3lKUXl2S3BTejc0Nk9vZVJoUDF1cjBHSE1mY2dzWGFfVG9rZW46WG5IRGJyM3Z5b1o5SFN4YUtva2NmNmlPbnZnXzE3MzM0NjAyMTg6MTczMzQ2MzgxOF9WNA)

   2.  在此遗传算法中

   3. 基本概念介绍
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
   4. 关键步骤解析
      - 初始化：使用\`gimme_pool_size()\` 和 \`gimme_number_generations()\` 计算种群的大小和代数
      - 交叉：通过指定的算子生成子代的染色体（查询顺序），例如momma [1,2,3,4] , daddy [2,4,1,3] 生成 [1, 2, 4, 3]
      - 变异：如随机交换基因顺序
      - 评估子代适应度：通过代价函数计算该染色体（查询顺序）代价
      - 推送子代：将子代按适应度加入到Pool的合适位置，会挤出Pool中最差者
      - 停止条件： 达到初始化时计算的代数
      - 注：交叉与变异均因算子而异
            `,
            // Markdown解析器实例
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

.rounded-box {
    position: absolute;
    top: 20%;
    /* 顶部偏移量 */
    left: 30%;
    /* 左边偏移量 */
    width: 200px;
    /* 圆角框宽度 */
    height: 100px;
    /* 圆角框高度 */
    background-color: rgba(255, 255, 255, 0.5);
    /* 半透明白色背景 */
    border: 2px solid black;
    /* 黑色边框 */
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box-content p {
    margin: 0;
    font-size: 16px;
    color: black;
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
