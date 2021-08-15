<!--
 * @Author: jhl
 * @Date: 2021-08-14 21:54:29
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-15 17:44:01
 * @Description:
-->
<template>
  <div class="order">
    <div class="order__price">
      实付金额&yen;<strong>{{ calculations.price }}</strong>
    </div>
    <div class="order__btn" @click="handleShowConfirmChange(true)">
      提交订单
    </div>
  </div>
  <div
    class="mask"
    v-if="showConfirm"
    @click.self="handleShowConfirmChange(false)"
  >
    <div class="mask__content">
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="handleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="handleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useCommonCartEffect } from "../../effects/cartEffects";
import { post } from "../../utils/request";

const useMakeOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter();
  const store = useStore();
  const handleConfirmOrder = async isCanceled => {
    const products = [];
    for (const key in productList.value) {
      if (Object.hasOwnProperty.call(productList.value, key)) {
        products.push({
          __id: parseInt(productList.value[key].__id),
          num: productList.value[key].count
        });
      }
    }
    try {
      const result = await post("/api/order", {
        addressId: 1,
        shopId,
        shopName,
        isCanceled, // 是否取消订单
        products
      });
      if (result?.error === 0) {
        router.push({ name: "OrderList" });
        store.commit("clearCartData", { shopId });
      }
    } catch (error) {}
  };

  return { handleConfirmOrder };
};

const useShowMaskEffect = () => {
  const showConfirm = ref(false);
  const handleShowConfirmChange = status => {
    showConfirm.value = status;
  };
  return { showConfirm, handleShowConfirmChange };
};
export default {
  name: "Order",
  setup() {
    const route = useRoute();

    const shopId = route.params.id;
    const { calculations, shopName, productList } = useCommonCartEffect(shopId);
    const { handleConfirmOrder } = useMakeOrderEffect(
      shopId,
      shopName,
      productList
    );

    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect();

    return {
      calculations,
      showConfirm,
      handleShowConfirmChange,
      handleConfirmOrder
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.order {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.49rem;
  line-height: 0.49rem;
  background: $font-white-color;
  &__price {
    flex: 1;
    padding-left: 0.2rem;
  }
  &__btn {
    width: 0.98rem;
    background: #4fb0f9;
    color: $font-white-color;
    text-align: center;
    font-size: 0.14rem;
    color: $font-white-color;
  }
}
.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    /* absolute定位居中 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // 平移
    width: 3rem;
    height: 1.56rem;
    background: #fff;
    border-radius: 0.05rem;
    text-align: center;
    &__title {
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
      font-size: 0.18rem;
      color: #333;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      color: #666;
    }
    &__btns {
      margin: 0.24rem 0.58rem;
      display: flex;
      justify-content: space-between;
    }
    &__btn {
      width: 0.8rem;
      height: 0.32rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      &--first {
        color: #4fb0f9;
        border: 0.01rem solid #4fb0f9;
      }
      &--last {
        background: #4fb0f9;
        color: #fff;
      }
    }
  }
}
</style>
