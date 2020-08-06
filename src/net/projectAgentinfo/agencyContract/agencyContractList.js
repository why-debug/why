// 预约订单
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { ErpCommon } from "../../../utils/ErpCommon";

//定义参数 (页面)
export class agentListRequest extends APIRequest {
    approvalStatus = ""; //(byte)审批状态 -2 已作废 -1 已驳回 0未审批 1审批中 2已审批
    approvalStatusIsMe = ""; //待我审批 1:我已审批  -1:我已驳回 0:待我审批(默认), '':全部 
    contractStatus = ""; //(byte)合同状态 -2 已作废 1外借中 2已外借 3归档中 4已归档 
    dealName = ""; //(string)合同名称 
    export = ""; //(int32)export:1 为导出筛选条件所有数据 默认export为0 
    keyWords = ""; //(string)模糊搜索 
    orgId = "";
    pageOffset = "";
    pageRows = "";
    timeEndStr = ""; //(string)结束时间
    timeStartStr = ""; //(string)开始时间
    timeType = ""; //(int32)时间类型 1录入时间 2代理期限
    isArchive = ""; //(byte)是否归档 0否  1是 
    isCancle = ""; //(byte)是否作废 0否  1是  
    isData = ""; //(byte)资料是否缺失 0否  1是  
    isRisk = ""; //(byte)是否有风险 0无风险  1一般风险 2重大风险
    whetherStamped = ""; //(byte)是否盖章

    constructor(obj = {}) {
        super();
        this.approvalStatus = this.getStaus(obj.approvalStatus);
        this.approvalStatusIsMe = this.getStaus(obj.approvalStatusIsMe);
        this.contractStatus = this.getStaus(obj.contractStatus);
        this.dealName = this.getStaus(obj.dealName);
        this.export = obj.export || 0;
        this.keyWords = this.getStaus(obj.keyWords);
        this.orgId = this.getStaus(obj.orgId);
        this.pageOffset = obj.pageOffset || 1;
        this.pageRows = obj.pageRows || 30;
        this.timeEndStr = this.getStaus(obj.timeEndStr);
        this.timeStartStr = this.getStaus(obj.timeStartStr);
        this.timeType = this.getStaus(obj.timeType);
        this.isArchive = this.getStaus(obj.isArchive);
        this.isCancle = this.getStaus(obj.isCancle);
        this.isData = this.getStaus(obj.isData);
        this.isRisk = this.getStaus(obj.isRisk);
        this.whetherStamped = this.getStaus(obj.whetherStamped);
    }

    getStaus(val) {
        if (val != undefined) {
            return val
        } else {
            return ''
        }
    }
}

// 接口地址
class agentListApi extends PostRequest {
    constructor(request = new agentListRequest()) {
        super(request);
    }
    getUrl() {
        return "/newBuildWeb/broker/mlNewBuild/queryContrackList";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }
    getNeedToken() {
        return true;
    }
}

// 定义接口返回值 字段
export class agencyContractListArray {
    dealId = ''; //合同id
    check = ''; //状态
    approvalTime = ""; //审批时间
    approvalPerson = ""; //当前审批人
    approvalStatus = ''; //审批状态
    contractStatus = ''; //合同状态
    applicant = ""; //申请人
    applicationOrganization = ""; //申请组织
    applicationNumber = ""; //申请编号
    archiveNumber = " "; //归档编号
    contractName = ""; //合同名称
    Agent = ""; //代理商 
    projectName = ""; //项目名称
    agencyTermStart = ''; //代理期限开始
    agencyTermEnd = ''; //代理期限结束
    customerProtectionPeriod = ""; //客户保护期
    commission = ""; //佣金结算方式
    legalAffairs = ""; //法务跟进人
    risk = ''; //是否有风险
    stamp = ''; //是否盖章
    void = ''; //是否作废
    archive = ''; //是否归档
    material = ''; //资料是否缺失
    entryDate = ""; //录入日期

    getDefault() {
        return '';
    }

