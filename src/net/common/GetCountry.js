

import {PostRequest} from "../../common/net/PostRequest";
import {APIRequest} from "../../common/net/API";
import {Const} from "../../common/utils/Const";
import {GetBaseInfoModel, SetBaseInfoModel} from "../../model/BaseInfoModel";
import {GetInitInfoList, GetInitInfoListRequest} from "./GetInitInfo";

// 获取国家
export class GetCountryListRequest extends APIRequest{
  tabType = "";
  constructor(tabType = "") {
    super();
    this.tabType = tabType;
  }
}

export class CountryListItem {
  id = "";
  name = "";
}
export class GetCountryList {
  request;
  constructor(request = new GetCountryListRequest()) {
    this.request = request;
  }
  
  send() {
    if (GetBaseInfoModel.getCountryList() && GetBaseInfoModel.getCountryList().length > 0) {
      return Promise.resolve(GetBaseInfoModel.getCountryList());
    }
    
    return new GetInitInfoList(this.request).send()
      .then(res => {
        console.log(res)
        if (res.errCode !== Const.successCode) return Promise.reject(res);
        
        let list = !res.data ? [] : res.data.countryList || [];
        let countryList = [];
        for (let [index, info] of list.entries()) {
          let item = new CountryListItem();
          item.id = info.id || "";
          item.name = info.cnName || "未知";
          countryList.push(item);
        }
        SetBaseInfoModel.setCountryList(countryList);
        return countryList;
      });
  }
}
