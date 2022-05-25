<!--
 * @Author: hidari
 * @Date: 2022-05-25 09:50:29
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-25 15:17:15
 * @FilePath: \vue3-integrated-back-office-solution\src\components\themePicker\components\selectColor.vue
 * @Description: 颜色选择组件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <el-dialog
   :title="$t('msg.universal.title')"
   :model-value="modelValue"
   @close="closed"
   width="22%"
   >
    <div class="center">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
   </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
defineProps({
  // 双向数据绑定
  modelValue: {
    type: Boolean,
    required: true
  }
})

// 给父组件发送事件(关闭弹出层)
const emits = defineEmits(['update:modelValue'])

// 关闭dialog事件 给父组件发送关闭事件
const closed = () => {
  emits('update:modelValue', false)
}

const store = useStore()
const confirm = async () => {
  // 得到新样式
  const newStyle = await generateNewStyle(mColor.value)
  console.log(newStyle)
  writeNewStyle(newStyle)
  store.commit('theme/setMainColor', mColor.value)
  closed()
}

const mColor = ref(store.getters.mainColor)

// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
