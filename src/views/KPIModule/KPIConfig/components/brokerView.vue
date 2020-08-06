<!--经纪人配置-->
<template>
  <div style="width: 100%;height: 100%">
    <!--顶部编辑保存按钮-->

    <saveOrEditBtn :modifyTime="modifyTime" :configListItem="configListItem" @clickBtn="clickBtn" v-if="!noData"></saveOrEditBtn>

    <div class="main-body" v-if="!noData">
      <!--基本设置-->
      <baseConfig :base-data="baseData" ref="baseConfigRef" :configListItem="configListItem"></baseConfig>
      <div class="empty_view"></div>


      <!--第一类考核项-->
      <div class="KPICheckNormal">
        <div class="title">
          <img src="../../../../assets/images/kpi/kpi_kaohe.png" alt="">
          <div>第一类考核项</div>
          <div class="tips">
            <img src="../../../../assets/images/kpi/tips.png" alt="">
            <div>请填写考核指标及封顶分，封顶分如不填写，则表示该指标无封顶分。</div>
          </div>
        </div>

        <!--基础考核-->
        <div class="break-even">
          <div class="base-kaoHe">
            <div class="left">
              <div class="kaohe-title">基础考核</div>
              <myTable :data="panYuanKaoHe" :configListItem="configListItem" ref="panYuanKaoHeRef">
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'label'"
                  :thead-background-color="'#ffffff'"
                  label=""
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'taoNum'"
                  :thead-background-color="'#ffffff'"
                  label="考核(套)"
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'danXianFen'"
                  :thead-background-color="'#ffffff'"
                  label="单项分"
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'jiChuFen'"
                  :thead-background-color="'#ffffff'"
                  label="基础分"
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'fenDinFen'"
                  :thead-background-color="'#ffffff'"
                  label="封顶分"
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
              </myTable>
            </div>
            <div class="right">
              <myTable :data="keYuanKaoHe" :configListItem="configListItem" ref="keYuanKaoHeRef">
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'label'"
                  :thead-background-color="'#ffffff'"
                  label=""
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'taoNum'"
                  :thead-background-color="'#ffffff'"
                  label="考核(个)"
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'danXianFen'"
                  :thead-background-color="'#ffffff'"
                  label="单项分"
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'jiChuFen'"
                  :thead-background-color="'#ffffff'"
                  label="基础分"
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'fenDinFen'"
                  :thead-background-color="'#ffffff'"
                  label="封顶分"
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
              </myTable>
            </div>
          </div>
        </div>

        <!--其他指标-->
        <div class="break-even">

          <div class="other-kaoHe">
            <div class="break-even-title"><span>其他指标</span></div>
            <otherKaoHeConfig
              ref="otherKaoHeRef"
              :data-item="otherIndicatorsItem"
              :configListItem="configListItem">
            </otherKaoHeConfig>
          </div>
        </div>

        <!--加分规则-->
        <div class="break-even-last">
          <div class="other-kaoHe">
            <div class="break-even-title"><span>加分规则</span></div>
            <bonusRulesConfig
              ref="bonusRulesRef"
              :data-item="firstAddScoreRules"
              :configListItem="configListItem">
            </bonusRulesConfig>
          </div>
        </div>
      </div>
      <div class="empty_view"></div>

      <!--第二类加分项-->
      <div class="KPICheckNormal">
        <div class="title">
          <img src="../../../../assets/images/kpi/kpi_kaohe.png" alt="">
          <div>第二类加分项</div>
        </div>

        <!--加分规则-->
        <div class="break-even" style="border: none">
          <div class="other-kaoHe" style="padding-top: 0">
            <div class="break-even-title"><span>加分规则</span></div>
            <bonusRulesConfig
              ref="secondBonusRulesRef"
              :data-item="secondAddScoreRules"
              :tip-text="'可执行加分规则。'"
              :configListItem="configListItem">
            </bonusRulesConfig>
          </div>
        </div>

        <div class="break-even">
          <div class="base-kaoHe">
            <div class="left">
              <myTable :data="duJiaWeiTuo" :configListItem="configListItem" ref="duJiaWeiTuoRef">
                <myTableColumn
                  :width="'1.2rem'"
                  :height="'0.4rem'"
                  :prop="'label'"
                  :thead-background-color="'#ffffff'"
                  label=""
                  padding-left="0"
                  align="left"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'kaoHeNum'"
                  :thead-background-color="'#ffffff'"
                  label="考核(个)"
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'danXianFen'"
                  :thead-background-color="'#ffffff'"
                  label="单项分"
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
                <myTableColumn
                  :width="'0.8rem'"
                  :height="'0.4rem'"
                  :prop="'fenDinFen'"
                  :thead-background-color="'#ffffff'"
                  label="封顶分"
                  padding-left="0"
                  align="center"
                  border="none"
                  :input-width="'0.7rem'">
                </myTableColumn>
              </myTable>
            </div>
          </div>
        </div>

        <!--推荐入职-->
        <div class="break-even-last">
          <div class="other-kaoHe">
            <div class="break-even-title"><span>推荐入职</span></div>
            <tuiJianRuZhiConfig
              ref="tuiJianRuZhiRef"
              :data-item="tuiJianRuZhi"
              :configListItem="configListItem">
            </tuiJianRuZhiConfig>
          </div>
        </div>
      </div>
      <div class="empty_view"></div>

      <!--行政管理&人才资质-->
      <div class="KPICheckNormal">
        <div class="title">
          <img src="../../../../assets/images/kpi/kpi_zhizhi.png" alt="">
          <div>行政管理&人才资质</div>
        </div>

        <!--加分项-->
        <div class="break-even" style="border: none">
          <div class="break-even-box">
            <div class="bonus-title"><div>加分项</div></div>
          </div>

          <!--加分规则-->
          <div class="" style="border: none">
            <div class="other-kaoHe" style="padding-top: 0">
              <div class="break-even-title"><span>加分规则</span></div>
              <manageBonusRulesConfig
                ref="thirdBonusRulesRef"
                :data-item="thirdAddScoreRules"
                :tip-text="'可执行加分规则。'"
                :configListItem="configListItem">
              </manageBonusRulesConfig>
            </div>
          </div>



          <div class="break-even-content">
            <brokerIDConfig
              ref="brokerIDRef"
              :data-item="brokerID"
              :config-list-item="configListItem">
            </brokerIDConfig>
          </div>
        </div>

        <!--年资-->
        <div class="break-even" style="border: none">
          <div class="break-even-content show-row">
            <div>
              <seniorityConfig
                ref="seniorityRef"
                :data-item="seniority"
                :config-list-item="configListItem">
              </seniorityConfig>
            </div>
          </div>
        </div>

        <!--学历-->
        <div class="break-even" style="margin-bottom: 0.4rem">
          <div class="break-even-content show-row">
            <div>
              <educationConfig
                ref="educationRef"
                :data-item="education"
                :config-list-item="configListItem">
              </educationConfig>
            </div>
          </div>
        </div>

        <!--扣分项-培训-->
        <div class="break-even" style="border: none">
          <div class="break-even-box">
            <div class="penalties-title">
              <div>扣分项</div>
            </div>
          </div>

          <div class="break-even-content">
            <penaltiesConfig
              ref="penaltiesRef"
              :data-item="penalties"
              :config-list-item="configListItem">
            </penaltiesConfig>
          </div>
        </div>

        <!--扣分项-红黄蓝制度-->
        <div class="break-even" style="border: none">
          <div class="break-even-content">
            <systemConfig
              ref="violateRef"
              :config-list-item="configListItem"
              :data-item="violate">
            </systemConfig>
          </div>
        </div>
      </div>
    </div>

    <!--时间选择弹窗-->
    <saveCkeckTimePopup
      ref="saveCkeckTimeRef"
      @saveCkeckTimeCallback="saveCkeckTimeCallback"
      :configName="baseData.configName"
      :operationType="configListItem.operationType"
      :isShow.sync="saveCkeckTimePopup.isShow"
      v-if="saveCkeckTimePopup.isShow">
    </saveCkeckTimePopup>

    <!--保存动画-->
    <div class="load-icon" v-if="isRequest">
      <img src="http://cdn.haofang.net/static/erp/loadIng.gif" alt="">
    </div>
  </div>
