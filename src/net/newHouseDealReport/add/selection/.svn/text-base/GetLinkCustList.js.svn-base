import { PostRequest } from "../../../../common/net/PostRequest";
import { APIRequest } from "../../../../common/net/API";
import { Const } from "../../../../common/utils/Const";
// 定义参数
export class GetLinkCustListParams extends APIRequest {
  custId = ''; //员工编号
  organizationId = ''; //组织id
  pageNum = 1; //当前页码
  pageSize = 30;// 请求条数
  select = ''; //客户手机（精准查询）/转介单号（精准查询）
  userId = '';//员工id
  constructor() {
    super()
  }
}

// 定义请求
export class GetLinkCustListApi extends PostRequest {
  constructor(request = new GetLinkCustListParams) {
    super(request)
  }

  getUrl() {
    return '/newBuildWeb/broker/commission/getLinkCustList'
  }

  getNeedToken() {
    return true;
  }
}

//定义返回参数
export class GetLinkCustListItem {
  custId = "";//(int32)客户编号
  custMobile = ""; //(string)客户电话
  custName = ""; //(string)客户名称
  customerType = ""; //(int32)客户类型（0 普通 1转介 2合作客）
  custSource = ""; //(int32)客户来源
  customerTypeText = ""; //(int32)客户类型文案
  organizationId = ""; //(int32)组织ID
  organizationName = ""; //(string)组织名称
  referralNumber = ""; //(string)转介单号
  userId = ""; //(int32)经纪人ID
  userName = "";//(string)经纪人名称
  partnerCust = [];//关联客户

  //判断值是否存在
  getVal(val) {
    if (val != undefined) {
      return val
    } else {
      return ''
    }
  }
  //获取客户类型
  getcustomerType(num) {
    let map = new Map()
      .set(0, "普通")
      .set(1, "转介")
      .set(2, "合作客")
    if (!map.has(num)) return "--";
    return map.get(num);
  }

}

// 请求预处理
export default class GetLinkCustList {
  request;
  constructor(request = new GetLinkCustListParams()) {
    this.request = request;
  }
  send() {
    return new GetLinkCustListApi(this.request).send()
      .then(res => {
        if (res.errCode != Const.successCode) return Promise.reject(res.errMsg || '服务器开了个小差，请稍受重试');

        let list = [];//返回列表
        for (let info of res.data || []) {
          let item = new GetLinkCustListItem();

          item.custId = info.custId || '';
          item.custMobile = info.custMobile || '';
          item.custName = info.custName || '';
          item.custSource = info.custSource || "";
          item.customerType = info.recommendType || 0;
          item.customerTypeText = item.getcustomerType(info.recommendType || 0);
          item.organizationId = info.organizationId || '';
          item.organizationName = info.organizationName || '';
          item.referralNumber = info.recommendNum || '';
          item.userId = info.userId || '';
          item.userName = info.userName || '';
          item.partnerCust = info.partnerCust || [];
          list.push(item);
        }
        return list;
      })
  }

}
