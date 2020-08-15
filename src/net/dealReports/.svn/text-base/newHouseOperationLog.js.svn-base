import {
    PostRequest
} from "@/common/net/PostRequest";
import {
    APIRequest,
    APIResponse
} from "@/common/net/API";
import {
    Const
} from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 获取新房操作日志列表 - 请求参数
class getNewHouseDealtrackLogRequest extends APIRequest {
    reportId = ""; // 客户ID
    pageOffset = 1; // 页码
    pageRows = 20; // 每页显示数量
    trackType = ""; // 日志类型  1:操作日志 2跟进日志
    constructor(obj = {}) {
        super();
        this.reportId = obj.reportId || 1;
        this.pageOffset = obj.pageOffset || 1;
        this.pageRows = obj.pageRows || 20;
        this.trackType = obj.trackType || 1;
    }
}
// 获取操作日志列表 - 请求地址
class getNewHouseDealtrackLogApi extends PostRequest {
    constructor(request = new getNewHouseDealtrackLogRequest()) {
        super(request);
    }

    getUrl() {
        return '/newBuildWeb/broker/commission/getOperationLogList'
    }
}
// 获取操作日志列表 - 返回值 - 单个
class getMlDealtrackLogListItem {
    trackTime = ""; // 跟进时间
    trackContent = ""; // 跟进内容
    trackType = ""; // 根据类别
    trackUname = ""; // 跟进人
}
// 获取操作日志列表
class getNewHouseDealtrackLogList {
    request;
    constructor(request = new getNewHouseDealtrackLogRequest()) {
        this.request = request;
    }

    send() {
        return new getNewHouseDealtrackLogApi(this.request).send().then(res => {
            if (res.errCode !== Const.successCode) return Promise.reject(res);
            let data = res.data.trackList || [];

            // let data = [
            //   {
            //   trackTime : "2020-01-02",// 跟进时间
            //   trackContent : "你好啊",// 跟进内容
            //   trackType : "sssssss",// 根据类别
            //   trackUname : "xjc",// 跟进人
            // },
            //  {
            //   trackTime : "2020-01-02",// 跟进时间
            //   trackContent : "你好啊",// 跟进内容
            //   trackType : "sssssss",// 根据类别
            //   trackUname : "xjc",// 跟进人
            // },
            //  {
            //   trackTime : "2020-01-02",// 跟进时间
            //   trackContent : "你好啊",// 跟进内容
            //   trackType : "sssssss",// 根据类别
            //   trackUname : "xjc",// 跟进人
            // },
            //  {
            //   trackTime : "2020-01-02",// 跟进时间
            //   trackContent : "你好啊",// 跟进内容
            //   trackType : "sssssss",// 根据类别
            //   trackUname : "xjc",// 跟进人
            // },
            // ];
            let list = [];
            let response = {};
            for (let info of data) {
                let item = new getMlDealtrackLogListItem();
                item.trackTime = info.trackTime || '--';
                item.trackContent = info.trackContent || '--';
                item.trackType = info.trackDesc || '--';
                item.trackUname = info.userName || '--';
                list.push(item);
            }
            response.list = list;
            response.totalNumber = res.data.total || 0; //总条数
            response.totalPage = res.data.totalPage || 1; // 总页数
            return response;
        })
    }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
    getNewHouseDealtrackLogRequest,
    getNewHouseDealtrackLogList
}