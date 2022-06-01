<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [个人中心](#%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83)
  - [基本布局](#%E5%9F%BA%E6%9C%AC%E5%B8%83%E5%B1%80)
  - [创建 PanThumb 头像组件](#%E5%88%9B%E5%BB%BA-panthumb-%E5%A4%B4%E5%83%8F%E7%BB%84%E4%BB%B6)
  - [功能模块开发](#%E5%8A%9F%E8%83%BD%E6%A8%A1%E5%9D%97%E5%BC%80%E5%8F%91)
    - [Echart](#echart)
      - [折线图](#%E6%8A%98%E7%BA%BF%E5%9B%BE)
        - [动态改变折线图数据](#%E5%8A%A8%E6%80%81%E6%94%B9%E5%8F%98%E6%8A%98%E7%BA%BF%E5%9B%BE%E6%95%B0%E6%8D%AE)
      - [条形图 `src\views\profile\components\echarts\barChart.vue`](#%E6%9D%A1%E5%BD%A2%E5%9B%BE-src%5Cviews%5Cprofile%5Ccomponents%5Cecharts%5Cbarchartvue)
      - [饼图 `src\views\profile\components\echarts\pieChart.vue`](#%E9%A5%BC%E5%9B%BE-src%5Cviews%5Cprofile%5Ccomponents%5Cecharts%5Cpiechartvue)
      - [雷达图 `src\views\profile\components\echarts\raddarChart.vue`](#%E9%9B%B7%E8%BE%BE%E5%9B%BE-src%5Cviews%5Cprofile%5Ccomponents%5Cecharts%5Craddarchartvue)
    - [业务列表](#%E4%B8%9A%E5%8A%A1%E5%88%97%E8%A1%A8)
    - [todo组件](#todo%E7%BB%84%E4%BB%B6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-05-26 20:07:56
 * @LastEditors: hidari 
 * @LastEditTime: 2022-05-27 09:33:35
 * @FilePath: \vue3-integrated-back-office-solution\src\markdown\profile.md
 * @Description: 个人中心模块
 * 
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved. 
-->
# 个人中心

个人中心模块是一个集合了 `vue` + `element-plus` 的业务模块，主要分成三个大块：

1. `element-plus` 组件
2. 自定义业务组件
3. 业务中的国际化处理

## 基本布局
整个 **个人中心** 被分为左右两大块：

1. 项目介绍
2. `tabs`
   1. 功能
   2. 章节
   3. 作者

根据功能划分，整个项目应该包含 4 个组件，分别对应着 4 个功能。

所以，我们想要完成 **个人中心模块基本布局** 那么就需要先创建出这四个组件

1. 在 `views/profile/components` 下创建 **项目介绍** 组件 `ProjectCard`

2. 在 `views/profile/components` 下创建 **功能** 组件 `feature`

3. 在 `views/profile/components` 下创建 **章节** 组件 `chapter`

4. 在 `views/profile/components` 下创建 **作者** 组件 `author`

5. 进入到 `views/profile/index` 页面，绘制基本布局结构

```vue
<template>
    <div class="my-container">
    <el-row>
        <el-col :span="6">
        <project-card class="user-card"></project-card>
        </el-col>
        <el-col :span="18">
        <el-card>
            <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
                <feature />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
                <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
                <author />
            </el-tab-pane>
            </el-tabs>
        </el-card>
        </el-col>
    </el-row>
    </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Chapter from './components/Chapter.vue'
import Feature from './components/Feature.vue'
import Author from './components/Author.vue'
import { ref } from 'vue'
const activeName = ref('feature')
</script>

<style lang="scss" scoped>
.my-container {
    .user-card {
    margin-right: 20px;
    }
}
</style>

```

## 创建 PanThumb 头像组件

在 **项目介绍** 模块中，存在一个头像：**鼠标移入之后，头像会移开，显示出后面的文本**

> 整个组件核心的移动处理通过 `css` 进行实现

1. 创建 `components/PanThumb/index`

```vue
<template>
     <div
       :style="{ zIndex: zIndex, height: height, width: width }"
       class="pan-item"
     >
        <!-- 内层 -->
        <div class="pan-info">
            <div class="pan-info-roles-container">
                <slot />
            </div>
        </div>
        <!-- 外层 -->
        <div :style="{ backgroundImage: `url(${image})` }" class="pan-thumb"></div>
     </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  image: {
    type: String
  },
  zIndex: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default: '150px'
  },
  height: {
    type: String,
    default: '150px'
  }
})
</script>

<style lang="scss" scoped>
   .pan-item {
     width: 200px;
     height: 200px;
     border-radius: 50%;
     display: inline-block;
     position: relative;
     cursor: pointer;
     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
     &:hover .pan-info p a {
       opacity: 1;
       transform: translateX(0px) rotate(0deg);
     }
    &:hover .pan-thumb {
       transform: rotate(-110deg);
     }

     .pan-info {
       position: absolute;
       width: inherit;
       height: inherit;
       border-radius: 50%;
       overflow: hidden;
       box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);

       h3 {
         color: #fff;
         text-transform: uppercase;
         position: relative;
         letter-spacing: 2px;
         font-size: 14px;
         margin: 0 60px;
         padding: 22px 0 0 0;
         height: 85px;
         font-family: 'Open Sans', Arial, sans-serif;
         text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
       }

       p {
         color: #fff;
         padding: 10px 5px;
         font-style: italic;
         margin: 0 30px;
         font-size: 12px;
         border-top: 1px solid rgba(255, 255, 255, 0.5);

         a {
           display: block;
           color: #333;
           width: 80px;
           height: 80px;
           background: rgba(255, 255, 255, 0.3);
           border-radius: 50%;
           color: #fff;
           font-style: normal;
           font-weight: 700;
           text-transform: uppercase;
           font-size: 9px;
           letter-spacing: 1px;
           padding-top: 24px;
           margin: 7px auto 0;
           font-family: 'Open Sans', Arial, sans-serif;
           opacity: 0;
           transition: transform 0.3s ease-in-out 0.2s,
             opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s;
           transform: translateX(60px) rotate(90deg);
         }

         a:hover {
           background: rgba(255, 255, 255, 0.5);
         }
       }

       .pan-info-roles-container {
         padding: 20px;
         text-align: center;
       }
     }

     .pan-thumb {
       width: 100%;
       height: 100%;
       background-position: center center;
       background-size: cover;
       border-radius: 50%;
       overflow: hidden;
       position: absolute;
       transform-origin: 95% 40%;
       transition: all 0.3s ease-in-out;
     }
   }
</style>
```

2. 在 `projectCard` 中导入
```vue
<template>
     <div class="">
       <pan-thumb
         :image="avatar"
         :height="'100px'"
         :width="'100px'"
         :hoverable="false"
       >
         <div>Hello</div>
         Hidari Ackerman
       </pan-thumb>
     </div>
</template>

<script setup>
import PanThumb from '@/components/panThumb'
import avatar from '@/images/avatar.jpg'
</script>

<style>

</style>
```

## 功能模块开发

### Echart

#### 折线图

1. 折线图数据存储 `src\constant\lineChart.js`
```js
export const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
```

2. 折线图仓库 `src\store\modules\lineChart.js`
```js
export default {
  namespaced: true,
  state: () => ({
    // 折线图数据
    lineChartData: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    }
  }),
  mutations: {
    /**
     * 更新折线图数据
     * @param {ctx} state
     * @param {*} lineChartData
     */
    setLineChartData (state, lineChartData) {
      state.lineChartData = lineChartData
    }
  }
}
```
3. getters 快捷访问 `\src\store\getters.js`
```js
  /**
   * 折线图数据
   * @param {*} state
   * @returns
   */
  lineChartData: state => state.lineChart.lineChartData,
```

4. 渲染页面 `src\views\profile\components\echarts\lineChart.vue`
```vue
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

// 监听数据变化动态加载 echarts
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
// 因为需要动态改变 所以抽成函数
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
```

##### 动态改变折线图数据

1. 对数据进行处理需要引入 count-to 插件(需要直接复制到项目中使用)
`/src/components/vueCountTo`

2. 渲染页面
```vue
<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChart('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            New Visits
          </div>
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChart('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Messages
          </div>
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChart('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Purchases
          </div>
          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChart('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Shoppings
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { defineEmits } from 'vue'
import CountTo from '@/components/vueCountTo/vue-countTo.vue'
const emit = defineEmits(['handleSetLineChartData'])
const handleSetLineChart = (type) => {
  emit('handleSetLineChartData', type)
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 24px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
```

3. `feature` 组件中获取传递来的 `type` 类型 改变数据 `src\views\profile\components\feature.vue`
- 因为需要监听获得 所以本项目保存在 `vuex` 中
```js
// 折线图数据
import { lineChartData } from '@/constant/lineChart'
import { useStore } from 'vuex'

/**
 * 切换折线图数据
 */
const store = useStore()
const handleSetLineChartData = (type) => {
  store.commit('lineChart/setLineChartData', lineChartData[type])
}
```

#### 条形图 `src\views\profile\components\echarts\barChart.vue`
```vue
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
```

#### 饼图 `src\views\profile\components\echarts\pieChart.vue`
```vue
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
```


#### 雷达图 `src\views\profile\components\echarts\raddarChart.vue`
```vue
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
```


### 业务列表

1. 获取数据
```js
/**
 * 获取业务列表
 * @returns
 */
export const transactionList = () => request({
  url: '/transaction/list',
  method: 'get'
})
```

2. 渲染表格 `src\views\profile\components\transactionTable.vue`
```vue
<template>
  <el-table :data="list" stripe style="width: 100%;padding-top: 15px;">
    <el-table-column prop="order_no" label="Order_No" min-width="200" />
    <el-table-column prop="price" label="Price"  width="195" align="center" >
      <template v-slot="scope">
        ¥{{ scope.row.price }}
      </template>
    </el-table-column>
    <el-table-column prop="status" label="Status" width="100" align="center" >
      <template v-slot="{row}">
        <el-tag :type="row.status">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { transactionList } from '@/api/user'
import { ref } from 'vue'
const list = ref([])
transactionList().then(res => {
  list.value = res.items.slice(0, 8)
})
</script>
```

### todo组件

1. 定义常量
```js
export const defalutList = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]
```

2. 仓库处理数据并本地持久化
```js
import { TODO_KEYS } from '@/constant'
import { defalutList } from '@/constant/defaultList'
import { getItem, setItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: () => ({
    todos: getItem(TODO_KEYS) || defalutList
  }),
  mutations: {
    /**
       * 保存到本地
       * @param {*} state
       */
    setLocalStorage (state) {
      setItem(TODO_KEYS, state.todos)
    },
    /**
     * 添加todo
     * @param {*} state
     * @param {*} event 监听键盘抬起事件传递的事件 event
     */
    addTodo (state, event) {
      // 获取输入文本内容
      const text = event.target.value
      // 如果有值 添加到数组中
      if (state.todos.find(todo => todo.text === text)) return
      if (text.trim()) {
        state.todos.push({ text, done: false })
        // 本地存储
        this.commit('todo/setLocalStorage')
      }
      // 清空输入框内容
      event.target.value = ''
    },

    /**
     * 切换完成状态
     * @param {*} state
     * @param {*} item 切换的某一项
     */
    toggleTodo (state, item) {
      state.todos.forEach(todo => {
        if (todo.text === item.text) {
          todo.done = !todo.done
        }
      })
      // 本地存储
      this.commit('todo/setLocalStorage')
    },

    /**
     * 删除 todo
     * @param {*} state
     * @param {*} item 删除的某一项
     */
    deleteTodo (state, item) {
      console.log(item)
      state.todos.splice(state.todos.indexOf(item), 1)
      // 本地存储
      this.commit('todo/setLocalStorage')
    },

    /**
     * 修改某一项 text
     * @param {*} state
     * @param {*} value 修改后的值
     */
    editTodo (state, { todo, value }) {
      state.todos.forEach(item => {
        if (item.text === todo.text) {
          item.text = value
        }
      })
      this.commit('todo/setLocalStorage')
    },

    /**
     * 清空已完成
     * @param {*} state
     */
    clearCompleted (state) {
      state.todos = state.todos.filter(todo => !todo.done)
      this.commit('todo/setLocalStorage')
    },

    /**
     * 切换全部
     * @param {*} state
     */
    toggleAll (state, { done }) {
      state.todos.forEach(todo => {
        todo.done = done
        this.commit('todo/setLocalStorage')
      })
    }
  }
}
```

3. 自定义 focus 指令
`src\directives\index.js`

- 自定义指令钩子函数
```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount() {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted() {},
  // 绑定元素的父组件更新前调用
  beforeUpdate() {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated() {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount() {},
  // 绑定元素的父组件卸载后调用
  unmounted() {}
}
```

- 指令的钩子会传递以下几种参数：
    1. `el`：指令绑定到的元素。这可以用于直接操作 `DOM`。
    2. `binding`：一个对象，包含以下 `property`。
    3. `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
    4. `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
    5. `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
    6. `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
    7. `instance`：使用该指令的组件实例。
    8. `dir`：指令的定义对象。
    9. `vnode`：代表绑定元素的底层 `VNode`。
    10. `prevNode`：之前的渲染中代表指令所绑定元素的 `VNode`。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

```js
// 自定义指令 focus
const focus = (el, { value }) => {
  if (value) {
    el.focus()
  }
}

export default app => {
  app.directive('focus', focus)
}
```
```js
// 自定义指令
import installDirective from '@/directives'

installDirective(app)
```

4. 渲染页面
`src\views\profile\components\todoList\todo.vue`
```vue
<template>
<!-- 只有元素内容会被列在文档大纲中时，才适合用section元素 -->
<!-- section的作用是对页面上的内容进行分块，如各个有标题的版块、功能区或对文章进行分段，不要与有自己完整、独立内容的article混淆 -->
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <input
        :checked="todo.done"
        class="toggle"
        type="checkbox"
        @change="toggleTodo(todo)"
      >
      <!-- dblclick 双击 -->
      <label @dblclick="editing = true" v-text="todo.text" />
      <button class="destroy" @click="deleteTodo( todo )" />
    </div>
    <input
      v-show="editing"
      :value="todo.text"
      v-focus="editing"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    >
  </li>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useStore } from 'vuex'
const props = defineProps({
  todo: {
    type: Object,
    default: function () {
      return {}
    }
  }
})

const store = useStore()
const editing = ref(false)
/**
 * 删除
 */
const deleteTodo = (todo) => {
  console.log(todo)
  store.commit('todo/deleteTodo', todo)
}
/**
 * 修改
 */
const editTodo = ({ todo, value }) => {
  store.commit('todo/editTodo', { todo, value })
}
/**
 * 切换
 */
const toggleTodo = (todo) => {
  store.commit('todo/toggleTodo', todo)
}
/**
 * 修改完成
 */
const doneEdit = (e) => {
  const value = e.target.value.trim()
  const { todo } = props
  if (!value) {
    deleteTodo({
      todo
    })
  } else if (editing.value) {
    editTodo({
      todo,
      value
    })
    editing.value = false
  }
}
/**
 * 取消修改
 */
const cancelEdit = (e) => {
  e.target.value = props.todo.text
  editing.value = false
}

</script>
```
`src\views\profile\components\todoList\index.vue`
```vue
<template>
    <section class="todoapp">
        <!-- header -->
        <header class="header">
            <!-- autocomplete 属性是表单字段中的HTML5新属性，该属性有两种状态值，分别为"on" 和 “off”，该属性可省略：省略属性值后默认值为"on"，也可以省略属性名，直接写入关键字on或off。 因为浏览器内部也会默认开启一个输入字段后自动补全的功能，所以在有些情况下我们设置 autocomplete=“off” 后会失效。
            对此，MDN中给出了一个非常棒的tip，重点翻译于这一段： 尽管将autocomplet值设为off，在某些情况下仍会失效。
            所以处理这种情况的一个小tip就是将该属性赋一个除on 或 off之外的一个任意的值（你自己可以随便胡诌八扯一个值）。例如: autocomplete=“new-pwd”。 -->
            <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="$store.commit('todo/addTodo', $event)">
        </header>
        <!-- main section -->
        <section v-show="todos.length" class="main">
            <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="$store.commit('todo/toggleAll',{ done: !allChecked })">
            <label for="toggle-all" />
                  <ul class="todo-list">
                    <todo
                    v-for="(todo, index) in filteredTodos"
                    :key="index"
                    :todo="todo"
                    />
                </ul>
        </section>
        <!-- footer -->
        <footer v-show="todos.length" class="footer">
        <span class="todo-count">
            <strong>{{ remaining }}</strong>
            {{ pluralize(remaining,'item') }} left
        </span>
        <ul class="filters">
            <li v-for="(val, key) in filters" :key="key">
            <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ capitalize(key) }}</a>
            </li>
        </ul>
        <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="$store.commit('todo/clearCompleted')">
            Clear completed
        </button> -->
        </footer>
    </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import Todo from './todo.vue'

// 筛选数据
const filters = reactive({
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
})
// 显示类型 默认为 all
const visibility = ref('all')
// 需要展示的 todos 数据
const store = useStore()
const todos = ref(store.getters.todos)

// 全选
const allChecked = computed(() => {
  return todos.value.every(todo => todo.done)
})

// 筛选
const filteredTodos = computed(() => {
  return filters[visibility.value](todos.value)
})

// 剩余
const remaining = computed(() => {
  return todos.value.filter(todo => !todo.done).length
})

/**
 * 定义根据长度判断是否展示 s
 * @param length 长度
 * @param name 需要改变的名字
 */
const pluralize = (length, name) => length === 1 ? name : name + 's'

/**
 * 首字母大写
 * @param key 希望首字母大写的名称
 */
const capitalize = (key) => key.charAt(0).toUpperCase() + key.slice(1)

</script>

<style lang="scss">
  @import './index.scss';
</style>
```


```css
.todoapp {
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto ;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
  background: #fff;
  z-index: 1;
  position: relative;
  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  :focus {
    outline: 0;
  }
  .hidden {
    display: none;
  }
  .todoapp {
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }
  .todoapp input::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  .todoapp input::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  .todoapp input::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  .todoapp h1 {
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }
  .new-todo,
  .edit {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 18px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .new-todo {
    padding: 10px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
  .main {
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
  }
  .toggle-all {
    text-align: center;
    border: none;
    /* Mobile Safari */
    opacity: 0;
    position: absolute;
  }
  .toggle-all+label {
    width: 60px;
    height: 34px;
    font-size: 0;
    position: absolute;
    top: -52px;
    left: -13px;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .toggle-all+label:before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }
  .toggle-all:checked+label:before {
    color: #737373;
  }
  .todo-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .todo-list li {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
  }
  .todo-list li:last-child {
    border-bottom: none;
  }
  .todo-list li.editing {
    border-bottom: none;
    padding: 0;
  }
  .todo-list li.editing .edit {
    display: block;
    width: 506px;
    padding: 12px 16px;
    margin: 0 0 0 43px;
  }
  .todo-list li.editing .view {
    display: none;
  }
  .todo-list li .toggle {
    text-align: center;
    width: 40px;
    /* auto, since non-WebKit browsers doesn't support input styling */
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    /* Mobile Safari */
    -webkit-appearance: none;
    appearance: none;
  }
  .todo-list li .toggle {
    opacity: 0;
  }
  .todo-list li .toggle+label {
    /*
    Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
    IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
  */
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: center left;
    background-size: 36px;
  }
  .todo-list li .toggle:checked+label {
    background-size: 36px;
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
  }
  .todo-list li label {
    word-break: break-all;
    padding: 15px 15px 15px 50px;
    display: block;
    line-height: 1.0;
        font-size: 14px;
    transition: color 0.4s;
  }
  .todo-list li.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }
  .todo-list li .destroy {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    transition: color 0.2s ease-out;
    cursor: pointer;
  }
  .todo-list li .destroy:hover {
    color: #af5b5e;
  }
  .todo-list li .destroy:after {
    content: '×';
  }
  .todo-list li:hover .destroy {
    display: block;
  }
  .todo-list li .edit {
    display: none;
  }
  .todo-list li.editing:last-child {
    margin-bottom: -1px;
  }
  .footer {
    color: #777;
    position: relative;
    padding: 10px 15px;
    height: 40px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
  }
  .footer:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 40px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
  .todo-count {
    float: left;
    text-align: left;
  }
  .todo-count strong {
    font-weight: 300;
  }
  .filters {
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 1;
    list-style: none;
  }
  .filters li {
    display: inline;
  }
  .filters li a {
    color: inherit;
    font-size: 12px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
  }
  .filters li a:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }
  .filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }
  .clear-completed,
  html .clear-completed:active {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
  }
  .clear-completed:hover {
    text-decoration: underline;
  }
  .info {
    margin: 65px auto 0;
    color: #bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;
  }
  .info p {
    line-height: 1;
  }
  .info a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }
  .info a:hover {
    text-decoration: underline;
  }
  /*
  Hack to remove background from Mobile Safari.
  Can't use it globally since it destroys checkboxes in Firefox
*/
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    .toggle-all,
    .todo-list li .toggle {
      background: none;
    }
    .todo-list li .toggle {
      height: 40px;
    }
  }
  @media (max-width: 430px) {
    .footer {
      height: 50px;
    }
    .filters {
      bottom: 10px;
    }
  }
}
```