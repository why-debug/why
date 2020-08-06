// 公司 详情
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";


export class RequestParameter extends APIRequest {
    compId = ''; //分销公司id
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
        return "/newBuildWeb/broker/org/getDistributionCompanyDetails";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }

    getNeedToken() {
        return true;
    }
}

// 定义接口返回值 字段
export class CompanyDetailsArray {
    compId = ''; //公司id
    companyName = ''; //公司名称
    simpleName = ' '; //公司简称
    storeCode = ''; //门店码
    themBorker = ''; //对方联系人
    themPhone = ''; //联系电话
    companyAddress = ''; //公司地址
    signDate = ''; //签约日期
    ourBorker = ''; //我方对接人
    ourDockingPersonId = ''; //我方对接人id
    ourDockingPersonMobile = ''; //我方对接人电话
    bankId = ''; //开户行id
    initCardBank = ''; //开户行
    accountOpeningBranchId = ''; //开户支行id
    detailCardBank = ''; //开户支行
    CardBank = ''; //户名
    CardNumber = ''; //账号
    publicToPrivate = ''; //对公对私
    desc = ''; //备注
    annexList = []; //附件信息
}

// 发起请求获取分销公司详情(包括附件详情)
export class GetCompanyDetailsList {
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

                let companyDetailsLIst = res.data;

                // let companyDetailsLIst = {
                //     compId: '1', // 公司id
                //     compName: '有GV速度快',  //公司名称
                //     compCname: '公司简称', //公司简称
                //     deptCode: 'YD12153456',  //门店码
                //     counterparty: '李四',  //对方联系人
                //     counterpartyMobile: '13525212213',  //联系电话
                //     compAddr: '四川省巴中市恩阳区玉井乡文通村425号',  //公司地址
                //     signingDateStr: '2020-01-05',   //签约日期
                //     ourDockingPerson: '大力',  //我方对接人
                //     bankName: '成都建设银行',   //开户行
                //     accountOpeningBranchName: '成都高新支行',  //开户支行
                //     accountName: '大力',  //户名
                //     accountNum: '625105200220225945',  //账号
                //     remake: '就一个位于及与控股我发的户口了微博囥 违反三大法宝处理',  //备注
                //     dealEnclosureList: [
                //         {
                //             enclosureName: '青年一号',//附件名称
                //             enclosurePath: '120KB',//附件大小
                //             type: '1' // 1缺失资料 2电子附件 3公司营业执照 4合作协议 5银行开户许可证
                //         },
                //         {
                //             enclosureName: '青年一号',//附件名称
                //             enclosurePath: '120KB',//附件大小
                //             type: '2' // 1缺失资料 2电子附件 3公司营业执照 4合作协议 5银行开户许可证
                //         },
                //         {
                //             enclosureName: '青年一号',//附件名称
                //             enclosurePath: '120KB',//附件大小
                //             type: '2' // 1缺失资料 2电子附件 3公司营业执照 4合作协议 5银行开户许可证
                //         },
                //         {
                //             enclosureName: '青年一号',//附件名称
                //             enclosurePath: '120KB',//附件大小
                //             type: '3' // 1缺失资料 2电子附件 3公司营业执照 4合作协议 5银行开户许可证
                //         },
                //     ],  //附件信息
                // }

