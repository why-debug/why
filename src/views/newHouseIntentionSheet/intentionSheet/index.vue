<template>
  <div style="overflow: hidden;width: 100%;height: 100%;position: relative">
    <div class="tab-box">
      <div class="left-btn-box">
        <div
          v-for="(item, index) in tabList"
          :key="index"
          :class="{ active: nowTabValue === index }"
          @click="changeTab(index)"
        >
          {{ item }}
        </div>
      </div>

      <!--目标设置-->
      <!-- <div class="goal-set">目标设置</div>-->

      <div class="right-op-box">
        <!-- 新房收付顶部按钮 -->
        <div class="recipetPayBtn" v-if="nowTabValue === 1">
          <div @click.stop="addReceipt">收款</div>
          <div @click.stop="addPayMent">付款</div>
          <div @click.stop="transferEarnestMoneyCross">转款</div>
        </div>
        <!--新房意向单-->
        <div class="export-excel" @click.stop="addIntention">
          <img
            src="../../../assets/images/projectAgentInfo/agentContract/add_3_200.png"
            alt=""
          />
          <div v-if="nowTabValue === 0">新增新房意向单</div>
          <div v-if="nowTabValue === 1">新增新房收付</div>
          <div v-if="nowTabValue === 2">新增新房佣金付款</div>
        </div>
        <SearchInput :placeholder="placeholderText" width="1.85"></SearchInput>
        <!--导出-->
        <!-- <div class="export-excel" @click.stop="exportExcel" >
          <img src="../../../assets/images/projectAgentInfo/contract/u_Export.png" alt="">
          <div>导出</div>
        </div> -->

        <!--分页-->
        <div class="page-box">
          <!-- <div class="normal" @click.stop="lastPage">&lt;</div>
          <div class="normal" @click.stop="nextPage">&gt;</div>
          <el-input class="input-box"
                    v-only-number
                    @input="paginationChange"
                    @blur="blurChange"
                    v-model="pageParam[nowTabValue].pageOffset"
                    style="width: 0.35rem">
          </el-input>
          <div class="normal" @click.stop="paginationData">GO</div> -->
          <div class="num">共{{ pageParam[nowTabValue].total || 0 }}条</div>
        </div>
      </div>
    </div>
    <div class="content-box">
      <intentionSheetList
        :pageParam="pageParam[0]"
        :nowTabValue="0"
        v-show="nowTabValue === 0"
        v-on:pageRetrunParam="pageRetrunParams"
        ref="intentionSheetList"
      >
      </intentionSheetList>

      <receiptPaymentList
        :pageParam="pageParam[1]"
        :nowTabValue="1"
        v-show="nowTabValue === 1"
        ref="receiptPaymentList"
      >
      </receiptPaymentList>

      <commissionCollectionList
        :pageParam="pageParam[2]"
        :nowTabValue="2"
        v-show="nowTabValue === 2"
        ref="commissionCollectionList"
      >
      </commissionCollectionList>
    </div>
  </div>
</template>

<script>
import SearchInput from "../../projectAgentinfo/distributionContract/components/searchInput";
import { ErpCommon } from "../../../utils/ErpCommon";
import intentionSheetList from "./intentionSheetList/intentionSheetList";
import commissionCollectionList from "../commissionCollection/commissionCollectionList/index";
import receiptPaymentList from "../receiptPayment/receiptPaymentList/index";

import { UserPermissionMixinsValue } from "../../../mixins/UserPermissionMixins";

