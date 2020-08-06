// 新房意向单列表
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
  status_s = ''; //状态
  project_number = ''; //编号
  project_name = ''; //项目名称
  wuye = ''; //物业名称
  sale_type = ''; //销售类型
  temporary_time = ''; //临定日期
  earnest_moneny = ''; //诚意金(元)
  customer = ''; //客户
  deal_department_no = ''; //成交部门编号
  deal_branch = ''; //成交分行
  deal_person = ''; //成交人员
  remark = ''; //备注

}

export class GetIntentionSheetList {
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
          item.project_number = info.project_number || '--';
          item.project_name = info.project_name || '--';
          item.wuye = info.wuye || '--';
          item.sale_type = info.sale_type || '--';
          item.temporary_time = info.temporary_time || '--';
          item.earnest_moneny = info.earnest_moneny || '--';
          item.customer = info.customer || '--';
          item.deal_department_no = info.deal_department_no || '--';
          item.deal_branch = info.deal_branch || '--';
          item.deal_person = info.deal_person || '--';
          item.remark = info.remark || '--';


          receiptPayList.list.push(item);
        }
        receiptPayList.total = res.total || 0;
        return receiptPayList;
      })
  }
}
