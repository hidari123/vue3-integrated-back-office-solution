<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [搭建Layout架构 解决方案与实现](#%E6%90%AD%E5%BB%BAlayout%E6%9E%B6%E6%9E%84-%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E4%B8%8E%E5%AE%9E%E7%8E%B0)
  - [前言](#%E5%89%8D%E8%A8%80)
  - [创建基于 Layout 的基础架构](#%E5%88%9B%E5%BB%BA%E5%9F%BA%E4%BA%8E-layout-%E7%9A%84%E5%9F%BA%E7%A1%80%E6%9E%B6%E6%9E%84)
  - [获取用户基本信息](#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF)
  - [渲染用户头像菜单](#%E6%B8%B2%E6%9F%93%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F%E8%8F%9C%E5%8D%95)
  - [退出登录方案实现](#%E9%80%80%E5%87%BA%E7%99%BB%E5%BD%95%E6%96%B9%E6%A1%88%E5%AE%9E%E7%8E%B0)
    - [用户主动退出](#%E7%94%A8%E6%88%B7%E4%B8%BB%E5%8A%A8%E9%80%80%E5%87%BA)
    - [用户被动退出方案解析](#%E7%94%A8%E6%88%B7%E8%A2%AB%E5%8A%A8%E9%80%80%E5%87%BA%E6%96%B9%E6%A1%88%E8%A7%A3%E6%9E%90)
    - [用户被动退出解决方案之主动处理](#%E7%94%A8%E6%88%B7%E8%A2%AB%E5%8A%A8%E9%80%80%E5%87%BA%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E4%B9%8B%E4%B8%BB%E5%8A%A8%E5%A4%84%E7%90%86)
    - [用户被动退出解决方案之被动处理](#%E7%94%A8%E6%88%B7%E8%A2%AB%E5%8A%A8%E9%80%80%E5%87%BA%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E4%B9%8B%E8%A2%AB%E5%8A%A8%E5%A4%84%E7%90%86)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 搭建Layout架构 解决方案与实现

## 前言

本章中我们将会实现以下的核心解决方案：

1. 用户退出方案
2. 动态侧边栏方案
3. 动态面包屑方案

除了这些核心内容之外，还有一些其他的小功能，比如：

1. 退出的通用逻辑封装
2. 伸缩侧边栏动画
3. `vue3` 动画
4. 组件状态驱动的动态 `CSS` 值

## 创建基于 Layout 的基础架构
`Layout` 的基本布局结构：
1. 整个页面分为三部分，所以我们需要先去创建对应的三个组件：

    1. `layout/components/Sidebar/index.vue`
    2. `layout/components/Navbar.vue`
    3. `layout/components/AppMain.vue`

2. 然后在 `layout/index.vue` 中引入这三个组件

   ```vue
   <script setup>
       import Navbar from './components/Navbar'
       import Sidebar from './components/Sidebar'
       import AppMain from './components/AppMain'
   </script>
   ```

3. 完成对应的布局结构

   ```vue
   <template>
     <div class="app-wrapper">
       <!-- 左侧 menu -->
       <sidebar
         id="guide-sidebar"
         class="sidebar-container"
       />
       <div class="main-container">
         <div class="fixed-header">
           <!-- 顶部的 navbar -->
           <navbar />
         </div>
         <!-- 内容区 -->
         <app-main />
       </div>
     </div>
   </template>
   ```

4. 在 `styles` 中创建如下 `css` 文件：

    1. `variables.scss` ： 定义常量
    2. `mixin.scss` ：定义通用的 `css`
    3. `sidebar.scss`：处理 `menu` 菜单的样式

5. 为 `variables.scss` ，定义如下常量并进行导出（ `:export` 可见 [scss 与 js 共享变量](https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass)）：

   ```scss
   // sidebar
   $menuText: #bfcbd9;
   $menuActiveText: #ffffff;
   $subMenuActiveText: #f4f4f5;
   
   $menuBg: #304156;
   $menuHover: #263445;
   
   $subMenuBg: #1f2d3d;
   $subMenuHover: #001528;
   
   $sideBarWidth: 210px;
   
   // https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass
   // JS 与 scss 共享变量，在 scss 中通过 :export 进行导出，在 js 中可通过 ESM 进行导入
   :export {
     menuText: $menuText;
     menuActiveText: $menuActiveText;
     subMenuActiveText: $subMenuActiveText;
     menuBg: $menuBg;
     menuHover: $menuHover;
     subMenuBg: $subMenuBg;
     subMenuHover: $subMenuHover;
     sideBarWidth: $sideBarWidth;
   }
   
   ```

6. 为 `mixin.scss` 定义如下样式：

   ```scss
   @mixin clearfix {
     &:after {
       content: '';
       display: table;
       clear: both;
     }
   }
   
   @mixin scrollBar {
     &::-webkit-scrollbar-track-piece {
       background: #d3dce6;
     }
   
     &::-webkit-scrollbar {
       width: 6px;
     }
   
     &::-webkit-scrollbar-thumb {
       background: #99a9bf;
       border-radius: 20px;
     }
   }
   
   @mixin relative {
     position: relative;
     width: 100%;
     height: 100%;
   }
   
   ```

7. 为 `sidebar.scss` 定义如下样式：

   ```scss
   #app {
     .main-container {
       min-height: 100%;
       transition: margin-left 0.28s;
       margin-left: $sideBarWidth;
       position: relative;
     }
   
     .sidebar-container {
       transition: width 0.28s;
       width: $sideBarWidth !important;
       height: 100%;
       position: fixed;
       top: 0;
       bottom: 0;
       left: 0;
       z-index: 1001;
       overflow: hidden;
   
       // 重置 element-plus 的css
       .horizontal-collapse-transition {
         transition: 0s width ease-in-out, 0s padding-left ease-in-out,
           0s padding-right ease-in-out;
       }
   
       .scrollbar-wrapper {
         overflow-x: hidden !important;
       }
   
       .el-scrollbar__bar.is-vertical {
         right: 0px;
       }
   
       .el-scrollbar {
         height: 100%;
       }
   
       &.has-logo {
         .el-scrollbar {
           height: calc(100% - 50px);
         }
       }
   
       .is-horizontal {
         display: none;
       }
   
       a {
         display: inline-block;
         width: 100%;
         overflow: hidden;
       }
   
       .svg-icon {
         margin-right: 16px;
       }
   
       .sub-el-icon {
         margin-right: 12px;
         margin-left: -2px;
       }
   
       .el-menu {
         border: none;
         height: 100%;
         width: 100% !important;
       }
   
       .is-active > .el-submenu__title {
         color: $subMenuActiveText !important;
       }
   
       & .nest-menu .el-submenu > .el-submenu__title,
       & .el-submenu .el-menu-item {
         min-width: $sideBarWidth !important;
       }
     }
   
     .hideSidebar {
       .sidebar-container {
         width: 54px !important;
       }
   
       .main-container {
         margin-left: 54px;
       }
   
       .submenu-title-noDropdown {
         padding: 0 !important;
         position: relative;
   
         .el-tooltip {
           padding: 0 !important;
   
           .svg-icon {
             margin-left: 20px;
           }
   
           .sub-el-icon {
             margin-left: 19px;
           }
         }
       }
   
       .el-submenu {
         overflow: hidden;
   
         & > .el-submenu__title {
           padding: 0 !important;
   
           .svg-icon {
             margin-left: 20px;
           }
   
           .sub-el-icon {
             margin-left: 19px;
           }
   
           .el-submenu__icon-arrow {
             display: none;
           }
         }
       }
   
       .el-menu--collapse {
         .el-submenu {
           & > .el-submenu__title {
             & > span {
               height: 0;
               width: 0;
               overflow: hidden;
               visibility: hidden;
               display: inline-block;
             }
           }
         }
       }
     }
   
     .el-menu--collapse .el-menu .el-submenu {
       min-width: $sideBarWidth !important;
     }
   
     .withoutAnimation {
       .main-container,
       .sidebar-container {
         transition: none;
       }
     }
   }
   
   .el-menu--vertical {
     & > .el-menu {
       .svg-icon {
         margin-right: 16px;
       }
       .sub-el-icon {
         margin-right: 12px;
         margin-left: -2px;
       }
     }
   
     // 菜单项过长时
     > .el-menu--popup {
       max-height: 100vh;
       overflow-y: auto;
   
       &::-webkit-scrollbar-track-piece {
         background: #d3dce6;
       }
   
       &::-webkit-scrollbar {
         width: 6px;
       }
   
       &::-webkit-scrollbar-thumb {
         background: #99a9bf;
         border-radius: 20px;
       }
     }
   }
   
   ```

8. 在 `index.scss` 中按照顺序导入以上样式文件

   ```scss
   @import './variables.scss';
   @import './mixin.scss';
   @import './sidebar.scss';
   ```

9. 在 `layout/index.vue` 中写入如下样式

   ```vue
   <style lang="scss" scoped>
   @import '~@/styles/mixin.scss';
   @import '~@/styles/variables.scss';
   
   .app-wrapper {
     @include clearfix;
     position: relative;
     height: 100%;
     width: 100%;
   }
   
   .fixed-header {
     position: fixed;
     top: 0;
     right: 0;
     z-index: 9;
     width: calc(100% - #{$sideBarWidth});
   }
   </style>
   ```

10. 因为将来要实现 **主题更换**，所以为 `sidebar` 赋值动态的背景颜色

    ```vue
    <template>
    ...
        <!-- 左侧 menu -->
        <sidebar
          class="sidebar-container"
          :style="{ backgroundColor: variables.menuBg }"
        />
    ...
    </template>
    
    <script setup>
    import variables from '@/styles/variables.scss'
    </script>
    ```

11. 为 `Navbar`、`Sidebar`、`AppMain` 组件进行初始化代码

    ```vue
    <template>
      <div class="">{组件名}</div>
    </template>
    
    <script setup>
    import {} from 'vue'
    </script>
    
    <style lang="scss" scoped></style>
    
    ```

12. 可见 `Navbar` 与 `AppMain` 重叠

13. 为 `AppMain` 进行样式处理

    ```vue
    <template>
      <div class="app-main">AppMain</div>
    </template>
    
    <script setup>
    import {} from 'vue'
    </script>
    
    <style lang="scss" scoped>
    .app-main {
      min-height: calc(100vh - 50px);
      width: 100%;
      position: relative;
      overflow: hidden;
      padding: 61px 20px 20px 20px;
      box-sizing: border-box;
    }
    </style>
    ```
    
## 获取用户基本信息

处理完了基本的 `Layout` 架构之后，接下来我们实现一下 `navbar` 中的 **头像菜单** 功能
这样的一个功能主要分为三个部分：

1. 获取并展示用户信息
2. `element-plus` 中的 `dropdown` 组件使用
3. 退出登录的方案实现

那么接下来我们就去实现第一部分的功能 **获取并展示用户信息**

**获取并展示用户信息** 我们把它分为三部分进行实现：

1. 定义接口请求方法
2. 定义调用接口的动作
3. 在权限拦截时触发动作

那么接下来我们就根据这三个步骤，分别来进行实现：

**定义接口请求方法：**

在 `api/sys.js` 中定义如下方法：

```js
/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}
```

因为获取用户信息需要对应的 `token` ，所以我们可以利用 `axios` 的 **请求拦截器** 对 `token` 进行统一注入，在 `utils/request.js` 中写入如下代码：

```js
import store from '@/store'
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)
```

**定义调用接口的动作：**

在 `store/modules/user` 中写入以下代码：

```js
import { login, getUserInfo } from '@/api/sys'
...
export default {
  namespaced: true,
  state: () => ({
    ...
    userInfo: {}
  }),
  mutations: {
    ...
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    ...
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    }
  }
}

```

**在权限拦截时触发动作：**

在 `permission.js` 中写入以下代码：

```js
    if (to.path === '/login') {
      ...
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  }

```

在 `store/getters.js` 中写入判断用户信息代码：

```js
  /**
   * 判断用户信息是否存在
   * @param state
   * @returns true => 用户信息已存在
   */
  hasUserInfo: state => {
    // 因为userInfo是对象格式 不能直接取出判断 现转化为字符串 再判断
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
```

## 渲染用户头像菜单

到现在我们已经拿到了 **用户数据，并且在 `getters` 中做了对应的快捷访问** ，那么接下来我们就可以根据数据渲染出 **用户头像内容**

渲染用户头像，我们将使用到 `element-plus` 的两个组件：

1. `avatar`
2. `Dropdown`

在 `layout/components/navbar.js` 中实现以下代码：

```vue
<template>
  <div class="navbar">
    <div class="right-menu">
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> 首页 </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>课程主页</el-dropdown-item>
            </a>
            <el-dropdown-item divided>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>

```

## 退出登录方案实现

**退出登录** 一直是一个通用的前端实现方案，对于退出登录而言，它的触发时机一般有两种：

1. 用户**主动**退出
2. 用户**被动**退出

其中：

1. 主动退出指：用户点击登录按钮之后退出
2. 被动退出指：`token` 过期或被  其他人”顶下来“ 时退出

那么无论是什么退出方式，在用户退出时，所需要执行的操作都是固定的：

1. 清理掉当前用户缓存数据
2. 清理掉权限相关配置
3. 返回到登录页

那么明确好了对应的方案之后，接下来咱们就先来实现 **用户主动退出的对应策略**

### 用户主动退出

在 `store/modules/user.js` 中，添加对应 `action`

```js
import router from '@/router'

logout() {
    this.commit('user/setToken', '')
    this.commit('user/setUserInfo', {})
    removeAllItem()
    router.push('/login')
}
```

为退出登录按钮添加点击事件，触发 `logout` 的 `action`

```js
import { useStore } from 'vuex'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
```

那么至此，我们就完成了 **用户主动退出** 对应的实现。

### 用户被动退出方案解析

**用户被动退出** 的场景主要有两个：

1. `token` 失效
2. 单用户登录：其他人登录该账号被 “顶下来”

那么这两种场景下，在前端对应的处理方案一共也分为两种，共分为 **主动处理** 、**被动处理** 两种 ：

1. 主动处理：主要应对 `token` 失效
2. 被动处理：同时应对 `token` 失效 与 **单用户登录**

那么这两种方案基本上就覆盖了用户被动推出时的主要业务场景了

### 用户被动退出解决方案之主动处理

想要搞明白 **主动处理** 方案，那么首先我们得先去搞明白对应的 **背景** 以及 **业务逻辑** 。

那么首先我们先明确一下对应的 **背景：**

> 我们知道 `token` 表示了一个用户的身份令牌，对 服务端 而言，它是只认令牌不认人的。所以说一旦其他人获取到了你的 `token` ，那么就可以伪装成你，来获取对应的敏感数据。
>
> 所以为了保证用户的信息安全，那么对于 `token` 而言就被制定了很多的安全策略，比如：
>
> 1. 动态 `token`（可变 `token`）
> 2. 刷新 `token`
> 3. 时效 `token`
> 4. ...
>
> 这些方案各有利弊，没有绝对的完美的策略。

而我们此时所选择的方案就是 **时效 `token`**

对于 `token` 本身是拥有时效的，这个大家都知道。但是通常情况下，这个时效都是在服务端进行处理。而此时我们要在 **服务端处理 `token` 时效的同时，在前端主动介入 `token` 时效的处理中**。 从而保证用户信息的更加安全性。

那么对应到我们代码中的实现方案为：

1. 在用户登陆时，记录当前 **登录时间**
2. 制定一个 **失效时长**
3. 在接口调用时，根据 **当前时间** 对比 **登录时间** ，看是否超过了 **时效时长**
   1. 如果未超过，则正常进行后续操作
   2. 如果超过，则进行 **退出登录** 操作

那么明确好了对应的方案之后，接下来我们就去实现对应代码

创建 `utils/auth.js` 文件，并写入以下代码：

```js
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setItem, getItem } from '@/utils/storage'
/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}
/**
 * 设置时间戳
 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}
/**
 * 是否超时
 */
export function isCheckTimeout() {
  // 当前时间戳
  var currentTime = Date.now()
  // 缓存时间戳
  var timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
```

在 `constant` 中声明对应常量：

```js
// token 时间戳
export const TIME_STAMP = 'timeStamp'
// 超时时长(毫秒) 两小时
export const TOKEN_TIMEOUT_VALUE = 2 * 3600 * 1000
```

在用户登录成功之后去设置时间，到 `store/user.js` 的 `login` 中：

```js
import { setTimeStamp } from '@/utils/auth'

login(context, userInfo) {
      ...
      return new Promise((resolve, reject) => {
        ...
          .then(data => {
            ...
            // 保存登录时间
            setTimeStamp()
            resolve()
          })
      })
    },
```

在 `utils/request` 对应的请求拦截器中进行 **主动介入**

```js
import { isCheckTimeout } from '@/utils/auth'

if (store.getters.token) {
      if (isCheckTimeout()) {
        // 登出操作
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      ...
    }
```

### 用户被动退出解决方案之被动处理

**被动处理** 需要应对两种业务场景：

1. `token` 过期
2.  单用户登录

然后我们一个一个来去看，首先是 `token` 过期

> 我们知道对于 `token` 而言，本身就是具备时效的，这个是在服务端生成 `token` 时就已经确定的。
>
> 而此时我们所谓的 `token` 过期指的就是：
>
> **服务端生成的 `token` 超过 服务端指定时效** 的过程

而对于 单用户登录 而言，指的是：

> 当用户 A 登录之后，`token` 过期之前。
>
>  用户 A 的账号在其他的设备中进行了二次登录，导致第一次登录的 A 账号被 “顶下来” 的过程。
>
> 即：**同一账户仅可以在一个设备中保持在线状态**

业务处理场景：

以上的两种情况，都是在 **服务端进行判断的**，而对于前端而言其实是 **服务端通知前端的一个过程。**

所以说对于其业务处理，将遵循以下逻辑：

1. 服务端返回数据时，会通过特定的状态码通知前端
2. 当前端接收到特定状态码时，表示遇到了特定状态：**`token` 时效** 或 **单用户登录**
3. 此时进行 **退出登录** 处理

对应代码：

在 `utils/request` 的响应拦截器中，增加以下逻辑：

```js
// 响应拦截器
service.interceptors.response.use(
  response => {
    ...
  },
  error => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)
```

至此，完成了 **整个用户退出** 方案。


## 动态menu菜单处理方案解析

1. `el-menu` 分成三个部分：
   1. `el-menu`：整个 `menu` 菜单
   2. `el-submenu`：子集 `menu` 菜单
   3. `el-menu-item`：具体菜单项

> **动态`menu`菜单** 其实主要是和 **动态路由表**  配合来去实现 **用户权限** 的。

**动态`menu`菜单** 指的是：

> 根据路由表的配置，自动生成对应的 `menu` 菜单。
>
> 当路由表发生变化时，`menu` 菜单自动发生变化

**动态`menu`菜单** 的实现方案：

1. 定义 **路由表** 对应 **`menu` 菜单规则**
2. 根据规则制定 **路由表**
3. 根据规则，依据 **路由表** ，生成 **`menu` 菜单**

> 定义 **路由表** 对应 **`menu` 菜单规则**

1. 对于单个路由规则而言（循环）：
    1. 如果`meta && meta.title && meta.icon` ：则显示在 `menu` 菜单中，其中 `title` 为显示的内容，`icon` 为显示的图标
        1. 如果存在 `children` ：则以 `el-sub-menu（子菜单）` 展示
        2. 否则：则以 `el-menu-item（菜单项）` 展示
    2. 否则：不显示在 `menu` 菜单中

**创建页面组件**

在 `views` 文件夹下，创建如下页面：

1. 创建文章：`article-create`
2. 文章详情：`article-detail`
3. 文章排名：`article-ranking`
4. 错误页面：`error-page`
    1. `404`
    2. `401`
5. 导入：`import`
6. 权限列表：`permission-list`
7. 个人中心：`profile`
8. 角色列表：`role-list`
9. 用户信息：`user-info`
10. 用户管理：`user-manage`


### 创建结构路由表

`menu` 菜单将具备父子级的结构

1. 按照此结构规划数据，则数据应为

```json
[
   {
       "title": "个人中心",
       "path": ""
   },
   {
       "title": "用户",
       "children": [
           {
               "title": "员工管理",
               "path": ""
           },
           {
               "title": "角色列表",
               "path": ""
           },
           {
               "title": "权限列表",
               "path": ""
           }
       ]
   },
   {
       "title": "文章",
       "children": [
           {
               "title": "文章排名",
               "path": ""
           },
           {
               "title": "创建文章",
               "path": ""
           }
       ]
   }
]
```

又因为将来我们需要进行 **用户权限处理**，所以此时我们需要先对路由表进行一个划分：

1. 私有路由表 `privateRoutes` ：权限路由

2. 公有路由表 `publicRoutes`：无权限路由

根据以上理论，生成以下路由表结构：

```js
/**
 * 私有路由表
 */
const privateRoutes = [
  {
    path: '/user',
    component: layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/user-manage/index'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        component: () => import('@/views/role-list/index'),
        meta: {
          title: 'roleList',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        component: () => import('@/views/permission-list/index'),
        meta: {
          title: 'permissionList',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user-info/index'),
        meta: {
          title: 'userInfo'
        }
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/import/index'),
        meta: {
          title: 'excelImport'
        }
      }
    ]
  },
  {
    path: '/article',
    component: layout,
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/article-ranking/index'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id',
        component: () => import('@/views/article-detail/index'),
        meta: {
          title: 'articleDetail'
        }
      },
      {
        path: '/article/create',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create'
        }
      },
      {
        path: '/article/editor/:id',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleEditor'
        }
      }
    ]
  }
]

/**
 * 公开路由表
 */
const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
})
```

最后不要忘记在 `layout/appMain` 下设置路由出口

```vue
<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>
```

### 解析路由表，获取结构化数据

想要获取路由表数据，那么有两种方式：

1. [router.options.routes](https://next.router.vuejs.org/zh/api/#routes)：初始路由列表（[新增的路由](https://next.router.vuejs.org/zh/api/#addroute) 无法获取到）
2. [router.getRoutes()](https://next.router.vuejs.org/zh/api/#getroutes)：获取所有 [路由记录](https://next.router.vuejs.org/zh/api/#routerecord) 的完整列表

所以，我们此时使用 [router.getRoutes()](https://next.router.vuejs.org/zh/api/#getroutes)

在 `layout/components/Sidebar/SidebarMenu` 下写入以下代码：

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
console.log(router.getRoutes())
</script>
```

得到返回的数据：

```json
[
    {
        "path":"/user/info/:id",
        "name":"userInfo",
        "meta":{
            "title":"userInfo"
        },
        "children":[

        ]
    },
    {
        "path":"/article/editor/:id",
        "meta":{
            "title":"articleEditor"
        },
        "children":[

        ]
    },
    {
        "path":"/user/manage",
        "meta":{
            "title":"userManage",
            "icon":"personnel-manage"
        },
        "children":[

        ]
    },
    {
        "path":"/user/role",
        "meta":{
            "title":"roleList",
            "icon":"role"
        },
        "children":[

        ]
    },
    {
        "path":"/user/permission",
        "meta":{
            "title":"permissionList",
            "icon":"permission"
        },
        "children":[

        ]
    },
    {
        "path":"/user/import",
        "name":"import",
        "meta":{
            "title":"excelImport"
        },
        "children":[

        ]
    },
    {
        "path":"/article/ranking",
        "meta":{
            "title":"articleRanking",
            "icon":"article-ranking"
        },
        "children":[

        ]
    },
    {
        "path":"/article/create",
        "meta":{
            "title":"articleCreate",
            "icon":"article-create"
        },
        "children":[

        ]
    },
    {
        "path":"/article/:id",
        "meta":{
            "title":"articleDetail"
        },
        "children":[

        ]
    },
    {
        "path":"/login",
        "meta":{

        },
        "children":[

        ]
    },
    {
        "path":"/profile",
        "name":"profile",
        "meta":{
            "title":"profile",
            "icon":"el-icon-user"
        },
        "children":[

        ]
    },
    {
        "path":"/404",
        "name":"404",
        "meta":{

        },
        "children":[

        ]
    },
    {
        "path":"/401",
        "name":"401",
        "meta":{

        },
        "children":[

        ]
    },
    {
        "path":"/",
        "redirect":"/profile",
        "meta":{

        },
        "children":[
            {
                "path":"/profile",
                "name":"profile",
                "meta":{
                    "title":"profile",
                    "icon":"el-icon-user"
                }
            },
            {
                "path":"/404",
                "name":"404"
            },
            {
                "path":"/401",
                "name":"401"
            }
        ]
    },
    {
        "path":"/user",
        "redirect":"/user/manage",
        "meta":{
            "title":"user",
            "icon":"personnel"
        },
        "children":[
            {
                "path":"/user/manage",
                "meta":{
                    "title":"userManage",
                    "icon":"personnel-manage"
                }
            },
            {
                "path":"/user/role",
                "meta":{
                    "title":"roleList",
                    "icon":"role"
                }
            },
            {
                "path":"/user/permission",
                "meta":{
                    "title":"permissionList",
                    "icon":"permission"
                }
            },
            {
                "path":"/user/info/:id",
                "name":"userInfo",
                "meta":{
                    "title":"userInfo"
                }
            },
            {
                "path":"/user/import",
                "name":"import",
                "meta":{
                    "title":"excelImport"
                }
            }
        ]
    },
    {
        "path":"/article",
        "redirect":"/article/ranking",
        "meta":{
            "title":"article",
            "icon":"article"
        },
        "children":[
            {
                "path":"/article/ranking",
                "meta":{
                    "title":"articleRanking",
                    "icon":"article-ranking"
                }
            },
            {
                "path":"/article/:id",
                "meta":{
                    "title":"articleDetail"
                }
            },
            {
                "path":"/article/create",
                "meta":{
                    "title":"articleCreate",
                    "icon":"article-create"
                }
            },
            {
                "path":"/article/editor/:id",
                "meta":{
                    "title":"articleEditor"
                }
            }
        ]
    }
]
```

从返回的数据来看，它与我们想要的数据结构相去甚远。

出现这个问题的原因，是因为它返回的是一个 **完整的路由表**

这个路由表距离我们想要的存在两个问题：

1. 存在重复的路由数据
2. 不满足该条件 `meta && meta.title && meta.icon` 的数据不应该存在

那么接下来我们就应该来处理这两个问题

创建 `utils/route` 文件，创建两个方法分别处理对应的两个问题：

1. `filterRouters`
2. `generateMenus`

写入以下代码：

```js
/**
 * 路由表相关方法
 */

import path from 'path'

/**
 * 返回所有子路由
 * @param routes 需要处理的路由
 * @returns {*[]}
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes() (需要处理的路由)
 */
export const filterRouters = routes => {
  // 获取所有子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子集路由查重
  return routes.filter(route => {
    // 根据 route 在 childrenRoutes 中查重 剔除重复路径
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 * @param data 需要判断的数据
 * @returns {boolean}
 */
function isNull (data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 根据 routes (filterRoutes处理过的) 数据返回对应的 menu 规则数组
 * @param routes routes (filterRoutes处理过的) 数据
 * @param basePath 基础路径 默认为 ''
 * @returns {*[]}
 */
export function generateMenus (routes, basePath = '') {
  const result = []
  // 遍历路由表 不满足 meta && meta.title && meta.icon 的数据应该剔除
  routes.forEach(item => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children && 不存在 meta => 递归 generateMenus
    if (isNull(item.meta) && !isNull(item.children)) {
      // generateMenus(route.children) 返回一个数组 push 到 result 中
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在 children && 存在 meta || 存在 children && 存在 meta
    // 因为最终要实现路由跳转 需要合并路由作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find(item => item.path === routePath)
    // 当前路由未加入 result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}

```

在 `SidebarMenu` 中调用该方法

```vue
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
console.log(JSON.stringify(routes.value))
</script>
```

得到该数据结构

```json
[
    {
        "path":"/profile",
        "name":"profile",
        "meta":{
            "title":"profile",
            "icon":"el-icon-user"
        },
    },
    {
        "path":"/user",
        "redirect":"/user/manage",
        "meta":{
            "title":"user",
            "icon":"personnel"
        },
        "props":{
            "default":false
        },
        "children":[
            {
                "path":"/user/manage",
                "name":"userManage",
                "meta":{
                    "title":"userManage",
                    "icon":"personnel-manage"
                },
                "children":[

                ]
            },
            {
                "path":"/user/role",
                "name":"userRole",
                "meta":{
                    "title":"roleList",
                    "icon":"role"
                },
                "children":[

                ]
            },
            {
                "path":"/user/permission",
                "name":"userPermission",
                "meta":{
                    "title":"permissionList",
                    "icon":"permission"
                },
                "children":[

                ]
            }
        ],
    },
    {
        "path":"/article",
        "redirect":"/article/ranking",
        "meta":{
            "title":"article",
            "icon":"article"
        },
        "props":{
            "default":false
        },
        "children":[
            {
                "path":"/article/ranking",
                "name":"articleRanking",
                "meta":{
                    "title":"articleRanking",
                    "icon":"article-ranking"
                },
                "children":[

                ]
            },
            {
                "path":"/article/create",
                "name":"articleCreate",
                "meta":{
                    "title":"articleCreate",
                    "icon":"article-create"
                },
                "children":[

                ]
            }
        ],
    }
]
```

### 生成动态 menu 菜单

有了数据结构之后，最后的步骤就水到渠成了

整个 `menu` 菜单，我们将分成三个组件来进行处理

1. `SidebarMenu`：处理数据，作为最顶层 `menu` 载体
2. `SidebarItem`：根据数据处理 **当前项为 `el-submenu` || `el-menu-item`**
3. `MenuItem`：处理 `el-menu-item` 样式

那么下面我们一个个来处理

首先是 `SidebarMenu`

```vue
<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    ...
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

```



创建 `SidebarItem` 组件，用来根据数据处理 **当前项为 `el-submenu` || `el-menu-item`**

```vue
<template>
  <!-- 支持渲染多级 menu 菜单 -->
  <el-submenu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <!-- 循环渲染 -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-submenu>
  <!-- 渲染 item 项 -->
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
import MenuItem from './MenuItem'
import { defineProps } from 'vue'
// 定义 props
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
```

创建 `MenuItem` 用来处理 `el-menu-item` 样式

```vue
<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ title }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
</style>
```

至此，整个的 `menu` 菜单结构就已经完成了

但是此时我们的 `menu` 菜单还存在三个小的问题：

1. 样式问题
2. 路由跳转问题
3. 默认激活项

**样式问题：**

首先处理样式，因为后面我们需要处理 **主题替换** ，所以此处我们不能把样式写死

在 `store/getters` 中创建一个新的 **快捷访问**

```js
import variables from '@/styles/variables.scss'
const getters = {
  ...
  cssVar: state => variables
}
export default getters
```

在 `SidebarMenu` 中写入如下样式

```html
<el-menu
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
  >
```

**路由跳转问题：**

为 `el-menu` 指定 `router`

```html
 <el-menu
    ...
    router
  >
```



**默认激活项：**

根据当前 `url` 进行判断即可

```vue

  <el-menu
    :default-active="activeMenu"
    ...
  >

<script setup>
...

// 计算高亮 menu 的方法
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

```

至此整个 **动态`menu`完成**
