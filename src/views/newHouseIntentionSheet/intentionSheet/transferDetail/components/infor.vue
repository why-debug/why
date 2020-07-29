<template>
  <div class="basic-information">
    <div class="top-box">
      <!-- 基本信息 -->
      <div class="basic-box">
        <div class="b-top">
          <div class="b-t-left">
            <div>海府生态大厦</div>
            <div>
              <div class="active">转</div>
              <div class="active">售</div>
              <div
                :class="
                  secondHandDetail.erpMlDeal.auditStatus == 0
                    ? 'normal'
                    : 'active'
                "
              >
                {{
                  secondHandDetail.erpMlDeal.auditStatus == 0
                    ? "未审批"
                    : "已审批"
                }}
              </div>
            <div
                :class="
                  secondHandDetail.erpMlDeal.auditStatus == 0
                    ? 'normal'
                    : 'active'
                "
               style="color:#ff8002; border:0.01rem solid #ff8002"
              >
                {{
                  secondHandDetail.erpMlDeal.auditStatus == 0
                    ? "意向中"
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="b-t-right">
            <!-- <span>发起时间：</span><span>万元</span> <span>12000</span>元/㎡ -->
            发起时间：2019-12-30 15:30
          </div>
        </div>
        <div class="t-b-content">
          <div class="item item-1 item-left">
            <div>成交部门：</div>
            <div>罗湖-幸福里</div>
          </div>
          <div class="item item-1">
            <div>部门编码：</div>
            <div>SZG49</div>
          </div>
          <div class="item item-1">
            <div></div>
            <div></div>
          </div>
          <div class="item item-1 item-left">
            <div>成 交 人：</div>
            <div :title="`李明明-p1956138`">李明明-p1956138</div>
          </div>

          <div class="item item-1 ">
            <div>按揭部门：</div>
            <div :title="`李明明-p1956138`">罗湖-幸福里</div>
          </div>
          <div class="item item-1">
            <div></div>
            <div></div>
          </div>
          <div class="item item-1  item-left">
            <div>按揭人：</div>
            <div>刘依林</div>
          </div>

          <div class="item item-1 ">
            <div>转款日期：</div>
            <div :title="`李明明-p1956138`">2019-12-31</div>
          </div>
          <div class="item item-1">
            <div></div>
            <div></div>
          </div>
          <div class="item item-1  item-left">
            <div>备 注：</div>
            <div>这里是备注信息</div>
          </div>
        </div>
      </div>
      <div class="property_title">物业内转款</div>
      <!-- 转出方信息 -->
      <div class="house-information">
        <div class="t-b-title">转出方信息</div>
        <div class="t-b-content">
          <div class="item item-1 item-left">
            <div>转出方：</div>
            <div>客户方(刘广强)</div>
          </div>
          <div class="item item-1">
            <div>款 项：</div>
            <div>诚意金</div>
          </div>
          <div class="item item-1">
            <div>金 额：</div>
            <div>2000元</div>
          </div>
         
        </div>
      </div>

     <!-- 转入方信息 -->
      <div class="house-information">
        <div class="t-b-title">转入方信息</div>
        <div class="t-b-content">
          <div class="item item-1 item-left">
            <div>转 入 方：</div>
            <div>客户方(刘广强)</div>
          </div>
          <div class="item item-1">
            <div>款 项：</div>
            <div>诚意金</div>
          </div>
          <div class="item item-1">
            <div>金 额：</div>
            <div>2000元</div>
          </div>
         
        </div>
      </div>
    
    </div>
  </div>
</template>

<script>
import {
  erpMlDeal,
  erpMlDealBuyUsersItem,
  erpMlDealSellersItem,
  erpMlDealOuterCooperationsItem,
  erpMlDealProfitsitem,
  getMlDealInfoByIdRequest,
  getMlDealInfoById,
} from "@/net/dealReports/erShouDealReports.js";
import section_title from "./section_title";
import subtitle from "./subtitle";
import { SecondHandReportInfoDetailParams } from "../../../../../net/dealReports/erShouDealReportDetail";

export default {
  data() {
    return {
      secondHandDetail: new SecondHandReportInfoDetailParams(), //详情参数
      // test
      tableColumnList1: [
        { prop: "userName", label: "合作人", width: "" },
        { prop: "idNo", label: "身份证", width: "160" },
        { prop: "contractPhone", label: "联系方式", width: "120" },
        { prop: "type", label: "类型", width: "" },
        { prop: "cooperationCost", label: "合作费", width: "" },
      ],
      tableData1: [
        {
          userName: "啊哈哈",
          idNo: "1231",
          contractPhone: "3 1518 弄",
          type: "33 1518 弄",
          cooperationCost: "1232131",
        },
      ],
      tableColumnList2: [
        { prop: "index", label: "序号", width: "60" },
        { prop: "createUid", label: "分配人", width: "60" },
        { prop: "profitType", label: "类型", width: "" },
        { prop: "orderProportion", label: "分配信息", width: "" },
        { prop: "eeee", label: "领导人业绩", width: "" },
      ],
      tableData2: [
        {
          index: "啊哈哈",
          createUid: "1231",
          profitType: "3 1518 弄",
          orderProportion: "33 1518 弄",
          profitLeaders: "1232131",
        },
      ],
    };
  },
  components: {
    section_title,
    subtitle,
  },
  props: {
    projectDetailInfo: {
      type: Object,
      default() {
        return new SecondHandReportInfoDetailParams();
      },
    },
  },
  watch: {
    projectDetailInfo: {
      handler: function(newVal, oldVal) {
        this.secondHandDetail = newVal;
        //转换外部合作费格式
        this.formatCooperationList();
        //转换业绩分配格式
        this.formatProfitList();
      },
      deep: true,
    },
  },
  created() {
    this.secondHandDetail = this.projectDetailInfo;
    console.log(this.secondHandDetail, "二手成交报告详情");
  },
  methods: {
    //转换外部合作费格式
    formatCooperationList() {
      let infoList = this.tableData1;
      infoList = [];
      let cooperationList = this.secondHandDetail.erpMlDealOuterCooperation;
      for (let info of cooperationList) {
        let obj = {
          userName: info.userName,
          idNo: info.idNo,
          contractPhone: info.contractPhone,
          type: info.type,
          cooperationCost: info.cooperationCost,
        };
        infoList.push(obj);
      }
    },
    //转换业绩分配格式
    formatProfitList() {
      let infoList = this.tableData2;
      infoList = [];
      let cooperationList = this.secondHandDetail.erpMlDealProfit;
      for (let info of cooperationList) {
        let obj = {
          index: info.seqNo,
          createUid: info.createUid,
          profitType: info.profitType,
          orderProportion: info.orderProportion,
          profitLeaders: info.profitLeaders,
        };
        infoList.push(obj);
      }
    },
    //跳转到打印界面
    goPrintView() {
      this.$router.push({ path: "/secondHandDealPrint", query: {} });
    },
  },
  filters: {
    //合作方式文本
    getText(val = "", arrName) {
      if (val == "") return "--";
      let num = Number(val);
      let cooperationTypeArr = ["跨市合作", "市内合作", "区内合作"];
      let propertyTypeArr = ["商品", "小产权房", "军产房"];
      let obj = {
        cooperationTypeArr,
        propertyTypeArr,
      };
      return obj[arrName][num - 1];
    },
    //时间格式
    formatTime(val) {
      if (val != "" && val != undefined) {
        return val.split(" ")[0];
      } else {
        return "--";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.basic-information {
  position: relative;
  width: 100%;
  height: 100%;
  & > .top-box {
    width: 100%;
    height: 100%;
    padding: 0.1rem;
    box-sizing: border-box;
    background-color: #eff4f9;
    overflow: auto;
    & > .basic-box {
      width: 100%;
      height: auto;
      padding: 0 0.09rem;
      box-sizing: border-box;
      background-color: #fafafa;
      & > .b-top {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        & > .b-t-left {
          width: auto;
          height: 100%;
          & > div {
            &:nth-child(1) {
              margin-top: 0.11rem;
              line-height: 1;
              color: #444444;
              font-size: 0.18rem;
              font-weight: bold;
            }
            &:nth-child(2) {
              display: flex;
              align-items: center;
              margin-top: 0.09rem;
              & > div {
                width: auto;
                height: 0.19rem;
                line-height: 0.19rem;
                padding: 0 0.04rem;
                box-sizing: border-box;
                font-size: 0.12rem;
                margin-right: 0.06rem;
                &:last-child {
                  margin-right: 0;
                }
                &.active {
                  border: solid 0.01rem #259cf3;
                  color: #259cf3;
                }
                &.normal {
                  border: solid 0.01rem #bbbbbb;
                  color: #bbbbbb;
                }
              }
            }
          }
        }
        & > .b-t-right {
          color: #999999;
          font-size: 0.12rem;
          font-family: MicrosoftYaHei;
          // & > span {
          //   &:nth-child(1) {
          //     font-weight: bold;
          //     font-size: 0.2rem;
          //   }
          //   &:nth-child(2) {
          //     font-weight: bold;
          //   }
          //   &:nth-child(3) {
          //     font-size: 0.16rem;
          //   }
          // }
        }
      }
    }
    .property_title{
      font-size: 0.14rem;
      color: #666666 !important;
      font-family: 'MicrosoftYaHei';
      margin-top: 0.1rem;
      // font-weight: bold;
    }
    & > .house-information {
      position: relative;
      width: 100%;
      height: auto;
      margin-top: 0.07rem;
      background-color: #fafafa;
    }
    & > .customer-information {
      width: 100%;
      height: auto;
      margin-top: 0.07rem;
      background-color: #fafafa;
    }
    & > .performance-information {
      width: 100%;
      height: auto;
      margin-top: 0.07rem;
      background-color: #fafafa;
      & > .p-i-title {
        width: 100%;
        line-height: 1;
        margin-top: 0.2rem;
        color: #444444;
        font-size: 0.12rem;
        font-weight: bold;
        text-indent: 0.26rem;
      }
      & > .p-i-num {
        width: 100%;
        height: 0.3rem;
        margin-top: 0.05rem;
        padding-left: 0.26rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        & > div {
          line-height: 1;
          color: #444444;
          font-size: 0.12rem;
          font-weight: bold;
          margin-right: 0.3rem;
          &:last-child {
            margin-right: 0;
          }
          & > span {
            color: #f57107;
          }
        }
      }
      /deep/ .el-table {
        width: calc(~"100% - 0.22rem");
        margin: 0 auto;
        .has-gutter {
          tr,
          th {
            background-color: #ebeef0;
          }
        }
      }
      /deep/ .el-table--small {
        td,
        th {
          height: 0.23rem;
          padding: 0.06rem 0;
          border-bottom: 0.01rem solid #eaeaea;
        }
      }
    }
    .t-b-content {
      width: 100%;
      height: auto;
      padding: 0.03rem 0.09rem 0.14rem;
      box-sizing: border-box;
      overflow: hidden;
      & > .item {
        width: 33.3%;
        height: auto;
        display: inline-flex;
        align-items: center;
        margin-top: 0.14rem;
        & > div {
          &:nth-child(1) {
            width: 0.8rem;
            line-height: 1;
            color: #999999;
            font-size: 0.12rem;
            text-align: right;
          }
          &:nth-child(2) {
            width: calc(~"100% - 0.8rem");
            color: #444444;
            height: 0.14rem;
            line-height: 0.14rem;
            font-size: 0.14rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        &.item-left {
          & > div {
            &:nth-child(1) {
              width: 0.6rem;
              text-align: left;
            }
            &:nth-child(2) {
              width: calc(~"100% - 0.6rem");
            }
          }
        }
        &.item-2 {
          & > div {
            &:nth-child(1) {
              width: auto;
              min-width: 0.74rem;
            }
            &:nth-child(2) {
              width: auto;
            }
          }
        }
        &.all-item {
          width: 100%;
        }
        &.item-3 {
          width: 66.66%;
        }
      }
    }
    .t-b-content-other {
      position: relative;
      width: 100%;
      height: auto;
      padding: 0.03rem 0.09rem 0.14rem;
      box-sizing: border-box;
      overflow: hidden;
      & > .item {
        width: 50%;
        height: auto;
        display: inline-flex;
        align-items: center;
        margin-top: 0.14rem;
        &.all-item {
          width: 100%;
        }
        &.area_floor {
          & > div:nth-child(1) {
            width: 1.6rem !important;
          }
        }
        & > div {
          &:nth-child(1) {
            width: 0.9rem;
            line-height: 1;
            color: #999999;
            font-size: 0.12rem;
            text-align: right;
          }
          &:nth-child(2) {
            width: calc(~"100% - 0.9rem");
            color: #444444;
            height: 0.14rem;
            line-height: 0.14rem;
            font-size: 0.14rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        &.item-left {
          & > div {
            &:nth-child(1) {
              width: 0.6rem;
              text-align: left;
            }
            &:nth-child(2) {
              width: calc(~"100% - 0.6rem");
            }
          }
        }
      }
    }
    .t-b-title {
      color: #444444;
      font-size: 0.14rem;
      font-weight: bold;
      height: 0.3rem;
      line-height: 0.3rem;
      text-indent: 0.11rem;
      border-bottom: 0.01rem solid #ededed;
    }
    .look-view-btn {
      position: absolute;
      top: 0;
      right: 0.18rem;
      width: auto;
      height: 0.3rem;
      line-height: 0.3rem;
      color: #259cf3;
      font-size: 0.12rem;
      cursor: pointer;
    }
  }
  & > .bottom-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.5rem;
    padding: 0 0.16rem 0 0.21rem;
    box-sizing: border-box;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > .normal {
      line-height: 1;
      color: #999999;
      font-size: 0.12rem;
    }
    & > .dayin-btn {
      width: 0.62rem;
      height: 0.27rem;
      line-height: 0.27rem;
      text-align: center;
      background-color: #ffffff;
      border-radius: 0.03rem;
      border: 0.01rem solid #259cf3;
      color: #259cf3;
      font-size: 0.12rem;
      cursor: pointer;
    }
  }
}
.roomType {
  width: 2rem !important;
}

.performance_info {
  margin-top: 0.07rem;
  background-color: #fafafa;
  width: 100%;
  overflow-x: hidden;
  .performance-title {
    color: #444444;
    font-size: 0.14rem;
    font-weight: bold;
    height: 0.3rem;
    line-height: 0.3rem;
    border-bottom: 0.01rem solid #ededed;
    background-color: #fafafa;
  }
  main {
    padding: 0.1rem;
    padding-top: 0;
    background-color: #fafafa;
    section {
      &:nth-of-type(1) {
        .total_tips {
          text-indent: 0.15rem;
          margin-top: 0.2rem;
        }
        .table {
          margin-top: 0.15rem;
          width: 5.4rem;
          .row {
            height: 0.49rem;
            line-height: 0.49rem;
            display: flex;
            border-bottom: solid 0.01rem #eaeaea;
            &.head {
              background-color: #efefef;
              color: #999999;
              height: 0.3rem;
              border-bottom: none;
              & > .col {
                line-height: 0.3rem;
              }
            }
            .operation {
              color: #259cf3;
            }
            .col {
              height: 100%;
              line-height: 0.49rem;
              &:nth-of-type(1) {
                width: 0.81rem;
                text-indent: 0.16rem;
              }
              &:nth-of-type(2) {
                width: 1.74rem;
              }
              &:nth-of-type(3) {
                width: 1.27rem;
              }
              &:nth-of-type(4) {
                width: 1.11rem;
              }
              &:nth-of-type(5) {
                width: 0.54rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
