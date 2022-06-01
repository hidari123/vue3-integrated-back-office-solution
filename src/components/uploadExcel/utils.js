/*
 * @Author: hidari
 * @Date: 2022-05-31 12:38:04
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 15:18:50
 * @FilePath: \vue3-integrated-back-office-solution\src\components\uploadExcel\utils.js
 * @Description: 上传excel工具函数
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

import XLSX from 'xlsx'
/**
 * 获取表头（通用方式）
 */
export const getHeaderRow = sheet => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

/**
 * 判断是否为 excel 文件
 * @param {*} file 上传的文件
 * @returns
 */
export const isExcel = file => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
