
<!--区主配置-->
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
          <div>KPI考核标准：</div>
          <div class="tips">最高可得{{allScore}}分</div>
        </div>

        <!--业绩、实收目标完成率-->
        <div class="break-even">
          <div class="break-even-title">
            <span>业绩、实收目标完成率</span>
            <img src="../../../../assets/images/public/tips_200.png" alt="">
          </div>
          <div class="received-box">
            <!--业绩目标完成率-->
            <div style="margin-right: 0.45rem">
              <ratioInputView :data-list="yeJiData"
                              ref="yeJiRef"
                              :configListItem="configListItem"
                              :padding="'0 0.65rem 0 0.88rem'"
                              :title-text="yeJiTitle">
              </ratioInputView>
            </div>
            <!--实收目标完成率-->
            <ratioInputView :data-list="shiShouData"
                            ref="shiShouRef"
                            :configListItem="configListItem"
                            :padding="'0 0.65rem 0 0.88rem'"
                            :title-text="shiShouTitle">
            </ratioInputView>
          </div>
        </div>

        <!--近两年收佣率考核-->
        <div class="break-even">
          <div class="break-even-title">
            <span>近两年收佣率考核</span>
            <img src="../../../../assets/images/public/tips_200.png" alt="">
          </div>
          <div style="margin-top: 0.22rem">
            <commissionRateConfig
              ref="commissionRateRef"
              :configListItem="configListItem"
              :data-list="listTwoYearData">
            </commissionRateConfig>
          </div>
        </div>

        <!--分行平均KPI得分-->
        <div class="break-even">
          <div class="break-even-title">
            <span>分行平均KPI得分</span>
            <img src="../../../../assets/images/public/tips_200.png" alt="">
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
    GetConfigurationDetailRequest,
    SaveCityManagerConfigurationApi, SaveCityManagerConfigurationRequest
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
      averageScoreConfig,
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

    mounted() {
      this.initData();
    },

    data() {
      return {
        // 页面所有分数和
        allScore : 120,

        // 基本配置数据
        baseData:{
          configName:'',
          userIdList:'',
        },

        highestScore: '', // 所有分数最高可得 highestScore 分

        // 业绩目标完成率
        yeJiTitle: [
          {
            text: '业绩目标完成率',
          },
          {
            text: '得分',
          }
        ],
        yeJiData: [
          {
            min: 0,
            max: '',
            value: '',
          },
        ],

        // 实收目标完成率
        shiShouTitle: [
          {
            text: '实收目标完成率',
          },
          {
            text: '得分',
          }
        ],
        shiShouData: [
          {
            min: 0,
            max: '',
            value: '',
          }
        ],

        // 近两年收佣率考核
        listTwoYearData: [
          {
            firstTime: 1,
            firstValue: '',
            secondTime: 2,
            secondValue: '',
            value: '',
          }
        ],
        averageScore:{
          baseScore:'',
          unitAddScore:'',
          highestScore:'',
        },
      }
    },

    methods: {
      async initData(){
        if (!this.configListItem.configId || !this.configListItem.configType || !(this.configListItem.configType == 4 && this.configListItem.editOrSave==1)) return ;

        let param = {
          configId:this.configListItem.configId || '',
          configType:this.configListItem.configType || '',
        };

        let res = await new GetConfigurationDetail(new GetConfigurationDetailRequest(param)).send();console.log(res.cityManagerConfig,'--区主详情数据4--');
        let data = res.cityManagerConfig || {};

        // 基础配置数据
        this.baseData.configName = data.configName;
        this.baseData.userIdList = data.userIdList ? data.userIdList.join(',') : '';

        // 最高可得分数
        this.highestScore = data.highestScore;

        // 业绩目标完成率
        let newYeJiData = [];
        for (let info of data.achievementCompletionJson){
          let yeJiItem = {};
          yeJiItem.min = info.left || 0;
          yeJiItem.max = info.right || '';
          yeJiItem.value = info.score || '';
          newYeJiData.push(yeJiItem);
        }
        this.yeJiData = newYeJiData.length == 0 ? [{min:0,max:'',value:''}] : newYeJiData;

        // 实收目标完成率
        let newShiShouData = [];
        for (let info of data.receivedCompletionJson){
          let shishouItem = {};
          shishouItem.min = info.left || 0;
          shishouItem.max = info.right || '';
          shishouItem.value = info.score || '';
          newShiShouData.push(shishouItem);
        }
        this.shiShouData = newShiShouData.length == 0 ? [{min:0,max:'',value:''}] : newShiShouData;

        // 近两年收佣率考核
        let newListTwoYearData = [];
        for (let info of data.commissionCompletionJson){
          let listTwoYearDataItem = {};
          listTwoYearDataItem.firstTime = info.firstTime || '';
          listTwoYearDataItem.firstValue = info.firstValue || '';
          listTwoYearDataItem.secondTime = info.secondTime || '';
          listTwoYearDataItem.secondValue = info.secondValue || '';
          listTwoYearDataItem.value = info.value || '';
          newShiShouData.push(listTwoYearDataItem);
        }
        this.listTwoYearData = newListTwoYearData.length == 0 ? [{firstTime:1,firstValue:'',secondTime:2,secondValue:'',value:''}] : newListTwoYearData;

        this.averageScore.baseScore = data.baseScore;
        this.averageScore.unitAddScore = data.unitAddScore;
        this.averageScore.highestScore = data.highestScore;
        this.averageScore.useOrgConfigId = data.useOrgConfigId;
      },
      clickBtn(val) {
        // 表单提交数据,编辑添加都验证各个组件表单

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
          this.$refs['yeJiRef'].$refs['dynamicValidateForm'].validate(valid=>{
            if(valid) resolve()
          })
        });
        const p3=new Promise((resolve,reject)=>{
          this.$refs['shiShouRef'].$refs['dynamicValidateForm'].validate(valid=>{
            if(valid) resolve()
          })
        });
        const p4=new Promise((resolve,reject)=>{
          this.$refs['commissionRateRef'].$refs['dynamicValidateForm'].validate(valid=>{
            if(valid) resolve()
          })
        });
        const p5=new Promise((resolve,reject)=>{
          this.$refs['averageScoreRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) resolve()
          })
        });

        Promise.all([p1,p2,p3,p4,p5]).then(()=>{
          let param = {
            baseConf:this.$refs['baseConfigRef'].getData(),
            yeJi: this.$refs['yeJiRef'].getData(),
            shiShou:this.$refs['shiShouRef'].getData(),
            commissionRate:this.$refs['commissionRateRef'].getData(),
            averageScore:this.$refs['averageScoreRef'].getData(),
          };
          if (this.configListItem.configId){
            param.configId = this.configListItem.configId; // 存在configId为修改,否则为添加
          }

          new SaveCityManagerConfigurationApi(new SaveCityManagerConfigurationRequest(param)).send()
          .then((res)=>{
            if (res.errCode !== Const.successCode) return Promise.reject(res);

            new ErpCommon().toast('操作成功');
            this.configListItem.editOrSave = 1;
          })
          .catch((res)=>{
            new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!');
          });
        });
      },
      // 改变键名
      convertKeyName(data){
        let newData = [];
        for (let info of data){
          let item = {};
          item.left = info.min || '';
          item.right = info.max || '';
          item.score = info.value || '';
          newData.push(item);
        }
        return newData;
      }
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
      @leftWidth: 1.33rem;

      padding: 0.4rem 0.27rem;

      .title {
        font-size: 0.18rem;
        line-height: 0.2rem;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0;
        color: #444444;

        .tips {
          font-size: 0.12rem;
          line-height: 0.2rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0;
          color: #fb8a10;
          margin-left: 0.04rem;
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

        .received-box {
          display: flex;
          flex-direction: row;
        }

        .KPI-score-box {
          margin-top: 0.22rem;
        }
      }
    }
  }
</style>
