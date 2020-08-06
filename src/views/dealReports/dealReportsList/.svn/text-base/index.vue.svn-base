<template>
  <div class="deal-reports-list">
    <div class="d-r-l-top">
      <div class="left">
        <div
          v-for="(item, index) in tabList"
          :key="index"
          :class="{'active': index === tabActive}"
          @click="changeTab(index)"
        >{{item.name}}({{item.num}})</div>
      </div>
      <div class="right">
        <div class="normal-btn">
          <img src="../../../assets/images/public/edit_200.png" alt />
          <span>新增合同</span>
        </div>
        <div class="normal-btn">
          <img src="../../../assets/images/public/400_setting.png" alt />
          <span>管理配置</span>
        </div>
        <div class="normal-btn">
          <img src="../../../assets/images/public/copy.png" alt />
          <span>批量审批</span>
        </div>
        <div class="normal-btn">
          <img src="../../../assets/images/public/copy.png" alt />
          <span>批量反审批</span>
        </div>
        <div class="normal-btn">
          <img src="../../../assets/images/public/u_Export.png" alt />
          <span>导出</span>
        </div>
        <div class="search-btn">
          <el-input class="search-btn-input" placeholder="请输入合同相关信息" suffix-icon="el-icon-search"></el-input>
        </div>
        <div class="page-box">
          <div class="normal">&lt;</div>
          <div class="normal">&gt;</div>
          <input type="text" class="input-box" />
          <div class="normal">GO</div>
          <div class="num">共1页，3条</div>
        </div>
        <div class="change-box">
          <div class="broad-btn" :class="!narrowListShow?'active':''" @click="narrowListShow=false"></div>
          <div class="narrow-btn" :class="narrowListShow?'active':''" @click="narrowListShow=true"></div>
        </div>
      </div>
    </div>

    <div class="d-r-l-content" v-if="list.length !== 0 && !isLoading">
      <!-- 宽列表 -->
      <div class="broad-list" v-show="!narrowListShow">
        <div class="broad-item" v-for="(item, index) in list" :key="index" @dblclick="showDetail()">
          <div class="check-info-box">
            <div class="check-input">
              <check-box-only
                :value="'1'"
                @sendData="(val) => checkChange(val, index)"
                :selecteValue="item.isChecked"
              ></check-box-only>
            </div>
            <div class="information">
              <div>
                <div>保利康桥4栋2单元1205号</div>
                <div>出售</div>
                <div>[CS：102356]</div>
              </div>
              <div>3室 107㎡</div>
              <div>
                <div>2019.11.26 签约</div>
                <div>已审核</div>
                <div>未收佣</div>
                <div>未受理</div>
                <div>SDFH1225410</div>
              </div>
              <div>
                <span>106万</span>成交 上报业绩：18000元 扣合作费：760元
              </div>
            </div>
          </div>

          <div class="people-box">
            <div class="p-b-item">
              <div>
                <div>张先生</div>
                <div>业主</div>
              </div>
              <div>应收：2300元 实收：2300元</div>
            </div>
            <div class="p-b-item">
              <div>
                <div>张先生</div>
                <div>客户</div>
                <div>177 2532 5648</div>
              </div>
              <div>应收：2300元 实收：2300元</div>
            </div>
          </div>
          <div class="status-box">
            <div class="status-blue">已减佣</div>
            <div class="status-yellow">有投诉</div>
            <div class="status-gray">拆单中</div>
            <div class="status-golden">有纠纷</div>
          </div>

          <div class="contact-box">
            <div class="top">
              <div class="top-item">
                <div class="top-tt">成交人</div>
                <div class="top-info">
                  <div class="t-i-left">
                    <img src="../../../assets/images/public/avatar.jpg" alt />
                  </div>
                  <div class="t-i-right">
                    <div class="name-box">
                      <div class="user-name">王小丫</div>
                      <div class="user-num">T6520034</div>
                      <img src="../../../assets/images/public/chat.png" alt />
                    </div>
                    <div class="dept-box">
                      <div class="dept-name">红星路房产店</div>
                      <div class="dept-num">SZ165200</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="top-item">
                <div class="top-tt">制单人</div>
                <div class="top-info">
                  <div class="t-i-left">
                    <img src="../../../assets/images/public/avatar.jpg" alt />
                  </div>
                  <div class="t-i-right">
                    <div class="name-box">
                      <div class="user-name">王小丫</div>
                      <div class="user-num">T6520034</div>
                      <img src="../../../assets/images/public/chat.png" alt />
                    </div>
                    <div class="dept-box">
                      <div class="dept-name">红星路房产店</div>
                      <div class="dept-num">SZ165200</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bottom">
              <div class="b-item">
                <img src="../../../assets/images/public/caiwu_icon.png" alt />
                <div>财务收付</div>
              </div>
              <div class="b-item">
                <img src="../../../assets/images/public/caiwu_icon.png" alt />
                <div>操作日志</div>
              </div>
              <div class="b-item">
                <img src="../../../assets/images/public/customer_icon.png" alt />
                <div>客户关系</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 窄列表 -->
      <div class="narrow-list" v-show="narrowListShow">
        <div class="narrow-nav narrow-item">
          <div
            class="narrow-item-tb"
            v-for="(item, index) in narrowNavList"
            :key="index"
          >{{item.name}}</div>
        </div>
        <div
          class="narrow-item"
          v-for="(listItem, listIndex) in list"
          :key="listIndex"
          @dblclick="showDetail()"
        >
          <div
            class="narrow-item-tb"
            v-for="(item, index) in narrowNavList"
            :key="index"
          >{{listItem[item.name] || '--'}}</div>
        </div>
      </div>
    </div>

    <no-data v-if="list.length === 0 && !isLoading" style="height: 4rem;"></no-data>

    <!-- 二手房详情弹窗 -->
    <erShouDealReportDetail :isShow.sync="isShowDetail"></erShouDealReportDetail>
  </div>
