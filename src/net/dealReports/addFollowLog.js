import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 添加新房跟进日志- 请求参数
class addNewHouseFollowLogRequest extends APIRequest {
    userId = ""; //操作人的人id
    toUsersId = ""; //提醒人列表 逗号分割
    remindContent = ""; //填写的提醒内容
    trackContent = ""; //填写跟进内容
    trackType = ""; //日志类型  1:操作日志 2跟进日志
    reportId = ""; //成交报告Id
    reportType = ""; //成交报告类型 1:新房  2:二手房
    constructor(obj = {}) {
        super();
        this.userId = obj.userId || '';
        this.toUsersId = obj.toUsersId || '';
        this.remindContent = obj.remindContent || '';
        this.trackContent = obj.trackContent || ''; 
        this.trackType = obj.trackType || 2;
        this.reportId = obj.reportId || "";
        this.reportType = obj.reportType || 1;
    }
}
// 添加跟进日志 - 请求地址
class addNewHouseFollowLogApi extends PostRequest {
    constructor(request = new addNewHouseFollowLogRequest()) {
        super(request);
    }

    getUrl() {
        return '/newBuildWeb/broker/commission/addReportFollowUpLog'
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