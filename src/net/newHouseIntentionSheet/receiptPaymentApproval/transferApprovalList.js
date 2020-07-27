// 新房意向单-转款审批列表
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";


export class RequestParameter extends APIRequest {
  projectId = ''; //项目id
  constructor(obj = {}) {
    super();
    this.projectId = obj.projectId
  }
}

// 接口地址
class RequestApi extends PostRequest {
  constructor(request = new RequestParameter()) {
    super(request);
  }

  getUrl() {
    return "/newBuildWeb/broker/org/getDistributionCompanyList";
  }

  getNeedToken() {
    return true;
  }
}

// 定义接口返回值 字段
class TransferApprovalListItem {
  status_s = ''; //审批状态
  now_approval_person = ''; //当前审核人
  transfer_date = ''; //转款日期
  transfer_money = ''; //转款金额
  deal_report_no = ''; //成交报告编号
  project_name = ''; //项目名称
  wuye = ''; //物业名称
  custom = ''; //客户名称
  type = ''; //类型
  settlement_details = ''; //结算明细
  remark = ''; //备注
  applicant = ''; //申请人
  application_class = ''; //申请组别
  deal_class = ''; //成交组别
  deal_date = ''; //成交日期
}

export class GetTransferApprovalList {
  request;
  constructor(request = new RequestParameter()) {
    this.request = request;
  }

  send() {

    return new RequestApi(this.request).send()
      .then((res) => {
        if (res.errCode !== Const.successCode) {
          return Promise.reject(res);
        }

        if (!res || !res.data) return [];

        let list = res.data || [];
        let receiptApprovalList = {
          list: [],
          total: 0
        };
        for (let info of list) {
          let item = new TransferApprovalListItem();
          item.status_s = info.status_s || '--';
          item.now_approval_person = info.now_approval_person || '--';
          item.transfer_date = info.transfer_date || '--';
          item.transfer_money = info.transfer_money || '--';
          item.deal_report_no = info.deal_report_no || '--';
          item.project_name = info.project_name || '--';
          item.wuye = info.wuye || '--';
          item.custom = info.custom || '--';
          item.type = info.type || '--';
          item.settlement_details = info.settlement_details || '--';
          item.remark = info.remark || '--';
          item.applicant = info.applicant || '--';
          item.application_class = info.application_class || '--';
          item.deal_class = info.deal_class || '--';
          item.deal_date = info.deal_date || '--';
         
          receiptApprovalList.list.push(item);
        }
        receiptApprovalList.total = res.total || 0;
        return receiptApprovalList;
      })
  }
}
