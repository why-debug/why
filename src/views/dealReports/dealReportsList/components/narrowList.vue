<template>
  <!-- 窄列表 -->
  <div class="narrow-list">
    <div class="narrow-nav narrow-item">
      <div
        class="narrow-item-tb"
        v-for="(item, index) in narrowNavList"
        :key="index"
      >{{item.name}}</div>
    </div>
    <div
      class="narrow-item"
      v-for="(listItem, listIndex) in listData"
      :key="listIndex"
      @dblclick="showDetail()"
    >
      <div
        class="narrow-item-tb"
        v-for="(item, index) in narrowNavList"
        :key="index"
      >{{listItem[item.key] || '--'}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      narrowNavList:[], //窄列表字段
    }
  },
  props:{
    //宅列表字段 ： 二手房
    narrowNavListForSale:{
      type:Array,
      data(){
        return []
      }
    },
    //宅列表字段 ： 新房
    narrowNavListForNewBuild:{
      type:Array,
      data(){
        return []
      }
    },
    listData:{
      type:Array,
      data(){
        return []
      }
    },
 },
 created() {
   this.narrowNavList = this.narrowNavListForSale;  //默认展示二手房字段
 },
}
</script>

<style lang="less" scoped>
@baseHeight: 0.3rem;
@borderColor: #d8e2e7;
  /* 窄列表 */
    .narrow-list {
      position: relative;
      .narrow-item {
        display: inline-flex;
        flex-direction: row;
        border-bottom: 0.01rem @borderColor solid;
        &.narrow-nav {
          position: sticky;

          top: 0;
          z-index: 10;
          height: @baseHeight;
        }
        > .narrow-item-tb {
          min-width: 0.98rem;
          display: flex;
          align-items: center;
          justify-content: center;
          height: @baseHeight;
          text-align: center;
          background-color: #ffffff;
          border-right: 0.01rem @borderColor solid;
        }
      }
    }
</style>