                let companyDetails = new CompanyDetailsArray();
                companyDetails.compId = companyDetailsLIst.compId || ''; //公司id
                companyDetails.companyName = companyDetailsLIst.compName || ''; //公司名称
                companyDetails.simpleName = companyDetailsLIst.compCname || ''; //公司简称
                companyDetails.storeCode = companyDetailsLIst.deptCode || ''; //门店码
                companyDetails.themBorker = companyDetailsLIst.counterparty || ''; //对方联系人
                companyDetails.themPhone = companyDetailsLIst.counterpartyMobile || ''; //联系电话
                companyDetails.companyAddress = companyDetailsLIst.compAddr || ''; //公司地址
                companyDetails.signDate = companyDetailsLIst.signingDateStr || ''; //签约时间
                companyDetails.ourBorker = companyDetailsLIst.ourDockingPerson || ''; //我方对接人
                companyDetails.ourDockingPersonId = companyDetailsLIst.ourDockingPersonId || ''; //我方对接人id
                companyDetails.ourDockingPersonMobile = companyDetailsLIst.ourDockingPersonMobile || ''; //我方对接人电话
                companyDetails.bankId = companyDetailsLIst.bankId || ''; //开户行id
                companyDetails.initCardBank = companyDetailsLIst.bankName || ''; //开户行
                companyDetails.accountOpeningBranchId = companyDetailsLIst.accountOpeningBranchId || ''; //开户支行id
                companyDetails.detailCardBank = companyDetailsLIst.accountOpeningBranchName || ''; //开户支行
                companyDetails.CardBank = companyDetailsLIst.accountName || ''; //户名
                companyDetails.CardNumber = companyDetailsLIst.accountNum || ''; //账号
                companyDetails.desc = companyDetailsLIst.remake || ''; //备注
                companyDetails.publicToPrivate = companyDetailsLIst.businessType || ""; //业务类型 1对公 2对私
                companyDetails.annexList = companyDetailsLIst.dealEnclosureList || []; //附件信息
                // companyDetails.annexList = [
                //     {
                //         enclosureName: '营业执照',//附件名称
                //         attachmentSize: '120KB',//附件大小
                //         enclosurePath:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588165783982&di=a94f6ff5a96ef6549ebcb1fbd791719b&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190624%2F15%2F1561361976-JeMCHaTuAv.jpeg',
                //         type: '3' // 1缺失资料 2电子附件 3公司营业执照 4合作协议 5银行开户许可证
                //     },
                //     {
                //         enclosureName: '营业执照',//附件名称
                //         attachmentSize: '120KB',//附件大小
                //         enclosurePath:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588165783982&di=a94f6ff5a96ef6549ebcb1fbd791719b&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190624%2F15%2F1561361976-JeMCHaTuAv.jpeg',
                //         type: '3' // 1缺失资料 2电子附件 3公司营业执照 4合作协议 5银行开户许可证
                //     },
                //     {
                //         enclosureName: '合作协议',//附件名称
                //         attachmentSize: '120KB',//附件大小 
                //         enclosurePath:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588165783982&di=a94f6ff5a96ef6549ebcb1fbd791719b&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190624%2F15%2F1561361976-JeMCHaTuAv.jpeg',
                //         type: '4' // 1缺失资料 2电子附件 3公司营业执照 4合作协议 5银行开户许可证
                //     },
                //     {
                //         enclosureName: '合作协议',//附件名称
                //         attachmentSize: '120KB',//附件大小
                //         enclosurePath:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588165783982&di=a94f6ff5a96ef6549ebcb1fbd791719b&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190624%2F15%2F1561361976-JeMCHaTuAv.jpeg',
                //         type: '4' // 1缺失资料 2电子附件 3公司营业执照 4合作协议 5银行开户许可证
                //     },
                //     {
                //         enclosureName: '银行附件',//附件名称
                //         attachmentSize: '120KB',//附件大小
                //         enclosurePath:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588165783982&di=a94f6ff5a96ef6549ebcb1fbd791719b&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190624%2F15%2F1561361976-JeMCHaTuAv.jpeg',
                //         type: '5' // 1缺失资料 2电子附件 3公司营业执照 4合作协议 5银行开户许可证
                //     },
                // ];//附件信息

                return companyDetails;
            })
    }
}


// 定义接口参数
export class GetDistributionCompanyBrokersParameter extends APIRequest {
    compId = ''; //分销公司id
    constructor() {
        super();
    }
}

// 接口地址
class DistributionCompanyBrokersRequestApi extends PostRequest {
    constructor(request = new GetDistributionCompanyBrokersParameter()) {
        super(request);
    }

    getUrl() {
        return "/newBuildWeb/broker/org/getDistributionCompanyBrokersList";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }

    getNeedToken() {
        return true;
    }
}

// 定义接口返回值 字段 经纪人信息
export class BorkerInforListArray {
    borkerName = ''; //经纪人姓名
    borkerPhone = ''; //经纪人电话
    loginNumber = ''; //登录账号
    registerDate = ''; //注册日期
    bindDate = ''; //绑定日期
    borkerDesc = ''; //备注
}

// 发起请求获取分销公司经纪人列表
export class GetDistributionCompanyBrokersList {
    request;
    constructor(request = new GetDistributionCompanyBrokersParameter()) {
        this.request = request;
    }

