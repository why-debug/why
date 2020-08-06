// 新房意向单详情
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";


export class RequestParameter extends APIRequest {
  projectId = ''; //项目id
  constructor(obj = {}) {
    super();
    this.projectId = obj.projectId
  }
}

// 接口地址
class RequestApi extends PostRequest {
  constructor(request = new RequestParameter()) {
    super(request);
  }

  getUrl() {
    return "/newBuildWeb/broker/org/getDistributionCompanyDetails";
  }

  getNeedToken() {
    return true;
  }
}

// 定义接口返回值 字段
export class IntentionDetailInfo {
  projectType = ''; //类型
  makeSheetPerson = ''; //制单人
  makeSheetDate = ' '; //制单日期
  projectClass = ''; //类别
  mainNo = ''; //主单号
  dealWay = ''; //合作方式
  projectNumber = ''; //编号
  cooperationOutsideId = ''; //外区分行id
  cooperationOutsideCityId = ''; //外区所在城市id
  projectName = ''; //项目名称
  projectPerson = ''; //项目负责人
  developerName = ''; //开发商
  agentName = ''; //代理商
  projectAddress = ''; //项目地址
  propertyInfo = ''; //物业信息
  projectArea = ''; //片区
  projectUseage = ''; //用途
  houseType = ''; //户型
  buildArea = ''; //建筑面积
  houseInnerArea = ''; //套内面积
  dealUserOrganizationId = '';// 成交部门id
  dealUserOrganizationName = ""; //成交部门名称
  dealUserId = '';// 成交人id
  dealUserName = "";//成交人名称
  distributionCompId = '';// 分销公司id
  distributionCompName = '';// 分销公司名称
  customerSource = '';// 客户来源
  custType = '';// 类型
  customerNme = '';// 客户姓名
  territory = '';// 地域
  custIccode = '';// 证件号
  custMobile = '';// 电话
  proportion = '';// 产品比例
  linkAddr = '';// 地址
  communityAreaFloor = '';//所属小区、楼栋、楼层
  remark = '';// 备注

  // 认购信息
  provisionalDate = ' '; //制单日期
  provisionalMoney = ' '; //临定金
  subscriptionPrice = ' '; //认购总价
  discountDescription = ' '; //折扣描述
  subscriptionRemark = ' '; //认购备注

  annexList = []; //附件信息
}

// 发起请求新房意向单详情(包括附件详情)
export class GetIntentionDetail {
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

        if (!res || !res.data) return [];

        let info = res.data || {};

        let item = new IntentionDetailInfo();
        item.projectType = info.projectType || '--';
        item.makeSheetPerson = info.makeSheetPerson || '--';
        item.makeSheetDate = info.makeSheetDate || '--';
        item.projectClass = info.projectClass || '--';
        item.dealWay = info.dealWay || '--';
        item.projectNumber = info.projectNumber || '--';
        item.projectName = info.projectName || '--';
        item.projectPerson = info.projectPerson || '--';
        item.developerName = info.developerName || '--';
        item.agentName = info.agentName || '--';
        item.projectAddress = info.projectAddress || '--';
        item.propertyInfo = info.propertyInfo || '--';
        item.projectArea = info.projectArea || '--';
        item.projectUseage = info.projectUseage || '--';
        item.houseType = info.houseType || '--';
        item.buildArea = info.buildArea || '--';
        item.houseInnerArea = info.houseInnerArea || '--';
        item.dealUserOrganizationId = info.dealUserOrganizationId || '--';
        item.dealUserOrganizationName = info.dealUserOrganizationName || '--';
        item.dealUserId = info.dealUserId || '--';
        item.dealUserName = info.dealUserName || '--';
        item.distributionCompId = info.distributionCompId || '--';
        item.distributionCompName = info.distributionCompName || '--';
        item.customerSource = info.customerSource || '--';
        item.custType = info.custType || '--';
        item.customerNme = info.customerNme || '--';
        item.territory = info.territory || '--';
        item.custIccode = info.custIccode || '--';
        item.custMobile = info.custMobile || '--';
        item.proportion = info.proportion || '--';
        item.linkAddr = info.linkAddr || '--';
        item.communityAreaFloor = info.communityAreaFloor || '--';
        item.remark = info.remark || '--';
        item.annexList = info.annexList || [];
        //认购信息
        item.provisionalDate = info.provisionalDate || '--';
        item.provisionalMoney = info.provisionalMoney || '--';
        item.subscriptionPrice = info.subscriptionPrice || '--';
        item.discountDescription = info.discountDescription || '--';
        item.subscriptionRemark = info.subscriptionRemark || '--';

        return item;
      })
  }
}


// 定义接口参数
export class GetIntentionChargeRecordsParameter extends APIRequest {
  projectId = ''; //项目id
  constructor(obj = {}) {
    super();
    this.projectId = obj.projectId
  }
}

// 接口地址
class IntentionChargeRecordsRequestApi extends PostRequest {
  constructor(request = new GetIntentionChargeRecordsParameter()) {
    super(request);
  }

  getUrl() {
    return "/newBuildWeb/broker/org/getDistributionCompanyBrokersList";
  }

  getNeedToken() {
    return true;
  }
}

// 定义接口返回值 字段 新房意向单收费记录信息
export class IntentionChargeRecordsInfo {
  entryTime = ''; //录入时间
  receiptPayment = ''; //收付
  receiptPaymentRules = ''; //收付规则
  receiptPaymentBranch = ''; //收付分行
  makeDealPerson = ''; //制单人
  fund = ''; //款项
  allMoney = ''; //总金额
  settleInfo = ''; //结算信息
  approvalStatus = ''; //审批状态
}

// 发起请求获取新房意向单收费记录列表
export class GetIntentionChargeRecordsList {
  request;
  constructor(request = new GetIntentionChargeRecordsParameter()) {
    this.request = request;
  }

  send() {

    return new IntentionChargeRecordsRequestApi(this.request).send()
      .then((res) => {
        if (res.errCode !== Const.successCode) {
          return Promise.reject(res);
        }

        let receiptPaymentList = res.data || [];
        
        let list = [];
        for (let info of receiptPaymentList) {
          let item = new IntentionChargeRecordsInfo();

          item.entryTime = info.entryTime || '--'; 
          item.receiptPayment = info.receiptPayment|| '--'; 
          item.receiptPaymentRules = info.receiptPaymentRules|| '--'; 
          item.receiptPaymentBranch = info.receiptPaymentBranch|| '--'; 
          item.makeDealPerson = info.makeDealPerson|| '--';
          item.fund = info.fund|| '--'; 
          item.allMoney = info.allMoney|| '--'; 
          item.settleInfo = info.settleInfo|| '--'; 
          item.approvalStatus = info.approvalStatus|| '--'; 
         
          list.push(item);
        }
        return list;
      })
  }
}
