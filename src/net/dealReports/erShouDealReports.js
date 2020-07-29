import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 新增二手房交易报告 - 请求参数
class createMlDealReportRequest extends APIRequest {
  erpMlDeal = {};
  erpMlDealBuyUsers = [];
  erpMlDealSellers = [];
  erpMlDealOuterCooperations = [];
  erpMlDealProfits = [];
  constructor () {
    super();
  }
}
// erpMlDeal = {}
class erpMlDeal {
  dealId = ""; // 主键ID
  dealNo = ""; // 成交编号
  dealDate = ""; // 成交时间
  dealType = 1; // 成交类型 1=售、2=租、3=代办、4=返利
  category = 1; // 成交类别 1=一般成交、2=事后加佣、3=口头代理费、4=外区分佣
  mainDealNo = ""; // 事后加佣主单号
  mainDealId = ""; // 事后加佣ID
  estimatedCommissionTime = ""; // 预计收佣时间
  cooperationType = 1; // 合作方式：1=跨市合作、2=市内合作、3=区内合作
  branchBankId = ""; // 分行ID
  dealUserId = ""; // 成交人ID
  otherDealCityId = ""; // 外区所在城市
  otherDealBankId = ""; // 外区分行ID
  supplementDate = ""; // 补录日期
  dealHouseStyle = 1; // 1=内部合作、2=外部合作
  dealHouseId = ""; // 房源ID
  dealHouseNo = ""; // 房源编号
  dealHouseInfo = ""; // 物业信息
  ownerName = ""; // 权属名称
  ownerType = 1; // 1=房产证、2=不动产证
  ownerNo = ""; // 权属编号
  houseUseage = ""; // 用途
  houseRoom = ""; // 室
  houseHall = ""; // 厅
  houseToilet = ""; // 卫
  houseBalcony = ""; // 阳台
  houseReg = ""; // 所属片区
  houseArea = ""; // 建筑面积
  houseInnerArea = ""; // 套内面积
  propertyType = 1; // 1=商品房、2=小产权房、3=军产房
  ownerStatus = 1; // 1=红本、2=抵押
  fileStatus = 1; // 查档状态 1有效、2抵押、3查封、4其它
  financeBank = ""; // 按揭银行
  financeMoney = ""; // 按揭欠款
  handoverStatus = ""; // 1=空房、2=带家电
  entrustId = "";
  entrustType = 1;
  entrustNo = "";
  dealPrice = 0; // 成交价格
  priceUnit = 1; // 1=元、2=万元
  signDate = ""; // 签约日期
  payType = 1; // 1=一次性、2=按揭
  firstEarnestMoney = ""; // 第一笔定金
  firstEarnestMoneyDate = ""; // 第一笔定金支付时间
  secondEarnestMoney = ""; // 第二笔定金
  secondEarnestMoneyDate = ""; // 第二笔定金支付时间
  tailMoney = ""; // 剩余楼款
  tailMoneyPayTime = ""; // 剩余楼款支付时间
  transferDeposit = ""; // 交楼押金
  transferDepositPayTime = ""; // 交楼押金支付时间
  downPayments = ""; // 首期款
  superviseDate = ""; // 首期款监管时间
  mortgageAmount = ""; // 按揭金额
  mortgageDate = ""; // 按揭时间
  mortgageFee = 0; // 按揭手续费
  notarizationDate = ""; // 公证委托时间
  sellOwnerCommsion = 0; // 业主付佣
  buyCustomerCommsion = 0; // 客户付佣
  sellNecessaryCost = ""; // 业主必要费用
  buyNecessaryCost = ""; // 客户必要费用
  hasLease = '0'; // 0=否、1=是
  leaseEndTime = ""; // 租约到期
  leaseDepositType = ""; // 租约押金类型
  remarks = ""; // 备注
  createUid = ""; // 创建人
  createTime = ""; // 创建时间
  dealStatus = ""; // 状态
  compId = "";
  cityId = "";
  auditStatus = 0; // 审核状态 0=未审核、1=已审核
  billStatus = 1; // 单据状态 1=正常单、2=变更单、3=撤单
  hasCooperateFee = 0; // 有无合作费 0=无、1=有
  commissionStatus = 0; // 佣金状态 0=未收齐、1=已收齐
  hasHouseDeal = 0; // 有盘成交 0=无盘成交、1=有盘成交、0=否、1=是
  isOtherCountry = 0; // 是否海外项目
  houseAddr = ""; // 楼盘地址
  hasAllFiles = 0; // 资料是否齐全 0=否、1=是
  hasDispute = 0; // 是否有案件纠纷 0=否、1=是
  hasComplaint = 0; // 是否有投诉 0=否、1=是
  buildName = ''; // 楼盘名称
}
// rpMlDealBuyUsers = [] 客户item
class erpMlDealBuyUsersItem {
  id = ""; // 主键ID
  dealId = ""; // 所属成交报告ID
  buyUserType = 1; // 类型 1=本人 2=企业
  buyRelationship = 1; // 客户关系 1=本人 2=丈夫 3=妻子 4=亲属 5=朋友 6=儿子 7=其他 8=同学
  userName = ""; // 姓名
  userSex = 1; // 性别
  userRegion = 1; // 地域
  credentialsType = 1; // 证件类型 1=身份证 2=护照
  credentialsNo = ""; // 证件号码
  registrationType = 1; // 1=本市户籍
  firstContractType = 1; // 联系方式1
  firstContractPhone = ""; // 联系电话1
  secondContractType = 1; // 联系方式2
  secondContractPhone = ""; // 联系电话2
  thirdContractType = 1; // 联系方式3
  thirdContractPhone = ""; // 联系电话3
  country = ""; // 国家
  provinceId = ""; // 省份
  cityId = ""; // 城市
  address = ""; // 地址
  ownerProportion = ""; // 产权比例
  fromSource = ""; // 来源
  remarks = ""; // 备注
  createUid = ""; // 创建人
  createTime = ""; // 创建时间
  userId = ""; // 关联客户ID
  enterpriseName = ""; // 企业名称
  enterpriseNo = ""; // 	企业营业执照编号
  legalPerson = ""; // 法人姓名
  principalName=""; //委托人姓名
  principalTel=""; //委托人电话
}
// erpMlDealSellers = [] 业主item
class erpMlDealSellersItem {
  id = ""; // 主键ID
  dealId = ""; // 所属成交报告ID
  sellType = 1; // 业主类型 1=本人 2=企业
  sellRelationship = 1; // 业主关系 1=本人 2=丈夫 3=妻子 4=亲属 5=朋友 6=儿子 7=其他 8=同学
  sellName = ""; // 姓名
  sellSex = 1; // 性别 1=男 0=女
  sellRegion = 1; // 地域
  credentialsType = 1; // 证件类型 1=身份证 2=护照
  credentialsNo = ""; // 证件号码
  registrationType = 1; // 1=本市户籍
  contractType = 1; // 联系方式
  contractPhone = ""; // 联系电话
  country = ""; // 国籍
  provinceId = ""; // 省份
  cityId = ""; // 城市
  address = ""; // 地址
  ownerProportion = ""; // 产权比例
  remarks = ""; // 备注
  createUid = ""; // 创建人
  createTime = ""; // 创建时间
}
// erpMlDealOuterCooperations = [] 业绩1item
class erpMlDealOuterCooperationsItem {
  id = ""; // 主键ID
  dealId = ""; // 所属成交报告ID
  seqNo = ""; // 序号
  userName = ""; // 合作人
  idNo = ""; // 身份证
  contractPhone = ""; // 电话
  type = ""; // 类型
  cooperationCost = 0; // 合作费
  createUid = ""; // 创建人
  createTime = ""; // 创建时间
  isDel = ""; // 是否删除
  delTime = ""; // 删除时间
}
// erpMlDealProfits = [] 业绩2item
class erpMlDealProfitsitem {
  id = ""; // 主键ID
  dealId = ""; // 所属成交报告ID
  seqNo = ""; // 序号
  profitType = ""; // 业绩类型
  compId = ""; // 公司ID
  orgId = ""; // 部门ID
  profitMonth = ""; // 业绩月份
  profitProportion = 0; // 业绩比例
  profitMoney = 0; // 业绩金额
  orderProportion = 0; // 单量
  profitLeaders = ""; // 多个人员用|分割
  createUid = ""; // 创建人
  createTime = ""; // 创建时间
  isDel = ""; // 是否删除
  delTime = ""; // 删除时间
  userId = "";
  userName = "";
  compOrgName = ""; // 分配部门

