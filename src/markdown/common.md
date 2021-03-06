<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [通用方案](#%E9%80%9A%E7%94%A8%E6%96%B9%E6%A1%88)
  - [国际化](#%E5%9B%BD%E9%99%85%E5%8C%96)
    - [国际化实现原理](#%E5%9B%BD%E9%99%85%E5%8C%96%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
    - [基于 vue-i18n V9  的国际化实现方案分析](#%E5%9F%BA%E4%BA%8E-vue-i18n-v9--%E7%9A%84%E5%9B%BD%E9%99%85%E5%8C%96%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%A1%88%E5%88%86%E6%9E%90)
    - [封装  langSelect  组件](#%E5%B0%81%E8%A3%85--langselect--%E7%BB%84%E4%BB%B6)
    - [element-plus 国际化处理](#element-plus-%E5%9B%BD%E9%99%85%E5%8C%96%E5%A4%84%E7%90%86)
    - [自定义语言包国际化处理](#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%AF%AD%E8%A8%80%E5%8C%85%E5%9B%BD%E9%99%85%E5%8C%96%E5%A4%84%E7%90%86)
    - [处理项目国际化内容](#%E5%A4%84%E7%90%86%E9%A1%B9%E7%9B%AE%E5%9B%BD%E9%99%85%E5%8C%96%E5%86%85%E5%AE%B9)
    - [国际化缓存处理](#%E5%9B%BD%E9%99%85%E5%8C%96%E7%BC%93%E5%AD%98%E5%A4%84%E7%90%86)
  - [动态换肤](#%E5%8A%A8%E6%80%81%E6%8D%A2%E8%82%A4)
    - [原理分析](#%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90)
    - [创建 ThemeSelect 组件](#%E5%88%9B%E5%BB%BA-themeselect-%E7%BB%84%E4%BB%B6)
    - [处理 element-plus 主题变更原理与步骤分析](#%E5%A4%84%E7%90%86-element-plus-%E4%B8%BB%E9%A2%98%E5%8F%98%E6%9B%B4%E5%8E%9F%E7%90%86%E4%B8%8E%E6%AD%A5%E9%AA%A4%E5%88%86%E6%9E%90)
    - [处理 element-plus 主题变更](#%E5%A4%84%E7%90%86-element-plus-%E4%B8%BB%E9%A2%98%E5%8F%98%E6%9B%B4)
    - [element-plus 新主题的立即生效](#element-plus-%E6%96%B0%E4%B8%BB%E9%A2%98%E7%9A%84%E7%AB%8B%E5%8D%B3%E7%94%9F%E6%95%88)
    - [自定义主题变更](#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98%E5%8F%98%E6%9B%B4)
  - [全屏](#%E5%85%A8%E5%B1%8F)
    - [原理及方案分析](#%E5%8E%9F%E7%90%86%E5%8F%8A%E6%96%B9%E6%A1%88%E5%88%86%E6%9E%90)
    - [screenfull](#screenfull)
  - [页面搜索](#%E9%A1%B5%E9%9D%A2%E6%90%9C%E7%B4%A2)
    - [创建 headerSearch 组件](#%E5%88%9B%E5%BB%BA-headersearch-%E7%BB%84%E4%BB%B6)
    - [对检索数据源进行模糊搜索](#%E5%AF%B9%E6%A3%80%E7%B4%A2%E6%95%B0%E6%8D%AE%E6%BA%90%E8%BF%9B%E8%A1%8C%E6%A8%A1%E7%B3%8A%E6%90%9C%E7%B4%A2)
    - [数据源重处理，生成  searchPool](#%E6%95%B0%E6%8D%AE%E6%BA%90%E9%87%8D%E5%A4%84%E7%90%86%E7%94%9F%E6%88%90--searchpool)
    - [渲染检索数据](#%E6%B8%B2%E6%9F%93%E6%A3%80%E7%B4%A2%E6%95%B0%E6%8D%AE)
    - [剩余问题处理](#%E5%89%A9%E4%BD%99%E9%97%AE%E9%A2%98%E5%A4%84%E7%90%86)
  - [tagsView](#tagsview)
    - [原理及方案分析](#%E5%8E%9F%E7%90%86%E5%8F%8A%E6%96%B9%E6%A1%88%E5%88%86%E6%9E%90-1)
    - [创建 tags 数据源](#%E5%88%9B%E5%BB%BA-tags-%E6%95%B0%E6%8D%AE%E6%BA%90)
    - [生成 tagsView](#%E7%94%9F%E6%88%90-tagsview)
    - [contextMenu 展示处理](#contextmenu-%E5%B1%95%E7%A4%BA%E5%A4%84%E7%90%86)
    - [处理 contextMenu 的关闭行为](#%E5%A4%84%E7%90%86-contextmenu-%E7%9A%84%E5%85%B3%E9%97%AD%E8%A1%8C%E4%B8%BA)
    - [处理基于路由的动态过渡](#%E5%A4%84%E7%90%86%E5%9F%BA%E4%BA%8E%E8%B7%AF%E7%94%B1%E7%9A%84%E5%8A%A8%E6%80%81%E8%BF%87%E6%B8%A1)
  - [guide 引导页](#guide-%E5%BC%95%E5%AF%BC%E9%A1%B5)
    - [原理及方案分析](#%E5%8E%9F%E7%90%86%E5%8F%8A%E6%96%B9%E6%A1%88%E5%88%86%E6%9E%90-2)
    - [生成 Guide](#%E7%94%9F%E6%88%90-guide)
    - [Guide 业务逻辑处理](#guide-%E4%B8%9A%E5%8A%A1%E9%80%BB%E8%BE%91%E5%A4%84%E7%90%86)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-05-24 12:45:45
 * @LastEditors: hidari 
 * @LastEditTime: 2022-05-24 16:49:11
 * @FilePath: \vue3-integrated-back-office-solution\src\markdown\common.md
 * @Description: 通用功能开发
 * 
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved. 
-->
# 通用方案

具体如下：

1. 国际化
2. 动态换肤
3. `screenfull`
4. `headerSearch`
5. `tagView`
6. `guide`

## 国际化

### 国际化实现原理

先来看一个需求：

> 我们有一个变量 `msg` ，但是这个 `msg` 有且只能有两个值：
>
> 1. hello world
> 2. 你好世界
>
> 要求：根据需要切换 `msg` 的值

这样的一个需求就是 国际化 的需求，那么我们可以通过以下代码来实现这个需求

```js
  // 1. 定义 msg 值的数据源
  const messages = {
    en: {
      msg: 'hello world'
    },
    zh: {
      msg: '你好世界'
    }
  }
  // 2. 定义切换变量
  let locale = 'en'
  // 3. 定义赋值函数
  function t(key) {
    return messages[locale][key]
  }
  // 4. 为 msg 赋值 
  let msg = t('msg')
  console.log(msg);
  // 修改 locale， 重新执行 t 方法，获取不同语言环境下的值
```

 总结：

1. 通过一个变量来 **控制** 语言环境
2. 所有语言环境下的数据源要 **预先** 定义好
3. 通过一个方法来获取 **当前语言** 下 **指定属性** 的值
4. 该值即为国际化下展示值

### 基于 vue-i18n V9  的国际化实现方案分析

在 `vue` 的项目中，可以直接使用 [vue-i18n](https://vue-i18n.intlify.dev/) 进行实现（注意：**`vue3` 下需要使用 `V 9.x` 的 `i18n`**）

[vue-i18n](https://vue-i18n.intlify.dev/guide/) 的使用可以分为四个部分：

1. 创建 `messages` 数据源
2. 创建 `locale` 语言变量
3. 初始化 `i18n` 实例
4. 注册 `i18n` 实例

那么接下来我们就去实现一下：

1. 安装 `vue-i18n`

   ```
   npm install vue-i18n@next
   ```

2. 创建 `i18n/index.js` 文件

3. 创建 `messages` 数据源

   ```js
   const messages = {
     en: {
       msg: {
         test: 'hello world'
       }
     },
     zh: {
       msg: {
         test: '你好世界'
       }
     }
   }
   ```

4. 创建 `locale` 语言变量

   ```js
   const locale = 'en'
   ```

5. 初始化 `i18n` 实例

   ```js
   import { createI18n } from 'vue-i18n'
   
   const i18n = createI18n({
     // 使用 Composition API 模式，则需要将其设置为false
     legacy: false,
     // 全局注入 $t 函数
     globalInjection: true,
     locale,
     messages
   })
   ```

6. 把 `i18n` 注册到 `vue` 实例

   ```js
   
   export default i18n
   ```

7. 在 `main.js` 中导入

   ```js
   // i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
   import i18n from '@/i18n'
   ...
   app.use(i18n)
   ```

8. 在 `layout/components/Sidebar/index.vue` 中使用 `i18n`

   ```html
   <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
           {{ $t('msg.test') }}
   </h1>
   ```

9. 修改 `locale` 的值，即可改变展示的内容

现在已经实现了 `i18n` 的最基础用法，接下来在项目中使用 `i18n` 完成国际化。

项目中完成国际化分成以下几步进行:

1. 封装 `langSelect` 组件用于修改 `locale`
2. 导入 `el-locale` 语言包
3. 创建自定义语言包

### 封装  langSelect  组件

1. 定义 `store/app.js`
    ```js
    import { getItem, setItem } from '@/utils/storage'
    import { LANG } from '@/constant'
    export default {
    namespaced: true,
    state: () => ({
        // sidebar是否打开
        sidebarOpened: true,
        // 需要展示的语言
        language: getItem(LANG) || 'zh'
    }),
    mutations: {
        /**
         * 控制打开/关闭sidebar
         * @param {*} state
         */
        triggerSidebarOpened (state) {
        state.sidebarOpened = !state.sidebarOpened
        },
        /**
         * 改变需要展示的语言
         * @param {*} state
         * @param {*} lang 需要展示的语言
         */
        setLanguage (state, lang) {
        // 数据持久化
        setItem(LANG, lang)
        state.language = lang
        }
    }
    }
    ```

2. 在 `constant` 中定义常量

   ```js
   // 国际化
   export const LANG = 'language'
   ```

3. 创建 `components/LangSelect/index`

- `el-tooltip`组件中间的内容要外面包裹一层元素
```vue
<template>
  <el-dropdown
   class="international"
    trigger="click"
     @command="handleSetLanguage"
   >
    <el-tooltip content="国际化" :effect="effect">
        <div>
            <svg-icon icon="language"></svg-icon>
        </div>
    </el-tooltip>
    <template #dropdown>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
    </template>
   </el-dropdown>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

defineProps({
  // 接受传递来的props 提示背景色
  effect: {
    type: String,
    default: 'dark',
    // 值必须匹配下列字符串中的一个 只能在 dark light 中切换
    validator: (value) => ['dark', 'light'].indexOf(value) !== -1
  }
})

const store = useStore()
// 从仓库中取到language
const language = computed(() => store.getters.language)

// 切换语言的方法
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  // 切换 i18n 的 locale
  i18n.locale.value = lang
  // 修改 vuex 中保存的language
  store.commit('app/setLanguage', lang)
  // 提示
  ElMessage.success('更新成功')
}
</script>

<style lang="scss" scoped>

</style>
```

4. 在 `navbar` 中导入 `LangSelect`
```vue
<template>
  <div class="navbar">
    ...
    <div class="right-menu">
        <!-- 国际化 -->
        <Lang-select class="right-menu-item hover-effect" />
      <!--      头像-->
      ...
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '@/components/hamburger'
import Breadcrumb from '@/components/breadcrumb/index.vue'
import LangSelect from '@/components/langSelect/index.vue'
const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
...
.right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.right-menu-item) {
        display: inline-block;
        padding: 0 18px 0 0;
        font-size: 24px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
            cursor: pointer;
            transition: background 0.3s;

            &:hover {
                background: rgba(0, 0, 0, 0.025);
            }
        }
    }
}
...
</style>
```


### element-plus 国际化处理

对于语言包来说，本项目中会分成两部分：

1. `element-plus` 语言包：用来处理 `element` 组件的国际化功能
2. 自定义语言包：用来处理 **非**`element` 组件的国际化功能

首先处理 `element-plus` 语言包：

**按照正常的逻辑，我们是可以通过 `element-ui` 配合 `vue-i18n`来实现国际化功能的，但是目前的 `element-plus` 尚未提供配合  `vue-i18n` 实现国际化的方式！ **

所以说，我们暂时只能先去做临时处理，等到 `element-plus` 支持 `vue-i18n` 功能之后，我们再进行对接实现

1. 在 `plugins/index` 中导入 `element` 的中文、英文语言包：

```js
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
```

2. 注册 `element` 时，根据当前语言选择使用哪种语言包

   ```js
   import store from '@/store'
   
   export default app => {
     app.use(ElementPlus, {
       locale: store.getters.language === 'en' ? en : zhCn
     })
   }
   ```

### 自定义语言包国际化处理
1.  在 `i18n` 中创建 `lang` 文件夹
- `src\i18n\lang\en.js`
```js
export default {
  login: {
    title: 'User Login',
    loginBtn: 'Login',
    usernameRule: 'Username is required',
    passwordRule: 'Password cannot be less than 6 digits',
    desc: `
    Test authority account:<br />
     Provide three kinds of authority accounts:<br />
     1. Super administrator account: super-admin <br />
     2. Administrator account: admin <br />
     3. Test configurable account: test <br />
     The uniform password is: 123456 <br />
     <br />
     Import user account:<br />
     You can log in with the imported username <br />
     The password is unified as: 123456 <br />
     <b>Note: Import user-discriminatory Chinese and English libraries! ! ! ! </b>
    `
  },
  route: {
    profile: 'Profile',
    user: 'user',
    excelImport: 'ExcelImport',
    userManage: 'EmployeeManage',
    userInfo: 'UserInfo',
    roleList: 'RoleList',
    permissionList: 'PermissionList',
    article: 'article',
    articleRanking: 'ArticleRanking',
    articleCreate: 'ArticleCreate',
    articleDetail: 'ArticleDetail',
    articleEditor: 'ArticleEditor'
  },
  toast: {
    switchLangSuccess: 'Switch Language Success'
  },
  tagsView: {
    refresh: 'Refresh',
    closeRight: 'Close Rights',
    closeOther: 'Close Others'
  },
  theme: {
    themeColorChange: 'Theme Color Change',
    themeChange: 'Theme Change'
  },
  universal: {
    confirm: 'confirm',
    cancel: 'cancel'
  },
  navBar: {
    themeChange: 'Theme Modification',
    headerSearch: 'Page Search',
    screenfull: 'Full Screen Replacement',
    lang: 'Globalization',
    guide: 'Function Guide',
    home: 'Home',
    course: 'Course homepage',
    logout: 'Log out'
  },
  guide: {
    close: 'close',
    next: 'next',
    prev: 'previous',
    guideTitle: 'guidance',
    guideDesc: 'Turn on the boot function',
    hamburgerTitle: 'Hamburger button',
    hamburgerDesc: 'Open and close the left menu',
    breadcrumbTitle: 'Bread crumbs',
    breadcrumbDesc: 'Indicates the current page position',
    searchTitle: 'search',
    searchDesc: 'Page link search',
    fullTitle: 'full screen',
    fullDesc: 'Page display switching',
    themeTitle: 'theme',
    themeDesc: 'Change project theme',
    langTitle: 'globalization',
    langDesc: 'Language switch',
    tagTitle: 'Label',
    tagDesc: 'Opened page tab',
    sidebarTitle: 'menu',
    sidebarDesc: 'Project function menu'
  },
  profile: {
    muted:
      '"Vue3 rewrite vue-element-admin, realize the back-end front-end integrated solution" project demonstration',
    introduce: 'Introduce',
    projectIntroduction: 'Project Introduction',
    projectFunction: 'Project Function',
    feature: 'Feature',
    chapter: 'Chapter',
    author: 'Author',
    name: 'Sunday',
    job: 'A front-end development program',
    Introduction:
      'A senior technical expert, once worked in a domestic first-line Internet company, and has coordinated multiple large-scale projects with more than tens of millions of users. Committed to researching big front-end technology, he has been invited to participate in domestic front-end technology sharing sessions many times, such as: Google China Technology Sharing Session in 2018.'
  },
  userInfo: {
    print: 'Print',
    title: 'Employee information',
    name: 'name',
    sex: 'gender',
    nation: 'nationality',
    mobile: 'phone number',
    province: 'Place of residence',
    date: 'Entry Time',
    remark: 'Remark',
    address: 'contact address',
    experience: 'Experience',
    major: 'Professional',
    glory: 'Glory',
    foot: 'Signature:___________Date:___________'
  },
  uploadExcel: {
    upload: 'Click upload',
    drop: 'Drag files here'
  },
  excel: {
    importExcel: 'excel import',
    exportExcel: 'excel export',
    exportZip: 'zip export',
    name: 'Name',
    mobile: 'contact details',
    avatar: 'Avatar',
    role: 'Role',
    openTime: 'Opening time',
    action: 'Operate',
    show: 'Check',
    showRole: 'Role',
    defaultRole: 'Staff',
    remove: 'delete',
    removeSuccess: 'Deleted successfully',
    title: 'Export to excel',
    placeholder: 'excel file name',
    defaultName: 'Staff Management Form',
    close: 'Cancel',
    confirm: 'Export',
    importSuccess: ' Employee data imported successfully',
    dialogTitle1: 'Are you sure you want to delete the user ',
    dialogTitle2: ' Is it?',
    roleDialogTitle: 'Configure roles'
  },
  role: {
    buttonTxt: 'New Role',
    index: 'Serial number',
    name: 'name',
    desc: 'describe',
    action: 'operate',
    assignPermissions: 'assign permissions',
    removeRole: 'Delete role',
    dialogTitle: 'New role',
    dialogRole: 'Role Name',
    dialogDesc: 'Role description',
    updateRoleSuccess: 'User role updated successfully'
  },
  permission: {
    name: 'Authority name',
    mark: 'Authority ID',
    desc: 'Permission description'
  },
  article: {
    ranking: 'Ranking',
    title: 'Title',
    author: 'Author',
    publicDate: 'release time',
    desc: 'brief introduction',
    action: 'operate',
    dynamicTitle: 'Dynamic display',
    show: 'check',
    remove: 'delete',
    edit: 'editor',
    dialogTitle1: 'Are you sure you want to delete the article ',
    dialogTitle2: ' NS?',
    removeSuccess: 'Article deleted successfully',
    titlePlaceholder: 'Please enter the title of the article',
    markdown: 'Markdown',
    richText: 'Rich Text',
    commit: 'commit',
    createSuccess: 'The article was created successfully',
    editorSuccess: 'Article modified successfully',
    sortSuccess: 'Article ranking modified successfully'
  }
}
```

- `src\i18n\lang\zh.js`
```js
export default {
  login: {
    title: '用户登录',
    loginBtn: '登录',
    usernameRule: '用户名为必填项',
    passwordRule: '密码不能少于6位',
    desc: `
    测试权限账号：<br />
    提供三种权限账号：<br />
    1. 超级管理员账号： super-admin <br />
    2. 管理员账号：admin <br />
    3. 测试可配置账号：test <br />
    密码统一为：123456 <br />
    <br />
    导入用户账号：<br />
    可使用导入的用户名登录 <br />
    密码统一为：123456  <br />
    <b>注意：导入用户区分中英文库！！！！</b>
    `
  },
  route: {
    profile: '个人中心',
    user: '用户',
    excelImport: 'Excel导入',
    userManage: '员工管理',
    userInfo: '员工信息',
    roleList: '角色列表',
    permissionList: '权限列表',
    article: '文章',
    articleRanking: '文章排名',
    articleCreate: '创建文章',
    articleDetail: '文章详情',
    articleEditor: '文章编辑'
  },
  toast: {
    switchLangSuccess: '切换语言成功'
  },
  tagsView: {
    refresh: '刷新',
    closeRight: '关闭右侧',
    closeOther: '关闭其他'
  },
  theme: {
    themeColorChange: '主题色更换',
    themeChange: '主题更换'
  },
  universal: {
    confirm: '确定',
    cancel: '取消'
  },
  navBar: {
    themeChange: '主题修改',
    headerSearch: '页面搜索',
    screenfull: '全屏替换',
    lang: '国际化',
    guide: '功能引导',
    home: '首页',
    course: '课程主页',
    logout: '退出登录'
  },
  guide: {
    close: '关闭',
    next: '下一个',
    prev: '上一个',
    guideTitle: '引导',
    guideDesc: '打开引导功能',
    hamburgerTitle: '汉堡按钮',
    hamburgerDesc: '打开和关闭左侧菜单',
    breadcrumbTitle: '面包屑',
    breadcrumbDesc: '指示当前页面位置',
    searchTitle: '搜索',
    searchDesc: '页面链接搜索',
    fullTitle: '全屏',
    fullDesc: '页面显示切换',
    themeTitle: '主题',
    themeDesc: '更换项目主题',
    langTitle: '国际化',
    langDesc: '语言切换',
    tagTitle: '标签',
    tagDesc: '已打开页面标签',
    sidebarTitle: '菜单',
    sidebarDesc: '项目功能菜单'
  },
  profile: {
    muted: '《vue3 改写 vue-element-admin，实现后台前端综合解决方案》项目演示',
    introduce: '介绍',
    projectIntroduction: '项目介绍',
    projectFunction: '项目功能',
    feature: '功能',
    chapter: '章节',
    author: '作者',
    name: 'Sunday',
    job: '一个前端开发程序猿',
    Introduction:
      '高级技术专家，曾就职于国内一线互联网公司，统筹过的多个大型项目用户数已过千万级。致力于研究大前端技术，多次受邀参加国内前端技术分享会，如：2018 年 Google 中国技术分享会。'
  },
  userInfo: {
    print: '打印',
    title: '员工信息',
    name: '姓名',
    sex: '性别',
    nation: '民族',
    mobile: '手机号',
    province: '居住地',
    date: '入职时间',
    remark: '备注',
    address: '联系地址',
    experience: '经历',
    major: '专业',
    glory: '荣耀',
    foot: '签字：___________日期:___________'
  },
  uploadExcel: {
    upload: '点击上传',
    drop: '将文件拖到此处'
  },
  excel: {
    importExcel: 'excel 导入',
    exportExcel: 'excel 导出',
    exportZip: 'zip 导出',
    name: '姓名',
    mobile: '联系方式',
    avatar: '头像',
    role: '角色',
    openTime: '开通时间',
    action: '操作',
    show: '查看',
    showRole: '角色',
    defaultRole: '员工',
    remove: '删除',
    removeSuccess: '删除成功',
    title: '导出为 excel',
    placeholder: 'excel 文件名称',
    defaultName: '员工管理表',
    close: '取 消',
    confirm: '导 出',
    importSuccess: ' 条员工数据导入成功',
    dialogTitle1: '确定要删除用户 ',
    dialogTitle2: ' 吗？',
    roleDialogTitle: '配置角色'
  },
  role: {
    buttonTxt: '新增角色',
    index: '序号',
    name: '名称',
    desc: '描述',
    action: '操作',
    assignPermissions: '分配权限',
    removeRole: '删除角色',
    dialogTitle: '新增角色',
    dialogRole: '角色名称',
    dialogDesc: '角色描述',
    updateRoleSuccess: '用户角色更新成功'
  },
  permission: {
    name: '权限名称',
    mark: '权限标识',
    desc: '权限描述'
  },
  article: {
    ranking: '排名',
    title: '标题',
    author: '作者',
    publicDate: '发布时间',
    desc: '内容简介',
    action: '操作',
    dynamicTitle: '动态展示',
    show: '查看',
    remove: '删除',
    edit: '编辑',
    dialogTitle1: '确定要删除文章 ',
    dialogTitle2: ' 吗？',
    removeSuccess: '文章删除成功',
    titlePlaceholder: '请输入文章标题',
    markdown: 'markdown',
    richText: '富文本',
    commit: '提交',
    createSuccess: '文章创建成功',
    editorSuccess: '文章修改成功',
    sortSuccess: '文章排名修改成功'
  }
}
```

2. 在 `lang/index` 中，导入语言包
```js
import zhLocale from './lang/zh'
import enLocale from './lang/en'
```
3. 在 `messages` 中注册语言包
```js
// message数据源
const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}
```

### 处理项目国际化内容

需要进行国际化处理的地方主要分为：

1. 登录页面
2. `navbar` 区域
3. `sidebar` 区域
4. 面包屑区域

**登录页面：**

`login/index`

```vue
<template>
  <div class="login-container">
    ...
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
          <lang-select class="lang-select" effect="light"></lang-select>
      </div>

      ...

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
      
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
...
// 验证规则
const i18n = useI18n()
// setup 只在生成页面时执行一次 写到 computed 中可以动态改变
const usernameRule = computed(() => {
  return i18n.t('msg.login.usernameRule')
})
const loginRules = ref({
  username: [
    {
      ...
      message: usernameRule
    }
  ],
  ...
})
...
</script>
```

`login/rules`

```js
import i18n from '@/i18n'
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
```

**`navbar` 区域**

`layout/components/navbar`

```vue
<template>
  <div class="navbar">
    ...
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ $t('msg.navBar.home') }} </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
```

`components/LangSelect/index`

```vue
<el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
       ...
    
    
const handleSetLanguage = lang => {
  ...
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
```

**sidebar 区域**

目前对于 `sidebar` 而言，显示的文本是我们在定义路由表时的 `title`

```html
<span>{{ title }}</span>
```

我们可以 **把 `title` 作为语言包内容的 `key` 进行处理**

创建 `utils/i18n` 工具模块，用于 **将 `title` 转化为国际化内容**

```js
import i18n from '@/i18n'
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

```

在 `layout/components/Sidebar/MenuItem.vue` 中导入该方法：

```vue
<template>
  ...
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { generateTitle } from '@/utils/i18n'
...
</script>

```

最后修改下 `sidebarHeader` 的内容

```php+HTML
<h1 class="logo-title" v-if="$store.getters.sidebarOpened">
	imooc-admin
</h1>
```



**面包屑区域：**

在 `components/Breadcrumb/index`

```vue
<template>
...
    <!-- 不可点击项 -->
    <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
        generateTitle(item.meta.title)
        }}</span>
    <!-- 可点击项 -->
    <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{
        generateTitle(item.meta.title)
        }}</a>
...
</template>

<script setup>
import { generateTitle } from '@/utils/i18n'
...
</script>

```

### 国际化缓存处理

通过两个方面进行：

1. `vuex` 缓存
2. `LocalStorage` 缓存

这里的缓存，已经处理完成，所以只需要使用缓存下来的数据。

在 `i18n/index` 中，创建 `getLanguage` 方法：

```js
import store from '@/store'
/**
 * 返回当前 lang
 */
function getLanguage() {
  return store && store.getters && store.getters.language
}
```

修改 `createI18n` 的 `locale` 为 `getLanguage()` 

```js
const i18n = createI18n({
  ...
  locale: getLanguage()
})
```


## 动态换肤

### 原理分析
在 `scss` 中，可以通过 `$变量名:变量值` 的方式定义 `css 变量` ，然后通过该 `css` 来去指定某一块 `DOM` 对应的颜色, 此时改变了该 `css` 变量的值，那么对应的 `DOM` 颜色也会同步发生变化。

当大量的 `DOM` 都依赖这个 `css 变量` 设置颜色时，只需要改变这个 `css 变量` ，那么所有 `DOM` 的颜色都会发生变化，这个就是 **动态换肤** 的实现原理。

本项目中想要实现动态换肤，需要同时处理两个方面的内容：

1. `element-plus` 主题
2. 非 `element-plus` 主题

- 对于 `element-plus`：因为 `element-plus` 是第三方的包，所以它 **不是完全可控** 的，那么对于这种最简单直白的方案，就是直接拿到它编译后的 `css` 进行色值替换，利用 `style` **内部样式表** 优先级高于 **外部样式表** 的特性，来进行主题替换
- 对于自定义主题：因为自定义主题是 **完全可控** 的，所以只需要修改对应的 `scss`变量

实现方案: 

1. 创建一个组件 `ThemeSelect` 用来处理修改之后的 `css 变量` 的值
2. 根据新值修改 `element-plus`  主题色
3. 根据新值修改非 `element-plus`  主题色

### 创建 ThemeSelect 组件

`ThemeSelect` 组件将由两部分组成：

1. `navbar` 中的展示图标
2. 选择颜色的弹出层

**`navbar` 中的展示图标**

创建 `components/ThemePicker/index` 组件
```vue
<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
   >
   <!-- 图标 -->
   <el-tooltip :content="$t('msg.navBar.themeChange')">
        <div>
            <svg-icon id="guide-theme" icon="change-theme" />
        </div>
   </el-tooltip>
   <template #dropdown>
       <el-dropdown-menu>
           <el-dropdown-item command="color">
                {{ $t('msg.theme.themeColorChange') }}
           </el-dropdown-item>
       </el-dropdown-menu>
   </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div></div>
</template>

<script setup>
const handleSetTheme = () => {}
</script>

<style lang="scss" scoped>

</style>
```
在 `layout/components/navbar` 中进行引用

```vue
<div class="right-menu">
      <theme-picker class="right-menu-item hover-effect"></theme-picker>
      
import ThemePicker from '@/components/ThemePicker/index'
```

**创建 SelectColor 组件**

> 用到 `element` 中的 `el-color-picker` 组件

1. 完成 `SelectColor` 弹窗展示的双向数据绑定
2. 把选中的色值进行本地缓存

**完成 `SelectColor` 弹窗展示的双向数据绑定**

创建 `components/ThemePicker/components/SelectColor.vue` 

```vue
<template>
  <el-dialog title="提示" :model-value="modelValue" @close="closed" width="22%">
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
        <el-button type="primary" @click="comfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

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
// 默认色值
const mColor = ref('#00ff00')

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
/**
 * 确定
 * 1. 修改主题色
 * 2. 保存最新的主题色
 * 3. 关闭 dialog
 */
const comfirm = async () => {
  // 3. 关闭 dialog
  closed()
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>

```



在 `ThemePicker/index` 中使用该组件

```vue
<template>
  ...
  <!-- 展示弹出层 -->
  <div>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>

<script setup>
import SelectColor from './components/SelectColor.vue'
import { ref } from 'vue'

const selectColorVisible = ref(false)
const handleSetTheme = command => {
  selectColorVisible.value = true
}
</script>

```

**把选中的色值进行本地缓存**

缓存的方式分为两种：

1. `vuex`
2. 本地存储

在 `constants/index` 下新建常量值

```js
// 主题色保存的 key
export const MAIN_COLOR = 'mainColor'
// 默认色值
export const DEFAULT_COLOR = '#409eff'
```

创建 `store/modules/theme` 模块，用来处理 **主题色** 相关内容

```js
import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor(state, newColor) {
      state.mainColor = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}
```

在 `store/getters` 下指定快捷访问

```js
mainColor: state => state.theme.mainColor
```

在 `store/index` 中导入 `theme`

```js
...
import theme from './modules/theme.js'

export default createStore({
  getters,
  modules: {
    ...
    theme
  }
})
```

在 `selectColor` 中，设置初始色值 和  缓存色值

```vue
...

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
...
const store = useStore()
// 默认色值
const mColor = ref(store.getters.mainColor)
...
/**
 * 确定
 * 1. 修改主题色
 * 2. 保存最新的主题色
 * 3. 关闭 dialog
 */
const comfirm = async () => {
  // 2. 保存最新的主题色
  store.commit('theme/setMainColor', mColor.value)
  // 3. 关闭 dialog
  closed()
}
</script>


```

### 处理 element-plus 主题变更原理与步骤分析

**实现原理：**

1. 获取当前 `element-plus` 的所有样式
2. 找到我们想要替换的样式部分，通过正则完成替换
3. 把替换后的样式写入到 `style` 标签中，利用样式优先级的特性，替代固有样式

**实现步骤：**


1. 获取当前 `element-plus` 的所有样式
2. 定义我们要替换之后的样式
3. 在原样式中，利用正则替换新样式
4. 把替换后的样式写入到 `style` 标签中


### 处理 element-plus 主题变更

创建 `utils/theme` 工具类，写入两个方法

```js
/**
 * 写入新样式到 style
 * @param {*} newStyle  element-plus 的新样式
 */
export const writeNewStyle = elNewStyle => {
  
}

/**
 * 根据主色值，生成最新的样式表
 */
export const generateNewStyle =  primaryColor => {
 
}
```

第一个方法 `generateNewStyle`，需要安装两个工具类：

1. [rgb-hex](https://www.npmjs.com/package/rgb-hex)：转换RGB(A)颜色为十六进制
2. [css-color-function](https://www.npmjs.com/package/css-color-function)：在CSS中提出的颜色函数的解析器和转换器

还需要写入一个 **颜色转化计算器  `formula.json`**

创建 `constants/formula.json` （https://gist.github.com/benfrain/7545629）

```json
{
  "shade-1": "color(primary shade(10%))",
  "light-1": "color(primary tint(10%))",
  "light-2": "color(primary tint(20%))",
  "light-3": "color(primary tint(30%))",
  "light-4": "color(primary tint(40%))",
  "light-5": "color(primary tint(50%))",
  "light-6": "color(primary tint(60%))",
  "light-7": "color(primary tint(70%))",
  "light-8": "color(primary tint(80%))",
  "light-9": "color(primary tint(90%))",
  "subMenuHover": "color(primary tint(70%))",
  "subMenuBg": "color(primary tint(80%))",
  "menuHover": "color(primary tint(90%))",
  "menuBg": "color(primary)"
}
```

实现方法：
```js
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
```

在 `SelectColor.vue` 中导入这两个方法：

```vue
...

<script setup>
...
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
...
/**
 * 确定
 * 1. 修改主题色
 * 2. 保存最新的主题色
 * 3. 关闭 dialog
 */

const comfirm = async () => {
  // 1.1 获取主题色
  const newStyleText = await generateNewStyle(mColor.value)
  // 1.2 写入最新主题色
  writeNewStyle(newStyleText)
  // 2. 保存最新的主题色
  store.commit('theme/setMainColor', mColor.value)
  // 3. 关闭 dialog
  closed()
}
</script>

```

### element-plus 新主题的立即生效

问题：**在刷新页面后，新主题会失效**

原因：**因为没有写入新的 `style`**

解决方案： **应用加载后，写入 `style` 即可**

写入的时机可以放入到 `app.vue` 中

```vue
<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
const store = useStore()
/**
 * 从store中取出设定的主题色，在主页面进入时发送请求更改
 */
generateNewStyle(store.getters.mainColor).then(newStyle => {
  writeNewStyle(newStyle)
})
</script>
```

### 自定义主题变更

**`menu` 菜单背景色**

`menu` 菜单背景色的位置在 `layout/components/sidebar/SidebarMenu.vue` 中

```js
  <el-menu
    :default-active="activeMenu"
    :collapse="!$store.getters.sidebarOpened"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    router
  >
```

此处的 背景色是通过 `getters` 进行指定的，该 `cssVar` 的 `getters` 为：

```js
cssVar: state => variables,
```

**根据当前保存的 `mainColor` 覆盖原有的默认色值**

```js
import variables from '@/styles/variables.scss'
import { MAIN_COLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'

const getters = {
  ...
  /**
   * variables 主题样式变量
   * @param state
   * @returns {*}
   */
  cssVar: state => ({
    ...variables,
    // 主题色
    // 对象中后面的对象key相同时会替换掉前面相同key的key值
    ...generateColors(getItem(MAIN_COLOR))
  }),
  ...
}
export default getters

```

在 `layout/index` 中设置 `sidebar` 的 `backgroundColor`

```html
<sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    />
```

问题：主题色替换之后，需要刷新页面才可响应

这个是因为 `getters` 中没有监听到 **依赖值的响应变化**，所以我们希望修改依赖值

在 `store/modules/theme` 中

```js
...
import variables from '@/styles/variables.scss'
export default {
  namespaced: true,
  state: () => ({
    ...
    variables
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor(state, newColor) {
      ...
      state.variables.menuBg = newColor
      ...
    }
  }
}

```

在 `getters` 中

```js
....

const getters = {
 ...
  /**
   * variables 主题样式变量
   * @param state
   * @returns {*}
   */
  cssVar: state => ({
    ...state.theme.variables,
    // 主题色
    // 对象中后面的对象key相同时会替换掉前面相同key的key值
    ...generateColors(getItem(MAIN_COLOR))
  }),
  ...
}
export default getters

```

## 全屏

### 原理及方案分析

**原理：**

对于 `screenfull ` 而言，浏览器本身已经提供了对用的 `API`，[点击这里即可查看](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API)，这个 `API` 中，主要提供了两个方法：

1. [`Document.exitFullscreen()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/exitFullscreen)：该方法用于请求从全屏模式切换到窗口模式
2. [`Element.requestFullscreen()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen)：该方法用于请求浏览器（user agent）将特定元素（甚至延伸到它的后代元素）置为全屏模式
   1. 比如我们可以通过 `document.getElementById('app').requestFullscreen()` 在获取 `id=app` 的 `DOM` 之后，把该区域置为全屏

但是该方法存在一定的小问题，比如：

1. `appmain` 区域背景颜色为黑色

所以通常情况下我们不会直接使用该 `API` 来去实现全屏效果，而是会使用它的包装库 [screenfull](https://www.npmjs.com/package/screenfull)

**方案：**

整体的方案实现分为两步：

1. 封装 `screenfull` 组件
   1. 展示切换按钮
   2. 基于 [screenfull](https://www.npmjs.com/package/screenfull) 实现切换功能
2. 在 `navbar` 中引入该组件

### screenfull

**封装 `screenfull` 组件：**

1. 下来依赖包  [screenfull](https://www.npmjs.com/package/screenfull) 

   ```
   npm i screenfull@5.1.0
   ```

2. 创建 `components/Screenfull/index`

```vue
<template>
  <div @click="onToggle">
    <el-tooltip :content="$t('msg.navBar.screenfull')">
        <div>
            <svg-icon :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
        </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
// 引入第三方包全屏
import screenfull from 'screenfull/dist/screenfull'

// 是否全屏
const isFullscreen = ref(false)
// 触发事件
const onToggle = () => {
  // 切换全屏
  screenfull.toggle()
}

// 监听 screenfull 变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
// on: 绑定监听
onMounted(() => {
  screenfull.on('change', change)
})

// off：取消绑定
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>
```

**在 `navbar` 中引入该组件：**

```
<screenfull class="right-menu-item hover-effect" />
import Screenfull from '@/components/Screenfull'
```

## 页面搜索

> 在指定搜索框中对当前应用中所有页面进行检索，以 `select` 的形式展示出被检索的页面，以达到快速进入的目的

**原理：**

整个 `headerSearch` 其实可以分为三个核心的功能点：

1. 根据指定内容对所有页面进行检索
2. 以 `select` 形式展示检索出的页面
3. 通过检索页面可快速进入对应页面

**根据指定内容检索所有页面，把检索出的页面以 `select` 展示，点击对应 `option` 可进入**

**方案：**

1. 创建 `headerSearch` 组件，用作样式展示和用户输入内容获取
2. 获取所有的页面数据，用作被检索的数据源
3. 根据用户输入内容在数据源中进行 [模糊搜索](https://fusejs.io/) 
4. 把搜索到的内容以 `select` 进行展示
5. 监听 `select` 的 `change` 事件，完成对应跳转


### 创建 headerSearch 组件

创建 `components/headerSearch/index` 组件：

```vue
<template>
  <div class="header-search" :class="{show:isShow}">
      <el-tooltip :content="$t('msg.navBar.headerSearch')">
        <div @click.stop="onShowClick" >
            <svg-icon id="guide-search" class-name="search-icon" icon="search" />
        </div>
      </el-tooltip>
      <el-select
        ref="headerSearchSelectRef"
        class="header-search-select"
        v-model="search"
        filterable
        default-first-option
        remote
        placeholder="Search"
        :remote-method="querySearch"
        @change="onSelectChange"
      >
        <el-option
        v-for="option in 5"
        :key="option"
        :label="option"
        :value="option"
        ></el-option>
      </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 控制 search 展示
const isShow = ref(false)
/**
 * 当点击搜索按钮时显示搜索框
 */
const onShowClick = () => {
  isShow.value = !isShow.value
}

// 搜索相关
const search = ref('')
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  :deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
```

在 `navbar` 中导入该组件

```
<header-search class="right-menu-item hover-effect"></header-search>
import HeaderSearch from '@/components/HeaderSearch'
```


**检索数据源**: 有哪些页面希望检索

本项目希望被检索的页面其实就是左侧菜单中的页面，检索数据源即为：**左侧菜单对应的数据源**

实现：

```vue
<script setup>
import { ref, computed } from 'vue'
import { filterRouters, generateMenus } from '@/utils/route'
import { useRouter } from 'vue-router'
...
// 检索数据源
const router = useRouter()
const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  console.log(generateMenus(filterRoutes))
  return generateMenus(filterRoutes)
})
console.log(searchPool)
</script>
```

### 对检索数据源进行模糊搜索

> [模糊搜索](https://fusejs.io/) 需要依赖一个第三方的库  [fuse.js](https://fusejs.io/) 

1. 安装 [fuse.js](https://fusejs.io/)

   ```
   npm install --save fuse.js@6.4.6
   ```

2. 初始化 `Fuse`，更多初始化配置项 [可点击这里](https://fusejs.io/api/options.html)

   ```js
   import Fuse from 'fuse.js'
   
   /**
    * 搜索库相关
    */
   const fuse = new Fuse(list, {
       // 是否按优先级进行排序
       shouldSort: true,
       // 匹配长度超过这个值的才会被认为是匹配的
       minMatchCharLength: 1,
       // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
       // name：搜索的键
       // weight：对应的权重
       keys: [
         {
           name: 'title',
           weight: 0.7
         },
         {
           name: 'path',
           weight: 0.3
         }
       ]
     })
   
   ```

3. 参考 [Fuse Demo](https://fusejs.io/demo.html) 与 最终效果，最终期望得到如下的检索数据源结构

   ```json
   [
       {
           "path":"/my",
           "title":[
               "个人中心"
           ]
       },
       {
           "path":"/user",
           "title":[
               "用户"
           ]
       },
       {
           "path":"/user/manage",
           "title":[
               "用户",
               "用户管理"
           ]
       },
       {
           "path":"/user/info",
           "title":[
               "用户",
               "用户信息"
           ]
       },
       {
           "path":"/article",
           "title":[
               "文章"
           ]
       },
       {
           "path":"/article/ranking",
           "title":[
               "文章",
               "文章排名"
           ]
       },
       {
           "path":"/article/create",
           "title":[
               "文章",
               "创建文章"
           ]
       }
   ]
   ```

4. 对数据源进行重新处理

### 数据源重处理，生成  searchPool

创建 `compositions/HeaderSearch/fuseData.js`

```js
import i18n from '@/i18n'
import path from 'path'

/**
 * 筛选出可供搜索的路由对象
 * @param {Array} routes filter整理出的路由数组表
 * @param {String} basePath 基础路径 默认为 /
 * @param {Array} prefixTitle 搜索展示的标题
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  // 创建 result 数据
  let res = []

  // 循环遍历 routes
  for (const route of routes) {
    // 创建包含 path 和 title 的 item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    // 当前存在 mata 时 使用 i18n 进行国际化解析 组合成新的 title
    // 动态路由不允许被检索
    // 正则 判断动态路由 只要路径中包含冒号 就判定为动态路由
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      // 有title并且不是动态路由 用 i18n处理国际化
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }

    // 存在 children 迭代处理
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
```

在 `headerSearch` 中导入 `generateRoutes`

```vue
<script setup>
import { computed, ref } from 'vue'
import { generateRoutes } from './FuseData'
import Fuse from 'fuse.js'
import { filterRouters } from '@/utils/route'
import { useRouter } from 'vue-router'

...

// 检索数据源
const router = useRouter()
const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})
/**
 * 搜索库相关
 */
const fuse = new Fuse(searchPool.value, {
  ...
})
</script>
```

通过 `querySearch` 测试搜索结果

```js
// 搜索方法
const querySearch = query => {
  console.log(fuse.search(query))
}
```

### 渲染检索数据

1. 渲染检索出的数据

```vue
<template>
    <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
    ></el-option>
</template>

<script setup>
...
// 搜索结果
const searchOptions = ref([])
// 搜索方法
const querySearch = query => {
    if (query !== '') {
    searchOptions.value = fuse.search(query)
    } else {
    searchOptions.value = []
    }
}
...
</script>
```

   

2. 完成对应跳转

```js
// 选中回调
const onSelectChange = val => {
    router.push(val.path)
}
```

### 剩余问题处理

1. 在 `search` 打开时，点击 `body` 关闭 `search`
2. 在 `search` 关闭时，清理 `searchOptions`
3. `headerSearch` 应该具备国际化能力

前面两个问题：

```js
/**
 * 关闭 search 的处理事件
 */
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

/**
 * 监听isShow变化 点击body 完成关闭搜索框
 */
watch(isShow, val => {
  if (val) {
    // 搜索框获得焦点
    headerSearchSelectRef.value.focus()
    document.body.addEventListener('click', onClose)
  } else {
    document.removeEventListener('click', onClose)
  }
})
```

国际化的问题: 

**监听语言变化，重新计算数据源初始化 `fuse`**

1. 在 `utils/i18n` 下，新建方法 `watchSwitchLang`

   ```js
   import { watch } from 'vue'
   import store from '@/store'
   
    /**
    * 监听语言变化 同时执行回调函数
    * @param  {...any} cbs 回调函数（可以多个）
    */
    export const watchSwitchLang = (...cbs) => {
    watch(() => store.getters.language,
        () => {
        // 遍历执行回调函数 传入语言
        cbs.forEach(cb => cb(store.getters.language))
        })
    }
   ```

2. 在 `headerSearch` 监听变化，重新赋值

```vue
<script setup>
...
import { watchSwitchLang } from '@/utils/i18n'

...
/**
 * 处理数据源
 */
let searchPool = computed(() => {
  // 筛选出所有需要的路由
  const routes = filterRouters(router.getRoutes())
  return generateRoutes(routes)
})

/**
 * 搜索库相关
 * @param {Object} searchPool => 搜索库
 * @param {Object}  配置项 keys => 搜索方法权重配置
 */
let fuse
const initFuse = searchPool => {
  fuse = new Fuse(searchPool, {
      ...
  })
}
initFuse(searchPool.value)

...
   
/**
 * 监听语言变化
 */
watchSwitchLang(() => {
  // 监听语言变化的回调函数
  searchPool = computed(() => {
    // 重新筛选出所有需要的路由
    const routes = filterRouters(router.getRoutes())
    return generateRoutes(routes)
  })
  initFuse(searchPool.value)
})
</script>
```

完整代码
```vue
<template>
  <div class="header-search" :class="{show:isShow}">
      <el-tooltip :content="$t('msg.navBar.headerSearch')">
        <div @click.stop="onShowClick" >
            <svg-icon id="guide-search" class-name="search-icon" icon="search" />
        </div>
      </el-tooltip>
      <el-select
        ref="headerSearchSelectRef"
        class="header-search-select"
        v-model="search"
        filterable
        default-first-option
        remote
        placeholder="Search"
        :remote-method="querySearch"
        @change="onSelectChange"
      >
        <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
        ></el-option>
      </el-select>
  </div>
</template>

<script setup>
import { filterRouters } from '@/utils/route'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { generateRoutes } from './fuseData'
// 导入第三方包模糊搜索
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

const router = useRouter()
/**
 * 处理数据源
 */
let searchPool = computed(() => {
  // 筛选出所有需要的路由
  const routes = filterRouters(router.getRoutes())
  return generateRoutes(routes)
})

/**
 * 搜索库相关
 * @param {Object} searchPool => 搜索库
 * @param {Object}  配置项 keys => 搜索方法权重配置
 */
let fuse
const initFuse = searchPool => {
  fuse = new Fuse(searchPool, {
  // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

// 控制 search 展示
const isShow = ref(false)
// 搜索框ref
const headerSearchSelectRef = ref(null)
/**
 * 当点击搜索按钮时显示搜索框
 */
const onShowClick = () => {
  isShow.value = !isShow.value
}

/**
 * 监听isShow变化 点击body 完成关闭搜索框
 */
watch(isShow, val => {
  if (val) {
    // 搜索框获得焦点
    headerSearchSelectRef.value.focus()
    document.body.addEventListener('click', onClose)
  } else {
    document.removeEventListener('click', onClose)
  }
})

/**
 * 关闭搜索框事件
 */
const onClose = () => {
  // 搜索框失去焦点
  headerSearchSelectRef.value.blur()
  isShow.value = !isShow.value
}

// 搜索相关
const search = ref('')

// 储存搜索结果数组
const searchOptions = ref([])
/**
 * 搜索方法
 * @param {String} query => 输入的搜索内容
 */
const querySearch = (query) => {
  searchOptions.value = query === '' ? [] : fuse.search(query)
}

/**
 * 选中回调
 * @param {Object} val => 输入的搜索内容对应的搜索结果中的item项
 */
const onSelectChange = (val) => {
  // 改变 search 显示
  search.value = val.title.join(' > ')
  router.push(val.path)
}

/**
 * 监听语言变化
 */
watchSwitchLang(() => {
  // 监听语言变化的回调函数
  searchPool = computed(() => {
    // 重新筛选出所有需要的路由
    const routes = filterRouters(router.getRoutes())
    return generateRoutes(routes)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  :deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
```

## tagsView

### 原理及方案分析

1. tags：**位于 `appmain` 之上的标签**

> 在 `view` 之上渲染这个 `tag` 

2. view：**用来渲染组件的位置**

在渲染的基础上增加：

1. 动画
2. 缓存

但是 [官网处理动画](https://next.router.vuejs.org/zh/guide/advanced/transitions.html#%E5%9F%BA%E4%BA%8E%E8%B7%AF%E7%94%B1%E7%9A%84%E5%8A%A8%E6%80%81%E8%BF%87%E6%B8%A1) 

**实现方案：**

1. 创建 `tagsView` 组件：用来处理 `tags` 的展示
2. 处理基于路由的动态过渡，在 `AppMain` 中进行：用于处理 `view` 的部分

**实现步骤**

1. 监听路由变化，组成用于渲染 `tags` 的数据源
2. 创建 `tags` 组件，根据数据源渲染 `tag`，渲染出来的 `tags` 需要同时具备
   1. 国际化 `title`
   2. 路由跳转
3. 处理鼠标右键效果，根据右键处理对应数据源
4. 处理基于路由的动态过渡

### 创建 tags 数据源

`tags` 的数据源分为两部分：

1. 保存数据：`appmain` 组件中进行
2. 展示数据：`tags` 组件中进行

`tags` 的数据 => 保存到 `vuex` 中。

1. 在 `constant` 中新建常量

   ```js
    // tags标签
    export const TAGS_VIEW = 'tagsView'
   ```

2. 在 `store/app` 中创建 `tagsViewList`

   ```js
   import { LANG, TAGS_VIEW } from '@/constant'
   import { getItem, setItem } from '@/utils/storage'
   export default {
     namespaced: true,
     state: () => ({
       ...
       tagsViewList: getItem(TAGS_VIEW) || []
     }),
     mutations: {
       ...
        /**
         * 添加 tags
        * @param {*} state
        * @param {Object} tag 需要添加的tag标签对象
        */
        addTagsViewList (state, tag) {
            // 查找是否已经存在相同 tag
            const isFind = state.tagsViewList.find(item => {
                return item.path === tag.path
            })
            // 处理重复
            if (!isFind) {
                // 如果不存在 push
                state.tagsViewList.push(tag)
                setItem(TAGS_VIEW, state.tagsViewList)
            }
        },
     },
     actions: {}
   }
   
   ```

3. 在 `appmain` 中监听路由的变化

```js
import { generateTitle } from '@/utils/i18n'
import { isTags } from '@/utils/tags'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

/**
 * 生成 title
 */
const getTitle = route => {
  let title = ''

  if (!route.meta) {
    // 如果没有meta.title 把路径最后一部分当作title
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

/**
 * 监听路由变化
 */
const route = useRoute()
const store = useStore()
watch(route, (to, from) => {
  // 不是所有路由都需要保存
  if (!isTags(to.path)) return
  const { fullPath, meta, name, params, path, query } = to
  store.commit('app/addTagsViewList', { fullPath, meta, name, params, path, query, title: getTitle(to) })
}, {
  immediate: true
})
```

4. 创建 `utils/tags`
```js
// 创建白名单 不希望被保存
const whiteList = ['/login', '/404', '401']
/**
 * 是否需要被缓存
 * @param {*} path 路径
 * @returns
 */
export const isTags = (path) => {
  // 如果在白名单中 不需要保存
  return !whiteList.includes(path)
}

```

### 生成 tagsView

依赖数据渲染 `tags`

1. 创建 `store/app` 中 `tagsViewList` 的快捷访问
```js
  /**
   * tags标签数组
   * @param {*} state
   * @returns
   */
  tagsViewList: state => state.app.tagsViewList
```

2. 创建 `components/tagsview`

- 注：`element-icons` 当前版本需要单独导入

```vue
<template>
  <div class="tags-view-container">
      <el-scrollbar class="tags-view-wrapper">
        <router-link
            v-for="(tag,index) in $store.getters.tagsViewList"
            :key="tag.fullPath"
            class="tags-view-item"
            :class="isActive(tag) ? 'active': ''"
            :to="{path:tag.fullPath}"
            :style="{
            backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
            borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
            }"
            @contextmenu.prevent="openMenu($event,index)"
        >
        {{tag.title}}
        <!-- @click.prevent函数会阻止触发dom的原始事件，而去执行特定的事件 -->
        <el-icon class="el-icon-close" v-show="!isActive(tag)" @click.prevent.stop="onCloseClick(index)"><Close /></el-icon>
        </router-link>
      </el-scrollbar>
      <context-menu v-show="visible" :style="menuStyle" :index="selectIndex" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

/**
* 是否被选中
*/
const isActive = tag => {
    return tag.path === route.path
}

/**
* 关闭 tag 的点击事件
*/
const onCloseClick = index => {}
</script>

<style lang="scss" scoped>
.tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        &:first-of-type {
        margin-left: 15px;
        }
        &:last-of-type {
        margin-right: 15px;
        }
        &.active {
        color: #fff;
        &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 4px;
        }
        }
        // close 按钮
        .el-icon-close {
        width: 16px;
        height: 16px;
        line-height: 10px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
            transform: scale(0.6);
            display: inline-block;
            vertical-align: -3px;
        }
        &:hover {
            background-color: #b4bccc;
            color: #fff;
        }
        }
    
    }
}
</style>
```

   
3. 在 `layout/index` 中导入

```html
<div class="fixed-header">
    <!-- 顶部的 navbar -->
    <navbar />
    <!-- tags -->
    <tags-view></tags-view>
</div>
```
```js
import TagsView from '@/components/TagsView'
```

tagsView 国际化处理

`tagsView` 的国际化处理可以理解为修改现有 `tags` 的 `title`。

步骤：

1. 监听到语言变化
2. 国际化对应的 `title` 即可

根据方案，可生成如下代码：

1. 在 `store/app` 中，创建修改 `ttile` 的 `mutations`

```js
    /**
     * 为指定的 tag 修改 title
     * @param {*} state
     * @param {*} index => 需要替换的 tag 下标
     * @param {*} tag => 新 tag 名
     */
    changeTagsView (state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
```

2. 在 `appmain` 中监听语言变化

```js
import { generateTitle, watchSwitchLang } from '@/utils/i18n'
/**
 * 监听语言变化
 */
watchSwitchLang(() => {
  /**
     * 更改 tags 语言
     */
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
})
```

### contextMenu 展示处理

> [contextMenu](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event) 为 鼠标右键事件

[contextMenu](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event) 事件的处理分为两部分：

1. `contextMenu` 的展示

- 创建 `components/TagsView/ContextMenu` 组件，作为右键展示部分

```vue
<template>
    <ul class="context-menu-container">
    <li @click="onRefreshClick">
        {{ $t('msg.tagsView.refresh') }}
    </li>
    <li @click="onCloseRightClick">
        {{ $t('msg.tagsView.closeRight') }}
    </li>
    <li @click="onCloseOtherClick">
        {{ $t('msg.tagsView.closeOther') }}
    </li>
    </ul>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
    index: {
    type: Number,
    required: true
    }
})

const onRefreshClick = () => {}

const onCloseRightClick = () => {}

const onCloseOtherClick = () => {}
</script>

<style lang="scss" scoped>
.context-menu-container {
    position: fixed;
    background: #fff;
    z-index: 3000;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
        background: #eee;
    }
    }
}
</style>

```

- 在 `tagsview ` 中控制 `contextMenu` 的展示
```vue
<template>
    <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
        <router-link
        ...
        @contextmenu.prevent="openMenu($event, index)"
        >
        ...
    </el-scrollbar>
    <context-menu
        v-show="visible"
        :style="menuStyle"
        :index="selectIndex"
    ></context-menu>
    </div>
</template>
```
```js
/**
 * 鼠标右键点击事件
 */
const visible = ref(false)
const menuStyle = ref({
  left: 0,
  top: 0
})
// 被点击的tag 的 index
const selectIndex = ref(0)
// 展示 menu
const openMenu = (e, index) => {
  // 鼠标点击时相对于屏幕的 x y 坐标
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}
```
2. 右键项对应逻辑处理

 `contextMenu` 的事件一共分为三个：

1. 刷新
2. 关闭右侧
3. 关闭所有

1. 刷新事件

```js
const router = useRouter()
/**
 * 刷新页面事件
 */
const onRefreshClick = () => {
  // 刷新
  router.go(0)
}
```

2. 在 `store/app` 中，创建删除 `tags` 的 `mutations`，该 `mutations` 需要同时具备以下三个能力：
   1. 删除 “右侧”
   2. 删除 “其他”
   3. 删除 “当前”

```js
/**
 * 为指定的 tag 修改 title
 * @param {*} state
 * @param {*} index => 需要替换的 tag 下标
 * @param {*} tag => 新 tag 名
 */
changeTagsView (state, { index, tag }) {
state.tagsViewList[index] = tag
setItem(TAGS_VIEW, state.tagsViewList)
},

/**
 * 删除 tag
 * @param {type: 'other'||'right'||'index', index: index} payload
 */
removeTagsView (state, payload) {
if (payload.type === 'index') {
    // 删除当前
    state.tagsViewList.splice(payload.index, 1)
    return
} else if (payload.type === 'other') {
    // 删除其他
    // 删除右侧
    state.tagsViewList.splice(
    payload.index + 1,
    state.tagsViewList.length - payload.index + 1
    )
    // 删除左侧
    state.tagsViewList.splice(0, payload.index)
} else if (payload.type === 'right') {
    // 删除右侧
    state.tagsViewList.splice(
    payload.index + 1,
    state.tagsViewList.length - payload.index + 1
    )
}
setItem(TAGS_VIEW, state.tagsViewList)
}
```

4. 关闭右侧事件

   ```js
   const store = useStore()
   const onCloseRightClick = () => {
     store.commit('app/removeTagsView', {
       type: 'right',
       index: props.index
     })
   }
   ```

5. 关闭其他

   ```js
   const onCloseOtherClick = () => {
     store.commit('app/removeTagsView', {
       type: 'other',
       index: props.index
     })
   }
   ```

6. 关闭当前（`tagsview`）

   ```js
   /**
    * 关闭 tag 的点击事件
    */
   const store = useStore()
   const onCloseClick = index => {
     store.commit('app/removeTagsView', {
       type: 'index',
       index: index
     })
   }
   ```

### 处理 contextMenu 的关闭行为

```js
/**
 * 当 visible 改变时监听点击事件
 */
watch(visible, val => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

/**
 * 关闭菜单事件
 */
const closeMenu = () => {
  visible.value = false
}
```

### 处理基于路由的动态过渡

[处理基于路由的动态过渡](https://next.router.vuejs.org/zh/guide/advanced/transitions.html#%E5%9F%BA%E4%BA%8E%E8%B7%AF%E7%94%B1%E7%9A%84%E5%8A%A8%E6%80%81%E8%BF%87%E6%B8%A1)  官方已经给出了示例代码，结合 `router-view` 和 `transition` 我们可以非常方便的实现这个功能

1. 在 `appmain` 中处理对应代码逻辑

   ```vue
   <template>
     <div class="app-main">
       <router-view v-slot="{ Component, route }">
         <transition name="fade-transform" mode="out-in">
           <keep-alive>
             <component :is="Component" :key="route.path" />
           </keep-alive>
         </transition>
       </router-view>
     </div>
   </template>
   ```

2. 增加了 `tags` 之后，`app-main` 的位置需要进行以下处理

   ```vue
   <style lang="scss" scoped>
   .app-main {
     min-height: calc(100vh - 50px - 43px);
     ...
     padding: 104px 20px 20px 20px;
     ...
   }
   </style>
   ```

3. 在 `styles/transition` 中增加动画渲染

   ```scss
   /* fade-transform */
   .fade-transform-leave-active,
   .fade-transform-enter-active {
     transition: all 0.5s;
   }
   
   .fade-transform-enter-from {
     opacity: 0;
     transform: translateX(-30px);
   }
   
   .fade-transform-leave-to {
     opacity: 0;
     transform: translateX(30px);
   }
   ```

 
## guide 引导页

### 原理及方案分析

通常情况下引导页是通过 **聚焦** 的方式，高亮一块视图，然后通过文字解释的形式来告知用户该功能的作用。

所以说对于引导页而言，它的实现其实就是：**页面样式** 的实现。

需求：

1. 高亮某一块指定的样式
2. 在高亮的样式处通过文本展示内容
3. 用户可以进行下一次高亮或者关闭事件


**方案：**

> 这里使用 [driver.js](https://kamranahmed.info/driver.js/) 进行引导页处理。

实现方案如下：

1. 创建 `Guide` 组件：用于处理 `icon` 展示
2. 初始化 [driver.js](https://kamranahmed.info/driver.js/) 
3. 指定 [driver.js](https://kamranahmed.info/driver.js/) 的 `steps` 

### 生成 Guide

1.  创建`components/Guide`

   ```vue
   <template>
     <div>
       <el-tooltip :content="$t('msg.navBar.guide')">
         <svg-icon icon="guide" />
       </el-tooltip>
     </div>
   </template>
   
   <script setup></script>
   
   <style scoped></style>
   
   ```

2. 在 `navbar` 中导入该组件

   ```vue
   <guide class="right-menu-item hover-effect" />
   
   import Guide from '@/components/Guide'
   ```

### Guide 业务逻辑处理

1. 导入 [driver.js](https://kamranahmed.info/driver.js/) 

   ```
   npm i driver.js@0.9.8
   ```

2. 在 `guide.vue` 中初始化 `driiver`

```js
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
// 导入 driver
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

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
```

3. 创建 **步骤** `steps.js`
```js
/**
 * 引导页步骤
 * @param {*} i18n 国际化
 */
// 此处不要导入 @/i18n 使用 i18n.global ，因为我们在 router 中 layout 不是按需加载，所以会在 Guide 会在 I18n 初始化完成之前被直接调用。导致 i18n 为 undefined
// 本项目改为按需加载
const steps = i18n => {
  return [
    {
      element: '#guide-start',
      popover: {
        title: i18n.t('msg.guide.guideTitle'),
        description: i18n.t('msg.guide.guideDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: i18n.t('msg.guide.hamburgerTitle'),
        description: i18n.t('msg.guide.hamburgerDesc')
      }
    },
    {
      element: '#guide-breadcrumb',
      popover: {
        title: i18n.t('msg.guide.breadcrumbTitle'),
        description: i18n.t('msg.guide.breadcrumbDesc')
      }
    },
    {
      element: '#guide-search',
      popover: {
        title: i18n.t('msg.guide.searchTitle'),
        description: i18n.t('msg.guide.searchDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-full',
      popover: {
        title: i18n.t('msg.guide.fullTitle'),
        description: i18n.t('msg.guide.fullDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-theme',
      popover: {
        title: i18n.t('msg.guide.themeTitle'),
        description: i18n.t('msg.guide.themeDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-lang',
      popover: {
        title: i18n.t('msg.guide.langTitle'),
        description: i18n.t('msg.guide.langDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-tags',
      popover: {
        title: i18n.t('msg.guide.tagTitle'),
        description: i18n.t('msg.guide.tagDesc')
      }
    },
    {
      element: '#guide-sidebar',
      popover: {
        title: i18n.t('msg.guide.sidebarTitle'),
        description: i18n.t('msg.guide.sidebarDesc'),
        position: 'right-center'
      }
    }
  ]
}
export default steps
```

4. 在 `guide` 中导入“步骤”
```vue
<template>
    ...
     <svg-icon icon="guide" @click="onClick" />
    ...
</template>

<script setup>
...
import steps from './steps'
...
const onClick = () => {
    driver.defineSteps(steps(i18n))
    driver.start()
}
</script>

<style scoped></style>

```

5. 为 **引导高亮区域增加 ID**

- 注意：添加到外容器上

- 在 `components/guide/index` 中增加

```html
    <div @click="onClick" id="guide-start">
        ...
```

- 在 `components/hamburger/index` 增加

```html
  <div id="guide-hamburger" class="hamburger-container" @click="toggleClick">
      ...
```

- 在 `src/layout/components/Navbar.vue` 增加

```html
    <!-- 面包屑导航 -->
    <breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
```

- 在 `components/headerSearch/index` 增加

```html
  <div id="guide-search" class="header-search" :class="{show:isShow}">
      ...
```

- 在 `components/screenfull/index` 增加

```html
  <div id="guide-full" @click="onToggle">
      ...
```

- 在 `components/themePicker/index` 增加

```html
  <el-dropdown
   id="guide-theme"
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
   >
   ...
```

- 在 `components/langSelect/index` 增加

```html
  <el-dropdown
   id="guide-lang"
   class="international"
    trigger="click"
     @command="handleSetLanguage"
   >
   ...
```

- 在 `layout/index` 增加

```html
    <sidebar id="guide-sidebar" class="sidebar-container" :style="{ backgroundColor: $store.getters.cssVar.menuBg }"/>
```

- 在 `layout/index` 增加

```html
        <tags-view id="guide-tags" />
```