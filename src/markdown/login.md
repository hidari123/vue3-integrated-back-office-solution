<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [搭建登录架构解决方案与实现](#%E6%90%AD%E5%BB%BA%E7%99%BB%E5%BD%95%E6%9E%B6%E6%9E%84%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E4%B8%8E%E5%AE%9E%E7%8E%B0)
  - [vue3 项目结构解析](#vue3-%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90)
  - [构建登录页面 UI 结构](#%E6%9E%84%E5%BB%BA%E7%99%BB%E5%BD%95%E9%A1%B5%E9%9D%A2-ui-%E7%BB%93%E6%9E%84)
  - [Icon 图标处理方案：SvgIcon](#icon-%E5%9B%BE%E6%A0%87%E5%A4%84%E7%90%86%E6%96%B9%E6%A1%88svgicon)
    - [处理内部 svg 图标显示](#%E5%A4%84%E7%90%86%E5%86%85%E9%83%A8-svg-%E5%9B%BE%E6%A0%87%E6%98%BE%E7%A4%BA)
    - [使用 svg-sprite-loader 处理 svg 图标](#%E4%BD%BF%E7%94%A8-svg-sprite-loader-%E5%A4%84%E7%90%86-svg-%E5%9B%BE%E6%A0%87)
  - [完善登录表单校验](#%E5%AE%8C%E5%96%84%E7%99%BB%E5%BD%95%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C)
  - [密码框状态通用处理](#%E5%AF%86%E7%A0%81%E6%A1%86%E7%8A%B6%E6%80%81%E9%80%9A%E7%94%A8%E5%A4%84%E7%90%86)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 搭建登录架构解决方案与实现

## vue3 项目结构解析

想要进行项目的开发，那么首先我们需要先去了解一下 `vue3` 项目的初始结构

在这里我们把它和 `vue2` 的项目进行对比来去说明

1. `main.js`
    1. 通过 **按需导入**的 `createApp` 方法来来构建 `vue` 实例
    2. 通过 `vue实例.use` 方法来挂载插件（`router`、`vuex`）
    3. 没有了 `Vue` 构造方法，无法再挂载原型
2. `App.vue`
    1. 组件内部结构无变化，依然是
        1. `tempalte`
        2. `script`
        3. `style`
    2. `<template>` 标签中支持多个根标签
3. `store/index.js`
    1. 通过 **按需导入**的 `createStore` 方法来来构建 `store` 实例
    2. 无需再通过 `Vue.use(Vuex)` 的形式进行挂载
4. `router/index.js`
    1. 通过 **按需导入**的 `createRouter` 方法来构建 `router` 实例
    2. 通过 **按需导入**的 `createWebHashHistory` 方法来创建 **`hash` 模式对象**，进行路由模式指定
    3. 无需再通过 `Vue.use(VueRouter)` 的形式进行挂载
    4. `routes` 路由表的定义无差别

综上所述，在 `vue3` 的初始化项目中，与 `vue2` 对比的最大差异其实就是两点：

1. `vue3` 使用 **按需导入的形式** 进行初始化操作
2. `<template>` 标签中支持多个根标签

## 构建登录页面 UI 结构

1. 在 `src` 下创建 `styles/index.scss` 文件，并写入以下内容：

```scss
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
}

#app {
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

a:focus,
a:active {
  outline: none;
}

a,
a:focus,
a:hover {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

div:focus {
  outline: none;
}

.clearfix {
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }
}
```
在 `main.js` 中导入全局样式
```js
// 导入全局样式
import './styles/index.scss'
```


2. 在 `router/index.js` 中增加以下路由配置

```js
/**
* 公开路由表
*/
const publicRoutes = [
 {
   path: '/login',
   component: () => import('@/views/login/index')
 }
]

const router = createRouter({
 history: createWebHashHistory(),
 routes: publicRoutes
})
```

2. 在`login/index.vue` 中，生成基本页面结构
```vue
<template>
 <div class="login-container">
   <el-form class="login-form" >
     <div class="title-container">
       <h3 class="title">用户登录</h3>
     </div>

     <el-form-item prop="username">
       <span class="svg-container">
         <el-icon>
           <avatar />
         </el-icon>
       </span>
       <el-input
         placeholder="username"
         name="username"
         type="text"
       />
     </el-form-item>

     <el-form-item prop="password">
       <span class="svg-container">
         <el-icon>
           <avatar />
         </el-icon>
       </span>
       <el-input
         placeholder="password"
         name="password"
       />
       <span class="show-pwd">
         <el-icon>
           <avatar />
         </el-icon>
       </span>
     </el-form-item>

     <el-button type="primary" style="width: 100%; margin-bottom: 30px"
       >登录</el-button
     >
   </el-form>
 </div>
</template>

<script setup>
// 导入组件之后无需注册可直接使用
import { Avatar } from '@element-plus/icons'
import {} from 'vue'
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }


  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
```

## Icon 图标处理方案：SvgIcon

在我们的项目中所使用的 `icon` 图标，一共分为两类：

1. `element-plus` 的图标
2. 自定义的 `svg` 图标

这也是通常情况下企业级项目开发时，所遇到的一种常见情况。

对于 `element-plus` 的图标我们可以直接通过 `el-icon` 来进行显示，但是自定义图标的话，我们暂时还缺少显示的方式，所以说我们需要一个自定义的组件，来显示我们自定义的 `svg` 图标。

那么这种自定义组件处理 **自定义 `svg` 图标的形式**，就是我们在面临这种问题时的通用解决方案。

那么对于这个组件的话，它就需要拥有两种能力：

1. 显示外部 `svg` 图标
2. 显示项目内的 `svg` 图标

基于以上概念，我们可以创建出以下对应代码：

1. 定义工具类判断是否为外部图片资源
创建`/utils/validate.js`
```js
/**
 * 判断是否为外部资源
 */
export const isExternal = (path) => {
  return /^(http?:|mailto:|tel:)/.test(path)
}

```
2. 创建 `components/SvgIcon/index.vue`：
```vue
<template>
  <!--  展示外部图标-->
  <div
      v-if="isExternal"
      :style="styleExternalIcon"
      class="svg-external-icon svg-icon"
      :class="className"
  />
  <!--  展示内部图标-->
  <!--  aria-hidden 让元素对浏览器语义化隐藏-->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <!--    svg元素 定义资源的链接-->
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { isExternal as external } from '@/utils/validate'
import { defineProps, computed } from 'vue'
const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})

/**
 * 判断当前图标是否为外部图标
 */
const isExternal = computed(() => external(props.icon))
/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
/**
 * 内部图标
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
```

3. 使用
```vue
<svg-icon icon="https://res.lgdsunday.club/user.svg"></svg-icon>
```

### 处理内部 svg 图标显示

我们创建了 `SvgIcon` 组件用于显示 **非 Element-ui** 的图标。但是目前我们只处理了 **外部 `svg` 的图标展示**，内部的图标还无法展示。

所以我们就需要处理 **内部的 `svg` 图标展示。**

1. 首先导入所有的 `svg` 图标

2. 在 `icons` 下创建 `index.js` 文件，该文件中需要完成两件事情：

    1. 导入所有的 `svg` 图标
    2. 完成 `SvgIcon` 的全局注册

3. 得出以下代码：

```js
import SvgIcon from '@/components/SvgIcon'

// https://webpack.docschina.org/guides/dependency-management/#requirecontext
// 通过 require.context() 函数来创建自己的 context
const svgRequire = require.context('./svg', false, /\.svg$/)
// 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
// 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

export default app => {
 app.component('svg-icon', SvgIcon)
}
```

4. 在 `main.js` 中引入该文件
```js
...
// 导入 svgIcon
import installIcons from '@/icons'
...
installIcons(app)
...
```

5. 删除 `views/login` 下 局部导入 `SvgIcon` 的代码

6. 在 `login/index.vue` 中使用 `SvgIcon` 引入本地 `svg`

```vue
// 用户名   
<svg-icon icon="user" />
// 密码
<svg-icon icon="password" />
// 眼睛
<svg-icon icon="eye" />
```

### 使用 svg-sprite-loader 处理 svg 图标
[svg-sprite-loader](https://www.npmjs.com/package/svg-sprite-loader) 是 `webpack` 中专门用来处理 `svg` 图标的一个 `loader` ，在上一节中我们的图标之所有没有展示，就是因为我们缺少该 `loader`。

那么想要使用该 `loader` 我们需要做两件事情：

1. 下载该 `laoder`，执行：`npm i --save-dev svg-sprite-loader@6.0.9`

2. 创建 `vue.config.js` 文件，新增如下配置：

```js
const path = require('path')
function resolve(dir) {
 return path.join(__dirname, dir)
}
// https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
module.exports = {
 chainWebpack(config) {
   // 设置 svg-sprite-loader
   config.module
     .rule('svg')
     .exclude.add(resolve('src/icons'))
     .end()
   config.module
     .rule('icons')
     .test(/\.svg$/)
     .include.add(resolve('src/icons'))
     .end()
     .use('svg-sprite-loader')
     .loader('svg-sprite-loader')
     .options({
       symbolId: 'icon-[name]'
     })
     .end()
 }
}
```

处理完以上配置之后，重新启动项目，图标即可显示。

## 完善登录表单校验

表单校验是表单使用的一个通用能力，在 `element-plus` 中想要为表单进行表单校验那么我们需要关注以下三点：

1. 为 `el-form` 绑定 `model` 属性
2. 为 `el-form` 绑定 `rules` 属性
3. 为 `el-form-item` 绑定 `prop` 属性

保证以上三点即可为 `el-from` 添加表单校验功能。

因为这一块是比较简单的功能，只要有过 `element-ui` 使用经验的同学，应该对这里都不陌生，所以这里就不对这块内容进行过多赘述了。对这里不是很了解的同学可以参考下 [element-plus 中 from 表单部分](https://element-plus.org/#/zh-CN/component/form)

以下为对应的代码实现：

**views/login**

```vue
<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules">
      ...
      <el-form-item prop="username">
        ...
        <el-input
         ...
          v-model="loginForm.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        ...
        <el-input
          ...
          v-model="loginForm.password"
        />
        ...
      </el-form-item>
		...
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validatePassword } from './rules'

// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
</script>
```

**views/login/rules.js**

```js
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码不能少于6位'))
    } else {
      callback()
    }
  }
}
```

## 密码框状态通用处理

对于密码框存在两种状态：

1. 密文状态
2. 明文状态

点击 **眼睛** 可以进行切换。

该功能实现为通用的处理方案，只需要动态修改 `input` 的 `type` 类型即可，其中：

1.  `password` 为密文显示
2. `text` 为明文显示

根据以上理论，即可得出以下代码：

```vue
<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules">
      ...
        <el-input
          ...
          :type="passwordType"
        />
        <span class="show-pwd">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            @click="onChangePwdType"
          />
        </span>
      ...
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
...

// 处理密码框文本显示状态
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
</script>
```
