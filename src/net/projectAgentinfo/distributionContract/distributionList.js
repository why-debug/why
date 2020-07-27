import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// demo - 请求参数
class getDistributionListRequest extends APIRequest {
  status = ""; //状态
  reverseTime = ""; //时间类型
  definiteTime = ""; //具体时间
  timePeriod = "";  //时间段
  build = ""; //楼盘
  pageNum = ""
  constructor(status = '', reverseTime = '', definiteTime = '', timePeriod = 1, build = 1, pageNum) {
    super();
    this.status = status;
    this.reverseTime = reverseTime;
    this.definiteTime = definiteTime;
    this.timePeriod = timePeriod;
    this.build = build;
    this.pageNum = pageNum;
    console.log(status)
  }
}
// demo - 接口地址
class getDistributionListApi extends PostRequest {
  constructor(request = new getDistributionListRequest()) {
    super(request);
  }

  getUrl() {
    return "/newBuildWeb/broker/build/queryDistributionContractsList";
    // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
  }
}
// demo - 返回值
class getDistributionListResponse extends APIResponse {
  list = []; // 楼盘列表
  constructor() {
    super();
  }
}
// demo
class getDistributionList {
  request;
  constructor(request = new getDistributionListRequest()) { 
    this.request = request;
  }

  send() {
    return new getDistributionListApi(this.request).send().then(res => {


      if (res.errCode !== 200) return Promise.reject(res);
      let data = res.data.dataList || [];
      let list = []

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
      //判断合同状态是否存在
      let getContractVal = function (val) {
        if (val != undefined && val !== 0 && val !== -2) {
          return val
        } else if (val == -2) {
          return 0
        } else {
          return 5
        }
      };
      data.forEach(item => {
        let obj = {}
        obj.check = false;
        obj.agencyTermEnd = item.agencyTermEnd || "";//分销结束时间
        obj.agencyTermStart = item.agencyTermStart || "";//分销开始时间
        obj.applicationNumber = item.applicationNo || "";//申请编号
        obj.applicant = item.applyUserName || "";//申请人
        obj.archiveNumber = item.archiveNumber || "";//归档编号
        obj.dealId = item.dealId || "";//合同id
        obj.contractName = item.dealName || "";//合同名称
        obj.Agent = item.distributionCompanyName || "";//分销公司
        obj.projectName = item.distributionRange || "";//分销范围
        obj.applicationOrganization = item.orgName || "";//申请组织

        //暂时没有
        obj.approvalTime = item.approvalTime || "";//审批时间
        obj.approvalPerson = item.approvalPerson || "";//当前审批人
        // obj.approvalStatus = item.approvalStatus || 3;//审批状态
        obj.approvalStatus = getApprovaltVal(item.approvalStatus);//审批状态
        obj.contractStatus = getContractVal(item.contractStatus);//合同状态
        obj.customerProtectionPeriod = item.customerProtectionPeriod || "";//客户保护期
        obj.commission = item.commission || "";//佣金结算方式
        obj.legalAffairs = item.legalAffairs || "";//法务跟进人
        obj.risk = item.risk || "";//是否有风险
        obj.stamp = item.stamp || "";//是否盖章
        obj.void = item.void || "";//是否作废
        obj.archive = item.archive || "";//是否归档
        obj.material = item.material || "";//资料是否缺失
        obj.entryDate = item.entryDate || "";//录入日期

        list.push(obj)
      });
      let response = {};

      response.list = list || [];
      response.total = res.total || 0;
      return response;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
  getDistributionList
}
