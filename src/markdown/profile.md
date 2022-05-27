<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [个人中心](#%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83)
  - [基本布局](#%E5%9F%BA%E6%9C%AC%E5%B8%83%E5%B1%80)
  - [创建 PanThumb 头像组件](#%E5%88%9B%E5%BB%BA-panthumb-%E5%A4%B4%E5%83%8F%E7%BB%84%E4%BB%B6)
  - [element-plus：项目介绍模块开发](#element-plus%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D%E6%A8%A1%E5%9D%97%E5%BC%80%E5%8F%91)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-05-26 20:07:56
 * @LastEditors: hidari 
 * @LastEditTime: 2022-05-27 09:33:35
 * @FilePath: \vue3-integrated-back-office-solution\src\markdown\profile.md
 * @Description: 个人中心模块
 * 
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved. 
-->
# 个人中心

个人中心模块是一个集合了 `vue` + `element-plus` 的业务模块，主要分成三个大块：

1. `element-plus` 组件
2. 自定义业务组件
3. 业务中的国际化处理

## 基本布局
整个 **个人中心** 被分为左右两大块：

1. 项目介绍
2. `tabs`
   1. 功能
   2. 章节
   3. 作者

根据功能划分，整个项目应该包含 4 个组件，分别对应着 4 个功能。

所以，我们想要完成 **个人中心模块基本布局** 那么就需要先创建出这四个组件

1. 在 `views/profile/components` 下创建 **项目介绍** 组件 `ProjectCard`

2. 在 `views/profile/components` 下创建 **功能** 组件 `feature`

3. 在 `views/profile/components` 下创建 **章节** 组件 `chapter`

4. 在 `views/profile/components` 下创建 **作者** 组件 `author`

5. 进入到 `views/profile/index` 页面，绘制基本布局结构

```vue
<template>
    <div class="my-container">
    <el-row>
        <el-col :span="6">
        <project-card class="user-card"></project-card>
        </el-col>
        <el-col :span="18">
        <el-card>
            <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
                <feature />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
                <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
                <author />
            </el-tab-pane>
            </el-tabs>
        </el-card>
        </el-col>
    </el-row>
    </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Chapter from './components/Chapter.vue'
import Feature from './components/Feature.vue'
import Author from './components/Author.vue'
import { ref } from 'vue'
const activeName = ref('feature')
</script>

<style lang="scss" scoped>
.my-container {
    .user-card {
    margin-right: 20px;
    }
}
</style>

```

## 创建 PanThumb 头像组件

在 **项目介绍** 模块中，存在一个头像：**鼠标移入之后，头像会移开，显示出后面的文本**

> 整个组件核心的移动处理通过 `css` 进行实现

1. 创建 `components/PanThumb/index`

```vue
<template>
     <div
       :style="{ zIndex: zIndex, height: height, width: width }"
       class="pan-item"
     >
        <!-- 内层 -->
        <div class="pan-info">
            <div class="pan-info-roles-container">
                <slot />
            </div>
        </div>
        <!-- 外层 -->
        <div :style="{ backgroundImage: `url(${image})` }" class="pan-thumb"></div>
     </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  image: {
    type: String
  },
  zIndex: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default: '150px'
  },
  height: {
    type: String,
    default: '150px'
  }
})
</script>

<style lang="scss" scoped>
   .pan-item {
     width: 200px;
     height: 200px;
     border-radius: 50%;
     display: inline-block;
     position: relative;
     cursor: pointer;
     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
     &:hover .pan-info p a {
       opacity: 1;
       transform: translateX(0px) rotate(0deg);
     }
    &:hover .pan-thumb {
       transform: rotate(-110deg);
     }

     .pan-info {
       position: absolute;
       width: inherit;
       height: inherit;
       border-radius: 50%;
       overflow: hidden;
       box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);

       h3 {
         color: #fff;
         text-transform: uppercase;
         position: relative;
         letter-spacing: 2px;
         font-size: 14px;
         margin: 0 60px;
         padding: 22px 0 0 0;
         height: 85px;
         font-family: 'Open Sans', Arial, sans-serif;
         text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
       }

       p {
         color: #fff;
         padding: 10px 5px;
         font-style: italic;
         margin: 0 30px;
         font-size: 12px;
         border-top: 1px solid rgba(255, 255, 255, 0.5);

         a {
           display: block;
           color: #333;
           width: 80px;
           height: 80px;
           background: rgba(255, 255, 255, 0.3);
           border-radius: 50%;
           color: #fff;
           font-style: normal;
           font-weight: 700;
           text-transform: uppercase;
           font-size: 9px;
           letter-spacing: 1px;
           padding-top: 24px;
           margin: 7px auto 0;
           font-family: 'Open Sans', Arial, sans-serif;
           opacity: 0;
           transition: transform 0.3s ease-in-out 0.2s,
             opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s;
           transform: translateX(60px) rotate(90deg);
         }

         a:hover {
           background: rgba(255, 255, 255, 0.5);
         }
       }

       .pan-info-roles-container {
         padding: 20px;
         text-align: center;
       }
     }

     .pan-thumb {
       width: 100%;
       height: 100%;
       background-position: center center;
       background-size: cover;
       border-radius: 50%;
       overflow: hidden;
       position: absolute;
       transform-origin: 95% 40%;
       transition: all 0.3s ease-in-out;
     }
   }
</style>
```

2. 在 `projectCard` 中导入
```vue
<template>
     <div class="">
       <pan-thumb
         :image="avatar"
         :height="'100px'"
         :width="'100px'"
         :hoverable="false"
       >
         <div>Hello</div>
         Hidari Ackerman
       </pan-thumb>
     </div>
</template>

<script setup>
import PanThumb from '@/components/panThumb'
import avatar from '@/images/avatar.jpg'
</script>

<style>

</style>
```

## element-plus：项目介绍模块开发