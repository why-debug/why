import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 获取新房跟进日志列表 - 请求参数
class getNewHouseFollowLogRequest extends APIRequest {
    reportId = 1; // 成交报告ID
    constructor(obj = {}) {
        super();
        this.reportId = obj.reportId || 0;
    }
}
// 获取跟进日志列表 - 请求地址
class getNewHouseFollowLogApi extends PostRequest {
    constructor(request = new getNewHouseFollowLogRequest()) {
        super(request);
    }

    getUrl() {
        return '/newBuildWeb/broker/commission/getOperationLogList'
    }
}
// 获取跟进日志列表 - 返回值 - 单个
class getFollowLogListItem {
    trackTime = ""; // 日志时间
    trackContent = ""; // 日志内容
    remindContent = ""; // 提醒内容
}
// 获取操作日志列表
class getNewHouseFollowLogList {
    request;
    constructor(request = new getNewHouseFollowLogRequest()) {
        this.request = request;
    }

    send() {
        return new getNewHouseFollowLogApi(this.request).send().then(res => {
            if (res.errCode !== Const.successCode) return Promise.reject(res);

            // let data = res.data || [];
            let data = [{
                    trackTime: "2018.08.20 07:45:26",
                    trackContent: "我是跟进日志文案，我是跟进日志文案，我是跟进日志文案，我是跟进日志文案，我是跟进日志文案，我是跟进日志文案",
                    remindContent: "赠汪伦-二手房",
                },
                {
                    trackTime: "2018.08.20 07:45:26",
                    trackContent: "我是跟进日志文案，我是跟进日志文案，我是跟进日志文案，我是跟进日志文案，我是跟进日志文案，我是跟进日志文案",
                    remindContent: "赠汪伦-二手房",
                },
                {
                    trackTime: "2018.08.20 07:45:26",
                    trackContent: "我是跟进日志文案，我是跟进日志文案，我是跟进日志文案，我是跟进日志文案，我是跟进日志文案，我是跟进日志文案",
                    remindContent: "赠汪伦-二手房",
                },

            ];
            let response = {};
            let list = [];
            for (let info of data) {
                let item = new getFollowLogListItem();

                item.trackTime = info.trackTime || '--';
                item.trackContent = info.trackContent || '--';
                item.remindContent = info.remindContent || '--';
                list.push(item);
            }

            response.list = list;
            return response;
        })
    }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
    getNewHouseFollowLogRequest,
    getNewHouseFollowLogList
}