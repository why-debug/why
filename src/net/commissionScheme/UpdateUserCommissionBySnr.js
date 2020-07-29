
// 从SNR同步（单条记录）

import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";
import {ErpCommon} from "../../utils/ErpCommon";

// 佣金方案-列表
export class UpdateUserCommissionBySnrRequest extends APIRequest {
    commissionType = 1; // 佣金方案类型 1=个人 2=KPI 0=全部
    userId = ''; // 用户ID"
    constructor (obj = {}) {
      super();
    }
}

class UpdateUserCommissionBySnrApi extends PostRequest {
    constructor (request = new UpdateUserCommissionBySnrRequest()) {
        super(request);
    }

    getUrl () {
        return "/newBuildWeb/broker/userCommission/updateUserCommissionBySnr";
    }

    getNeedToken() {
        return true;
    }
}
export class UpdateUserCommissionBySnrResponse extends APIResponse {
    totalPage = 0;
    constructor () {
        super();
    }
}

export class UpdateUserCommissionBySnr {
    request;
    constructor (request = new UpdateUserCommissionBySnrRequest()) {
        this.request = request;
    }

    send () {
        return new UpdateUserCommissionBySnrApi(this.request).send()
            .then(res => {
            // if (res.errCode !== Const.successCode) return Promise.reject(res);

            return res;
        })
        .catch((res)=>{
            new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
        })
    }
}

