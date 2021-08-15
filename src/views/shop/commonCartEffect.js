/*
 * @Author: jhl
 * @Date: 2021-08-12 11:16:53
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-13 22:15:33
 * @Description:
 */
import { useStore } from "vuex";
// 购物车相关逻辑
export const useCommonCartEffect = () => {
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

  return { changeCartItemInfo, cartList };
};
