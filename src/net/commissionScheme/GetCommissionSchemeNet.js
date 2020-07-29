
// 佣金方案列表

import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";
import {ErpCommon} from "../../utils/ErpCommon";

// 佣金方案-列表
export class GetCommissionSchemeListRequest extends APIRequest {
    isContainDownOrg = 0; // 包含下级 1=是  0=否
    organizationId = ''; // 组织id，全公司的时候为null，不传0", 
    userWriteoff = 1; // 岗位状态 1=在职  2=离职
    userId = ''; // 用户ID
    userNo = ''; // 工号
    pageNum = 1;
    pageSize = 30;

    constructor (obj = {}) {
      super();
    }
}

class GetCommissionSchemeListApi extends PostRequest {
    constructor (request = new GetCommissionSchemeListRequest()) {
        super(request);
    }

    getUrl () {
        return "/newBuildWeb/broker/userCommission/getUserCommissionPlanList";
    }

    getNeedToken() {
        return true;
    }
}
export class GetCommissionSchemeListResponse extends APIResponse {
    list = []; // 
    total = 0;
    totalPage = 0;
    constructor () {
        super();
    }
}

export class GetCommissionSchemeList {
    request;
    constructor (request = new GetCommissionSchemeListRequest()) {
        this.request = request;
    }

    send () {
        return new GetCommissionSchemeListApi(this.request).send()
            .then(res => {
            if (res.errCode !== Const.successCode) return Promise.reject(res);
              console.log("res:", res);
            let data = res.data || {};
            let response = new GetCommissionSchemeListResponse();

            response.list = data.dataList || [];
            //处理列表数据
            response.list.forEach(item => {
              if (item.writeoffTime){
                item.writeoffTime = item.writeoffTime.substr(0, 10)
              }
            });
            response.total = res.total || 0;
            response.totalPage = res.totalPage || 0;

            return response;
        })
        .catch((res)=>{
            console.log(res,'--catch--');
            new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
        })
    }
}

