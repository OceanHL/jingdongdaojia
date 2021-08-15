<!--
 * @Author: jhl
 * @Date: 2021-08-11 10:39:14
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-15 22:01:16
 * @Description:
-->
<template>
  <div
    class="mask"
    v-if="showCart && calculations.total > 0"
    @click="handleCartShowChange"
  ></div>
  <div class="cart">
    <div class="product" v-show="showCart && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all" @click="setCartItemsChecked(shopId)">
          <span
            class="product__header__all__icon iconfont"
            v-html="calculations.allChecked ? '&#xe652;' : '&#xe667;'"
          ></span>
          <span>全选</span>
        </div>
        <div class="product__header__clear">
          <span
            class="product__header__clear__btn"
            @click="cleanCartProducts(shopId)"
            >清空购物车</span
          >
        </div>
      </div>
      <div class="product__item" v-for="item of productList" :key="item.__id">
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe652;' : '&#xe667;'"
          @click="changeCartItemChecked(shopId, item.__id)"
        ></div>
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <div class="product__item__detail__title">
            {{ item.name }}
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
            @click="changeCartItemInfo(shopId, item.__id, item, -1)"
            >-</span
          >
          <span class="product__item__number__part">{{
            getProductCartCount(shopId, item.__id)
          }}</span>
          <span
            class="product__item__number__plus"
            @click="changeCartItemInfo(shopId, item.__id, item, 1)"
            >+</span
          >
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon" @click="handleCartShowChange">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt="图片"
          class="check__icon__img"
        />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        总计:
        <span class="check__info__price">&yen; {{ calculations.price }}</span>
      </div>
      <div class="check__btn" v-if="calculations.total > 0">
        <router-link :to="`/orderConfirmation/${shopId}`">去结算</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useCommonCartEffect } from "../../effects/cartEffects";
// 获取购物车信息逻辑
const useCartEffect = shopId => {
  // 获取当前商铺ID
  // 【从购物车中获取】返回的是Proxy，不需要.value
  const {
    changeCartItemInfo,
    cartList,
    productList,
    calculations
  } = useCommonCartEffect(shopId);
  const store = useStore();
  // const { cartList } = useCommonCartEffect(); // 返回的是ObjectRefImpl，需要.value

  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", {
      shopId,
      productId
    });
  };

  const cleanCartProducts = shopId => {
    store.commit("cleanCartProducts", {
      shopId
    });
  };

  const setCartItemsChecked = shopId => {
    store.commit("setCartItemsChecked", {
      shopId
    });
  };

  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count ?? 0;
  };

  return {
    calculations,
    productList,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    cartList,
    setCartItemsChecked,
    getProductCartCount
  };
};

// 显示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false);
  const handleCartShowChange = () => {
    showCart.value = !showCart.value;
  };
  return { showCart, handleCartShowChange };
};

export default {
  name: "Cart",
  setup() {
    const {
      params: { id: shopId }
    } = useRoute();
    const {
      calculations,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      cartList,
      setCartItemsChecked,
      getProductCartCount
    } = useCartEffect(shopId);
    const { showCart, handleCartShowChange } = toggleCartEffect();

    return {
      calculations,
      productList,
      shopId,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      cartList,
      setCartItemsChecked,
      showCart,
      handleCartShowChange,
      getProductCartCount
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: $font-white-color;
}
.product {
  overflow-y: scroll;
  flex: 1;
  background-color: $font-white-color;
  &__header {
    line-height: 0.52rem;
    border-bottom: 0.01rem solid $bg-color;
    display: flex;
    &__all {
      width: 0.64rem;
      margin-left: 0.17rem;
      font-size: 0.14rem;
      &__icon {
        display: inline-block;
        color: $bg-blue-color;
        font-size: 0.2rem;
        margin-right: 0.1rem;
        vertical-align: top;
      }
    }
    &__clear {
      flex: 1;
      padding-right: 0.16rem;
      text-align: right;
      font-size: 0.14rem;
      color: $font-color;
      &__btn {
        display: inline-block;
        line-height: 0.52rem;
      }
    }
  }
  &__item {
    box-sizing: border-box;
    display: flex;
    position: relative;
    padding: 0.12rem 0.16rem;
    &__checked {
      color: $bg-blue-color;
      font-size: 0.2rem;
      line-height: 0.46rem;
      margin-right: 0.1rem;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
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
      bottom: 0.26rem;
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
.check {
  display: flex;
  border-top: 0.01rem solid $bg-color;
  &__icon {
    width: 0.84rem;
    position: relative;
    &__img {
      display: block;
      width: 0.28rem;
      height: 0.26rem;
      margin: 0.12rem auto;
    }
    &__tag {
      position: absolute;
      left: 0.48rem;
      top: 0.04rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      text-align: center;
      color: $font-white-color;
      border-radius: 0.1rem;
      background-color: $font-red-color;
      transform: scale(0.5);
      transform-origin: left center; // 指定缩小的中心点
    }
  }
  &__info {
    flex: 1;
    font-size: 0.12rem;
    &__price {
      line-height: 0.49rem;
      color: $font-red-color;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    text-align: center;
    color: $font-white-color;
    font-size: 0.14rem;
    line-height: 0.5rem;
    a {
      text-decoration: none;
      color: $font-white-color;
    }
  }
}
</style>
