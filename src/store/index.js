import { createStore } from "vuex";

const setLocalCartList = state => {
  localStorage.setItem("cartList", JSON.stringify(state.cartList));
};
const getLocalCartList = () => {
  // 第一层级是商铺的id
  return JSON.parse(localStorage.getItem("cartList")) ?? {};
};

export default createStore({
  state: {
    cartList: /*
    购物车列表 cartList 的数据结构
      cartList: {
            shopId: {
              第二层是商品id
              第二次内容是商品内容以及购物数量
              shopName: '沃尔玛',
              productList: {
                productId:{
                  __id: "1",
                  name: "香蕉250g/份",
                  imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
                  sales: 10,
                  price: 13.0,
                  oldPrice: 39.6,
                  count: 2
                }
              }
            }
          }
    */ getLocalCartList()
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      // 利用【不可变性】
      const { shopId, productId, productInfo, num } = payload;
      // 1. 获取店铺信息
      const shopInfo = state.cartList[shopId] ?? {
        shopName: "",
        productList: {}
      }; // 如果没有商铺信息为空对象
      // 2. 获取商品信息
      let product = shopInfo.productList[productId];
      if (!product) {
        // 如果没有商铺信息
        productInfo.count = 0;
        product = productInfo;
      }
      // 3. 修改商品数量
      product.count += num;
      num > 0 && (product.check = true); // 点击添加时，设置为选中状态
      product.count < 0 && (product.count = 0); // 下限小于0时，就重置为0
      // 4. 重新赋值
      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);
    },
    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      const shopInfo = state.cartList[shopId] ?? {
        shopName: "",
        productList: {}
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      const productItem = state.cartList[shopId].productList[productId];
      productItem.check = !productItem.check;
      setLocalCartList(state);
    },
    cleanCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].productList = {};
      setLocalCartList(state);
    },
    setCartItemsChecked(state, payload) {
      const { shopId } = payload;
      const products = state.cartList[shopId].productList;
      if (products) {
        for (const key in products) {
          const product = products[key];
          product.check = true;
        }
      }
      setLocalCartList(state);
    },
    clearCartData(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].productList = {};
    }
  },
  actions: {},
  modules: {}
});
