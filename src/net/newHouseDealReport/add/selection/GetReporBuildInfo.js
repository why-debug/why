import {PostRequest} from "../../../../common/net/PostRequest";
import {APIRequest} from "../../../../common/net/API";
import {Const} from "../../../../common/utils/Const";
// 定义参数
export class GetReporBuildInfoParams extends APIRequest{
  agentId; buildId
  constructor(agentId= 1, buildId=1) { 
    super()
    this.agentId= agentId
    this.buildId= buildId
  }
}

// 定义请求
export class GetReporBuildInfoApi extends PostRequest {
  constructor() {
    super()
  }

  getUrl() {
    return '/newBuildWeb/broker/commission/getReporBuildInfo'
  }

  getNeedToken() {
    return true;
  }
}


// 请求预处理
export default class GetReporBuildInfo {
  constructor() {
  }
  send() {
    return new GetReporBuildInfoApi().send()
    .then(res => {
      if (res.errCode != Const.successCode)  return Promise.reject(res.errMsg)
      return Promise.resolve(res.data)
    })
  }

}
