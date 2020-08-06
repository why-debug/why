<!--区主统计-->
<template>
  <div style="width: 100%;height: 100%;overflow: auto">
    <div class="table-head">
     <div class="name">序号</div>
      <div class="name">日期</div>
      <div class="name">姓名</div>
      <div class="name">员工编号</div>
      <div class="name">职级</div>
      <div class="name">职位</div>
      <div class="name">考核目标类型</div>
      <div class="name">KPI总分</div>
      <div class="base-th">完成业绩目标</div>
      <div class="base-th">完成实收目标</div>
      <div class="base-th">前两年收佣率</div>
      <div class="base-th">前一年收佣率</div>
      <div class="base-th">分行KPI平均分</div>
    </div>
    <div class="table-content" v-for="(item,index) in districtMasterList" :key="index" v-if="districtMasterList && districtMasterList.length > 0">
      <div class="name">
        <div>{{item.orderNum}}</div>
      </div>
      <div class="name">
        <div>{{item.dateTime}}</div>
      </div>
       <div class="name">
        <div>{{item.name}}</div>
         <img @click.stop="workScore(item)" src="../../../../assets/images/projectAgentInfo/contract/u_Export.png"
             alt="">
      </div>
      <div class="name">
        <div>{{item.id}}</div>
      </div>
        <div class="name">
        <div>{{item.jobLevel}}</div>
      </div>
        <div class="name">
        <div>{{item.jobName}}</div>
      </div>
      <div class="name">{{item.checkAim}}</div>
      <div class="name">{{item.kpiTotalScore}}</div>
      <div class="base-td">
        <div>
          <span style="color: #ff7f00">{{item.yeJiMubiaoNow}}</span>
          <span>/</span>
          <span>{{item.yeJiMubiaoAims}}</span>
        </div>
        <div>+{{item.yeJiMubiaoScore}}分</div>
      </div>
      <div class="base-td">
        <div>
          <span style="color: #ff7f00">{{item.shiShouMuBiaoNow}}</span>
          <span>/</span>
          <span>{{item.shiShouMuBiaoAims}}</span>
        </div>
        <div>+{{item.shiShouMuBiaoScore}}分</div>
      </div>
      <div class="base-td">
        <div>
          <span style="color: #ff7f00">{{item.twoYearsRate}}%</span>
        </div>
        <div>+{{item.twoYearsRateScore}}分</div>
      </div>
       <div class="base-td">
        <div>
          <span style="color: #ff7f00">{{item.oneYearsRate}}%</span>
        </div>
        <div>+{{item.oneYearsRateScore}}分</div>
      </div>
         <div class="base-td">
        <div>
          <span style="color: #ff7f00">{{item.KPIAverageNow}}</span>
        </div>
        <div>+{{item.KPIAverageScore}}分</div>
      </div>
    </div>

    <div class="no_dataBox" v-if="districtMasterList && districtMasterList.length <= 0">
      <div class="no-data">
        <img src="../../../../assets/images/public/nodate.png" alt="">
        <div class="no_dataSpan">暂时没有相关数据哦!</div>
      </div>
    </div>

    <!--收佣率修改弹窗-->
    <commissionRateEditPopup
      :isShow.sync="isShow"
      :item="commissionRatePram"
      v-if="isShow">
    </commissionRateEditPopup>

  </div>
</template>

<script>
  import commissionRateEditPopup from "./commissionRateEditPopup";
  import {GetDistrictMasterList, GetDistrictMasterListRequest,} from "../../../../net/KPIModule/GetKPICountNet";

  export default {
    components: {
      commissionRateEditPopup
    },


    props: {
      pageParam:{
        type: [Array,Object],
        default() {
          return {};
        }
      },
      nowTabValue: {
        type: [String,Number],
        default() {
          return '';
        }
      }
    },

    watch:{
      pageParam:{
        handler:function () {
          this.initData();
        },
        deep:true,
      }
    },

    mounted(){
      this.initData();
    },

    data() {
      return {
        isShow: false,
        commissionRatePram: {},

        districtMasterList: null,
      }
    },

    methods: {
      async initData(){
        if (this.nowTabValue != 3) return ;

        let data = await new GetDistrictMasterList(new GetDistrictMasterListRequest()).send();
        this.districtMasterList = data.list;
      },
      workScore(item) {
        this.commissionRatePram = item;
        this.isShow = true;
      },
    },
  }
</script>

<style scoped>
/*修改滚动条样式*/
div::-webkit-scrollbar {
  width: 0.08rem;
  height: 0.08rem;
}
</style>
<style scoped lang="less">
  @baseHeight: 0.3rem;
  @thHeight: 0.6rem;
  @borderColor: #d8e2e7;

  .table-head {
    position:sticky;
    top:0;
    z-index:90;
    display: inline-flex;
    flex-direction: row;
    font-size: 0.12rem;
    font-weight: bold;
    color: #666666;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    background: #ebf0f5;

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    .name {
      min-width: 0.98rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
    }

    .dept-name {
      min-width: 1.32rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
    }

    .job-name {
      min-width: 1rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
    }

    .all-num {
      min-width: 0.79rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
    }

    .base-th {
      min-width: 1.4rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .row-merge {
      min-width: 2.2rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .row-top {
        height: @baseHeight;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 0.01rem @borderColor solid;
      }

      .row-bottom {
        height: @baseHeight;
        width: 100%;
        display: flex;
        flex-direction: row;

        :first-child {
          border-right: 0.01rem @borderColor solid;;
        }

        & > div {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .table-content {
    display: inline-flex;
    flex-direction: row;
    font-size: 0.12rem;
    font-weight: normal;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    border-bottom: 0.01rem @borderColor solid;

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      height: @baseHeight;
      border-right: 0.01rem @borderColor solid;
    }

    .name {
      min-width: 0.98rem;

      & > div {
        max-width: 0.7rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      & > img {
        margin-left: 0.07rem;
        width: 0.13rem;
        height: 0.13rem;
        cursor: pointer;
        display: none;
      }
    }

    .dept-name {
      min-width: 1.32rem;

      & > div {
        max-width: 1.2rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .job-name {
      min-width: 1rem;

      & > div {
        max-width: 0.9rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .all-num {
      color: #ff7f00;
      min-width: 0.79rem;
    }

    .base-td {
      min-width: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.19rem;
      box-sizing: border-box;
    }

    .other-td{
      min-width: 1.4rem;
      display: flex;
      align-items: center;
      padding: 0 0.19rem;
      box-sizing: border-box;
    }
  }

  .table-content:hover {
    position: relative;
    background-color: #d9f1fe;
    border-bottom: 0.01rem #73baee solid;

    &::after {
      content: ''; // 必须
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      border-top: 0.01rem #73baee solid;
      z-index: 99;
    }
  }

  .table-content:hover .name > img {
    display: block;
  }

  .no_dataBox {
    width: 100%;
    height: calc(~"100% - 0.6rem");
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;

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
</style>
