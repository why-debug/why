
<!--区经统计列表-->
<template>
  <div style="width: 100%;height: 100%;overflow: auto">
    <div class="table-head">
    <div class="name">序号</div>
      <div class="name">日期</div>
      <div class="name">姓名</div>
      <div class="name">员工编号</div>
      <div class="name">职级</div>
      <div class="name">职位</div>
      <div class="jurisdictionName">管辖片区名称</div>
      <div class="name">考核目标类型</div>
        <div class="name">辖组别数</div>
      <div class="name">平均组别人数</div>
      <div class="name">KPI总分</div>
      <div class="base-th">
        <div>人均完成业绩</div>
        <div>金额</div>
      </div>
      <div class="base-th">
        <div>人均业绩在收支</div>
        <div>平衡的比例得分</div>
      </div>
      <div class="base-th">
        <div>人均有效房源录入</div>
        <div>系统(个)</div>
      </div>
      <div class="base-th">
        <div>人均客户资源录</div>
        <div>入系统(个)</div>
      </div>
      <div class="base-th">人均产品转介</div>
      <div class="base-th">人均服务好评</div>
      <div class="useApp-th">
        <div>人均邀请使用小程序</div>
        <div>或加入美联会</div>
      </div>
      <div class="base-th">
        <div>分行执行总行</div>
        <div>制定的工作规则</div>
      </div>
      <div class="base-th">
        <div>人均知识库</div>
        <div>分享文章</div>
      </div>
      <div class="base-th">
        <div>业务员平均提供</div>
        <div>合理化建议</div>
      </div>
      <div class="base-th">
        <div>分行人数</div>
        <div>开单比例</div>
      </div>
      <div class="base-th">
        <div>分行人员</div>
        <div>稳定性</div>
      </div>
    </div>
    <div class="table-content" v-for="(item,index) in districtOwnerList" :key="index" @dblclick.stop="showDetail(item)" v-if="districtOwnerList && districtOwnerList.length > 0">
     <div class="name">
        <div>{{ item.orderNum }}</div>
      </div>
       <div class="name">
        <div>{{ item.dateTime }}</div>
      </div>
       <div class="name">
        <div>{{ item.name }}</div>
      </div>
       <div class="name">
        <div>{{ item.id }}</div>
      </div>
       <div class="name">
        <div>{{ item.jobLevel }}</div>
      </div>
       <div class="name">
        <div>{{ item.jobName }}</div>
      </div>
       <div class="jurisdictionName">
        <div>{{ item.jurisdictionName }}</div>
      </div>
       <div class="name">
        <div>{{ item.checkAim }}</div>
      </div>
        <div class="name">
        <div>{{ item.jurisdictionGroup }}</div>
      </div>
       <div class="name">
        <div>{{ item.perGroupNum }}</div>
      </div>
       <div class="name">
        <div>{{ item.kpiTotalScore }}</div>
      </div>
       <div class="other-td">
        <div>{{ item.perAchieveMoney }}</div>
      </div>
      <div class="base-td">
        <div>
          <span style="color: #ff7f00">{{ item.renJunYeJiNow }}%</span>
        </div>
        <div>+{{ item.renJunYeJiScore }}分</div>
      </div>
      <div class="base-td">
        <div>
          <span style="color: #ff7f00">{{ item.activeListingsNow }}</span>
          <span>/</span>
          <span>{{ item.activeListingsAims }}</span>
        </div>
        <div>+{{ item.activeListingsScore }}分</div>
      </div>
      <div class="base-td">
        <div>
          <span style="color: #ff7f00">{{ item.keHuSourceNow }}</span>
          <span>/</span>
          <span>{{ item.keHuSourceAims }}</span>
        </div>
        <div>+{{ item.keHuSourceScore }}分</div>
      </div>
      <div class="other-td">
        <div>+{{ item.zhuanJieScore }}分</div>
      </div>
      <div class="other-td">
        <div>+{{ item.fuWuHaoPingScore }}分</div>
      </div>
      <div class="useApp-td" >
        <div>+{{ item.useAppletScore }}分</div>
      </div>
      <div class="other-td">
        <div>+{{ item.workingRulesScore }}分</div>
      </div>
      <div class="other-td">
        <div>+{{ item.articleScore }}分</div>
      </div>
      <div class="other-td">
        <div>+{{ item.suggestScore }}分</div>
      </div>
      <div class="base-td">
        <div>
          <span style="color: #ff7f00">{{ item.billingRatioNow }}%</span>
        </div>
        <div>+{{ item.billingRatioScore }}分</div>
      </div>
      <div class="base-td">
        <div>
          <span style="color: #ff7f00">{{ item.stabilityNow }}%</span>
        </div>
        <div>+{{ item.stabilityScore }}分</div>
      </div>
    </div>

    <div class="no_dataBox" v-if="districtOwnerList && districtOwnerList.length <= 0">
      <div class="no-data">
        <img src="../../../../assets/images/public/nodate.png" alt="">
        <div class="no_dataSpan">暂时没有相关数据哦!</div>
      </div>
    </div>

    <!--区域经理详情-->
    <districtOwnerDetail
      :isShow.sync="isShow"
      :item="districtDetailParam"
      v-if="isShow">
    </districtOwnerDetail>
  </div>
</template>

<script>
  import districtOwnerDetail from "./districtOwnerDetail";
  import {GetDistrictOwnerList, GetDistrictOwnerListRequest} from "../../../../net/KPIModule/GetKPICountNet";

  export default {
    components: {
      districtOwnerDetail,
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
        districtDetailParam:{},

        districtOwnerList: null, // 列表数据
      };
    },

    methods: {
      async initData(){
        if (this.nowTabValue != 2) return ;

        let data = await new GetDistrictOwnerList(new GetDistrictOwnerListRequest()).send();
        this.districtOwnerList = data.list;
      },
      // 详情
      showDetail(item){
        this.districtDetailParam = item;
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

    .jurisdictionName{
      min-width: 1.5rem;
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
      min-width: 1.1rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

   .useApp-th {
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
        max-width: 0.9rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
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

   .jurisdictionName{
      min-width: 1.5rem;

       & > div {
        max-width: 1.4rem;
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
      min-width: 1.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.19rem;
      box-sizing: border-box;
    }
    .other-td{
      min-width: 1.1rem;

       & > div {
        max-width: 1rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .useApp-td{
      min-width: 1.4rem;

       & > div {
        max-width: 1rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
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

  .table-content:hover .dept-name > img {
    display: block;
  }

  .no_dataBox {
    position: fixed;
    width: 100%;
    height: calc(~"100% - 1.4rem");
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
