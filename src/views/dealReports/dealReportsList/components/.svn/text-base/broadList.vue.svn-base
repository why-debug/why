<template>
  <!-- 宽列表 -->
  <div class="broad-list">
    <!-- 二手房 字段 -->
    <template v-if="listType == 1">
      <div
        class="broad-item"
        v-for="(item, index) in listData"
        :key="index"
        @dblclick="showDetail(item)"
      >
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
              <div class="title">{{ item.buildName }}</div>
              <div class="tag">{{ item.dealTypeCn }}</div>
              <div class="tag">{{ item.cooperationCn }}</div>
              <div class="noText">[{{ item.dealHouseNo }}]</div>
            </div>
            <div>
              {{ item.houseRoom || "-" }}室 {{ item.houseArea || "-" }}㎡
              <!-- 成交报告编号 -->
              <span class="noText" v-if="item.dealNo">{{ item.dealNo }}</span>
              <!-- 意向单编号 -->
              <!-- <span class="noText" ></span> -->
              <!-- 合同编号 -->
              <!-- <span class="noText" ></span> -->
            </div>
            <div>
              <div>{{ item.dealDate }} 成交</div>
              <!-- <div>已审核</div> -->
              <div v-if="item.cooperationTypeCn">
                {{ item.cooperationTypeCn }}
              </div>
              <!-- <div>未收佣</div> -->
              <!-- <div>未受理</div> -->
              <!-- <div>合同编号</div> -->
            </div>
            <div>
              <span>{{ hasOldSeeAuth ? item.dealPriceCn : "****" }}</span
              >成交 上报业绩：{{ item.reportCash || "-" }}元 扣合作费：{{
                hasOldSeeAuth ? item.cooperationCostCn : "****"
              }}
            </div>
          </div>
        </div>

        <div class="people-box">
          <div class="p-b-item">
            <div>
              <div>{{ item.sellName || "-" }}</div>
              <div>业主</div>
            </div>
            <div>应收：-元 实收：-元</div>
          </div>
          <div class="p-b-item">
            <div>
              <div>{{ item.buyName || "-" }}</div>
              <div>客户</div>
              <!-- <div>177 2532 5648</div> -->
            </div>
            <div>应收：-元 实收：-元</div>
          </div>
        </div>

        <!-- 3.0暂时没有这些状态 -->
        <div class="status-box">
          <!-- <div class="status-blue">已减佣</div>
            <div class="status-yellow">有投诉</div>
            <div class="status-gray">拆单中</div>
            <div class="status-golden">有纠纷</div> -->
        </div>

        <div class="contact-box">
          <div class="top">
            <div class="top-item">
              <div class="top-tt">成交人</div>
              <div class="top-info">
                <div class="t-i-left">
                  <img src="../../../../assets/images/public/avatar.jpg" alt />
                </div>
                <div class="t-i-right">
                  <div class="name-box">
                    <div class="user-name">{{ item.userName || "-" }}</div>
                    <div class="user-num" :title="item.userNo || '-'">{{ item.userNo || "-" }}</div>
                    <!-- <img src="../../../../assets/images/public/chat.png" alt /> //3.0暂不做-->
                    <img src="" alt />
                  </div>
                  <div class="dept-box">
                    <div class="dept-name">{{ item.orgName || "-" }}</div>
                    <div class="dept-num">{{ item.orgNo || "-" }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="top-item">
              <div class="top-tt">制单人</div>
              <div class="top-info">
                <div class="t-i-left">
                  <img src="../../../../assets/images/public/avatar.jpg" alt />
                </div>
                <div class="t-i-right">
                  <div class="name-box">
                    <div class="user-name">{{ item.createUName || "-" }}</div>
                    <div class="user-num">{{ item.createUNo || "-" }}</div>
                    <!-- <img src="../../../../assets/images/public/chat.png" alt /> 3.0暂不做-->
                    <img src="" alt />
                  </div>
                  <div class="dept-box">
                    <div class="dept-name">{{ item.createOrgName || "-" }}</div>
                    <div class="dept-num">{{ item.createOrgNo || "-" }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bottom">
            <!-- <div class="b-item">
                <img src="../../../../assets/images/public/caiwu_icon.png" alt />
                <div>财务收付</div>
              </div>
              <div class="b-item">
                <img src="../../../../assets/images/public/caiwu_icon.png" alt />
                <div>操作日志</div>
              </div>
              <div class="b-item">
                <img src="../../../../assets/images/public/customer_icon.png" alt />
                <div>客户关系</div>
              </div> -->
          </div>
        </div>
      </div>
    </template>

    <!-- 新房 字段 -->
    <template v-else>
      <div
        class="broad-item"
        v-for="(item, index) in listData"
        :key="index"
        @dblclick="showDetail(item)"
      >
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
              <div class="title">{{ item.buildName }}</div>
              <div v-if="item.reportTypeCn" class="tag">
                {{ item.reportTypeCn }}
              </div>
              <!-- <div class="tag">{{item.cooperationCn}}</div> -->
              <div v-if="item.buildId" class="noText">[{{ item.buildId }}]</div>
            </div>
            <div>
              {{ item.buildRoom || "-" }}室 {{ item.buildArea || "-" }}㎡
              <!-- 成交报告编号 -->
              <span class="noText" v-if="item.reportNo">{{
                item.reportNo
              }}</span>
              <!-- 意向单编号 -->
              <!-- <span class="noText" ></span> -->
              <!-- 合同编号 -->
              <!-- <span class="noText" ></span> -->
            </div>
            <div>
              <div>{{ item.dealTimeFormate }} 成交</div>
              <!-- <div>已审核</div> -->
              <div v-if="item.cooperationTypeCn">
                {{ item.cooperationTypeCn }}
              </div>
              <!-- <div>未收佣</div> -->
              <!-- <div>未受理</div> -->
              <!-- <div>合同编号</div> -->
            </div>
            <div>
              <span>{{ hasNewBuildSeeAuth ? item.offerAmountCn : "****" }}</span
              >成交 上报业绩：{{ item.reportCash || "-" }}元 扣合作费：{{
                item.cooperationfeeCn
              }}
            </div>
          </div>
        </div>

        <div class="people-box">
          <div class="p-b-item">
            <div>
              <div>{{ item.agentName || "-" }}</div>
              <div>代理商</div>
            </div>
            <!-- <div>应收：-元 实收：-元</div> 3.0暂不做-->
            <div></div>
          </div>
          <div class="p-b-item">
            <div>
              <div>{{ item.custName || "-" }}</div>
              <div>客户</div>
              <!-- <div>177 2532 5648</div> -->
            </div>
            <!-- <div>应收：-元 实收：-元</div>3.0暂不做 -->
            <div></div>
          </div>
        </div>

        <!-- 3.0暂时没有这些状态 -->
        <div class="status-box">
          <!-- <div class="status-blue">已减佣</div>
            <div class="status-yellow">有投诉</div>
            <div class="status-gray">拆单中</div>
            <div class="status-golden">有纠纷</div> -->
        </div>

        <div class="contact-box">
          <div class="top">
            <div class="top-item">
              <div class="top-tt">成交人</div>
              <div class="top-info">
                <div class="t-i-left" v-if="item.userImg">
                  <img :src="item.userImg" alt />
                </div>
                <div class="t-i-right">
                  <div class="name-box">
                    <div class="user-name" :title="item.userName || '-'">
                      {{ hasNewBuildSeeAuth ? (item.userName || "-") : (item.userNameName || '--') }}
                    </div>
                    <div class="user-num" :title="item.userNo || '-'">{{ item.userNo || '-' }}</div>
                    <!-- <img src="../../../../assets/images/public/chat.png" alt /> 3.0暂不做 -->
                  </div>
                  <div class="dept-box">
                    <div class="dept-name" :title="item.userOrgName || '-'">{{ item.userOrgName || "-" }}</div>
                    <div class="dept-num" :title="item.userOrgCode || '-'">{{ item.userOrgCode || "-" }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="top-item">
              <div class="top-tt">制单人</div>
              <div class="top-info">
                <div class="t-i-left" v-if="item.createUserImg">
                  <img :src="item.createUserImg" alt />
                </div>
                <div class="t-i-right">
                  <div class="name-box">
                    <div class="user-name">
                      {{ item.createUserName || "-" }}
                    </div>
                    <div class="user-num">{{ item.createUserId || "-" }}</div>
                    <!-- <img src="../../../../assets/images/public/chat.png" alt /> 3.0暂不做-->
                  </div>
                  <div class="dept-box">
                    <div class="dept-name">
                      {{ item.createUserOrgName || "-" }}
                    </div>
                    <div class="dept-num">
                      {{ item.createUserOrgNo || "-" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bottom">
            <!-- <div class="b-item">
                <img src="../../../../assets/images/public/caiwu_icon.png" alt />
                <div>财务收付</div>
              </div>
              <div class="b-item">
                <img src="../../../../assets/images/public/caiwu_icon.png" alt />
                <div>操作日志</div>
              </div>
              <div class="b-item">
                <img src="../../../../assets/images/public/customer_icon.png" alt />
                <div>客户关系</div>
              </div> -->
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import checkBoxOnly from "@/views/dealReports/erShouDealReports/components/checkBoxOnly.vue";

export default {
  data() {
    return {};
  },
  props: {
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
    //新房核心查看权
    hasNewBuildSeeAuth: {
      type: Boolean,
      data() {
        return false;
      },
    },
    //二手房核心查看权
    hasOldSeeAuth: {
      type: Boolean,
      data() {
        return false;
      },
    },
  },
  components: {
    checkBoxOnly,
  },
  methods: {
    // check状态改变
    checkChange(value, index) {
      this.listData[index].isChecked = value;
    },
    // 查看详情
    showDetail(item) {
      console.log(item, "这是详情");
      let dealId = item.dealId || item.reportId || "";
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
              &.title {
                max-width: 2.1rem;
                height: auto;
                margin-right: 0.07rem;
                color: #000000;
                font-size: 0.18rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              &.tag {
                height: 0.18rem;
                padding: 0 0.03rem;
                margin-right: 0.1rem;
                line-height: 0.18rem;
                text-align: center;
                background-color: #259cf3;
                color: #ffffff;
                font-size: 0.12rem;
              }
              &.noText {
                line-height: 1;
                color: #259cf3;
                font-size: 0.12rem;
              }
            }
          }
          &:nth-child(2) {
            margin-top: 0.06rem;
            line-height: 1;
            color: #999999;
            font-size: 0.14rem;
            .noText {
              line-height: 1;
              color: #259cf3;
              font-size: 0.12rem;
              margin-left: 0.08rem;
            }
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
                width: 0.4rem;
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
        // height: auto;
        min-height: 0.15rem;
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
                  width: 0.5rem;
                  font-size: 0.12rem;
                  color: #333333;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                }
                & > .user-num {
                  margin-left: 0.07rem;
                  width: 0.6rem;
                  color: #bbbbbb;
                  font-size: 0.12rem;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
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
                  width: 1rem;
                  color: #999999;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                }
                & > .dept-num {
                  color: #bbbbbb;
                  margin-left: 0.11rem;
                  width: 0.7rem;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                }
              }
            }
          }
        }
      }
      & > .bottom {
        width: 100%;
        // height: auto;
        min-height: 0.15rem;
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
</style>
