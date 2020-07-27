<!--分行经理配置-->
<template>
  <div style="width: 100%;height: 100%;overflow: hidden">
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
          <div class="tips">最高可得{{allMax}}分</div>
        </div>

        <!--人均业绩收支平衡比-->
        <div class="break-even">
          <div class="break-even-title">
            <span>人均业绩收支平衡比</span>
            <img src="../../../../assets/images/public/tips_200.png" alt="">
          </div>
          <ratioInputView
            ref="renJunYeJi"
            :configListItem="configListItem"
            :data-list="performanceData">
          </ratioInputView>
        </div>

        <!--人均房、客源量考核-->
        <div class="break-even">
          <div class="break-even-title">
            <span>人均房、客源量考核</span>
            <img src="../../../../assets/images/public/tips_200.png" alt="">
          </div>

          <div class="property-source-box">
            <div class="house-config">
              <div class="house-config-max">
                人均有效房源总分不超过
                <el-input
                  v-model="renJunYouXiaoFangYuan"
                  :disabled="configListItem.editOrSave==1"
                  :maxlength="3"
                  v-only-number
                  style="width: 0.7rem;margin: 0 0.06rem">
                </el-input>
                分
              </div>
              <myTable :data="houseSourceData" :configListItem="configListItem">
                <myTableColumn :width="'2.95rem'" :prop="'label'" label="考核项目" padding-left="0.2rem"></myTableColumn>
                <myTableColumn :width="'1.17rem'" :prop="'value'" label="单项分" padding-left="0"
                               align="center"></myTableColumn>
              </myTable>
            </div>
            <div class="house-config">
              <div class="house-config-max">
                人均客户资源总分不超过
                <el-input
                  v-model="renJunKeHuZhiYuan"
                  :disabled="configListItem.editOrSave==1"
                  :maxlength="3"
                  v-only-number
                  style="width: 0.7rem;margin: 0 0.06rem">
                </el-input>
                分
              </div>
              <myTable :data="customSourceData" :configListItem="configListItem">
                <myTableColumn :width="'2.95rem'" :prop="'label'" label="考核项目" padding-left="0.2rem"></myTableColumn>
                <myTableColumn :width="'1.17rem'" :prop="'value'" label="单项分" padding-left="0" align="center"></myTableColumn>
              </myTable>
            </div>
          </div>
        </div>

        <!--分行人员开单比-->
        <div class="break-even">
          <div class="break-even-title">
            <span>分行人员开单比</span>
            <img src="../../../../assets/images/public/tips_200.png" alt="">
          </div>
          <ratioInputView
            ref="fenHangRenYuan"
            :configListItem="configListItem"
            :data-list="billingRatioData">
          </ratioInputView>
        </div>

        <!--其他考核项-->
        <div class="break-even">
          <div class="break-even-title">
            <span>其他考核项</span>
            <img src="../../../../assets/images/public/tips_200.png" alt="">
          </div>

          <div class="other">
            <myTable :data="otherKaoHeData" :configListItem="configListItem">
              <myTableColumn :width="'2.95rem'" :prop="'label'" label="考核项目" padding-left="0.2rem"></myTableColumn>
              <myTableColumn :width="'2.95rem'" :prop="'default'" label="默认分" padding-left="0"
                             align="center"></myTableColumn>
              <myTableColumn :width="'2.95rem'" :prop="'value'" label="最高分" padding-left="0"
                             align="center"></myTableColumn>
            </myTable>
          </div>
        </div>

        <!--分行人员稳定性-->
        <div class="break-even">
          <div class="break-even-title">
            <span>分行人员稳定性</span>
            <img src="../../../../assets/images/public/tips_200.png" alt="">
          </div>
          <ratioInputView
            ref="personnelStable"
            :configListItem="configListItem"
            :data-list="personnelStableData">
          </ratioInputView>
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
  import {
    GetConfigurationDetail,
    GetConfigurationDetailRequest, SaveOrgManagerConfigurationApi, SaveOrgManagerConfigurationRequest,
    SaveRegionManagerConfigurationApi, SaveRegionManagerConfigurationRequest
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

    data() {
      return {
        type: 1, // 右上角按钮类型  1:编辑  2:保存
        allMax: 100, // 所有分数最高可得 allMax 分
        renJunYouXiaoFangYuan: '', // 人均有效房源总分不超过 renJunYouXiaoFangYuan 分
        renJunKeHuZhiYuan: '', // 人均客户资源总分不超过 renJunKeHuZhiYuan 分

        // 基本配置数据
        baseData:{
          configName:'',
          userIdList:'',
        },
        // 人均业绩收支平衡比
        performanceData: [
          {
            min: 0,
            max: '',
            value: '',
          }
        ],
        // 人均房源考核
        houseSourceData: [
          {
            label: '新增房源',
            value: '',
          },
          {
            label: '发官网',
            value: '',
          }
        ],
        // 人均客源考核
        customSourceData: [
          {
            label: '新增客户',
            value: 70,
          }
        ],
        // 分行人员开单比
        billingRatioData: [
          {
            min: 0,
            max: '',
            value: '',
          }
        ],
        // 其他考核
        otherKaoHeData: [
          {
            label: '人均产品转介数',
            default: 70,
            value: 70,
          },
          {
            label: '人均服务好评',
            default: 60,
            value: 60,
          },
          {
            label: '人均邀请使用小程序或加入美联会次数',
            default: 70,
            value: 70,
          },
          {
            label: '工作规则执行情况',
            default: 60,
            value: 60,
          },
          {
            label: '分享文章或合理化建议数',
            default: 70,
            value: 70,
          }
        ],
        // 分行人员稳定性
        personnelStableData: [
          {
            min: 0,
            max: '',
            value: '',
          }
        ],
      }
    },

    methods: {
      async initData(){
        if (!this.configListItem.configId || !this.configListItem.configType || !(this.configListItem.configType == 2 && this.configListItem.editOrSave==1)) return ;

        let param = {
          configId:this.configListItem.configId || '',
          configType:this.configListItem.configType || '',
        };

        let res = await new GetConfigurationDetail(new GetConfigurationDetailRequest(param)).send();console.log(res.orgManagerConfig,'--分行经理详情数据2--');
        let data = res.orgManagerConfig;

        // 基础配置数据
        this.baseData.configName = data.configName || '';
        this.baseData.userIdList = data.userIdList ? data.userIdList.join(',') : '';

        // 人均业绩收支平衡比 avgAchievementJson
        this.performanceData = this.convertKeyName(data.avgAchievementJson);

        // 人均房、客源量考核
        this.renJunYouXiaoFangYuan = data.avgHouseHighestScore; // 人均有效房源总分不超过 renJunYouXiaoFangYuan 分
        this.renJunKeHuZhiYuan = data.avgCustHighestScore; // 人均客户资源总分不超过 renJunKeHuZhiYuan 分
        this.houseSourceData[0].value = data.publishOfficialSingleScore;
        this.houseSourceData[1].value = data.avgHouseSingleScore;
        this.customSourceData[0].value = data.avgCustSingleScore;

        // 分行人员开单比 dealProportionJson
        this.billingRatioData = this.convertKeyName(data.dealProportionJson);

        // 其他考核 otherKaoHeData
        this.otherKaoHeData[0].default = data.avgIntroduceSingleScore; // 人均产品转介数
        this.otherKaoHeData[0].value = data.avgIntroduceHighestScore;

        this.otherKaoHeData[1].default = data.avgPraiseSingleScore; // 人均服务好评
        this.otherKaoHeData[1].value = data.avgPraiseHighestScore;

        this.otherKaoHeData[2].default = data.avgMsprogramIntroduceSingleScore; // 人均邀请使用小程序或加入美联会次数
        this.otherKaoHeData[2].value = data.avgMsprogramIntroduceHighestScore;

        this.otherKaoHeData[3].default = data.executivePowerSingleScore; // 工作规则执行情况
        this.otherKaoHeData[3].value = data.executivePowerHighestScore;

        this.otherKaoHeData[4].default = data.avgShareOrProposalSingleScore; // 分享文章或建议
        this.otherKaoHeData[4].value = data.avgShareOrProposalHighestScore;

        // 分行人员稳定性 employeeStabilityJson
        this.personnelStableData = this.convertKeyName(data.employeeStabilityJson);

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
          this.$refs['renJunYeJi'].$refs['dynamicValidateForm'].validate(valid=>{
            if(valid) resolve()
          })
        });
        const p3=new Promise((resolve,reject)=>{
          this.$refs['fenHangRenYuan'].$refs['dynamicValidateForm'].validate(valid=>{
            if(valid) resolve()
          })
        });
        const p4=new Promise((resolve,reject)=>{
          this.$refs['personnelStable'].$refs['dynamicValidateForm'].validate(valid=>{
            if(valid) resolve()
          })
        });

        Promise.all([p1,p2,p3,p4]).then(()=>{
          let param = {
            baseConf:this.$refs['baseConfigRef'].getData(),
            renJunYeJi:this.$refs['renJunYeJi'].getData(),
            renJunYouXiaoFangYuan:this.renJunYouXiaoFangYuan,
            renJunKeHuZhiYuan:this.renJunKeHuZhiYuan,
            publishOfficialSingleScore: this.houseSourceData[0].value,
            avgHouseSingleScore: this.houseSourceData[1].value,
            avgCustSingleScore: this.customSourceData[0].value,
            billingRatioData: this.$refs['fenHangRenYuan'].getData(), // 分行人员开单比
            avgIntroduceSingleScore: this.otherKaoHeData[0].default, // 人均产品转介数
            avgIntroduceHighestScore: this.otherKaoHeData[0].value,
            avgPraiseSingleScore: this.otherKaoHeData[1].default, // 人均服务好评
            avgPraiseHighestScore: this.otherKaoHeData[1].value,
            avgMsprogramIntroduceSingleScore: this.otherKaoHeData[2].default, // 人均邀请使用小程序或加入美联会次数
            avgMsprogramIntroduceHighestScore: this.otherKaoHeData[2].value,
            executivePowerSingleScore: this.otherKaoHeData[3].default , // 工作规则执行情况
            executivePowerHighestScore: this.otherKaoHeData[3].value,
            avgShareOrProposalSingleScore: this.otherKaoHeData[4].default , // 分享文章或建议
            avgShareOrProposalHighestScore: this.otherKaoHeData[4].value,
            personnelStable:this.$refs['personnelStable'].getData(),
          };

          if (this.configListItem.configId){
            param.configId = this.configListItem.configId; // 存在configId为修改,否则为添加
          }

          console.log(param,'--分行经理请求参数-');
          new SaveOrgManagerConfigurationApi(new SaveOrgManagerConfigurationRequest(param)).send()
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
      // 改变键名
      convertKeyName(data){
        let newData = [];
        for (let info of data){
          let item = {};
          item.min = info.left || '';
          item.max = info.right || '';
          item.value = info.score || '';
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

        .property-source-box {
          margin-top: 0.2rem;
          display: flex;
          flex-direction: row;

          .house-config {
            font-size: 0.14rem;
            color: #444444;
            margin-right: 0.62rem;

            .house-config-max {
              margin-bottom: 0.14rem;

              /deep/ .el-input--small .el-input__inner {
                line-height: normal;
                text-align: center;
              }

              /deep/ .el-input {
                /deep/ .el-input__inner {
                  font-size: 0.14rem;
                  height: 0.34rem;
                  border-color: #bdc6cf;
                  padding: 0 0.1rem;
                  text-align: center;
                }
              }
            }
          }
        }

        .other {
          margin-top: 0.2rem;
        }
      }
    }
  }
</style>
