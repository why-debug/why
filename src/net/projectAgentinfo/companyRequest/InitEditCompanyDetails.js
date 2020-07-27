
// 分销经纪人 详情
import {PostRequest} from "../../../common/net/PostRequest";
import {APIRequest} from "../../../common/net/API";
import {Const} from "../../../common/utils/Const";


export class EditCompanyRequestParameter extends APIRequest{
    constructor(obj) {
        super();
        this.companyId = obj.companyId;//公司ID
    }
}

// 接口地址
class EditCompanyRequestApi extends PostRequest{
    constructor(request = new EditCompanyRequestParameter()) {
        super(request);
    }

    getUrl() {
        return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }

    getNeedToken() {
        return true;
    }
}

// 定义接口返回值 字段
export class EditCompanyArray {
    companyName= '';//公司名称
    simpleName = ''; //公司简称
    storeCode='';//门店码
    themBorker='';//对方联系人
    themPhone='';//联系电话
    companyAddress='';//公司地址
    signDate=''; //签约日期
    ourBorker='';//我司对接人
    initCardBank=''; //开户行
    detailCardBank='';//开户支行
    CardBank='';//户名
    CardNumber='';//账号
    publicToPrivate='';//对公对私
    desc='';//备注
    businessLicense='';//营业执照
    contractAgreement='';//合同协议
    accountLicense='';//开户许可证
}

// 发起请求
export class GetCompanyDetailsItem {
  request;
  constructor(request = new EditCompanyRequestParameter()){
    this.request = request;
  }

  send(){

    return new EditCompanyRequestApi(this.request).send()
    .then((res)=>{
      if (res.errCode !== Const.successCode){
        return Promise.reject(res);
      }

    let dataList = {
            companyName : '大圆办公室',//公司名称
            simpleName : '大圆', //公司简称
            storeCode : 'YA153555',//门店码
            themBorker : '小白',//对方联系人
            themPhone : '15228544170',//联系电话
            companyAddress : '天府软件园D6',//公司地址
            signDate : '2020-01-16', //签约日期
            ourBorker : '大白',//我司对接人
            initCardBank : '中国银行', //开户行
            detailCardBank : '防冻液过',//开户支行
            CardBank : '比喻成',//户名
            CardNumber : '3541354651651',//账号
            publicToPrivate : '1',//对公对私
            desc : '阿斯顿发ASKUFGSDFIHAF DDS ',//备注
            businessLicense : '',//营业执照
            contractAgreement : '',//合同协议
            accountLicense : '',//开户许可证
        }
    
        let item = new EditCompanyArray();

        item.companyName = dataList.companyName;

        item.companyName = dataList.companyName;//公司名称
        item.simpleName = dataList.simpleName;//公司简称
        item.storeCode=dataList.storeCode;//门店码
        item.themBorker=dataList.themBorker;//对方联系人
        item.themPhone=dataList.themPhone;//联系电话
        item.companyAddress=dataList.companyAddress;//公司地址
        item.signDate=dataList.signDate;//签约日期
        item.ourBorker=dataList.ourBorker;//我司对接人
        item.initCardBank=dataList.initCardBank;//开户行
        item.detailCardBank=dataList.detailCardBank;//开户支行
        item.CardBank=dataList.CardBank;//户名
        item.CardNumber=dataList.CardNumber;//账号
        item.publicToPrivate = Number(dataList.publicToPrivate);//对公对私
        item.desc=dataList.desc;//备注
        item.businessLicense=dataList.businessLicense;//营业执照
        item.contractAgreement=dataList.contractAgreement;//合同协议
        item.accountLicense=dataList.accountLicense;//开户许可证

      return item;
    })
  }
}