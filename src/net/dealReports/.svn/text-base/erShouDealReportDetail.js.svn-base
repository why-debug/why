import {
  PostRequest
} from "@/common/net/PostRequest";
import {
  ErpCommon
} from "../../utils/ErpCommon";
import {
  APIRequest,
  APIResponse
} from "@/common/net/API";
import {
  Const
} from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 获取操作日志列表 - 请求参数
class getMlDealtrackLogListRequest extends APIRequest {
  mlDealtrackId = ""; // 成交报告ID
  pageOffset = 1; // 页码
  pageRows = 20; // 每页显示数量
  constructor(mlDealtrackId = "", pageOffset = 1, pageRows = "") {
    super();
    this.mlDealtrackId = mlDealtrackId;
    this.pageOffset = pageOffset;
    this.pageRows = pageRows;
  }
}
// 获取操作日志列表 - 请求地址
class getMlDealtrackLogListApi extends PostRequest {
  constructor(request = new getMlDealtrackLogListRequest()) {
    super(request);
  }

  getUrl() {
    return "/erpWeb/mlDeal/getMlDealtrackLogList";
  }
}
// 获取操作日志列表 - 返回值 - 单个
class getMlDealtrackLogListItem {
  creationTime = ""; // 创建时间
  dealtrackLogContent = ""; // 跟进内容
  dealtrackLogType = ""; // 日志类别
  creatorUserName = ""; // 跟进人
  creationUid = ""; // 跟进人ID
  mlDealtrackId = ""; // 成交报告id
  id = "";
}
// 获取操作日志列表
class getMlDealtrackLogList {
  request;
  constructor(request = new getMlDealtrackLogListRequest()) {
    this.request = request;
  }

  send() {
    return new getMlDealtrackLogListApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data || [];
      let list = [];
      for (let item of data) {
        let responseItem = new getMlDealtrackLogListItem();
        for (let key in responseItem) {
          responseItem[key] = item[key] || responseItem[key];
        }
        list.push(responseItem);
      }

      return list;
    })
  }
}

/* -----------------------------------------------二手成交报告详情数据----------------------------------------------------- */
// 二手房成交报告详情
class SecondHandReportInfoDetailRequest extends APIRequest {
  id = ""; //成交报告ID
  constructor(obj = {}) {
    super();
    this.id = obj.id || '';
  }
}

