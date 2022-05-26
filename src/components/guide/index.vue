<!--
 * @Author: hidari
 * @Date: 2022-05-26 19:10:46
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-26 19:52:41
 * @FilePath: \vue3-integrated-back-office-solution\src\components\guide\index.vue
 * @Description: 指导页
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
    <div @click="onClick" id="guide-start">
        <el-tooltip :content="$t('msg.navBar.guide')">
            <div>
                <svg-icon icon="guide"/>
            </div>
        </el-tooltip>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
// 导入 driver
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './step'

const i18n = useI18n()
let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})

const onClick = () => {
  // 触发引导事件
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>

<style scoped></style>
