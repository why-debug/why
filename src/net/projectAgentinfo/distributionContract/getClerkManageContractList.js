import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { ErpCommon } from "../../../utils/ErpCommon";

/* ---------------------------------------------------------------------------------------------------- */

// 分销合同外借附件列表- 请求参数
class getClerkManageContractListRequest extends APIRequest {
  dealId = '';//合同id
  constructor(obj = {}) {
    super();
    this.dealId = obj.dealId || ''; 

  }
}
// demo - 接口地址
class getClerkManageContractListApi extends PostRequest {
  constructor(request = new getClerkManageContractListRequest()) {
    super(request);
  }
  getUrl() {
    return "/newBuildWeb/broker/mlNewBuildCommission/getClerkManageContractList";
  }
}

class getClerkManageContractListResponse extends APIResponse {
  list = []
  constructor() {
    super();
  }
}
// demo
class getClerkManageContractList {
  request;
  constructor(request = new getClerkManageContractListRequest()) {
    this.request = request;
  }
  send() {
    return new getClerkManageContractListApi(this.request).send().then(res => {
      if (res.errCode !== 200) return Promise.reject(res);
      let data = res.data.contractList || [];

      //判断审批状态
      let getApprovaltVal = function (val) {
        if (val != undefined) {
          switch(val){
            case -2: return 4;
            case -1: return 2;
            case  0: return 0;
            case 1: return 1;
            case 2: return 3;
          }
        } else {
          return 0
        }
      };
      let list = []
      data.forEach(item => {
        let obj = {};
        obj.check = false;
        obj.agencyTermEnd = item.agencyTermEnd || "";//合同代理结束
        obj.agencyTermStart = item.agencyTermStart || "";//合同代理开始
        obj.agentName = item.agentName || "";//代理商
        obj.applicationNo = item.applicationNo || "";//申请编号
        obj.approvalStatus = getApprovaltVal(item.approvalStatus);//审批状态
        obj.archiveNumber = item.archiveNumber || "";//归档编号
        obj.dealId = item.dealId || "";//合同id
        obj.enclosureId = item.enclosureId || "";//附件id
        obj.enclosureName = item.enclosureName || "";//附件名称
        list.push(obj)
      });
      let response = new getClerkManageContractListResponse();
      response.list = list || [];
      return response;
    })
    .catch((res) => {
      console.log(res, '--catch--');
      new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
  })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
  getClerkManageContractList
}
