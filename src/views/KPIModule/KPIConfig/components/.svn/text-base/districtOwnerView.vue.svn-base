
<!--区经配置-->
<template>
  <div style="width: 100%;height: 100%">
    <!--顶部编辑保存按钮-->
    <saveOrEditBtn :type="configListItem.editOrSave" @clickBtn="clickBtn"></saveOrEditBtn>

    <div class="main-body">
      <!--基本设置-->
      <baseConfig :base-data="baseData" ref="baseConfigRef" :configListItem="configListItem"></baseConfig>
      <div class="empty_view"></div>

      <!--KPI考核标准内容-->
      <div class="KPICheckNormal">
        <div class="title">
          <img src="../../../../assets/images/kpi/kpi_icon.png" alt="">
          <div>KPI考核标准</div>
          <div class="tips">计算方式为：各分行KPI总和÷管辖分行数；最高得{{allMax}}分</div>
        </div>

        <!--分行平均KPI得分-->
        <div class="break-even">
          <div class="break-even-title">
            <!--<span>分行平均KPI得分</span>-->
            <!--<img src="../../../../assets/images/public/tips_200.png" alt="">-->
          </div>
          <div class="KPI-score-box">
            <averageScoreConfig
              ref="averageScoreRef"
              :averageScore="averageScore"
              :configListItem="configListItem">
            </averageScoreConfig>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import saveOrEditBtn from "./common/saveOrEditBtn";
  import baseConfig from "./common/baseConfig";
  import ratioInputView from "./common/ratioInputView";
  import myTable from "./common/myTable";
  import myTableColumn from "./common/myTableColumn";
  import commissionRateConfig from "./districtMasterView/commissionRateConfig";
  import averageScoreConfig from "./districtMasterView/averageScoreConfig";
  import {
    GetConfigurationDetail,
    GetConfigurationDetailRequest, SaveRegionManagerConfigurationApi, SaveRegionManagerConfigurationRequest,
  } from "../../../../net/KPIModule/GetKPIConfigNet";
  import {Const} from "../../../../utils/Const";
  import {ErpCommon} from "../../../../utils/ErpCommon";

  export default {
    components: {
      myTable,
      myTableColumn,
      saveOrEditBtn,
      baseConfig,
      ratioInputView,
      commissionRateConfig,
      averageScoreConfig
    },

    data() {
      return {
        allMax: 100, // 所有分数最高可得 allMax 分

        // 基本配置数据
        baseData:{
          configName:'',
          userIdList:'',
        },
        averageScore:{
          baseScore:'',
          unitAddScore:'',
          highestScore:'',
        },
      }
    },

    props:{
      configListItem:{
        type: [Array,Object],
        default(){
          return {};
        }
      }
    },

    watch:{
      configListItem: {
        handler:function (obj) {
          // 因为监听了数据 所有只要数据发送改变就会发起请求 限制:只有在自己类型时或保存数据完成时请求
          this.initData();
        },
        deep: true
      }
    },

    mounted(){
      this.initData();
    },

    methods: {
      async initData(){
        if (!this.configListItem.configId || !this.configListItem.configType || !(this.configListItem.configType == 3 && this.configListItem.editOrSave==1)) return ;

        let param = {
          configId:this.configListItem.configId || '',
          configType:this.configListItem.configType || '',
        };

        let res = await new GetConfigurationDetail(new GetConfigurationDetailRequest(param)).send();console.log(res.regionManagerConfig,'--区经详情数据3--');
        let data = res.regionManagerConfig || {};

        // 基础配置数据
        this.baseData.configName = data.configName;
        this.baseData.userIdList = data.userIdList ? data.userIdList.join(',') : '';

        this.averageScore.baseScore = data.baseScore;
        this.averageScore.unitAddScore = data.unitAddScore;
        this.averageScore.highestScore = data.highestScore;
        this.averageScore.useOrgConfigId = data.useOrgConfigId;
      },
      clickBtn(val) {
        // 去编辑
        if (val == 1){
          this.configListItem.editOrSave = 2; return;
        }

        // 去保存
        const p1=new Promise((resolve,reject)=>{
          this.$refs['baseConfigRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) resolve()
          })
        });
        const p2=new Promise((resolve,reject)=>{
          this.$refs['averageScoreRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) resolve()
          })
        });

        Promise.all([p1,p2]).then(()=>{
          let param = {
            baseConf:this.$refs['baseConfigRef'].getData(),
            averageScore:this.$refs['averageScoreRef'].getData(),
          };

          if (this.configListItem.configId){
            param.configId = this.configListItem.configId; // 存在configId为修改,否则为添加
          }

          console.log(param,'--区经请求参数-');
          new SaveRegionManagerConfigurationApi(new SaveRegionManagerConfigurationRequest(param)).send()
          .then((res)=>{
            if (res.errCode !== Const.successCode) return Promise.reject(res);

            new ErpCommon().toast('操作成功');
            this.configListItem.editOrSave = 1;
          })
          .catch((res)=>{
            new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!');
          })

        });
      },
    },
  }
</script>

<style scoped lang="less">
  /deep/ .empty_view {
    width: 100%;
    height: 0.07rem;
    background-color: #eff4f9;
  }

  .main-body {
    width: 100%;
    height: calc(~"100% - 0.31rem");
    overflow: auto;

    .KPICheckNormal {
      @leftWidth: 0.93rem;

      padding: 0.4rem 0.27rem;

      .title {
        font-size: 0.18rem;
        line-height: 0.2rem;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0;
        color: #444444;
        display: flex;
        align-items: center;

        &>img{
          width: 0.26rem;
          margin-right: 0.17rem;
        }

        .tips {
          font-size: 0.12rem;
          line-height: 0.2rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0;
          color: #fb8a10;
          margin-left: 0.15rem;
        }
      }

      .break-even {
        margin: 0.1rem 0 0.48rem @leftWidth;
        box-sizing: border-box;

        .break-even-title {
          display: flex;
          flex-direction: row;
          align-items: center;

          & > span {
            font-size: 0.16rem;
          }

          & > img {
            width: 0.14rem;
            height: 0.14rem;
            margin-left: 0.05rem;
          }
        }

        .KPI-score-box {
          margin-top: 0.22rem;

          /deep/ .el-input--small .el-input__inner {
            line-height: normal;
            text-align: center;
          }

          /deep/ .el-input {
            /deep/ .el-input__inner {
              font-size: 0.14rem;
              height: 0.34rem !important;
              padding: 0 0.3rem 0 0.1rem;
              text-align: center;
            }
          }

          /deep/ .el-form-item--small.el-form-item{
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
