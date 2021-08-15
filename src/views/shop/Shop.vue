<!--
 * @Author: jhl
 * @Date: 2021-08-09 11:51:49
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-12 16:36:05
 * @Description:
-->
<template>
  <div class="wrapper">
    <div class="search">
      <div
        class="search__back iconfont icon-back"
        @click="handleBackClick"
      ></div>
      <div class="search__content">
        <div class="search__content__icon iconfont icon-search"></div>
        <input
          class="search__content__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-if="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo.vue";
import Content from "./Content.vue";
import Cart from "./Cart.vue";

// 获取shopInfo信息
const useShopInfoEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} });
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result.error === 0 && result?.data) {
      data.item = result?.data;
    }
  };
  getItemData();
  return { ...toRefs(data) };
};

// 点击返回操作
const useBackClickEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return handleBackClick;
};

export default {
  name: "Shop",
  components: { ShopInfo, Content, Cart },
  setup() {
    const { item } = useShopInfoEffect();
    const handleBackClick = useBackClickEffect();
    return { item, handleBackClick };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  padding: 0 0.18rem;
  .search {
    display: flex;
    margin: 0.14rem 0 0.04rem 0;
    &__back {
      width: 0.3rem;
      line-height: 0.32rem;
      margin-right: 0.05rem;
      color: $search-font-color;
      text-align: center;
    }
    &__content {
      display: flex;
      flex: 1;
      background: $search-bg-color;
      border-radius: 0.16rem;
      &__icon {
        width: 0.44rem;
        line-height: 0.32rem;
        text-align: center;
        color: $search-font-color;
      }
      &__input {
        flex: 1;
        height: 0.32rem;
        font-size: 0.14rem;
        color: $font-color;
        padding-right: 0.2rem;
        border: none;
        outline: none;
        /* 必须使用background，使用background-color会抵消父元素设置的背景颜色 */
        background: none;
        &::placeholder {
          color: $font-color;
        }
      }
    }
  }
}
</style>
