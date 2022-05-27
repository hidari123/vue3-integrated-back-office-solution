<!--
 * @Author: hidari
 * @Date: 2022-05-27 12:33:50
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-27 15:09:38
 * @FilePath: \vue3-integrated-back-office-solution\src\views\profile\components\echarts\lineChart.vue
 * @Description: 折线图
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div ref="lineChart" :class="className" :style="{height:height,width:width}" />
</template>

<script setup>
import { inject, defineProps, onMounted, nextTick, ref, onBeforeUnmount, watch } from 'vue'
// 引入 echarts 主题
import 'echarts/theme/macarons'
import { useStore } from 'vuex'

const props = defineProps({
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
    default: '350px'
  },
  autoResize: {
    type: Boolean,
    default: true
  },
  chartData: {
    type: Object,
    required: true
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
const store = useStore()
watch(() => store.getters.lineChartData, (val) => {
  console.log(val)
  setOptions(val)
}, {
  deep: true
})
const lineChart = ref(null)
const initChart = () => {
  myChart = echarts.init(lineChart.value, 'macarons')
  setOptions(props.chartData)
}
const setOptions = ({ expectedData, actualData } = {}) => {
  myChart.setOption({
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      boundaryGap: false,
      axisTick: {
        show: false
      }
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: [5, 10]
    },
    yAxis: {
      axisTick: {
        show: false
      }
    },
    legend: {
      data: ['expected', 'actual']
    },
    series: [{
      name: 'expected',
      itemStyle: {
        normal: {
          color: '#FF005A',
          lineStyle: {
            color: '#FF005A',
            width: 2
          }
        }
      },
      smooth: true,
      type: 'line',
      data: expectedData,
      animationDuration: 2800,
      animationEasing: 'cubicInOut'
    },
    {
      name: 'actual',
      smooth: true,
      type: 'line',
      itemStyle: {
        normal: {
          color: '#3888fa',
          lineStyle: {
            color: '#3888fa',
            width: 2
          },
          areaStyle: {
            color: '#f3f8ff'
          }
        }
      },
      data: actualData,
      animationDuration: 2800,
      animationEasing: 'quadraticOut'
    }]
  })
}
</script>