// 定义返回参数
class SecondHandReportInfoDetailParams {
  erpMlDeal = {
    "auditStatus": "", //(byte)审核状态 0=未审核 1=已审核
    "billStatus": "", //(byte)单据状态 1=正常单，2=变更单，3=撤单
    "branchBankId": "", //(int32)分行ID
    "buildName": "", //(string)楼盘名称
    "buyCustomerCommsion": "", //(number)客户付佣
    "buyNecessaryCost": "", //(number)客户必要费用
    "category": "", //(byte)类别
    "cityId": "", //(int32)null
    "commissionStatus": "", //(byte)佣金状态 0=未收齐，1=已收齐
    "compId": "", //(int32)null
    "cooperationType": "", //(byte)1=跨市合作，2=市内合作，3=区内合作
    "createTime": "", //(date-time)创建时间
    "createUid": "", //(int32)创建人
    "dealDate": "", //(date-time)成交时间
    "dealHouseId": "", //(int32)房源ID
    "dealHouseInfo": "", //(string)物业信息
    "dealHouseNo": "", //(string)房源编号
    "dealHouseStyle": "", //(byte)1=内部合作；2=外部合作
    "dealId": "", //(int32)主键ID
    "dealNo": "", //(string)成交编号
    "dealPrice": "", //(number)成交价格
    "dealStatus": "", //(byte)状态
    "dealType": "", //(byte)成交类型
    "dealUserId": "", //(int32)成交人ID
    "downPayments": "", //(number)首付金额
    "entrustId": "", //(string)委托合同ID
    "entrustNo": "", //(string)委托合同编号
    "entrustType": "", //(string)委托合同类型
    "estimatedCommissionTime": "", //(date-time)预计收佣时间
    "fileStatus": "", //(byte)查档状态
    "financeBank": "", //(int32)按揭银行
    "financeMoney": "", //(number)按揭欠款
    "firstEarnestMoney": "", //(number)第一笔定金
    "firstEarnestMoneyDate": "", //(date-time)第一笔定金支付时间
    "handoverStatus": "", //(byte)1=空房；2=带家电
    "hasAllFiles": "", //(byte)资料是否齐全，0=否，1=是
    "hasComplaint": "", //(byte)是否有投诉 0=否，1=是
    "hasCooperateFee": "", //(byte)有无合作费 0=无，1=有
    "hasDispute": "", //(byte)是否有案件纠纷 0=否，1=是
    "hasHouseDeal": "", //(byte)有盘成交 0=无盘成交，1=有盘成交，0=否，1=是
    "hasLease": "", //(byte)0=否，1=是
    "houseAddr": "", //(string)楼盘地址
    "houseArea": "", //(number)建筑面积
    "houseBalcony": "", //(byte)户型：阳台
    "houseHall": "", //(byte)户型：厅
    "houseInnerArea": "", //(number)套内面积
    "houseReg": "", //(int32)所属片区
    "houseRoom": "", //(byte)户型：室
    "houseToilet": "", //(byte)户型：卫生间
    "houseUseage": "", //(byte)用途，DD:HOUSE_USEAGE
    "houseUseageName": "", //(string)用途名称，DD:HOUSE_USEAGE 
    "isOtherCountry": "", //(byte)是否海外项目，0=否，1=是
    "leaseDepositType": "", //(byte)租约押金类型
    "leaseEndTime": "", //(date-time)租约到期
    "mainDealId": "", //(int32)事后加佣ID
    "mainDealNo": "", //(string)事后加佣主单号
    "mortgageAmount": "", //(number)按揭金额
    "mortgageDate": "", //(date-time)按揭时间
    "mortgageFee": "", //(number)按揭手续费
    "notarizationDate": "", //(date-time)公证委托时间
    "otherDealBankId": "", //(int32)外区分行ID
    "otherDealCityId": "", //(int32)外区所在城市
    "ownerName": "", //(string)权属名称
    "ownerNo": "", //(string)权证编号
    "ownerStatus": "", //(byte)1=红本；2=抵押
    "ownerType": "", //(byte)1=房产证、2=不动产证
    "payType": "", //(byte)1=一次性；2=按揭
    "priceUnit": "", //(byte)1=元；2=万元；
    "propertyType": "", //(byte)1=商品房；2=小产权房；3=军产房
    "remarks": "", //(string)备注
    "secondEarnestMoney": "", //(number)第二笔定金
    "secondEarnestMoneyDate": "", //(date-time)第二笔定金支付时间
    "sellNecessaryCost": "", //(number)业主必要费用
    "sellOwnerCommsion": "", //(number)业主付佣
    "signDate": "", //(date-time)签约日期
    "superviseDate": "", //(date-time)监管时间
    "supplementDate": "", //(date-time)补录日期
    "tailMoney": "", //(number)剩余楼款
    "tailMoneyPayTime": "", //(date-time)剩余楼款支付时间
    "transferDeposit": "", //(number)交楼押金
    "transferDepositPayTime": "" //(date-time)交楼押金支付时间
  };
  erpMlDealBuyUser = [{
    "address": "", //(string)地址
    "buyRelationship": "", //(byte)客户关系
    "buyUserType": "", //(byte)类型
    "cityId": "", //(int32)城市
    "country": "", //(int32)国籍
    "createTime": "", //(date-time)创建时间
    "createUid": "", //(int32)创建人
    "credentialsNo": "", //(string)证件号码
    "credentialsType": "", //(byte)证件类型
    "dealId": "", //(int32)所属成交报告ID
    "enterpriseName": "", //(string)企业名称
    "enterpriseNo": "", //(string)企业营业执照编号
    "firstContractPhone": "", //(string)联系电话1
    "firstContractType": "", //(byte)联系方式1
    "fromSource": "", //(int32)来源
    "fromSourceName": "", //客户来源
    "id": "", //(int32)主键ID
    "legalPerson": "", //(string)法人姓名
    "ownerProportion": "", //(string)产权比例
    "provinceId": "", //(int32)省份
    "registrationType": "", //(byte)1=本市户籍
    "remarks": "", //(string)备注
    "secondContractPhone": "", //(string)联系电话2
    "secondContractType": "", //(string)联系方式2
    "thirdContractPhone": "", //(string)联系电话3
    "thirdContractType": "", //(string)联系方式3
    "userId": "", //(int32)关联客户ID
    "userName": "", //(string)姓名
    "userRegion": "", //(byte)地域
    "userSex": "" //(byte)性别
  }];
  erpMlDealOuterCooperation = [{
    "contractPhone": "", //(string)电话
    "cooperationCost": "", //(number)合作费
    "createTime": "", //(date-time)创建时间
    "createUid": "", //(int32)创建人
    "dealId": "", //(int32)所属成交报告ID
    "delTime": "", //(date-time)删除时间
    "id": "", //(int32)主键ID
    "idNo": "", //(string)身份证
    "isDel": "", //(boolean)是否删除
    "seqNo": "", //(int32)序号
    "type": "", //(byte)类型
    "userName": "" //(string)合作人
  }];
  erpMlDealProfit = [{
    "compId": "", //(int32)公司ID
    "createTime": "", //(date-time)创建时间
    "createUid": "", //(int32)创建人
    "dealId": "", //(int32)所属成交报告ID
    "delTime": "", //(date-time)删除时间
    "id": "", //(int32)主键ID
    "isDel": "", //(boolean)是否删除
    "orderProportion": "", //(number)单量
    "orgId": "", //(int32)部门ID
    "orgName": "", //部门名称
    "profitLeaders": "", //(string)多个人员用|分割
    "profitMoney": "", //(number)业绩金额
    "profitMonth": "", //(string)业绩月份
    "profitProportion": "", //(number)业绩比例
    "profitType": "", //(byte)业绩类型
    "profitTypeName": "", //分配类型名称
    "seqNo": "", //(int32)序号
    "userId": "", //(int32)null
  }];
  erpMlDealSeller = [{
    "address": "", //(string)地址
    "cityId": "", //(int32)城市
    "contractPhone": "", //(string)联系电话
    "contractType": "", //(byte)联系方式
    "country": "", //(int32)国籍
    "createTime": "", //(date-time)创建时间
    "createUid": "", //(int32)创建人
    "credentialsNo": "", //(string)证件号码
    "credentialsType": "", //(byte)证件类型
    "dealId": "", //(int32)所属成交报告ID
    "id": "", //(int32)主键
    "ownerProportion": "", //(string)产权比例
    "provinceId": "", //(int32)省份
    "registrationType": "", //(byte)1=本市户籍
    "remarks": "", //(string)备注
    "sellName": "", //(string)姓名
    "sellRegion": "", //(byte)地域
    "sellRelationship": "", //(byte)业主关系
    "sellSex": "", //(byte)性别
    "sellType": "" //(byte)业主类型
  }]
}

