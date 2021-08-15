<template>
  <!--
      BEM命名规则：
        block__element--Modifier
   -->
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker :active-id="0" />
</template>

<script>
import StaticPart from "./StaticPart.vue";
import Nearby from "./Nearby.vue";
import Docker from "../../components/Docker.vue";
export default {
  name: "Home",
  components: { StaticPart, Nearby, Docker }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  padding: 0 0.18rem 0.1rem 0.18rem;
  overflow-y: auto;
}
</style>
