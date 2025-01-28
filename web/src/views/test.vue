<template>
  <div class="test-box">TEST</div>
</template>

<script setup lang="ts">
import { util } from '@/utils'
let obj = {
  name: '珠峰',
  age: 13,
  bool: true,
  n: null,
  u: undefined,
  sym: Symbol('sym'),
  big: 10n,
  list: [10, 20, 30],
  reg: /\d+/,
  time: new Date(),
  err: new Error('xxx'),
  num: new Number(1),
  ke: {
    js: '基础课',
    web: '高级课',
  },
  [Symbol('KEY')]: 100,
  fn: function () {},
  xxx: Object(Symbol()),
}
// obj.obj = obj
let obj1 = {
  name: '张三',
  age: 25,
  hobby: {
    music: 100,
    jump: 80,
  },
}
// obj1.obj1 = obj1
let obj2 = {
  name: '李四',
  age: 22,
  sex: 0,
  hobby: {
    read: 100,
    music: 90,
  },
}
obj2.obj2 = obj2
let obj3 = {
  name: '王五',
  age: 20,
  height: '158cm',
  score: {
    math: 100,
    chinese: 90,
  },
}

let n = util.merge(true, obj1, obj2)
console.log(n)
</script>

<style lang="less" scoped>
.test-box {
  color: black;
  font-size: 16px;
  margin: 50px auto;
  width: 30%;
}
</style>
