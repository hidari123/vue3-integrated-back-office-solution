<!--
 * @Author: hidari
 * @Date: 2022-05-27 12:33:50
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-27 12:55:31
 * @FilePath: \vue3-integrated-back-office-solution\src\views\profile\components\echarts\barChart.vue
 * @Description: 条形图
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div ref="barChart" :class="className" :style="{height:height,width:width}" />
</template>

<script setup>
import { inject, defineProps, onMounted, nextTick, ref, onBeforeUnmount } from 'vue'
// 引入 echarts 主题
import 'echarts/theme/macarons'

defineProps({
  className: {
    type: String,
    default: 'chart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '300px'
  }
})
// 引入 echarts
let myChart = null
const echarts = inject('ec')
onMounted(() => {
  nextTick(() => {
    initChart()
  })
})
onBeforeUnmount(() => {
  if (!myChart) return
  // 释放Chart类使用的资源
  myChart.dispose()
  myChart = null
})
const animationDuration = 6000

const barChart = ref(null)
const initChart = () => {
  myChart = echarts.init(barChart.value, 'macarons')
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: 10,
      left: '2%',
      right: '2%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }],
    yAxis: [{
      type: 'value',
      axisTick: {
        show: false
      }
    }],
    series: [{
      name: 'pageA',
      type: 'bar',
      stack: 'vistors',
      barWidth: '60%',
      data: [79, 52, 200, 334, 390, 330, 220],
      animationDuration
    }, {
      name: 'pageB',
      type: 'bar',
      stack: 'vistors',
      barWidth: '60%',
      data: [80, 52, 200, 334, 390, 330, 220],
      animationDuration
    }, {
      name: 'pageC',
      type: 'bar',
      stack: 'vistors',
      barWidth: '60%',
      data: [30, 52, 200, 334, 390, 330, 220],
      animationDuration
    }]
  })
}
</script>

<style>

</style>
