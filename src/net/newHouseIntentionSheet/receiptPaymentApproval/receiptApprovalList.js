// 新房意向单-收款审批列表
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
class ReceiptApprovalListItem {
  status_s = ''; //审批状态
  now_approval_person = ''; //当前审核人
  project_name = ''; //项目名称
  wuye = ''; //物业名称
  deal_report_no = ''; //成交报告编号
  cust_custom = ''; //客户/代理商
  type = ''; //类型
  total_money = ''; //总金额(元)
  receipt_money = ''; //收款金额(元)
  cash_award = ''; //现金奖(元)
  settlement_details = ''; //结算明细
  receipt_date = ''; //收付日期
  bill_no = ''; //票据号
  remark = ''; //备注
  applicant = ''; //申请人
  application_dept = ''; //申请部门
  deal_dept = ''; //成交部门
  deal_date = ''; //成交日期
}

export class GetReceiptApprovalList {
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
          let item = new ReceiptApprovalListItem();
          item.status_s = info.status_s || '--';
          item.now_approval_person = info.now_approval_person || '--';
          item.project_name = info.project_name || '--';
          item.wuye = info.wuye || '--';
          item.deal_report_no = info.deal_report_no || '--';
          item.cust_custom = info.cust_custom || '--';
          item.type = info.type || '--';
          item.total_money = info.total_money || '--';
          item.receipt_money = info.receipt_money || '--';
          item.cash_award = info.cash_award || '--';
          item.settlement_details = info.settlement_details || '--';
          item.receipt_date = info.receipt_date || '--';
          item.bill_no = info.bill_no || '--';
          item.remark = info.remark || '--';
          item.applicant = info.applicant || '--';
          item.application_dept = info.application_dept || '--';
          item.deal_dept = info.deal_dept || '--';
          item.deal_date = info.deal_date || '--';
         


          receiptApprovalList.list.push(item);
        }
        receiptApprovalList.total = res.total || 0;
        return receiptApprovalList;
      })
  }
}
