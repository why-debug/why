<template>
  <div class="basic-information">
    <div class="top-box">
      <!-- 基本信息 -->
      <div class="basic-box">
        <div class="b-top">
          <div class="b-t-left">
            <div>{{ intentionDetail.projectName || "--" }}</div>
            <div></div>
          </div>
        </div>
      </div>
      <!-- 项目信息 -->
      <div class="house-information">
        <!-- <div class="look-view-btn">查看 &gt;</div> -->
        <div class="t-b-title">项目信息</div>
        <div class="t-b-content">
          <div class="item item-1 item-left">
            <div>类型：</div>
            <div>{{ intentionDetail.projectType || "--" }}</div>
          </div>
          <div class="item item-1">
            <div>制单人：</div>
            <div>{{ intentionDetail.makeSheetPerson || "--" }}</div>
          </div>
          <div class="item item-1">
            <div>制单日期：</div>
            <div>{{ intentionDetail.makeSheetDate || "--" }}</div>
          </div>
          <div class="item item-1 item-left">
            <div>类别：</div>
            <div>
              {{ intentionDetail.projectClass || "--" }}
            </div>
          </div>
          <div class="item item-1">
            <div>合作方式：</div>
            <div>{{ intentionDetail.dealWay || "--" }}</div>
          </div>
          <div class="item item-1">
            <div>编号：</div>
            <div>{{ intentionDetail.projectNumber || "--" }}</div>
          </div>
          <div class="item item-1 item-left">
            <div>项目：</div>
            <div>{{ intentionDetail.projectName || "--" }}</div>
          </div>
          <div class="item item-3">
            <div></div>
            <div></div>
          </div>
          <div class="item item-1 item-left">
            <div>物业信息：</div>
            <div>
              {{ intentionDetail.propertyInfo || "--" }}
            </div>
          </div>
          <div class="item item-1">
            <div>片 区：</div>
            <div>{{ intentionDetail.projectArea || "--" }}</div>
          </div>
          <div class="item item-1">
            <div>用 途：</div>
            <div>{{ intentionDetail.projectUseage || "--" }}</div>
          </div>
          <div class="item item-1 item-left">
            <div>户 型：</div>
            <div>{{ intentionDetail.houseType || "--" }}</div>
          </div>
          <div class="item item-3s">
            <div>建筑面积：</div>
            <div>{{ intentionDetail.buildArea || "--" }}</div>
          </div>
          <div class="item item-3s">
            <div>套内面积：</div>
            <div>{{ intentionDetail.houseInnerArea || "--" }}</div>
          </div>
        </div>
      </div>

      <!-- 客户信息 -->
      <div class="customer-information">
        <div class="t-b-title">客户信息</div>
        <div class="t-b-content-other">
          <!-- <div class="look-view-btn">查看 &gt;</div> -->
          <div class="item item-left">
            <div>成交部门：</div>
            <div>{{intentionDetail.dealUserOrganizationName || '--'}}</div>
          </div>
          <div class="item">
            <div>成交人员：</div>
            <div>{{intentionDetail.dealUserName || '--'}}</div>
          </div>
          <div class="item item-left">
            <div>分销公司：</div>
            <div>{{intentionDetail.projectType || '--'}}</div>
          </div>
          <div class="item">
            <div></div>
            <div></div>
          </div>
          <div class="item item-left">
            <div>客户来源：</div>
            <div>{{intentionDetail.projectType || '--'}}</div>
          </div>
          <div class="item">
            <div>客户姓名：</div>
            <div>
             {{intentionDetail.projectType || '--'}}
            </div>
          </div>
          <div class="item item-left">
            <div>地 域：</div>
            <div>{{intentionDetail.projectType || '--'}}</div>
          </div>
          <div class="item">
            <div>证 件 号：</div>
            <div>
              {{intentionDetail.projectType || '--'}}
            </div>
          </div>
          <div class="item item-left">
            <div>电 话：</div>
            <div>{{intentionDetail.projectType || '--'}}</div>
          </div>
          <div class="item">
            <div>产权比例：</div>
            <div>{{intentionDetail.projectType || '--'}}</div>
          </div>
          <div class="item item-left all-item">
            <div>地 址：</div>
            <div>{{intentionDetail.projectType || '--'}}</div>
          </div>
          <div class="item item-left all-item area_floor">
            <div>所属小区、楼栋、楼层：</div>
            <div>{{intentionDetail.projectType || '--'}}</div>
          </div>
          <div class="item item-left all-item">
            <div>备 注：</div>
            <div>{{intentionDetail.projectType || '--'}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import section_title from "./section_title";
import subtitle from "./subtitle";
import data_table from "./data_table";
import { IntentionDetailInfo } from "../../../../../net/newHouseIntentionSheet/intentionSheet/intentionDetail";

export default {
  data() {
    return {
      intentionDetail: new IntentionDetailInfo(), //详情参数
    };
  },
  components: {
    section_title,
    subtitle,
    data_table,
  },
  props: {
    projectDetailInfo: {
      type: Object,
      default() {
        return new IntentionDetailInfo();
      },
    },
  },
  watch: {
    projectDetailInfo: {
      handler: function(newVal, oldVal) {
        this.intentionDetail = newVal;
      },
      deep: true,
    },
  },
  created() {
    this.intentionDetail = this.projectDetailInfo;
    console.log(this.intentionDetail, "二手成交报告详情");
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
          color: #ff8002;
          font-size: 0.12rem;
          & > span {
            &:nth-child(1) {
              font-weight: bold;
              font-size: 0.2rem;
            }
            &:nth-child(2) {
              font-weight: bold;
            }
            &:nth-child(3) {
              font-size: 0.16rem;
            }
          }
        }
      }
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
