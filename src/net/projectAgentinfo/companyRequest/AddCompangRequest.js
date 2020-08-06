
// 分销公司   新增公司 
import {PostRequest} from "../../../common/net/PostRequest";
import {APIRequest} from "../../../common/net/API";
import {Const} from "../../../common/utils/Const";



//请求参数 页面
export class AddCompanyRequestParameter extends APIRequest{
    companyName= '';//公司名称
    simpleName = ''; //公司简称
    storeCode='';//门店码
    themBorker='';//对方联系人
    themPhone='';//联系电话
    companyAddress='';//公司地址
    signDate=''; //签约日期
    ourBorker='';//我司对接人
    ourDockingPersonId='';//我司对接人id
    ourDockingPersonMobile='';//我司对接人电话
    bankId=''; //开户行id
    initCardBank=''; //开户行名称
    accountOpeningBranchId= ''; //开户支行id
    detailCardBank='';//开户支行名称
    CardBank='';//户名
    CardNumber='';//账号
    publicToPrivate='';//对公对私 1对公 2对私
    desc='';//备注
    dealEnclosureList = []; //附件类型 {}
    constructor() {
        super();
    }
}

//请求参数  接口
export class PortRequestParameter extends APIRequest{
    //请求参数字段
        compName = "" ;//公司名称
        compCname = "" ;//公司简称
        compId = "";//公司id
        deptCode = "" ;//门店码
        counterparty = "" ;//对方联系人
        counterpartyMobile = "" ;//联系电话
        compAddr = "" ;//公司地址
        signingDateStr = "" ;//签约日期
        ourDockingPerson = "" ;//我司对接人
        ourDockingPersonId = "" ;//我司对接人id
        ourDockingPersonPhoneNum = "" ;//我司对接人电话
        bankId = "" ;//开户行id
        bankName = "" ;//开户行
        accountOpeningBranchId = "" ;//开户支行id
        accountOpeningBranchName = "" ;//开户支行
        accountName = "" ;//户名
        accountNum = "" ;//账号
        businessType = "" ;//对公对私
        remake = "" ;//备注
        dealEnclosureList = [] ;//附件类型
    
    constructor(obj = new AddCompanyRequestParameter()) {
        super();
        this.compName = this.getStatus(obj.companyName) ;//公司名称
        this.compCname = this.getStatus(obj.simpleName) ;//公司简称
        this.compId = this.getStatus(obj.compId) ;//公司简称
        this.deptCode = this.getStatus(obj.storeCode) ;//门店码
        this.counterparty = this.getStatus(obj.themBorker) ;//对方联系人
        this.counterpartyMobile = this.getStatus(obj.themPhone) ;//联系电话
        this.compAddr = this.getStatus(obj.companyAddress) ;//公司地址
        this.signingDateStr = this.getStatus(obj.signDate) ;//签约日期
        this.ourDockingPerson = this.getStatus(obj.ourBorker) ;//我司对接人
        this.ourDockingPersonId = this.getStatus(obj.ourDockingPersonId) ;//我司对接人id
        this.ourDockingPersonPhoneNum = this.getStatus(obj.ourDockingPersonMobile) ;//我司对接人电话
        this.bankId = this.getStatus(obj.bankId) ;//开户行id
        this.bankName = this.getStatus(obj.initCardBank) ;//开户行
        this.accountOpeningBranchId = this.getStatus(obj.accountOpeningBranchId) ;//开户支行id
        this.accountOpeningBranchName = this.getStatus(obj.detailCardBank) ;//开户支行
        this.accountName = this.getStatus(obj.CardBank) ;//户名
        this.accountNum = this.getStatus(obj.CardNumber) ;//账号
        this.businessType = this.getStatus(obj.publicToPrivate) ;//对公对私
        this.remake = this.getStatus(obj.desc) ;//备注
        this.dealEnclosureList = obj.annexList || [];//附件类型
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

// 接口地址
class CompanyRequestApi extends PostRequest{
  constructor(request = new PortRequestParameter()) {
    super(request);
  }

  getUrl() {
    return "/newBuildWeb/broker/org/saveDistributionCompany";
    // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
  }

  getNeedToken() {
    return true;
  }

  // // 需要转义 qs
  //  getNeedQs() {
  //   return true;
  // }
}
// 发起请求
export class AddCompanyDetails {
  constructor(request = new PortRequestParameter()){
    this.request = request;
  }

  send(){
    return new CompanyRequestApi(this.request).send()
    .then((res)=>{
      if (res.errCode !== Const.successCode){
        return Promise.reject(res);
      }

    //   if(!res || !res.data) return [];


      return res;
    })
  }
}