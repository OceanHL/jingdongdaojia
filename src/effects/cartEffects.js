/*
 * @Author: jhl
 * @Date: 2021-08-12 11:16:53
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-15 15:31:21
 * @Description:
 */
import { computed } from "vue";
import { useStore } from "vuex";
// 购物车相关逻辑
export const useCommonCartEffect = shopId => {
  const store = useStore();
  const cartList = store.state.cartList;
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit("changeCartItemInfo", {
      shopId,
      productId,
      productInfo,
      num
    });
  };

  // 拿出购物车中的数据
  const productList = computed(() => {
    // 依赖cartList的变化，开始是空的
    const productList = cartList[shopId]?.productList ?? {};
    const notEmptyProductList = {};
    for (const i in productList) {
      const product = productList[i];
      // 只有count大于0的商品才会留下来
      if (product.count > 0) {
        notEmptyProductList[i] = product;
      }
      console.log("notEmptyProductList", notEmptyProductList);
    }
    return notEmptyProductList;
  });

  const shopName = computed(() => {
    // 依赖cartList的变化，开始是空的
    const shopName = cartList[shopId]?.shopName ?? "";
    return shopName;
  });

  // 计算物品总数、总价， 返回ComputedRefImpl对象
  const calculations = computed(() => {
    // 依赖cartList的变化，开始是空的
    const productList = cartList[shopId]?.productList;
    // total总数、price总价格、allChecked是否全选, 默认是没有全选
    const result = { total: 0, price: 0, allChecked: true };
    for (const productId in productList) {
      result.total += productList[productId].count;
      if (productList[productId].check) {
        result.price +=
          productList[productId].count * productList[productId].price;
      }
      // count不等于0，并且没有选中
      if (productList[productId].count > 0 && !productList[productId].check) {
        result.allChecked = false;
      }
    }
    result.price = result.price.toFixed(2);
    return result;
  });
  return { changeCartItemInfo, cartList, productList, shopName, calculations };
};
