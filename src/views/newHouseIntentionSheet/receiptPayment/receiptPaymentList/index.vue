<template>
  <div>
    <div class="order">
      <!-- 新房收付列表 -->
      <div :class="isIntentionDetailList ? 'list_all_detail' : 'list_all'">
        <div class="title_content_s">
          <div class="title_content">
            <div class="title_item status_s">审批状态</div>
            <div class="title_item now_approval_person">当前审批人</div>
            <div class="title_item deal_No">成交报告编号</div>
            <div class="title_item wuye">物业名称</div>
            <div class="title_item custom">客户</div>
            <div class="title_item constract_No">合同编号</div>
            <div class="title_item project_type">类型</div>
            <div class="title_item money">金额</div>
            <div class="title_item receipt_date">收付日期</div>
            <div class="title_item settlement_details">结算明细</div>
            <div class="title_item applicant">申请人</div>
            <div class="title_item application_class">申请组别</div>
            <div class="title_item application_date">申请日期</div>
            <div class="title_item deal_class">成交组别</div>
            <div class="title_item deal_date">成交日期</div>
            <div class="title_item receipt_remak">备注</div>
          </div>
        </div>
        <div class="list_content">
          <div class="g_lists">
            <div
              class="content"
              @dblclick="f_intentionDetail(0)"
              v-for="(item, index) in receiptList"
              :key="index"
            >
              <div class="title_item status_s">
                {{ item.status_s || "--" }}
              </div>
              <div class="title_item now_approval_person">
                {{ item.now_approval_person || "--" }}
              </div>
              <div class="title_item deal_No">
                <!-- <div
                  class="status_pai"
                  :class="{
                    status_i:  0 ||  1,
                    status_p: item.status || 5 
                  }"
                > -->
                <div class="status_pai">
                  {{ item.deal_No || "--" }}
                </div>
                <div class="status_refuse" @click.stop="transactionDeal">
                  <div class="refuse_icon"></div>
                  <div>编辑</div>
                </div>
                <div class="status_refuse" @click="cancelIntentionSheet">
                  <div class="refuse_icon"></div>
                  <div>作废</div>
                </div>
                <!-- <div class="status_refuse" >
                <div class="refuse_icon"></div>
                <div>爽约</div>
              </div> -->
              </div>
              <div class="title_item wuye">{{ item.wuye || "--" }}</div>
              <div class="title_item custom">{{ item.custom || "--" }}</div>
              <div class="title_item constract_No">
                {{ item.constract_No || "--" }}
              </div>
              <div class="title_item project_type">
                {{ item.project_type || "--" }}
              </div>
              <div class="title_item money">{{ item.money || "--" }}</div>
              <div class="title_item receipt_date">
                {{ item.receipt_date || "--" }}
              </div>
              <div class="title_item settlement_details">
                {{ item.settlement_details || "--" }}
              </div>
              <div class="title_item applicant">
                {{ item.applicant || "--" }}
              </div>
              <div class="title_item application_class">
                {{ item.application_class || "--" }}
              </div>
              <div class="title_item application_date">
                {{ item.application_date || "--" }}
              </div>
              <div class="title_item deal_class">
                {{ item.deal_class || "--" }}
              </div>
              <div class="title_item deal_date">
                {{ item.deal_date || "--" }}
              </div>
              <div class="title_item receipt_remak">
                {{ item.receipt_remak || "--" }}
              </div>
            </div>
          </div>
        </div>
        <div class="no_dataBox" v-if="!!NoData">
          <div class="no-data">
            <img src="../../../../assets/images/public/nodate.png" alt />
            <div class="no_dataSpan">暂时没有相关数据哦!</div>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div class="list_bottom" v-if="false">
        <div class="bottom_left"></div>
        <div class="bottom_heji">合计</div>
        <div class="bottom_order">预约单:</div>
        <div class="bottom_total">{{ 0 }}</div>
      </div>
      <div class="isLoading" v-if="!!isLoad">
        <!-- <img src="..\..\assets\images\Report\loading.gif"/> -->
      </div>
    </div>
    <!-- 新房意向单详情 -->
    <div v-if="isIntentionDetailSwitch">
      <intentionDetail @f_closeView="f_closeView"></intentionDetail>
    </div>

    <!-- 新房意向单收款单详情 -->
    <!-- <div v-if="isShowReceiptDetail"> 
      <showReceiptDetail @f_closeView="f_closeView"></showReceiptDetail>
    </div>  -->
  </div>
</template>
<script>
import SearchInput from "../../../../components/form/searchInput";
import intentionDetail from "./intentionDetail";
import {
  GetRreceiptPaymentList,
  RequestParameter,
} from "../../../../net/newHouseIntentionSheet/receiptPayment/receiptPayment";

