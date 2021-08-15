<!--
 * @Author: jhl
 * @Date: 2021-08-07 09:52:26
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-15 22:00:26
 * @Description:
-->
<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt="头像"
    />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登陆</div>
    <div class="wrapper__bottom">
      <div class="wrapper__bottom__login-link" @click="handleRegisterClick">
        立即注册
      </div>
      <span>|</span>
      <div class="wrapper__bottom__forget-link">忘记密码</div>
    </div>
    <Toast v-if="showToast" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast.vue";

// 处理登录
const useLoginEffect = changeToast => {
  const router = useRouter();
  const { username, password } = toRefs(
    reactive({
      username: "",
      password: ""
    })
  );

  const handleLogin = async () => {
    try {
      if (username.value.trim() === "" || password.value === "") {
        alert("请输入账号和密码");
        return;
      }
      const result = await post("/api/user/login", {
        username: username.value,
        password: password.value
      });
      if (result?.error === 0) {
        localStorage.isLogin = true;
        router.push({ name: "Home" });
      } else {
        changeToast("登录失败");
      }
    } catch (error) {
      console.log(error);
      changeToast("请求失败");
    }
  };

  return { username, password, handleLogin };
};

// 跳转注册
const useRegisterEffect = () => {
  const router = useRouter();
  const handleRegisterClick = () => {
    router.push({ name: "Register" });
  };
  return { handleRegisterClick };
};

export default {
  name: "Login",
  components: { Toast },
  // 职责就是告诉你，代码执行的一个流程
  setup() {
    // toRefs返回的是ObjectRefImpl对象，需要使用.value获取其值
    const { showToast, toastMessage, changeToast } = useToastEffect();
    const { username, password, handleLogin } = useLoginEffect(changeToast);
    const { handleRegisterClick } = useRegisterEffect();

    return {
      username,
      password,
      handleLogin,
      handleRegisterClick,
      showToast,
      toastMessage
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    /* 只有块级元素 + 宽度，才能使用margin左右auto */
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    /* box-sizing: border-box; */
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    &__content {
      width: 100%;
      margin-top: 0.12rem;
      line-height: 0.22rem;
      /* 去除input框的样式 */
      border: none;
      outline: none;
      background: none;
      color: $content-notice-font-color;
      &::placeholder {
        color: $content-notice-font-color;
      }
    }
  }
  &__login-button {
    background: $bg-blue-color;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    font-family: PingFangSC-Regular;
    font-size: 0.16rem;
    color: $font-white-color;
    letter-spacing: 0;
    text-align: center;
  }
  &__bottom {
    display: flex;
    justify-content: center;
    span {
      margin: 0 0.12rem;
    }
    &__login-link,
    &__forget-link {
      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
    }
  }
}
</style>
