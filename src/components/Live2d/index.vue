<template>
  <div class="index">
    <div class="waifu">
      <!-- 提示框 -->
      <div class="waifu-tips"></div>

      <!-- 看板娘画布 -->
      <canvas id="live2d" class="live2d" />

      <!-- 工具栏 -->
      <div class="waifu-tool">
        <p class="fui-eye">
          <i class="el-icon-share" />
        </p>
        <p class="fui-user">
          <i class="el-icon-warning" />
        </p>
        <p class="fui-photo">
          <i class="el-icon-camera-solid" />
        </p>
        <!-- <p class="fui-info-circle">
          <i class="el-icon-s-comment" />
        </p> -->
        <p class="fui-cross">
          <i class="el-icon-error" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { initModel } from '../../../public/live2d/waifu-tips'
import '../../../public/live2d/live2d'
import '../../../public/live2d/waifu.css'
export default {
  name: 'PhyLive2d',
  components: {},
  data() {
    return {}
  },
  mounted() {
    live2d_settings.modelId = 5 // 默认模型 ID
    live2d_settings.modelTexturesId = 1 // 默认材质 ID
    /* 在 initModel 前添加 */
    initModel(require('../../../public/live2d/waifu-tips.json'))
  },
  methods: {}
}
</script>

<style scoped>
.waifu-tool p i {
  cursor: pointer;
}
</style>
