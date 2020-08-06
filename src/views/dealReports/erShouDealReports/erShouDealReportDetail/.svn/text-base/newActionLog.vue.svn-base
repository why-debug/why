<template>
  <div class="action-log">
    <div class="tab-box">
      <div
        v-for="(item, index) in tabList"
        :key="index"
        @click="changeTab(item.value)"
        :class="{ active: item.value === tabActive }"
      >
        {{ item.label }}
      </div>
    </div>
    <el-table
      class="table-box"
      height="383"
      v-if="tableData.length !== 0 && tabActive == 6"
      :data="tableData"
    >
      <el-table-column
        v-for="(item, index) in tableColumnList"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
      </el-table-column>
    </el-table>
    <div class="page-box" v-if="tableData.length !== 0 && tabActive == 6">
      <div class="normal" @click="pageChange('-')">&lt;</div>
      <div class="normal" @click="pageChange('+')">&gt;</div>
      <input
        type="number"
        @input="paginationChange"
        v-model="paramsObj.pageOffset"
        @blur="inputVal"
        class="input-box"
      />
      <div class="normal" @click="pageChange()">GO</div>
      <div class="num">
        共{{ maxPage || 1 }}页，{{ totalNumber || 0 }}条
      </div>
    </div>
    <no-data
      v-if="tableData.length === 0 && tabActive != 1"
      style="height: calc(100% - 0.49rem); margin-top:0.49rem"
    ></no-data>
    <!-- 跟进日志界面 -->
    <div v-if="tabActive == 1" class="follow-log">
      <div
        class="centerBox"
        v-for="(item, index) in followLogList"
        :key="index"
      >
        <div class="leftDate">
          <div
            class="date"
            :style="{ color: index == 0 ? '#ff7f00' : '#999999' }"
          >
            <span>.</span> {{ item.trackTime | formatTime(false) }}
          </div>
          <div
            class="leftBorder"
            :style="{ background: index == 0 ? '#ff7f00' : '#999999' }"
          ></div>
        </div>
        <div class="rightText">
          <div class="topContent">{{ item.trackContent }}</div>
          <div class="middleContent">
            <span>{{ item.trackTime | formatTime(true) }}</span>
            <span>{{ item.remindContent }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="c-right" v-if="tabActive == 1">
      <followLogLeft></followLogLeft>
    </div>
  </div>
</template>

<script>
import {
  getNewHouseDealtrackLogRequest,
  getNewHouseDealtrackLogList,
} from "@/net/dealReports/newHouseOperationLog.js";
import {
  getNewHouseFollowLogRequest,
  getNewHouseFollowLogList,
} from "@/net/dealReports/newHouseFollowLog.js";

import noData from "@/views/dealReports/erShouDealReports/components/noData.vue";
import followLogLeft from "@/views/dealReports/newHouseDealReport/detailComponets/followLogLeft.vue";

export default {
  props: {
    id: {
      type: Number | String,
      default: "",
    },
  },
  data() {
    return {
      tabActive: "6",
      paramsObj: new getNewHouseDealtrackLogRequest(),
      followLogParams:new getNewHouseFollowLogRequest(),
      maxPage: 1, // 最大页数 总页数
      totalNumber:'',//总共条数
      tabList: [
        { label: "跟进日志", value: "1" },
        { label: "成交报告日志", value: "2" },
        { label: "财务日志", value: "3" },
        { label: "流程日志", value: "4" },
        { label: "业绩日志", value: "5" },
        { label: "操作日志", value: "6" },
      ],
      tableColumnList: [
        { prop: "trackTime", label: "时间", width: "" },
        { prop: "trackContent", label: "日志类型", width: "" },
        { prop: "trackType", label: "跟进内容", width: "260" },
        { prop: "trackUname", label: "跟进人", width: "" },
      ],
      tableData: [],
      followLogList: [
        // {
        //   trackTime: "",
        //   trackContent: "",
        //   remindContent: "",
        // },
      ], //跟进日志列表
    };
  },
  components: {
    noData,
    followLogLeft,
  },
  created() {
    this.paramsObj.reportId = this.id;
    this.initData();
    // if (this.paramsObj.reportId) {
    //   this.initData()
    // }
  },
  methods: {
    // 初始化操作日志数据
    initData() {
      new getNewHouseDealtrackLogList(
        new getNewHouseDealtrackLogRequest(this.paramsObj)
      )
        .send()
        .then((res) => {
          console.log(res,'eeeeeeeeeeeeeeeeee');
          this.tableData = res.list;
          this.maxPage = res.totalPage;
          this.totalNumber = res.totalNumber;
          console.log(this.tableData, "操作日志列表");
        })
        .catch((res) => {
          console.log(res,'请求失败');
        });
    },
    // 初始化操作日志数据
    initFollowData() {
      new getNewHouseFollowLogList(
        new getNewHouseFollowLogRequest(this.followLogParams)
      )
        .send()
        .then((res) => {
          this.followLogList = res.list;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    changeTab(value) {
      // if (value !== '6') return
      this.tabActive = value;
      if (value == '1') this.initFollowData();
    },
    //切换页码
    paginationChange() {
      let pageOffset = this.paramsObj.pageOffset;
      if (pageOffset === 0) {
        pageOffset = 1;
      }

      if (pageOffset >= this.maxPage) {
        pageOffset = this.maxPage == 0 ? 1 : this.maxPage;
      }
      this.paramsObj.pageOffset = pageOffset;
    },
     //数入页码
    inputVal() {
      let pageOffset = this.paramsObj.pageOffset;
      if (pageOffset <= 1 || pageOffset == "") {
        pageOffset = 1;
      }
      this.paramsObj.pageOffset = pageOffset;
    },
    // 分页改变
    pageChange(val) {
      if (val === "-") {
        if (this.paramsObj.pageOffset <= 1) return;
        this.paramsObj.pageOffset--;
      }
      if (val === "+") {
        if (this.paramsObj.pageOffset >= this.maxPage) return;
        this.paramsObj.pageOffset++;
      }
      this.initData();
    },
  },
  filters: {
    formatTime(val, flag) {
      if (val != "" && val != undefined) {
        //flag false 代表年月日 true 代表时分秒
        if (flag) return val.split(" ")[1];
        if (!flag) return val.split(" ")[0];
      } else {
        return "--";
      }
    },
  },
};
</script>

<style lang="less" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.action-log {
  width: 100%;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #eff4f9;
  .c-right {
    width: 2.3rem;
    height: 100%;
    overflow: auto;
    background-color: #d9f1fe;
    position: absolute;
    right: 0;
  }
  & > .tab-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.49rem;
    border-bottom: 0.01rem solid #cad5df;
    display: flex;
    padding: 0 0.1rem;
    box-sizing: border-box;
    & > div {
      width: 0.8rem;
      height: 0.3rem;
      line-height: 0.3rem;
      margin-top: 0.17rem;
      text-align: center;
      color: #999999;
      font-size: 0.12rem;
      cursor: pointer;
      &.active {
        color: #444444;
        border: 0.01rem solid #cad5df;
        border-bottom: 0.01rem solid #eff4f9;
        border-top-left-radius: 0.04rem;
        border-top-right-radius: 0.04rem;
      }
    }
  }
  & > .table-box {
    width: calc(~"100% - 0.4rem");
    height: 3.83rem;
    margin: 0 auto;
    margin-top: 0.65rem;
    box-sizing: border-box;
    /deep/ .has-gutter {
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
      border-bottom: 0.03rem solid #eff4f9;
    }
  }
  & > .page-box {
    width: 100%;
    height: auto;
    margin-top: 0.1rem;
    display: flex;
    align-items: center;
    padding: 0 0.2rem;
    box-sizing: border-box;
    & > .normal {
      width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      text-align: center;
      font-size: 0.1rem;
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
  .follow-log {
    width: 100%;
    // height: calc(100% - 0.49rem);
    height: 4.61rem;
    overflow: auto;
    position: absolute;
    margin-top: 0.49rem;
    .centerBox {
      width: 5.24rem;
      height: 0.87rem;
      margin-top: 0.2rem;
      margin-left: 0.2rem;
      display: flex;
      justify-content: space-between;
      .leftDate {
        display: flex;
        width: 0.9rem;
        height: 100%;
        font-size: 0.13rem;
        color: #ff7f00;
        align-content: space-between;
        flex-wrap: wrap;
        .date {
          width: 100%;
          height: 0.13rem;
          line-height: 0.13rem;
          font-family: MicrosoftYaHei-Bold;
        }
        .leftBorder {
          width: 0.01rem;
          height: 0.77rem;
          background: #ff7f00;
        }
      }
      .rightText {
        display: flex;
        width: 4.34rem;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        .topContent {
          min-width: 4.34rem;
          height: 0.33rem;
          font-size: 0.14rem;
          color: #444;
        }
        .middleContent {
          width: 1.43rem;
          font-size: 0.13rem;
          color: #bbb;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
