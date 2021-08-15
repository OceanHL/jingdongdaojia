<!--
 * @Author: jhl
 * @Date: 2021-08-14 21:47:09
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-15 22:00:40
 * @Description:
-->
<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
    <div class="products__list__wrapper">
      <div class="products__list">
        <div class="product__item" v-for="item of productList" :key="item.__id">
          <template v-if="item.count > 0">
            <img class="product__item__img" :src="item.imgUrl" />
            <div class="product__item__detail">
              <div class="product__item__detail__title">
                {{ item.name }}
              </div>
              <div class="product__item__detail__price">
                <span class="product__item__detail__price__left"
                  >&yen;{{ item.price }} x {{ item.count }}</span
                >
                <span class="product__item__detail__price__right"
                  >&yen;{{ (item.count * item.price).toFixed(2) }}</span
                >
              </div>
            </div>
          </template>
        </div>
        <div class="products__gap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/cartEffects";
export default {
  name: "ProductList",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { productList, shopName } = useCommonCartEffect(shopId);
    return {
      productList,
      shopName
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.products {
  margin: 0.16rem 0.18rem 0 0.18rem;
  background: $font-white-color;
  margin-bottom: 0.7rem;
  &__title {
    font-size: 0.16rem;
    margin-top: 0.16rem;
    color: $font-color;
    padding: 0.16rem 0.16rem 0.16rem 0.16rem;
  }
  .products__list__wrapper {
    overflow-y: scroll;
    position: absolute;
    top: 2.46rem;
    left: 0;
    right: 0;
    bottom: 0.6rem;
    margin: 0 0.18rem;
    padding-top: 0.1rem;
  }
  &__list {
    background: $font-white-color;
    padding-bottom: 0.1rem;
    .product__item {
      box-sizing: border-box;
      display: flex;
      position: relative;
      padding: 0 0.16rem 0.16rem 0.16rem;
      &__img {
        width: 0.48rem;
        height: 0.48rem;
      }
      &__detail {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 0.16rem;
        overflow: hidden;
        &__title {
          width: 100%;
          font-size: 0.14rem;
          color: $font-color;
          @include ellipsis;
        }
        &__price {
          display: flex;
          font-size: 0.14rem;
          color: $dark-fontColor;
          line-height: 0.14rem;
          &__left {
            color: $font-red-color;
            font-size: 0.14rem;
            margin-right: 0.06rem;
          }
          &__right {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }

  &__gap {
    width: 2.65rem;
    margin: 0 auto;
    border-bottom: 0.01rem solid $bg-color;
  }
}
</style>