    //判断审批状态
    getApprovaltVal = function(val) {
        if (val != undefined) {
            switch (val) {
                case -2:
                    return 4;
                case -1:
                    return 2;
                case 0:
                    return 0;
                case 1:
                    return 1;
                case 2:
                    return 3;
            }
        } else {
            return 0
        }
    };
    //判断合同状态是否存在
    getContractVal = function(val) {
        if (val != undefined && val !== 0 && val !== -2) {
            return val
        } else if (val == -2) {
            return 0
        } else {
            return 4
        }
    };
}

// 发起请求
export class getAgencyContractList {
    request;
    constructor(request = new agentListRequest()) {
        this.request = request;
    }
    send() {
        return new agentListApi(this.request).send()
            .then((res) => {
                if (res.errCode != 200) {
                    return Promise.reject(res);
                }

                if (!res || !res.data) return Promise.reject('暂时没有更多数据了');

                let list = res.data.dataList || [];
                console.log(list, '代理合同列表数据');

                // let list = [{
                //     dealId: 1, //序号
                //     check: false, //状态
                //     approvalTime: "2010", //审批时间
                //     approvalPerson: "雨果", //当前审批人
                //     approvalStatus: 2, //审批状态
                //     contractStatus: 1, //合同状态
                //     applicant: "雨果", //申请人
                //     applicationOrganization: "申请组织", //申请组织
                //     applicationNumber: "sdfsfsdfsdfsdbjh", //申请编号
                //     archiveNumber: "fdshljhgfd ", //归档编号
                //     contractName: "十大歌手发红包搜地开发和", //合同名称
                //     Agent: "", //代理商 
                //     projectName: "暗示法法师法规", //项目名称
                //     agencyTerm: "2019-15-15至2020-01-01", //代理期限
                //     customerProtectionPeriod: "2", //客户保护期
                //     commission: "打风格为啥", //佣金结算方式
                //     legalAffairs: "雨果果", //法务跟进人
                //     risk: 1, //是否有风险
                //     stamp: true, //是否盖章
                //     void: false, //是否作废
                //     archive: true, //是否归档
                //     material: true, //资料是否缺失
                //     entryDate: "2012-25-25" //录入日期
                // },
                // ];

                let response = {};
                let agentList = [];

                for (let info of list) {
                    let item = new agencyContractListArray();
                    item.check = info.check || item.getDefault();
                    item.check = 1 || item.getDefault();
                    item.approvalTime = info.auditTime || item.getDefault();
                    item.approvalPerson = info.userName || item.getDefault();
                    item.approvalStatus = item.getApprovaltVal(info.approvalStatus);
                    item.contractStatus = item.getContractVal(info.contractStatus);
                    item.applicant = info.applyUserName || item.getDefault();
                    item.applicationOrganization = info.orgName || item.getDefault();
                    item.applicationNumber = info.applicationNo || item.getDefault();
                    item.archiveNumber = info.archiveNumber || item.getDefault();
                    item.dealId = info.dealId || item.getDefault();
                    item.contractName = info.dealName || item.getDefault();
                    item.Agent = info.agentName || item.getDefault();
                    item.projectName = info.buildAddr || item.getDefault();

                    item.agencyTermStart = info.agencyTermStart || item.getDefault();
                    item.agencyTermEnd = info.agencyTermEnd || item.getDefault();

                    item.customerProtectionPeriod = info.customerProtectionPeriod || item.getDefault();
                    item.commission = info.settlementMethod || item.getDefault();
                    item.legalAffairs = info.legalFollowers || item.getDefault();
                    item.risk = info.isRisk || item.getDefault();
                    item.stamp = info.whetherStamped || item.getDefault();
                    item.void = info.isCancle || item.getDefault();
                    item.archive = info.isArchive || item.getDefault();
                    item.material = info.isData || item.getDefault();
                    item.entryDate = info.createTime || item.getDefault();


                    agentList.push(item);
                }

                response.list = agentList;
                response.total = res.total;
                return response;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}