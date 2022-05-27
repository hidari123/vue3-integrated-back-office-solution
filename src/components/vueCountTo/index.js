/*
 * @Author: hidari
 * @Date: 2022-05-27 15:35:33
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-27 15:36:10
 * @FilePath: \vue3-integrated-back-office-solution\src\components\vueCountTo\index.js
 * @Description:
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import CountTo from './vue-countTo.vue'
export default CountTo
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('count-to', CountTo)
}