</template>

<script>
import {
  getMlDealListRequest,
  getMlDealListItem,
  getMlDealList
} from "@/net/dealReports/dealReportsList.js";

import checkBoxOnly from "@/views/dealReports/erShouDealReports/components/checkBoxOnly.vue";
import erShouDealReportDetail from "@/views/dealReports/erShouDealReports/erShouDealReportDetail/index.vue";
import noData from "@/views/dealReports/erShouDealReports/components/noData.vue";

export default {
  data() {
    return {
      isLoading: true,
      tabActive: 0,
      paramsObj: new getMlDealListRequest(), // 请求参数
      tabList: [
        { name: "售单", value: "", num: 89 },
        { name: "租单", value: "", num: 62 },
        { name: "二手合作", value: "", num: 89 },
        { name: "新房售", value: "", num: 32 },
        { name: "新房租", value: "", num: 27 },
        { name: "新房合作", value: "", num: 14 }
      ],
      isShowDetail: false,
      list: [],
      narrowListShow: true, //展示宅列表
      //宅列表字段
      narrowNavList: [
        { name: "状态", key: "" },
        { name: "交易状态", key: "" },
        { name: "成交类型", key: "" },
        { name: "成交报告编号", key: "" },
        { name: "主单号", key: "" },
        { name: "类别", key: "" },
        { name: "物业名称", key: "" },
        { name: "成交日期", key: "" },
        { name: "合作方式", key: "" },
        { name: "客户", key: "" },
        { name: "业主", key: "" },
        { name: "成交组别", key: "" },
        { name: "成交人员", key: "" },
        { name: "收佣状态", key: "" },
        { name: "过户状态", key: "" },
        { name: "合同编号", key: "" },
        { name: "成交总价", key: "" },
        { name: "业主佣金", key: "" },
        { name: "客户佣金", key: "" },
        { name: "建筑面积", key: "" },
        { name: "扣合作费", key: "" },
        { name: "关联盘源", key: "" },
        { name: "意向单编号", key: "" },
        { name: "制单人", key: "" },
        { name: "制单日期", key: "" },
        { name: "关联盘源", key: "" }
      ]
    };
  },
  components: {
    checkBoxOnly,
    erShouDealReportDetail,
    noData
  },
  created() {
    this.initData();
  },
  methods: {
    // 获取列表
    async initData() {
      this.isLoading = true;
      // let data = await new getMlDealList(this.paramsObj).send()
      // console.log(data, '列表')
      // this.list = data
      this.isLoading = false;
      for (let index = 0; index < 30; index++) {
        this.list.push(new getMlDealListItem());
      }
    },
    // 切换tab
    changeTab(index) {
      this.tabActive = index;
    },
    // check状态改变
    checkChange(value, index) {
      this.list[index].isChecked = value;
    },
    // 查看详情
    showDetail() {
      this.isShowDetail = true;
    }
  }
};
</script>

