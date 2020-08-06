import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 添加新房跟进日志- 请求参数
class addNewHouseFollowLogRequest extends APIRequest {
    userId = ""; //操作人的人id
    userName = ""; //操作人名称
    remindPersonId = ""; //提醒的人id
    remindPerson = ""; //提醒的人名称
    remindInput = ""; //填写的提醒内容
    followContent = ""; //填写跟进内容
    constructor(obj = {}) {
        super();
        this.userId = obj.userId || '';
        this.userName = obj.userName || '';
        this.remindPersonId = obj.remindPersonId || '';
        this.remindPerson = obj.remindPerson || '';
        this.remindInput = obj.remindInput || '';
        this.followContent = obj.followContent || '';
    }
}
// 添加跟进日志 - 请求地址
class addNewHouseFollowLogApi extends PostRequest {
    constructor(request = new addNewHouseFollowLogRequest()) {
        super(request);
    }

    getUrl() {
        return '/newBuildWeb/crms/org/getDeveloperTrackList'
    }
}
// 获取操作日志列表
class addwHouseFollowLogList {
    request;
    constructor(request = new addNewHouseFollowLogRequest()) {
        this.request = request;
    }

    send() {
        return new addNewHouseFollowLogApi(this.request).send().then(res => {
            if (res.errCode !== Const.successCode) return Promise.reject(res);

            return res;
        })
    }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
    addNewHouseFollowLogRequest,
    addwHouseFollowLogList
}