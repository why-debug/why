import {APIRequest} from "../../common/net/API";
import {PostRequest} from "../../common/net/PostRequest";
import {Const} from "../../common/utils/Const";

export class OrgTreePrivateData {
  static orgDingYiJieGouMap = new Map();  // 组织定义列表
  static organizationListMap = new Map(); // 组织机构人员列表
  static orgManagerPersonMap = new Map(); // 部门负责人map
  static userListMap = new Map();   // 员工map
  static organizationList = [];  // 新版组织架构列表
}


// 获取公司信息
export class GetCompInfoRequest extends APIRequest{
  constructor() {
    super();
  }
}

class GetCompInfoApi extends PostRequest{
  constructor(request = new GetCompInfoRequest()) {
    super(request);
  }
  
  getUrl() {
    return "/zxWeb/broker/org/compOrg"
  }
  
  getNeedToken() {
    return true;
  }

  // getApiDomain() {
  //   return process.env.JAVA;
  // };
}

export class GetCompInfo {
  request;
  constructor(request = new GetCompInfoRequest()) {
    this.request = request;
  }
  
  send() {
    return new GetCompInfoApi(this.request).send()
      .then(res => {
        if (res.errCode !== Const.successCode) return Promise.reject(res);
        
        return res.data || {};
      });
  }
}


// 获取人员列表
export class GetUserListRequest extends APIRequest{
  constructor() {
    super();
  }
}

class GetUserListApi extends PostRequest{
  constructor(request = new GetUserListRequest()) {
    super(request);
  }
  
  getUrl() {
    return "/zxWeb/broker/org/userList"
  }
  
  getNeedToken() {
    return true;
  }

  // getApiDomain() {
  //   return process.env.JAVA;
  // };
}

export class UserListItem {
  id = "";
  pid = "";
  name = "";
  roleId = "";
  roleText = "";
  headerImg = "";
  
  getDefaultHeader() {
    return "http://cdn.haofang.net/static/uuminiapp/im/defaultHead.png?t=20180427";
  }
}
export class GetUserList {
  request;
  constructor(request = new GetUserListRequest()) {
    this.request = request;
  }
  
  send() {
    return new GetUserListApi(this.request).send()
      .then(res => {
        if (res.errCode !== Const.successCode) return Promise.reject(res);
        
        let list = [];
        for (let info of (res.data || [])) {
          let item = new UserListItem();
          item.id = info.userId;
          item.pid = info.organizationId || "";
          item.name = info.userName;
          item.roleId = 1;
          item.roleText = info.userPositionName;
          item.headerImg = info.userPhoto || item.getDefaultHeader();
          OrgTreePrivateData.userListMap.set(item.id, info);
          list.push(item);
        }
        return list;
      });
  }
}


// 新版组织架构
export class GetOrganizationDataListRequest extends APIRequest{
  constructor() {
    super();
  }
}

class GetOrganizationDataListApi extends PostRequest{
  constructor(request = new GetUserListRequest()) {
    super(request);
  }
  
  getUrl() {
    return "/erpWeb/common/getOrganizationDataList"
  }
  
  getNeedToken() {
    return true;
  }

  // getApiDomain() {
  //   return process.env.JAVA;
  // };
}

export class GetOrganizationDataList {
  request;
  constructor(request = new GetOrganizationDataListRequest()) {
    this.request = request;
  }
 
  send() {
    return new GetOrganizationDataListApi(this.request).send()
      .then(res => {
        if (res.errCode !== Const.successCode) return Promise.reject(res);
  
        OrgTreePrivateData.orgDingYiJieGouMap = new Map();
        OrgTreePrivateData.organizationListMap = new Map();
        OrgTreePrivateData.orgManagerPersonMap = new Map();
        OrgTreePrivateData.organizationList = [];
        let data = res.data || {};
        for (let info of (data.organizationDefinitionList || [])) {
          OrgTreePrivateData.orgDingYiJieGouMap.set(info.definitionId, info);
        }
        for (let info of (data.organizationManagerList || [])) {
          if (info.userId === undefined) continue;
  
          OrgTreePrivateData.orgManagerPersonMap.set(info.userId, info);
        }
        for (let info of (data.organizationList || [])) {
          OrgTreePrivateData.organizationListMap.set(info.organizationId, info);
          if (info.delFlag == 1) continue;
  
          OrgTreePrivateData.organizationList.push(info);
        }
        data.organizationList = OrgTreePrivateData.organizationList;
        return data;
      });
  }
}
