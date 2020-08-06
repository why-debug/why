// 新房新房佣金收款列表
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
 class CommissionCollectionItem {
  status_s = ''; //审批状态
  now_approval_person = ''; //当前审批人
  application_date = ''; //申请日期
  receipt_date = ''; //收款日期
  receipt_Commission = ''; //收佣金额(元)
  after_tax = ''; //税后金额(元)
  cash_award = ''; //现金奖(元)
  project_name = ''; //项目名称
  wuye_name = ''; //物业名称
  make_order_person = ''; //制单人

}

export class GetCommissionCollectionList {
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
        let commissionCollectionList = {
          list: [],
          total:0
        };
        for (let info of list) {
          let item = new CommissionCollectionItem();
          item.status_s = info.status_s || '--';
          item.now_approval_person = info.now_approval_person || '--';
          item.application_date = info.application_date || '--';
          item.receipt_date = info.receipt_date || '--';
          item.receipt_Commission = info.receipt_Commission || '--';
          item.after_tax = info.after_tax || '--';
          item.cash_award = info.cash_award || '--';
          item.project_name = info.project_name || '--';
          item.wuye_name = info.wuye_name || '--';
          item.make_order_person = info.make_order_person || '--';
          commissionCollectionList.list.push(item);
        }
        commissionCollectionList.total = res.total || 0;
        return commissionCollectionList;
      })
  }
}
