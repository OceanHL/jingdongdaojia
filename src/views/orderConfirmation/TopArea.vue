<!--
 * @Author: jhl
 * @Date: 2021-08-14 21:40:50
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-15 19:51:11
 * @Description:
-->
<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">
        &#xe681;
      </div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">
        北京理工大学国防科技园2号楼10层
      </div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">瑶妹（先生）</span>
        <span class="top__receiver__info__phone">18911024266</span>
      </div>
      <div class="iconfont top__receiver__enter">&#xe681;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "TopArea",
  setup() {
    const router = useRouter();

    const handleBackClick = () => {
      router.back();
    };
    return { handleBackClick };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.top {
  position: relative;
  height: 1.96rem; // 高度比背景颜色高.37rem，背景颜色会重叠
  background-size: 100% 1.59rem;
  /* 渐变 */
  background-image: linear-gradient(
    0deg,
    rgba(0, 145, 255, 0) 4%,
    $bg-blue-color 50%
  );
  /* 防止重叠 */
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding-top: 0.2rem;
    line-height: 0.24rem;
    color: $font-white-color;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      left: 0.18rem;
    }
  }
  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background-color: $font-white-color;
    border-radius: 0.04rem;
    &__title {
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
      color: $font-color;
      line-height: 0.22rem;
    }
    &__address {
      padding: 0 0.4rem 0 0.16rem;
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: $font-color;
    }
    &__info {
      padding: 0.06rem 0 0 0.16rem;
      color: $font-light-color;
      opacity: 0.8;
      line-height: 0.18rem;
      font-size: 0.12rem;
      &__name {
        margin-right: 0.16rem;
      }
    }

    &__enter {
      transform: rotate(180deg);
      position: absolute;
      right: 0.16rem;
      top: 0.5rem;
      color: $font-light-color;
      font-size: 0.16rem;
    }
  }
}
</style>
