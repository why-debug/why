<template>
<!-- 成交报告列表 -->
  <div class="deal-reports-list">
    <div class="d-r-l-top">
      <div class="left">
        <div
          v-for="(item, index) in tabList"
          :key="index"
          :class="{'active': index === currentTabIndex}"
          @click="changeTab(item)"
        >{{item.name}}({{item.num}})</div>
      </div>
      <div class="right">
        <div class="normal-btn">
          <img src="../../../assets/images/public/edit_200.png" alt />
          <span>新增合同</span>
        </div>
        <!-- <div class="normal-btn">
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
        </div> -->
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

        <!-- 宽/窄类别切换 -->
        <div class="change-box">
          <div class="broad-btn" :class="!narrowListShow?'active':''" @click="narrowListShow=false"></div>
          <div class="narrow-btn" :class="narrowListShow?'active':''" @click="narrowListShow=true"></div>
        </div>
      </div>
    </div>

    <div class="d-r-l-content" v-if="listData.length !== 0 && !isLoading">
      <!-- 宽列表 -->
      <broadList v-show="!narrowListShow" 
      :listType="listType"
      :listData="listData"
      ></broadList>
      <!-- 窄列表 -->
      <narrowList v-show="narrowListShow" 
      :listType="listType" 
      :listData="listData" 
      :narrowNavListForSale="narrowNavListForSale"
      :narrowNavListForNewBuild="narrowNavListForNewBuild"
      ></narrowList>
     
    </div>

    <no-data v-if="listData.length === 0 && !isLoading" style="height: 4rem;"></no-data>

    <!-- 二手房详情弹窗 -->
    <erShouDealReportDetail :isShow.sync="isShowDetail"></erShouDealReportDetail>
  </div>
</template>

<script>
import {
  getMlDealListRequest,
  getMlDealList,
  getNewReportListRequest,
  getNewReportList,
} from "@/net/dealReports/dealReportsList.js";

import checkBoxOnly from "@/views/dealReports/erShouDealReports/components/checkBoxOnly.vue";
import erShouDealReportDetail from "@/views/dealReports/erShouDealReports/erShouDealReportDetail/index.vue";
import noData from "@/views/dealReports/erShouDealReports/components/noData.vue";
import broadList from './components/broadList';
import narrowList from './components/narrowList';

