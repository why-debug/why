import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 分销合同外借附件列表- 请求参数
class getLendoutContractListRequest extends APIRequest {
  buildName = ""; // 楼盘名称
  createTime = ""; // 创建时间
  status = ""; // 1分销中 2待分销 3合作到期
  systemFlag = 1; // 来源 0erp 1系统(分销楼盘) 2搜搜抓取 3旅居地产 4新盘代理 5pad端登记
  pageNum = 1;
  pageSize = 20;
  constructor (buildName = '', createTime = '', status = '', systemFlag = 1, pageNum = 1, pageSize) {
    super();
    this.buildName = buildName;
    this.createTime = createTime;
    this.status = status;
    this.systemFlag = systemFlag;
    this.pageNum = pageNum;
    this.pageSize = pageSize;
  }
}
// demo - 接口地址
class getLendoutContractListApi extends PostRequest {
  constructor (request = new getLendoutContractListRequest()) {
    super(request);
  }
  getUrl () {
    return "/newBuildWeb/broker/mlNewBuildCommission/getLendoutContractList";
  }
}
// 法务跟进人，美联负责人，推广名 返回值
class getLendoutContractListResponse extends APIResponse {
  list=[]
  constructor () {
    super();
  }
}
// demo
class getLendoutContractList {
  request;
  constructor (request = new getLendoutContractListRequest()) {
    this.request = request;
  }
  send () {
    return new getLendoutContractListApi(this.request).send().then(res => {
      if (res.errCode !== 200) return Promise.reject(res);
      let data = res.data.contractList || {};
      let list=[]
      data.forEach(item => {
        let obj = {};
        obj.check = false;
        obj.agencyTermEnd = item.agencyTermEnd||"";//合同代理结束
        obj.agencyTermStart = item.agencyTermStart||"";//合同代理开始
        obj.agentName = item.agentName||"";//代理商
        obj.applicationNo = item.applicationNo||"";//申请编号
        obj.approvalStatus = item.approvalStatus||"";//审批状态
        obj.archiveNumber = item.archiveNumber||"";//归档编号
        obj.dealId = item.dealId||"";//合同id
        obj.enclosureId = item.enclosureId||"";//附件id
        obj.enclosureName = item.enclosureName||"";//附件名称
        list.push(obj)
      });
      let response = new getLendoutContractListResponse();
      response.list = list|| [];
      return response;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
    getLendoutContractList
}
