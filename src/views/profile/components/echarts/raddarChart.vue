<!--
 * @Author: hidari
 * @Date: 2022-05-27 12:33:50
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-27 12:59:14
 * @FilePath: \vue3-integrated-back-office-solution\src\views\profile\components\echarts\raddarChart.vue
 * @Description: 雷达图
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div ref="raddarChart" :class="className" :style="{height:height,width:width}" />
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
const animationDuration = 3000

const raddarChart = ref(null)
const initChart = () => {
  myChart = echarts.init(raddarChart.value, 'macarons')
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    radar: {
      radius: '66%',
      center: ['50%', '42%'],
      splitNumber: 8,
      splitArea: {
        areaStyle: {
          color: 'rgba(127,95,132,.3)',
          opacity: 1,
          shadowBlur: 45,
          shadowColor: 'rgba(0,0,0,.5)',
          shadowOffsetX: 0,
          shadowOffsetY: 15
        }
      },
      indicator: [
        { name: 'Sales', max: 10000 },
        { name: 'Administration', max: 20000 },
        { name: 'Information Technology', max: 20000 },
        { name: 'Customer Support', max: 20000 },
        { name: 'Development', max: 20000 },
        { name: 'Marketing', max: 20000 }
      ]
    },
    legend: {
      left: 'center',
      bottom: '10',
      data: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
    },
    series: [{
      type: 'radar',
      symbolSize: 0,
      areaStyle: {
        normal: {
          shadowBlur: 13,
          shadowColor: 'rgba(0,0,0,.2)',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          opacity: 1
        }
      },
      data: [
        {
          value: [5000, 7000, 12000, 11000, 15000, 14000],
          name: 'Allocated Budget'
        },
        {
          value: [4000, 9000, 15000, 15000, 13000, 11000],
          name: 'Expected Spending'
        },
        {
          value: [5500, 11000, 12000, 15000, 12000, 12000],
          name: 'Actual Spending'
        }
      ],
      animationDuration: animationDuration
    }]
  })
}
</script>
