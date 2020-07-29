// 代理合同 编辑初始化
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";
import { ErpCommon } from "../../../utils/ErpCommon";


export class RequestParameter extends APIRequest {
    dealId = ''; //原合同编号
    constructor(dealId) {
        super();
        this.dealId = dealId || '';
    }
}

// 接口地址
class RequestApi extends PostRequest {
    constructor(request = new RequestParameter()) {
        super(request);
    }

    getUrl() {
        return "/newBuildWeb/broker/mlNewBuild/queryContrackDetails";
    }

    getNeedToken() {
        return true;
    }
}

// 定义分销合同接口返回值 字段
export class DetailsArray {
    addr = "" //(string)地址;
    agencyBusiness = ""; //(byte)代理业务 1新房代理 2租赁代理 3租售一体
    agencyScope = ""; //(byte)代理范围 1住宅 2工商铺
    agencyTermEndStr = ""; //(string)代理期限结束
    agencyTermStartStr = ""; //(string)代理期限开始,格式 yyyy-MM-dd HH:mm:ss
    agencyTermType = ""; //(byte)代理期限类型 1 固定期限 2暂定期限 3 无固定期限
    agentName = ""; //(string)代理商名称
    cashPrize = ""; //(string)现金奖描述
    commissionStandard = ""; //(byte)结佣标准 1新房代理 2租赁代理 3租售代理
    commissionStandardList = []; //结佣标准类型
    contractDetailsList = [{
        "fileName": "", //(string)文件名称
        "pages": "", //(int32)页数
        "servings": "" //(int32)份数
    }];
    corporateChapterRemarks = ""; //(string)法人章备注
    customerProtectionPeriod = ""; //(int32)客户保护期
    dataSheetList = [{
        "dataName": "", //(string)名称
        "dataStatus": "", //(byte)1 原件 2 复印件
        "dataType": "", //(byte)0 其他 1 营业执照 2 法人代表证明 3法人代表身份证 4授权委托书 5 客户确认单 6成交确认单 7认购书 8产权证明 9项目许可证 10有权转委托销售、租赁文件 11专用发票 12结佣明细表 13 开户许可证/开户信息
        "type": "" //(byte)1 我方必备资料 2结佣必备资料 3缺失资料 4补充附件资料
    }];
    dealEnclosureList = [{
        "enclosureName": "", //(string)附件名称
        "enclosurePath": "", //(string)地址
        "type": "" //(byte)类型 1缺失资料 2电子附件 3公司营业执照 4合作协议 5银行开户许可证
    }];
    dealId = ""; //(int32)合同id,只有编辑才有
    dealName = ""; //(string)合同名称
    dealNum = ""; //(int32)合同份数
    dealStatus = ""; //(byte)成交情况 0 否 1是
    dealType = ""; //(byte)合同类型 1 代理合同 2分销合同
    developerName = ""; //(string)开发商名称
    distributionRange = ""; //(byte)分销范围 1分销全部项目 2分销指定项目
    eCommerceAmount = ""; //(number)电商金额
    electronicAccessories = ""; //(byte)电子附件 0 否 1 是
    financialOfficer = ""; //(string)财务人员
    financialOfficerEmail = ""; //(string)财务人员邮箱或微信
    financialOfficerMobile = ""; //(string)财务人员电话
    instructionManual = ""; //(string)备注说明
    legalFollowers = ""; //(string)法务跟进人
    legalFollowersId = ""; //(int32)法务跟进人id
    legalFollowersMobile = ""; //(string)法务跟进人电话
    missingReason = ""; //(string)缺失原因
    otherConventions = ""; //(string)其他约定 1允许我司转委托 2禁止对外拆佣（多个用,隔开）
    ourContractedCompany = ""; //(string)我方签约公司
    partyADockingPerson = ""; //(string)对接人
    partyADockingPersonEmail = ""; //(string)对接人邮箱或微信
    partyADockingPersonMobile = ""; //(string)对接人电话
    personInChargeList = [{
        "orgId": "", //(int32)所属组织id
        "orgName": "", //(string)所属组织名称
        "principalId": "", //(int32)负责人id
        "principalMobile": "", //(string)负责人电话
        "principalName": "(string)负责人名称"
    }];
    promotionScopeList = [{
        "agentId": "", //(int32)代理商id
        "agentName": "", //(string)代理商名称
        "buildAddr": "", //(string)项目地址
        "buildId": "", //(int32)楼盘id
        "buildName": "", //(string)推广名
        "cityId": "", //(int32)城市id
        "cityName": "", //(string)城市名称
        "mlLoginName": "" //(string)注册名
    }];
    settlementMethod = ""; //(string)佣金结算方式
    stampType = ""; //(string)盖章类型 1 合同章 2 公章 3法人章 4业务专用章 5财务专用章 （多个用,隔开）
    tart = ""; //(string)挞定分成
    whetherStamped = "" //(byte)是否盖章 0 否 1 是

