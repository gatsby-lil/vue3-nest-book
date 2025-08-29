<template>
  <div class="medical-image-container">
    <!-- 画布容器 -->
    <canvas ref="canvas" class="image-canvas"></canvas>

    <!-- 交互按钮（示例） -->
    <div class="tools-container">
      <button @click="zoomIn">放大</button>
      <button @click="zoomOut">缩小</button>
      <button @click="pan">平移</button>
    </div>
  </div>
</template>

<script>
import cornerstone from 'cornerstone-core'
import * as cornerstoneTools from 'cornerstone-tools'
// import { loadAndParseDicom } from '@/utils/dicomLoader' // 自定义 DICOM 加载工具
function loadAndParseDicom() {}
export default {
  name: 'MedicalImageViewer',
  data() {
    return {
      imageId: null, // Cornerstone 图像 ID
      toolGroupId: 'viewer-tool-group', // 工具组 ID
    }
  },
  mounted() {
    this.initCornerstone()
    this.loadDicomImage('public/123.dcm') // 加载本地 DICOM 示例文件
  },
  methods: {
    // 初始化 Cornerstone
    initCornerstone() {
      // 1. 配置画布
      const canvas = this.$refs.canvas
      //   cornerstone.setCanvasImageRenderingQuality(canvas, 'high') // 设置渲染质量

      // 2. 注册交互工具（缩放、平移等）
      cornerstoneTools.external.cornerstone = cornerstone
      cornerstoneTools.init()
      cornerstoneTools.toolStateManager.registerToolGroup(this.toolGroupId)

      // 3. 绑定画布事件（示例：点击获取像素值）
      cornerstone.addEventListener(canvas, 'click', (event) => {
        const element = event.target
        const point = cornerstone.getMousePosition(element, event)
        const image = cornerstone.getImage(element)
        if (image) {
          const pixelValue = image.getPixel(point.x, point.y)
          console.log('点击位置像素值:', pixelValue)
        }
      })
    },

    // 加载 DICOM 图像（支持本地文件或远程 URL）
    async loadDicomImage(path) {
      // 示例：加载本地文件（需将文件放在 public 目录下）
      const dicomData = await loadAndParseDicom(path)

      // 1. 创建 Cornerstone 图像 ID
      this.imageId = `dicomImage:${Date.now()}`

      // 2. 注册图像到 Cornerstone
      cornerstone.setImageId(this.imageId, dicomData)

      // 3. 渲染图像到画布
      const canvas = this.$refs.canvas
      cornerstone.displayImage(canvas, this.imageId)

      // 4. 初始化交互工具（如平移工具）
      cornerstoneTools.setToolActive('pan', {
        toolGroupId: this.toolGroupId,
        mouseButton: 1, // 右键触发平移
      })
    },

    // 交互方法示例
    zoomIn() {
      const canvas = this.$refs.canvas
      cornerstoneTools.zoomTool.zoom(canvas, 1.2, { toolGroupId: this.toolGroupId })
    },

    zoomOut() {
      const canvas = this.$refs.canvas
      cornerstoneTools.zoomTool.zoom(canvas, 0.8, { toolGroupId: this.toolGroupId })
    },

    pan() {
      cornerstoneTools.setToolActive('pan', {
        toolGroupId: this.toolGroupId,
        mouseButton: 1, // 右键平移
      })
    },
  },
  beforeUnmount() {
    // 清理资源
    const canvas = this.$refs.canvas
    cornerstone.removeAllEventListeners(canvas)
    cornerstoneTools.toolStateManager.destroyToolGroup(this.toolGroupId)
  },
}
</script>

<style scoped>
.medical-image-container {
  position: relative;
  width: 800px;
  height: 600px;
}

.image-canvas {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
}

.tools-container {
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
