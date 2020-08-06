import {PostRequest} from "../../../../common/net/PostRequest";
import {APIRequest} from "../../../../common/net/API";
import {Const} from "../../../../common/utils/Const";
// 定义参数
export class GetRangeUserListParams extends APIRequest{
  organizationId= '';//组织Id 
   select= 1; //是否查询相关员工管理员 0：否 1：是
   userName= ''//员工姓名
}

// 定义请求
export class GetRangeUserListApi extends PostRequest {
  constructor(request= new GetRangeUserListParams()) {
    super(request)
  }

  getUrl() {
    return '/newBuildWeb/broker/commission/GetRangeUserList'
  }

  getNeedToken() {
    return true;
  }
}


// 请求预处理
export default class GetRangeUserList {
  params; 
  constructor(params) {
    this.params= params
  }
  send() {
    return new GetRangeUserListApi(this.params).send()
    .then(res => {
      if (res.errCode != Const.successCode)  return Promise.reject(res.errMsg)
      return Promise.resolve(res.data)
    })
  }

}
