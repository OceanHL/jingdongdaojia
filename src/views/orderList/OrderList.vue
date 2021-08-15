<!--
 * @Author: jhl
 * @Date: 2021-08-15 15:47:17
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-15 17:34:45
 * @Description:
-->
<template>
  <div class="wreapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) of list" :key="index">
        <div class="order__title">
          {{ item.shopName
          }}<span class="order__status">{{
            item.isCanceled ? "已取消" : "已下单"
          }}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template
              v-for="(innerItem, innerIndex) of item.products"
              :key="innerIndex"
            >
              <img
                class="order__content__img"
                :src="innerItem.product.img"
                alt="图片"
                v-if="innerIndex <= 3"
              />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__info__price">
              &yen;{{ item.totalPrice }}
            </div>
            <div class="order__content__info__count">
              共{{ item.totalNumber }}件
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :activeId="2" />
</template>

<script>
import { reactive, toRefs } from "vue";
import { get } from "../../utils/request";
import Docker from "../../components/Docker";
// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  const getListData = async () => {
    const result = await get("/api/order");
    if (result?.error === 0 && result?.data?.length) {
      const orderList = result.data;
      // 遍历每个订单
      orderList.forEach(order => {
        // 拿到该订单下的所有商品
        const products = order.products ?? [];
        let totalPrice = 0; // 总价
        let totalNumber = 0; // 总数量
        products.forEach(productItem => {
          totalNumber += productItem?.orderSales ?? 0;
          totalPrice +=
            productItem?.orderSales * productItem?.product?.price ?? 0;
        });
        // 将计算好的总价放入到每个订单中
        order.totalPrice = totalPrice;
        order.totalNumber = totalNumber;
      });
      data.list = result.data;
    }
  };
  getListData();
  const { list } = toRefs(data);
  console.log("list ---->", list);

  return { list };
};

export default {
  name: "OrderList",
  components: { Docker },
  setup() {
    const { list } = useOrderListEffect();

    return { list };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wreapper {
  position: absolute;
  top: 0;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  overflow: hidden;
  background: rgb(248, 248, 248);
}
.title {
  line-height: 0.44rem;
  background: $font-white-color;
  font-size: 0.16rem;
  color: $font-color;
  text-align: center;
}
.orders {
  .order {
    margin: 0.16rem 0.18rem;
    padding: 0.16rem;
    background: $font-white-color;
    &__title {
      margin-bottom: 0.16rem;
      font-size: 0.16rem;
      line-height: 0.22rem;
      color: $font-color;
    }
    &__status {
      float: right;
      font-size: 0.14rem;
      line-height: 0.22rem;
      color: $font-medium-color;
    }
    &__content {
      display: flex;
      &__imgs {
        flex: 1;
      }
      &__img {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.12rem;
      }
      &__info {
        width: 0.7rem;
        &__price {
          margin-bottom: 0.04rem;
          font-size: 0.14rem;
          color: $font-red-color;
          text-align: right;
          line-height: 0.2rem;
        }
        &__count {
          line-height: 0.14rem;
          font-size: 0.12rem;
          color: $font-color;
          text-align: right;
        }
      }
    }
  }
}
</style>