export default {
  components: {
    SearchInput,
    intentionDetail,
  },
  props: {
    pageParam: {
      type: Object,
      default() {
        return {};
      },
    },
    nowTabValue: {
      type: [String, Number],
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      searchEmpty: false, //是否清空搜素框文本
      NoData: false,
      isLoad: false,
      isScroll: true,
      receiptList: [], //新房收付列表数据
      isIntentionDetailSwitch: false, //新房意向单详情判断
      isIntentionDetailList: false, //新房意向单详情列表判断
      isShowReceiptDetail: false, //是否查看收款单详情
    };
  },
  methods: {
    //请求新房收付列表数据
    initData() {
      if (this.nowTabValue != 1) return;
      console.log(this.pageParam, "----查询参数");
      new GetRreceiptPaymentList(new RequestParameter(this.pageParam))
        .send()
        .then((res) => {
          //暂时隐藏
          // this.receiptList = res.list;
          this.receiptList = [1, 2, 3];
          // 获取查询返回的参数
          // let pageRetrunParam = {
          //   total: res.total,
          // };
          // this.$emit("pageRetrunParam", pageRetrunParam);
        })
        .catch((err) => {
          //测试
          this.receiptList = [1, 2, 3];
          this.$erpCommon.toast(
            err.errMsg || "服务器开小差了,请稍后再试",
            "error"
          );
        });
    },
    //作废按钮
    cancelIntentionSheet() {
      this.$erpConfirm({
        msg: "作废后不可撤销，请谨慎操作",
      })
        .then(() => {
          console.log('确认');
        })
        .catch(() => {});
    },
    //新房新房收付详情
    f_intentionDetail(id) {
      this.isIntentionDetailSwitch = true;
    },
    //转成交界面
    transactionDeal() {
      this.$router.push({ path: "/transactionDeal" });
    },
    //新增收款单
    addReceipt() {
      this.$router.push({ path: "/addReceipt" });
    },
    //查看收款单详情
    showReceiptDetail() {
      this.isShowReceiptDetail = true;
      console.log("这是收款单详情弹窗");
    },
    //关闭弹窗
    f_closeView() {
      if (this.isIntentionDetailSwitch) {
        this.isIntentionDetailSwitch = false;
        return;
      }
      if (this.isShowReceiptDetail) {
        this.isShowReceiptDetail = false;
        return;
      }
    },
  },
};
</script>
<style scoped>
/*修改滚动条样式*/
div::-webkit-scrollbar {
  width: 0.08rem;
  height: 0.08rem;
}
</style>
<style lang="less" scoped>
.build-top {
  width: 100%;
  height: 0.34rem;
  background-image: linear-gradient(#f9f9f9, #dedede);
  align-items: flex-end;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .left_box {
    display: flex;
    align-items: center;

    .active {
      width: 0.85rem;
      height: 0.27rem;
      line-height: 0.27rem;
      text-align: center;
      margin-left: 0.1rem;
      // margin-top: 0.04rem;
      color: #000000;
      font-size: 0.12rem;
      background-color: #ffffff;
      box-shadow: 0 0 0.01rem 0.01rem rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }

    .build-top-span {
      width: 0.65rem;
      height: 0.3rem;
      padding-left: 0.15rem;
      font-size: 0.12rem;
      color: #7c8286;
      text-align: center;
      line-height: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        width: 0.13rem;
      }
    }
  }

  .right_box {
    font-size: 0.1rem;
    width: 3.5rem;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    padding-right: 0.5rem;
    padding-left: 0.42rem;
    color: #999;

    .topseach {
      color: #259cf3;
      margin-right: 0.1rem;
      margin-left: 0.1rem;
      display: flex;
      align-items: center;
      cursor: pointer;

      .addIcon {
        // vertical-align: middle;
        width: 0.12rem;
        margin-right: 0.05rem;
      }

      & > .addSpan {
        font-size: 0.12rem;
      }
    }

    .all_data {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // flex:0 0 0.7rem;
      // width:0.7rem;
      .spanTotal {
        display: inline-block;
        text-align: center;
        padding: 0 0.02rem;
      }
    }
  }
}

.order {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #edf3fb;
}

.list_all {
  width: 100%;
  height: calc(~"100% - 0.34rem");
  overflow: auto;
}
.list_all_detail {
  width: 100%;
  height: calc(~"100% - 0.34rem - 0.21rem");
  overflow: auto;
}

.list_content {
  width: 20.83rem;
  // height: calc(~"100% - 0.34rem");
  height: calc(~"100% - 2.1rem");
  padding-left: 0.1rem;
  box-sizing: border-box;
  padding-bottom: 0.45rem;
  overflow: hidden;
  overflow-y: auto;
}

