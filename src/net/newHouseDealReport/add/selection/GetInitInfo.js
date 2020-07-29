import {PostRequest} from "../../../../common/net/PostRequest";
import {APIRequest} from "../../../../common/net/API";
import {Const} from "../../../../common/utils/Const";
// 定义参数
export class GetAgentListParams extends APIRequest{
  select; type
  constructor() { 
    super()
  }
}

// 定义请求
export class GetAgentListApi extends PostRequest {
  constructor() {
    super()
  }

  getUrl() {
    return '/newBuildWeb/broker/newBuildProject/getInitInfo'
  }

  getNeedToken() {
    return true;
  }
}


// 请求预处理
export default class GetAgentList {
  constructor() {
  }
  send() {
    return new GetAgentListApi().send()
    .then(res => {
      if (res.errCode != Const.successCode)  return Promise.reject(res.errMsg)
      return Promise.resolve(res.data)
    })
  }

}