export default {
  mixins: [UserPermissionMixinsValue],

  components: {
    intentionSheetList,
    receiptPaymentList,
    commissionCollectionList,
    SearchInput,
  },

  data() {
    return {
      nowTabValue: 0, //当前 tab Index
      placeholderText: "请输入编号/业主/客户",
      tabList: ["新房意向单", "新房收付", "新房佣金收款"],
      searchEmpty: false, //是否清空搜素框文本
      pageOffset: 1,
      pageSize: 30,
      totalPage: 0,
      total: 0,

      // 数据分页相关参数
      pageParam: {
        0: {
          pageOffset: 1,
          pageSize: 30,
          total: 0,
          projectId: "0",
        },
        1: {
          pageOffset: 1,
          pageSize: 30,
          total: 0,
          projectId: "1",
        },
        2: {
          pageOffset: 1,
          pageSize: 30,
          total: 0,
          projectId: "2",
        },
      },
    };
  },
  mounted() {
    // 触发子组件新房意向单数据
    this.$refs.intentionSheetList.initData();
  },
  methods: {
    //获取返回页数参数并设置
    pageRetrunParams(obj) {
      this.pageParam[0].pageOffset = obj.pageNum || "";
      this.pageParam[0].pageSize = obj.pageSize || "";
      this.pageParam[0].totalPage = obj.totalPage || "";
      this.pageParam[0].total = obj.total || "";
    },
    changeTab(index) {
      if (this.nowTabValue === index) return;
      this.nowTabValue = index;
      if (index === 0) {
        // 触发子组件新房意向单数据
        this.$refs.intentionSheetList.initData();
      } else if (index === 1) {
        // 触发子组件新房收付数据
        this.$refs.receiptPaymentList.initData();
      } else if (index === 2) {
        // 触发子组件新房佣金收款数据
        this.$refs.commissionCollectionList.initData();
      }
    },

    //新增新房意向单
    addIntention() {
      this.$router.push({ path: "/addIntention" });
    },
  },
};
</script>

<style scoped lang="less">
@tabHeight: 0.26rem;
@tabWidth: 0.81rem;

.table-tip {
  width: 100%;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #ff0000;
  background-color: rgba(255, 165, 0, 0.5);
  display: flex;
  padding: 0 0.07rem;
}

.tab-box {
  width: 100%;
  height: 0.34rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #f5f5f5;
  padding: 0 0.1rem;
  border-bottom: 0.01rem #d1d1d1 solid;
  z-index: 20;

  .left-btn-box {
    display: flex;
    align-items: center;

    & > div {
      width: @tabWidth;
      height: @tabHeight;
      line-height: @tabHeight;
      text-align: center;
      color: #666666;
      font-size: 0.12rem;
      margin-right: 0.08rem;
      cursor: pointer;
      background-color: #f4f4f4;
      box-shadow: 0.005rem -0.01rem 0.02rem 0rem rgba(0, 0, 0, 0.25);
      border-radius: 0.03rem 0.03rem 0 0;
      border-top: 0.01rem #d1d1d1 solid;
      border-left: 0.01rem #d1d1d1 solid;
      border-right: 0.01rem #d1d1d1 solid;
      margin-bottom: -0.08rem;
      -moz-user-select: none;
      -khtml-user-select: none;
      user-select: none;
      z-index: 99;
    }

    .active {
      background: #ffffff;
    }
  }

  .goal-set {
    height: 0.34rem;
    color: #0000ff;
    line-height: 0.34rem;
    text-align: center;
    position: absolute;
    left: 4rem;
  }

  .right-op-box {
    display: flex;
    flex-direction: row;
    align-items: center;

    .recipetPayBtn {
      width: 2.16rem;
      height: 100%;
      margin-right: 0.23rem;
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

    .export-excel {
      box-sizing: border-box;
      height: 0.34rem;
      margin-right: 0.15rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      & > img {
        width: 0.14rem;
        height: 0.14rem;
        margin-right: 0.07rem;
      }

      div {
        font-size: 0.13rem;
        color: #259cf3;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
      }
    }

    .page-box {
      display: flex;
      align-items: center;
      margin-right: 0.1rem;
      -moz-user-select: none;
      -khtml-user-select: none;
      user-select: none;

      /deep/ .el-input--small .el-input__inner {
        height: 0.205rem;
        padding: 0 8px;
        line-height: normal;
        text-align: center;
      }

      & > .normal {
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
        text-align: center;
        font-size: 0.12rem;
      }

      & > .num {
        font-size: 0.12rem;
        color: #999999;
      }
    }
  }
}

.content-box {
  width: 100%;
  /*height: calc(~"100% - 0.32rem - 0.34rem - 0.3rem");*/
  height: calc(~"100% - 0.34rem - 0.3rem");
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
}
</style>
