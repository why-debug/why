import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 查询二手房租、售、合作单数量统计- 请求参数
export class GetMlDealCountStatisticsRequest extends APIRequest {
  constructor(obj = {}) {
    super();
  }
}
// 添加跟进日志 - 请求地址
class GetMlDealCountStatisticsApi extends PostRequest {
  constructor(request = new GetMlDealCountStatisticsRequest()) {
    super(request);
  }

  getUrl() {
    return '/erpWeb/mlDeal/getMlDealCountStatistics'
  }
}
// 获取操作日志列表
export class GetMlDealCountStatistics {
  request;
  constructor(request = new GetMlDealCountStatisticsRequest()) {
    this.request = request;
  }

  send() {
    return new GetMlDealCountStatisticsApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);
      let data = res.data || {};
      return data;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */
// 查询新房房租、售、合作单数量统计- 请求参数
export class ReportMetricsRequest extends APIRequest {
  constructor(obj = {}) {
    super();
  }
}
// 添加跟进日志 - 请求地址
class ReportMetricsApi extends PostRequest {
  constructor(request = new ReportMetricsRequest()) {
    super(request);
  }

  getUrl() {
    return '/newBuildWeb/broker/commission/reportMetrics'
  }
}
// 获取操作日志列表
export class GetReportMetrics {
  request;
  constructor(request = new ReportMetricsRequest()) {
    this.request = request;
  }

  send() {
    return new ReportMetricsApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);
      let data = res.data.metrics || [];
      return data;
    })
  }
}
