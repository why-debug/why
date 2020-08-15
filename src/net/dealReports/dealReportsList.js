import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 查询 二手房交易报告列表 - 请求参数
class getMlDealListRequest extends APIRequest {
  pageOffset = 1; // "(int32)页码",
  pageRows = 20; // "(int32)每页显示数量",
  dealType = '1'; // "(byte,required)类型 ，1=售单，2=租单 3=合作",
  auditStatus = '0'; // "(byte)审核状态 0=未审核，1=已审核",
  billStatus = "1"; // "(byte)单据状态 1=正常单，2=变更单，3=撤单  (目前做不了)",
  commissionStatus = "0"; // "(byte)佣金状态 0=未收齐，1=已收齐",
  cooperateType = "1"; // "(byte)合作方式 0=无合作，1=跨市合作，2=市内合作，3=区内合作",
  dealPrice = ""; //
  hasCooperateFee = ""; // "(byte)有无合作费 0=无，1=有",
  keyWords = "";//(string)模糊搜索


  contractType = ""; // "(byte)合同类别  (目前做不了)",
  dealPrice = ""; // "(string)成交价 格式： 1.最低成交价,最高成交价 2.如果是精准查询就直接传  成交价  3.如果查XX元以上那么格式：最低成交价,空格 ",
  export = 0; // "(byte)export:1 为导出筛选条件所有数据 默认export为0",
  financeStatus = ""; // "(byte)财务状态  (目前做不了)",
  hasAllFiles = ""; // "(byte)资料齐全 0=否，1=是 (目前做不了)",
  hasComplaint = ""; // "(byte)是否有投诉 0=否，1=是  (目前做不了)",
  hasDispute = ""; // "(byte)是否有案件纠纷 0=否，1=是  (目前做不了)",
  hasHouseDeal = ""; // "(byte)有盘成交 0=无盘成交，1=有盘成交",
  isOtherCountry = ""; // "(byte)是否海外项目，0=否，1=是",
  orderByColumn = ""; // "(byte)排序字段 1=编号，2=审核状态",
  orderByType = ""; // "(string)排序方式 ASC=升序，DESC=降序",
  orgId = ""; // "(int32)组织机构ID，0=全公司",
  queryDateE = ""; // "(date-time)查询时间-结束",
  queryDateS = ""; // "(date-time)查询时间-开始",
  queryDateType = ""; // "(byte)查询时间类型 1=制单日期，2=成交日期，3=过户日期（过户日期目前做不了）",
  queryUserType = ""; // "(byte)查询人员类型 ，1=创建人,2=成交人，3=分成人 ，4=房源方、5=客源方",
  selectType = ""; // "(byte)手机搜索独有 万能检索框：1.成交报告编号 2.房源编号 3.物业信息",
  selectValue = ""; // "(string)手机搜索独有 万能检索框：检索内容",
  transactionType = ""; // "(byte)成交类别 1=一般成交，2=事后加佣，3=口头代理费，4=外区分佣 5=海外项目",
  userId = ""; // "(int32)员工ID"
  client = 0;//用户端 0=PC 1=APP"


  constructor() {
    super();
  }

}
// 查询 二手房交易报告列表 - 接口地址
class getMlDealListApi extends PostRequest {

  constructor(request = new getMlDealListRequest()) {
    super(request);
  }

