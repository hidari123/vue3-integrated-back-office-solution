<!--
 * @Author: hidari
 * @Date: 2022-05-27 12:33:50
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-27 14:07:46
 * @FilePath: \vue3-integrated-back-office-solution\src\views\profile\components\echarts\pieChart.vue
 * @Description: 饼图
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div ref="pieChart" :class="className" :style="{height:height,width:width}" />
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
  // 需要等dom加载完毕后再渲染页面
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

const pieChart = ref(null)
const initChart = () => {
  myChart = echarts.init(pieChart.value, 'macarons')
  myChart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      bottom: '10',
      data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
    },
    series: [
      {
        name: 'WEEKLY WRITE ARTICLES',
        type: 'pie',
        roseType: 'radius',
        radius: [15, 95],
        center: ['50%', '38%'],
        data: [
          { value: 320, name: 'Industries' },
          { value: 240, name: 'Technology' },
          { value: 149, name: 'Forex' },
          { value: 100, name: 'Gold' },
          { value: 59, name: 'Forecasts' }
        ],
        animationEasing: 'cubicInOut',
        animationDuration: 2600
      }
    ]
  })
}
</script>