  getProfitLeaders () {
    if (!this.profitLeaders) return ''
    return this.profitLeaders.split('|').join(',')
  }
}

// 新增二手房交易报告 - 接口地址
class createMlDealReportApi extends PostRequest {
  constructor (request = new createMlDealReportRequest()) {
    super(request);
  }

  getUrl () {
    return "/erpWeb/mlDeal/createMlDealReport";
  }
}
// 新增二手房交易报告
class createMlDealReport {
  request;
  constructor (request = new createMlDealReportRequest()) {
    this.request = request;
  }

  send () {
    return new createMlDealReportApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data || {};

      return data;
    })
  }
}

// 二手房成交报告信息 - 请求参数
class getMlDealInfoByIdRequest extends APIRequest {
  id = "";
  constructor (id = "") {
    super();
    this.id = id;
  }
}
// 二手房成交报告信息 - 接口地址
class getMlDealInfoByIdApi extends PostRequest {
  constructor (request = new getMlDealInfoByIdRequest()) {
    super(request);
  }

  getUrl () {
    return "/mlDeal/getMlDealInfoById";
  }
}
// 二手房成交报告信息
class getMlDealInfoById {
  request;
  constructor (request = new getMlDealInfoByIdRequest()) {
    this.request = request;
  }

  send () {
    return new getMlDealInfoByIdApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data || {};

      return data;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

// 获取合同列表 - 请求参数
class getEntrustListByConditionRequest extends APIRequest {
  entrustStatus = 1; // 1 有效 0 无效
  condition = ""; // 	合同编号、组织名称、组织编码、申请人
  constructor (entrustStatus = 1, condition = "") {
    super();
    this.entrustStatus = entrustStatus;
    this.condition = condition;
  }
}
// 获取合同列表 - 请求地址
class getEntrustListByConditionApi extends PostRequest {
  constructor (request = new getEntrustListByConditionRequest()) {
    super(request);
  }

  getUrl () {
    return "/erpWeb/mlDeal/getEntrustListByCondition";
  }
}
// 获取合同列表 - 返回值
class getEntrustListByConditionResponse extends APIResponse {
  constructor () {
    super();
  }
}
// 获取合同列表
class getEntrustListByCondition {
  request;
  constructor (request = new getEntrustListByConditionRequest()) {
    this.request = request;
  }

  send () {
    return new getEntrustListByConditionApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data || [];

      return data;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

// 获取出售房源列表 - 请求参数
class getHouseSaleListRequest extends APIRequest {
  constructor () {
    super();
  }
}
// 获取出售房源列表 - 请求地址
class getHouseSaleListApi extends PostRequest {
  constructor (request = new getHouseSaleListRequest()) {
    super(request);
  }

  getUrl () {
    return "/houseWeb/funSale/getHouseSaleList";
  }
}
// 获取出售房源列表 - 返回值
class getHouseSaleListResponse extends APIResponse {
  constructor () {
    super();
  }
}
// 获取出售房源列表
class getHouseSaleList {
  request;
  constructor (request = new getHouseSaleListRequest()) {
    this.request = request;
  }

  send () {
    return new getHouseSaleListApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data || {};
      let response = new getHouseSaleListResponse();

      return response;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

// 获取出租房源列表 - 请求参数
class getHouseLeaseListRequest extends APIRequest {
  constructor () {
    super();
  }
}
// 获取出租房源列表 - 请求地址
class getHouseLeaseListApi extends PostRequest {
  constructor (request = new getHouseLeaseListRequest()) {
    super(request);
  }

  getUrl () {
    return "/houseWeb/funLease/getHouseLeaseList";
  }
}
// 获取出租房源列表 - 返回值
class getHouseLeaseListResponse extends APIResponse {
  constructor () {
    super();
  }
}
// 获取出租房源列表
class getHouseLeaseList {
  request;
  constructor (request = new getHouseLeaseListRequest()) {
    this.request = request;
  }

  send () {
    return new getHouseLeaseListApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data || {};
      let response = new getHouseLeaseListResponse();
      return response;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

// 获取主行列表 - 请求参数
class getBankDicListRequest extends APIRequest {
  bankName = ""; // 银行模糊名字
  constructor (bankName = "") {
    super();
    this.bankName = bankName;
  }
}
// 获取主行列表 - 请求地址
class getBankDicListApi extends PostRequest {
  constructor (request = new getBankDicListRequest()) {
    super(request);
  }

  getUrl () {
    return "/erpWeb/bankDic/getBankDicList";
  }
}
// 获取主行列表 - 返回值 - 单个
class getBankDicListItem {
  bankDescription = ""; // 描述
  bankName = ""; // 银行名
  bankNumber = ""; // 序号
  cityId = ""; // 城市ID
  compId = ""; // 公司ID
  id = ""; // 银行ID
}
// 获取主行列表
class getBankDicList {
  request;
  constructor (request = new getBankDicListRequest()) {
    this.request = request;
  }

  send () {
    return new getBankDicListApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data || [];
      let list = [];

      for (let item of data) {
        let responseItem = new getBankDicListItem();
        for (let key in responseItem) {
          responseItem[key] = item[key] || responseItem[key];
        }
        list.push(responseItem);
      }

      return list;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

// 获取分行列表 - 请求参数
class getBranchBankDicListRequest extends APIRequest {
  bankCity = ""; // 城市
  bankNameOrAddress = ""; // 分行名或地址模糊查询
  bankProvince = ""; // 省份
  parentBankId = ""; // 父行Id
  constructor (bankCity = "", bankNameOrAddress = "", bankProvince = "", parentBankId = "") {
    super();
    this.bankName = bankName;
    this.bankNameOrAddress = bankNameOrAddress;
    this.bankProvince = bankProvince;
    this.parentBankId = parentBankId;
  }
}
// 获取分行列表 - 请求地址
class getBranchBankDicListApi extends PostRequest {
  constructor (request = new getBranchBankDicListRequest()) {
    super(request);
  }

  getUrl () {
    return "/erpWeb/bankDic/getBranchBankDicList";
  }
}
// 获取分行列表 - 返回值 - 单个
class getBranchBankDicListItem {
  bankAddress = ""; // 地址
  bankCity = ""; // 城市
  bankCode = ""; // 银行编码
  bankFax = ""; // 传真
  bankName = ""; // 父行名
  bankProvince = ""; // 省份
  bankRemark = ""; // 备注
  branchBankName = ""; // 该分行名
  bankName = ""; // 父行名
  bankName = ""; // 父行名
  cityId = ""; // 城市ID
  compId = ""; // 公司ID
  contactPhone = ""; // 联系电话
  id = ""; // 银行ID
  isChurchyard = ""; // 是否境内 0：否 1：是
  linkmanName = ""; // 联系人
  parentBankId = ""; // 父行ID
  superOrganization = ""; // 上级机构
}
// 获取分行列表
class getBranchBankDicList {
  request;
  constructor (request = new getBranchBankDicListRequest()) {
    this.request = request;
  }

  send () {
    return new getBranchBankDicListApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data || [];
      let list = [];

      for (let item of data) {
        let responseItem = new getBranchBankDicListItem();
        for (let key in responseItem) {
          responseItem[key] = item[key] || responseItem[key];
        }
        list.push(responseItem);
      }

      return list;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

// 获取业绩类别列表 - 请求参数
class getFunPerformanceTypeListRequest extends APIRequest {
  constructor () {
    super();
  }
}
// 获取业绩类别列表 - 请求地址
class getFunPerformanceTypeListApi extends PostRequest {
  constructor (request = new getFunPerformanceTypeListRequest()) {
    super(request);
  }

  getUrl () {
    return "/erpWeb/profit/getFunPerformanceTypeList";
  }
}
// 获取业绩类别列表 - 返回值 - 单个
class getFunPerformanceTypeListItem {
  collectionType = ""; // 1=过户 2=二手房佣金 3=新房佣金 4=租赁租金 5=金融
  performanceName = "";
  alias = "";
  performanceId = null;
}
// 获取业绩类别列表
class getFunPerformanceTypeList {
  request;
  constructor (request = new getFunPerformanceTypeListRequest()) {
    this.request = request;
  }

  send () {
    return new getFunPerformanceTypeListApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data.list || [];
      let list = [];

      for (let item of data) {
        let responseItem = new getFunPerformanceTypeListItem();
        for (let key in responseItem) {
          responseItem[key] = item[key] || responseItem[key];
        }
        list.push(responseItem);
      }

      return list;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
  erpMlDeal,
  erpMlDealBuyUsersItem,
  erpMlDealSellersItem,
  erpMlDealOuterCooperationsItem,
  erpMlDealProfitsitem,
  createMlDealReport,

  getMlDealInfoByIdRequest,
  getMlDealInfoById,

  getEntrustListByConditionRequest,
  getEntrustListByCondition,

  getHouseSaleListRequest,
  getHouseSaleList,
  getHouseLeaseListRequest,
  getHouseLeaseList,

  getBankDicListRequest,
  getBankDicList,
  getBranchBankDicListRequest,
  getBranchBankDicList,

  getFunPerformanceTypeList
}
