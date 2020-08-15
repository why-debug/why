<template>
  <div class="data_table">
    <div class="total_tips">
      <span>上报业绩：</span>
      <span class="fc_f57107 tits">{{initData.erpMlDeal.reportCash||'--'}}元</span>
      <span>标准佣金：</span>
      <span class="fc_f57107 tits">{{initData.erpMlDeal.standardCommission||'--'}}元</span>
      <span>折扣：</span>
      <span class="fc_f57107 tits">{{initData.erpMlDeal.discountCommission||'--'}}%</span>
    </div>
    <div class="table">
      <div class="head row">
        <div class="col">序号</div>
        <div class="col">分配人</div>
        <div class="col">类型</div>
        <div class="col">分配信息</div>
        <div class="col">领导人业绩分配</div>
      </div>
      <div class="row" v-for="(item, i) in initData.erpMlDealProfit" :key="i">
        <div class="col">{{ i+1 }}</div>
        <div class="col">{{ item.userName ||'--'}}</div>
        <div class="col">
          <div class="content_box">
            <div class="title">分配类型</div>
            <div class="content">{{ item.profitTypeName ||'--'}}</div>
          </div>
          <div class="content_box">
            <div class="title">
              <div>部</div>
              <div>门</div>
            </div>
            <div class="content">{{ item.orgName||'--' }}</div>
          </div>
          <div class="content_box">
            <div class="title">业绩月份</div>
            <div class="content">{{ item.profitMonth ||'--' }}</div>
          </div>
        </div>
        <div class="col">
          <div class="content_box">
            <div class="title">分配比例</div>
            <div class="content fc_f57107">{{ item.profitProportion ||'--'}}</div>
          </div>
          <div class="content_box">
            <div class="title">分配业绩</div>
            <div class="content fc_f57107">{{ item.profitMoney ||'--'}}元</div>
          </div>
          <div class="content_box">
            <div class="title">
              <div>单</div>
              <div>量</div>
            </div>
            <div class="content fc_f57107">{{ item.orderProportion ||'0'}}</div>
          </div>
        </div>
        <div class="col">
          <div class="content_box">{{ item.profitLeadersName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    initData: {
      type: Object,
      default() {
        return {};
      },
    },
    leaderFlag: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.data_table {
  .total_tips {
    text-indent: 0.15rem;
    margin-top: 0.2rem;
    .tits {
      margin-right: 0.4rem;
    }
  }
  .table {
    margin-top: 0.15rem;
    width: 5.4rem;
    .row {
      padding-bottom: 0.17rem;
      display: flex;
      border-bottom: solid 0.01rem #eaeaea;
      &.head {
        background-color: #efefef;
        color: #999999;
        height: 0.3rem;
        border-bottom: none;
        padding: 0;
        & > .col {
          height: 100%;
          line-height: 0.3rem;
          padding: 0 !important;
        }
      }
      .col {
        padding-top: 0.17rem;
        &:nth-of-type(1) {
          width: 0.44rem;
          text-align: center;
        }
        &:nth-of-type(2) {
          width: 0.64rem;
        }
        &:nth-of-type(3) {
          width: 1.79rem;
        }
        &:nth-of-type(4) {
          width: 1.36rem;
        }
        &:nth-of-type(5) {
          width: 1.23rem;
          word-break: break-all;
        }
        .content_box {
          width: 100%;
          display: flex;
          margin-top: 0.11rem;
          &:nth-of-type(1) {
            margin-top: 0;
          }
          .title {
            width: 0.48rem;
            display: flex;
            justify-content: space-between;
            position: relative;
            &::after {
              content: ":";
              position: absolute;
              transform: translateY(-50%);
              top: 50%;
              right: -0.05rem;
            }
          }
          .content {
            margin-left: 0.2rem;
            max-width: 1rem;
            word-break: break-all;
          }
        }
      }
    }
  }
}
</style>