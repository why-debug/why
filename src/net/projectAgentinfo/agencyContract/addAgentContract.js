import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 分销合同新增- 请求参数
class getAddAgentRequest extends APIRequest {
  dealId = '';
  pageNum = 1;
  pageSize = 20;
  constructor (obj={}) {
    super();
    this.dealId = obj.dealId || '';
   
  }
}
// demo - 接口地址
class getAddAgentApi extends PostRequest {
  constructor (request = new getAddAgentRequest()) {
    super(request);
  }

  getUrl () {
    return "/newBuildWeb/broker/mlNewBuild/addModifyContrack ";
  }
}
class getAddAgent {
  request;
  constructor (request = new getAddAgentRequest()) {
    this.request = request;
  }

  send () {
    return new getAddAgentApi(this.request).send().then(res => {
      if (res.errCode !== 200) return Promise.reject(res);

      let data = res.data || {};
      // let response = new getAddDistributionResponse();
      // response.list = data.list || [];
      // response.statisticVoList = data.statisticVoList || [];
      // response.total = data.total || 0;
      return data;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
  getAddAgent
}
