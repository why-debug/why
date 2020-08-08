import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 查询 二手房交易报告列表 - 请求参数
class getMlDealListRequest extends APIRequest {
  pageNum = 1;
  pageSize = 20;
  dealType = 1; // 类型 1 售单 2 租单
  queryUserType = 1; // 查询人员类型 1=创建人、2=成交人、3=分成人
  userId = ""; // 员工ID
  orgId = ""; // 组织机构ID 0=全公司
  queryDateType = 1; // 查询时间类型 1=最近签约、2=最近收佣、3=最近创建
  queryDateS = ""; // 查询时间-开始
  queryDateE = ""; // 查询时间-结束
  financeStatus = ""; // 财务状态
  contractType = ""; // 合同类别
  isOtherCountry = ""; // 是否海外项目 0=否、1=是
  dealPriceL = ""; // 最低成交价
  dealPriceH = ""; // 最高成交价
  hasAllFiles = 0; // 资料齐全 0=否、1=是
  hasDispute = 0; // 是否有案件纠纷 0=否、1=是
  hasComplaint = 0; // 是否有投诉 0=否、1=是
  cooperateType = 0; // 合作方式 0=无合作、1=跨市合作、2=市内合作、3=区内合作
  billStatus = 1; // 单据状态 1=正常单、2=变更单、3=撤单
  hasCooperateFee = 0; // 有无合作费 0=无、1=有
  commissionStatus = 0; // 佣金状态 0=未收齐、1=已收齐
  transactionType = 1; // 成交类别 1=一般成交、2=事后加佣、3=口头代理费、4=外区分佣
  hasHouseDeal = 0; // 有盘成交 0=无盘成交、1=有盘成交
  orderByColumn = 1; // 排序字段 1=编号、2=审核状态
  orderByType = "DESC"; // 排序方式 ASC=升序、DESC=降序

  // 自定义字段，用于区分 新房/二手房
  requestListType = 1 ; // 1=二手房，2=新房


  constructor () {
    super();
  }

}
// 查询 二手房交易报告列表 - 接口地址
class getMlDealListApi extends PostRequest{

  constructor (request = new getMlDealListRequest()) {
    super(request);
  }
  
  getUrl () {
    // 查询 PC端 二手房交易报告列表宽列表
    return "/erpWeb/mlDeal/getMlDealPcBigVoList"
  }
}

// 查询二手房交易报告列表 - 单个
class getMlDealListItem {
  isChecked = ""; // 是否被选中
  auditStatus = ""; // 审核状态 0=未审核 1=已审核

  // 其他字段
  billStatus = ""; // "(byte)单据状态 1=正常单，2=变更单，3=撤单",
  buildName = ""; // "(string)楼盘名称",
  buyName = ""; // "(string)客户姓名",
  category = ""; // "(byte)类别 成交类别 1=一般成交，2=事后加佣，3=口头代理费，4=外区分佣 5=海外项目",
  cooperationCost = ""; // "(number)合作费",
  cooperationType = ""; // "(byte)1=跨市合作，2=市内合作，3=区内合作",
  createOrgName = ""; // "(string)创建人部门名称",
  createOrgNo = ""; // "(string)创建人部门编号",
  createUName = ""; // "(string)创建人名称",
  createUNo = ""; // "(string)创建人编号",
  createUid = ""; // "(int32)创建人",
  dealDate = ""; // "(date-time)成交日期",
  dealHouseNo = ""; // "(string)盘源编号",
  dealId = ""; // "(int32)主键ID",
  dealNo = ""; // "(string)成交编号",
  dealPrice = ""; // "(number)成交总价",
  priceUnit = ""; // "(string)成交总价单位"
  dealType = ""; // "(byte)成交类型 1=售、2=租、3=代办、4=返利",
  houseArea = ""; // "(number)建筑面积",
  houseRoom = ""; // "(byte)户型：室",
  orgId = ""; // "(int32)成交人部门ID",
  orgName = ""; // "(string)成交人部门名称",
  orgNo = ""; // "(string)成交人部门NO",
  reportCash = ""; // "(number)上报业绩",
  sellName = ""; // "(string)业主姓名",
  userId = ""; // "(int32)成交人Id",
  userName = ""; // "(string)成交人名字",
  userNo = ""; // "(string)成交人编号"

  //额外处理字段
  houseAreaCn = ""; //建筑面积
  dealPriceCn = ""; //成交总价 num+unit
  cooperationCostCn = ""; //合作费 中文
  dealTypeCn = ""; //成交类型Cn
  dealTypeCode = ""; //成交类型Code
  cooperationTypeCn = ""; //合作类型Cn
  cooperationCn = ""; //成交报告类型Cn
  dealDateFormate = ""; //成交日期格式化

}
// 查询二手房交易报告列表
class getMlDealList {
  dealTypeCnMap = {1:'出售',2:'出租',3:'代办',4:'返利'}
  dealTypeCodeMap = {1:'CS',2:'CZ',3:'HZ',}
  cooperationTypeMap = {1: '跨市合作',2: '市内合作，',3: '区内合作'}
  categoryMap = {1: '一般成交',2: '事后加佣',3: '口头代理费', 4: '外区分佣' , 5: '海外项目'}

