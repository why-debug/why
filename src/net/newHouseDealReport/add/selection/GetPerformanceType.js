import {PostRequest} from "../../../../common/net/PostRequest";
import {APIRequest} from "../../../../common/net/API";
import {Const} from "../../../../common/utils/Const";
// 定义参数
export class GetPerformanceTypeParams extends APIRequest{
  constructor() { 
    super()
  }
}

// 定义请求
export class GetPerformanceTypeApi extends PostRequest {
  constructor() {
    super()
  }

  getUrl() {
    return '/newBuildWeb/broker/commission/getPerformanceType'
  }

  getNeedToken() {
    return true;
  }
}


// 请求预处理
export default class GetPerformanceType {
  constructor() {
  }
  send() {
    return new GetPerformanceTypeApi().send()
    .then(res => {
      if (res.errCode != Const.successCode)  return Promise.reject(res.errMsg)
      return Promise.resolve(res.data)
    })
  }

}
