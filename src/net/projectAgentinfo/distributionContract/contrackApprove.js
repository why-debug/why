import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/*代理合同批借 ---------------------------------------------------------------------------------------------------- */
// 分销合同批借- 请求参数 
class getcontrackApproveRequest extends APIRequest {
  dealId = ""; // 合同id
  constructor (obj={}) {
    super();
    this.dealId = obj.dealId ||'';
   
  }
}
// demo - 接口地址
class getcontrackApproveApi extends PostRequest {
  constructor (request = new getcontrackApproveRequest()) {
    super(request);
  }
  getUrl () {
    return "/newBuildWeb/broker/mlNewBuild/contrackApprove";
  }
}

// demo
class getcontrackApprove {
  request;
  constructor (request = new getcontrackApproveRequest()) {
    this.request = request;
  }
  send () {
    return new getcontrackApproveApi(this.request).send().then(res => {
      if (res.errCode !== 200) return Promise.reject(res);
      let data = res.data || {};
      return data;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
    getcontrackApprove
}
