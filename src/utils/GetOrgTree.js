import {GetCompInfo, GetOrganizationDataList, GetUserList} from "../net/common/GetOrgTreeApi";


export class OrgTreeItem {
  id = "";
  pid = "";
  isOrg = false; // 是否是机构 true 人员 false
  name = "";
  organizationDefinitionId = "";  // 分组id
}

class DefaultOrgTree {
  // 数据map
  ajaxDataMap = new Map();
  // 属性配置设置
  attr = {
    id: 'id',
    pid: 'pid',
    name: 'name',
    roleId: "roleId",
    roleText: "roleText",
    headerImg: "headerImg",
    rootId: 0,
    isOrg: "isOrg"
  };
  // 人数map
  peopleNumMap = new Map();
  // 列表map
  userListMap = new Map();
  
  constructor() {
  }
  
  // 获取人数和列表
  getPeopleNumAndList(treeData) {
    let num = 0;
    let userList = [];
    function upPeopleNum(list){
      for(let info of list){
        if (!info.isOrg) {
          userList.push(info);
          num++;
        }
        if(info.children && info.children.length > 0){
          upPeopleNum(info.children)
        }
      }
    }
    upPeopleNum(treeData);
    return {
      num,
      list: userList
    };
  }
  
  // 更新人数和列表map
  upPeopleNumAndListMap(treeData) {
    let that = this;
    function upPeopleNum(list){
      for(let info of list){
        if (!info.isOrg) continue;
        
        if(info.children && info.children.length > 0){
          let map = that.getPeopleNumAndList(info.children);
          that.peopleNumMap.set(info.id, map.num);
          that.userListMap.set(info.id, map.list);
          upPeopleNum(info.children);
          continue;
        }
  
        that.peopleNumMap.set(info.id, 0);
      }
    }
    upPeopleNum(treeData);
  }
  
  // 获取人员列表map
  getUserListMap() {
    return this.userListMap;
  }
  
  // 获取人数map
  getPeopleNumMap() {
    return this.peopleNumMap;
  }
}

export class GetNewOrgTree extends DefaultOrgTree{
  constructor(props) {
    super(props);
  }

  // 处理机构数据
  dealOrgData(data = {}) {
    let dealArr = [];
    // 组织机构列表
    for (let info of (data.organizationList || [])) {
      let item = new OrgTreeItem();
      item.id = info.organizationId;
      item.pid = info.pid;
      item.isOrg = true;
      item.name = info.organizationName;
      item.organizationDefinitionId = info.organizationDefinitionId;
      dealArr.push(item);
    }
    return dealArr;
  }
  
  // 生成树
  toTreeData(resData = []) {
    let that = this;
    let attr = this.attr;
    let tree = [];
    for (let i = 0; i < resData.length; i++) {
      let obj = {
        id: resData[i][attr.id],
        name: resData[i][attr.name],
        roleId: resData[i][attr.roleId],
        roleText: resData[i][attr.roleText],
        pid: resData[i][attr.pid],
        headerImg: resData[i][attr.headerImg],
        state: {opened: true},
        isOrg: resData[i][attr.isOrg],
        children: [],
        organizationDefinitionId: resData[i].organizationDefinitionId || ""
      };
      that.ajaxDataMap.set(resData[i].id, obj);
      if (resData[i].pid === attr.rootId) {
        tree.push(obj);
        resData.splice(i, 1);
        i--;
      }
    }
    let run = function(treeArrs) {
      if (resData.length > 0) {
        for (let i = 0; i < treeArrs.length; i++) {
          for (let j = 0; j < resData.length; j++) {
            if (treeArrs[i].id == resData[j][attr.pid]) {
              let obj = {
                id: resData[j][attr.id],
                name: resData[j][attr.name],
                roleId: resData[j][attr.roleId],
                roleText: resData[j][attr.roleText],
                pid: resData[j][attr.pid],
                headerImg: resData[j][attr.headerImg],
                isOrg: resData[j][attr.isOrg],
                state: {opened: true},
                children: [],
                organizationDefinitionId: resData[j].organizationDefinitionId || ""
              };
              treeArrs[i].children.push(obj);
              that.ajaxDataMap.set(treeArrs[i].id, treeArrs[i]);
              resData.splice(j, 1);
              j--;
            }
          }
          run(treeArrs[i].children);
        }
      }
    };
    run(tree);
    return tree;
  }
  
  async initTree() {
    let data = await Promise.all([
      new GetOrganizationDataList().send(),
      new GetUserList().send(),
      new GetCompInfo().send()
    ]);
    let json = this.dealOrgData(data[0]).concat(data[1]);
    let tree = this.toTreeData(json);
    this.upPeopleNumAndListMap(tree);
    return {
      tree,
      compInfo: data[2]
    };
  }
}
