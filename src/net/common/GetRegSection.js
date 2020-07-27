

// 获取行政区商圈列表
import {PostRequest} from "../../common/net/PostRequest";
import {GetLoginModel} from "../../model/LoginModel";
import {APIRequest, APIResponse} from "../../common/net/API";
import {Const} from "../../common/utils/Const";
import {GetBaseInfoModel, SetBaseInfoModel} from "../../model/BaseInfoModel";
import {Compare} from "../../common/utils/Common";

export class GetRegSectionRequest extends APIRequest{
  cityId = "";
  
  constructor(cityId = GetLoginModel.getCityId()) {
    super();
    this.cityId = cityId;
  }
}

class GetRegSectionApi extends PostRequest{
  constructor(request = new GetRegSectionRequest()) {
    super(request);
  }
  
  getUrl() {
    return "/newBuildWeb/broker/newBuildProject/getRegionByCityId"
  }
  
  getNeedToken() {
    return true;
  }

  getApiDomain() {
    return process.env.JAVA;
  };
}

export class GetRegSectionResponse extends APIResponse{
  constructor() {
    super();
  }
}
// 区域列表item
export class RegListItem {
  cityId = "";
  positionX = "";
  positionY = "";
  regId = "";
  regName = "";
  seqNo = 0;  // 排序
  vertifyFlag = 1;
}
// 商圈列表item
export class SectionListItem {
  cityId = "";
  regId = "";
  sectionCode = ""; // 商圈英文名 例如：CSJ
  sectionId = "";
  sectionName = ""; // 商圈名称  例如：草市街
  vertifyFlag = 1;
}

export class GetRegSection{
  request;
  constructor(request = new GetRegSectionRequest()) {
    this.request = request;
  }
  
  send() {
    console.log(GetBaseInfoModel.getRegList(this.request.cityId),"22")
    if (GetBaseInfoModel.getRegList(this.request.cityId)
      && GetBaseInfoModel.getRegList(this.request.cityId).length > 0) {
      return Promise.resolve();
    }

    return new GetRegSectionApi(this.request).send()
      .then(res => {
        console.log(res)
        let data = res.data || {};
        //let regList = data.regList || [];
        let regList = data || [];
        if (res.errCode !== Const.successCode) {
          return Promise.reject(res);
        }
  
        regList = regList.sort(new Compare("seqNo").minToMax());
        let newRegList = [];
        for (let regItem of regList) {
          let item = new RegListItem();
          item.cityId = regItem.cityId || "";
          item.positionX = regItem.positionX || "";
          item.positionY = regItem.positionY || "";
          item.regId = regItem.regId || "";
          item.regName = regItem.regName || "";
          item.seqNo = regItem.seqNo || 0;
          item.vertifyFlag = regItem.vertifyFlag || 1;
          newRegList.push(item);
        }
        let newRegMap = {};
        
        newRegMap[this.request.cityId] = newRegList;
        SetBaseInfoModel.setRegMap(newRegMap);
        console.log(newRegMap)
        let sectionList = data.sectionList || [];
        let newSectionMap = {};
        for (let info of sectionList) {
          newSectionMap[info.regId] = newSectionMap[info.regId] || [];
          newSectionMap[info.regId].push(info);
        }
        SetBaseInfoModel.setSectionMap(newSectionMap);
        return res;
      })
  }
}
