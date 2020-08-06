import { PostRequest } from "../../../../common/net/PostRequest";
import { APIRequest } from "../../../../common/net/API";
import { Const } from "../../../../common/utils/Const";
// 定义参数
export class AddReporInfoParams extends APIRequest {
    /* -----------------项目信息  20---------------------- */
    agentId; //代理商ID
    //类型
    reportType;
    //类别
    reportClass;
    // 主单号
    reportNo;
    // 合作方式（暂无字段）
    cooperationType;
    // 外区分行
    cooperationOutsideId;
    // 外区所在城市
    cooperationOutsideCityId;
    // 项目id
    buildId;;
    // 所属片区
    regId;
    // 物业地址
    wuyeAddr;
    // 用途
    buildUseage;
    // 建筑类型
    buildType;
    // 建筑级别
    buildLevel;
    // 室
    buildRoom;
    // 卫
    buildWei;
    // 阳
    buildYang;
    // 厅
    buildHall;
    // 建筑面积
    buildArea;
    // 套内面积
    buildInnerarea;
    // 现金奖
    cashPrize;
    /* -----------------认购信息 11--------------------- */
    // 认购总价
    offerAmount;
    // 认购定金
    offerMoney;
    // 认购编号
    offerNo;
    // 成交日期
    dealTime;
    // 认购编号
    offerNo;
    // 认购日期
    offerTime;
    // 付款方式
    payType;
    // 预收佣日期
    commissionPlanTime;
    // 预首付日期
    firstPaymentTime;
    // 折扣描述
    discountNote;
    // 备注
    note;
    /* -----------------客户信息 28--------------------- */
    // 成交组织id
    dealUserOrganizationId;
    // 成交人
    dealUserId;
    // 分销公司
    distributionCompId;

    // 客户列表
    reporCustListVOs = [{
        //客户类型
        custType: '',
        // 客户关系
        custClass: '',
        // 客户姓名/法人姓名
        custName: '',
        // 客户性别/法人性别
        custSex: '',
        // 地域 
        territory: '',
        // 企业名称
        custCompName: '',
        // 营业执照号码
        businessLicenseNo: '',
        // 证件类型
        iccodeType: '',
        // 证件号码
        custIccode: '',
        // 户籍是否为本市
        belonged: '',
        // 户籍省
        belongedProvince: '',
        // 电话号码
        reportCustMobiles: [{
            custMobile: '',
            id: '',
            mobileType: '',
        }],
        // 联系地址-国家 
        linkCountryId: '',
        // 联系地址-城市 
        linkProvinceId: '',
        // 联系地址-地址 
        linkAddr: '',
        // 产权比例
        proportion: '',
        // 客户来源
        custSource: '',
        // 备注
        custNote: '',
        // 关联客户id
        custId: '',
        // 客户主键
        id: '',
    }];
    /* -----------------业绩信息 35--------------------- */
    // 代理佣金
    agencyCommission;
    // 客户佣金
    custCommission;
    // 标准佣金
    standardCommission;
    // 分销佣金
    distributionCommission;
    // 折扣
    discountCommission;
    // 押金类型
    cashPledgeClass;
    // 是否有租约
    leaseFlag;
    // 租约到期日期
    leaseEndTime;
    // 上报业绩
    reportCash;
    // 项目分成
    projectDivided;
    // 分成方式
    dividedUnit;
    // 外部合作费
    outCooperations = [{
        //合作人
        userName: '',
        //身份证
        userIccode: '',
        //联系方式
        userMobile: '',
        //类型
        cooperationClass: '',
        //合作费
        cooperationCost: '',
        // 主键id
        id: '',
        // 成交报告id ???????
        reportId: '',
        // 合作人id ????????
        userId: '',
    }]
    reportProfitVOs = [{
        // 业绩类型
        profitType: '',
        // 分配类型
        allotType: '',
        allotTypeName: '',
        // 分配部门
        allotOrganizationId: '',
        allotOrganizationName: '',
        // 分配人
        allotUser: '',
        allotUserName: '',
        // 业绩月份
        allotMonth: '',
        // 分配比例
        allotRatio: '',
        //分配业绩
        allotMoney: '',
        // 单量
        signNum: '',
        // 公司费用
        compCostFlag: '',
        // 领导人分配业绩
        leaderUserName: '',
        leaderUserId: '',
        // 主键id
        id: '',
        // 成交报告id
        reportId: '',
    }]

    constructor(obj = {}) {
        super()
        this.agentId = obj.agentId || '';
        this.reportType = obj.reportType || '';
        this.reportClass = obj.reportClass || '';
        this.reportNo = obj.reportNo || '';
        this.cooperationType = obj.cooperationType || '';
        this.cooperationOutsideId = obj.cooperationOutsideId || '';
        this.cooperationOutsideCityId = obj.cooperationOutsideCityId || '';
        this.buildId = obj.buildId || '';
        this.regId = obj.regId || '';
        this.wuyeAddr = obj.wuyeAddr || '';
        this.buildUseage = obj.buildUseage || '';
        this.buildType = obj.buildType || '';
        this.buildLevel = obj.buildLevel || '';
        this.buildRoom = obj.buildRoom || '';
        this.buildWei = obj.buildWei || '';
        this.buildYang = obj.buildYang || '';
        this.buildHall = obj.buildHall || '';
        this.buildArea = obj.buildArea || '';
        this.buildInnerarea = obj.buildInnerarea || '';
        this.cashPrize = obj.cashPrize || '';
        this.offerAmount = obj.offerAmount || '';
        this.offerMoney = obj.offerMoney || '';
        this.offerNo = obj.offerNo || '';
        this.dealTime = obj.dealTime || '';
        this.offerNo = obj.offerNo || '';
        this.offerTime = obj.offerTime || '';
        this.payType = obj.payType || '';
        this.commissionPlanTime = obj.commissionPlanTime || '';
        this.firstPaymentTime = obj.firstPaymentTime || '';
        this.discountNote = obj.discountNote || '';
        this.note = obj.note || '';
        this.dealUserOrganizationId = obj.dealUserOrganizationId || '';
        this.dealUserId = obj.dealUserId || '';
        this.distributionCompId = obj.distributionCompId || '';
        this.reporCustListVOs = obj.reporCustListVOs || [];
        this.agencyCommission = obj.agencyCommission || '';
        this.custCommission = obj.custCommission || '';
        this.standardCommission = obj.standardCommission || '';
        this.distributionCommission = obj.distributionCommission || '';
        this.discountCommission = obj.discountCommission || '';
        this.cashPledgeClass = obj.cashPledgeClass || '';
        this.leaseFlag = obj.leaseFlag || '';
        this.leaseEndTime = obj.leaseEndTime || '';
        this.reportCash = obj.reportCash || '';
        this.projectDivided = obj.projectDivided || '';
        this.dividedUnit = obj.dividedUnit || [];
        this.reportProfitVOs = obj.reportProfitVOs || [];
    }
}

// 定义请求
export class AddReporInfoApi extends PostRequest {
    constructor(request = new AddReporInfoParams()) {
        super(request)
    }

    getUrl() {
        return '/newBuildWeb/broker/commission/addReporInfo'
    }

    getNeedToken() {
        return true;
    }
}


// 请求预处理
export class AddReporInfo {
    request;
    constructor(request = new AddReporInfoParams()) {
        this.request = request;
    }
    send() {
        return new AddReporInfoApi(this.request).send()
            .then(res => {
                if (res.errCode != Const.successCode) return Promise.reject(res.errMsg)
                return Promise.resolve(res.data)
            })
    }

}