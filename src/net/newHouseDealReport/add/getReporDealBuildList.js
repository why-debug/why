import {PostRequest} from "../../../common/net/PostRequest";
import {APIRequest} from "../../../common/net/API";
import {Const} from "../../../common/utils/Const";
// 定义参数
export class GetReporDealBuildListParams extends APIRequest{
  select; type
  constructor() { 
    super()
    this.agentId= 1; 
    this.buildName= 'aas'; 
  }
}

// 定义请求
export class GetReporDealBuildListApi extends PostRequest {
  constructor(request= new GetReporDealBuildListParams()) {
    super(request)
  }

  getUrl() {
    return '/newBuildWeb/broker/commission/getReporDealBuildList'
  }

  getNeedToken() {
    return true;
  }
}


// 请求预处理
export default class GetReporDealBuildList {
  request
  constructor(request= new GetReporDealBuildListParams()) {
    this.request= request
  }
  send() {
    return new GetReporDealBuildListApi(this.request).send()
    .then(res => {
      if (res.errCode != Const.successCode)  return Promise.reject(res.errMsg)
      return Promise.resolve(res.data)
    })
  }

}
