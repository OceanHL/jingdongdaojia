<!--
 * @Author: jhl
 * @Date: 2021-08-09 18:03:04
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-09 18:03:56
 * @Description:
-->
<template>
  <div class="gap"></div>
</template>

<script>
export default {
  name: "Gap"
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.gap {
  height: 0.1rem;
  background-color: $bg-color;
  /* 利用左右负margin将元素拉伸，上下移动元素 */
  margin: 0 -0.18rem;
}
</style>