    basicMessageData = {}; //初始化BasicMessage数据
    contractSigningBData = {}; //初始化contractSigningBData数据
    developerInformationData = {}; //初始化developerInformationData数据
    electronicFileData = {}; //初始化electronicFileData数据

    getDefault() {
        return '';
    }

    getStatu(val) {
        if (val != undefined) {
            return val
        } else {
            return '';
        }
    }

    getStatuText(num) {
            let count = Number(num)
            let map = new Map()
                .set(1, "审核中")
                .set(2, "已审核")
                .set(3, "已驳回")
                .set(4, "已同意");
            if (!map.has(count)) return "--";
            return map.get(count);
        }
        //判断盖章类型
    getSealType(num) {
            let map = new Map()
                .set(1, "合同章")
                .set(2, "公章")
                .set(3, "法人章")
                .set(4, "业务专用章")
                .set(5, "财务专用章");
            if (!map.has(num)) return "--";
            return map.get(num);
        }
        //获取盖章类型text
    getSealTypeArr(val) {
            let text = [];
            if (val.indexOf(',') != -1) {
                let arr = val.split(',');
                for (let item of arr) {
                    text.push(this.getSealType(Number(item)));
                }
                return text;
            } else if (val != "") {
                return text.push(this.getSealType(Number(val)));
            }
            return text;
        }
        //获取资料类型
    getMaterialArr(val) {
        let arr = [];
        if (val.length <= 0) return val;
        for (let item of val) {
            //若是其他类型则单独处理
            if (item.dataType == 0) {
                this.otherDesc = item.dataName;
                // continue;
            }
            arr.push(item.dataName);
        }
        return arr;
    }
}

// 发起请求
export class GetContractInfoDetailsList {
    request;
    constructor(request = new RequestParameter()) {
        this.request = request;
    }

    send() {

        return new RequestApi(this.request).send()
            .then((res) => {
                if (res.errCode !== Const.successCode) {
                    return Promise.reject(res);
                }
                let list = res.data || {};

                let item = new DetailsArray();
                item.addr = list.addr || item.getDefault();
                item.agencyBusiness = list.agencyBusiness || item.getDefault();
                item.agencyScope = item.getStatu(list.agencyScope);
                item.agencyTermEndStr = list.agencyTermEndStr || item.getDefault();
                item.agencyTermStartStr = list.agencyTermStartStr || item.getDefault();
                item.agencyTermType = list.agencyTermType || item.getDefault();
                item.agentName = list.agentName || item.getDefault();
                item.cashPrize = list.cashPrize || '';
                item.commissionStandard = list.commissionStandard || [];
                item.commissionStandardList = list.commissionStandardList || [];
                item.contractDetailsList = list.contractDetailsList || item.getDefault();
                item.corporateChapterRemarks = list.corporateChapterRemarks || item.getDefault();
                item.customerProtectionPeriod = list.customerProtectionPeriod || item.getDefault();
                item.dataSheetList = list.dataSheetList || [];

                item.dealEnclosureList = list.dealEnclosureList || [];
                item.dealId = list.dealId || item.getDefault();
                item.dealName = list.dealName || item.getDefault();
                item.dealNum = list.dealNum || item.getDefault();
                item.dealStatus = list.dealStatus || 0;
                item.dealType = list.dealType || item.getDefault();
                item.developerName = list.developerName || item.getDefault();
                item.distributionRange = list.distributionRange || item.getDefault();
                item.eCommerceAmount = list.eCommerceAmount || item.getDefault();
                item.electronicAccessories = item.getStatu(list.electronicAccessories);
                item.financialOfficer = list.financialOfficer || item.getDefault();
                item.financialOfficerEmail = list.financialOfficerEmail || item.getDefault();
                item.financialOfficerMobile = list.financialOfficerMobile || item.getDefault();
                item.instructionManual = list.instructionManual || item.getDefault();
                item.legalFollowers = list.legalFollowers || item.getDefault();
                item.legalFollowersId = list.legalFollowersId || item.getDefault();
                item.legalFollowersMobile = list.legalFollowersMobile || item.getDefault();
                item.missingReason = list.missingReason || item.getDefault();
                item.orgName = list.orgName || item.getDefault();
                item.otherConventions = list.otherConventions || item.getDefault();
                item.ourContractedCompany = list.ourContractedCompany || item.getDefault();
                item.partyADockingPerson = list.partyADockingPerson || item.getDefault();
                item.partyADockingPersonEmail = list.partyADockingPersonEmail || item.getDefault();
                item.partyADockingPersonMobile = list.partyADockingPersonMobile || item.getDefault();
                item.personInChargeList = list.personInChargeList || [];
                item.promotionScopeList = list.promotionScopeList || item.getDefault();
                item.settlementMethod = list.settlementMethod || item.getDefault();
                item.stampType = list.stampType || item.getDefault();
                item.tart = list.tart || item.getDefault();
                item.whetherStamped = item.getStatu(list.whetherStamped);


                return item;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}