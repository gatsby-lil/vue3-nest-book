<template>
  <div class="chat-ai">
    <!-- 这里放置组件的模板内容 -->
    <div class="chat-ai-left">
      <!-- <a-button type='primary' :icon={<IconPlus />} /> -->
      <Conversations :items="items" default-active-key="item1" />
    </div>
    <div class="chat-ai-right">
      <div class="chat">
        <Sender
          style="width: 800px"
          v-model:value="value"
          :loading="loading"
          :auto-size="{ minRows: 2, maxRows: 6 }"
          @submit="
            () => {
              value = ''
              loading = true
            }
          "
          @cancel="
            () => {
              loading = false
            }
          " />
      </div>
    </div>
  </div>
</template>

// 这里放置组件的逻辑代码
<script setup lang="ts">
import { Conversations, Sender } from 'ant-design-x-vue'
import type { ConversationsProps } from 'ant-design-x-vue'

defineOptions({ name: 'AXConversationsBasicSetup' })
const value = ref('Hello? this is X!')
const loading = ref(false)
const items = []
// const items: ConversationsProps['items'] = Array.from({ length: 50 }).map((_, index) => ({
//   key: `item${index + 1}`,
//   label: `Conversation Item ${index + 1}`,
//   disabled: index === 3,
// }))
</script>

<style scoped>
/* 这里放置组件的样式代码 */
.chat-ai {
  display: flex;
  .chat-ai-left {
    display: flex;
    flex-direction: column;
    width: 300px;
    flex-shrink: 0;
    height: 100vh;
    background-color: aliceblue;
  }
  .chat-ai-right {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    .chat {
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
    }
  }
}
</style>
