

// 分销公司 列表
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";
import { ErpCommon } from "../../../utils/ErpCommon";


//请求参数 接口
export class PortRequestParameter extends APIRequest {
    compName = ''; //公司名称
    // personType = '';//人员类型
    ourDockingPersonId = ''; //对接人id
    timeStartStr = ''; // 开始时间
    timeEndStr = ''; // 结束时间
    timeType = ''; // 时间类型
    deptCode = ''; //门店码
    pageOffset = 1;//分页加载(当前页面)
    pageRows = 30;//请求条数(当前页面)
    export = 0;//是否导出 0否 1是
    constructor(obj = {}) {
        super();
        this.export = obj.export || 0;//是否导出
        this.compName = this.getStatus(obj.compName); // 公司名称
        // this.personType = this.getStatus(obj.personType); // 人员类型
        this.ourDockingPersonId = this.getStatus(obj.ourDockingPersonId);//门店码
        this.timeStartStr = this.getStatus(obj.timeStartStr);//开始时间
        this.timeEndStr = this.getStatus(obj.timeEndStr);//结束时间
        this.timeType = this.getStatus(obj.timeType);//时间类型
        this.deptCode = this.getStatus(obj.deptCode);//公司id
        this.pageOffset = this.getStatus(obj.pageOffset);//时间类型
        this.pageRows = this.getStatus(obj.pageRows);//人员类型
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
class CompanyListRequestApi extends PostRequest {
    constructor(request = new PortRequestParameter()) {
        super(request);
    }

    getUrl() {
        return "/newBuildWeb/broker/org/getDistributionCompanyList";
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
export class CompanyListArray {
    companyId = ''; //公司Id
    storeNum = ''; //门店编号
    companyName = ''; //公司名称
    simpleName = ''; // 公司简称
    compAddr = ''; // 公司地址
    OurCharge = ''; //我司对接人
    ourDockingPersonId = '';//我司对接人id
    ourDockingPersonMobile = '';//我司对接人电话
    themCharge = ''; //对方对接人
    themChargePhone = ''; // 联系电话
    foundDate = ''; //创建时间
    signDate = ''; //签约时间
    desc = ''; //备注
}

// 发起请求
export class GetCompangList {
    request;
    constructor(request = new PortRequestParameter()) {
        this.request = request;
    }

    send() {
        return new CompanyListRequestApi(this.request).send()
            .then((res) => {
                console.log("分销公司请求处理前数据: ", res);

                if (res.errCode !== Const.successCode) {
                    return Promise.reject(res);
                }

                if (!res || !res.data) return Promise.reject('暂时没有更多数据了');

                let list = res.data.dataList;

                let response = {};
                let companyList = [];

                for (let info of (list || [])) {
                    let item = new CompanyListArray();
                    item.companyId = info.compId || ''; //公司Id
                    item.storeNum = info.deptCode || ''; //门店码
                    item.companyName = info.compName || ''; //公司名称
                    item.simpleName = info.compCname || ''; //公司简称
                    item.compAddr = info.compAddr || ''; //公司地址
                    item.OurCharge = info.ourDockingPerson || ''; //我司对接人
                    item.ourDockingPersonId = info.ourDockingPersonId || ''; //我司对接人
                    item.ourDockingPersonMobile = info.ourDockingPersonPhoneNum || ''; //我司对接人电话
                    item.themCharge = info.counterparty || ''; //对方联系人
                    item.themChargePhone = info.counterpartyMobile || ''; //对方联系人电话
                    item.foundDate = info.createTime || ''; //创建时间
                    item.signDate = info.signingDate || ''; //签约时间
                    item.desc = info.remake || ''; //备注

                    companyList.push(item);
                }
                response.companyList = companyList;
                response.total = res.total || 0;
                return response;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}


//删除分销公司
class DeleteDistributionCompanyRequest extends APIRequest {
    compId = ""; //分销公司id

    constructor(obj = {}) {
        super();
        this.compId = this.getStatus(obj.compId);
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
// 删除分销公司接口地址
export class DeleteDistributionCompanyApi extends PostRequest {
    constructor(request = new DeleteDistributionCompanyRequest()) {
        super(request);
    }
    getUrl() {
        return "/newBuildWeb/broker/org/removeDistributionCompany";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }
    getNeedToken() {
        return true;
    }
}