<!--
 * @Author: jhl
 * @Date: 2021-08-09 17:16:05
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-15 22:01:31
 * @Description:
-->
<template>
  <div class="content">
    <div class="category">
      <div
        class="category__item"
        v-for="item of categries"
        :key="item.tab"
        :class="{ 'category__item--active': currentTab === item.tab }"
        @click="handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <template v-for="item of list" :key="item.__id">
        <div class="product__item">
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <div class="product__item__detail__title">
              {{ item.name }}
            </div>
            <div class="product__item__detail__sales">
              月售{{ item.sales }}件
            </div>
            <div class="product__item__detail__price">
              <span class="product__item__detail__price__left"
                >&yen;{{ item.price }}</span
              >
              <span class="product__item__detail__price__right"
                >&yen;{{ item.oldPrice }}</span
              >
            </div>
          </div>
          <div class="product__item__number">
            <span
              class="product__item__number__minus"
              @click="changeCartItem(shopId, item.__id, item, -1, shopName)"
              >-</span
            >
            <span class="product__item__number__part">{{
              getProductCartCount(shopId, item.__id)
            }}</span>
            <span
              class="product__item__number__plus"
              @click="changeCartItem(shopId, item.__id, item, 1, shopName)"
              >+</span
            >
          </div>
        </div>
        <div class="product__gap"></div>
      </template>
    </div>
    <Toast v-if="showToast" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { get } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast.vue";
import { useCommonCartEffect } from "../../effects/cartEffects";

const categries = [
  { name: "全部商品", tab: "all" },
  { name: "秒杀", tab: "seckill" },
  { name: "新鲜水果", tab: "fruit" }
];

// 和 Tab 切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categries[0].tab);
  const handleTabClick = tab => {
    currentTab.value = tab;
  };
  return { currentTab, handleTabClick };
};

// 列表内容相关的逻辑
const useCurrentListEffect = (
  shopId,
  currentTab,
  changeToast,
  handleTabClick
) => {
  const content = reactive({ list: [] });
  handleTabClick(currentTab.value);
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    });
    if (result.error !== 0) return changeToast("请求失败");
    const list = result.data;
    content.list = list ?? [];
  };
  watchEffect(() => {
    getContentData();
  });
  const { list } = toRefs(content);
  return { list };
};

const useCartEffect = () => {
  const store = useStore();

  const { changeCartItemInfo, cartList } = useCommonCartEffect();
  const changeShopName = (shopId, shopName) => {
    cartList[shopId].shopName = shopName;
    store.commit("changeShopName", {
      shopId,
      shopName
    });
  };

  const changeCartItem = (shopId, productId, productInfo, num, shopName) => {
    changeCartItemInfo(shopId, productId, productInfo, num);
    changeShopName(shopId, shopName);
  };

  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count ?? 0;
  };
  return { changeCartItem, changeCartItemInfo, cartList, getProductCartCount };
};

export default {
  name: "Content",
  props: ["shopName"],
  components: { Toast },
  setup() {
    const {
      params: { id: shopId }
    } = useRoute();
    const { showToast, toastMessage, changeToast } = useToastEffect();
    const { currentTab, handleTabClick } = useTabEffect();
    const { list } = useCurrentListEffect(
      shopId,
      currentTab,
      changeToast,
      handleTabClick
    );

    const {
      changeCartItem,
      changeCartItemInfo,
      getProductCartCount
    } = useCartEffect();

    return {
      list,
      toastMessage,
      showToast,
      categries,
      currentTab,
      handleTabClick,
      shopId,
      changeCartItemInfo,
      changeCartItem,
      getProductCartCount
    };
  }
};
</script>

<style lang="scss">
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
  .category {
    overflow-y: scroll;
    height: 100%;
    width: 0.76rem;
    background-color: $search-bg-color;
    &__item {
      font-size: 0.14rem;
      color: $font-color;
      line-height: 0.4rem;
      text-align: center;
      &--active {
        background-color: $font-white-color;
      }
    }
  }
  .product {
    overflow-y: scroll;
    flex: 1;
    &__item {
      box-sizing: border-box;
      display: flex;
      position: relative;
      padding: 0.12rem 0.16rem;
      &__img {
        width: 0.68rem;
        height: 0.68rem;
      }
      &__detail {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 0.16rem;
        overflow: hidden;
        &__title {
          width: 100%;
          font-size: 0.14rem;
          color: $font-color;
          @include ellipsis;
        }
        &__sales {
          font-size: 0.12rem;
          color: $font-color;
          line-height: 0.16rem;
        }
        &__price {
          font-size: 0.14rem;
          color: #000000;
          line-height: 0.14rem;
          &__left {
            color: $font-red-color;
            font-size: 0.14rem;
            margin-right: 0.06rem;
          }
          &__right {
            color: $font-medium-color;
            font-size: 0.12rem;
            text-decoration-line: line-through;
            transform: scale(0.83);
          }
        }
      }
      &__number {
        display: flex;
        position: absolute;
        right: 0.18rem;
        bottom: 0.12rem;
        &__part {
          line-height: 0.22rem;
          padding: 0 0.05rem;
        }
        &__minus,
        &__plus {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          line-height: 0.18rem;
          border-radius: 50%;
          text-align: center;
          font-size: 0.2rem;
          border: 0.01rem solid $font-light-color;
        }
        &__minus {
          color: $font-light-color;
        }
        &__plus {
          background: $bg-blue-color;
          color: $font-white-color;
        }
      }
    }
    &__gap {
      width: 2.65rem;
      margin: 0 auto;
      border-bottom: 0.01rem solid $bg-color;
    }
  }
}
</style>
