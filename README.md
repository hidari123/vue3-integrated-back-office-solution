<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [后台前端综合解决方案](#%E5%90%8E%E5%8F%B0%E5%89%8D%E7%AB%AF%E7%BB%BC%E5%90%88%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
  - [具体业务模型有](#%E5%85%B7%E4%BD%93%E4%B8%9A%E5%8A%A1%E6%A8%A1%E5%9E%8B%E6%9C%89)
  - [规范解决方案](#%E8%A7%84%E8%8C%83%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
    - [ESLint](#eslint)
    - [Prettier](#prettier)
    - [Commitizen约定式提交规范](#commitizen%E7%BA%A6%E5%AE%9A%E5%BC%8F%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83)
    - [使用 husky + commitlint 检查提交描述是否符合规范要求](#%E4%BD%BF%E7%94%A8-husky--commitlint-%E6%A3%80%E6%9F%A5%E6%8F%90%E4%BA%A4%E6%8F%8F%E8%BF%B0%E6%98%AF%E5%90%A6%E7%AC%A6%E5%90%88%E8%A7%84%E8%8C%83%E8%A6%81%E6%B1%82)
      - [commitlint](#commitlint)
      - [husky](#husky)
      - [通过 pre-commit 检测提交时代码规范](#%E9%80%9A%E8%BF%87-pre-commit-%E6%A3%80%E6%B5%8B%E6%8F%90%E4%BA%A4%E6%97%B6%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83)
      - [lint-staged 自动修复格式错误](#lint-staged-%E8%87%AA%E5%8A%A8%E4%BF%AE%E5%A4%8D%E6%A0%BC%E5%BC%8F%E9%94%99%E8%AF%AF)
    - [关于 `vetur` 检测 `template` 的单一根元素的问题](#%E5%85%B3%E4%BA%8E-vetur-%E6%A3%80%E6%B5%8B-template-%E7%9A%84%E5%8D%95%E4%B8%80%E6%A0%B9%E5%85%83%E7%B4%A0%E7%9A%84%E9%97%AE%E9%A2%98)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 后台前端综合解决方案

## 具体业务模型有

1. 基于最新 `vue` 标准的：
    1. script setup 语法标准
    2. 最新的响应式变更
    3. 组件状态驱动的动态 css
    4. 最新 `vue` 全家桶
2. 基于大厂编程规范的：
    1. eslint
    2. prettier
    3. Commitizen
    4. husky
    5. commitlint
    6. pre-commit
    7. lint-staged
3. 以及：
    1. Svg Sprite Icon
    2. 环境变量处理方案
    3. 接口模块封装方案
    4. 请求动作封装方案
    5. token 处理方案
    6. 登录鉴权方案
    7. 主动登出方案
    8. 被动登出方案
    9. 动态路由表处理方案
    10. 动态菜单项处理方案
    11. 动态面包屑处理方案
    12. 联动处理
    13. 动画处理
    14. 国际化处理方案
    15. 动态主题处理方案
    16. 全屏处理方案
    17. 页面检索处理方案
    18. TagsView 处理方案
    19. 功能引导处理方案
    20. 多组件
    21. 基于文件选择的 Excel 导入方案
    22. 基于文件拖拽的 Excel 导入方案
    23. Excel 数据导出方案
    24. RBAC 的权限分控体系
    25. 动态权限设定
    26. 页面权限处理方案
    27. 功能权限处理方案
    28. 动态表格处理方案
    29. 拖拽表格处理方案
    30. 辅助库选择标准
    31. markdown 编辑器处理
    32. 富文本编辑器处理
    33. 打包优化处理方案
    34. 服务器、域名购买与备案标准
    36. 前端项目部署方案

## 规范解决方案
### ESLint
`.eslintrc.js` 文件

```js
// ESLint 配置文件遵循 commonJS 的导出规则，所导出的对象就是 ESLint 的配置对象
// 文档：https://eslint.bootcss.com/docs/user-guide/configuring
module.exports = {
  // 表示当前目录即为根目录，ESLint 规则将被限制到该目录下
  root: true,
  // env 表示启用 ESLint 检测的环境
  env: {
    // 在 node 环境下启动 ESLint 检测
    node: true
  },
  // ESLint 中基础配置需要继承的配置
  extends: ["plugin:vue/vue3-essential", "@vue/standard"],
  // 解析器
  parserOptions: {
    parser: "babel-eslint"
  },
  // 需要修改的启用规则及其各自的错误级别
  /**
   * 错误级别分为三种：
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
```

### Prettier
**`prettier` 是什么？**
1. 一个代码格式化工具
2. 开箱即用
3. 可以直接集成到 `VSCode` 之中
4. 在保存时，让代码直接符合 `ESLint` 标准（需要通过一些简单配置）

**设置**
1. 在项目中新建 `.prettierrc` 文件，该文件为 `perttier` 默认配置文件

2. 在该文件中写入如下配置：

```json
{
 // 不尾随分号
 "semi": false,
 // 使用单引号
 "singleQuote": true,
 // 多行逗号分割的语法中，最后一行不加逗号
 "trailingComma": "none"
}
```
3. 打开 `VSCode` 《设置面板》
4. 在设置中，搜索 `save` ，勾选 `Format On Save`

> ESLint 和 prettier 之间的冲突问题

1. 打开 `.eslintrc.js` 配置文件

2. 在 `rules` 规则下，新增一条规则
```json
'space-before-function-paren': 'off'
```

3. 该规则表示关闭《方法名后增加空格》的规则

4. 重启项目

至此整个 `perttier` 和 `ESLint` 的配合使用就算是全部完成了。

在之后写代码的过程中，只需要保存代码，那么 `perttier` 就会帮助我们自动格式化代码，使其符合 `ESLint` 的校验规则。而无需手动进行更改了。


### Commitizen约定式提交规范
**`git` 提交规范**
目前使用较多的 [Angular团队规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) 延伸出的 [Conventional Commits specification（约定式提交）](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
约定式提交规范要求如下：
```js
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

--------  翻译 -------------
    
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]
```
其中 `<type>` 类型，必须是一个可选的值，比如：

1. 新功能：`feat`
2. 修复：`fix`
3. 文档变更：`docs`
4. ....

`commitizen` 仓库名为 [cz-cli](https://github.com/commitizen/cz-cli) ，它提供了一个 `git cz` 的指令用于代替 `git commit`，简单一句话介绍它：

> 当你使用 `commitizen` 进行代码提交（git commit）时，`commitizen` 会提交你在提交时填写所有必需的提交字段

1. 全局安装`Commitizen`

   ```js
   npm install -g commitizen@4.2.4
   ```

2. 安装并配置 `cz-customizable` 插件
    1. 使用 `npm` 下载 `cz-customizable`

       ```node
       npm i cz-customizable@6.3.0 --save-dev
       ```

    2. 添加以下配置到 `package.json ` 中

       ```json
       ...
         "config": {
           "commitizen": {
             "path": "node_modules/cz-customizable"
           }
         }
       ```

3. 项目根目录下创建 `.cz-config.js` 自定义提示文件

   ```js
   module.exports = {
     // 可选类型
     types: [
       { value: 'feat', name: 'feat:     新功能' },
       { value: 'fix', name: 'fix:      修复' },
       { value: 'docs', name: 'docs:     文档变更' },
       { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
       {
         value: 'refactor',
         name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
       },
       { value: 'perf', name: 'perf:     性能优化' },
       { value: 'test', name: 'test:     增加测试' },
       { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
       { value: 'revert', name: 'revert:   回退' },
       { value: 'build', name: 'build:    打包' }
     ],
     // 消息步骤
     messages: {
       type: '请选择提交类型:',
       customScope: '请输入修改范围(可选):',
       subject: '请简要描述提交(必填):',
       body: '请输入详细描述(可选):',
       footer: '请输入要关闭的issue(可选):',
       confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
     },
     // 跳过问题
     skipQuestions: ['body', 'footer'],
     // subject文字长度默认是72
     subjectLimit: 72
   }
   ```

4. 使用 `git cz` 代替 `git commit`
   使用 `git cz` 代替 `git commit`，即可看到提示内容

那么到这里我们就已经可以使用`git cz` 来代替了 `git commit` 实现了规范化的提交诉求了，但是当前依然存在着一个问题，那就是我们必须要通过 `git cz` 指令才可以完成规范化提交

### 使用 husky + commitlint 检查提交描述是否符合规范要求
> 我们希望：
>
> 当《提交描述信息》不符合 [约定式提交规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 的时候，阻止当前的提交，并抛出对应的错误提示

而要实现这个目的，我们就需要先来了解一个概念，叫做 `Git hooks（git 钩子 || git 回调方法）`

也就是：**`git` 在执行某个事件之前或之后进行一些其他额外的操作**

而我们所期望的 **阻止不合规的提交消息**，那么就需要使用到 `hooks` 的钩子函数。

下面是所有的 `hooks` ，，其中加粗的是常用到的 `hooks`：

| Git Hook      | 调用时机                                    | 说明                                               |
| :------------------------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| pre-applypatch           | `git am`执行前                                               |                                                              |
| applypatch-msg        | `git am`执行前                                               |                                                              |
| post-applypatch       | `git am`执行后                                               | 不影响`git am`的结果                                         |
| **pre-commit**        | `git commit`执行前                                           | 可以用`git commit --no-verify`绕过                           |
| **commit-msg**        | `git commit`执行前                                           | 可以用`git commit --no-verify`绕过                           |
| post-commit           | `git commit`执行后                                           | 不影响`git commit`的结果                                     |
| pre-merge-commit      | `git merge`执行前                                            | 可以用`git merge --no-verify`绕过。                          |
| prepare-commit-msg    | `git commit`执行后，编辑器打开之前                           |                                                              |
| pre-rebase            | `git rebase`执行前                                           ||
| post-checkout   | `git checkout`或`git switch`执行后                           | 如果不使用`--no-checkout`参数，则在`git clone`之后也会执行。 |
| post-merge            | `git commit`执行后                                           | 在执行`git pull`时也会被调用                                 |
| pre-push              | `git push`执行前                                             |                                                              |
| pre-receive           | `git-receive-pack`执行前                                     |                                                              |
| update                |                                                              |                                                              |
| post-receive          | `git-receive-pack`执行后                                     | 不影响`git-receive-pack`的结果                               |
| post-update           | 当 `git-receive-pack`对 `git push` 作出反应并更新仓库中的引用时 |                                                              |
| push-to-checkout      | 当``git-receive-pack`对`git push`做出反应并更新仓库中的引用时，以及当推送试图更新当前被签出的分支且`receive.denyCurrentBranch`配置被设置为`updateInstead`时 |                                                              |
| pre-auto-gc           | `git gc --auto`执行前                                        |                                                              |
| post-rewrite          | 执行`git commit --amend`或`git rebase`时                     |                                                              |
| sendemail-validate    | `git send-email`执行前                                       |                                                              |
| fsmonitor-watchman    | 配置`core.fsmonitor`被设置为`.git/hooks/fsmonitor-watchman`或`.git/hooks/fsmonitor-watchmanv2`时 |                                                              |
| p4-pre-submit         | `git-p4 submit`执行前                                        | 可以用`git-p4 submit --no-verify`绕过                        |
| p4-prepare-changelist | `git-p4 submit`执行后，编辑器启动前                          | 可以用`git-p4 submit --no-verify`绕过                        |
| p4-changelist         | `git-p4 submit`执行并编辑完`changelist message`后            | 可以用`git-p4 submit --no-verify`绕过                        |
| p4-post-changelist    | `git-p4 submit`执行后                                        |                                                              |
| post-index-change     | 索引被写入到`read-cache.c do_write_locked_index`后           |                                                              |

PS：详细的 `HOOKS介绍` 可点击[这里](https://git-scm.com/docs/githooks)查看

整体的 `hooks` 非常多，当时我们其中用的比较多的其实只有两个：

| Git Hook       | 调用时机                                                     | 说明                               |
| :------------- | ------------------------------------------------------------ | ---------------------------------- |
| **pre-commit** | `git commit`执行前<br />它不接受任何参数，并且在获取提交日志消息并进行提交之前被调用。脚本`git commit`以非零状态退出会导致命令在创建提交之前中止。 | 可以用`git commit --no-verify`绕过 |
| **commit-msg** | `git commit`执行前<br />可用于将消息规范化为某种项目标准格式。<br />还可用于在检查消息文件后拒绝提交。 | 可以用`git commit --no-verify`绕过 |

简单来说这两个钩子：

1. `commit-msg`：可以用来规范化标准格式，并且可以按需指定是否要拒绝本次提交
2. `pre-commit`：会在提交前被调用，并且可以按需指定是否要拒绝本次提交

而我们接下来要做的关键，就在这两个钩子上面。

要完成这么个目标，那么我们需要使用两个工具：

1. [commitlint](https://github.com/conventional-changelog/commitlint)：用于检查提交信息

2. [husky](https://github.com/typicode/husky)：是`git hooks`工具

注意：**`npm` 需要在 7.x 以上版本！！！！！**

那么下面我们分别来去安装一下这两个工具：

#### commitlint
1. 安装依赖：

   ```
   npm install --save-dev @commitlint/config-conventional@12.1.4 @commitlint/cli@12.1.4
   ```

2. 创建 `commitlint.config.js` 文件

   ```
   echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
   ```

3. 打开 `commitlint.config.js` ， 增加配置项（ [config-conventional 默认配置点击可查看](https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js) ）：

   ```js
   module.exports = {
     // 继承的规则
     extends: ['@commitlint/config-conventional'],
     // 定义规则类型
     rules: {
       // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
       'type-enum': [
         2,
         'always',
         [
           'feat', // 新功能 feature
           'fix', // 修复 bug
           'docs', // 文档注释
           'style', // 代码格式(不影响代码运行的变动)
           'refactor', // 重构(既不增加新功能，也不是修复bug)
           'perf', // 性能优化
           'test', // 增加测试
           'chore', // 构建过程或辅助工具的变动
           'revert', // 回退
           'build' // 打包
         ]
       ],
       // subject 大小写不做校验
       'subject-case': [0]
     }
   }
   
   ```

**注意：确保保存为 `UTF-8` 的编码格式**，否则可能会出现错误。

#### husky
1. 安装依赖：

   ```
   npm install husky@7.0.1 --save-dev
   ```

2. 启动 `hooks` ， 生成 `.husky` 文件夹

   ```
   npx husky install
   ```

   ![image-20210906202034156](第二章：标准化大厂编程规范解决方案之ESLint + Git Hooks .assets/image-20210906202034156.png)

3. 在 `package.json` 中生成 `prepare` 指令（ **需要 npm > 7.0 版本** ）

   ```
   npm set-script prepare "husky install"
   ```

   <img src="第二章：标准化大厂编程规范解决方案之ESLint + Git Hooks .assets/image-20210906202128323.png" alt="image-20210906202128323" style="zoom:50%;" />

4. 执行 `prepare` 指令

   ```
   npm run prepare
   ```

5. 执行成功，提示
   <img src=" 第二章：标准化大厂编程规范解决方案之ESLint + Git Hooks .assets/image-20210710120053221.png" alt="image-20210710120053221" style="zoom:80%;" />

6. 添加 `commitlint` 的 `hook` 到 `husky`中，并指令在 `commit-msg` 的 `hooks` 下执行 `npx --no-install commitlint --edit "$1"` 指令

   ```
   npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
   ```

至此， 不符合规范的 commit 将不再可提交。

```
PS F:\xxxxxxxxxxxxxxxxxxxxx\imooc-admin> git commit -m "测试"
⧗   input: 测试
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```

#### 通过 pre-commit 检测提交时代码规范
需要使用 `husky` 配合 `eslint` 才可以实现。

我们期望通过 **`husky` 监测 `pre-commit` 钩子，在该钩子下执行 `npx eslint --ext .js,.vue src`** 指令来去进行相关检测：

1. 执行 `npx husky add .husky/pre-commit "npx eslint --ext .js,.vue src"` 添加 `commit` 时的 `hook` （`npx eslint --ext .js,.vue src` 会在执行到该 hook 时运行）

2. 该操作会生成对应文件 `pre-commit`

3. 关闭 `VSCode` 的自动保存操作

4. 修改一处代码，使其不符合 `ESLint` 校验规则

5. 执行 **提交操作** 会发现，抛出一系列的错误，代码无法提交

   ```
   PS F:\xxxxxxxxxxxxxxxxxxx\imooc-admin> git commit -m 'test'
   
   F:\xxxxxxxxxxxxxxxx\imooc-admin\src\views\Home.vue
     13:9  error  Strings must use singlequote  quotes
   
   ✖ 1 problem (1 error, 0 warnings)
     1 error and 0 warnings potentially fixable with the `--fix` option.
   
   husky - pre-commit hook exited with code 1 (error)
   ```



6. 想要提交代码，必须处理完成所有的错误信息

那么到这里位置，我们已经通过 `pre-commit` 检测到了代码的提交规范问题。

#### lint-staged 自动修复格式错误
`pre-commit` 处理了 **检测代码的提交规范问题，当我们进行代码提交时，会检测所有的代码格式规范** 。

但是这样会存在两个问题：

1. 我们只修改了个别的文件，没有必要检测所有的文件代码格式
2. 它只能给我们提示出对应的错误，我们还需要手动的进行代码修改

那么想要处理这两个问题，就需要使用另外一个插件 [lint-staged](https://github.com/okonet/lint-staged) 


[lint-staged](https://github.com/okonet/lint-staged) 可以让你当前的代码检查 **只检查本次修改更新的代码，并在出现错误的时候，自动修复并且推送**

[lint-staged](https://github.com/okonet/lint-staged) 无需单独安装，我们生成项目时，`vue-cli` 已经帮助我们安装过了，所以我们直接使用就可以了

1. 修改 `package.json` 配置

   ```js
   "lint-staged": {
       "src/**/*.{js,vue}": [
         "eslint --fix",
         "git add"
       ]
     }
   ```

2. 如上配置，每次它只会在你本地 `commit` 之前，校验你提交的内容是否符合你本地配置的 `eslint`规则(这个见文档 [ESLint](https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/eslint.html) )，校验会出现两种结果：

    1. 如果符合规则：则会提交成功。
    2. 如果不符合规则：它会自动执行 `eslint --fix` 尝试帮你自动修复，如果修复成功则会帮你把修复好的代码提交，如果失败，则会提示你错误，让你修好这个错误之后才能允许你提交代码。

3. 修改 `.husky/pre-commit` 文件

   ```js
   #!/bin/sh
   . "$(dirname "$0")/_/husky.sh"
   
   npx lint-staged
   
   ```

4. 再次执行提交代码

5. 发现 **暂存区中** 不符合 `ESlint` 的内容，被自动修复

### 关于 `vetur` 检测 `template` 的单一根元素的问题

在 `vue2` 中，`template` 只允许存在一个根元素，但是这种情况在 `vue3` 里发生了一些变化。

在 `Vue3` 中开始支持 `template` 存在多个根元素了。但是因为 `VSCode` 中的一些插件没有及时更新，所以当你在 `template` 中写入多个根元素时，有可能会出现错误。

出现这个问题的原因主要是： `vetur` 这个 `vsCode` 插件依然按照 `vue2` 的单一根元素逻辑进行检测，所以会出现提示错误的问题。

但是大家要注意，虽然这样不太好看，但是 **该问题并不影响代码运行！**

如果你实在觉得这样太丑的话，那么可以通过以下方案来 **取消 `vetur` 对 `template` 的检测：**

1. 在 `VSCode`  的设置中，搜索 `vetur`，找到如下设置，取消勾选


2. 重启 `VSCode`

按以上两种方式执行之后，你的多根元素就不会出现不好看的错误了

