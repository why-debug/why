import {PostRequest} from "../../../../common/net/PostRequest";
import {APIRequest} from "../../../../common/net/API";
import {Const} from "../../../../common/utils/Const";
// 定义参数
export class GetAllUseAndClassAndLevelParams extends APIRequest{
  select
  constructor() { 
    super()
    this.select= 1; 
  }
}

// 定义请求
export class GetAllUseAndClassAndLevelApi extends PostRequest {
  constructor(request= new GetAllUseAndClassAndLevelParams()) {
    super(request)
  }

  getUrl() {
    return '/newBuildWeb/broker/commission/getAllUseAndClassAndLevel'
  }

  getNeedToken() {
    return true;
  }
}


// 请求预处理
export default class GetAllUseAndClassAndLevel {
  request
  constructor(request= new GetAllUseAndClassAndLevelParams()) {
    this.request= request
  }
  send() {
    return new GetAllUseAndClassAndLevelApi(this.request).send()
    .then(res => {
      if (res.errCode != Const.successCode)  return Promise.reject(res.errMsg)
      return Promise.resolve(res.data)
    })
  }

}
