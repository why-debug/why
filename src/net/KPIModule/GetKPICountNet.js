// KPI统计相关接口

import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "../../common/utils/Const";
import { ErpCommon } from "../../utils/ErpCommon";

// 分行经理列表 与 区经列表 基础字段item
class DefaultManagerListItem {
    orderNum = ""; //序号
    dateTime = "2020年4月"; //日期
    name = '王鹏'; // 姓名
    id = "P123465"; //员工编号
    jobLevel = '住宅S5'; // 职级
    jobName = '经纪人'; //职位
    checkAim = '足月目标' //考核目标类型
    kpiTotalScore = 20; //KPI总分
    perAchieveMoney = '302,600.56'; //人均完成业绩金额

    renJunYeJiNow = 3; // 人均业绩在收支平衡的比例得分
    // renJunYeJiAims = 10;
    renJunYeJiScore = 10;

    activeListingsNow = 1; // 人均有效房源
    activeListingsAims = 20;
    activeListingsScore = 30;


    keHuSourceNow = 3; // 人均客户资源录入系统(个)
    keHuSourceAims = 10;
    keHuSourceScore = 10;

    // zhuanJieNow = 3;  // 转介(人均)
    // zhuanJieAims = 10;
    zhuanJieScore = 10;


    // fuWuHaoPingNow = 3;  // 人均服务好评(次）
    // fuWuHaoPingAims = 10;
    fuWuHaoPingScore = 10;

    // useAppletNow = 3; // 人均邀请使用小程序或加入美联会(次）
    // useAppletAims = 10;
    useAppletScore = 10;

    // workingRulesNow = 3; // 分行执行总行制定的工作规则
    // workingRulesAims = 10;
    workingRulesScore = 10;

    // articleNow = 3; // 人均知识库分享文章(个)
    // articleAims = 10;
    articleScore = 10;

    // suggestNow = 4; // 业务员平均提供合理化建议(个)
    // suggestAims = 10;
    suggestScore = 10;

    billingRatioNow = 4; // 分行人数开单比例
    // billingRatioAims = 10;
    billingRatioScore = 10;

    stabilityNow = 4; // 分行人员稳定性
    // stabilityAims = 10;
    stabilityScore = 10;

    getDefault() {
        return '';
    }
}

// KPI配置 - 获取经纪人统计列表
export class GetBrokerCountListRequest extends APIRequest {
    kpiTargetType = "";
    month = "2020-3";
    organizationId = 1;
    pageOffset = 1;
    pageRows = 30;
    userId = 1;
    personNumSearch = '';//员工编号模糊检索
    isExport = 0;

    constructor(obj = {}) {
        super();
        this.kpiTargetType = parseInt(obj.kpiTargetType) || '';
        this.month = obj.month || '';
        this.organizationId = parseInt(obj.organizationId) || '';
        this.pageOffset = obj.pageOffset || '';
        this.pageRows = obj.pageSize || '';
        this.userId = parseInt(obj.userId) || '';
        this.userNo = obj.personNumSearch || '';
        this.isExport = obj.isExport || '0';
    }
}
class GetBrokerCountListApi extends PostRequest {
    constructor(request = new GetBrokerCountListRequest()) {
        super(request);
    }

    getUrl() {
        return "/kpiWeb/broker/statistic/getBrokerStatisticListData";
    }

    getNeedToken() {
        return true;
    }
}
export class GetBrokerCountListResponse extends APIResponse {
    list = []; // 主行列表
    total = 0;
    pageNum = 1;
    pageSize = 20;
    totalPage = 1;
    constructor() {
        super();
    }
}
export class GetBrokerCountListItem {
    id = 1; //用户ID
    name = '王鹏'; // 姓名
    personNum = '';//员工编号
    deptName = '中冶田园世界'; // 部门
    jobName = '正式经纪人'; //岗位
    checkAim = '足月目标'; //考核目标类型
    allNum = 2700; // 实时总分

    addHouseNow = 3; // 新增房源(套) addHouseNow/addHouseAims +addHouseScore
    addHouseAims = 10;
    addHouseScore = 10;

    addCustomNow = 3; // 客户新增(个) addCustomNow/addCustomAims +addCustomScore
    addCustomAims = 10;
    addCustomScore = 12;

    houseBeiAnNow = 3; // 房源备案(套) houseBeiAnNow/houseBeiAnAims +houseBeiAnScore
    houseBeiAnAims = 10;
    houseBeiAnScore = 10;

