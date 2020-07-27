

// KPI配置相关接口
import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import {Const} from "../../common/utils/Const";
import {ErpCommon} from "../../utils/ErpCommon";


// KPI配置 - 获取配置列表
export class GetConfigListRequest extends APIRequest {
    search = ""; // 关键字搜索
    constructor (obj = {}) {
        super();
        this.search = obj.search || '';
    }
}
class GetConfigListApi extends PostRequest {
    constructor (request = new GetConfigListRequest()) {
        super(request);
    }

    getUrl () {
        return "/kpiWeb/broker/configuration/configurationList";
    }

    getNeedToken() {
        return true;
    }
}
export class GetConfigListResponse extends APIResponse {
    list = []; // 主行列表
    constructor () {
        super();
    }
}

export class GetConfigListItem {
    configId = ""; // 配置ID
    configName = ""; // 配置名
    configType = ""; // 配置类型:1.经纪人，2.分行经理，3.区经，4.区主
    createTime = ""; // 创建时间

    editOrSave = 1; // 1:编辑 2:保存
    operationType = 'edit';
    isShow = false;

    getConfigTypeText(){
        let map = new Map()
          .set('1', "经纪人")
          .set('2', "分行经理")
          .set('3', "区经")
          .set('4', "区主");

        if (!map.has(this.configType+'')) return "";

        return  map.get(this.configType+'');
    }

    getNullValue(){
        return '';
    }

    getDefaultVal() {
        return '--';
    }
}
export class GetConfigList {
    request;
    constructor (request = new GetConfigListRequest()) {
        this.request = request;
    }

