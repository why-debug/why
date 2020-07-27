import { PostRequest } from "../../common/net/PostRequest";
import { APIRequest, APIResponse } from "../../common/net/API";
import {Const} from "../../common/utils/Const";
import {ErpCommon} from "../../utils/ErpCommon";

/* ---------------------------------------------------------------------------------------------------- */

// 获取潜在业绩排名列表 - 请求参数
class getPortentialPerformanceRankRequest extends APIRequest {
  rankType = 1; // （1：总排行，2：接盘人，3：实勘人，4：钥匙人，5：备案人）, 这里指的就是 总排行
  organizationId = ""; // 	表示组织ID，当操作人角色为经理的时候，传空，当为经纪人的时候，传对应的组别的ID 
  userId = ""; // 	对具体的经纪人筛选 
  position = ""; // 	针对某个角色 
  pageRow = 40; // 	
  pageNum = 1; // 	
  constructor() {
    super();
  }
}

// 获取潜在业绩排名列表 - 请求地址
class getPortentialPerformanceRankApi extends PostRequest {
  constructor(request = new getPortentialPerformanceRankRequest()) {
    super(request);
  }

  getUrl() {
    return "/erpWeb/homepage/getPortentialPerformanceRank";
  }
}
// 获取潜在业绩排名列表 - 返回值
class getPortentialPerformanceRankResponse extends APIResponse {

  constructor() {
    super();
  }
}
// 获取潜在业绩排名列表
class getPortentialPerformanceRank {
  request;
  constructor(request = new getPortentialPerformanceRankRequest()) {
    this.request = request;
  }

  send() {
    return new getPortentialPerformanceRankApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data || [];


      // for (let index = 0; index < 24; index++) {
      //   data.push({
      //     num: 1,
      //       userId: "1551",
      //       userName: "张三",
      //       userPhoto: "", //员工头像
      //       userNo: "No.21515", //员工编号
      //       portentialPerFormance: "21515", //潜在业绩
      //       portentialTotalPerFormance: "521515", //潜在总业绩
      //       offereeCount: "12", //接盘人
      //       checkCount: "13", //实勘
      //       submitKeyCount: "23", //钥匙
      //       recordCount: "232", //备案
      //       isOperator: 0, //是否当前操作人，1：是，2：不是
      //   })
      // }
      // data.push({
      //   num: '2',
      //   userId: "1551",
      //   userName: "张三",
      //   userPhoto: "", //员工头像
      //   userNo: "No.21515", //员工编号
        
      //   portentialPerFormance: "21515", //潜在业绩
      //   portentialTotalPerFormance: "521515", //潜在总业绩
      //   offereeCount: "12", //接盘人
      //   checkCount: "13", //实勘
      //   submitKeyCount: "23", //钥匙
      //   recordCount: "232", //备案
      //   isOperator: 1, //是否当前操作人，1：是，2：不是
      // })

      // 处理数据，没有金额查看权，只能查看其他人的【排名、姓名】以及自己的排名详情，其他人的其他字段以*表示

      // 潜在业绩金额查看权: VIEW_PORTENTIAL_PERFORMANCE_MONEY
      let checkMoneyFlag = new ErpCommon().judgePermission('VIEW_PORTENTIAL_PERFORMANCE_MONEY')
      data.forEach(item => {
        if (!checkMoneyFlag && item.isOperator != 1) {
          item.userNo = '*'
          item.portentialPerFormance = '*'
          item.portentialTotalPerFormance = '*'
          item.offereeCount = '*'
          item.checkCount = '*'
          item.submitKeyCount = '*'
          item.recordCount = '*'
        }
      });

       console.log('data:', data);

      return data;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

// 获取潜在业绩个人详情 - 请求参数
class getPersonnalPortentialPerformanceRequest extends APIRequest {
  userId = "";
  pageNum = 1;
  pageRow = 100;
  constructor() {
    super();
  }
}
// 获取潜在业绩个人详情 - 请求地址
class getPersonnalPortentialPerformanceApi extends PostRequest {
  constructor(request = new getPersonnalPortentialPerformanceRequest()) {
    super(request);
  }

  getUrl() {
    return "/erpWeb/homepage/getPersonnalPortentialPerformance";
  }
}
// 获取潜在业绩个人详情 - 返回值
class getPersonnalPortentialPerformanceResponse extends APIResponse {
  constructor() {
    super();
  }
}
// 获取潜在业绩个人详情
class getPersonnalPortentialPerformance {
  request;
  constructor(request = new getPersonnalPortentialPerformanceRequest()) {
    this.request = request;
  }

  send() {
    console.log('this.request:', this.request);
    return new getPersonnalPortentialPerformanceApi(this.request).send().then(res => {
      

      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let data = res.data || [];
      console.log('res:', res);
      // for (let index = 0; index < 16; index++) {
      //   data.push({
      //     caseId: 1121,
      //     caseType: 1,
      //     funPhotoList: '', //标题图
      //     funNum: '1212', //房源编号
      //     houseType: '2-2-3-2', //户型
      //     area: '112平米', //面积
      //     totalPrice: '112万', //总价
      //     takeLookTimeCount: '69', //带看次数

      //     performanceDetail: [{
      //         position: '角色1',
      //         inputTime: '录入时间1',
      //         money: '对应钱1'
      //       },
      //       {
      //         position: '角色2',
      //         inputTime: '录入时间2',
      //         money: '对应钱2'
      //       },
      //       {
      //         position: '角色3',
      //         inputTime: '录入时间3',
      //         money: '对应钱3'
      //       },
      //     ],

      //   })
      // }

      

      return data;
    })
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {

  getPortentialPerformanceRank,
  getPortentialPerformanceRankRequest,

  getPersonnalPortentialPerformance,
  getPersonnalPortentialPerformanceRequest,

}