    addKeyNow = 3; // 新增钥匙(套) addKeyNow/addKeyAims +addKeyScore
    addKeyAims = 10;
    addKeyScore = 10;

    uploadImgNow = 3; // 上传图片(套) uploadImgNow/uploadImgAims +uploadImgScore
    uploadImgAims = 10;
    uploadImgScore = 10;

    phoneCallNow = 3; // 小号跟进(通) phoneCallNow/phoneCallAims +phoneCallScore
    phoneCallAims = 10;
    phoneCallScore = 10;

    reviewBuild = 3; //一手踩盘 reviewBuild/targetReviewBuild +reviewBuildScore
    targetReviewBuild = 10;
    reviewBuildScore = 10;

    fangKan = 3; // 二手实堪 fangKan/houseBeiAnAims +fangKanScore
    targetFangKan = 10;
    fangKanScore = 10;

    yiShouDaiKanNow = 3; // 一手带看(套) yiSouDaiKanNow/yiSouDaiKanAims +yiSouDaiKanScore
    yiShouDaiKanAims = 10;
    yiShouDaiKanScore = 10;

    ershouDaiKanNow = 3; // 二手带看(套) ershouDaiKanNow/ershouDaiKanAims +ershouDaiKanScore
    ershouDaiKanAims = 10;
    ershouDaiKanScore = 12;

    registerNow = 2; // 美联好房有效注册(个) registerNow/registerAims +registerScore
    registerAims = 10;
    registerScore = 10;

    duJiaWeiTuoNow = 3; // 独家委托(套) duJiaWeiTuoNow/duJiaWeiTuoAims +duJiaWeiTuoScore
    duJiaWeiTuoAims = 10;
    duJiaWeiTuoScore = 10;

    rentIndependent = 1; // 租单(独立单) 
    rentIndependentAims = 1;
    rentIndependentScore = 1;

    maiMaiIndependent = 1; // 买卖(独立单) 
    maiMaiIndependentAims = 1;
    maiMaiIndependentScore = 1;

    hangNeiRentNow = 1; // 租单(行内合作)单 hangNeiRentNow/hangNeiRentAims +hangNeiRentScore
    hangNeiRentAims = 10;
    hangNeiRentScore = 10;

    kuaHangRentNow = 1; // 租单(跨行合作)单 kuaHangRentNow/kuaHangRentAims +kuaHangRentScore
    kuaHangRentAims = 10;
    kuaHangRentScore = 10;

    hangNeiMaiMaiNow = 1; // 买卖(行内)单 hangNeiMaiMaiNow/hangNeiMaiMaiAims +hangNeiMaiMaiScore
    hangNeiMaiMaiAims = 10;
    hangNeiMaiMaiScore = 10;

    kuaHangMaiMaiNow = 1; // 买卖(跨行)单 kuaHangMaiMaiNow/kuaHangMaiMaiAims +kuaHangMaiMaiScore
    kuaHangMaiMaiAims = 10;
    kuaHangMaiMaiScore = 10;

    writeFollowNow = 3; // 打跟进 writeFollowNow/writeFollowAims +writeFollowScore
    writeFollowAims = 10;
    writeFollowScore = 10;

    yeWuYuanNow = 3; // 业务员(个) yeWuYuanNow/yeWuYuanAims +yeWuYuanScore
    yeWuYuanAims = 10;
    yeWuYuanScore = 10;

    guanLiGangNow = 3; // 管理岗(个) guanLiGangNow/guanLiGangAims +guanLiGangScore
    guanLiGangAims = 10;
    guanLiGangScore = 10;

    xingZhengNum = 14; // 行政&资质

    getDefault() {
            return '0';
        }
        // 判断目标类型：1.足月考核，2.减半目标
    getTargetType(arg) {
            if (arg === 1) {
                return '足月目标'
            } else {
                return '减半目标'
            }
        }
        // 判断薪资加减分
    getQualificationScore(arg) {
        if (arg < 0) {
            return '-' + arg;
        } else {
            return '+' + arg;
        }
    }
}
export class GetBrokerCountList {
    request;

    constructor(request = new GetBrokerCountListRequest()) {
        this.request = request;
    }

