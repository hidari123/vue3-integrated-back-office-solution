<!--
 * @Author: hidari
 * @Date: 2022-06-02 10:52:18
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 16:15:43
 * @FilePath: \vue3-integrated-back-office-solution\src\views\role-list\components\distributePermission.vue
 * @Description: 为角色分配权限弹出层
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
     />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { getPermissionList, rolePermission, distributePermission } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus/lib/components'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

/**
  确定按钮点击事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

// 所有权限
const allPermission = ref([])
const permissionList = async () => {
  allPermission.value = await getPermissionList()
}
permissionList()
watchSwitchLang(permissionList)

// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// tree 节点
const treeRef = ref(null)
// 当前角色的权限
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  // el-tree 组件传递的是 node-key="id" id
  // 所以把传来的 key 传递进去就可以显示了
  treeRef.value.setCheckedKeys(checkedKeys)
}

/**
 * 点击才能获取到 roleId 一开始是 undefined 所以用 watch 监听
 */
watch(() => props.roleId, val => {
  if (val) getRolePermission()
})
</script>
