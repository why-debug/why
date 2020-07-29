import {PostRequest} from "../../../../common/net/PostRequest";
import {APIRequest} from "../../../../common/net/API";
import {Const} from "../../../../common/utils/Const";
// 定义参数
export class GetAgentListParams extends APIRequest{
  constructor() { 
    super()
  }
}

// 定义请求
export class GetAgentListApi extends PostRequest {
  constructor(request ={}) {
    super(request)
  }

  getUrl() {
    return '/newBuildWeb/broker/commission/getAgentList'
  }

  getNeedToken() {
    return true;
  }
}


// 请求预处理
export default class GetAgentList {
  agentName='';//代理商名称
  constructor(obj = {}) {
    this.agentName = obj.agentName || '';
  }
  send() {
    return new GetAgentListApi(this.agentName).send()
    .then(res => {
      if (res.errCode != Const.successCode)  return Promise.reject(res.errMsg);

      let data = res.data || [];
      return data;
    })
  }

}
