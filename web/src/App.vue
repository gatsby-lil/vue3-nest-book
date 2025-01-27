<script setup lang="ts"></script>

<template>
  <RouterView></RouterView>
</template>

<style lang="less">
html {
  --scroll-bar: 0;
}
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 2px;
}
::-webkit-scrollbar-track:horizontal {
  background: #f5f5f5;
  border-radius: 2px;
}
/* 滚动条 thumb 滑块 */
::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 2px;
}
& *:hover {
  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #cfcfcf;
  }
}
::-moz-scrollbar {
  width: 4px;
  height: 4px;
}
::-moz-scrollbar-track {
  background: #f5f5f5;
  border-radius: 2px;
}
::-moz-scrollbar-track:horizontal {
  background: #f5f5f5;
  border-radius: 2px;
}
/* 滚动条 thumb 滑块 */
::-moz-scrollbar-thumb {
  background: transparent;
  border-radius: 2px;
}
& *:hover {
  ::-moz-scrollbar-thumb {
    border-radius: 2px;
    background: #cfcfcf;
  }
}

::-ms-scrollbar {
  width: 4px;
  height: 4px;
}
::-ms-scrollbar-track {
  background: #f5f5f5;
  border-radius: 2px;
}
::-ms-scrollbar-track:horizontal {
  background: #f5f5f5;
  border-radius: 2px;
}
/* 滚动条 thumb 滑块 */
::-ms-scrollbar-thumb {
  background: transparent;
  border-radius: 2px;
}
& *:hover {
  ::-ms-scrollbar-thumb {
    border-radius: 2px;
    background: #cfcfcf;
  }
}
</style>
