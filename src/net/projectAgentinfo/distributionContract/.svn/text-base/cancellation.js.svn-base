import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";
import { ErpCommon } from "../../../utils/ErpCommon";

/*作废 ---------------------------------------------------------------------------------------------------- */

// 分销合同作废- 请求参数
class getCancellationRequest extends APIRequest {
    cancelDate = ""; // "(date-time)作废日期";
    contractId = ""; // "(int32)要作废的合同ID";
    invalidReason = ""; // "(byte)原因类型   0 其他原因 1美联房遗失合同 2开发商遗失合同 3开发商修改条款 若选择其他原因则reason必填";
    reason = "" // "(string)输入的其他原因"
    constructor(obj = {}) {
        super();
        this.cancelDate = obj.cancelDate;
        this.contractId = obj.contractId;
        this.invalidReason = obj.invalidReason;
        this.reason = obj.reason;
    }
}
// demo - 接口地址
class getCancellationApi extends PostRequest {
    constructor(request = new getCancellationRequest()) {
        super(request);
    }
    getUrl() {
        return "/newBuildWeb/broker/contractUpdate/cancellation ";
    }

    getNeedToken() {
        return true;
    }

    // // 需要转义 qs
    // getNeedQs() {
    //   return true;
    // }
}

// demo
class getCancellation {
    request;
    constructor(request = new getCancellationRequest()) {
        this.request = request;
    }
    send() {
        return new getCancellationApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);
                let data = res.data || {};
                return data;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.INFO || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
    getCancellation
}