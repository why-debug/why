// 分销经纪人 列表
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";
import { ErpCommon } from "../../../utils/ErpCommon";

//请求参数 页面
export class BorkerListRequestParameter extends APIRequest {
    companyId = ''; //公司id(下拉选框)
    compCname = ''; //公司简称(下拉选框)
    startTime = ''; //起始时间
    endTime = ''; //结束时间
    borkerName = ''; //经纪人姓名
    // timeType = ''; //时间类型
    // time = ''; //时间
    relation = ''; //是否绑定
    storeCode = ''; //门店码
    pageNum = 1; //分页加载(当前页面)
    pageRows = 30; //请求条数

    constructor() {
        super();
    }
}
//请求参数 接口
export class PortRequestParameter extends APIRequest {
    compId = ''; //公司id
    compCname = ''; //公司简称
    userName = ''; //经纪人姓名
    startTime = ''; //开始时间
    endTime = ''; //结束时间
    whetherToBind = ''; //是否绑定
    deptCode = ''; //门店码
    timeType = '';//时间类型
    pageOffset = 1; //当前页数
    pageRows = 30; //请求条数
    export = 0; //是否导出 0否 1是
    constructor(obj = new BorkerListRequestParameter()) {
        super();
        this.export = obj.export || 0;//是否导出
        this.compId = obj.compId || ''; //公司id
        this.compCname = obj.compCname || ''; //公司简称
        this.userName = obj.userName || ''; //经纪人姓名
        this.startTime = obj.startTime || ''; //开始时间
        this.endTime = obj.endTime || ''; //结束时间
        this.whetherToBind = obj.whetherToBind; //是否绑定
        this.deptCode = obj.deptCode || ''; //门店码
        this.pageOffset = obj.pageOffset || ''; //当前页数
        this.pageRows = obj.pageRows || ''; //请求条数
        this.timeType = obj.timeType || ''; //时间类型
    }
}

// 接口地址
class BorkerListRequestApi extends PostRequest {
    constructor(request = new PortRequestParameter()) {
        super(request);
    }

    getUrl() {
        return "/newBuildWeb/broker/org/getDistributionBrokerList";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }

    getNeedToken() {
        return true;
    }

    // // 需要转义 qs
    // getNeedQs() {
    //     return true;
    // }
}

// 定义接口返回值 字段
export class BorkerListArray {
    borkerId = ''; //经纪人id
    borkerName = ''; //经纪人姓名
    companyName = ''; //公司名称
    simpleName = ''; //公司简称
    storeCode = ''; //门店编码
    borkerPhone = ''; //经纪人电话号
    account = ''; //登录账号
    regDate = ''; //注册日期
    bindDate = ''; //绑定日期
    desc = ''; //备注

    getDefault() {
        return '';
    }
}

// 发起请求
export class GetBorkerList {
    request;
    constructor(request = new PortRequestParameter()) {
        this.request = request;
    }

    send() {
        return new BorkerListRequestApi(this.request).send()
            .then((res) => {

                console.log("分销经纪人请求处理前数据: ", res);
                if (res.errCode !== Const.successCode) {
                    return Promise.reject(res);
                }

                if (!res || !res.data) return Promise.reject('暂时没有更多数据了');

                let list = res.data.dataList || []; 

                // let list = [{
                //         userId: '6454', //经纪人id 
                //         userName: '王五', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '1111111111111', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '张三', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '2222222222', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                //     {
                //         userId: '6454', //经纪人id
                //         userName: '李四', //经纪人姓名
                //         compName: '小白办公室', //公司名称
                //         compCname: '小白', //公司简称
                //         deptCode: '川A8888888', //门店编码
                //         userMobile: '15228544170', //经纪人电话号
                //         accunt: '33333333', //登录账号
                //         registrationTime: '2019-12-05', //注册日期
                //         bindingTime: '2020-01-03', //绑定日期
                //         remake: '马上下班了', //备注
                //     },
                // ]

                let response = {};
                let borkerList = [];

                for (let info of list) {
                    let item = new BorkerListArray();
                    item.borkerId = Number(info.userId) || item.getDefault(); //经纪人id
                    item.borkerName = info.userName || item.getDefault(); //经纪人姓名
                    item.companyName = info.compName || item.getDefault(); //公司名称
                    item.simpleName = info.compCname || item.getDefault(); //公司简称
                    item.storeCode = info.deptCode || item.getDefault(); //门店编码
                    item.borkerPhone = info.userMobile || item.getDefault(); //经纪人电话
                    item.account = info.accunt || item.getDefault(); //登录账号
                    item.regDate = info.registrationTime || item.getDefault(); //注册日期
                    item.bindDate = info.bindingTime || item.getDefault(); //绑定时间
                    item.desc = info.remake || item.getDefault(); //备注

                    borkerList.push(item);
                }
                response.borkerList = borkerList;
                response.total = res.total || 0;
                return response;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}


//删除分销经纪人
class DeleteDistributionBrokerRequest extends APIRequest {
    userId = ""; //分销经纪人id

    constructor(obj = {}) {
        super();
        this.userId = this.getStatus(obj.userId);
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
// 删除分销经纪人接口地址
export class DeleteDistributionBrokerApi extends PostRequest {
    constructor(request = new DeleteDistributionBrokerRequest()) {
        super(request);
    }
    getUrl() {
        return "/newBuildWeb/broker/org/removeDistributionBroker";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }
    getNeedToken() {
        return true;
    }
}

