<template>
  <div>
    <div class="order">
      <!-- 列表 -->
      <div class="erShou_house">
        <div class="title_content_s">
          <div class="title_content">
            <div class="title_item status_s">资料编码</div>
            <div class="title_item now_approval_person">名称</div>
            <div class="title_item project_name">类型</div>
            <div class="title_item wuye">上交阶段</div>
            <div class="title_item deal_report_no">备注</div>
            <div class="title_item cust_custom">操作</div>
          </div>
        </div>
        <div class="list_content">
          <div>
            <div
              class="content"
              @dblclick="f_intentionDetail(0)"
              v-for="(item, index) in paymentApprovalList"
              :key="index"
            >
              <div class="title_item status_s">
                <span class="number" @click="dealReportNo()">{{ item.status_s || "--" }}</span>
              </div>
              <div class="title_item now_approval_person">
                <span class="number" @click="contractNo()">{{ item.now_approval_person || "--" }}</span>
              </div>
              <div class="title_item project_name">
                <div class="status_pai">{{ item.pay_date || "--" }}</div>
                <!-- <div class="status_refuse">
                  <div class="refuse_icon"></div>
                  <div>打印</div>
                </div>-->
                <!-- <div class="status_refuse" >
                <div class="refuse_icon"></div>
                <div>爽约</div>
                </div>-->
              </div>
              <div class="title_item wuye">{{ item.pay_money || "--" }}</div>
              <div class="title_item deal_report_no">{{ item.deal_report_no || "--" }}</div>
              <div class="title_item cust_custom">
                <div style="margin-right:0.2rem">
                  <span class="redact_icon"></span>
                  <span>编辑</span>
                </div>
                <div @click="remove()">
                  <span class="delete_icon"></span>
                  <span>删除</span>
                </div>
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
    </div>
    <!-- 递交资料弹框 -->
    <!-- <submit-info :isShow.sync="addSubmit.isShow"></submit-info> -->
    <!-- 删除弹框 -->
    <delData :isShows.sync="del.isShow"></delData>
  </div>
</template>
<script>
import SearchInput from "../../../../components/form/searchInput";
// import submitInfo from "../components/submitInfo";
import delData from "../components/delData";
import {
  GetPaymentApprovalList,
  RequestParameter
} from "../../../../net/newHouseIntentionSheet/receiptPaymentApproval/paymentApprovalList.js";

export default {
  components: {
    SearchInput,
    delData
    // submitInfo
  },
  props: {
    pageParam: {
      type: Object,
      default() {
        return {};
      }
    },
    nowTabValue: {
      type: [String, Number],
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      searchEmpty: false, //是否清空搜素框文本
      NoData: false,
      isLoad: false,
      isScroll: true,
      paymentApprovalList: [1, 2, 3, 4, 5, 6], //新房收付审批列表数据
      isIntentionDetailSwitch: false, //新房意向单详情判断
      // isIntentionDetailList: false, //新房意向单详情列表判断
      isShowReceiptDetail: false, //是否查看收款单详情
      del: {
        isShow: false,
        title: "删除"
      }
    };
  },
  methods: {
    //请求新房收付列表数据
    initData() {
      if (this.nowTabValue != 1) return;
      console.log(this.pageParam, "----查询参数");
      new GetPaymentApprovalList(new RequestParameter(this.pageParam))
        .send()
        .then(res => {
          //暂时隐藏
          console.log("e---------------------");
          // this.paymentApprovalList = res.list;
          this.paymentApprovalList = [1, 2, 3];
          // 获取查询返回的参数
          // let pageRetrunParam = {
          //   total: res.total,
          // };
          // this.$emit("pageRetrunParam", pageRetrunParam);
        })
        .catch(err => {
          this.paymentApprovalList = [1, 2, 3];
          this.$erpCommon.toast(
            err.errMsg || "服务器开小差了,请稍后再试",
            "error"
          );
        });
    },
    //审批界面
    handleApproval() {
      // this.$router.push({ path: "/paymentApproval" });
      this.addSubmit.isShow = true;
      console.log("审批界面");
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
    // 查看成交报告内容
    dealReportNo() {
      console.log("成交报告内容");
    },
    // 合同资料上传
    contractNo() {
      console.log("合同内容");
    },
    // 删除
    remove() {
      console.log("删除");
      this.del.isShow = true;
    }
  }
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
.order {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #edf3fb;
}

.erShou_house {
  overflow: auto;
}

.list_content {
  width: 100%;
  //   width: 22.04rem;
  // height: calc(~"100% - 0.34rem");
  height: calc(~"100% - 2.1rem");
  padding: 0.1rem 0.2rem 0.45rem;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
}

.title_content {
  display: flex;
  align-items: center;
  height: 0.3rem;
  background-color: #ffffff;
  border: solid 0.01rem #ffffff;
  overflow: hidden;
  padding: 0 0.2rem;
  & > div {
    border: none !important;
  }
}

.title_content_s {
  width: 100%;
  height: 0.32rem;
  box-sizing: border-box;
}

.content {
  display: flex;
  //   width: 22.04rem;
  height: 0.3rem;
  min-height: 0.3rem;
  margin-top: 0.05rem;
  background-color: #ffffff;
  align-items: center;
  border: solid 0.01rem #ffffff;
  .number {
    color: #259cf3;
    cursor: pointer;
    user-select: none;
  }
}

.content:hover {
  background-color: #d9f1fe;
  border: solid 0.01rem #73baee;
  & > .cust_custom > div {
    display: block;
  }
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
  display: flex;
}
.status_s {
  width: 15%;
  padding-left: 0.15rem;
  border-right: 0.01rem dotted #d5d5d5;
}

.now_approval_person {
  width: 15%;
  border-right: 0.01rem dotted #d5d5d5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.project_name {
  width: 10%;
  border-right: 0.01rem dotted #d5d5d5;
  display: flex;
}

.wuye {
  width: 12%;
  display: flex;
  align-items: center;
  border-right: 0.01rem dotted #d5d5d5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.deal_report_no {
  width: 35%;
  border-right: 0.01rem dotted #d5d5d5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.cust_custom {
  flex: 1;
  div {
    display: none;
    width: 0.5rem;
    color: #449aff;
    cursor: pointer;
    user-select: none;
  }
  .redact_icon {
    display: inline-block;
    width: 0.14rem;
    height: 0.14rem;
    margin-right: 0.04rem;
    background-image: url("../../../../assets/images/projectAgentInfo/common/zuofei_200.png");
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }
  .delete_icon {
    display: inline-block;
    width: 0.14rem;
    height: 0.14rem;
    margin-right: 0.04rem;
    background-image: url("../../../../assets/images/projectAgentInfo/common/zuofei_200.png");
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }
}

.type {
  width: 1.68rem;
  border-right: 0.01rem dotted #d5d5d5;
}

.settlement_details {
  width: 1.19rem;
  border-right: 0.01rem dotted #d5d5d5;
}

.status_pai {
  line-height: 0.27rem;
  width: 0.52rem;
  font-family: MicrosoftYaHei;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #444444;
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
  }
}
</style>
