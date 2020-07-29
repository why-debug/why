// 新房新房收付列表
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
class ReceiptPaymentItem {
  status_s = ''; //审批状态
  now_approval_person = ''; //当前审批人
  deal_No = ''; //成交报告编号
  wuye = ''; //物业名称
  custom = ''; //客户
  constract_No = ''; //合同编号
  project_type = ''; //类型
  money = ''; //金额
  receipt_date = ''; //收付日期
  settlement_details = ''; //结算明细
  applicant = ''; //申请人
  application_class = ''; //申请组别
  application_date = ''; //申请日期
  deal_class = ''; //成交组别
  deal_date = ''; //成交日期
  receipt_remak = ''; //备注

}

export class GetRreceiptPaymentList {
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
        let receiptPayList = {
          list: [],
          total: 0
        };
        for (let info of list) {
          let item = new ReceiptPaymentItem();
          item.status_s = info.status_s || '--';
          item.now_approval_person = info.now_approval_person || '--';
          item.deal_No = info.deal_No || '--';
          item.wuye = info.wuye || '--';
          item.custom = info.custom || '--';
          item.constract_No = info.constract_No || '--';
          item.project_type = info.project_type || '--';
          item.money = info.money || '--';
          item.receipt_date = info.receipt_date || '--';
          item.settlement_details = info.settlement_details || '--';
          item.applicant = info.applicant || '--';
          item.application_class = info.application_class || '--';
          item.application_date = info.application_date || '--';
          item.deal_class = info.deal_class || '--';
          item.deal_date = info.deal_date || '--';
          item.receipt_remak = info.receipt_remak || '--';

          receiptPayList.list.push(item);
        }
        receiptPayList.total = res.total || 0;
        return receiptPayList;
      })
  }
}