.title_content_s {
  width: 100%;
  height: 0.32rem;
  box-sizing: border-box;

  .title_content {
    display: flex;
    align-items: center;
    width: 20.83rem;
    height: 0.3rem;
    background-color: #ffffff;
    border: solid 0.01rem #ffffff;
    overflow: hidden;
    padding: 0 0.1rem;
    & > div {
      border: none !important;
    }
  }
}

.content {
  display: flex;
  width: 20.83rem;
  height: 0.3rem;
  min-height: 0.3rem;
  margin-top: 0.05rem;
  background-color: #ffffff;
  align-items: center;
  border: solid 0.01rem #ffffff;
}

.content:hover {
  background-color: #d9f1fe;
  border: solid 0.01rem #73baee;
}

.title_item {
  height: 0.24rem;
  font-family: MicrosoftYaHei;
  font-size: 0.12rem;
  line-height: 0.24rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #666666;
  padding-left: 0.08rem;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.number {
  width: 0.62rem;
  border-right: 0.01rem dotted #d5d5d5;
}

.status_s {
  width: 0.89rem;
  border-right: 0.01rem dotted #d5d5d5;
}

.now_approval_person {
  width: 1.11rem;
  border-right: 0.01rem dotted #d5d5d5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.deal_No {
  width: 2.95rem;
  display: flex;
  border-right: 0.01rem dotted #d5d5d5;
}

.wuye {
  width: 2.57rem;
  display: flex;
  align-items: center;
  border-right: 0.01rem dotted #d5d5d5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.custom {
  width: 0.78rem;
  border-right: 0.01rem dotted #d5d5d5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.constract_No {
  width: 0.85rem;
  border-right: 0.01rem dotted #d5d5d5;
}

.project_type {
  width: 0.92rem;
  border-right: 0.01rem dotted #d5d5d5;
}

.receipt_remak {
  width: 1.82rem;
}

.applicant {
  width: 0.84rem;
  border-right: 0.01rem dotted #d5d5d5;
}
.application_class {
  width: 1.46rem;
  border-right: 0.01rem dotted #d5d5d5;
}
.application_date {
  width: 0.98rem;
  border-right: 0.01rem dotted #d5d5d5;
}
.deal_class {
  width: 1.39rem;
  border-right: 0.01rem dotted #d5d5d5;
}
.deal_date {
  width: 0.97rem;
  border-right: 0.01rem dotted #d5d5d5;
}

.receipt_date {
  width: 0.97rem;
  border-right: 0.01rem dotted #d5d5d5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.remark {
  width: 2.07rem;
}

.sheyingshi {
  width: 0.72rem;
  border-right: 0.01rem dotted #d5d5d5;
}

.money {
  width: 0.91rem;
  border-right: 0.01rem dotted #d5d5d5;
}

.settlement_details {
  width: 1.13rem;
  border-right: 0.01rem dotted #d5d5d5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.person_i {
  width: 1.2rem;
  border-right: 0.01rem dotted #d5d5d5;
}

.area {
  width: 0.77rem;
  border-right: 0.01rem dotted #d5d5d5;
}

.ori {
  width: 1.59rem;
}

.list_bottom {
  display: flex;
  align-items: center;
  line-height: 0.35rem;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0.1rem;
  height: 0.35rem;
  background-color: #e7eef5;
}

.bottom_order {
  font-family: MicrosoftYaHei;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #666666;
  margin-left: 0.13rem;
}

.bottom_total {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.12rem;
  font-weight: normal;
  letter-spacing: 0rem;
  color: #ff5a1e;
}

.bottom_heji {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.14rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #000000;
  margin-left: 0.13rem;
}

.bottom_left {
  width: 0.1rem;
  height: 0.12rem;
  margin-left: 0.03rem;
  // background-color: #259cf3;
}

.status_pai {
  line-height: 0.27rem;
  max-width: 0.8rem;
  font-family: "MicrosoftYaHei";
  font-size: 0.12rem;
  color: #444444;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.status_refuse {
  height: 0.24rem;
  display: flex;
  align-items: center;
  font-family: "MicrosoftYaHei";
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #259cf3;
  margin-left: 0.2rem;
  cursor: pointer;
}
.status_accept {
  display: flex;
  align-items: center;
  font-family: "MicrosoftYaHei";
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #259cf3;
  margin-left: 0.2rem;
  cursor: pointer;
}
.accept_icon {
  width: 0.11rem;
  height: 0.08rem;
  margin-right: 0.04rem;
  background-image: url("../../../../assets/images/projectAgentInfo/common/zuofei_200.png");
  background-repeat: no-repeat;
  background-size: contain;
}
.refuse_icon {
  width: 0.14rem;
  height: 0.14rem;
  margin-right: 0.04rem;
  background-image: url("../../../../assets/images/projectAgentInfo/common/zuofei_200.png");
  background-repeat: no-repeat;
  background-size: contain;
}
.status_i {
  color: #ff5a1e;
}

.status_p {
  color: #008000;
}

// .no_dataBox {
//   position: fixed;
//   width: 100%;
//   height: calc(100% - 0.68rem);
//   min-height: 2rem;
//   min-width: 14.4rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #edf3fb;

//   .no_dataSpan {
//     font-size: 0.18rem;
//     margin-top: 0.1rem;
//     color: #999;
//   }
// }
.no_dataBox {
  position: fixed;
  width: 100%;
  height: calc(~"100% - 1.08rem");
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #edf3fb;
  .no-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > img {
      transform: scale(0.9);
    }

    .no_dataSpan {
      font-size: 0.18rem;
      margin-top: 0.1rem;
      color: #999999;
    }
  }
}

