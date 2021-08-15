<!--
 * @Author: jhl
 * @Date: 2021-08-12 17:46:32
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-15 16:07:00
 * @Description:
-->
<template>
  <div class="cart">
    <div class="cart__header">
      <span>我的全部购物车</span>
      <span>(2)</span>
    </div>
    <div class="cart__list">我是列表</div>
    <Docker :active-id="1" />
  </div>
</template>

<script>
import Docker from "../../components/Docker.vue";
export default {
  name: "CartList",
  components: {
    Docker
  },
  setup() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.cart {
  &__header {
    line-height: 0.25rem;
    font-size: 0.16rem;
    text-align: center;
    margin-top: 0.28rem;
  }
  &__list {
    background-color: $bg-color;
    position: absolute;
    top: 0.53rem;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
