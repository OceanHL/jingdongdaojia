<!--
 * @Author: jhl
 * @Date: 2021-08-06 16:14:51
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-15 21:59:30
 * @Description:
-->
<template>
  <div class="docker">
    <div
      v-for="item of dockerList"
      :class="{
        docker__item: true,
        'docker__item--active': item.id === activeId
      }"
      :key="item.id"
    >
      <router-link :to="item.to">
        <div :class="['iconfont', item.icon_class]"></div>
        <div class="docker__title">{{ item.text }}</div></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Docker",
  props: ["activeId"],
  setup() {
    const dockerList = [
      {
        id: 0,
        icon_class: "icon-home",
        text: "首页",
        to: { name: "Home" }
      },
      {
        id: 1,
        icon_class: "icon-cart",
        text: "购物车",
        to: { name: "CartList" }
      },
      {
        id: 2,
        icon_class: "icon-i-order",
        text: "订单",
        to: { name: "OrderConfirmation", params: { id: 0 } }
      },
      {
        id: 3,
        icon_class: "icon-my",
        text: "我的",
        to: { name: "Home" }
      }
    ];

    return { dockerList };
  }
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.docker {
  display: flex;
  box-sizing: border-box;
  padding: 0 0.18rem;
  position: absolute;
  bottom: 0;
  /* height: 0.49rem; */
  width: 100%;
  border-top: 0.01rem solid $bg-color;
  background: $font-white-color;
  box-shadow: 0 -0.01rem 0.01rem 0 $bg-color;
  color: $font-color;
  &__item {
    flex: 1;
    text-align: center;
    a {
      text-decoration: none;
      color: $font-color;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.2rem;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    /* 设置10px字体，利用scale */
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