.isLoading {
  position: absolute;
  top: 0.97rem;
  width: 100%;
  height: calc(~"100% - 1.08rem");
  min-height: 2rem;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.g_lists {
  width: 20.83rem;
  // height: 0.3rem;
  height: auto;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  // align-items: flex-start;
  // overflow-y: auto;
  // padding: 0 0.1rem;
  // box-sizing: border-box;
  // overflow-y: auto;
}

.intentionDetailList {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 2.1rem;
  background-color: #fff;
  box-shadow: 0rem -0.01rem 0.08rem 0rem rgba(144, 144, 144, 0.2);
  border-radius: 0.04rem 0rem 0rem 0rem;
  padding: 0.11rem 0.2rem 0;
  box-sizing: border-box;

  .title {
    width: 100%;
    height: 0.28rem;
    margin-bottom: 0.14rem;
    // background-color: purple;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left_title {
      width: 2rem;
      font-size: 0.16rem;
      color: #006797;
      font-weight: bold;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      & > span {
        color: #444444;
      }
    }
    .right_btn {
      width: 2.16rem;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      cursor: pointer;
      & > div {
        width: 0.66rem;
        background-blend-mode: normal, normal;
        box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(0, 0, 0, 0.75),
          inset 0rem -0.01rem 0rem 0rem rgba(255, 255, 255, 0.2);
        border-radius: 0.02rem;
        border: solid 0.01rem #45a802;
        font-size: 0.13rem;
        color: #ffffff;
        height: 0.28rem;
        line-height: 0.28rem;
        text-align: center;
        letter-spacing: 0.01rem;
        box-sizing: border-box;
      }
      & > div:nth-of-type(1) {
        background-image: linear-gradient(0deg, #64c12b 0%, #72cd3b 100%),
          linear-gradient(#5fc41b, #5fc41b);
      }
      & > div:nth-of-type(2) {
        background-image: linear-gradient(0deg, #449aff 0%, #50a7ff 100%),
          linear-gradient(#5fc41b, #5fc41b);
      }
      & > div:nth-of-type(3) {
        background-image: linear-gradient(0deg, #ff8a18 0%, #ff9421 100%),
          linear-gradient(#ffffff, #ffffff);
      }
    }
  }

  .detail_list {
    width: 100%;
    height: 1.4rem;
    border-radius: 0.02rem;

    .detail_title_content {
      width: 100%;
      height: 0.38rem;
      padding-left: 0.21rem;
      border: solid 0.01rem #ebebeb;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .detail_title_item {
        width: 1.2rem;
        height: 0.38rem;
        font-family: "MicrosoftYaHei";
        font-size: 0.12rem;
        line-height: 0.38rem;
        color: #999999;
        text-align: left;
      }
    }
    .all_list {
      width: 100%;
      height: 1rem;
      background-color: #ffffff;
      box-sizing: border-box;
      border: solid 0.01rem #ebebeb;
      border-top: none;
      overflow: hidden;
      overflow-y: auto;
      .detail_list_content {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding-left: 0.21rem;
        border-bottom: solid 0.01rem #ebebeb;
        .detail_list_item {
          width: 1.2rem;
          height: 0.38rem;
          font-family: "MicrosoftYaHei";
          font-size: 0.12rem;
          line-height: 0.38rem;
          color: #444444;
          text-align: left;
        }
        .approval_status {
          color: #008000 !important;
        }
        .operation {
          color: #259cf3 !important;
        }
      }
    }

    .entry_time {
      width: 1.45rem;
    }
    .type {
      width: 1.42rem;
    }
    .all_money {
      width: 1.16rem;
    }
    .settle_detail {
      width: 1.7rem;
    }
    .approval_status {
      width: 1.47rem;
    }
    .approval_person {
      width: 1.33rem;
    }
    .application_dept {
      width: 1.64rem;
    }
    .creator {
      width: 1.32rem;
    }
    .operation {
      width: 2.32rem;
    }
  }
}
</style>
