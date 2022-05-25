/*
 * @Author: hidari
 * @Date: 2022-05-25 11:51:35
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-25 15:45:56
 * @FilePath: \vue3-integrated-back-office-solution\src\utils\theme.js
 * @Description: element-plus 主题色替换
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
// 导入色值表
import formula from '@/constant/formula.json'
// 导入转换RGB(A)颜色为十六进制的包
import rgbHex from 'rgb-hex'
// 导入在CSS中提出的颜色函数的解析器和转换器包
import color from 'css-color-function'
import axios from 'axios'

/**
 * 把生成的样式表写入 style 中
 * @param {*} newStyle 生成的样式表
 */
export const writeNewStyle = newStyle => {
  const style = document.createElement('style')
  style.innerText = newStyle
  document.head.appendChild(style)
}

/**
 * 根据主题色，生成最新样式表
 * @param {String} primaryColor 主题色
 */
export const generateNewStyle = async primaryColor => {
  // 1. 根据主色生成色值表
  const colors = generateColors(primaryColor)
  // 2. 获取当前 element-plus 默认样式表 并且把需要进行替换的色值打上标记
  // 异步方法
  let cssText = await getOriginalStyle()
  // 3. 遍历生成的色值表 在默认样式表进行全局替换
  Object.keys(colors).forEach(key => {
    cssText = cssText.replace(
      // 无论前面包含了多少个空格都替换key
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })
  return cssText
}

/**
 * 根据主色生成色值表
 * @param {*} primaryColor 主题色
 */
export const generateColors = primaryColor => {
  if (!primaryColor) return
  const colors = {
    primary: primaryColor
  }
  // 取出所有 key 值 遍历改变颜色
  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primaryColor)
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

/**
 * 获取当前 element-plus 默认样式表
 */
const getOriginalStyle = async () => {
  // 得到 element-plus 版本
  const version = require('element-plus/package.json').version
  // 得到css的url
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  // 把获取到的数据筛选为原样式模板
  return getStyleTemplate(data)
}

/**
 * 把需要进行替换的色值打上标记
 * @param {*} data axios请求下来的需要进行替换的色值
 */
const getStyleTemplate = data => {
  // element-plus 默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 遍历 colorMap 的 key 得到每一个 key 对应的 value 值
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    // 得到打上标记后的 data
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