  getUrl() {
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
  buyCustomerCommsion = ""; // "(string)客户佣金",
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
  sellOwnerCommsion = ""; // "(string)业主佣金",
  userId = ""; // "(int32)成交人Id",
  userName = ""; // "(string)成交人名字",
  userNo = ""; // "(string)成交人编号"
  userPhotoCreate = ""; //标准照，制单人 
  userPhotoUser = ""; //标准照，成交人

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
  dealTypeCnMap = { 1: '出售', 2: '出租', 3: '代办', 4: '返利' }
  dealTypeCodeMap = { 1: 'CS', 2: 'CZ', 3: 'HZ', }
  cooperationTypeMap = { 1: '跨市合作', 2: '市内合作，', 3: '区内合作' }
  categoryMap = { 1: '一般成交', 2: '事后加佣', 3: '口头代理费', 4: '外区分佣', 5: '海外项目' }

  request;
  constructor(request = new getMlDealListRequest()) {
    //根据参数处理请求，并且请求不同接口

    this.request = request;
  }

  send() {
    return new getMlDealListApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let resList = res.data || [];
      let list = []
      // 处理展示用字段
      for (let item of resList) {
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
        list: list,
        total: res.total || 0,
        totalPage: res.totalPage || 0,
        pageNum: res.pageNum || 1,
      }

      return data;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

// 查询 新房交易报告列表 - 请求参数
class getNewReportListRequest extends APIRequest {
  auditStatus = "";//(byte)审核状态 0：未审核  1：已审核
  buildId = "";//(int32)项目ID
  caseDispute = "";//(byte)案件纠纷 0：无纠纷案  1：有纠纷案
  commissionStatus = "";//(byte)收佣状态 0：未收齐  1：已收齐
  complaint = "";//(byte)投诉 0：无投诉  1：有投诉
  completeData = "";//(byte)资料齐全 0：缺失  1：齐全
  cooperationType = "";//(byte)合作方式 0:未合作  1：跨市合作  2：市内合作  3：区内合作
  dealTime = "";//(string)成交日期
  dealUserId = "";//(int32)员工ID
  dealUserOrganizationId = "";//(int32)成交人组织ID
  dealUserType = "";//(byte)成交报告相关人: 1.创建人   2.成交人  3.分成人   4房源方  5客源方
  distributionCompId = "";//(int32)组织机构ID，'' = 全公司
  documentStatus = "";//(byte)单据状态 0：正常单  1：变更单  2: 撤单
  export = 0;//(int32)export: 1 为导出筛选条件所有数据 默认export为0
  isCooperationfee = "";//(byte)合作费  0：无 1: 有
  keyWords = "";//(string)模糊搜索
  offerAmount = "";//(string)成交总价 例如: 1199, 1000000
  orderByColumn = "";//(byte)排序字段  1 = 编号，2 = 审核状态 3, 制单日期 4.成交日期
  orderByType = "";//(string)排序方式 ASC = 升序，DESC = 降序 默认 DESC 
  pageOffset = "";//
  pageRows = "";//
  queryDateType = "";//(string) 签约时间  0-最近签约   1 - 最近收佣  2 - 最近创建
  reportClass = "";//(byte)成交类别  1：一般成交  2：事后加佣  3：口头代理费  4：外区分佣 5.海外
  reportId = "";//(int32)主键ID, 自增
  reportNo = "";//(string)成交报告编号
  searchType = "";//(string)搜索类型 1.按照成交报告编号  2.按照项目名称 3按照物业信息 
  sqlType = "";//(string)排序sql拼接
  tabType = "";//(int32)1 新房售 2新房租 3新房合作
  timeEndStr = "";//(string)结束时间
  timeStartStr = "";//(string)开始时间
  timeType = "";//(int32)制单日期 1成交日期 2过户日期(暂时不可用)
  transferTime = "";//(string)过户日期
  youpanDeal = "";//(byte)有盘成交 0：无盘成交  1：有盘成交

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

  acceptanceStatus = ""; // "(byte)是否受理 0：未受理  1：已受理", 
  auditStatus = ""; // "(byte)审核状态 0：未审核  1：已审核", 
  buildArea = ""; // "(number)建筑面积", 
  buildId = ""; // "(int32)项目Id", 
  buildName = ""; // "(string)项目名称", 
  buildRoom = ""; // "(int32)几室", 
  caseDispute = ""; // "(byte)案件纠纷 0：无纠纷案  1：有纠纷案", 
  commissionStatus = ""; // "(byte)收佣状态 0：未收齐  1：已收齐", 
  compName = ""; // "(string)公司名称", 
  complaint = ""; // "(byte)投诉 0：无投诉  1：有投诉", 
  completeData = ""; // "(byte)资料齐全 0：缺失  1：齐全", 
  cooperationType = ""; // "(byte)合作方式  0:未合作 1：跨市合作  2：市内合作  3：区内合作", 
  cooperationfee = ""; // "(number)合作费", 
  createTime = ""; // "(date-time)制单时间", 
  createUserId = ""; // "(int32)制单人id", 
  createUserName = ""; // "(string)制单人", 
  createUserImg = ""; // "(string)制单人头像", 
  createUserOrgId = ""; // "(int32)制单人组织id", 
  createUserOrgName = ""; // "(string)制单人组织名称", 
  createUserOrgNo = ""; // "(string)制单人组织编码", 
  custCommission = ""; // "(number)客户佣金", 
  custName = ""; // "客户名称", 
  dealTime = ""; // "(date-time)成交日期", 
  dealUserId = ""; // "(int32)员工ID", 
  dealUserOrganizationId = ""; // "(int32)组织机构ID，''=全公司", 
  documentStatus = ""; // "(byte)单据状态 0：正常单  1：变更单  2:撤单", 
  isCooperationfee = ""; // "(byte)合作费  0：无 1:有", 
  offerAmount = ""; // "(number)成交总价", 
  offerNo = ""; // "(string)认购编号", 
  payType = ""; // "(byte)付款方式  1:一次性付款  2:按揭付款", 
  propertyAdd = ""; // "(string)楼盘地址", 
  reportCash = ""; // "(number)上报业绩", 
  reportClass = ""; // "(byte)类别  1：一般成交  2：事后加佣  3：口头代理费  4：外区分佣", 
  reportId = ""; // "(int32)主键ID,自增", 
  reportNo = ""; // "(string)成交报告编号", 
  reportCommissionNo = ""; // "(string)主单号", 
  reportType = ""; // "(byte)类型  1：直销  2：分销  3：租赁", 
  timeEndStr = ""; // "(string)结束时间", 
  timeStartStr = ""; // "(string)开始时间", 
  timeType = ""; // "(int32)签约时间类型 1制单日期 2成交日期 3过户日期", 
  transferTime = ""; // "(string)过户日期", 
  agentName = ""; // "代理商名称", 
  developerName = ""; // "开发商名称", 
  userId = ""; // "(int32)成交人id", 
  userName = ""; // "(string)成交人名称", 
  userNameName = ""; // "(string)成交人名称脱敏", 
  userImg = ""; // "(string)成交人头像", 
  userNo = ""; // "(string)成交人编码", 
  userOrgId = ""; // "(int32)成交人组织ID", 
  userOrgName = ""; // "(string)成交人所在组织", 
  userOrgCode = ""; // "(string)成交人所在组织编码", 
  wuyeAddr = ""; // "(string)物业地址", 
  youpanDeal = ""; // "(byte)有盘成交 0：无盘成交  1：有盘成交"

  // 其他字段

  // buildArea: 112
  // buildName: "字段1"
  // buildRoom: 3
  // cooperationType: 2
  // cooperationfee: 200
  // createTime: "2020-08-01 16:28:09"
  // createUserId: 20333887
  // createUserName: "夷陵老祖"
  // createUserOrgId: 895814
  // createUserOrgName: "审核流程专用组织"
  // dealTime: "2020-07-28 00:00:00"
  // dealUserId: 20333887
  // dealUserOrganizationId: 895814
  // isCooperationfee: 1
  // offerAmount: 1000000
  // offerNo: "10010"
  // propertyAdd: "BangkokKhlong Toey?????????????"
  // reportCash: 100
  // reportClass: 1
  // reportId: 30
  // reportNo: "CDX200881"
  // userId: 20333887
  // userName: "夷陵老祖"
  // userNo: "CD20333886"
  // userOrgId: 895814
  // userOrgName: "审核流程专用组织"
  // wuyeAddr: "深圳罗湖区怡景花园"

  //额外处理字段
  reportTypeCn = ""; // 报告类型 中文
  dealId = ""; //建筑面积
  cooperationfeeCn = ""; //合作费 中文
  dealTimeFormate = ""; //成交日期 中文



  houseAreaCn = ""; //建筑面积
  offerAmountCn = ""; //成交总价 num+unit
  dealTypeCn = ""; //成交类型Cn
  reportClassCn = ""; //成交类别Cn
  dealTypeCode = ""; //成交类型Code
  cooperationTypeCn = ""; //合作类型Cn
  cooperationCn = ""; //成交报告类型Cn
  dealDateFormate = ""; //成交日期格式化
  createTimeFormate = ""; //制单日期格式化
  commissionStatusCn = ""; //收佣状态
  buildAreaCn = ""; //建筑面积中文



}
// 查询新房交易报告列表
class getNewReportList {
  reportTypeCnMap = {
    1: '直销',
    2: '分销',
    3: '租赁',
  }
  reportClassCnMap = {
    1: '一般成交',
    2: '事后加佣',
    3: '口头代理费',
    4: '外区分佣',
  }
  dealTypeCodeMap = {
    1: 'CS',
    2: 'CZ',
    3: 'HZ',
  }
  cooperationTypeMap = {
    1: '跨市合作',
    2: '市内合作',
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
  // 单据状态 0：正常单  1：变更单  2:撤单
  documentStatusMap = {
    0: '正常单',
    1: '变更单',
    2: '撤单',
  }
  //收佣状态 0：未收齐  1：已收齐
  commissionStatusMap = {
    0: '未收齐',
    1: '已收齐',
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

      let resList = res.data || [];
      if (JSON.stringify(res.data) == "{}") resList = [];
      // 处理展示用字段
      let list = [];
      for (let item of resList) {
        let responseItem = new getNewReportListItem();
        for (let key in responseItem) {
          responseItem[key] = item[key] || responseItem[key];
        }

        // 成交类型Cn
        responseItem['reportTypeCn'] = this.reportTypeCnMap[responseItem.reportType] || ''
        responseItem['dealTypeCode'] = this.dealTypeCodeMap[responseItem.dealType] || '--'
        responseItem['reportClassCn'] = this.reportClassCnMap[responseItem.reportClass] || '--'
        //合作类型
        responseItem['cooperationTypeCn'] = this.cooperationTypeMap[responseItem.cooperationType] || ''
        //成交报告类型
        responseItem['cooperationCn'] = this.categoryMap[responseItem.category] || ''
        //成交日期
        responseItem['dealTimeFormate'] = responseItem.dealTime ? responseItem.dealTime.substring(0, 10) : ''
        //成交总价 中文 ： num + unit
        responseItem['offerAmountCn'] = (responseItem.offerAmount || '-') + '万'
        // 合作费中文
        responseItem['cooperationfeeCn'] = (responseItem.cooperationfee || '0') + '元'
        // 建筑面积中文
        responseItem['buildAreaCn'] = (responseItem.buildArea || '0') + '㎡'
        responseItem['dealId'] = responseItem.reportId
        //收佣状态
        responseItem['commissionStatusCn'] = this.commissionStatusMap[responseItem.commissionStatus] || '';
        //制单日期格式化
        responseItem['createTimeFormate'] = responseItem.createTime ? responseItem.createTime.substring(0, 10) : ''
        console.log("responseItem['dealId']:", item['reportId']);


        list.push(responseItem);
      }
      let data = {
        list: list,
        total: res.total || 0,
        totalPage: res.totalPage || 0,
        pageNum: res.pageNum || 1,
      }

      return data;
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
