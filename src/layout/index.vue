<template>
  <div class="app-wrapper">
    <!--    左侧 menu-->
    <sidebar class="sidebar-container" :style="{ backgroundColor: variables.menuBg }"/>
    <div class="main-container">
      <div class="fiex-header">
        <!--    顶部 navbar-->
        <navbar />
      </div>
      <!--    内容区-->
      <app-main />
    </div>
  </div>
</template>

<script setup>
import variables from '@/styles/variables.scss'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}
</style>
