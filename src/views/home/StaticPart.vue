<!--
 * @Author: jhl
 * @Date: 2021-08-06 16:06:31
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-09 18:04:40
 * @Description:
-->
<template>
  <div class="position">
    <span class="iconfont icon-position position__icon"></span>
    北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层
    <span class="iconfont icon-bell position__notice"></span>
  </div>
  <div class="search">
    <span class="iconfont icon-search"></span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt="广告"
    />
  </div>
  <div class="icons">
    <div class="icons__item" v-for="item of iconsList" :key="item.id">
      <img
        class="icons__item__img"
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
      />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <Gap />
</template>

<script>
import Gap from "../../components/Gap.vue";
export default {
  name: "StaticPart",
  components: {
    Gap
  },
  setup() {
    const iconsList = [
      {
        id: 0,
        imgName: "超市",
        desc: "超市便利"
      },
      {
        id: 1,
        imgName: "菜市场",
        desc: "菜市场"
      },
      {
        id: 2,
        imgName: "水果店",
        desc: "水果店"
      },
      {
        id: 3,
        imgName: "鲜花",
        desc: "鲜花绿植"
      },
      {
        id: 4,
        imgName: "医药健康",
        desc: "医药健康"
      },
      {
        id: 5,
        imgName: "家居",
        desc: "家居健康"
      },
      {
        id: 6,
        imgName: "蛋糕",
        desc: "烘培蛋糕"
      },
      {
        id: 7,
        imgName: "签到",
        desc: "签到"
      },
      {
        id: 8,
        imgName: "大牌免运",
        desc: "大牌免运"
      },
      {
        id: 9,
        imgName: "红包",
        desc: "红包套餐"
      }
    ];

    return { iconsList };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  /* 字体不换行 + 省略号 */
  @include ellipsis;
  color: $font-color;
  &__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  &__notice {
    position: absolute;
    top: 0.17rem;
    right: 0;
    font-size: 0.2rem;
  }
}
.search {
  line-height: 0.32rem;
  background: #f5f5f5;
  color: $search-font-color;
  border-radius: 0.16rem;
  font-size: 0.14rem;
  margin-bottom: 0.1rem;
  .iconfont {
    font-size: 0.16rem;
    padding: 0 0.08rem 0 0.16rem;
  }
  &__text {
    font-size: 0.14rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%; // 屏幕宽度的25.4%
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
    }
  }
}
</style>
