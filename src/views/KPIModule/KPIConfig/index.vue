<!-- KPI配置需求 需求ID: 11736 产品:刘会敏 Time:2020-03-05 -->
<template>
  <div class="KPI-config">
    <div class="config-box">
      <div class="left-box">
        <configTypeList @changeConfigType="changeConfigType"></configTypeList>
      </div>
      <div class="right-box" v-if="isInitFinish">
        <!--经纪人配置-->
        <brokerView v-show="selectItem.configType == 1 && !noData"
                    :configListItem="selectItem">
        </brokerView>

        <!--分行经理配置-->
        <branchManagerView v-show="selectItem.configType == 2 && !noData"
                           :configListItem="selectItem">
        </branchManagerView>

        <!--区经配置-->
        <districtOwnerView v-show="selectItem.configType == 3 && !noData"
                           :configListItem="selectItem">
        </districtOwnerView>

        <!--区主配置-->
        <districtMasterView v-show="selectItem.configType == 4 && !noData"
                            :configListItem="selectItem">
        </districtMasterView>


        <!--无数据-->
        <div class="no_dataBox" v-if="noData">
          <div class="no-data">
            <img src="../../../assets/images/public/nodate.png" alt="">
            <div class="no_dataSpan">还没有KPI配置相关信息哦!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import configTypeList from "./components/configTypeList";
  import brokerView from "./components/brokerView"; // 经纪人版配置 configType:1
  import branchManagerView from "./components/branchManagerView"; // 分行经理配置 configType:2
  import districtOwnerView from "./components/districtOwnerView"; // 区经配置 configType:3
  import districtMasterView from "./components/districtMasterView"; // 区主配置 configType:4
  import {ErpCommon} from "../../../utils/ErpCommon";
  import {GetUserOpers, GetUserOpersRequest} from "../../../net/common/GetUserOpers";
  import bus from "../../../utils/bus";

  export default {
    components: {
      configTypeList,
      branchManagerView,
      districtMasterView,
      districtOwnerView,
      brokerView,
    },

    data() {
      return {
        selectItem: {},
        // 列表无数据
        noData: false,
        isInitFinish: false, // 是否初始化完成
      }
    },

    mounted(){
      this.initUserOpers();
      bus.$off("noDataForList");
      bus.$on('noDataForList',()=>{
        this.noData = true;
      });
      bus.$off("hasDataForList");
      bus.$on('hasDataForList',()=>{
        this.noData = false;
      });
    },

    destroyed(){
      bus.$off("noDataForList");
      bus.$off("hasDataForList");
    },

    methods: {
      async initUserOpers(){
        let userId = new ErpCommon().getOperator('USER_ID') || '';

        if (!userId) return;

        await new GetUserOpers(new GetUserOpersRequest({userId:userId})).send();
        this.isInitFinish = true;
      },
      changeConfigType(item) {
        this.selectItem = item;
        console.log(item,'--选中的item--')
      },
    },
  }
</script>

<style scoped lang="less">
  .KPI-config {
    font-size: 0.12rem;
    min-width: 14.4rem;
    /*height: calc(~"100% - 0.33rem");*/
    height: 100%;
    line-height: 1;
    background-color: #FFFFFF;
    user-select: none;
    overflow: hidden;

    .config-box {
      display: flex;
      width: 100%;
      height: 100%;

      .left-box {
        width: 2.16rem;
        height: 100%;
        box-sizing: border-box;
      }

      .right-box {
        width: calc(~"100% - 2.16rem");
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;

        .no_dataBox {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f7f7f7;

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
      }
    }
  }
</style>
