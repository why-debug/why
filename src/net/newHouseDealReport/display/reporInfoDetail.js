import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";
import { ErpCommon } from "../../../utils/ErpCommon";
// 新房成交报告详情
export class ReportInfoDetailRequest extends APIRequest {
    reportId = ""; //成交报告ID

    constructor(obj = {}) {
        super();
        this.reportId = obj.reportId || '';
    }
}

// 定义返回参数
export class ReportInfoDetailItem {
    /* -----------------项目信息  20---------------------- */
    agentId = ''; //代理商ID
    //类型
    reportType = '';
    //类型文本 类型  1：直销  2：分销  3：租赁
    reportTypeText = '';
    //类别
    reportClass = '';
    //类别文本 类别  1：一般成交  2：事后加佣  3：口头代理费  4：外区分佣
    reportClassText = '';
    // 主单号
    reportNo = '';
    //收佣状态
    commissionStatus = '';
    //收佣状态文本 0：未收齐  1：已收齐
    commissionStatusText = '';
    //制单人
    createUserName = '';
    //制单时间
    createTime = "";
    // 合作方式  1：跨市合作  2：市内合作  3：区内合作
    cooperationType = '';
    cooperationTypeText = '';
    
    // 外区分行
    cooperationOutsideId = '';
    // 外区所在城市
    cooperationOutsideCityId = '';
    // 项目id
    buildId = '';
    buildName = ""; //项目名称
    chargeName = ''; //项目负责人
    agentName = ''; //代理商
    developerName = ''; //开发商
    settlementMethod = ''; //佣金结算方式
    dataSheets = ''; //结佣必备资料+-
    buildAddr = ''; //项目地址
    // 所属片区
    regId = '';
    // 物业地址
    wuyeAddr = '';
    // 用途
    // buildUseage = '';
    buildUseageName = '';
    // 建筑类型
    buildType = '';
    // 建筑级别
    buildLevelName = '';
    // 室
    buildRoom = ''; 
    // 卫
    buildWei = '';
    // 阳
    buildYang = '';
    // 厅
    buildHall = '';
    //户型文本
    buildTypeText = '';
    // 建筑面积
    buildArea = '';
    // 套内面积
    buildInnerarea = '';
    // 现金奖
    cashPrize = '';
    /* -----------------认购信息 11--------------------- */
    // 认购总价
    offerAmount = '';
    // 认购定金
    offerMoney = '';
    // 成交日期
    dealTime = '';
    // 认购编号
    offerNo = '';
    // 认购日期
    offerTime = '';
    // 付款方式
    payType = '';
    // 付款方式文本  1:一次性付款  2:按揭付款
    payTypeText = '';
    // 预收佣日期
    commissionPlanTime = '';
    // 预首付日期
    firstPaymentTime = '';
    // 折扣描述
    discountNote = '';
    // 备注
    note = '';
    /* -----------------客户信息 28--------------------- */
    // 成交组织id
    dealUserOrganizationId = '';
    //成交人组织名称
    dealUserOrganizationName = "";
    // 成交人
    dealUserId = '';
    //成交人名称
    dealUserName = "";
    // 分销公司
    distributionCompId = '';
    // 分销公司名称
    distributionCompName = '';

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
    agencyCommission = '';
    // 客户佣金
    custCommission = '';
    // 标准佣金
    standardCommission = '';
    // 分销佣金
    distributionCommission = '';
    // 折扣
    discountCommission = '';
    // 押金类型
    cashPledgeClass = '';
    // 是否有租约
    leaseFlag = '';
    // 租约到期日期
    leaseEndTime = '';
    // 上报业绩
    reportCash = '';
    // 项目分成
    projectDivided = '';
    // 分成方式
    dividedUnit = '';
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
        // 成交报告id 
        reportId: '',
        // 合作人id 
        userId: '',
    }]
    reportProfitVOs = [{
        // 业绩类型
        profitType: '',
        // 分配类型
        allotType: '',
        //分配类型名称
        allotTypeName: '',
        // 分配部门
        allotOrganizationId: '',
        //分配分组名称
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

    getDefault(val) {
        if (val != '' && val != undefined) {
            return val;
        } else {
            return '';
        }
    }
    //获取户型
    getBuildTypeText(buildRoom,buildHall,buildWei,buildYang){
        return buildRoom +'室' +buildHall +'厅' + buildWei + '卫' + buildYang + '阳台'
    }
    //获取对应类型文本
    judgeReportType(val,arrName){
        if(val == '') return val;
        let num = Number(val);
        //判断报告类型 类型  1：直销  2：分销  3：租赁
        let reportTypeArr = ['直销','分销','租赁'];
        //判断报告类别  1：一般成交  2：事后加佣  3：口头代理费  4：外区分佣
        let classArr = ['一般成交','事后加佣','口头代理费','外区分佣'];
        //判断付款方式  1:一次性付款  2:按揭付款
        let payTypeArr = ['一次性付款','按揭付款']; 
        //收佣状态 0：未收齐  1：已收齐
        let commissionStatusArr = ['未收佣','已收佣'];
         // 合作方式  1：跨市合作  2：市内合作  3：区内合作
        let cooperationTypeArr = ['跨市合作','市内合作','区内合作'];
        let obj = {
            reportTypeArr,
            classArr,
            payTypeArr,
            commissionStatusArr,
            cooperationTypeArr,
        }
        if(arrName == 'commissionStatusArr') return obj[arrName][num];
        return obj[arrName][num - 1];
    }
}

// 定义请求
export class ReportInfoDetailApi extends PostRequest {
    constructor(request = new ReportInfoDetailRequest()) {
        super(request)
    }

    getUrl() {
        return '/newBuildWeb/broker/commission/getReporInfo'
    }

    getNeedToken() {
        return true;
    }
}


export class ReportInfoDetail {
    request;

    constructor(request = new ReportInfoDetailRequest()) {
        this.request = request;
    }

    send() {
        return new ReportInfoDetailApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                let obj = res.data || {};

                let item = new ReportInfoDetailItem();
                item.agentId = obj.agentId || '--';
                item.reportType = obj.reportType || '--';
                item.reportTypeText =item.judgeReportType(obj.reportType,'reportTypeArr'); 
                item.reportClass = obj.reportClass || '';
                item.reportClassText =item.judgeReportType(obj.reportClass,'classArr');
                item.reportNo = obj.reportNo || '--';
                item.commissionStatus = item.getDefault(obj.commissionStatus);
                item.commissionStatusText =item.judgeReportType(obj.commissionStatus,'commissionStatusArr');
                item.createUserName = obj.createUserName || '--';
                item.createTime = obj.createTime || '--';
                item.cooperationType = obj.cooperationType || '';
                item.cooperationTypeText = item.judgeReportType( obj.cooperationType,'cooperationTypeArr');
                item.cooperationOutsideId = obj.cooperationOutsideId || '--';
                item.cooperationOutsideCityId = obj.cooperationOutsideCityId || '--';
                item.buildId = obj.buildId || '--';
                item.buildName = obj.buildName || '--';
                item.chargeName = obj.chargeName || '--';
                item.agentName = obj.agentName || '--';
                item.developerName = obj.developerName || '--';
                item.settlementMethod = obj.settlementMethod || '--';
                item.dataSheets = obj.dataSheets || '--';
                item.buildAddr = obj.buildAddr || '--';
                item.regId = obj.regId || '--';
                item.regId = obj.regId || '--';
                item.regId = obj.regId || '--';
                item.wuyeAddr = obj.wuyeAddr || '--';
                item.buildUseageName = obj.buildUseageName || '--';
                item.buildType = obj.buildType || '--';
                item.buildTypeText = item.getBuildTypeText(obj.buildRoom || '--',obj.buildHall || '--',obj.buildWei || '--',obj.buildYang || '--');
                item.buildLevelName = obj.buildLevelName || '--';
                item.buildRoom = obj.buildRoom || '--';
                item.buildWei = obj.buildWei || '--';
                item.buildYang = obj.buildYang || '--';
                item.buildHall = obj.buildHall || '--';
                item.buildArea = obj.buildArea || '--';
                item.buildInnerarea = obj.buildInnerarea || '--';
                item.cashPrize = obj.cashPrize || '--';
                item.offerAmount = obj.offerAmount || '--';
                item.offerMoney = obj.offerMoney || '--';
                item.offerNo = obj.offerNo || '--';
                item.dealTime = obj.dealTime || '--';
                item.offerTime = obj.offerTime || '--';
                item.payType = obj.payType || '';
                item.payTypeText = item.judgeReportType(obj.payType,'payTypeArr')  ;
                item.commissionPlanTime = obj.commissionPlanTime || '--';
                item.firstPaymentTime = obj.firstPaymentTime || '--';
                item.discountNote = obj.discountNote || '--';
                item.note = obj.note || '--';
                item.dealUserOrganizationId = item.getDefault(obj.dealUserOrganizationId);
                item.dealUserOrganizationName = obj.dealUserOrganizationName || '--';
                item.dealUserId = item.getDefault(obj.dealUserId);
                item.dealUserName = obj.dealUserName || '--';
                item.distributionCompId = item.getDefault(obj.distributionCompId);
                item.distributionCompName = obj.distributionCompName || '--';
                item.reporCustListVOs = obj.reporCustListVOs || [];
                item.agencyCommission = obj.agencyCommission || '--';
                item.custCommission = obj.custCommission || '--';
                item.standardCommission = obj.standardCommission || '--';
                item.distributionCommission = obj.distributionCommission || '--';
                item.discountCommission = obj.discountCommission || '--';
                item.cashPledgeClass = obj.cashPledgeClass || '--';
                item.leaseFlag = obj.leaseFlag || '--';
                item.leaseEndTime = obj.leaseEndTime || '--';
                item.reportCash = obj.reportCash || '--';
                item.projectDivided = obj.projectDivided || '--';
                item.outCooperations = obj.outCooperations || [];
                item.dividedUnit = obj.dividedUnit || [];
                item.reportProfitVOs = obj.reportProfitVOs || [];

                return item;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}