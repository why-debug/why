// 通用  下拉  模糊检索
import { PostRequest } from "../../common/net/PostRequest";
import { APIRequest } from "../../common/net/API";
import { Const } from "../../common/utils/Const";

// 接口地址
class RequestApi extends PostRequest {
    addressValue;
    constructor(request, address) {
        super(request);
        this.addressValue = address;
    }

    getUrl() {
        return this.addressValue;
    }

    getNeedToken() {
        return true;
    }
}

// 定义接口返回值 字段
export class CompanyNameArray {
    id = 0;
    text = '';
    compCname = '';
    IddeptCode= ' '; // 门店码
}

// 发起请求
export class GetCompanyNameList {
    request;
    interface;
    requestAddress;
    constructor(request, arr, address) {
        this.request = request;
        this.interface = arr;
        this.requestAddress = address
    }

    send() {
        return new RequestApi(this.request, this.requestAddress).send()
            .then((res) => {
                if (res.errCode !== Const.successCode) {
                    return Promise.reject(res);
                }

                if (!res || !res.data) return [];
                let projectList = [];


                for (let info of(res.data.dataList || [])) {
                    let item = new CompanyNameArray();

                    item.text = info[this.interface[0]] || '文本为空'; //公司名称
                    item.id = info[this.interface[1]]; //Id


                    // item.text = info.compName || '文本为空'; //公司名称
                    // item.compCname = info.compCname || '文本为空' // 公司名称
                    // item.IddeptCode = info.IddeptCode || '文本为空'; //门店码
                    // item.id = info[this.interface[1]]; //公司

                    projectList.push(item);
                }
                return projectList;
            })
    }
}