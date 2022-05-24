<!--
 * @Author: hidari
 * @Date: 2022-05-24 12:45:45
 * @LastEditors: hidari 
 * @LastEditTime: 2022-05-24 16:47:29
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
```vue
<template>
  <el-dropdown
   class="international"
    trigger="click"
     @command="handleSetLanguage"
   >
    <div>
        <el-tooltip content="国际化" :effect="effect">
            <svg-icon icon="language"></svg-icon>
        </el-tooltip>
    </div>
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