  request;
  constructor (request = new getMlDealListRequest()) {
    //根据参数处理请求，并且请求不同接口

    this.request = request;
  }

  send () {
    return new getMlDealListApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let list = res.data || [];
      // 处理展示用字段
      for (let item of list) {
        let responseItem = new getMlDealListItem();
        for (let key in responseItem) {
          responseItem[key] = item[key] || responseItem[key];
        }

        // 成交类型Cn
        responseItem['dealTypeCn'] = this.dealTypeCnMap[responseItem.dealType] || '--'
        responseItem['dealTypeCode'] = this.dealTypeCodeMap[responseItem.dealType] || '--'
        //合作类型
        responseItem['cooperationTypeCn'] = this.cooperationTypeMap[responseItem.cooperationType] || ''
        //成交报告类型
        responseItem['cooperationCn'] = this.categoryMap[responseItem.category] || ''
        //成交日期
        responseItem['dealDateFormate'] = responseItem.dealDate ? responseItem.dealDate.substring(0, 10) : ''
        //成交总价 中文 ： num + unit
        responseItem['dealPriceCn'] = (responseItem.dealPrice || '-') + (responseItem.priceUnit || '-')
        // 合作费中文
        responseItem['cooperationCostCn'] = (responseItem.cooperationCost || '0') + '元'
        // 建筑面积中文
        responseItem['houseAreaCn'] = (responseItem.houseArea || '0') + '㎡'

        list.push(responseItem);
      }

      let data = {
        list: list ,
        total: res.total || 0,
        totalPage: res.totalPage || 0,
      }

      return data;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

// 查询 新房交易报告列表 - 请求参数
class getNewReportListRequest extends APIRequest {
  auditStatus = ""; // "(byte)审核状态 0=未审核，1=已审核",
  billStatus = "";  // "(byte)单据状态 1=正常单，2=变更单，3=撤单  (目前做不了)",
  commissionStatus = "";  // "(byte)佣金状态 0=未收齐，1=已收齐",
  contractType = "";  // "(byte)合同类别  (目前做不了)",
  cooperateType = ""; // "(byte)合作方式 0=无合作，1=跨市合作，2=市内合作，3=区内合作",
  dealPriceH = "";  // "(double)最高成交价",
  dealPriceL = "";  // "(double)最低成交价",
  dealType = "";  // "(byte,required)类型 ，1=售单，2=租单 3=合作",
  export = "";  // "(byte)export:1 为导出筛选条件所有数据 默认export为0",
  financeStatus = ""; // "(byte)财务状态  (目前做不了)",
  hasAllFiles = ""; // "(byte)资料齐全 0=否，1=是 (目前做不了)",
  hasComplaint = "";  // "(byte)是否有投诉 0=否，1=是  (目前做不了)",
  hasCooperateFee = ""; // "(byte)有无合作费 0=无，1=有",
  hasDispute = "";  // "(byte)是否有案件纠纷 0=否，1=是  (目前做不了)",
  hasHouseDeal = "";  // "(byte)有盘成交 0=无盘成交，1=有盘成交",
  isOtherCountry = "";  // "(byte)是否海外项目，0=否，1=是",
  orderByColumn = ""; // "(byte)排序字段 1=编号，2=审核状态",
  orderByType = ""; // "(string)排序方式 ASC=升序，DESC=降序",
  orgId = ""; // "(int32)组织机构ID，0=全公司",
  pageOffset = "";  // "(int32)页码",
  pageRows = "";  // "(int32)每页显示数量",
  queryDateE = "";  // "(date-time)查询时间-结束",
  queryDateS = "";  // "(date-time)查询时间-开始",
  queryDateType = ""; // "(byte)查询时间类型 1=制单日期，2=成交日期，3=过户日期（过户日期目前做不了）",
  queryUserType = ""; // "(byte)查询人员类型 ，1=创建人,2=成交人，3=分成人 ，4=房源方、5=客源方",
  selectType = "";  // "(byte)手机搜索独有 万能检索框：1.成交报告编号 2.房源编号 3.物业信息",
  selectValue = ""; // "(string)手机搜索独有 万能检索框：检索内容",
  transactionType = ""; // "(byte)成交类别 1=一般成交，2=事后加佣，3=口头代理费，4=外区分佣 5=海外项目",
  userId = "";  // "(int32)员工ID"

  constructor() {
    super();
  }

}
// 查询 新房 交易报告列表 - 接口地址
class getNewReportListApi extends PostRequest {

  constructor(request = new getNewReportListRequest()) {
    super(request);
  }

  getUrl() {
    // 查询 PC端 新房交易报告列表
    return "/newBuildWeb/broker/commission/getNewReportDealList"
  }
}

// 查询新房交易报告列表 - 单个
class getNewReportListItem {
  isChecked = ""; // 是否被选中
  auditStatus = ""; // 审核状态 0=未审核 1=已审核

  // 其他字段
  billStatus = ""; // "(byte)单据状态 1=正常单，2=变更单，3=撤单",
  buildName = ""; // "(string)楼盘名称",
  buyName = ""; // "(string)客户姓名",
  category = ""; // "(byte)类别 成交类别 1=一般成交，2=事后加佣，3=口头代理费，4=外区分佣 5=海外项目",
  cooperationCost = ""; // "(number)合作费",
  cooperationType = ""; // "(byte)1=跨市合作，2=市内合作，3=区内合作",
  createOrgName = ""; // "(string)创建人部门名称",
  createOrgNo = ""; // "(string)创建人部门编号",
  createUName = ""; // "(string)创建人名称",
  createUNo = ""; // "(string)创建人编号",
  createUid = ""; // "(int32)创建人",
  dealDate = ""; // "(date-time)成交日期",
  dealHouseNo = ""; // "(string)盘源编号",
  dealId = ""; // "(int32)主键ID",
  dealNo = ""; // "(string)成交编号",
  dealPrice = ""; // "(number)成交总价",
  priceUnit = ""; // "(string)成交总价单位"
  dealType = ""; // "(byte)成交类型 1=售、2=租、3=代办、4=返利",
  houseArea = ""; // "(number)建筑面积",
  houseRoom = ""; // "(byte)户型：室",
  orgId = ""; // "(int32)成交人部门ID",
  orgName = ""; // "(string)成交人部门名称",
  orgNo = ""; // "(string)成交人部门NO",
  reportCash = ""; // "(number)上报业绩",
  sellName = ""; // "(string)业主姓名",
  userId = ""; // "(int32)成交人Id",
  userName = ""; // "(string)成交人名字",
  userNo = ""; // "(string)成交人编号"

  //额外处理字段
  houseAreaCn = ""; //建筑面积
  dealPriceCn = ""; //成交总价 num+unit
  cooperationCostCn = ""; //合作费 中文
  dealTypeCn = ""; //成交类型Cn
  dealTypeCode = ""; //成交类型Code
  cooperationTypeCn = ""; //合作类型Cn
  cooperationCn = ""; //成交报告类型Cn
  dealDateFormate = ""; //成交日期格式化

}
// 查询新房交易报告列表
class getNewReportList {
  dealTypeCnMap = {
    1: '出售',
    2: '出租',
    3: '代办',
    4: '返利'
  }
  dealTypeCodeMap = {
    1: 'CS',
    2: 'CZ',
    3: 'HZ',
  }
  cooperationTypeMap = {
    1: '跨市合作',
    2: '市内合作，',
    3: '区内合作'
  }
  // 1 = 一般成交， 2 = 事后加佣， 3 = 口头代理费， 4 = 外区分佣 5 = 海外项目 "
  categoryMap = {
    1: '一般成交',
    2: '事后加佣',
    3: '口头代理费',
    4: '外区分佣',
    5: '海外项目'
  }

  request;
  constructor(request = new getNewReportListRequest()) {
    //根据参数处理请求，并且请求不同接口

    this.request = request;
  }

  send() {
    return new getNewReportListApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);
      console.log('res:', res);

      let data = res.data || [];

      // 处理展示用字段
      let list = [];
      for (let item of data) {
        let responseItem = new getNewReportListItem();
        for (let key in responseItem) {
          responseItem[key] = item[key] || responseItem[key];
        }

        // 成交类型Cn
        responseItem['dealTypeCn'] = this.dealTypeCnMap[responseItem.dealType] || '--'
        responseItem['dealTypeCode'] = this.dealTypeCodeMap[responseItem.dealType] || '--'
        //合作类型
        responseItem['cooperationTypeCn'] = this.cooperationTypeMap[responseItem.cooperationType] || ''
        //成交报告类型
        responseItem['cooperationCn'] = this.categoryMap[responseItem.category] || ''
        //成交日期
        responseItem['dealDateFormate'] = responseItem.dealDate ? responseItem.dealDate.substring(0, 10) : ''
        //成交总价 中文 ： num + unit
        responseItem['dealPriceCn'] = (responseItem.dealPrice || '-') + (responseItem.priceUnit || '-')
        // 合作费中文
        responseItem['cooperationCostCn'] = (responseItem.cooperationCost || '0') + '元'
        // 建筑面积中文
        responseItem['houseAreaCn'] = (responseItem.houseArea || '0') + '㎡'


        list.push(responseItem);
      }

      return list;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
  getMlDealListRequest,
  getMlDealList,
  getNewReportListRequest,
  getNewReportList,
}
