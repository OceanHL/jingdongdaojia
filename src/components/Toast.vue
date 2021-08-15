<!--
 * @Author: jhl
 * @Date: 2021-08-07 16:35:28
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-07 17:48:57
 * @Description:
-->
<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from "vue";
export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false, // 控制 Toast组件 是否显示
    toastMessage: ""
  });

  const changeToast = message => {
    toastData.toastMessage = message;
    toastData.showToast = true;
    setTimeout(() => {
      toastData.toastMessage = "";
      toastData.showToast = false;
    }, 2000);
  };

  const { showToast, toastMessage } = toRefs(toastData);

  return { showToast, toastMessage, changeToast };
};

export default {
  name: "Toast",
  props: ["message"]
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background-color: rgba($color: #000, $alpha: 0.35);
  border-radius: 0.05rem;
  color: #fff;
}
</style>