</template>

<script>
  import saveOrEditBtn from "./common/saveOrEditBtn";
  import baseConfig from "./common/baseConfig";
  import ratioInputView from "./common/ratioInputView";
  import myTable from "./common/myTable";
  import myTableColumn from "./common/myTableColumn";
  import otherKaoHeConfig from "./brokerView/otherKaoHeConfig";
  import bonusRulesConfig from "./brokerView/bonusRulesConfig";
  import manageBonusRulesConfig from "./brokerView/manageBonusRulesConfig";
  import tuiJianRuZhiConfig from "./brokerView/tuiJianRuZhiConfig";
  import brokerIDConfig from "./brokerView/brokerIDConfig";
  import seniorityConfig from "./brokerView/seniorityConfig";
  import educationConfig from "./brokerView/educationConfig";
  import penaltiesConfig from "./brokerView/penaltiesConfig";
  import systemConfig from "./brokerView/systemConfig";
  import portStandardConfig from "./brokerView/portStandardConfig";
  import {
    GetConfigurationDetail,
    GetConfigurationDetailRequest,
    SaveBrokerConfigurationApi,
    SaveBrokerConfigurationRequest,
  } from "../../../../net/KPIModule/GetKPIConfigNet";
  import {Const} from "../../../../utils/Const";
  import {ErpCommon} from "../../../../utils/ErpCommon";
  import saveCkeckTimePopup from "./common/saveCkeckTimePopup";
  import bus from "../../../../utils/bus";

  export default {
    components: {
      myTable,
      myTableColumn,
      saveOrEditBtn,
      baseConfig,
      ratioInputView,
      otherKaoHeConfig,
      bonusRulesConfig,
      manageBonusRulesConfig,
      tuiJianRuZhiConfig,
      brokerIDConfig,
      seniorityConfig,
      educationConfig,
      penaltiesConfig,
      systemConfig,
      portStandardConfig,
      saveCkeckTimePopup
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
          // if (!obj.configId) return;

          // 点击取消时将所有数据重置(父组件的值)
          if (obj.isCancel || false){
            this.resetCancelData();
          }

          this.initData();

          // 新增时重置表单数据
          if (obj.operationType == 'add'){
            this.resetAllFromData();
          }
        },
        deep: true
      }
    },

    mounted(){
      this.initData();

      // 新增时重置表单数据
      if (this.configListItem.operationType == 'add'){
        this.resetAllFromData();
      }
    },

    data() {
      return {
        // 是否在请求中
        isRequest:false,
        // 列表无数据
        noData: false,

        // 时间选择弹窗参数
        saveCkeckTimePopup:{
          isShow:false,
        },
        // 基本配置数据
        baseData:{
          configName:'',
          userIdList:[], // 人员信息
          positionList:[], // 角色信息
          chooseType:'', // 适用范围 user:人员 role:角色
        },
        // 基础考核 - 盘源考核
        panYuanKaoHe: [
          {
            label: '新增盘源',
            taoNum: '10',
            danXianFen: '35',
            jiChuFen: '350',
            fenDinFen: '700',
          },
          {
            label: '房源备案',
            taoNum: '2',
            danXianFen: '150',
            jiChuFen: '300',
            fenDinFen: '600',
          },
          {
            label: '上传图片',
            taoNum: '2',
            danXianFen: '100',
            jiChuFen: '200',
            fenDinFen: '400',
          },
          {
            label: '二手实勘',
            taoNum: '10',
            danXianFen: '10',
            jiChuFen: '100',
            fenDinFen: '100',
          },
          {
            label: '二手带看',
            taoNum: '10',
            danXianFen: '35',
            jiChuFen: '350',
            fenDinFen: '350',
          },
          {
            label: '有效跟进',
            taoNum: '200',
            danXianFen: '0.75',
            jiChuFen: '150',
            fenDinFen: '300',
          },
        ],
        // 基础考核 - 新增客源
        keYuanKaoHe: [
          {
            label: '新增客源',
            taoNum: '10',
            danXianFen: '15',
            jiChuFen: '150',
            fenDinFen: '150',
          },
          {
            label: '收钥匙',
            taoNum: '2',
            danXianFen: '100',
            jiChuFen: '200',
            fenDinFen: '400',
          },
          {
            label: '一手踩盘',
            taoNum: '5',
            danXianFen: '20',
            jiChuFen: '100',
            fenDinFen: '100',
          },
          {
            label: '一手带看',
            taoNum: '5',
            danXianFen: '70',
            jiChuFen: '350',
            fenDinFen: '350',
          },
          {
            label: '小号跟进',
            taoNum: '50',
            danXianFen: '1',
            jiChuFen: '50',
            fenDinFen: '50',
          },
        ],
        // 第一类考核 - 其他指标
        otherIndicatorsItem:{
          attendanceUpStd:"100",
          imageUpStd:"150",
          starAgent:"50"
        },
        // 第一类考核 - 加分规则
        firstAddScoreRules:{
          addScorePoint:"2340",
          addScoreHalfPoint:"2340",
        },
        // 第二类考核 - 加分规则
        secondAddScoreRules:{
          addScorePoint:"1560",
          addScoreHalfPoint:"870",
        },
        // 第二类考核项 - 独家委托
        duJiaWeiTuo: [
          {
            label: '独家委托',
            kaoHeNum: '',
            danXianFen: '150',
            fenDinFen: '',
          },
          {
            label: '租单(独立单)',
            kaoHeNum: '',
            danXianFen: '100',
            fenDinFen: '',
          },
          {
            label: '租单(行内)',
            kaoHeNum: '',
            danXianFen: '150',
            fenDinFen: '',
          },
          {
            label: '租单(跨行)',
            kaoHeNum: '',
            danXianFen: '200',
            fenDinFen: '',
          },
          {
            label: '买卖单(独立单)',
            kaoHeNum: '',
            danXianFen: '200',
            fenDinFen: '',
          },
          {
            label: '合作买卖单(行内)',
            kaoHeNum: '',
            danXianFen: '300',
            fenDinFen: '',
          },
          {
            label: '合作买卖单(跨行)',
            kaoHeNum: '',
            danXianFen: '400',
            fenDinFen: '',
          },
          {
            label: '美联好房注册',
            kaoHeNum: '',
            danXianFen: '10',
            fenDinFen: '',
          }
        ],
        // 第二类考核项 - 推荐入职
        tuiJianRuZhi:{
          recommendBusinessPosition:'300', // 业务员
          recommendManagePosition:'500', // 管理员
        },
        // 行政管理&人才资质

        // 行政管理&人才资质 - 加分规则
        thirdAddScoreRules:{
          addScorePoint:"1560",
          addScoreHalfPoint:"870",
        },
        brokerID:{
          brokerCertificate:'1000', // 全国经纪人证书
          educationUpSingleScore:'300', // 继续教育单次分
          educationUpHighestScore:'600', // 继续教育封顶分
        },
        // 年资
        seniority:{
          onboardingYear1:'100',
          onboardingYear2:'200',
          onboardingYear3:'300',
          onboardingYear4:'400',
          onboardingYear5:'500',
          onboardingYear6:'600',
          onboardingYear7:'700',
          onboardingYear8:'800',
          onboardingYear9:'900',
          onboardingYear10:'1000',
        },
        // 学历
        education:{
          collegeDegree:'300', // 专科
          undergraduateDegree:'500', // 本科
          graduateDegree:'800', // 本科及以上
        },
        // 扣分项 - 培训
        penalties:{
          trainingAttendanceHighestScore: '', // 未培训出勤扣分封顶",
          trainingAttendanceSingleScore: '500', // 未培训出勤扣分每次",
          trainingFailedHighestScore: '', // 培训未通过封顶扣分",
          trainingFailedSingleScore: '200', // 培训未通过单项扣分",
        },
        // 红黄蓝制度
        violate:{
          violateRedLine:'-1', // 触犯红线 -1.扣完，>0单次都xx分
          violateYellowLine:'-1', // 触犯黄线 -1.扣完，>0单次都xx分
          violateBlueLine:'800', // 触犯蓝线 -1.扣完，>0单次都xx分
        },
        modifyTime:'', // 上次修改时间
      }
    },

    methods: {
      async initData(){
        if (!this.configListItem.configId || !this.configListItem.configType) return ;

        let param = {
          configId:this.configListItem.configId || '',
          configType:this.configListItem.configType || '',
        };

        let res = await new GetConfigurationDetail(new GetConfigurationDetailRequest(param)).send();console.log(res,'--经纪人详情数据1--');
        let data = res.brokerConfig || {};

        this.modifyTime = data.modifyTime || '';

        //  基础配置数据
        this.baseData.configName = data.configName || '';
        this.baseData.userIdList = data.userList || [];
        this.baseData.positionList = data.positionList || [];
        this.baseData.chooseType = data.chooseType || '';

        //  第一类考核项-基础考核 - 盘源考核
        this.dealPanYuanKapHeData(data);
        //  第一类考核项-基础考核 - 新增客源
        this.dealKeYuanKaoHeData(data);
        //  第一类考核项-基础考核 - 其他指标
        this.otherIndicatorsItem.attendanceUpStd = data.attendanceUpStd;  // 全勤(考勤)
        this.otherIndicatorsItem.imageUpStd = data.imageUpStd; // 形象
        this.otherIndicatorsItem.starAgent = data.starAgent; // 经纪人星级牌照
        //  第一类考核项-基础考核 - 加分规则
        this.firstAddScoreRules.addScorePoint = data.addScorePoint;
        this.firstAddScoreRules.addScoreHalfPoint = data.addScoreHalfPoint;
        // 第二类加分项
        this.secondAddScoreRules.addScorePoint = data.secondAddScorePoint;
        this.secondAddScoreRules.addScoreHalfPoint = data.secondAddScoreHalfPoint;
        // 第二类加分项 - 独家委托
        this.dealDuJiaWeiTuoData(data);
        // 第二类加分项 - 推荐入职
        this.tuiJianRuZhi.recommendBusinessPosition = data.recommendBusinessPosition;
        this.tuiJianRuZhi.recommendManagePosition = data.recommendManagePosition;
        // 行政管理&人才资质
        // 第三类加分项
        this.thirdAddScoreRules.addScorePoint = data.thirdAddScorePoint;
        this.thirdAddScoreRules.addScoreHalfPoint = data.thirdAddScoreHalfPoint;

        this.brokerID.brokerCertificate = data.brokerCertificate;
        this.brokerID.educationUpSingleScore = data.educationUpSingleScore;
        this.brokerID.educationUpHighestScore = data.educationUpHighestScore;
        // 年资
        this.seniority.onboardingYear1 = data.onboardingYear1;
        this.seniority.onboardingYear2 = data.onboardingYear2;
        this.seniority.onboardingYear3 = data.onboardingYear3;
        this.seniority.onboardingYear4 = data.onboardingYear4;
        this.seniority.onboardingYear5 = data.onboardingYear5;
        this.seniority.onboardingYear6 = data.onboardingYear6;
        this.seniority.onboardingYear7 = data.onboardingYear7;
        this.seniority.onboardingYear8 = data.onboardingYear8;
        this.seniority.onboardingYear9 = data.onboardingYear9;
        this.seniority.onboardingYear10 = data.onboardingYear10;
        // 学历
        this.education.collegeDegree = data.collegeDegree;
        this.education.undergraduateDegree = data.undergraduateDegree;
        this.education.graduateDegree = data.graduateDegree;
        // 培训相关
        this.penalties.trainingAttendanceHighestScore = data.trainingAttendanceHighestScore;
        this.penalties.trainingAttendanceSingleScore = data.trainingAttendanceSingleScore;
        this.penalties.trainingFailedHighestScore = data.trainingFailedHighestScore;
        this.penalties.trainingFailedSingleScore = data.trainingFailedSingleScore;
        // 触犯红黄蓝制度
        this.violate.violateBlueLine = data.violateBlueLine;
        this.violate.violateRedLine = data.violateRedLine;
        this.violate.violateYellowLine = data.violateYellowLine;
      },
      // 处理盘源考核数据
      dealPanYuanKapHeData(data){
        this.panYuanKaoHe[0].taoNum = data.houseAdd;  // 新增盘源 -- 接口描述:房增
        this.panYuanKaoHe[0].danXianFen = data.houseAddSingleScore;
        this.panYuanKaoHe[0].jiChuFen = data.houseAddBaseScore;
        this.panYuanKaoHe[0].fenDinFen = data.houseAddHighestScore;
        this.panYuanKaoHe[1].taoNum = data.houseRegistration;  // 房源备案 -- 接口描述:房屋备案
        this.panYuanKaoHe[1].danXianFen = data.houseRegistrationSingleScore;
        this.panYuanKaoHe[1].jiChuFen = data.houseRegistrationBaseScore;
        this.panYuanKaoHe[1].fenDinFen = data.houseRegistrationHighestScore;
        this.panYuanKaoHe[2].taoNum = data.uploadPhoto;  // 上传图片 -- 接口描述:上传图片
        this.panYuanKaoHe[2].danXianFen = data.uploadPhotoSingleScore;
        this.panYuanKaoHe[2].jiChuFen = data.uploadPhotoBaseScore;
        this.panYuanKaoHe[2].fenDinFen = data.uploadPhotoHighestScore;
        this.panYuanKaoHe[3].taoNum = data.fangKan;  // 二手实勘 -- 接口描述:房堪
        this.panYuanKaoHe[3].danXianFen = data.fangKanSingleScore;
        this.panYuanKaoHe[3].jiChuFen = data.fangKanBaseScore;
        this.panYuanKaoHe[3].fenDinFen = data.fangKanHighestScore;
        this.panYuanKaoHe[4].taoNum = data.takeLookHouse;  // 二手带看 -- 接口描述:二手带看
        this.panYuanKaoHe[4].danXianFen = data.takeLookHouseSingleScore;
        this.panYuanKaoHe[4].jiChuFen = data.takeLookHouseBaseScore;
        this.panYuanKaoHe[4].fenDinFen = data.takeLookHouseHighestScore;
        this.panYuanKaoHe[5].taoNum = data.houseTrack;  // 有效跟进 -- 接口描述:跟进
        this.panYuanKaoHe[5].danXianFen = data.houseTrackSingleScore;
        this.panYuanKaoHe[5].jiChuFen = data.houseTrackBaseScore;
        this.panYuanKaoHe[5].fenDinFen = data.houseTrackHighestScore;
      },
      // 获取盘源考核数据
      getPanYuanKapHeData(){
        let data = {};
        data.houseAdd = this.panYuanKaoHe[0].taoNum;  // 新增盘源 -- 接口描述:房增
        data.houseAddSingleScore = this.panYuanKaoHe[0].danXianFen;
        data.houseAddBaseScore = this.panYuanKaoHe[0].jiChuFen;
        data.houseAddHighestScore = this.panYuanKaoHe[0].fenDinFen;
        data.houseRegistration = this.panYuanKaoHe[1].taoNum;  // 房源备案 -- 接口描述:房屋备案
        data.houseRegistrationSingleScore = this.panYuanKaoHe[1].danXianFen;
        data.houseRegistrationBaseScore = this.panYuanKaoHe[1].jiChuFen;
        data.houseRegistrationHighestScore = this.panYuanKaoHe[1].fenDinFen;
        data.uploadPhoto = this.panYuanKaoHe[2].taoNum;  // 上传图片 -- 接口描述:上传图片
        data.uploadPhotoSingleScore = this.panYuanKaoHe[2].danXianFen;
        data.uploadPhotoBaseScore = this.panYuanKaoHe[2].jiChuFen;
        data.uploadPhotoHighestScore = this.panYuanKaoHe[2].fenDinFen;
        data.fangKan = this.panYuanKaoHe[3].taoNum;  // 二手实勘 -- 接口描述:房堪
        data.fangKanSingleScore = this.panYuanKaoHe[3].danXianFen;
        data.fangKanBaseScore = this.panYuanKaoHe[3].jiChuFen;
        data.fangKanHighestScore = this.panYuanKaoHe[3].fenDinFen;
        data.takeLookHouse = this.panYuanKaoHe[4].taoNum;  // 二手带看 -- 接口描述:二手带看
        data.takeLookHouseSingleScore = this.panYuanKaoHe[4].danXianFen;
        data.takeLookHouseBaseScore = this.panYuanKaoHe[4].jiChuFen;
        data.takeLookHouseHighestScore = this.panYuanKaoHe[4].fenDinFen;
        data.houseTrack = this.panYuanKaoHe[5].taoNum;  // 有效跟进 -- 接口描述:跟进
        data.houseTrackSingleScore = this.panYuanKaoHe[5].danXianFen;
        data.houseTrackBaseScore = this.panYuanKaoHe[5].jiChuFen;
        data.houseTrackHighestScore = this.panYuanKaoHe[5].fenDinFen;
        return data;
      },
      // 处理客源考核数据
      dealKeYuanKaoHeData(data){
        this.keYuanKaoHe[0].taoNum = data.custAdd; // 新增客源 -- 接口描述:客增
        this.keYuanKaoHe[0].danXianFen = data.custAddSingleScore;
        this.keYuanKaoHe[0].jiChuFen = data.custAddBaseScore;
        this.keYuanKaoHe[0].fenDinFen = data.custAddHighestScore;
        this.keYuanKaoHe[1].taoNum = data.submitKey; // 收钥匙 -- 接口描述:提交钥匙
        this.keYuanKaoHe[1].danXianFen = data.submitKeySingleScore;
        this.keYuanKaoHe[1].jiChuFen = data.submitKeyBaseScore;
        this.keYuanKaoHe[1].fenDinFen = data.submitKeyHighestScore;
        this.keYuanKaoHe[2].taoNum = data.reviewBuild; // 一手踩盘 -- 接口描述:一手踩盘
        this.keYuanKaoHe[2].danXianFen = data.reviewBuildSingleScore;
        this.keYuanKaoHe[2].jiChuFen = data.reviewBuildBaseScore;
        this.keYuanKaoHe[2].fenDinFen = data.reviewBuildHighestScore;
        this.keYuanKaoHe[3].taoNum = data.takeLookBuild; // 一手带看 -- 接口描述:一手带看
        this.keYuanKaoHe[3].danXianFen = data.takeLookBuildSingleScore;
        this.keYuanKaoHe[3].jiChuFen = data.takeLookBuildBaseScore;
        this.keYuanKaoHe[3].fenDinFen = data.takeLookBuildHighestScore;
        this.keYuanKaoHe[4].taoNum = data.hiddenNumberDial; // 小号跟进 -- 接口描述:小号通话
        this.keYuanKaoHe[4].danXianFen = data.hiddenNumberDialSingleScore;
        this.keYuanKaoHe[4].jiChuFen = data.hiddenNumberDialBaseScore;
        this.keYuanKaoHe[4].fenDinFen = data.hiddenNumberDialHighestScore;
      },
      // 获取客源考核数据
      getKeYuanKaoHeData(){
        let data = {};
        data.custAdd = this.keYuanKaoHe[0].taoNum; // 新增客源 -- 接口描述:客增
        data.custAddSingleScore = this.keYuanKaoHe[0].danXianFen;
        data.custAddBaseScore = this.keYuanKaoHe[0].jiChuFen;
        data.custAddHighestScore = this.keYuanKaoHe[0].fenDinFen;
        data.submitKey = this.keYuanKaoHe[1].taoNum; // 收钥匙 -- 接口描述:提交钥匙
        data.submitKeySingleScore = this.keYuanKaoHe[1].danXianFen;
        data.submitKeyBaseScore = this.keYuanKaoHe[1].jiChuFen;
        data.submitKeyHighestScore = this.keYuanKaoHe[1].fenDinFen;
        data.reviewBuild = this.keYuanKaoHe[2].taoNum; // 一手踩盘 -- 接口描述:一手踩盘
        data.reviewBuildSingleScore = this.keYuanKaoHe[2].danXianFen;
        data.reviewBuildBaseScore = this.keYuanKaoHe[2].jiChuFen;
        data.reviewBuildHighestScore = this.keYuanKaoHe[2].fenDinFen;
        data.takeLookBuild = this.keYuanKaoHe[3].taoNum; // 一手带看 -- 接口描述:一手带看
        data.takeLookBuildSingleScore = this.keYuanKaoHe[3].danXianFen;
        data.takeLookBuildBaseScore = this.keYuanKaoHe[3].jiChuFen;
        data.takeLookBuildHighestScore = this.keYuanKaoHe[3].fenDinFen;
        data.hiddenNumberDial = this.keYuanKaoHe[4].taoNum; // 小号跟进 -- 接口描述:小号通话
        data.hiddenNumberDialSingleScore = this.keYuanKaoHe[4].danXianFen;
        data.hiddenNumberDialBaseScore = this.keYuanKaoHe[4].jiChuFen;
        data.hiddenNumberDialHighestScore = this.keYuanKaoHe[4].fenDinFen;
        return data;
      },
      // 处理独家委托数据
      dealDuJiaWeiTuoData(data){
        this.duJiaWeiTuo[0].kaoHeNum = data.exclusiveCommission; // 第二类加分项 - 独家委托 --接口描述:委托
        this.duJiaWeiTuo[0].danXianFen = data.exclusiveCommissionSingleScore;
        this.duJiaWeiTuo[0].fenDinFen = data.exclusiveCommissionHighestScore;

        this.duJiaWeiTuo[1].kaoHeNum = data.rentBillIndependent; // 第二类加分项 - 租单(独立单) --接口描述:独立租单
        this.duJiaWeiTuo[1].danXianFen = data.rentBillIndependentSingleScore;
        this.duJiaWeiTuo[1].fenDinFen = data.rentBillIndependentHighestScore;

        this.duJiaWeiTuo[2].kaoHeNum = data.rentBillInnerCooperation; // 第二类加分项 - 租单(行内) --接口描述:行内合作租单
        this.duJiaWeiTuo[2].danXianFen = data.rentBillInnerCooperationSingleScore;
        this.duJiaWeiTuo[2].fenDinFen = data.rentBillInnerCooperationHighestScore;

        this.duJiaWeiTuo[3].kaoHeNum = data.rentBillOuterCooperation; // 第二类加分项 - 租单(夸行) --接口描述:夸行合作租单
        this.duJiaWeiTuo[3].danXianFen = data.rentBillOuterCooperationSingleScore;
        this.duJiaWeiTuo[3].fenDinFen = data.rentBillOuterCooperationHighestScore;

        this.duJiaWeiTuo[4].kaoHeNum = data.saleBillIndependent; // 第二类加分项 - 买卖单(独立单) --接口描述:独立售单
        this.duJiaWeiTuo[4].danXianFen = data.saleBillIndependentSingleScore;
        this.duJiaWeiTuo[4].fenDinFen = data.saleBillIndependentHighestScore;

        this.duJiaWeiTuo[5].kaoHeNum = data.saleBillInnerCooperation; // 第二类加分项 - 合作买卖单(行内) --接口描述:独立售单
        this.duJiaWeiTuo[5].danXianFen = data.saleBillInnerCooperationSingleScore;
        this.duJiaWeiTuo[5].fenDinFen = data.saleBillInnerCooperationHighestScore;

        this.duJiaWeiTuo[6].kaoHeNum = data.saleBillOuterCooperation; // 第二类加分项 - 合作买卖单(跨行) --接口描述:独立售单
        this.duJiaWeiTuo[6].danXianFen = data.saleBillOuterCooperationSingleScore;
        this.duJiaWeiTuo[6].fenDinFen = data.saleBillOuterCooperationHighestScore;

        this.duJiaWeiTuo[7].kaoHeNum = data.mlAppRegistration; // 第二类加分项 - 美联好房注册 --接口描述:美联app邀请注册
        this.duJiaWeiTuo[7].danXianFen = data.mlAppRegistrationSingleScore;
        this.duJiaWeiTuo[7].fenDinFen = data.mlAppRegistrationHighestScore;
      },
      // 获取独家委托数据
      getDuJiaWeiTuoData(){
        let data = {};
        data.exclusiveCommission = this.duJiaWeiTuo[0].kaoHeNum; // 第二类加分项 - 独家委托 --接口描述:委托
        data.exclusiveCommissionSingleScore = this.duJiaWeiTuo[0].danXianFen;
        data.exclusiveCommissionHighestScore = this.duJiaWeiTuo[0].fenDinFen;

        data.rentBillIndependent = this.duJiaWeiTuo[1].kaoHeNum; // 第二类加分项 - 租单(独立单) --接口描述:独立租单
        data.rentBillIndependentSingleScore = this.duJiaWeiTuo[1].danXianFen;
        data.rentBillIndependentHighestScore = this.duJiaWeiTuo[1].fenDinFen;

        data.rentBillInnerCooperation = this.duJiaWeiTuo[2].kaoHeNum; // 第二类加分项 - 租单(行内) --接口描述:行内合作租单
        data.rentBillInnerCooperationSingleScore = this.duJiaWeiTuo[2].danXianFen;
        data.rentBillInnerCooperationHighestScore = this.duJiaWeiTuo[2].fenDinFen;

        data.rentBillOuterCooperation = this.duJiaWeiTuo[3].kaoHeNum; // 第二类加分项 - 租单(夸行) --接口描述:夸行合作租单
        data.rentBillOuterCooperationSingleScore = this.duJiaWeiTuo[3].danXianFen;
        data.rentBillOuterCooperationHighestScore = this.duJiaWeiTuo[3].fenDinFen;

        data.saleBillIndependent = this.duJiaWeiTuo[4].kaoHeNum; // 第二类加分项 - 买卖单(独立单) --接口描述:独立售单
        data.saleBillIndependentSingleScore = this.duJiaWeiTuo[4].danXianFen;
        data.saleBillIndependentHighestScore = this.duJiaWeiTuo[4].fenDinFen;

        data.saleBillInnerCooperation = this.duJiaWeiTuo[5].kaoHeNum; // 第二类加分项 - 合作买卖单(行内) --接口描述:独立售单
        data.saleBillInnerCooperationSingleScore = this.duJiaWeiTuo[5].danXianFen;
        data.saleBillInnerCooperationHighestScore = this.duJiaWeiTuo[5].fenDinFen;

        data.saleBillOuterCooperation = this.duJiaWeiTuo[6].kaoHeNum; // 第二类加分项 - 合作买卖单(跨行) --接口描述:独立售单
        data.saleBillOuterCooperationSingleScore = this.duJiaWeiTuo[6].danXianFen;
        data.saleBillOuterCooperationHighestScore = this.duJiaWeiTuo[6].fenDinFen;

        data.mlAppRegistration = this.duJiaWeiTuo[7].kaoHeNum; // 第二类加分项 - 美联好房注册 --接口描述:美联app邀请注册
        data.mlAppRegistrationSingleScore = this.duJiaWeiTuo[7].danXianFen;
        data.mlAppRegistrationHighestScore = this.duJiaWeiTuo[7].fenDinFen;
        return data;
      },
      // 新增时-重置子组件表单数据
      resetAllFromData(){
        this.firstAddScoreRules.addScorePoint = 2340;
        this.firstAddScoreRules.addScoreHalfPoint = 2340;
        this.secondAddScoreRules.addScorePoint = 1560;
        this.secondAddScoreRules.addScoreHalfPoint = 870;
        this.thirdAddScoreRules.addScorePoint = 1560;
        this.thirdAddScoreRules.addScoreHalfPoint = 870;

        this.$refs['baseConfigRef'].resetForm();
        this.$refs['otherKaoHeRef'].resetForm();
        this.$refs['bonusRulesRef'].resetForm();
        this.$refs['tuiJianRuZhiRef'].resetForm();
        this.$refs['brokerIDRef'].resetForm();
        this.$refs['seniorityRef'].resetForm();
        this.$refs['educationRef'].resetForm();
        this.$refs['penaltiesRef'].resetForm();
        this.$refs['violateRef'].resetForm();
        this.$refs['panYuanKaoHeRef'].resetForm();
        this.$refs['keYuanKaoHeRef'].resetForm();
        this.$refs['duJiaWeiTuoRef'].resetForm();
      },
      // 点击取消时重置数据
      resetCancelData(){
        this.baseData = {
          configName:'',
          userIdList:[], // 人员信息
          positionList:[], // 角色信息
          chooseType:'', // 适用范围 user:人员 role:角色
        };
        this.otherIndicatorsItem = {
          attendanceUpStd:"",
          imageUpStd:"",
          starAgent:""
        };
        this.firstAddScoreRules = {
          addScorePoint:"",
          addScoreHalfPoint:"",
        };
        this.secondAddScoreRules = {
          addScorePoint:"",
          addScoreHalfPoint:"",
        };
        this.thirdAddScoreRules = {
          addScorePoint:"",
          addScoreHalfPoint:"",
        };
        this.tuiJianRuZhi = {
          recommendBusinessPosition:'', // 业务员
            recommendManagePosition:'', // 管理员
        };
        this.brokerID = {
          brokerCertificate:'', // 全国经纪人证书
            educationUpSingleScore:'', // 继续教育单次分
            educationUpHighestScore:'', // 继续教育封顶分
        };
        this.seniority = {
          onboardingYear1:'',
          onboardingYear2:'',
          onboardingYear3:'',
          onboardingYear4:'',
          onboardingYear5:'',
          onboardingYear6:'',
          onboardingYear7:'',
          onboardingYear8:'',
          onboardingYear9:'',
          onboardingYear10:'',
        };
        this.education = {
          collegeDegree:'', // 专科
          undergraduateDegree:'', // 本科
          graduateDegree:'', // 本科及以上
        };
        this.penalties = {
          trainingAttendanceHighestScore: '', // 未培训出勤扣分封顶",
          trainingAttendanceSingleScore: '', // 未培训出勤扣分每次",
          trainingFailedHighestScore: '', // 培训未通过封顶扣分",
          trainingFailedSingleScore: '', // 培训未通过单项扣分",
        };
        this.violate = {
          violateBlueLine:'', // 触犯蓝线 -1.扣完，>0单次都xx分
          violateRedLine:'', // 触犯红线 -1.扣完，>0单次都xx分
          violateYellowLine:'', // 触犯黄线 -1.扣完，>0单次都xx分
        };

        this.configListItem.isCancel = false;
      },
      clickBtn(val) {
        // 去编辑
        if (val == 1){
          this.configListItem.editOrSave = 2; return;
        }

        // 去保存
        const p1=new Promise((resolve,reject)=>{
          this.$refs['baseConfigRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });
        const p2=new Promise((resolve,reject)=>{
          this.$refs['otherKaoHeRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });
        const p3=new Promise((resolve,reject)=>{
          this.$refs['bonusRulesRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });
        const p4=new Promise((resolve,reject)=>{
          this.$refs['secondBonusRulesRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });
        const p5=new Promise((resolve,reject)=>{
          this.$refs['tuiJianRuZhiRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });
        const p6=new Promise((resolve,reject)=>{
          this.$refs['brokerIDRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });
        const p7=new Promise((resolve,reject)=>{
          this.$refs['educationRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });
        const p10=new Promise((resolve,reject)=>{
          this.$refs['seniorityRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });
        const p8=new Promise((resolve,reject)=>{
          this.$refs['penaltiesRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });
        const p9=new Promise((resolve,reject)=>{
          this.$refs['violateRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });
        const p11=new Promise((resolve,reject)=>{
          this.$refs['panYuanKaoHeRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });
        const p12=new Promise((resolve,reject)=>{
          this.$refs['keYuanKaoHeRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });
        const p13=new Promise((resolve,reject)=>{
          this.$refs['duJiaWeiTuoRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });

        const p14=new Promise((resolve,reject)=>{
          this.$refs['thirdBonusRulesRef'].$refs['ruleForm'].validate(valid=>{
            if(valid) return resolve();

            reject();
          })
        });

        Promise.all([p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14]).then(()=>{
          // 时间选择弹窗
          this.saveCkeckTimePopup.isShow = true;
          console.log(this.configListItem,'--configListItem--');
        })
        .catch((res)=>{
          new ErpCommon().toast('请完整填写kpi配置');
        })
      },
      // 选择时间后保存数据
      saveCkeckTimeCallback(execTime){
        this.isRequest = true;
        let param = {
          baseConf: this.$refs['baseConfigRef'].getData(),
          panYuanKaoHe: this.getPanYuanKapHeData(),
          keYuanKaoHe: this.getKeYuanKaoHeData(),
          otherKaoHe: this.$refs['otherKaoHeRef'].getData(),
          bonusRules: this.$refs['bonusRulesRef'].getData(),
          secondBonusRules: this.$refs['secondBonusRulesRef'].getData(),
          thirdBonusRules: this.$refs['thirdBonusRulesRef'].getData(),
          duJiaWeiTuo: this.getDuJiaWeiTuoData(),
          tuiJianRuZhi: this.$refs['tuiJianRuZhiRef'].getData(),
          brokerID: this.$refs['brokerIDRef'].getData(),
          seniority: this.$refs['seniorityRef'].getData(),
          education: this.$refs['educationRef'].getData(),
          penalties: this.$refs['penaltiesRef'].getData(),
          violate: this.$refs['violateRef'].getData(),
          execTime: execTime,
        };

        if (this.configListItem.configId){
          param.configId = this.configListItem.configId; // 存在configId为修改,否则为添加
        }

        console.log(param,'--经纪人请求参数-');
        new SaveBrokerConfigurationApi(new SaveBrokerConfigurationRequest(param)).send()
          .then((res)=>{
            if (res.errCode !== Const.successCode) return Promise.reject(res);
            let data = res.data;
            let oldConfigListItem = JSON.parse(JSON.stringify(this.configListItem));

            // 回掉需要传的参数
            let operatingSuccessParam = {
              configId: data.configId || '',
              configName: data.configName || '',
              operationType: oldConfigListItem.operationType,
              oldConfigListItem: oldConfigListItem,
            };


            bus.$emit("operatingSuccess",operatingSuccessParam); // 操作成功发送更新数据的通知
            new ErpCommon().toast('操作成功');
            this.configListItem.editOrSave = 1;
            this.isRequest = false;
          })
          .catch((res)=>{
            this.isRequest = false;
            new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!');
          })
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
      @aboutWidth: 0.67rem;
      @aboutLeftWidth: 0.37rem;
      @aboutRightWidth: 1.3rem;

      padding: 0.4rem 0.3rem;

      .title {
        font-size: 0.18rem;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0;
        color: #444444;
        margin-bottom: 0.25rem;
        display: flex;
        align-items: center;

        & > img{
          height: 0.23rem;
          width: auto;
          opacity: 1;
          margin-right: 0.17rem;
        }

        .tips{
          margin-left: 0.16rem;
          display: flex;
          align-items: center;
          & > img{
            width: 0.14rem;
            margin-right: 0.09rem;
          }
          & > div{
            font-size: 0.12rem;
            line-height: 1;
            letter-spacing: 0;
            color: #ff7200;
          }
        }
      }

      .break-even {
        padding: 0 @aboutRightWidth 0 @aboutLeftWidth;
        margin: 0 0.3rem 0 0.3rem;
        box-sizing: border-box;
        border-bottom: solid 0.01rem #e7e8e8;

        .tips {
          font-size: 0.12rem;
          color: #999999;
          margin-bottom: 0.24rem;
        }

        .break-even-title {
          margin-right:0.39rem;

          & > span {
            font-size: 0.16rem;
            line-height: 0.32rem;
          }

          & > img {
            width: 0.14rem;
            height: 0.14rem;
            margin-left: 0.05rem;
          }
        }

        .base-kaoHe {
          display: flex;
          flex-direction: row;
          padding-bottom: 0.34rem;
          box-sizing: border-box;
          .left{
            display: flex;
            margin-right: 0.1rem;
            box-sizing: border-box;
            .kaohe-title{
              font-size: 0.16rem;
              letter-spacing: 0;
              color: #444444;
              line-height: 0.4rem;
              margin-right: 0.3rem;
              flex-shrink: 0;
            }
          }
        }

        .other-kaoHe {
          padding: 0.3rem 0;
          display: flex;
        }

        .break-even-box {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0.2rem 0;

          .bonus-title {
            font-size: 0.16rem;
            letter-spacing: 0.01rem;
            color: #08a300;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3.53rem;
            height: 0.01rem;
            background-size: 100% 100%;
            background-image: url("../../../../assets/images/public/bonus_200.png");
            background-repeat: no-repeat;
            position: relative;

            & > div {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }

          .penalties-title {
            font-size: 0.16rem;
            letter-spacing: 0.01rem;
            color: #ff7200;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3.53rem;
            height: 0.01rem;
            background-size: 100% 100%;
            background-image: url("../../../../assets/images/public/deduction_200.png");
            background-repeat: no-repeat;
            position: relative;

            & > div {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }

        .break-even-content {
          margin: 0.34rem 0;
        }

        .show-row {
          display: flex;
          flex-direction: row;
        }
      }

      .break-even-last {
        padding: 0 @aboutRightWidth 0 @aboutLeftWidth;
        margin: 0 0.3rem 0 0.3rem;
        box-sizing: border-box;

        .break-even-title {
          margin-right:0.39rem;

          & > span {
            font-size: 0.16rem;
            line-height: 0.32rem;
          }

          & > img {
            width: 0.14rem;
            height: 0.14rem;
            margin-left: 0.05rem;
          }
        }

        .other-kaoHe {
          margin-top: 0.3rem;
          display: flex;
        }
      }
    }
  }

  .load-icon{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    z-index: 200;
  }
</style>
