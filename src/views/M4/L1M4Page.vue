<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div style="margin-bottom: 20px;"></div> <!-- 增加底部空白 -->
        <div class="header-content">
          <el-button type="info" @click="goBack" class="back-button">Back</el-button>
          <span class="text-large font-600 mr-3 title">L1M4(事务模块)</span>
        </div>
        <div style="margin-top: 20px;"></div> <!-- 增加顶部空白 -->
      </el-header>
      <el-main>
        <div class="image-container">
          <img id="mapAll" ref="mapAll" :src="imageSrc" usemap="#image-map"
               style="width: 100%; height: 100%; object-fit: contain;"/>
          <map name="image-map" id="image-map">
            <area v-for="hotspot in hotspots" :key="hotspot.id" :shape="hotspot.shape"
                  :coords="hotspot.coords" :href="hotspot.href"
                  @click.prevent="navigateTo(hotspot.href)"
                  @mouseover="highlightHotspot(hotspot.id)"
                  @mouseout="unhighlightHotspot(hotspot.id)"/>
          </map>
        </div>
        <div style="margin-top: 30px;"></div> <!-- 增加顶部空白 -->
        <el-steps style="max-width: 600px" :active="active" finish-status="success" align-center>
          <el-step title="Step 1"/>
          <el-step title="Step 2"/>
          <el-step title="Step 3"/>
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
      imageSrc: '/pictures/level1/L1M4.png', // 替换为您的图片路径
      hotspots: [
        {
          id: '1', //事务管理器
          shape: 'poly',
          coords:
              '580,85, ' +
              '810,85, ' +
              '810,200, ' +
              '580,200',
          href: '/l2m4m1'
        },
        {
          id: '2', //日志管理器
          shape: 'poly',
          coords:
              '580,300, ' +
              '810,300, ' +
              '810,415, ' +
              '580,415',
          href: '/l2m4m2'
        },
        {
          id: '3', // 锁管理器
          shape: 'poly',
          coords:
              '990,85, ' +
              '1220,85, ' +
              '1220,200, ' +
              '990,200',
          href: '/l2m4m3'
        },
        {
          id: '4',
          shape: 'poly',
          coords:
              '20,85, ' +
              '250,85, ' +
              '250,200, ' +
              '20,200',
          href: '/l2m2m4'
        },
        {
          id: '5',
          shape: 'poly',
          coords:
              '580,520, ' +
              '810,520, ' +
              '810,635, ' +
              '580,635',
          href: '/l1m3'
        },
      ],
      markdownText:
          `本模块主要与编译执行模块进行交互，包含三个子模块：
- 事务管理器：管理事务状态，调动其他模块，是事务管理模块的心脏。
- 锁管理模块：管理锁的使用，包括进程管理器，MVCC并发控制。
- 日志管理器：管理日志的写入，包括数据库历史恢复。
事务管理系统是PostgreSQL数据库系统中的关键组件，负责确保数据库的数据一致性、隔离性、持久性和可靠性，同时支持多个并发事务的执行。具体有如下的七个功能：

1. 事务的启动、提交、回滚：

提供开始事务和提交事务的机制，确保一组相关操作可以以原子性的方式被提交。允许在事务执行中发生错误或者需要取消操作时回滚事务，以确保数据库的一致性。

2. 事务状态管理：

追踪事务的状态，例如活动事务的列表、事务的隔离级别等。

3. 事务日志管理：

记录事务的变更，通常通过写日志来实现 Write-Ahead Logging（WAL）机制，以确保数据库的持久性和可恢复性。

4. 锁管理：

管理对共享资源的并发访问，确保多个事务之间能够正确协调对同一资源的访问。

5. 并发控制：

处理多个并发执行的事务，确保它们之间不会产生冲突，例如读-写冲突、写-写冲突。常见的并发控制机制包括锁和多版本并发控制（MVCC）。

6. 死锁检测与处理：

检测并发事务之间可能发生的死锁，并采取相应的措施解决死锁问题。

7. 分布式事务管理：

在分布式数据库系统中，协调跨多个节点的事务，确保分布式环境下的一致性和隔离性。`,
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