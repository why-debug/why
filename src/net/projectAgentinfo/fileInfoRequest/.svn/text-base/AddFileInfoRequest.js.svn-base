
// 分销公司   新增公司 
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";
import { ErpCommon } from "../../../utils/ErpCommon";



//请求参数 页面
export class AddFileInfoRequestParameter extends APIRequest {
  dealId = ""; //合同id
  oldContractNum = '';//原合同编号
  oldContractName = ''; //原合同名称
  oldContractLegal = '';//原合同当前审批人
  oldContractStatu = '';//原合同当前状态
  oldContractStatuText = '';//状态文字表述
  dataSheetList = ""; //合同资料
  id = ""; // 主键id
  fileType = [];//资料类型
  otherDesc = "";//其他 描述
  sealType = "";//印章类型
  sealTypeArr = [];//印章类型
  sealDesc = "";//法人章 备注
  desc = ''; //备注
  constructor() {
    super();
  }
}

//请求参数  接口
export class PortRequestParameter extends APIRequest {

  constructor(obj = new AddFileInfoRequestParameter()) {
    super();
    this.applicationNo = this.getStatus(obj.oldContractNum);//原合同编号
    this.dealName = this.getStatus(obj.oldContractName);//原合同名称
    this.userName = this.getStatus(obj.oldContractLegal);//原合同当前审批人
    this.auditStatus = this.getStatus(obj.oldContractStatu);//原合同当前状态
    this.dealId = this.getStatus(obj.dealId); //合同id
    this.id = this.getStatus(obj.id); //主键id
    this.dataSheetList = this.getMaterialArr(obj.fileType || [],obj.otherDesc || '');//资料类型
    this.stampType = this.getSealString(obj.sealTypeArr);//印章类型
    this.corporateChapterRemarks = this.getStatus(obj.sealDesc);//法人章 备注
    this.remake = this.getStatus(obj.desc);//备注
  }

  // 判断值是否存在
  getStatus(val) {
    if (val != undefined) {
      return val;
    } else {
      return '';
    }
  }
  //判断盖章类型
  getSealType(val) {
    let map = new Map()
      .set( "合同章",1,)
      .set( "公章",2,)
      .set( "法人章",3,)
      .set( "业务专用章",4,)
      .set( "财务专用章",5,);
    if (!map.has(val)) return "";
    return map.get(val);
  }
  getSealString(arr){
    if(arr.length <=0) return arr.join();
    let str = [];
    for(let item of arr){
      str.push(this.getSealType(item));
    }
    return str.join();
  }
  //判断资料类型["营业执照","授权委托书","法人代表身份证","法人代表证明","其他"]
  getMaterialType(val) {
    let map = new Map()
      .set("其他", 0)
      .set("营业执照", 1)
      .set("法人代表证明", 2)
      .set("法人代表身份证", 3)
      .set("授权委托书", 4);
    if (!map.has(val)) return "";
    return map.get(val);
  }
  //将资料类型转为标准格式
  getMaterialArr(val,otherDesc) {
    if (val.length <= 0) return val;
    let arr = [];
    for (let item of val) {
      let obj = { dataName: "", dataStatus: "", dataType: "", type: 4 };
      obj.dataType = this.getMaterialType(item);
      if(obj.dataType == 0) obj.dataName = otherDesc;
      arr.push(obj);
    }
    return arr;
  }
}
// 接口地址
class FileInfoRequestApi extends PostRequest {
  constructor(request = new PortRequestParameter()) {
    super(request);
  }

  getUrl() {
    return "/newBuildWeb/broker/build/saveSupplementaryAttachments";
    // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
  }

  getNeedToken() {
    return true;
  }
}
// 发起请求 
export class AddFileInfoDetails {
  constructor(request = new PortRequestParameter()) {
    this.request = request;
  }

  send() {
    return new FileInfoRequestApi(this.request).send()
      .then((res) => {
        if (res.errCode !== Const.successCode) {
          return Promise.reject(res);
        }
        //   if(!res || !res.data) return [];


        return res;
      })
      .catch((res) => {
        console.log(res, '--catch--');
        new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
      });
  }
}