    send() {
        return new GetBrokerCountListApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                let response = new GetBrokerCountListResponse();
                let newList = [];

                for (let info of(res.data || [])) {
                    let item = new GetBrokerCountListItem();
                    item.id = info.userId || item.getDefault();

                    item.personNum = info.userNo || '--';

                    item.name = info.userName || '--';
                    item.deptName = info.organizationName || '--';
                    item.jobName = info.userPositionName || '--';
                    item.checkAim = item.getTargetType(info.kpiTargetType) || '--';
                    item.allNum = info.totalScore || item.getDefault();
                    item.addHouseNow = info.houseAdd || item.getDefault();
                    item.addHouseAims = info.targetHouseAdd || item.getDefault();
                    item.addHouseScore = info.houseAddScore || item.getDefault();
                    item.addCustomNow = info.custAdd || item.getDefault();
                    item.addCustomAims = info.targetCustAdd || item.getDefault();
                    item.addCustomScore = info.custAddScore || item.getDefault();
                    item.houseBeiAnNow = info.houseRegistration || item.getDefault();
                    item.houseBeiAnAims = info.targetHouseRegistration || item.getDefault();
                    item.houseBeiAnScore = info.houseRegistrationScore || item.getDefault();
                    item.addKeyNow = info.submitKey || item.getDefault();
                    item.addKeyAims = info.targetSubmitKey || item.getDefault();
                    item.addKeyScore = info.submitKeyScore || item.getDefault();
                    item.uploadImgNow = info.uploadPhoto || item.getDefault();
                    item.uploadImgAims = info.targetUploadPhoto || item.getDefault();
                    item.uploadImgScore = info.uploadPhotoScore || item.getDefault();
                    item.phoneCallNow = info.hiddenNumberDial || item.getDefault();
                    item.phoneCallAims = info.targetHiddenNumberDial || item.getDefault();
                    item.phoneCallScore = info.hiddenNumberDialScore || item.getDefault();

                    item.writeFollowNow = info.houseTrack || item.getDefault();
                    item.writeFollowAims = info.targetHouseTrack || item.getDefault();
                    item.writeFollowScore = info.houseTrackScore || item.getDefault();

                    item.reviewBuild = info.reviewBuild || item.getDefault();
                    item.targetReviewBuild = info.targetReviewBuild || item.getDefault();
                    item.reviewBuildScore = info.reviewBuildScore || item.getDefault();

                    item.fangKan = info.fangKan || item.getDefault();
                    item.targetFangKan = info.targetFangKan || item.getDefault();
                    item.fangKanScore = info.fangKanScore || item.getDefault();

                    item.yiShouDaiKanNow = info.takeLookBuild || item.getDefault();
                    item.yiShouDaiKanAims = info.targetTakeLookBuild || item.getDefault();
                    item.yiShouDaiKanScore = info.takeLookBuildScore || item.getDefault();
                    item.ershouDaiKanNow = info.takeLookHouse || item.getDefault();
                    item.ershouDaiKanAims = info.targetTakeLookHouse || item.getDefault();
                    item.ershouDaiKanScore = info.takeLookHouseScore || item.getDefault();
                    item.registerNow = info.mlAppRegistration || item.getDefault();
                    item.registerAims = info.targetMlAppRegistration || item.getDefault();
                    item.registerScore = info.mlAppRegistrationScore || item.getDefault();
                    item.duJiaWeiTuoNow = info.exclusiveCommission || item.getDefault();
                    item.duJiaWeiTuoAims = info.targetExclusiveCommission || item.getDefault();
                    item.duJiaWeiTuoScore = info.exclusiveCommissionScore || item.getDefault();

                    item.maiMaiIndependent = info.saleBillIndependent || item.getDefault();
                    item.maiMaiIndependentAims = info.targetSaleBillIndependent || item.getDefault();
                    item.maiMaiIndependentScore = info.saleBillIndependentScore || item.getDefault();

                    item.hangNeiMaiMaiNow = info.saleBillInnerCooperation || item.getDefault();
                    item.hangNeiMaiMaiAims = info.targetSaleBillInnerCooperation || item.getDefault();
                    item.hangNeiMaiMaiScore = info.saleBillInnerCooperationScore || item.getDefault();
                    item.kuaHangMaiMaiNow = info.saleBillOuterCooperation || item.getDefault();
                    item.kuaHangMaiMaiAims = info.targetRentBillOuterCooperation || item.getDefault();
                    item.kuaHangMaiMaiScore = info.saleBillOuterCooperationScore || item.getDefault();

                    item.rentIndependent = info.rentBillIndependent || item.getDefault();
                    item.rentIndependentAims = info.targetRentBillIndependent || item.getDefault();
                    item.rentIndependentScore = info.rentBillIndependentScore || item.getDefault();

                    item.hangNeiRentNow = info.rentBillInnerCooperation || item.getDefault();
                    item.hangNeiRentAims = info.targetRentBillInnerCooperation || item.getDefault();
                    item.hangNeiRentScore = info.rentBillInnerCooperationScore || item.getDefault();
                    item.kuaHangRentNow = info.rentBillOuterCooperation || item.getDefault();
                    item.kuaHangRentAims = info.targetRentBillOuterCooperation || item.getDefault();
                    item.kuaHangRentScore = info.rentBillOuterCooperationScore || item.getDefault();

                    item.yeWuYuanNow = info.recommendBusinessPosition || item.getDefault();
                    item.yeWuYuanAims = info.targetRecommendBusinessPosition || item.getDefault();
                    item.yeWuYuanScore = info.recommendBusinessPositionScore || item.getDefault();
                    item.guanLiGangNow = info.recommendManagePosition || item.getDefault();
                    item.guanLiGangAims = info.targetRecommendManagePosition || item.getDefault();
                    item.guanLiGangScore = info.recommendManagePositionScore || item.getDefault();
                    item.xingZhengNum = item.getQualificationScore(info.brokerQualificationScore) || item.getDefault();

                    newList.push(item);
                }
                response.list = newList;
                response.pageNum = res.pageNum;
                response.pageSize = res.pageSize;
                response.total = res.total;
                response.totalPage = res.totalPage;
                return response;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

// KPI配置 - 经纪人统计详情
export class GetBrokerCountDetailRequest extends APIRequest {
    month = '2020-4';
    userId = 1;
    constructor(obj = {}) {
        super();
        this.month = obj.month || '';
        this.userId = obj.userId || '';
    }
}
class GetBrokerCountDetailApi extends PostRequest {
    constructor(request = new GetBrokerCountDetailRequest()) {
        super(request);
    }

    getUrl() {
        return "/kpiWeb/broker/statistic/getBrokerQualification";
    }

    getNeedToken() {
        return true;
    }
}
export class GetBrokerCountDetailResponse extends APIResponse {
    detail = new GetBrokerCountDetailItem();

    constructor() {
        super();
    }
}
export class GetBrokerCountDetailItem {
    id = 1;
    name = "";
    job = "";
    groupName = "";
    brokerStarLicense = ""; // 是否拥有经纪人上岗证
    brokerStarLicenseNum = 10; // 经纪人星级牌照分数
    jingJiRenZheng = ""; // 是否拥有经纪人证证书
    jingJiRenZhengNum = 10; // 全国经纪人证分数
    jiXuJiaoYu = ""; // 是否拥有教育相关证书
    jiXuJiaoYuNum = 10; // 继续教育分数
    nianZhi = ""; // 年资
    nianZhiNum = 10; // 年资分
    xueLi = ""; // 学历
    xueLiNum = 10; // 学历分数
    xingXiang = ""; // 形象
    xingXiangNum = 10; // 形象分数
    kaoQing = ""; // 考勤
    kaoQingNum = 10; // 考勤分数
    zaoTui = ""; // 缺席、迟到10分钟以上、早退
    zaoTuiNum = -120; // 缺席、迟到10分钟以上、早退分数
    kaoShi = ""; // 未完成基础训练营/专项考试且未通过
    kaoShiNum = 10; // 未完成基础训练营/专项考试且未通过分数
    zhiDu = ""; // 红黄蓝制度
    zhiDuFlag = false; // 红黄蓝制度判断包含清零则字体颜色变红
    zhiDuNum = 10; // 红黄蓝制度分数f
    // paiMing = ""; // 全公司排名
    // paiMingNum = ""; // 全公司排名加多少分
    allNum = 2400; // 总分

    getDefault() {
        return '';
    }
}
export class GetBrokerCountDetail {
    request;

    constructor(request = new GetBrokerCountDetailRequest()) {
        this.request = request;
    }

    send() {
        return new GetBrokerCountDetailApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                let item = new GetBrokerCountDetailItem();
                let data = res.data;
                item.id = data.userId || item.getDefault();
                item.name = data.userName || item.getDefault();
                item.job = data.userPositionName || item.getDefault();
                item.groupName = data.organizationName || item.getDefault();
                item.brokerStarLicense = data.starAgentDesc || item.getDefault();
                item.brokerStarLicenseNum = data.starAgentScore || item.getDefault();
                item.jingJiRenZheng = data.brokerCertificateDesc || item.getDefault();
                item.jingJiRenZhengNum = data.brokerCertificateScore || item.getDefault();
                item.jiXuJiaoYu = data.educationUpDesc || item.getDefault();
                item.jiXuJiaoYuNum = data.educationUpScore || item.getDefault();
                item.nianZhi = data.workingYearsDesc || item.getDefault();
                item.nianZhiNum = data.workingYearsScore || item.getDefault();
                item.xueLi = data.educationDesc || item.getDefault();
                item.xueLiNum = data.educationScore || item.getDefault();
                item.xingXiang = data.imageUpStdDesc || item.getDefault();
                item.xingXiangNum = data.imageUpStdScore || item.getDefault();
                item.kaoQing = data.attendanceUpStdDesc || item.getDefault();
                item.kaoQingNum = data.attendanceUpStdScore || item.getDefault();
                item.zaoTui = data.trainingAttendanceDesc || item.getDefault();
                item.zaoTuiNum = data.trainingAttendanceScore || item.getDefault();
                item.kaoShi = data.trainingFailedDesc || item.getDefault();
                item.kaoShiNum = data.trainingFailedScore || item.getDefault();
                item.zhiDu = data.violateForbiddenLineDesc || item.getDefault();
                item.zhiDuFlag = item.zhiDu.indexOf('清零') > -1 ? true : false;
                item.zhiDuNum = data.violateForbiddenLineScore || item.getDefault();
                item.allNum = data.totalScore || item.getDefault();

                let response = new GetBrokerCountDetailResponse();
                response.detail = item;
                return response;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

// KPI配置 - 获取分行经理统计列表 区经统计列表 字段一致 就继承默认字段
export class GetBranchManagerListRequest extends APIRequest {
    pageOffset = 1;
    pageSize = 20;

    constructor(obj = {}) {
        super();
        this.pageOffset = obj.pageOffset || '';
        this.pageSize = obj.pageSize || '';
    }
}
class GetBranchManagerListApi extends PostRequest {
    constructor(request = new GetBranchManagerListRequest()) {
        super(request);
    }

    getUrl() {
        return "/kpiWeb/broker/statistic/getBrokerStatisticListData";
    }

    getNeedToken() {
        return true;
    }
}
export class GetBranchManagerListResponse extends APIResponse {
    list = []; // 主行列表
    total = 0;

    constructor() {
        super();
    }
}
export class GetBranchManagerListItem extends DefaultManagerListItem {
    groupId = 'sz403'; //组别编号
    group = '罗湖-骏庭名园' //组别
    peopleNum = 10; //人数

}
export class GetBranchManagerList {
    request;

    constructor(request = new GetBranchManagerListRequest()) {
        this.request = request;
    }

    send() {
        return new GetBranchManagerListApi(this.request).send()
            .then(res => {
                // if (res.errCode !== Const.successCode) return Promise.reject(res);
                let response = new GetBranchManagerListResponse();
                let newList = [];
                let i = 1;

                for (i; i <= 6; i++) {
                    let item = new GetBranchManagerListItem();
                    item.orderNum = item.orderNum + i;
                    item.dateTime = item.dateTime + i;
                    item.name = item.name + i;
                    item.id = item.id + i;
                    item.jobLevel = item.jobLevel + i;
                    item.jobName = item.jobName + i;
                    item.groupId = item.groupId + i;
                    item.group = item.group + i;
                    item.checkAim = item.checkAim + i;
                    item.peopleNum = item.peopleNum + i;
                    item.kpiTotalScore = item.kpiTotalScore + i;
                    item.perAchieveMoney = item.perAchieveMoney + i;

                    item.renJunYeJiNow = item.renJunYeJiNow + i;
                    item.renJunYeJiAims = item.renJunYeJiAims + i;
                    item.renJunYeJiScore = item.renJunYeJiScore + i;

                    item.activeListingsScore = item.activeListingsScore + i;

                    item.keHuSourceNow = item.keHuSourceNow + i;
                    item.keHuSourceAims = item.keHuSourceAims + i;
                    item.keHuSourceScore = item.keHuSourceScore + i;

                    item.zhuanJieScore = item.zhuanJieScore + i;

                    item.fuWuHaoPingScore = item.fuWuHaoPingScore + i;

                    item.useAppletScore = item.useAppletScore + i;

                    item.workingRulesScore = item.workingRulesScore + i;

                    item.articleScore = item.articleScore + i;

                    item.suggestScore = item.suggestScore + i;

                    item.billingRatioNow = item.billingRatioNow + i;
                    item.billingRatioScore = item.billingRatioScore + i;

                    item.stabilityNow = item.stabilityNow + i;
                    item.stabilityScore = item.stabilityScore + i;

                    newList.push(item);
                }
                /*for (let info of (res.data || [])) {
                  let item = new GetBrokerCountListItem();
                  item.id = info.id || item.getDefault();
                  item.zhuBieName = '经纪人考核' + i;
                  item.kaoHeRenYuan = '分行经理' + i;
                  item.type = i;
                  newList.push(item);
                  i++;
                }*/
                response.list = newList;
                return response;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

// KPI配置 - 获取区经统计列表
export class GetDistrictOwnerListRequest extends APIRequest {
    pageOffset = 1;
    pageSize = 20;

    constructor(obj = {}) {
        super();
        this.pageOffset = obj.pageOffset || '';
        this.pageSize = obj.pageSize || '';
    }
}
class GetDistrictOwnerListApi extends PostRequest {
    constructor(request = new GetDistrictOwnerListRequest()) {
        super(request);
    }

    getUrl() {
        return "/kpiWeb/broker/statistic/getBrokerStatisticListData";
    }

    getNeedToken() {
        return true;
    }
}
export class GetDistrictOwnerListResponse extends APIResponse {
    list = []; // 主行列表
    total = 0;

    constructor() {
        super();
    }
}
export class GetDistrictOwnerListItem extends DefaultManagerListItem {
    jurisdictionName = "罗湖及盐莲区-莲盐A区"; // 管辖片区名称
    jurisdictionGroup = 5; // 辖组别数
    perGroupNum = 7.5 //平均组别人数

}
export class GetDistrictOwnerList {
    request;

    constructor(request = new GetDistrictOwnerListRequest()) {
        this.request = request;
    }

    send() {
        return new GetDistrictOwnerListApi(this.request).send()
            .then(res => {
                //  if (res.errCode !== Const.successCode) return Promise.reject(res);

                let response = new GetDistrictOwnerListResponse();
                let newList = [];
                let i = 1;

                for (i; i <= 8; i++) {
                    let item = new GetDistrictOwnerListItem();
                    item.orderNum = item.orderNum + i;
                    item.dateTime = item.dateTime + i;
                    item.name = item.name + i;
                    item.id = item.id + i;
                    item.jobLevel = item.jobLevel + i;
                    item.jobName = item.jobName + i;
                    item.jurisdictionName = item.jurisdictionName + i;
                    item.checkAim = item.checkAim + i;
                    item.jurisdictionGroup = item.jurisdictionGroup + i;
                    item.perGroupNum = item.perGroupNum + i;
                    item.kpiTotalScore = item.kpiTotalScore + i;
                    item.perAchieveMoney = item.perAchieveMoney + i;

                    item.renJunYeJiNow = item.renJunYeJiNow + i;
                    item.renJunYeJiScore = item.renJunYeJiScore + i;

                    item.activeListingsNow = item.activeListingsNow + i;
                    item.activeListingsAims = item.activeListingsAims + i;
                    item.activeListingsScore = item.activeListingsScore + i;

                    item.keHuSourceNow = item.keHuSourceNow + i;
                    item.keHuSourceAims = item.keHuSourceAims + i;
                    item.keHuSourceScore = item.keHuSourceScore + i;

                    item.zhuanJieScore = item.zhuanJieScore + i;

                    item.fuWuHaoPingScore = item.fuWuHaoPingScore + i;

                    item.useAppletScore = item.useAppletScore + i;

                    item.workingRulesScore = item.workingRulesScore + i;

                    item.articleScore = item.articleScore + i;

                    item.suggestScore = item.suggestScore + i;

                    item.billingRatioNow = item.billingRatioNow + i;
                    item.billingRatioScore = item.billingRatioScore + i;

                    item.stabilityNow = item.stabilityNow + i;
                    item.stabilityScore = item.stabilityScore + i;

                    newList.push(item);
                }
                /*for (let info of (res.data || [])) {
                  let item = new GetBrokerCountListItem();
                  item.id = info.id || item.getDefault();
                  item.zhuBieName = '经纪人考核' + i;
                  item.kaoHeRenYuan = '分行经理' + i;
                  item.type = i;
                  newList.push(item);
                  i++;
                }*/
                response.list = newList;
                return response;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

// KPI配置 - 区经详情
export class GetDistrictOwnerDetailRequest extends APIRequest {
    id = 1;

    constructor(obj = {}) {
        super();
        this.id = obj.id || '';
    }
}
class GetDistrictOwnerDetailApi extends PostRequest {
    constructor(request = new GetDistrictOwnerDetailRequest()) {
        super(request);
    }

    getUrl() {
        return "/kpiWeb/broker/statistic/getBrokerStatisticListData";
    }

    getNeedToken() {
        return true;
    }
}
export class GetDistrictOwnerDetailResponse extends APIResponse {
    list = [];

    constructor() {
        super();
    }
}
export class GetDistrictOwnerDetailItem extends DefaultManagerListItem {}
export class GetDistrictOwnerDetail {
    request;

    constructor(request = new GetDistrictOwnerDetailRequest()) {
        this.request = request;
    }

    send() {
        return new GetDistrictOwnerDetailApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                let response = new GetDistrictOwnerDetailResponse();
                let newList = [];
                let i = 1;

                for (i = 1; i <= 10; i++) {
                    let item = new GetDistrictOwnerDetailItem();
                    item.id = item.id + i;
                    item.name = item.name + i;
                    item.deptName = item.deptName + i;
                    item.jobName = item.jobName + i;
                    item.allNum = item.allNum + i;

                    item.renJunYeJiNow = item.renJunYeJiNow + i;
                    item.renJunYeJiAims = item.renJunYeJiAims + i;
                    item.renJunYeJiScore = item.renJunYeJiScore + i;

                    item.activeListingsNow = item.activeListingsNow + i;
                    item.activeListingsAims = item.activeListingsAims + i;
                    item.activeListingsScore = item.activeListingsScore + i;

                    item.panYuanNow = item.panYuanNow + i;
                    item.panYuanAims = item.panYuanAims + i;
                    item.panYuanScore = item.panYuanScore + i;

                    item.keHuSourceNow = item.keHuSourceNow + i;
                    item.keHuSourceAims = item.keHuSourceAims + i;
                    item.keHuSourceScore = item.keHuSourceScore + i;

                    item.zhuanJieNow = item.zhuanJieNow + i;
                    item.zhuanJieAims = item.zhuanJieAims + i;
                    item.zhuanJieScore = item.zhuanJieScore + i;

                    item.zhuanJieAndChengJiaoNow = item.zhuanJieAndChengJiaoNow + i;
                    item.zhuanJieAndChengJiaoAims = item.zhuanJieAndChengJiaoAims + i;
                    item.zhuanJieAndChengJiaoScore = item.zhuanJieAndChengJiaoScore + i;

                    item.fuWuHaoPingNow = item.fuWuHaoPingNow + i;
                    item.fuWuHaoPingAims = item.fuWuHaoPingAims + i;
                    item.fuWuHaoPingScore = item.fuWuHaoPingScore + i;

                    item.useAppletNow = item.useAppletNow + i;
                    item.useAppletAims = item.useAppletAims + i;
                    item.useAppletScore = item.useAppletScore + i;

                    item.workingRulesNow = item.workingRulesNow + i;
                    item.workingRulesAims = item.workingRulesAims + i;
                    item.workingRulesScore = item.workingRulesScore + i;

                    item.articleNow = item.articleNow + i;
                    item.articleAims = item.articleAims + i;
                    item.articleScore = item.articleScore + i;

                    item.suggestNow = item.suggestNow + i;
                    item.suggestAims = item.suggestAims + i;
                    item.suggestScore = item.suggestScore + i;

                    item.billingRatioNow = item.billingRatioNow + i;
                    item.billingRatioAims = item.billingRatioAims + i;
                    item.billingRatioScore = item.billingRatioScore + i;

                    item.stabilityNow = item.stabilityNow + i;
                    item.stabilityAims = item.stabilityAims + i;
                    item.stabilityScore = item.stabilityScore + i;

                    newList.push(item);
                }

                response.list = newList;
                return response;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

// KPI配置 - 获取区主配置统计列表
export class GetDistrictMasterListRequest extends APIRequest {
    pageOffset = 1;
    pageSize = 20;

    constructor(obj = {}) {
        super();
        this.pageOffset = obj.pageOffset || '';
        this.pageSize = obj.pageSize || '';
    }
}
class GetDistrictMasterListApi extends PostRequest {
    constructor(request = new GetDistrictMasterListRequest()) {
        super(request);
    }

    getUrl() {
        return "/kpiWeb/broker/statistic/getBrokerStatisticListData";
    }

    getNeedToken() {
        return true;
    }
}
export class GetDistrictMasterListResponse extends APIResponse {
    list = []; // 主行列表
    total = 0;

    constructor() {
        super();
    }
}
export class GetDistrictMasterListItem {
    orderNum = ""; //序号
    dateTime = "2020年4月"; //日期
    name = '江少杰'; // 姓名
    id = "P123465"; //员工编号
    jobLevel = 'S3'; // 职级
    jobName = '董事董经理'; //职位
    checkAim = '足月目标' //考核目标类型
    kpiTotalScore = 20; //KPI总分

    yeJiMubiaoNow = 4500; // 业绩目标
    yeJiMubiaoAims = 8800;
    yeJiMubiaoScore = 10;

    shiShouMuBiaoNow = 4500; // 实收目标
    shiShouMuBiaoAims = 8800;
    shiShouMuBiaoScore = 10;

    twoYearsRate = 10; // 前两年收佣率
    twoYearsRateAims = 8800;
    twoYearsRateScore = 10;

    oneYearsRate = 11; // 前一年收佣率
    oneYearsRateAims = 8800;
    oneYearsRateScore = 10;

    KPIAverageNow = 4500; // 分行KPI平均分
    KPIAverageAims = 8800;
    KPIAverageScore = 10;

    getDefault() {
        return '';
    }
}
export class GetDistrictMasterList {
    request;

    constructor(request = new GetDistrictMasterListRequest()) {
        this.request = request;
    }

    send() {
        return new GetDistrictMasterListApi(this.request).send()
            .then(res => {
                //  if (res.errCode !== Const.successCode) return Promise.reject(res);

                let response = new GetDistrictMasterListResponse();
                let newList = [];
                let i = 1;

                for (i = 1; i <= 30; i++) {
                    let item = new GetDistrictMasterListItem();
                    item.orderNum = item.orderNum + i;
                    item.dateTime = item.dateTime + i;
                    item.name = item.name + i;
                    item.id = item.id + i;
                    item.jobLevel = item.jobLevel + i;
                    item.checkAim = item.checkAim + i;
                    item.kpiTotalScore = item.kpiTotalScore + i;

                    item.yeJiMubiaoNow = item.yeJiMubiaoNow + i;
                    item.yeJiMubiaoAims = item.yeJiMubiaoAims + i;
                    item.yeJiMubiaoScore = item.yeJiMubiaoScore + i;

                    item.shiShouMuBiaoNow = item.shiShouMuBiaoNow + i;
                    item.shiShouMuBiaoAims = item.shiShouMuBiaoAims + i;
                    item.shiShouMuBiaoScore = item.shiShouMuBiaoScore + i;

                    item.twoYearsRate = item.twoYearsRate + i;
                    item.twoYearsRateAims = item.twoYearsRateAims + i;
                    item.twoYearsRateScore = item.twoYearsRateScore + i;

                    item.oneYearsRate = item.oneYearsRate + i;
                    item.oneYearsRateAims = item.oneYearsRateAims + i;
                    item.oneYearsRateScore = item.oneYearsRateScore + i;

                    item.KPIAverageNow = item.KPIAverageNow + i;
                    item.KPIAverageAims = item.KPIAverageAims + i;
                    item.KPIAverageScore = item.KPIAverageScore + i;

                    newList.push(item);
                }
                /*for (let info of (res.data || [])) {
                  let item = new GetBrokerCountListItem();
                  item.id = info.id || item.getDefault();
                  item.zhuBieName = '经纪人考核' + i;
                  item.kaoHeRenYuan = '分行经理' + i;
                  item.type = i;
                  newList.push(item);
                  i++;
                }*/
                response.list = newList;
                return response;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}