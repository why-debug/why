import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 查询二手房交易报告列表 - 请求参数
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
  orderByType = "ASC"; // 排序方式 ASC=升序、DESC=降序
  constructor () {
    super();
  }
}
// 查询二手房交易报告列表 - 接口地址
class getMlDealListApi extends PostRequest{
  constructor (request = new getMlDealListRequest()) {
    super(request);
  }
  
  getUrl () {
    return "/erpWeb/mlDeal/getMlDealList"
  }
}
// 查询二手房交易报告列表 - 返回值
class getMlDealListResponse extends APIResponse {
  list = [];
  constructor () {
    super();
  }
}
// 查询二手房交易报告列表 - 单个
class getMlDealListItem {
  isChecked = ""; // 是否被选中
  auditStatus = ""; // 审核状态 0=未审核 1=已审核
}
// 查询二手房交易报告列表
class getMlDealList {
  request;
  constructor (request = new getMlDealListRequest()) {
    this.request = request;
  }

  send () {
    return new getMlDealListApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data || [];

      let response = new getMlDealListResponse();

      for (let item of data) {
        let responseItem = new getMlDealListItem();
        for (let key in responseItem) {
          responseItem[key] = item[key] || responseItem[key];
        }
        response.push(responseItem);
      }

      return response;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
  getMlDealListRequest,
  getMlDealListItem,
  getMlDealList
}
