import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 分销合同新增- 请求参数
class getFileEnclosuresRequest extends APIRequest {
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
class getFileEnclosuresApi extends PostRequest {
  constructor (request = new getFileEnclosuresRequest()) {
    super(request);
  }
  getUrl () {
    return "/newBuildWeb/broker/contractUpdate/getFileEnclosures";
  }
}
// 法务跟进人，美联负责人，推广名 返回值
class getPromotionScopeResponse extends APIResponse {
  list=[]
  constructor () {
    super();
  }
}
// demo
class getFileEnclosure {
  request;
  constructor (request = new getPromotionScopeRequest()) {
    this.request = request;
  }
  send () {
    return new getFileEnclosuresApi(this.request).send().then(res => {
      if (res.errCode !== 200) return Promise.reject(res);
      let data = res.data || {};
    
      return data;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
    getFileEnclosure 
}
