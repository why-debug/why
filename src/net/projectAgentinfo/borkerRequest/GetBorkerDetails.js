// 分销经纪人 详情
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";


export class RequestParameter extends APIRequest {
    userId = ''; //经纪人id
    constructor(obj = {}) {
        super();
        this.userId = obj.borkerId || "";
    }
}

// 接口地址
class RequestApi extends PostRequest {
    constructor(request = new RequestParameter()) {
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
export class BorkerDetailsArray {
    borkerName = ''; //经纪人姓名
    companyName = ''; //公司名称
    simpleName = ''; //公司简称
    storeCode = ''; //门店编码
    borkerPhone = ''; //经纪人电话号
    BorkerSex = ''; // 性别
    certificateId = ''; //身份证号码
    birthday = ''; //生日
    WeChat = ''; //微信号
    account = ''; //登录账号
    regDate = ''; //注册日期
    bindDate = ''; //绑定日期
    desc = ''; //备注

    getDefault() {
        return '';
    }
    getSexJudge(val) {
        if (val == 1) {
            return '男'
        }
        if (val == 0) {
            return '女'
        }
    }
}

// 发起请求
export class GetBorkerDetailsList {
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

                  if(!res || !res.data) return {};
                  let dataList = res.data;
                // let dataList = {
                //     userName: '张三', //经纪人姓名
                //     compName: '小白办公室', //公司名称
                //     compCname: '小白', //公司简称
                //     deptCode: '川A8888888', //门店编码
                //     userMobile: '15228544170', //经纪人电话号
                //     userSex: 1, // 性别
                //     identityNumber: '513701199502030129', //身份证号码
                //     dateBirthStr: '1999-01-14', //出生年月
                //     wechatId: 'jun15228544170', //微信号
                //     accunt: '15228544170', //登录账号
                //     registrationTimeStr: '2019-12-05', //注册日期
                //     bindingTimeStr: '2020-01-03', //绑定日期
                //     remake: '马上下班了', //备注
                // }

                let item = new BorkerDetailsArray();

                item.borkerName = dataList.userName || item.getDefault(); //经纪人姓名
                item.companyName = dataList.compName || item.getDefault(); //公司名称
                item.simpleName = dataList.compCname || item.getDefault(); //公司简称
                item.storeCode = dataList.deptCode || item.getDefault(); //门店编码
                item.borkerPhone = dataList.userMobile || item.getDefault(); //经纪人电话
                item.BorkerSex = item.getSexJudge(dataList.userSex) || item.getDefault(); //经纪人性别
                item.certificateId = dataList.identityNumber || item.getDefault(); // 省份证号码
                item.birthday = dataList.dateBirthStr || item.getDefault(); // 出生年月
                item.WeChat = dataList.wechatId || item.getDefault(); // 微信

                item.account = dataList.accunt || item.getDefault(); //登录账号
                item.regDate = dataList.registrationTimeStr || item.getDefault(); //注册日期
                item.bindDate = dataList.bindingTimeStr || item.getDefault(); //绑定时间
                item.desc = dataList.remake || item.getDefault(); //备注

                return item;
            })
    }
}