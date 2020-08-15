<template>
  <div class="report-no">
    <div class="title">编号：{{ projectDetail.erpMlDeal.entrustNo || "--" }}</div>
    <div class="content">
      <div class="item">
        <div>合同编号：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.entrustNo || "--" }}</div>
      </div>
      <div class="item">
        <div>签约日期：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.signDate | formatTime }}</div>
      </div>
      <div class="item">
        <div>业主佣金：</div>
        <div class="normal">{{projectDetail.erpMlDeal.sellOwnerCommsion || "--" }}元</div>
      </div>
      <div class="item">
        <div>客户佣金：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.buyCustomerCommsion || "--" }}元</div>
      </div>
      <div class="item">
        <div>按揭手续费：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.mortgageFee || "--" }}元</div>
      </div>
      <div class="item">
        <div>客户必要费用：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.buyNecessaryCost || "--" }}元</div>
      </div>
      <div class="item">
        <div>业主必要费用：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.sellNecessaryCost || "--" }}元</div>
      </div>
      <div class="item">
        <div>第一笔定金：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.firstEarnestMoney || "--" }}元</div>
      </div>
      <div class="item">
        <div>第一笔支付时间：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.firstEarnestMoneyDate | formatTime }}</div>
      </div>
      <div class="item">
        <div>第二笔定金：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.secondEarnestMoney || "--" }}元</div>
      </div>
      <div class="item">
        <div>第二笔支付时间：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.secondEarnestMoneyDate | formatTime }}</div>
      </div>
      <div class="item">
        <div>交楼押金：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.transferDeposit || "--" }}元</div>
      </div>
      <div class="item">
        <div>交楼押金交付时间：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.transferDepositPayTime | formatTime }}</div>
      </div>
      <div class="item">
        <div>首期款：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.downPayments || "--" }}元</div>
      </div>
      <div class="item">
        <div>按揭金额：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.mortgageAmount || "--" }}元</div>
      </div>
      <div class="item">
        <div>按揭时间：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.mortgageDate | formatTime }}</div>
      </div>
      <div class="item">
        <div>应公证委托时间：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.notarizationDate | formatTime }}</div>
      </div>
      <div class="item">
        <div>备注：</div>
        <div class="normal">{{ projectDetail.erpMlDeal.remarks || "--" }}</div>
      </div>
    </div>
    <div class="bottom-btn">
      <!-- <div class="btn-1">电子合同</div> -->
      <div class="btn-2" @click="goEdit()">编辑</div>
      <!-- <div class="btn-3" @click="add()">审核</div> -->
    </div>
  </div>
</template>

<script>
import {
  SecondHandReportInfoDetailParams,
  SecondHandReportInfoDetail,
} from "../../../../net/dealReports/erShouDealReportDetail";
export default {
  data() {
    return {
      projectDetail: new SecondHandReportInfoDetailParams(), //详情参数
    };
  },
  props: {
    projectDetailInfo: {
      type: Object,
      default() {
        return new SecondHandReportInfoDetailParams();
      },
    },
    dealId: {
      type: Number | String,
      default() {
        return "";
      },
    },
  },
  watch: {
    projectDetailInfo: {
      handler: function (newVal, oldVal) {
        this.projectDetail = newVal;
      },
      deep: true,
    },
  },
  created() {
    this.projectDetail = this.projectDetailInfo;
    console.log(this.projectDetailInfo, "认购信息");
  },
  filters: {
    formatTime(val) {
      if (val != "" && val != undefined) {
        return val.split(" ")[0];
      } else {
        return "--";
      }
    },
    unit(price) {
      let p = Number(price);
      if (isNaN(p)) return "元";
      if (p < 9999) return "元";
      return "万元";
    },
    price(price) {
      let p = Number(price);
      if (isNaN(p)) return "--";
      if (p < 9999) return price;
      return p / 10000;
    },
  },
  methods: {
    //编辑二手房成交报告
    goEdit() {
      this.$router.push({
        path: "/addErShouDealReport",
        query: { dealId: this.dealId },
      });
    },
    // add() {
    //   new SecondHandReportInfoDetail({id:"10"}).send().then((res) => {
    //     // console.log(res);
    //     // this.secondHandDetailInfo = res;
    //     console.log(res, "二手成交报告详情初始化数据");
    //   });
    // },
  },
};
</script>

<style lang="less" scoped>
.report-no {
  width: 100%;
  height: auto;
  & > .title {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    text-indent: 0.1rem;
    color: #006797;
    font-size: 0.14rem;
  }
  & > .content {
    width: 100%;
    height: 4.1rem;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 0.1rem;
    box-sizing: border-box;
    & > .item {
      line-height: 0.3rem;
      display: flex;
      & > div {
        &:nth-child(1) {
          min-width: 0.4rem;
          color: #999999;
          font-size: 0.12rem;
        }
        &:nth-child(2) {
          width: auto;
          color: #444444;
          font-size: 0.12rem;
          word-break: break-all;
        }
      }
    }
  }
  & > .bottom-btn {
    width: 100%;
    height: auto;
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-around;
    & > div {
      width: 0.6rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      border-radius: 0.02rem;
      opacity: 1;
      color: #ffffff;
      font-size: 0.13rem;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      &.btn-1 {
        background-image: linear-gradient(0deg, #eff1f4 0%, #ffffff 100%),
          linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        border: solid 0.01rem #bdc6cf;
        color: #666666;
      }
      &.btn-2 {
        background-image: linear-gradient(0deg, #64c12b 0%, #72cd3b 100%),
          linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(0, 0, 0, 0.75),
          inset 0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.2);
        border: solid 0.01rem #45a802;
      }
      &.btn-3 {
        background-image: linear-gradient(0deg, #449aff 0%, #50a7ff 100%),
          linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(0, 0, 0, 0.75),
          inset 0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.2);
        border: solid 0.01rem #3d81ff;
      }
    }
  }
}
</style>
