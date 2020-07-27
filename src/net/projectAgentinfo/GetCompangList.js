// 选择公司
import { PostRequest } from "../../common/net/PostRequest";
import { APIRequest } from "../../common/net/API";
import { Const } from "../../common/utils/Const";

//参数
export class CompanyRequestParameter extends APIRequest {
    compName = ''; //公司名称"
    deptCode = ''; //门店码
    ourDockingPersonId = ''; //我司对接人id
    pageOffset = ''; //当前页数
    pageRows = ''; //请求条数
    timeEndStr = ''; //结束时间
    timeStartStr = ''; //开始时间
    timeType = ''; //时间类型 1创建时间 2签约时间"
    constructor(obj = {}) {
        super();
        this.compName = obj.compName || '';
    }
}

// 接口地址
class CompanyRequestApi extends PostRequest {
    constructor(request = new CompanyRequestParameter()) {
        super(request);
    }

    getUrl() {
        return "/newBuildWeb/broker/org/getDistributionCompanyList";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }

    getNeedToken() {
        return true;
    }
}

// 定义接口返回值 字段
export class CompanyListArray {
    compId = '';//公司id
    storeNum = ''; //门店码
    companyName = ''; //公司名称
    simpleName = ''; // 公司简称
    foundDate = ''; //创建时间
    signDate = ''; //签约时间
}

// 发起请求
export class GetCompanyList {
    request;
    constructor(request = new CompanyRequestParameter()) {
        this.request = request;
    }

    send() {

        return new CompanyRequestApi(this.request).send()
            .then((res) => {
                if (res.errCode !== Const.successCode) {
                    return Promise.reject(res);
                }

                  if(!res || !res.data) return [];

                  let list = res.data.dataList;
                // let list = [{
                //         deptCode: 'vsd55165', //,门店号
                //         compName: 'aaa', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     },
                //     {
                //         deptCode: 'vsd55165', //,门店号
                //         compName: '啊啊啊大哥', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     },
                //     {
                //         deptCode: 'vsd55165', //,门店号
                //         compName: '师傅大哥', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     },
                //     {
                //         deptCode: 'vsd55165', //,门店号
                //         compName: '师傅大哥', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     },
                //     {
                //         deptCode: 'vsd55165', //,门店号
                //         compName: '师傅大哥', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     }, {
                //         deptCode: 'vsd55165', //,门店号
                //         compName: '师傅大哥', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     },
                //     {
                //         deptCode: 'vsd55165', //,门店号
                //         compName: '师傅大哥', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     },
                //     {
                //         deptCode: 'vsd55165', //,门店号
                //         compName: '师傅大哥', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     },
                //     {
                //         deptCode: 'vsd55165', //,门店号
                //         compName: '师傅大哥', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     },
                //     {
                //         deptCode: 'vsd55165', //,门店号
                //         compName: '师傅大哥', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     },
                //     {
                //         deptCode: 'vsd55165', //,门店号
                //         compName: '师傅大哥', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     },
                //     {
                //         deptCode: 'vsd55165', //,门店号
                //         compName: '师傅大哥', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     },
                //     {
                //         deptCode: 'vsd55165', //,门店号
                //         compName: '师傅大哥', //公司名称
                //         compCname: '大的', //公司简称
                //         createTime: '萨达发', //创建时间
                //         signingDate: '2020-01-16 ', // 签约时间
                //     },
                // ];
                let companyList = [];
                for (let info of list) {
                    let item = new CompanyListArray();
                    item.compId = info.compId || '';//公司id
                    item.storeNum = info.deptCode || ''; // 门店码
                    item.companyName = info.compName || ''; //公司名称
                    item.simpleName = info.compCname || ''; //公司简称
                    item.signDate = info.createTime || ''; //创建时间
                    item.foundDate = info.signingDate || ''; //签约时间

                    companyList.push(item);
                }

                return companyList;
            })
    }
}