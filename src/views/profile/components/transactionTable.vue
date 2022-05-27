<!--
 * @Author: hidari
 * @Date: 2022-05-27 17:14:02
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-27 17:46:10
 * @FilePath: \vue3-integrated-back-office-solution\src\views\profile\components\transactionTable.vue
 * @Description: 业务列表
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
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
import { ref } from '@vue/reactivity'
const list = ref([])
transactionList().then(res => {
  list.value = res.items.slice(0, 8)
})
</script>