export default {
  data() {
    return {
      isLoading: true,
      currentTabIndex: 0,
      paramsObjForSale: new getMlDealListRequest(), // 二手房请求参数
      paramsObjForNewBuild: new getNewReportListRequest(), // 二手房请求参数
      tabList: [
        {index: 0, name: "售单", value: "1", num: 89 ,listType:1 },
        {index: 1, name: "租单", value: "2", num: 62 ,listType:1 },
        {index: 2, name: "二手合作", value: "3", num: 89 ,listType:1 },
        {index: 3, name: "新房售", value: "1", num: 32 ,listType: 2 },
        {index: 4, name: "新房租", value: "2", num: 27 ,listType: 2 },
        {index: 5, name: "新房合作", value: "3", num: 14 ,listType: 2}
      ],
      isShowDetail: false,
      listType : 1 ,  // 请求列表类型 1=二手房，2=新房
      listData: [], // 列表数据
      narrowListShow: true, // 展示宅列表
      //宅列表字段 ： 二手房
      narrowNavListForSale: [
        { name: "状态", key: "" },
        { name: "交易状态", key: "" },
        { name: "成交类型", key: "dealTypeCn" },
        { name: "成交报告编号", key: "dealNo" },
        { name: "主单号", key: "" },
        { name: "类别", key: "cooperationCn" },
        { name: "物业名称", key: "dealHouseInfo" },
        { name: "成交日期", key: "dealDateFormate" },
        { name: "合作方式", key: "cooperationTypeCn" },
        { name: "客户", key: "buyName" },
        { name: "业主", key: "sellName" },
        { name: "成交组别", key: "orgName" },
        { name: "成交人员", key: "userName" },
        { name: "收佣状态", key: "" },
        { name: "过户状态", key: "" },
        { name: "合同编号", key: "" },
        { name: "成交总价", key: "dealPriceCn" },
        { name: "业主佣金", key: "" },
        { name: "客户佣金", key: "" },
        { name: "建筑面积", key: "houseAreaCn" },
        { name: "扣合作费", key: "cooperationCostCn" },
        { name: "关联盘源", key: "" },
        { name: "意向单编号", key: "" },
        { name: "制单人", key: "createUName" },
        { name: "制单日期", key: "" },
      ],
      // 宅列表字段 ： 新房
      narrowNavListForNewBuild: [
        { name: "状态", key: "" },
        { name: "交易状态", key: "" },
        { name: "成交类型", key: "dealTypeCn" },
        { name: "成交报告编号", key: "dealNo" },
        { name: "主单号", key: "" },
        { name: "类别", key: "cooperationCn" },
        { name: "项目名称", key: "" },
        { name: "物业名称", key: "dealHouseInfo" },
        { name: "成交日期", key: "dealDateFormate" },
        { name: "合作方式", key: "cooperationTypeCn" },
        { name: "客户", key: "buyName" },
        { name: "开发商", key: "" },
        { name: "成交组别", key: "orgName" },
        { name: "成交人员", key: "userName" },
        { name: "收佣状态", key: "" },
        { name: "过户状态", key: "" },
        { name: "合同编号", key: "" },
        { name: "成交总价", key: "dealPriceCn" },
        { name: "业主佣金", key: "" },
        { name: "客户佣金", key: "" },
        { name: "建筑面积", key: "houseAreaCn" },
        { name: "扣合作费", key: "cooperationCostCn" },
        { name: "关联盘源", key: "" },
        { name: "意向单编号", key: "" },
        { name: "制单人", key: "createUName" },
        { name: "制单日期", key: "" },
      ],
    };
  },
  components: {
    checkBoxOnly,
    erShouDealReportDetail,
    noData,
    broadList,
    narrowList,
  },
  created() {
    window.toWebParameter = this.toWebParameter;
    //测试用请求
    this.initData();
  },
  methods: {
    // 获取列表数据
    async initData() {
      this.isLoading = true;
      let data = {};
      if(this.listType == 1  ){
        //请求二手房成交报告列表
         let paramsObj = {
          "dealType": "1", 
          "auditStatus": "0", 
          "billStatus": "1", 
          "commissionStatus": "0",     
          "cooperateType": "1", 

          "dealPriceH": "5201249", 
          "dealPriceL": "5201240", 
          "hasCooperateFee": "1", 
          "hasHouseDeal": "1", 

          "orgId": "0", 
          "queryDateE": "2020-08-06 00:00:00", 
          "queryDateS": "2020-08-02 00:00:00", 
          "queryUserType": "1", 
          "transactionType": "1", 
          "userId": "20333992"
        }
        // paramsObj = this.paramsObjForSale
        data = await new getMlDealList(paramsObj).send();
       

      }else{
        //请求新房房成交报告列表
        let paramsObj = {"dealType":1,"orderByColumn":"3","pageOffset":1,"pageRows":10}
        data = await new getNewReportList(this.paramsObjForNewBuild).send()
      }

      this.listData = data.list || [] ; //列表数据

      this.isLoading = false;
     
      
    },
    // 切换tab  (tabList):
    changeTab(item) {
      this.currentTabIndex = item.index;
      this.listType = item.listType;
      
      this.initData();  //请求列表数据
    },
    // ERP传参获取数据
    toWebParameter(objStr){
      console.log('ERP传参数获取数据：',objStr);
    },
    // check状态改变
    checkChange(value, index) {
      this.listData[index].isChecked = value;
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
  // height: calc(~"100% - 0.33rem");
  height: 100%;
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

  }
}
</style>
