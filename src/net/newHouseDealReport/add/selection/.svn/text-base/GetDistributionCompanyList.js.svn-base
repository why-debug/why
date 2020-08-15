import {PostRequest} from "../../../../common/net/PostRequest";
import {APIRequest} from "../../../../common/net/API";
import {Const} from "../../../../common/utils/Const";
// 定义参数
export class GetCompanyListRequest extends APIRequest{
  compName="" //公司名称
  constructor(obj = {}) { 
    super()
    this.compName = obj.compName || '';
  }
}

// 定义请求
export class GetDistributionCompanyListApi extends PostRequest {
  constructor(request = new GetCompanyListRequest()) {
    super(request)
  }

  getUrl() {
    return '/newBuildWeb/broker/commission/getDistributionCompanyList'
  }

  getNeedToken() {
    return true;
  }
}


// 请求预处理
export  class GetDistributionCompanyList {
  request;
  constructor(request = new GetCompanyListRequest()) {
    this.request = request;
  }
  send() {
    return new GetDistributionCompanyListApi(this.request).send()
    .then(res => {
      if (res.errCode != Const.successCode)  return Promise.reject(res.errMsg)
      return Promise.resolve(res.data)
    })
  }

}
