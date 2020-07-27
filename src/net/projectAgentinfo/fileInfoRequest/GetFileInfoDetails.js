
// 分销经纪人 补充资料详情
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";


export class RequestParameter extends APIRequest {
  id = '';//id
  constructor() {
    super();
  }
}

// 接口地址
class RequestApi extends PostRequest {
  constructor(request = new RequestParameter()) {
    super(request);
  }

  getUrl() {
    return "/newBuildWeb/broker/build/supplementaryAttachmentDetails";
    // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
  }

  getNeedToken() {
    return true;
  }
}

// 定义接口返回值 字段
export class DetailsArray {
  title = ''; //签约合同名称
  contactNum = '';//原合同编号
  contactName = '';//原合同名称
  contactReviewer = ''; //原合同当前审批人
  contactStatu = '';//原合同当前审批状态
  reviewStatuText = '';//原和同审核状态text
  infoType = '';//资料类型
  sealType = '';//盖章类型
  sealTypeText = '';//盖章类型文本
  sealDesc = '';//法人章备注
  desc = ''; //备注

  //判断审核状态
  getReviewStatu(num) {
    let map = new Map()
      .set(1, "审核中")
      .set(2, "已审核")
      .set(3, "已通过")
      .set(4, "已拒绝")
      .set(5, "已驳回");
    if (!map.has(num)) return "--";
    return map.get(num);
  }

  //判断盖章类型
  getSealType(num) {
    let map = new Map()
      .set(1, "合同章")
      .set(2, "公章")
      .set(3, "法人章")
      .set(4, "业务专用章")
      .set(5, "财务专用章");
    if (!map.has(num)) return "--";
    return map.get(num);
  }
  //获取盖章类型text
  getSealTypeText(val) {
    if (val.indexOf(',') != -1) {
      let arr = val.split(',');
      let text = '';
      for (let item of arr) {
        text += this.getSealType(Number(item)) + ' ';
      }
      return text;
    }
    return val;
  }

  // 判断值是否存在
  getStatus(val) {
    if (val != undefined) {
      return val;
    } else {
      return '';
    }
  }

}

// 发起请求
export class GetFileInfoDetailsList {
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
        let dataList = res.data;
        // let dataList = {
        //         title : '何明的签约合同',  //何明的签约合同
        //         applicationNo : 'aaaaaa', //原合同编号
        //         dealName : '原合同名称', //原合同名称
        //         userName : '原合同当前审批人',  //原合同当前审批人
        //         auditStatus : '1', //原合同当前审批状态
        //         infoType : '3', //资料类型
        //         stampType : '2', //盖章类型
        //         corporateChapterRemarks : '范德萨但是', //法人章备注
        //         remake : '打法是的',  //备注
        //     }

        let item = new DetailsArray();

        item.contactNum = item.getStatus(dataList.applicationNo); //合同编号
        item.contactName = item.getStatus(dataList.dealName); //原合同名称
        item.contactReviewer = item.getStatus(dataList.userName); //原合同当前审核人
        item.contactStatu = item.getStatus(dataList.auditStatus); //原合同当前审核状态
        item.reviewStatuText = item.getReviewStatu(item.contactStatu);    //原和同审核状态 text
        item.infoType = item.getStatus(dataList.infoType);// 资料类型
        item.sealType = item.getStatus(dataList.stampType);// 盖章类型
        item.sealTypeText = item.getSealTypeText(item.sealType);//盖章类型文本
        item.sealDesc = item.getStatus(dataList.corporateChapterRemarks);// 法人章备注
        item.desc = item.getStatus(dataList.remake); //备注

        return item;
      })
  }
}