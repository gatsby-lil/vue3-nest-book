<template>
  <div class="default-layout">
    <!-- 菜单导航 -->
    <div class="menu-box"></div>
    <div class="view-layout-box">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.default-layout {
  width: 100vw;
  height: 100vh;
  background: #f0f3f5;
  .menu-box {
    height: 48px;
    border-top: 6px solid;
    border-top-color: rgb(0, 185, 107);
    box-shadow:
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }
  .view-layout-box {
    padding: 16px;
    margin: 0;
    height: calc(100% - 90px);
  }
}
</style>
