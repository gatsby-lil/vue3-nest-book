<template>
  <div class="test-box">TEST</div>
</template>

<script setup lang="ts">
import { util } from '@/utils'
let s = util.toType(new Set([1, 2, 3]))
console.log(s, 's')
</script>

<style lang="less" scoped>
.test-box {
  color: black;
  font-size: 16px;
  margin: 50px auto;
  width: 30%;
}
</style>