// 定义请求
class SecondHandReportInfoDetailApi extends PostRequest {
  constructor(request = new SecondHandReportInfoDetailRequest()) {
    super(request)
  }
  getUrl() {
    return '/erpWeb/mlDeal/getMlDealDetailById'
  }
  getNeedToken() {
    return true;
  }
}

class SecondHandReportInfoDetail {
  request;
  constructor(request = new SecondHandReportInfoDetailRequest()) {
    this.request = request;
  }
  send() {
    return new SecondHandReportInfoDetailApi(this.request).send()
      .then(res => {
        console.log('进来了');
        if (res.errCode !== Const.successCode) return Promise.reject(res);

        let obj = res.data || {};

        let item = new SecondHandReportInfoDetailParams();
        item.erpMlDeal = obj.erpMlDealVo || item.erpMlDeal;
        item.erpMlDealBuyUser = obj.erpMlDealBuyUserVo || [];
        item.erpMlDealOuterCooperation = obj.erpMlDealOuterCooperation || [];
        item.erpMlDealProfit = obj.erpMlDealProfitVo || [];
        item.erpMlDealSeller = obj.erpMlDealSellerVo || [];

        return item;
      })
      .catch((res) => {
        console.log(res, '--catch--');
        new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
      })
  }
}
/* -----------------------------------------------二手成交报告编辑数据----------------------------------------------------- */
// 二手房成交报告编辑请求参数
class editReportInfoDetailRequest extends APIRequest {
  id = ""; //成交报告ID
  constructor(obj = {}) {
    super();
    this.id = obj.id || '';
  }
}
// 二手房成交报告编辑请求地址
class editReportInfoDetailApi extends PostRequest {
  constructor(request = new editReportInfoDetailRequest()) {
    super(request)
  }
  getUrl() {
    return '/erpWeb/mlDeal/createMlDealReport'
  }
  getNeedToken() {
    return true;
  }
}

class editReportInfoDetail {
  request;
  constructor(request = new ReportInfoDetailRequest()) {
    this.request = request;
  }
  send() {
    return new editReportInfoDetailApi(this.request).send()
      .then(res => {
        console.log('进来了');
        if (res.errCode !== Const.successCode) return Promise.reject(res);

        let obj = res.data || {};

        return obj;
      })
      .catch((res) => {
        console.log(res, '--catch--');
        new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
      })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
  getMlDealtrackLogListRequest,
  getMlDealtrackLogList,
  SecondHandReportInfoDetailRequest,
  SecondHandReportInfoDetailParams,
  SecondHandReportInfoDetail,

  editReportInfoDetail
}