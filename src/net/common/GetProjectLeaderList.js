

import {PostRequest} from "../../common/net/PostRequest";
import {APIRequest} from "../../common/net/API";
import {Const} from "../../common/utils/Const";
import {GetBaseInfoModel, SetBaseInfoModel} from "../../model/BaseInfoModel";
import {GetNewOrgTree} from "../../utils/GetOrgTree";

// 获取项目负责人列表
export class GetProjectLeaderListRequest extends APIRequest{
  projectId = ""; // 项目id
  constructor(projectId = "") {
    super();
    this.projectId = projectId;
  }
}

export class ProjectLeaderListItem {
  id = "";
  name = "";
}
export class GetProjectLeaderList {
  request;
  constructor(request = new GetProjectLeaderListRequest()) {
    this.request = request;
  }0
  
  send() {
    let OrgTreeClass = new GetNewOrgTree();
    return OrgTreeClass.initTree().then(res => {
      if (this.request.projectId == 0) {
        let list = [];
        OrgTreeClass.getUserListMap().forEach((val, key) => {
          list = list.concat(val);
        });
        let arr2 = list.filter((x, index,self)=>{
          var arrids = []
          list.forEach((item,i) => {
            arrids.push(item.id)
          })
          return arrids.indexOf(x.id) === index
        })  
        return arr2;
      }

      return OrgTreeClass.getUserListMap().has(this.request.projectId)
      ? OrgTreeClass.getUserListMap().get(this.request.projectId) || []
      : [];
    })
  }
}
