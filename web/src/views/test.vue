<template>
  <div class="test-box">
    <a-card title="大模型">
      <a-space direction="vertical" size="large">
        <a-input-search
          :style="{ width: '320px' }"
          :loading="loading"
          v-model="question"
          @click="search"
          placeholder="输入你的问题"
          search-button />
        <!-- <a-textarea placeholder="AI回复" allow-clear v-model="content" /> -->
        <div>AI:</div>
        <div>{{ content }}</div>
      </a-space>
    </a-card>
    <!-- <a-card title="MoonShoot" :style="{ marginTop: '20px' }">
      <a-space direction="vertical" size="large">
        <a-input-search
          :style="{ width: '320px' }"
          :loading="loading"
          v-model="question"
          @click="search"
          placeholder="输入你的问题"
          search-button />
        <div>AI:</div>
        <div>{{ content }}</div>
      </a-space>
    </a-card> -->
  </div>
</template>

<script setup lang="ts">
import { util } from '@/utils'
import { testApi } from '@/api'
import { onMounted } from 'vue'
const question = ref('')
const content = ref('')
const loading = ref(false)
const eventSourceRef = ref(null)
async function search() {
  if (!question.value) {
    return
  }
  loading.value = true
  content.value = ''
  // testApi.sendQuestion(question.value)
  const eventSource = new EventSource(`http://localhost:3000/stream?question=${question.value}`)
  eventSource.addEventListener('message', (e) => {
    console.log(e.data)
    loading.value = false
    content.value += e.data || ''
  })
  eventSource.addEventListener('end', () => {
    console.log('传输完成')
    eventSource.close()
  })
}
// onMounted(() => {
//   console.log('mounted')
//   eventSourceRef.value = new EventSource(`http://localhost:3000/info`)
//   eventSourceRef.value.addEventListener('message', (e) => {
//     console.log(e.data)
//   })
//   eventSourceRef.value.addEventListener('end', () => {
//     console.log('传输完成')
//     eventSource.close()
//   })
// })
</script>

<style lang="less" scoped>
.test-box {
  color: black;
  font-size: 16px;
  margin: 50px auto;
  width: 30%;
}
</style>