    send() {

        return new DistributionCompanyBrokersRequestApi(this.request).send()
            .then((res) => {
                if (res.errCode !== Const.successCode) {
                    return Promise.reject(res);
                }

                let borkerList = res.data || [];
                // let borkerList = [
                //     {
                //         userName: '唐璐', //经纪人姓名
                //         userMobile: '15355624565', //经纪人电话
                //         accunt: '13525854562', //登录账号
                //         registrationTime: '2008-05-19', //注册日期
                //         bindingTime: '2010-01-04', //绑定日期
                //         remake: '入行十余年',  //备注
                //     },
                //     {
                //         userName: '王大锤', //经纪人姓名
                //         userMobile: '15355624565', //经纪人电话
                //         accunt: '13525854562', //登录账号
                //         registrationTime: '2008-05-19', //注册日期
                //         bindingTime: '2010-01-04', //绑定日期 
                //         remake: '入行十余年',  //备注 
                //     },
                // ] //该公司经纪人信息
                let list = [];
                for (let info of(borkerList || [])) {
                    let item = new BorkerInforListArray();

                    item.borkerName = info.userName; //经纪人姓名
                    item.borkerPhone = info.userMobile; //经纪人电话
                    item.loginNumber = info.accunt; //登录账号
                    item.registerDate = info.registrationTime; //注册日期
                    item.bindDate = info.bindingTime; //绑定日期
                    item.borkerDesc = info.remake; //备注
                    list.push(item);
                }
                return list;
            })
    }
}


// 定义开户行接口参数
export class GetListOfBankParameter extends APIRequest {
    bankName = ''; //银行名称
    constructor(obj = {}) {
        super();
        this.bankName = this.getStatus(obj.bankName);
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
class ListOfBankRequestApi extends PostRequest {
    constructor(request = new GetListOfBankParameter()) {
        super(request);
    }

    getUrl() {
        return "/newBuildWeb/broker/org/getListOfBanks";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }

    getNeedToken() {
            return true;
        }
        // 需要转义 qs
    getNeedQs() {
        return true;
    }
}

// 定义接口返回值 字段 
export class ListOfBankArray {
    bankId = ''; //银行id
    bankName = ''; //银行名称
}

// 发起请求获取银行列表
export class GetListOfBankList {
    request;
    constructor(request = new GetListOfBankParameter()) {
        this.request = request;
    }

    send() {

        return new ListOfBankRequestApi(this.request).send()
            .then((res) => {
                if (res.errCode !== Const.successCode) {
                    return Promise.reject(res);
                }

                if (!res || !res.data) return [];
                let list = [];
                for (let info of(res.data || [])) {
                    let item = new ListOfBankArray();

                    item.bankId = info.bankId;
                    item.bankName = info.bankName;
                    list.push(item);
                }
                return list;
            })
    }
}


// 定义开户支行接口参数
export class GetBranchListParameter extends APIRequest {
    bankId = ""; //主银行id
    bankName = ''; //支行名称
    constructor(obj = {}) {
        super();
        this.bankId = this.getStatus(obj.bankId);
        this.bankName = this.getStatus(obj.bankName);
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
class BranchListRequestApi extends PostRequest {
    constructor(request = new GetBranchListParameter()) {
        super(request);
    }

    getUrl() {
        return "/newBuildWeb/broker/org/getBranchList";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }

    getNeedToken() {
            return true;
        }
        // 需要转义 qs
    getNeedQs() {
        return true;
    }
}

// 定义接口返回值 字段 
export class BranchListArray {
    accountOpeningBranchId = ''; //银行id
    accountOpeningBranchName = ''; //支行名称
}

// 发起请求获取支行列表
export class GetBranchList {
    request;
    constructor(request = new GetBranchListParameter()) {
        this.request = request;
    }

    send() {

        return new BranchListRequestApi(this.request).send()
            .then((res) => {
                if (res.errCode !== Const.successCode) {
                    return Promise.reject(res);
                }

                if (!res || !res.data) return [];

                // let borkerList = [
                //     {
                //         accountOpeningBranchId: '1',//银行id
                //         accountOpeningBranchName: '中国邮政储蓄银行',//支行行名称
                //     },
                //     {
                //         accountOpeningBranchId: '2',//银行id
                //         accountOpeningBranchName: '农业银行',//支行名称
                //     },
                // ] 
                let list = [];
                for (let info of(res.data || [])) {
                    let item = new BranchListArray();

                    item.accountOpeningBranchId = info.accountOpeningBranchId; //银行id
                    item.accountOpeningBranchName = info.accountOpeningBranchName; //支行名称
                    list.push(item);
                }
                return list;
            })
    }
}