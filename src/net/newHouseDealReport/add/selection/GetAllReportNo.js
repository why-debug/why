import {PostRequest} from "../../../../common/net/PostRequest";
import {APIRequest} from "../../../../common/net/API";
import {Const} from "../../../../common/utils/Const";
// 定义参数
export class GetAllReportNoParams extends APIRequest{
  select; type
  constructor() { 
    super()
    this.agentId= 1; 
    this.buildName= 'aas'; 
  }
}

// 定义请求
export class GetAllReportNoApi extends PostRequest {
  constructor(request= new GetAllReportNoParams()) {
    super(request)
  }

  getUrl() {
    return '/newBuildWeb/broker/commission/getAllReportNo'
  }

  getNeedToken() {
    return true;
  }
}


// 请求预处理
export default class GetAllReportNo {
  request
  constructor(request= new GetAllReportNoParams()) {
    this.request= request
  }
  send() {
    return new GetAllReportNoApi(this.request).send()
    .then(res => {
      if (res.errCode != Const.successCode)  return Promise.reject(res.errMsg)
      return Promise.resolve(res.data)
    })
  }

}
