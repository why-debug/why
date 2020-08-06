import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 	项目推广范围列表- 请求参数
class getPromotionScopeRequest extends APIRequest {
  name = ""; // 名称
  nameType = ""; // 名称类型 1推广 2注册 3开发商 4代理商
  constructor(obj = {}) {
    super();
    this.name = obj.name || '';
    this.nameType = obj.nameType || '';
  }
}
// demo - 接口地址
class getPromotionScopeApi extends PostRequest {
  constructor(request = new getPromotionScopeRequest()) {
    super(request);
  }
  getUrl() {
    return "/newBuildWeb/broker/build/projectPromotionScopeList ";
  }
}
// 法务跟进人，美联负责人，推广名 返回值
class getPromotionScopeResponse extends APIResponse {
  list = []
  constructor() {
    super();
  }
}
// demo
class getPromotionScope {
  request;
  constructor(request = new getPromotionScopeRequest()) {
    this.request = request;
  }
  send() {
    return new getPromotionScopeApi(this.request).send().then(res => {
      if (res.errCode !== 200) return Promise.reject(res);
      let data = res.data || {};
      let list = []
      data.forEach(item => {
        let obj = {};
        obj.check = false;
        obj.agentId = item.agentId || "";
        obj.agentName = item.agentName || "";
        obj.archiveNumber = item.archiveNumber || "";
        obj.buildAddr = item.buildAddr || "";
        obj.buildId = item.buildId || "";
        obj.buildName = item.buildName || "";
        obj.cityId = item.cityId || "";
        obj.cityName = item.cityName || "";
        if (item.contractAgencyPeriodBegin) {
          obj.contractAgencyPeriodBegin = item.contractAgencyPeriodBegin.substring(0, 10);
        }
        else {
          obj.contractAgencyPeriodBegin = "";
        }
        if (item.contractAgencyPeriodEnd) {
          obj.contractAgencyPeriodEnd = item.contractAgencyPeriodEnd.substring(0, 10);
        }
        else {
          obj.contractAgencyPeriodEnd = "";
        }
        obj.developerName = item.developerName || "";
        obj.mlLoginName = item.mlLoginName || "";
        obj.orgId = item.orgId || "";
        obj.orgName = item.orgName || "";
        obj.settlementMethod = item.settlementMethod || "";
        obj.userId = item.userId || "";
        obj.userMobile = item.userMobile || "";
        obj.userName = item.userName || "";
        list.push(obj)
      });
      let response = new getPromotionScopeResponse();
      response.list = list || [];
      return response;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
  getPromotionScope
}
