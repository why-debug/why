<template>
  <!-- 窄列表 -->
  <div class="narrow-list">
    <div class="narrow-nav narrow-item">
      <div
        class="narrow-item-tb"
        v-for="(item, index) in narrowNavList"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <div
      class="narrow-item"
      v-for="(listItem, listIndex) in listData"
      :key="listIndex"
      @dblclick="showDetail(listItem)"
    >
      <div
        class="narrow-item-tb"
        v-for="(item, index) in narrowNavList"
        :key="index"
      >
        {{ listItem[item.key] || "--" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      narrowNavList: [], //窄列表字段
    };
  },
  props: {
    //二手房核心查看权
    hasOldSeeAuth: {
      type: Boolean,
      data() {
        return false;
      },
    },
    //宅列表字段 ： 二手房
    narrowNavListForSale: {
      type: Array,
      data() {
        return [];
      },
    },
    //宅列表字段 ： 新房
    narrowNavListForNewBuild: {
      type: Array,
      data() {
        return [];
      },
    },
    //新房核心查看权
    hasNewBuildSeeAuth: {
      type: Boolean,
      data() {
        return false;
      },
    },
    listData: {
      type: Array,
      data() {
        return [];
      },
    },
    listType: {
      type: Number | String,
      data() {
        return 1;
      },
    },
  },
  watch: {
    listType: {
      handler: function(newVal) {
        console.log(1111111111);
        if (1 == newVal) {
          this.narrowNavList = this.narrowNavListForSale;
        } else {
          this.narrowNavList = this.narrowNavListForNewBuild;
        }
         this.handleDetailInfo();
      },
      deep: true,
    },
  },
  created() {
    if (1 == this.listType) {
      this.narrowNavList = this.narrowNavListForSale;
    } else {
      this.narrowNavList = this.narrowNavListForNewBuild;
    }
    this.handleDetailInfo();
  },
  methods: {
    //判断是否有查看权，无则特殊处理
    handleDetailInfo() {
      console.log(this.hasNewBuildSeeAuth, this.hasOldSeeAuth, "权限");
      if (this.listType == 1) {
        if (!this.hasOldSeeAuth) {
          let list = this.listData || [];
            for(let item of list){
              item.buyCustomerCommsion = "****";
              item.cooperationCostCn = "****";
              item.dealPriceCn = "****";
              // item.reportCash = "****";
              item.sellOwnerCommsion = "****";
            }
        }
      }
      if (this.listType == 2) {
        if (!this.hasNewBuildSeeAuth) {
          let list = this.listData || [];
            for(let item of list){
              item.custCommission = "****";
              item.offerAmountCn = "****";
              // item.reportCash = "****";
              item.userName = item.userNameName;
            }
              console.log(JSON.parse(JSON.stringify(list)));

        }
      }
    },
    // 查看详情
    showDetail(item) {
      console.log(item, "这是详情");
      let dealId = item.dealId || "";
      console.log("dealId:", dealId);
      if (!dealId) return;
      this.$emit("showDetail", { dealId: dealId });
    },
  },
};
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
      width: 0.98rem;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      height: @baseHeight;
      line-height: 0.3rem;
      text-align: center;
      text-align: center;
      background-color: #ffffff;
      border-right: 0.01rem @borderColor solid;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      box-sizing: border-box;
    }
  }
}
</style>