<style lang="less" scoped>
@baseHeight: 0.3rem;
@borderColor: #d8e2e7;

.deal-reports-list {
  width: 100%;
  min-width: 14.4rem;
  height: calc(~"100% - 0.33rem");
  .d-r-l-top {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #efefef;
    border: 0.01rem solid #cecece;
    padding: 0 0.06rem;
    box-sizing: border-box;
    & > .left {
      display: flex;
      height: 0.4rem;
      align-items: flex-end;
      & > div {
        width: 0.8rem;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        color: #999999;
        border: 0.01rem solid #cecece;
        border-bottom: 0.01rem solid #efefef;
        margin-left: 0.08rem;
        cursor: pointer;
        &.active {
          height: 0.31rem;
          line-height: 0.31rem;
          color: #000000;
          border-bottom: 0.01rem solid #ffffff;
          background-color: #ffffff;
          margin-bottom: -0.01rem;
        }
      }
    }
    & > .right {
      display: flex;
      align-items: center;
      white-space: nowrap;
      & > .normal-btn {
        display: flex;
        align-items: center;
        margin-right: 0.15rem;
        cursor: pointer;
        & > img {
          width: auto;
          height: auto;
          max-height: 0.13rem;
          display: block;
          margin-right: 0.08rem;
        }
        & > span {
          font-size: 0.12rem;
          color: #259cf3;
        }
      }
      & > .search-btn {
        width: 1.77rem;
        /deep/ .search-btn-input {
          font-size: 0.12rem;
          .el-input__inner {
            height: 0.24rem;
            line-height: 0.24rem;
            padding-right: 0.3rem;
            border-radius: 0.1rem;
          }
          .el-input__icon {
            height: 0.24rem;
            line-height: 0.24rem;
          }
        }
      }
      & > .page-box {
        display: flex;
        align-items: center;
        margin-left: 0.08rem;
        margin-right: 0.1rem;
        & > .normal {
          font-family: "宋体";
          width: 0.2rem;
          height: 0.2rem;
          line-height: 0.2rem;
          text-align: center;
          font-size: 0.12rem;
          color: #bbbbbb;
          background-color: #e0e0e0;
          border-radius: 0.04rem;
          margin-right: 0.08rem;
          cursor: pointer;
          &:hover {
            background-color: #259cf3;
            color: #ffffff;
          }
        }
        & > .input-box {
          width: 0.35rem;
          height: 0.2rem;
          border-radius: 0.04rem;
          margin-right: 0.08rem;
          border: none;
          text-align: center;
          font-size: 0.12rem;
        }
        & > .num {
          font-size: 0.12rem;
          color: #999999;
        }
      }
      & > .change-box {
        display: flex;
        align-items: center;
        & > div {
          position: relative;
          cursor: pointer;
          width: 0.29rem;
          height: 0.22rem;
          flex: 1;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          &.broad-btn {
            background-image: url("../../../assets/images/public/table_width_icon_200.png");
          }
          &.broad-btn.active {
            background-image: url("../../../assets/images/public/table_width_icon_clicked_200.png");
          }
          &.narrow-btn {
            background-image: url("../../../assets/images/public/table_narr_icon_200.png");
          }
          &.narrow-btn.active {
            background-image: url("../../../assets/images/public/table_narr_icon_clicked_200.png");
          }
        }
      }
    }
  }
  .d-r-l-content {
    width: 100%;
    height: calc(~"100% - 0.5rem");
    background-color: #edf3fb;
    overflow: auto;
    /* 宽列表样式 */
    .broad-list {
      & > .broad-item {
        width: 100%;
        height: 1.24rem;
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #ffffff;
        overflow: hidden;
        & > .check-info-box {
          display: flex;
          & > .check-input {
            width: 0.35rem;
            height: auto;
            margin-top: 0.06rem;
            margin-right: 0.02rem;
            display: flex;
            justify-content: center;
            // align-items: center;
            align-self: flex-start;
            & > .base-check-box {
              margin-right: 0;
            }
          }

          & > .information {
            width: 4.4rem;
            height: auto;

            & > div {
              display: flex;
              align-items: center;
              &:nth-child(1) {
                display: flex;
                & > div {
                  &:nth-child(1) {
                    width: 2.1rem;
                    height: auto;
                    margin-right: 0.07rem;
                    color: #000000;
                    font-size: 0.18rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  &:nth-child(2) {
                    width: 0.29rem;
                    height: 0.18rem;
                    margin-right: 0.1rem;
                    line-height: 0.18rem;
                    text-align: center;
                    background-color: #259cf3;
                    color: #ffffff;
                    font-size: 0.12rem;
                  }
                  &:nth-child(3) {
                    line-height: 1;
                    color: #999999;
                    font-size: 0.12rem;
                  }
                }
              }
              &:nth-child(2) {
                margin-top: 0.06rem;
                line-height: 1;
                color: #999999;
                font-size: 0.14rem;
              }
              &:nth-child(3) {
                width: 100%;
                height: 0.18rem;
                margin-top: 0.09rem;
                display: flex;
                align-items: center;
                overflow: hidden;
                & > div {
                  width: auto;
                  height: 100%;
                  line-height: 0.18rem;
                  background-color: rgba(51, 150, 251, 0.1);
                  border-radius: 0.02rem;
                  color: #3396fb;
                  font-size: 0.12rem;
                  margin-right: 0.06rem;
                  padding: 0 0.04rem;
                  box-sizing: border-box;
                  &:last-child {
                    margin-right: 0;
                  }
                }
              }
              &:nth-child(4) {
                margin-top: 0.13rem;
                color: #666666;
                font-size: 0.12rem;
                span {
                  color: #ff7f66;
                }
              }
            }
          }
        }

        & > .people-box {
          width: 1.8rem;
          height: auto;
          & > .p-b-item {
            width: 100%;
            height: auto;
            &:nth-child(n + 2) {
              margin-top: 0.18rem;
            }
            & > div {
              &:nth-child(1) {
                width: 100%;
                height: auto;
                display: flex;
                align-items: center;
                & > div {
                  &:nth-child(1) {
                    line-height: 1;
                    color: #000000;
                    font-size: 0.16rem;
                    margin-right: 0.04rem;
                  }
                  &:nth-child(2) {
                    width: 0.33rem;
                    height: 0.17rem;
                    line-height: 0.17rem;
                    text-align: center;
                    background-color: #f2f5f8;
                    border-radius: 0.02rem;
                    color: #677a94;
                    font-size: 0.12rem;
                  }
                  &:nth-child(3) {
                    margin-left: 0.07rem;
                    line-height: 1;
                    color: #999999;
                    font-size: 0.12rem;
                  }
                }
              }
              &:nth-child(2) {
                margin-top: 0.07rem;
                color: #999999;
                font-size: 0.12rem;
              }
            }
          }
        }
        & > .status-box {
          width: 0.6rem;
          height: auto;
          & > div {
            font-size: 0.14rem;
            line-height: 1;
            &:nth-child(n + 2) {
              margin-top: 0.12rem;
            }
            &.status-blue {
              color: #259cf3;
            }
            &.status-yellow {
              color: #f3582d;
            }
            &.status-gray {
              color: #999999;
            }
            &.status-golden {
              color: #ffa200;
            }
          }
        }
        & > .step-box {
          width: 4rem;
          height: auto;
          & > .num-box {
            width: 100%;
            height: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: space-around;
            & > div {
              position: relative;
              width: 0.2rem;
              height: 0.2rem;
              line-height: 0.2rem;
              text-align: center;
              font-size: 0.14rem;
              color: #fefefe;
              background-color: #e2e2e2;
              border-radius: 50%;
              // cursor: pointer;
              &::after {
                content: "";
                position: absolute;
                top: 0.1rem;
                left: 0.24rem;
                width: 0.52rem;
                height: 0.01rem;
                background-color: #d8dade;
              }
              &.active {
                background-color: #3396fb;
                &::after {
                  background-color: #3396fb;
                }
              }
              &:last-child {
                &::after {
                  display: none;
                }
              }
            }
          }
          & > .s-b-bottom {
            width: 100%;
            height: auto;
            margin-top: 0.1rem;
            display: flex;
            align-items: center;
            & > div {
              width: 0.8rem;
              height: auto;
              & > div {
                width: 100%;
                text-align: center;
                &:nth-child(1) {
                  height: 0.14rem;
                  line-height: 0.14rem;
                  color: #444444;
                  font-size: 0.14rem;
                }
                &:nth-child(2) {
                  margin-top: 0.08rem;
                  line-height: 1;
                  color: #999999;
                  font-size: 0.12rem;
                }
              }
            }
          }
        }
        & > .contact-box {
          height: auto;
          margin-right: 0.1rem;
          & > .top {
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            & > .top-item {
              padding-right: 0.36rem;
              & > .top-tt {
                line-height: 1;
                font-size: 0.12rem;
                color: #999999;
              }
              & > .top-info {
                margin-top: 0.13rem;
                display: flex;
                align-items: center;
                & > .t-i-left {
                  width: 0.28rem;
                  height: 0.28rem;
                  border: solid 0.02rem #ffffff;
                  border-radius: 50%;
                  overflow: hidden;
                  & > img {
                    width: 100%;
                    height: auto;
                    display: block;
                  }
                }
                & > .t-i-right {
                  margin-left: 0.1rem;
                  & > .name-box {
                    display: flex;
                    align-items: center;
                    & > .user-name {
                      font-size: 0.12rem;
                      color: #333333;
                    }
                    & > .user-num {
                      margin-left: 0.07rem;
                      color: #bbbbbb;
                      font-size: 0.12rem;
                    }
                    & > img {
                      width: 0.14rem;
                      height: 0.14rem;
                      margin-left: 0.1rem;
                      cursor: pointer;
                    }
                  }
                  & > .dept-box {
                    display: flex;
                    font-size: 0.12rem;
                    margin-top: 0.03rem;
                    & > .dept-name {
                      color: #999999;
                    }
                    & > .dept-num {
                      color: #bbbbbb;
                      margin-left: 0.11rem;
                    }
                  }
                }
              }
            }
          }
          & > .bottom {
            width: 100%;
            height: auto;
            margin-top: 0.23rem;
            display: flex;
            align-items: center;
            & > .b-item {
              display: flex;
              align-items: center;
              margin-right: 0.15rem;
              & > img {
                width: auto;
                height: 0.14rem;
                margin-right: 0.04rem;
              }
              & > div {
                line-height: 1;
                color: #25b6ed;
                font-size: 0.12rem;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

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
  }
}
</style>
