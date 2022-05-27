<!--
 * @Author: hidari
 * @Date: 2022-05-26 20:10:22
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-27 17:27:33
 * @FilePath: \vue3-integrated-back-office-solution\src\views\profile\components\feature.vue
 * @Description: 功能
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div class="dashboard-editor-container">
      <!-- github -->
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="$store.getters.lineChartData === {} ?   lineChartData.newVisitis : $store.getters.lineChartData" />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import GithubCorner from '@/components/githubCorner'
import LineChart from './echarts/lineChart.vue'
import BarChart from './echarts/barChart.vue'
import PieChart from './echarts/pieChart.vue'
import RaddarChart from './echarts/raddarChart.vue'
import panelGroup from './echarts/panelGroup.vue'
import transactionTable from './transactionTable.vue'
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

</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
//   background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
