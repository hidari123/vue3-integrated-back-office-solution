<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <LangSelect class="lang-select" effect="light" />
      </div>
<!--      username-->
      <el-form-item prop="username">
        <span class="svg-container">
            <svg-icon icon="user" />
        </span>
        <el-input placeholder="username" name="username" type="text" v-model="loginForm.username"></el-input>
      </el-form-item>
<!--      password-->
      <el-form-item prop="password">
        <span class="svg-container">
            <svg-icon icon="password" />
        </span>
        <el-input placeholder="password" name="password" :type="passwordType" v-model="loginForm.password"></el-input>
        <span class="show-pwd" @click="onChangePwdType">
        <span class="svg-container">
            <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
        </span>
      </el-form-item>
        <!--      登录按钮-->
      <el-button type="primary" style="width: 100%; margin-bottom: 30px;"
                 :loading="loading"
                 @click="handlerLogin">{{ $t('msg.login.loginBtn') }}</el-button>
        <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
// 导入的组件可以直接使用
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { validatePassword } from '@/views/login/rules'
import LangSelect from '@/components/langSelect/index.vue'
import { useI18n } from 'vue-i18n'
// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 验证规则
const i18n = useI18n()
// setup 只在生成页面时执行一次 写到 computed 中可以动态改变
const usernameRule = computed(() => {
  return i18n.t('msg.login.usernameRule')
})
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: usernameRule
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

// 处理密码框文本显示
const passwordType = ref('password')
// template 中绑定的方法 => 直接声明即可
const onChangePwdType = () => {
  // 当 passwordType === password => text
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 处理登录
const loading = ref(false)
const store = useStore()
const router = useRouter()
const loginFormRef = ref(null)
const handlerLogin = () => {
  // 进行表单校验
  loginFormRef.value.validate(valid => {
    if (!valid) return false
    // 触发登录动作
    loading.value = true
    store.dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        // 进行登录后处理
        router.push('/')
      })
      .catch(err => {
        console.log(err)
        loading.value = true
      })
  })
}
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

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
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

    :deep(.el-input__wrapper) {
        padding: 0;
        /**我们想给一个类加上背景颜色为“none”时,会发现并没有这个属性,这时我们就该用到:background-color: transparent; */
        background-color:transparent;
        border: none;
        display:flex;
        box-shadow: none;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
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

    :deep(.lang-select) {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