    send () {
        return new GetConfigListApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                let response = new GetConfigListResponse();
                let newList = [];
                for (let info of (res.data || [])){
                    if (info.configType != 1) continue; // 屏蔽非经纪人配置
                    let item = new GetConfigListItem();
                    item.configId = info.configId || item.getNullValue();
                    item.configName = info.configName || item.getNullValue();
                    item.configType = info.configType || item.getNullValue();
                    item.createTime = info.createTime || item.getNullValue();
                    item.editOrSave = 1;
                    newList.push(item);
                }
                response.list = newList;
                return response;
            })
            .catch((res)=>{
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}


// KPI配置 - 获取(右侧)配置详情
export class GetConfigurationDetailRequest extends APIRequest {
    configId = ""; // 配置ID
    configType = ""; // 配置类型:1.经纪人，2.行经，3.区经，4.区主
    constructor (obj = {}) {
        super();
        this.configId = obj.configId || '';
        this.configType = obj.configType || '';
    }
}
class GetConfigurationDetailApi extends PostRequest {
    constructor (request = new GetConfigurationDetailRequest()) {
        super(request);
    }

    getUrl () {
        return "/kpiWeb/broker/configuration/configurationDetail";
    }

    getNeedToken() {
        return true;
    }
}
export class GetConfigurationDetailResponse extends APIResponse {
    brokerConfig = {}; // 经纪人配置
    orgManagerConfig = {}; // 分行经理配置
    regionManagerConfig = {}; // 区经配置
    cityManagerConfig = {}; // 区主配置
    constructor () {
        super();
    }
}
// 经纪人配置item 1
export class brokerConfigDetailItem {
    modifyTime = ''; // 上次修改时间
    cityId = '';// "(int32)城市ID",
    configId = '';// "(int32)配置ID",
    configName = '';// "(string)配置名称",
    userList = [];// 考核人员列表, // {"userId":1111,"userName":"xxx"}
    positionList = []; // 考核人员角色 // {"userPosition": "(string)角色", "userPositionName": "(string)角色名"}
    chooseType = ''; // 配置使用的范围  人员:user  role:角色

    addScorePoint = '';// "(int32)基础分完成多少时才使用加分",
    addScoreHalfPoint = '';// 一类加分项[减半目标分]：基础分完成多少时才使用加分
    secondAddScoreHalfPoint = '';// 二类加分项[减半目标分]： 基础分完成多少时才使用加分")
    attendanceUpStd = '';// "(int32)考勤达标获得分数----------ml",
    custAdd = '';// "(int32)客增------盘客",
    custAddBaseScore = '';// "(int32)客增基础分",
    custAddHighestScore = '';// "(int32)客增封顶分",
    custAddSingleScore = '';// "(int32)客增单项分",
    exclusiveCommission = '';// "(int32)委托------盘客",
    exclusiveCommissionBaseScore = '';// "(int32)委托基础分",
    exclusiveCommissionHighestScore = '';// "(int32)委托封顶分",
    exclusiveCommissionSingleScore = '';// "(int32)委托单项分",
    fangKan = ''; // "(int32)房堪------盘客",
    fangKanBaseScore = ''; // "(int32)房堪基础分 ",
    fangKanHighestScore = ''; // "(int32)房堪封顶分",
    fangKanSingleScore = ''; // "(int32)房堪单项分 ",
    hiddenNumberDial = ''; // "(int32)小号通话------盘客",
    hiddenNumberDialBaseScore = ''; // "(int32)小号通话基础分",
    hiddenNumberDialHighestScore = ''; // "(int32)小号通话封顶分",
    hiddenNumberDialSingleScore = ''; // "(int32)小号通话单项分",
    houseAdd = ''; // "(int32)房增------盘客",
    houseAddBaseScore = ''; // "(int32)房增基础分  ",
    houseAddHighestScore = ''; // "(int32)房增封顶分",
    houseAddSingleScore = ''; // "(int32)方增单项分",
    houseRegistration = ''; // "(int32)房屋备案------盘客",
    houseRegistrationBaseScore = ''; // "(int32)房屋备案基础分",
    houseRegistrationHighestScore = ''; // "(int32)房屋备案封顶分",
    houseRegistrationSingleScore = ''; // "(int32)房屋备案单项分",
    houseTrack = ''; // "(int32)跟进------盘客",
    houseTrackBaseScore = ''; // "(int32)跟进基础分",
    houseTrackHighestScore = ''; // "(int32)跟进封顶分",
    houseTrackSingleScore = ''; // "(int32)跟进单项分",
    imageUpStd = ''; // "(int32)形象达标获得分数----------ml",
    mlAppRegistration = ''; // "(int32)美联app邀请注册----------ml",
    mlAppRegistrationBaseScore = ''; // "(int32)美联app邀请注册基础分",
    mlAppRegistrationHighestScore = ''; // "(int32)美联app邀请注册封顶分",
    mlAppRegistrationSingleScore = ''; // "(int32)美联app邀请注册单项分",
    onboardingYear1 = ''; // "(int32)入职1年获得分数----------ml",
    onboardingYear10 = ''; // "(int32)入职10年获得分数",
    onboardingYear2 = ''; // "(int32)入职2年获得分数----------ml",
    onboardingYear3 = ''; // "(int32)入职3年获得分数",
    onboardingYear4 = ''; // "(int32)入职4年获得分数",
    onboardingYear5 = ''; // "(int32)入职5年获得分数",
    onboardingYear6 = ''; // "(int32)入职6年获得分数",
    onboardingYear7 = ''; // "(int32)入职7年获得分数",
    onboardingYear8 = ''; // "(int32)入职8年获得分数",
    onboardingYear9 = ''; // "(int32)入职9年获得分数",
    recommendBusinessPosition = ''; // "(int32)推荐业务员入职----------ml",
    recommendManagePosition = ''; // "(int32)推荐管理人员入职----------ml",
    rentBillIndependent = ''; // "(int32)独立租单----------ml",
    rentBillIndependentBaseScore = ''; // "(int32)独立租单基础分",
    rentBillIndependentHighestScore = ''; // "(int32)独立租单封顶分",
    rentBillIndependentSingleScore = ''; // "(int32)独立租单单项分",
    rentBillInnerCooperation = ''; // "(int32)行内合作租单----------ml",
    rentBillInnerCooperationBaseScore = ''; // "(int32)行内合作租单基础分",
    rentBillInnerCooperationHighestScore = ''; // "(int32)行内合作租单封顶分",
    rentBillInnerCooperationSingleScore = ''; // "(int32)行内合作租单单项分",
    rentBillOuterCooperation = ''; // "(int32)夸行合作租单----------ml",
    rentBillOuterCooperationBaseScore = ''; // "(int32)夸行合作租单基础分",
    rentBillOuterCooperationHighestScore = ''; // "(int32)夸行合作租单封顶分",
    rentBillOuterCooperationSingleScore = ''; // "(int32)夸行合作租单单项分",
    reviewBuild = ''; // "(int32)一手踩盘------盘客",
    reviewBuildBaseScore = ''; // "(int32)一手踩盘基础分",
    reviewBuildHighestScore = ''; // "(int32)一手踩盘封顶分",
    reviewBuildSingleScore = ''; // "(int32)一手踩盘单项分",
    saleBillIndependent = ''; // "(int32)独立售单----------ml",
    saleBillIndependentBaseScore = ''; // "(int32)独立售单基础分",
    saleBillIndependentHighestScore = ''; // "(int32)独立售单封顶分",
    saleBillIndependentSingleScore = ''; // "(int32)独立售单单项分",
    saleBillInnerCooperation = ''; // "(int32)行内合作售单----------ml",
    saleBillInnerCooperationBaseScore = ''; // "(int32)行内合作售单基础分",
    saleBillInnerCooperationHighestScore = ''; // "(int32)行内合作售单封顶分",
    saleBillInnerCooperationSingleScore = ''; // "(int32)行内合作售单单项分",
    saleBillOuterCooperation = ''; // "(int32)跨行合作售单----------ml",
    saleBillOuterCooperationBaseScore = ''; // "(int32)跨行合作售单基础分",
    saleBillOuterCooperationHighestScore = ''; // "(int32)跨行合作售单封顶分",
    saleBillOuterCooperationSingleScore = ''; // "(int32)跨行合作售单单项分",
    starAgent = ''; // "(int32)星级经纪人获得分数----------ml",
    submitKey = ''; // "(int32)提交钥匙------盘客",
    submitKeyBaseScore = ''; // "(int32)提交钥匙基础分",
    submitKeyHighestScore = ''; // "(int32)提交钥匙封顶分 ",
    submitKeySingleScore = ''; // "(int32)提交钥匙单项分",
    takeLookBuild = ''; // "(int32)一手带看------盘客",
    takeLookBuildBaseScore = ''; // "(int32)一手带看基础分",
    takeLookBuildHighestScore = ''; // "(int32)一手带看封顶分",
    takeLookBuildSingleScore = ''; // "(int32)一手带看单项分",
    takeLookHouse = ''; // "(int32)二手带看------盘客",
    takeLookHouseBaseScore = ''; // "(int32)二手带看基础分",
    takeLookHouseHighestScore = ''; // "(int32)二手带看封顶分",
    takeLookHouseSingleScore = ''; // "(int32)二手带看单项分",
    trainingAttendanceHighestScore = ''; // "(int32)未培训出勤扣分封顶",
    trainingAttendanceSingleScore = ''; // "(int32)未培训出勤扣分每次----------ml",
    trainingFailedHighestScore = ''; // "(int32)培训未通过封顶扣分",
    trainingFailedSingleScore = ''; // "(int32)培训未通过单项扣分",
    uploadPhoto = ''; // "(int32)上传图片------盘客",
    uploadPhotoBaseScore = ''; // "(int32)上传图片基础分",
    uploadPhotoHighestScore = ''; // "(int32)上传图片封顶分",
    uploadPhotoSingleScore = ''; // "(int32)上传图片单项分",
    secondAddScorePoint = ''; // "(int32)上传图片单项分",
    brokerCertificate = ''; // 全国经纪人技能证书
    educationUpSingleScore = ''; // 继续教育单次分
    educationUpHighestScore = ''; // 继续教育封顶分
    collegeDegree = ''; // 专科
    undergraduateDegree = ''; // 本科
    graduateDegree = ''; // 本科及以上
    violateRedLine = ''; // 红线
    violateYellowLine = ''; // 黄线
    violateBlueLine = ''; // 蓝线

    thirdAddScorePoint = ''; //三类加分项：基础分完成多少时才使用加分
    thirdAddScoreHalfPoint = ''; //三类加分项[减半目标分]：基础分完成多少时才使用加分

    getNullValue(){
        return '';
    }

    getDefaultVal() {
        return '--';
    }
}
// 分行经理配置item 2
export class orgManagerConfigDetailItem {
    modifyTime = ''; // 上次修改时间
    cityId = ''; // "(int32)城市ID",
    compId = ''; // "(int32)null",
    configId = ''; // "(int32)配置ID",
    configName = ''; // "(string)配置名",
    createTime = ''; // "(date-time)创建时间",
    avgAchievementJson = []; // 人均业绩收支平衡比Json
    dealProportionJson = []; // 分行人员开单比Json
    employeeStabilityJson = []; // 人员稳定性评估Json
    avgCustHighestScore = ''; // "(number)人均有效客源总分封顶分",
    avgCustSingleScore = ''; // "(number)人均有效客源单项分",
    avgHouseHighestScore = ''; // "(number)人均有效房源总分封顶分",
    avgHouseSingleScore = ''; // "(number)人均有效房源单项分",
    avgIntroduceHighestScore = ''; // "(number)人均产品转介数封顶分",
    avgIntroduceSingleScore = ''; // "(number)人均产品转介数单项分",
    avgMsprogramIntroduceHighestScore = ''; // "(number)人均邀请使用小程序或加入美联会次数封顶分",
    avgMsprogramIntroduceSingleScore = ''; // "(number)人均邀请使用小程序或加入美联会次数单项分",
    avgPraiseHighestScore = ''; // "(number)人均服务好评封顶分",
    avgPraiseSingleScore = ''; // "(number)人均服务好评单项分",
    avgShareOrProposalHighestScore = ''; // "(number)分享文章或建议封顶分",
    avgShareOrProposalSingleScore = ''; // "(number)分享文章或建议单项分",
    executivePowerHighestScore = ''; // "(number)工作规则执行情况封顶分",
    executivePowerSingleScore = ''; // "(number)工作规则执行情况单项分",
    publishOfficialSingleScore = ''; // "(number)人均有效房源发官网单项分",
    updateTime = ''; // "(date-time)修改时间",

    userList = [];// 考核人员列表, // {"userId":1111,"userName":"xxx"}
    positionList = []; // 考核人员角色 // {"userPosition": "(string)角色", "userPositionName": "(string)角色名"}
}
// 区经配置item 3
export class regionManagerConfigDetailItem {
    modifyTime = ''; // 上次修改时间
    configId = ''; // "(int32)配置ID",
    configName = ''; // "(string)配置名",
    baseScore = ''; // "(number)分行平均KPI超过xx分",
    cityId = ''; // "(int32)城市id",
    compId = ''; // "(int32)null",
    createTime = ''; // "(date-time)创建时间",
    highestScore = ''; // "(number)最高可得xx分",
    unitAddScore = ''; // "(number)每分加xx分",
    updateTime = ''; // "(date-time)修改时间",
    useConfigId = ''; // "(int32)使用的经济人配置",

    userList = [];// 考核人员列表, // {"userId":1111,"userName":"xxx"}
    positionList = []; // 考核人员角色 // {"userPosition": "(string)角色", "userPositionName": "(string)角色名"}
}
// 区主配置item 4
export class cityManagerConfigDetailItem {
    modifyTime = ''; // 上次修改时间
    configId = ''; // "(int32)配置ID",
    configName = ''; // "(string)配置名称",
    achievementCompletionJson = []; // [],
    baseScore = ''; // "(number)分行平均KPI超过xx分",
    cityId = ''; // "(int32)城市ID",
    commissionCompletionJson = []; // [],
    highestScore = ''; // "(number)最高可得xx分",
    receivedCompletionJson = []; // [],
    unitAddScore = ''; // "(number)每分加xx分",
    useOrgConfigId = ''; // []

    userList = [];// 考核人员列表, // {"userId":1111,"userName":"xxx"}
    positionList = []; // 考核人员角色 // {"userPosition": "(string)角色", "userPositionName": "(string)角色名"}
}

export class GetConfigurationDetail {
    request;
    constructor (request = new GetConfigurationDetailRequest()) {
        this.request = request;
    }

    send () {
        return new GetConfigurationDetailApi(this.request).send()
          .then(res => {
              if (res.errCode !== Const.successCode) return Promise.reject(res);

              let response = new GetConfigurationDetailResponse();
              let data = res.data || {};

              let configType = this.request.configType;

              // 经纪人配置 1
              if (configType == 1){
                  let brokerConfig = new brokerConfigDetailItem();
                  for (let key in brokerConfig) {
                      brokerConfig[key] = data.brokerConfig[key] || brokerConfig[key];
                  }
                  response.brokerConfig = brokerConfig;
              }

              // 分行经理配置 2
              if (configType == 2){
                  let orgManagerItem = new orgManagerConfigDetailItem();
                  for (let key in orgManagerItem) {
                      orgManagerItem[key] = data.orgManagerConfig[key] || orgManagerItem[key];
                  }
                  response.orgManagerConfig = orgManagerItem;
              }

              // 区经配置 3
              if (configType == 3){
                  let regionManager = new regionManagerConfigDetailItem();
                  for (let key in regionManager) {
                      regionManager[key] = data.regionManagerConfig[key] || regionManager[key];
                  }
                  response.regionManagerConfig = regionManager;
              }

              // 区主配置 4
              if (configType == 4){
                  let cityManager = new cityManagerConfigDetailItem();
                  for (let key in cityManager) {
                      cityManager[key] = data.cityManagerConfig[key] || cityManager[key];
                  }
                  response.cityManagerConfig = cityManager;
              }

              return response;
          })
          .catch((res)=>{
              new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
              return new GetConfigurationDetailResponse();
          })
    }
}


// KPI配置 - 添加/修改区主配置
export class SaveCityManagerConfigurationRequest extends APIRequest{
    configId = ''; // 配置ID
    configName = ''; // 配置名称
    userIds = ''; // 应用的经纪人ID，多个用‘,’隔开
    achievementCompletionJson = ''; // 业绩目标完成率配置JSON
    receivedCompletionJson = ''; // 实收目标完成率配置JSON
    commissionCompletionJson = ''; // 近两年收佣率考核
    useOrgConfigId = ''; // 使用的分行平均kpi得分配置, 按照 useOrgConfigId 考核标准计算分行KPI分数
    baseScore = ""; // 分行平均KPI超过 baseScore 分
    unitAddScore = ""; // 每分加 unitAddScore 分
    highestScore = ""; // 最高可得 highestScore 分
    constructor(obj = {}) {
        super();
        this.configId = obj.configId || '';
        this.configName = obj.baseConf.configName || '';
        this.userIds = obj.baseConf.userIdList || '';
        this.achievementCompletionJson = obj.yeJi || [];
        this.receivedCompletionJson = obj.shiShou || [];
        this.commissionCompletionJson = [];// obj.commissionRate || [];
        this.useOrgConfigId = 3; //obj.averageScore.useOrgConfigId || [];
        this.baseScore = obj.averageScore.baseScore || [];
        this.unitAddScore = obj.averageScore.unitAddScore || [];
        this.highestScore = obj.averageScore.highestScore || [];
    }
}
export class SaveCityManagerConfigurationApi extends PostRequest{
    constructor(request = new SaveCityManagerConfigurationRequest()) {
        super(request);
    }

    getUrl() {
        return "/kpiWeb/broker/configuration/saveCityManagerConfiguration";
    }

    getNeedToken() {
        return true;
    }
}

// KPI配置 - 添加/修改区经配置
export class SaveRegionManagerConfigurationRequest extends APIRequest{
    configId = ''; // 配置ID
    configName = ''; // 配置名称
    userIds = ''; // 应用的经纪人ID，多个用‘,’隔开
    useOrgConfigId = ''; // 使用的分行平均kpi得分配置, 按照 useOrgConfigId 考核标准计算分行KPI分数
    baseScore = ""; // 分行平均KPI超过 baseScore 分
    unitAddScore = ""; // 每分加 unitAddScore 分
    highestScore = ""; // 最高可得 highestScore 分
    constructor(obj = {}) {
        super();
        this.configId = obj.configId || '';
        this.configName = obj.baseConf.configName || '';
        this.userIds = obj.baseConf.userIdList || '';
        this.useOrgConfigId = 3; //obj.averageScore.useOrgConfigId || [];
        this.baseScore = obj.averageScore.baseScore || [];
        this.unitAddScore = obj.averageScore.unitAddScore || [];
        this.highestScore = obj.averageScore.highestScore || [];
    }
}
export class SaveRegionManagerConfigurationApi extends PostRequest{
    constructor(request = new SaveRegionManagerConfigurationRequest()) {
        super(request);
    }

    getUrl() {
        return "/kpiWeb/broker/configuration/saveRegionManagerConfiguration";
    }

    getNeedToken() {
        return true;
    }
}

// KPI配置 - 添加/修改分行经理配置
export class SaveOrgManagerConfigurationRequest extends APIRequest{
    configId = ''; // 配置ID
    configName = ''; // 配置名称
    userIds = ''; // "(string)应用的经纪人ID，多个用‘,’隔开"

    avgAchievementJson = ''; // [], // 人均业绩收支平衡比
    dealProportionJson = ''; // [], // 分行人员开单比
    employeeStabilityJson = ''; // [],  // 分行人员稳定性
    publishOfficialSingleScore = ''; // "(number)人均有效房源发官网单项分",

    avgHouseSingleScore = ''; // "(number)人均有效房源单项分",
    avgCustSingleScore = ''; // "(number)人均有效客源单项分",
    avgCustHighestScore = ''; // "(number)人均有效客源总分封顶分",
    avgHouseHighestScore = ''; // "(number)人均有效房源总分封顶分",

    avgIntroduceHighestScore = ''; // "(number)人均产品转介数封顶分",
    avgIntroduceSingleScore = ''; // "(number)人均产品转介数单项分",
    avgMsprogramIntroduceHighestScore = ''; // "(number)人均邀请使用小程序或加入美联会次数封顶分",
    avgMsprogramIntroduceSingleScore = ''; // "(number)人均邀请使用小程序或加入美联会次数单项分",
    avgPraiseHighestScore = ''; // "(number)人均服务好评封顶分",
    avgPraiseSingleScore = ''; // "(number)人均服务好评单项分",
    avgShareOrProposalHighestScore = ''; // "(number)分享文章或建议封顶分",
    avgShareOrProposalSingleScore = ''; // "(number)分享文章或建议单项分",
    executivePowerHighestScore = ''; // "(number)工作规则执行情况封顶分",
    executivePowerSingleScore = ''; // "(number)工作规则执行情况单项分",
    constructor(obj = {}) {
        super();
        this.configId = obj.configId || '';
        this.configName = obj.baseConf.configName || '';
        this.userIds = obj.baseConf.userIdList;
        this.avgAchievementJson = obj.renJunYeJi; // 人均业绩收支平衡比
        this.dealProportionJson = obj.billingRatioData; // 分行人员开单比
        this.employeeStabilityJson = obj.personnelStable; // 分行人员稳定性
        this.avgHouseHighestScore = obj.renJunYouXiaoFangYuan;
        this.avgCustHighestScore = obj.renJunKeHuZhiYuan;
        this.publishOfficialSingleScore = obj.publishOfficialSingleScore;
        this.avgHouseSingleScore = obj.avgHouseSingleScore;
        this.avgCustSingleScore = obj.avgCustSingleScore;
        this.avgIntroduceHighestScore = obj.avgIntroduceHighestScore;
        this.avgIntroduceSingleScore = obj.avgIntroduceSingleScore;
        this.avgMsprogramIntroduceHighestScore = obj.avgMsprogramIntroduceHighestScore;
        this.avgMsprogramIntroduceSingleScore = obj.avgMsprogramIntroduceSingleScore;
        this.avgPraiseHighestScore = obj.avgPraiseHighestScore;
        this.avgPraiseSingleScore = obj.avgPraiseSingleScore;
        this.avgShareOrProposalHighestScore = obj.avgShareOrProposalHighestScore;
        this.avgShareOrProposalSingleScore = obj.avgShareOrProposalSingleScore;
        this.executivePowerHighestScore = obj.executivePowerHighestScore;
        this.executivePowerSingleScore = obj.executivePowerSingleScore;
    }
}
export class SaveOrgManagerConfigurationApi extends PostRequest{
    constructor(request = new SaveRegionManagerConfigurationRequest()) {
        super(request);
    }

    getUrl() {
        return "/kpiWeb/broker/configuration/saveRegionManagerConfiguration";
    }

    getNeedToken() {
        return true;
    }
}

// KPI配置 - 添加/修改经纪人配置
export class SaveBrokerConfigurationRequest extends APIRequest{
    configId = ''; // "(int32)配置ID",
    configName = ''; // "(string)配置名称",
    userIds = ''; // "(string)应用的经纪人ID，多个用‘,’隔开",
    userPositions = ''; // "(string)应用角色，多个用‘,’隔开",

    houseAdd = ''; // "(int32)房增------盘客",
    houseAddBaseScore = ''; // "(int32)房增基础分  ",
    houseAddHighestScore = ''; // "(int32)房增封顶分",
    houseAddSingleScore = ''; // "(int32)方增单项分",
    houseRegistration = ''; // "(int32)房屋备案------盘客",
    houseRegistrationBaseScore = ''; // "(int32)房屋备案基础分",
    houseRegistrationHighestScore = ''; // "(int32)房屋备案封顶分",
    houseRegistrationSingleScore = ''; // "(int32)房屋备案单项分",
    uploadPhoto = ''; // "(int32)上传图片------盘客",
    uploadPhotoBaseScore = ''; // "(int32)上传图片基础分",
    uploadPhotoHighestScore = ''; // "(int32)上传图片封顶分",
    uploadPhotoSingleScore = ''; // "(int32)上传图片单项分",
    fangKan = ''; // "(int32)房堪------盘客",
    fangKanBaseScore = ''; // "(int32)房堪基础分 ",
    fangKanHighestScore = ''; // "(int32)房堪封顶分",
    fangKanSingleScore = ''; // "(int32)房堪单项分 ",
    takeLookHouse = ''; // "(int32)二手带看------盘客",
    takeLookHouseBaseScore = ''; // "(int32)二手带看基础分",
    takeLookHouseHighestScore = ''; // "(int32)二手带看封顶分",
    takeLookHouseSingleScore = ''; // "(int32)二手带看单项分",
    houseTrack = ''; // "(int32)跟进------盘客",
    houseTrackBaseScore = ''; // "(int32)跟进基础分",
    houseTrackHighestScore = ''; // "(int32)跟进封顶分",
    houseTrackSingleScore = ''; // "(int32)跟进单项分",

    custAdd = ''; // "(int32)客增------盘客",
    custAddBaseScore = ''; // "(int32)客增基础分",
    custAddHighestScore = ''; // "(int32)客增封顶分",
    custAddSingleScore = ''; // "(int32)客增单项分",
    submitKey = ''; // "(int32)提交钥匙------盘客",
    submitKeyBaseScore = ''; // "(int32)提交钥匙基础分",
    submitKeyHighestScore = ''; // "(int32)提交钥匙封顶分 ",
    submitKeySingleScore = ''; // "(int32)提交钥匙单项分",
    reviewBuild = ''; // "(int32)一手踩盘------盘客",
    reviewBuildBaseScore = ''; // "(int32)一手踩盘基础分",
    reviewBuildHighestScore = ''; // "(int32)一手踩盘封顶分",
    reviewBuildSingleScore = ''; // "(int32)一手踩盘单项分",
    takeLookBuild = ''; // "(int32)一手带看------盘客",
    takeLookBuildBaseScore = ''; // "(int32)一手带看基础分",
    takeLookBuildHighestScore = ''; // "(int32)一手带看封顶分",
    takeLookBuildSingleScore = ''; // "(int32)一手带看单项分",
    hiddenNumberDial = ''; // "(int32)小号通话------盘客",
    hiddenNumberDialBaseScore = ''; // "(int32)小号通话基础分",
    hiddenNumberDialHighestScore = ''; // "(int32)小号通话封顶分",
    hiddenNumberDialSingleScore = ''; // "(int32)小号通话单项分",

    attendanceUpStd = ''; // "(int32)考勤达标获得分数----------ml",
    imageUpStd = ''; // "(int32)形象达标获得分数----------ml",
    starAgent = ''; // "(int32)星级经纪人获得分数----------ml",

    addScorePoint = ''; // "(int32)基础分完成多少时才使用加分",
    addScoreHalfPoint = '';
    secondAddScorePoint = ''; // "(int32)二类加分项 基础分完成多少时才使用加分",
    secondAddScoreHalfPoint = '';

    exclusiveCommission = ''; // "(int32)委托------盘客",
    exclusiveCommissionHighestScore = ''; // "(int32)委托封顶分",
    exclusiveCommissionSingleScore = ''; // "(int32)委托单项分",
    rentBillIndependent = ''; // "(int32)独立租单----------ml",
    rentBillIndependentHighestScore = ''; // "(int32)独立租单封顶分",
    rentBillIndependentSingleScore = ''; // "(int32)独立租单单项分",
    rentBillInnerCooperation = ''; // "(int32)行内合作租单----------ml",
    rentBillInnerCooperationHighestScore = ''; // "(int32)行内合作租单封顶分",
    rentBillInnerCooperationSingleScore = ''; // "(int32)行内合作租单单项分",
    rentBillOuterCooperation = ''; // "(int32)夸行合作租单----------ml",
    rentBillOuterCooperationHighestScore = ''; // "(int32)夸行合作租单封顶分",
    rentBillOuterCooperationSingleScore = ''; // "(int32)夸行合作租单单项分",
    saleBillIndependent = ''; // "(int32)独立售单----------ml",
    saleBillIndependentHighestScore = ''; // "(int32)独立售单封顶分",
    saleBillIndependentSingleScore = ''; // "(int32)独立售单单项分",
    saleBillInnerCooperation = ''; // "(int32)行内合作售单----------ml",
    saleBillInnerCooperationHighestScore = ''; // "(int32)行内合作售单封顶分",
    saleBillInnerCooperationSingleScore = ''; // "(int32)行内合作售单单项分",
    saleBillOuterCooperation = ''; // "(int32)跨行合作售单----------ml",
    saleBillOuterCooperationHighestScore = ''; // "(int32)跨行合作售单封顶分",
    saleBillOuterCooperationSingleScore = ''; // "(int32)跨行合作售单单项分",
    mlAppRegistration = ''; // "(int32)美联app邀请注册----------ml",
    mlAppRegistrationHighestScore = ''; // "(int32)美联app邀请注册封顶分",
    mlAppRegistrationSingleScore = ''; // "(int32)美联app邀请注册单项分",

    recommendBusinessPosition = ''; // "(int32)推荐业务员入职----------ml",
    recommendManagePosition = ''; // "(int32)推荐管理人员入职----------ml",

    thirdAddScorePoint = ''; // "(int32) 三类加分项：基础分完成多少时才使用加分",
    thirdAddScoreHalfPoint = ''; // 三类加分项[减半目标分]：基础分完成多少时才使用加分

    brokerCertificate = ''; // "(int32)全国经纪人技能证书 BROKER__CERTIFICATE",
    educationUpSingleScore = ''; // "(int32)继续教育单次分 EDUCATION_UP_SINGLE_SCORE",
    educationUpHighestScore = ''; // "(int32)继续教育封顶分 EDUCATION_UP_HIGHEST_SCORE",

    onboardingYear1 = ''; // "(int32)入职1年获得分数----------ml",
    onboardingYear2 = ''; //(int32)入职2年获得分数----------ml",
    onboardingYear3 = ''; //(int32)入职3年获得分数",
    onboardingYear4 = ''; //(int32)入职4年获得分数",
    onboardingYear5 = ''; //(int32)入职5年获得分数",
    onboardingYear6 = ''; //(int32)入职6年获得分数",
    onboardingYear7 = ''; //(int32)入职7年获得分数",
    onboardingYear8 = ''; //(int32)入职8年获得分数",
    onboardingYear9 = ''; //(int32)入职9年获得分数",
    onboardingYear10 = ''; // "(int32)入职10年获得分数",

    collegeDegree = ''; // "(int32)全日制专科学历  COLLEGE_DEGREE",
    graduateDegree = ''; // "(int32)本科及以上学历  GRADUATE_DEGREE",
    undergraduateDegree = ''; // "(int32)全日制本科学历  UNDERGRADUATE_DEGREE",

    trainingAttendanceHighestScore = ''; // "(int32)未培训出勤扣分封顶",
    trainingAttendanceSingleScore = ''; // "(int32)未培训出勤扣分每次----------ml",
    trainingFailedHighestScore = ''; // "(int32)培训未通过封顶扣分",
    trainingFailedSingleScore = ''; // "(int32)培训未通过单项扣分",

    violateBlueLine = ''; // "(int32)触犯蓝线 -1.扣完，>0单次都xx分----------ml",
    violateRedLine = ''; // "(int32)触犯红线 -1.扣完，>0单次都xx分  ----------ml",
    violateYellowLine = ''; // "(int32)触犯黄线 -1.扣完，>0单次都xx分----------ml"

    execTime = ''; // 生效时间
    constructor(obj = {}) {
        super();
        this.configId = obj.configId || ''; // "(int32)配置ID",
        this.configName = obj.baseConf.configName || ''; // "(string)配置名称",
        this.userIds = obj.baseConf.chooseType == 'user' ? obj.baseConf.userIdStr : ''; // "(string)应用的经纪人ID，多个用‘,’隔开",
        this.userPositions = obj.baseConf.chooseType != 'user' ? obj.baseConf.userIdStr : ''; // "(string)应用的经纪人ID，多个用‘,’隔开",

        this.houseAdd = obj.panYuanKaoHe.houseAdd || ''; // "(int32)房增------盘客",
        this.houseAddBaseScore = obj.panYuanKaoHe.houseAddBaseScore || ''; // "(int32)房增基础分  ",
        this.houseAddHighestScore = obj.panYuanKaoHe.houseAddHighestScore || ''; // "(int32)房增封顶分",
        this.houseAddSingleScore = obj.panYuanKaoHe.houseAddSingleScore || ''; // "(int32)方增单项分",
        this.houseRegistration = obj.panYuanKaoHe.houseRegistration || ''; // "(int32)房屋备案------盘客",
        this.houseRegistrationBaseScore = obj.panYuanKaoHe.houseRegistrationBaseScore || ''; // "(int32)房屋备案基础分",
        this.houseRegistrationHighestScore = obj.panYuanKaoHe.houseRegistrationHighestScore || ''; // "(int32)房屋备案封顶分",
        this.houseRegistrationSingleScore = obj.panYuanKaoHe.houseRegistrationSingleScore || ''; // "(int32)房屋备案单项分",
        this.uploadPhoto = obj.panYuanKaoHe.uploadPhoto || ''; // "(int32)上传图片------盘客",
        this.uploadPhotoBaseScore = obj.panYuanKaoHe.uploadPhotoBaseScore || ''; // "(int32)上传图片基础分",
        this.uploadPhotoHighestScore = obj.panYuanKaoHe.uploadPhotoHighestScore || ''; // "(int32)上传图片封顶分",
        this.uploadPhotoSingleScore = obj.panYuanKaoHe.uploadPhotoSingleScore || ''; // "(int32)上传图片单项分",
        this.fangKan = obj.panYuanKaoHe.fangKan || ''; // "(int32)房堪------盘客",
        this.fangKanBaseScore = obj.panYuanKaoHe.fangKanBaseScore || ''; // "(int32)房堪基础分 ",
        this.fangKanHighestScore = obj.panYuanKaoHe.fangKanHighestScore || ''; // "(int32)房堪封顶分",
        this.fangKanSingleScore = obj.panYuanKaoHe.fangKanSingleScore || ''; // "(int32)房堪单项分 ",
        this.takeLookHouse = obj.panYuanKaoHe.takeLookHouse || ''; // "(int32)二手带看------盘客",
        this.takeLookHouseBaseScore = obj.panYuanKaoHe.takeLookHouseBaseScore || ''; // "(int32)二手带看基础分",
        this.takeLookHouseHighestScore = obj.panYuanKaoHe.takeLookHouseHighestScore || ''; // "(int32)二手带看封顶分",
        this.takeLookHouseSingleScore = obj.panYuanKaoHe.takeLookHouseSingleScore || ''; // "(int32)二手带看单项分",
        this.houseTrack = obj.panYuanKaoHe.houseTrack || ''; // "(int32)跟进------盘客",
        this.houseTrackBaseScore = obj.panYuanKaoHe.houseTrackBaseScore || ''; // "(int32)跟进基础分",
        this.houseTrackHighestScore = obj.panYuanKaoHe.houseTrackHighestScore || ''; // "(int32)跟进封顶分",
        this.houseTrackSingleScore = obj.panYuanKaoHe.houseTrackSingleScore || ''; // "(int32)跟进单项分",

        this.custAdd = obj.keYuanKaoHe.custAdd || ''; // "(int32)客增------盘客",
        this.custAddBaseScore = obj.keYuanKaoHe.custAddBaseScore || ''; // "(int32)客增基础分",
        this.custAddHighestScore = obj.keYuanKaoHe.custAddHighestScore || ''; // "(int32)客增封顶分",
        this.custAddSingleScore = obj.keYuanKaoHe.custAddSingleScore || ''; // "(int32)客增单项分",
        this.submitKey = obj.keYuanKaoHe.submitKey || ''; // "(int32)提交钥匙------盘客",
        this.submitKeyBaseScore = obj.keYuanKaoHe.submitKeyBaseScore || ''; // "(int32)提交钥匙基础分",
        this.submitKeyHighestScore = obj.keYuanKaoHe.submitKeyHighestScore || ''; // "(int32)提交钥匙封顶分 ",
        this.submitKeySingleScore = obj.keYuanKaoHe.submitKeySingleScore || ''; // "(int32)提交钥匙单项分",
        this.reviewBuild = obj.keYuanKaoHe.reviewBuild || ''; // "(int32)一手踩盘------盘客",
        this.reviewBuildBaseScore = obj.keYuanKaoHe.reviewBuildBaseScore || ''; // "(int32)一手踩盘基础分",
        this.reviewBuildHighestScore = obj.keYuanKaoHe.reviewBuildHighestScore || ''; // "(int32)一手踩盘封顶分",
        this.reviewBuildSingleScore = obj.keYuanKaoHe.reviewBuildSingleScore || ''; // "(int32)一手踩盘单项分",
        this.takeLookBuild = obj.keYuanKaoHe.takeLookBuild || ''; // "(int32)一手带看------盘客",
        this.takeLookBuildBaseScore = obj.keYuanKaoHe.takeLookBuildBaseScore || ''; // "(int32)一手带看基础分",
        this.takeLookBuildHighestScore = obj.keYuanKaoHe.takeLookBuildHighestScore || ''; // "(int32)一手带看封顶分",
        this.takeLookBuildSingleScore = obj.keYuanKaoHe.takeLookBuildSingleScore || ''; // "(int32)一手带看单项分",
        this.hiddenNumberDial = obj.keYuanKaoHe.hiddenNumberDial || ''; // "(int32)小号通话------盘客",
        this.hiddenNumberDialBaseScore = obj.keYuanKaoHe.hiddenNumberDialBaseScore || ''; // "(int32)小号通话基础分",
        this.hiddenNumberDialHighestScore = obj.keYuanKaoHe.hiddenNumberDialHighestScore || ''; // "(int32)小号通话封顶分",
        this.hiddenNumberDialSingleScore = obj.keYuanKaoHe.hiddenNumberDialSingleScore || ''; // "(int32)小号通话单项分",

        this.attendanceUpStd = obj.otherKaoHe.attendanceUpStd || ''; // "(int32)考勤达标获得分数----------ml",
        this.imageUpStd = obj.otherKaoHe.imageUpStd || ''; // "(int32)形象达标获得分数----------ml",
        this.starAgent = obj.otherKaoHe.starAgent || ''; // "(int32)形象达标获得分数----------ml",

        this.addScorePoint = obj.bonusRules.addScorePoint || ''; // "(int32)基础分完成多少时才使用加分", 第一类加分规则
        this.addScoreHalfPoint = obj.bonusRules.addScoreHalfPoint || ''; // "(int32)基础分完成多少时才使用加分", 第一类加分规则
        this.secondAddScorePoint = obj.secondBonusRules.addScorePoint || ''; // "(int32)基础分完成多少时才使用加分", 第一类加分规则
        this.secondAddScoreHalfPoint = obj.secondBonusRules.addScoreHalfPoint || ''; // "(int32)基础分完成多少时才使用加分", 第一类加分规则

        this.exclusiveCommission = obj.duJiaWeiTuo.exclusiveCommission || ''; // "(int32)委托------盘客",
        this.exclusiveCommissionHighestScore = obj.duJiaWeiTuo.exclusiveCommissionHighestScore || ''; // "(int32)委托封顶分",
        this.exclusiveCommissionSingleScore = obj.duJiaWeiTuo.exclusiveCommissionSingleScore || ''; // "(int32)委托单项分",
        this.rentBillIndependent = obj.duJiaWeiTuo.rentBillIndependent || ''; // "(int32)独立租单----------ml",
        this.rentBillIndependentHighestScore = obj.duJiaWeiTuo.rentBillIndependentHighestScore || ''; // "(int32)独立租单封顶分",
        this.rentBillIndependentSingleScore = obj.duJiaWeiTuo.rentBillIndependentSingleScore || ''; // "(int32)独立租单单项分",
        this.rentBillInnerCooperation = obj.duJiaWeiTuo.rentBillInnerCooperation || ''; // "(int32)行内合作租单----------ml",
        this.rentBillInnerCooperationHighestScore = obj.duJiaWeiTuo.rentBillInnerCooperationHighestScore || ''; // "(int32)行内合作租单封顶分",
        this.rentBillInnerCooperationSingleScore = obj.duJiaWeiTuo.rentBillInnerCooperationSingleScore || ''; // "(int32)行内合作租单单项分",
        this.rentBillOuterCooperation = obj.duJiaWeiTuo.rentBillOuterCooperation || ''; // "(int32)夸行合作租单----------ml",
        this.rentBillOuterCooperationHighestScore = obj.duJiaWeiTuo.rentBillOuterCooperationHighestScore || ''; // "(int32)夸行合作租单封顶分",
        this.rentBillOuterCooperationSingleScore = obj.duJiaWeiTuo.rentBillOuterCooperationSingleScore || ''; // "(int32)夸行合作租单单项分",
        this.saleBillIndependent = obj.duJiaWeiTuo.saleBillIndependent || ''; // "(int32)独立售单----------ml",
        this.saleBillIndependentHighestScore = obj.duJiaWeiTuo.saleBillIndependentHighestScore || ''; // "(int32)独立售单封顶分",
        this.saleBillIndependentSingleScore = obj.duJiaWeiTuo.saleBillIndependentSingleScore || ''; // "(int32)独立售单单项分",
        this.saleBillInnerCooperation = obj.duJiaWeiTuo.saleBillInnerCooperation || ''; // "(int32)行内合作售单----------ml",
        this.saleBillInnerCooperationHighestScore = obj.duJiaWeiTuo.saleBillInnerCooperationHighestScore || ''; // "(int32)行内合作售单封顶分",
        this.saleBillInnerCooperationSingleScore = obj.duJiaWeiTuo.saleBillInnerCooperationSingleScore || ''; // "(int32)行内合作售单单项分",
        this.saleBillOuterCooperation = obj.duJiaWeiTuo.saleBillOuterCooperation || ''; // "(int32)跨行合作售单----------ml",
        this.saleBillOuterCooperationHighestScore = obj.duJiaWeiTuo.saleBillOuterCooperationHighestScore || ''; // "(int32)跨行合作售单封顶分",
        this.saleBillOuterCooperationSingleScore = obj.duJiaWeiTuo.saleBillOuterCooperationSingleScore || ''; // "(int32)跨行合作售单单项分",
        this.mlAppRegistration = obj.duJiaWeiTuo.mlAppRegistration || ''; // "(int32)美联app邀请注册----------ml",
        this.mlAppRegistrationHighestScore = obj.duJiaWeiTuo.mlAppRegistrationHighestScore || ''; // "(int32)美联app邀请注册封顶分",
        this.mlAppRegistrationSingleScore = obj.duJiaWeiTuo.mlAppRegistrationSingleScore || ''; // "(int32)美联app邀请注册单项分",

        this.recommendBusinessPosition = obj.tuiJianRuZhi.recommendBusinessPosition || ''; // "(int32)推荐业务员入职----------ml",
        this.recommendManagePosition = obj.tuiJianRuZhi.recommendManagePosition || ''; // "(int32)推荐管理人员入职----------ml",

        this.thirdAddScorePoint = obj.thirdBonusRules.addScorePoint || ''; // 三类加分项：基础分完成多少时才使用加分
        this.thirdAddScoreHalfPoint = obj.thirdBonusRules.addScoreHalfPoint || ''; // 三类加分项[减半目标分]：基础分完成多少时才使用加分

        this.brokerCertificate = obj.brokerID.brokerCertificate || ''; // "(int32)全国经纪人技能证书 BROKER__CERTIFICATE",
        this.educationUpSingleScore = obj.brokerID.educationUpSingleScore || ''; // "(int32)继续教育单次分 EDUCATION_UP_SINGLE_SCORE",
        this.educationUpHighestScore = obj.brokerID.educationUpHighestScore || ''; // "(int32)继续教育封顶分 EDUCATION_UP_HIGHEST_SCORE",

        this.onboardingYear1 = obj.seniority.onboardingYear1 || ''; // "(int32)入职1年获得分数----------ml",
        this.onboardingYear2 = obj.seniority.onboardingYear2 || ''; //(int32)入职2年获得分数----------ml",
        this.onboardingYear3 = obj.seniority.onboardingYear3 || ''; //(int32)入职3年获得分数",
        this.onboardingYear4 = obj.seniority.onboardingYear4 || ''; //(int32)入职4年获得分数",
        this.onboardingYear5 = obj.seniority.onboardingYear5 || ''; //(int32)入职5年获得分数",
        this.onboardingYear6 = obj.seniority.onboardingYear6 || ''; //(int32)入职6年获得分数",
        this.onboardingYear7 = obj.seniority.onboardingYear7 || ''; //(int32)入职7年获得分数",
        this.onboardingYear8 = obj.seniority.onboardingYear8 || ''; //(int32)入职8年获得分数",
        this.onboardingYear9 = obj.seniority.onboardingYear9 || ''; //(int32)入职9年获得分数",
        this.onboardingYear10 = obj.seniority.onboardingYear10 || ''; // "(int32)入职10年获得分数",

        this.collegeDegree = obj.education.collegeDegree || ''; // "(int32)全日制专科学历  COLLEGE_DEGREE",
        this.graduateDegree = obj.education.graduateDegree || ''; // "(int32)本科及以上学历  GRADUATE_DEGREE",
        this.undergraduateDegree = obj.education.undergraduateDegree || ''; // "(int32)全日制本科学历  UNDERGRADUATE_DEGREE",

        this.trainingAttendanceHighestScore = obj.penalties.trainingAttendanceHighestScore || ''; // "(int32)未培训出勤扣分封顶",
        this.trainingAttendanceSingleScore = obj.penalties.trainingAttendanceSingleScore || ''; // "(int32)未培训出勤扣分每次----------ml",
        this.trainingFailedHighestScore = obj.penalties.trainingFailedHighestScore || ''; // "(int32)培训未通过封顶扣分",
        this.trainingFailedSingleScore = obj.penalties.trainingFailedSingleScore || ''; // "(int32)培训未通过单项扣分",

        this.violateBlueLine = obj.violate.violateBlueLine || ''; // "(int32)触犯蓝线 -1.扣完，>0单次都xx分----------ml",
        this.violateRedLine = obj.violate.violateRedLine || ''; // "(int32)触犯红线 -1.扣完，>0单次都xx分  ----------ml",
        this.violateYellowLine = obj.violate.violateYellowLine || ''; // "(int32)触犯黄线 -1.扣完，>0单次都xx分----------ml"

        this.execTime = obj.execTime || ''; // 生效时间
    }
}
export class SaveBrokerConfigurationApi extends PostRequest{
    constructor(request = new SaveBrokerConfigurationRequest()) {
        super(request);
    }

    getUrl() {
        return "/kpiWeb/broker/configuration/saveBrokerConfiguration";
    }

    getNeedToken() {
        return true;
    }
}


// KPI删除配置 /kpiWeb/broker/configuration/deleteBrokerConfiguration  DeleteBrokerConfiguration
export class DeleteBrokerConfigurationRequest extends APIRequest{
    configId = '';
    configType = '';
    constructor(obj = {}) {
        super();
        this.configId = obj.configId || '';
        this.configType = obj.configType || '';
    }
}
export class DeleteBrokerConfigurationApi extends PostRequest{
    constructor(request = new DeleteBrokerConfigurationRequest()) {
        super(request);
    }

    getUrl() {
        return "/kpiWeb/broker/configuration/deleteBrokerConfiguration";
    }

    getNeedToken() {
        return true;
    }
}
