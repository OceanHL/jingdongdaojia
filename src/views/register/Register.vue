<!--
 * @Author: jhl
 * @Date: 2021-08-07 11:35:06
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-15 22:01:02
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
        placeholder="请输入手机号"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        autocomplete="new-password"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请确认密码"
        autocomplete="new-password"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__bottom">
      <div class="wrapper__bottom__register-link" @click="handleLoginClick">
        已有账号去登陆
      </div>
    </div>
    <Toast v-if="showToast" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast.vue";

// 注册相关逻辑
const useRegisterEffect = changeToast => {
  const router = useRouter();

  const { username, password, ensurement } = toRefs(
    reactive({
      username: "",
      password: "",
      ensurement: "" // 确认密码
    })
  );

  const handleRegister = async () => {
    try {
      const result = await post("/api/user/register", {
        username: username.value,
        password: password.value
      });
      if (result?.error === 0) {
        router.push({ name: "Login" });
      } else {
        changeToast("注册失败");
      }
    } catch (error) {
      changeToast("请求失败");
    }
  };

  return { username, password, handleRegister, ensurement };
};

// 跳转注册
const useLoginEffect = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push({ name: "Login" });
  };
  return { handleLoginClick };
};

export default {
  name: "Register",
  components: { Toast },
  setup() {
    const { showToast, toastMessage, changeToast } = useToastEffect();
    const {
      username,
      password,
      handleRegister,
      ensurement
    } = useRegisterEffect(changeToast);

    const { handleLoginClick } = useLoginEffect();

    return {
      handleLoginClick,
      username,
      password,
      handleRegister,
      ensurement,
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
  &__register-button {
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    font-family: PingFangSC-Regular;
    font-size: 0.16rem;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
  }
  &__bottom {
    display: flex;
    justify-content: center;
    span {
      margin: 0 0.12rem;
    }
    &__register-link {
      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
    }
  }
}
</style>
