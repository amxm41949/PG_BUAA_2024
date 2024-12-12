<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
        <div class="header-content">
          <el-button type="info" @click="goBack" class="back-button">Back</el-button>
          <span class="text-large font-600 mr-3 title">L2M4M1(事务管理器)</span>
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
      imageSrc: '/pictures/level2/L2M4M1.png', // 替换为您的图片路径
      hotspots: [
        {
          id: '1', // 开启事务模块
          shape: 'poly',
          coords:
              '380,2,' +
              '595,2,' +
              '595,110,' +
              '380,110',
          href: '/l3m4m1m1'
        },
        {
          id: '2',  // 提交模块
          shape: 'poly',
          coords:
              '380,702,' +
              '595,702,' +
              '595,810,' +
              '380,810',
          href: '/l3m4m1m2'
        },
        {
          id: '3',  // 锁管理器
          shape: 'poly',
          coords:
              '1000,0,' +
              '1210,0,' +
              '1210,100,' +
              '1000,100',
          href: '/l2m4m3'
        },
        {
          id: '4',  // 日志管理模块
          shape: 'poly',
          coords:
              '380,902,' +
              '595,902,' +
              '595,1010,' +
              '380,1010',
          href: '/l2m4m2'
        },
        {
          id: '5',  // 编译执行模块
          shape: 'poly',
          coords:
              '5,265,' +
              '215,265,' +
              '215,375,' +
              '5,375',
          href: '/l2m2m4'
        },
      ],
      markdownText: ` 说明信息：
对于本模块，需要分别应对不同的事务指令，不同事务类型有不同的操作。
事务块的主要状态之间的转换关系如下：
![img](/pictures/level2/state.png)
事务状态(TransState=transaction state from server perspective)是enum枚举数据类型，一共含有6个状态，包括\`TRANS_DEFAULT\`，\`TRANS_START\`，\`TRANS_INPROGRESS\`，\`TRANS_COMMIT\`，\`TRANS_ABORT\`和\`TRANS_PREPARE\`。`,
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