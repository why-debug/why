import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/*作废 ---------------------------------------------------------------------------------------------------- */

// 分销合同归还- 请求参数
class getGiveBackContractRequest extends APIRequest {
  dealId = '';//合同id
  constructor(obj = {}) {
    super();
    this.dealId = obj.dealId || '';
  }
}
// demo - 接口地址
class getGiveBackContractApi extends PostRequest {
  constructor (request = new getGiveBackContractRequest()) {
    super(request);
  }
  getUrl () {
    return "/newBuildWeb/broker/mlNewBuildCommission/giveBackContract";
  }
}

// demo
class getGiveBackContract{
  request;
  constructor (request = new getGiveBackContractRequest()) {
    this.request = request;
  }
  send () {
    return new getGiveBackContractApi(this.request).send().then(res => {
      if (res.errCode !== 200) return Promise.reject(res);
      let data = res.data || {};
      return data;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
    getGiveBackContract
}
