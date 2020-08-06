
// 佣金方案-详情

import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";
import {ErpCommon} from "../../utils/ErpCommon";

// 佣金方案-详情
export class GetUserCommissionSnrListRequest extends APIRequest {
    userId = ''; // 用户ID
    constructor (obj = {}) {
      super();
      this.userId = obj.userId
    }
}

class GetUserCommissionSnrListApi extends PostRequest {
    constructor (request = new GetUserCommissionSnrListRequest()) {
        super(request);
    }

    getUrl () {
        return "/newBuildWeb/broker/userCommission/getUserCommissionSnrList";
    }

    getNeedToken() {
        return true;
    }
}
export class GetUserCommissionSnrListResponse extends APIResponse {
    list = []; // 
    constructor () {
        super();
    }
}

export class GetUserCommissionSnrList {
    request;
    constructor (request = new GetUserCommissionSnrListRequest()) {
      this.request = request;
    }

    send () {
        return new GetUserCommissionSnrListApi(this.request).send()
            .then(res => {
            if (res.errCode !== Const.successCode) return Promise.reject(res);
              console.log("res:", res);
            let data = res.data || [];
            data.forEach(item => {
              //处理时间格式
              if (!!item.effectDate) {
                item.effectDate = item.effectDate.substr(0,10)
              }
              if (!!item.expireDate) {
                item.expireDate = item.expireDate.substr(0, 10)
              }
              
            });

            let response = new GetUserCommissionSnrListResponse();
            response.list = data;
            //处理详情数据
            return response;
        })
        .catch((res)=>{
            console.log(res,'--catch--');
            new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
        })
    }
}

