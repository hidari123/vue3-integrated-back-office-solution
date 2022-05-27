/*
 * @Author: hidari
 * @Date: 2022-05-27 14:47:01
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-27 15:10:54
 * @FilePath: \vue3-integrated-back-office-solution\src\store\modules\lineChart.js
 * @Description: 折线图仓库
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
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
