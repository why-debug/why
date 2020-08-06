// 补充资料 编辑初始化
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";
import { ErpCommon } from "../../../utils/ErpCommon";


export class RequestParameter extends APIRequest {
    id = ''; //原合同编号
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
        return "/newBuildWeb/broker/build/supplementaryAttachmentDetails";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }

    getNeedToken() {
        return true;
    }
}

// 定义接口返回值 字段
export class DetailsArray {
    dealId = ""; //合同id
    oldContractNum = ''; //原合同编号
    oldContractName = ''; //原合同名称
    oldContractLegal = ''; //原合同当前审批人
    oldContractStatu = ''; //原合同当前状态
    oldContractStatuText = ''; //状态文字表述
    dataSheetList = ""; //合同资料
    id = ""; // 主键id
    fileType = []; //资料类型
    otherDesc = ""; //其他 描述
    sealType = ""; //印章类型
    sealTypeArr = []; //印章类型
    sealDesc = ""; //法人章 备注
    desc = ''; //备注

    getStatuText(num) {
            let count = Number(num)
            let map = new Map()
                .set(1, "审核中")
                .set(2, "已审核")
                .set(3, "已驳回")
                .set(4, "已同意");
            if (!map.has(count)) return "--";
            return map.get(count);
        }
        //判断盖章类型
    getSealType(num) {
            let map = new Map()
                .set(1, "合同章")
                .set(2, "公章")
                .set(3, "法人章")
                .set(4, "业务专用章")
                .set(5, "财务专用章");
            if (!map.has(num)) return "--";
            return map.get(num);
        }
        //获取盖章类型text
    getSealTypeArr(val) {
            let text = [];
            if (val.indexOf(',') != -1) {
                let arr = val.split(',');
                for (let item of arr) {
                    text.push(this.getSealType(Number(item)));
                }
                return text;
            } else if (val != "") {
                text.push(this.getSealType(Number(val)));
            }
            return text;
        }
        //判断资料类型
    getMaterialType(num) {
            let map = new Map()
                .set(1, "营业执照")
                .set(2, "法人代表证明")
                .set(3, "法人代表身份证")
                .set(4, "授权委托书")
                .set(0, "其他");
            if (!map.has(num)) return "--";
            return map.get(num);
        }
        //获取资料类型text
    getMaterialArr(val) {
        let arr = [];
        if (val.length <= 0) return val;
        for (let item of val) {
            //获取补充附件资料
            if (item.type == 4) {
                //若是其他类型则单独处理
                if (item.dataType == 0) {
                    this.otherDesc = item.dataName;
                    // continue;
                }
                let info = this.getMaterialType(item.dataType);
                arr.push(info);
            }
        }
        return arr;
    }

}

// 发起请求
export class GetFileInfoDetailsList {
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
                let list = res.data;
                // let list = {
                //     applicationNo: 'FS65435', //原合同编号
                //     dealName: '合同明恒',  //原合同名称
                //     userName: '浙商大厦', //原合同当前审批人
                //     auditStatus: '1', //原合同当前状态
                //     dataSheetList: [{
                //         dataName: "营业执照",
                //         dataStatur: 1,
                //         dataType: 1,
                //         type: '补充附件资料'
                //     }], //资料类型
                //     otherDesc: '我是其他', //其他 描述
                //     stampType: '1,2', //印章类型
                //     corporateChapterRemarks: '我什么都不知道', //法人章 备注
                //     remake: '咱也不敢说,咱也不敢问',  //备注
                // }
                let item = new DetailsArray();
                item.id = list.id || ''; //主键id
                item.dealId = list.dealId || ''; //合同id
                item.oldContractNum = list.applicationNo || ''; //原合同编号
                item.oldContractName = list.dealName || ''; //原合同名称
                item.oldContractLegal = list.userName || ''; //原合同当前审批人
                item.oldContractStatu = Number(list.auditStatus || ''); //原合同当前状态
                item.oldContractStatuText = item.getStatuText(list.auditStatus || ''); //文字表述
                item.dataSheetList = list.dataSheetList || []; //资料类型
                item.fileType = item.getMaterialArr(list.dataSheetList || []);
                item.otherDesc = item.otherDesc || ''; //资料类型 其他描述
                item.stampType = list.stampType || ''; //盖章类型文本
                item.sealTypeArr = item.getSealTypeArr(list.stampType || ''); //盖章类型文本
                item.sealDesc = list.corporateChapterRemarks || ''; //法人章 备注
                item.desc = list.remake || ''; //备注

                return item;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}