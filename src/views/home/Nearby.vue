<!--
 * @Author: jhl
 * @Date: 2021-08-06 16:12:17
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-09 16:46:14
 * @Description:
-->
<template>
  <div class="nearby">
    <h3 class="nearby__title">附件店铺</h3>
    <router-link
      v-for="item of nearbyList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo.vue";

const useNearbyListEffect = () => {
  const nearbyList = ref([]);
  const getNearbyList = async () => {
    try {
      const result = await get("/api/shop/hot-list");
      if (result.error === 0 && result?.data?.length > 0) {
        nearbyList.value = result?.data;
      }
    } catch (error) {}
  };
  getNearbyList();
  return { nearbyList };
};

export default {
  name: "Nearby",
  components: { ShopInfo },
  setup() {
    const { nearbyList } = useNearbyListEffect();
    return { nearbyList };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $font-color;
  }
  a {
    text-decoration: none;
  }
}
</style>
