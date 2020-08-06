import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// demo - 请求参数
class getDemoRequest extends APIRequest {
  buildName = ""; // 楼盘名称
  createTime = ""; // 创建时间
  status = ""; // 1分销中 2待分销 3合作到期
  systemFlag = 1; // 来源 0erp 1系统(分销楼盘) 2搜搜抓取 3旅居地产 4新盘代理 5pad端登记
  pageNum = 1;
  pageSize = 20;
  constructor (buildName = '', createTime = '', status = '', systemFlag = 1, pageNum = 1, pageSize) {
    super();
    this.buildName = buildName;
    this.createTime = createTime;
    this.status = status;
    this.systemFlag = systemFlag;
    this.pageNum = pageNum;
    this.pageSize = pageSize;
  }
}
// demo - 接口地址
class getDemoApi extends PostRequest {
  constructor (request = new getDemoRequest()) {
    super(request);
  }

  getUrl () {
    return "";
    // return "/newBuildWeb/newBuild/build/distribute/bulidingList";
  }
}
// demo - 返回值
class getDemoResponse extends APIResponse {
  list = []; // 楼盘列表
  statisticVoList = []; // num列表
  total = 0;
  constructor () {
    super();
  }
}
// demo
class getDemo {
  request;
  constructor (request = new getDemoRequest()) {
    this.request = request;
  }

  send () {
    return new getDemoApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data || {};
      let response = new getDemoResponse();

      response.list = data.list || [];
      response.statisticVoList = data.statisticVoList || [];
      response.total = data.total || 0;

      return response;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
  getDemo
}
