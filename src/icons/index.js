/*
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 13:20:23
 * @FilePath: \vue3-integrated-back-office-solution\src\icons\index.js
 * @Description: 导入本地svg图标并全局注册组件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
// 1. 导入所有 svg 图标
import SvgIcon from '@/components/svgIcon'
// https://webpack.docschina.org/guides/dependency-management/#requirecontext
// 通过 require.context() 函数来创建自己的 context
// 可以给这个函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。
// Webpack 会在构建中解析代码中的 require.context() 。
const svgRequire = require.context('./svg', false, /\.svg$/)
// 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
// 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

// 2. 完成 SvgIcon 全局注册
export default app => {
  app.component('svg-icon', SvgIcon)
}
