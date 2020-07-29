import {PostRequest} from "../../../../common/net/PostRequest";
import {APIRequest} from "../../../../common/net/API";
import {Const} from "../../../../common/utils/Const";
// 定义参数
export class GetAllotOrgListParams extends APIRequest{
  select; type
  constructor() { 
    super()
  }
}

// 定义请求
export class GetAllotOrgListApi extends PostRequest {
  constructor() {
    super()
  }

  getUrl() {
    return '/newBuildWeb/broker/commission/getAllotOrgList'
  }

  getNeedToken() {
    return true;
  }
}


// 请求预处理
export default class GetAllotOrgList {
  constructor() {
  }
  send() {
    return new GetAllotOrgListApi().send()
    .then(res => {
      if (res.errCode != Const.successCode)  return Promise.reject(res.errMsg)
      return Promise.resolve(res.data)
    })
  }

}
