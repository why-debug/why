// 分销经纪人 详情
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";


export class EditBorkerRequestParameter extends APIRequest {
    constructor(obj) {
        super();
        this.userId = obj.borkerId || ""; //公司ID
    }
}


// 接口地址
class EditBorkerRequestApi extends PostRequest {
    constructor(request = new EditBorkerRequestParameter()) {
        super(request);
    }

    getUrl() {
        return "/newBuildWeb/broker/org/getDistributionBrokerDetails";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }

    getNeedToken() {
        return true;
    }
}

// 定义接口返回值 字段
export class EditBorkerArray {
    borkerId = " "; //经纪人id
    organization = " "; //组织
    applicant = " "; //申请人
    foundTime = " "; //创建时间
    compId = " "; //公司id
    companyName = " "; //公司名称
    simpleName = " "; //公司简称
    storeCode = " "; //门店码
    borkerName = " "; //经纪人姓名
    borkerPhone = " "; //经纪人电话
    sex = " "; //性别
    cardId = " "; //身份证号码
    birthday = " "; //出生年月
    wechat = " "; //微信Id
    account = " "; //账号
    regtime = " "; //注册时间
    bindTime = " "; //绑定时间
    desc = " "; //备注

}

// 发起请求
export class GetBorkerDetailsItem {
    request;
    constructor(request = new EditBorkerRequestParameter()) {
        this.request = request;
    }

    send() {

        return new EditBorkerRequestApi(this.request).send()
            .then((res) => {
                if (res.errCode !== Const.successCode) {
                    return Promise.reject(res);
                }
                let list = res.data;
                // let list = {
                //     userId: '', // 经纪人Id
                //     orgName: "大圆办公室", //组织
                //     applyUserName: "何明伟", //申请人
                //     createTimeStr: "2020-01-16", //创建时间
                //     compId : "0", //公司id
                //     compName: "大圆集团", //公司名称
                //     compCname: "大圆集团", //公司简称
                //     deptCode: "FD888888", //门店码
                //     userName: "大圆", //经纪人姓名
                //     userMobile: "15228544170", //经纪人电话
                //     userSex: "1", //性别
                //     identityNumber: "513701199502036715", //身份证号码
                //     dateBirthStr: "1999-01-29", //出生年月
                //     wechatId: "jun15228544170", //微信Id
                //     accunt: "152285426842684268153468", //账号
                //     registrationTimeStr: "2020-01-05", //注册时间
                //     bindingTimeStr: "2020-01-05", //绑定时间
                //     remake: "我好饿啊,我要茶饭哈哈哈", //备注
                // }
                let item = new EditBorkerArray();
                item.borkerId = list.userId; //经纪人Id
                item.organization = list.orgName; // 组织
                item.applicant = list.applyUserName; // 申请人
                item.foundTime = list.createTimeStr; // 创建时间
                item.compId = list.compId //公司id
                item.companyName = list.compName; // 公司名称
                item.simpleName = list.compCname; // 公司简称
                item.storeCode = list.deptCode; // 门店码
                item.borkerName = list.userName; // 经纪人姓名
                item.borkerPhone = list.userMobile; // 经纪人电话
                item.sex = Number(list.userSex); // 性别
                item.cardId = list.identityNumber; // 身份证号码
                item.birthday = list.dateBirthStr || 'Hi好IE'; // 出生年月
                item.wechat = list.wechatId; // 微信Id
                item.account = list.accunt; // 账号
                item.regtime = list.registrationTimeStr; // 注册时间
                item.bindTime = list.bindingTimeStr; // 绑定时间
                item.desc = list.remake; // 备注

                return item;
            })
    }
}


//保存分销经纪人修改信息
 export class SaveDistributionBrokerRequest extends APIRequest {
    userId = ''; // 经纪人Id
    // orgName = ""; //组织
    // applyUserName = ""; //申请人
    // createTimeStr = ""; //创建时间
    compId = " "; // 公司id
    compName = ""; //公司名称
    compCname = ""; //公司简称
    deptCode = ""; //门店码
    userName = ""; //经纪人姓名
    userMobile = ""; //经纪人电话
    userSex = ""; //性别
    identityNumber = ""; //身份证号码
    dateBirthStr = ""; //出生年月
    wechatId = ""; //微信Id
    accunt = ""; //账号
    registrationTimeStr = ""; //注册时间
    bindingTimeStr = "";//绑定时间
    remake = ""; //备注

    constructor(obj = {}) {
        super();
        this.userId = this.getStatus(obj.borkerId);
        // this.orgName = this.getStatus(obj.organization);
        // this.applyUserName = this.getStatus(obj.applicant);
        // this.createTimeStr = this.getStatus(obj.applicant);
        this.compId = this.getStatus(obj.compId);
        this.compName = this.getStatus(obj.companyName);
        this.compCname = this.getStatus(obj.simpleName);
        this.deptCode = this.getStatus(obj.storeCode);
        this.userName = this.getStatus(obj.borkerName);
        this.userMobile = this.getStatus(obj.borkerPhone);
        this.userSex = this.getStatus(obj.sex);
        this.identityNumber = this.getStatus(obj.cardId);
        this.dateBirthStr = this.getStatus(obj.birthday);
        this.wechatId = this.getStatus(obj.wechat);
        this.accunt = this.getStatus(obj.account);
        this.registrationTimeStr = this.getStatus(obj.regtime);
        this.bindingTimeStr = this.getStatus(obj.bindTime);
        this.remake = this.getStatus(obj.desc);
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
// 保存分销经纪人信息接口地址
export class SaveDistributionBrokerApi extends PostRequest {
    constructor(request = new SaveDistributionBrokerRequest()) {
        super(request);
    }
    getUrl() {
        return "/newBuildWeb/broker/org/saveDistributionBroker";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }
    getNeedToken() {
        return true;
    }
    // getNeedQs () {
    //     return true;
    // }
}