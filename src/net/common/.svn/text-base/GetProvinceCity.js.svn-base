import {PostRequest} from "../../common/net/PostRequest";
import {APIRequest} from "../../common/net/API";
import {Const} from "../../common/utils/Const";
import {GetBaseInfoModel, SetBaseInfoModel} from "../../model/BaseInfoModel";
import {GetLoginModel} from "../../model/LoginModel";
import {GetInitInfoList} from "./GetInitInfo";


// 获取省列表
export class GetProvinceListRequest extends APIRequest{
  countryId = GetLoginModel.getCountryId();
  constructor(countryId) {
    super();
    this.countryId = countryId;
  }
  
  getId() {
    return this.countryId;
  }
}

export class ProvinceListItem {
  id = "";
  name = "";
}
export class GetProvinceList {
  request;
  constructor(request = new GetProvinceListRequest()) {
    this.request = request;
  }
  
  send() {
    if (GetBaseInfoModel.getProvinceList(this.request.getId())
      && GetBaseInfoModel.getProvinceList(this.request.getId()).length > 0) {
      return Promise.resolve(GetBaseInfoModel.getProvinceList(this.request.getId()));
    }

    return new GetInitInfoList().send()
      .then(res => {
        if (res.errCode !== Const.successCode) return Promise.reject(res);
        
        let list = !res.data ? [] : res.data.provinceList || [];
        let obj = {};
        for (let [index, info] of list.entries()) {
          if (!info.countryId || !info.provinceId) continue;
          
          obj[info.countryId] = obj[info.countryId] || [];
          let item = new ProvinceListItem();
          item.id = info.provinceId;
          item.name = info.provinceName || "未知";
         
          obj[info.countryId].push(item);
        }
        console.log("--",obj);
        SetBaseInfoModel.setProvinceMap(obj);
        return obj[this.request.getId()] || [];
      });
  }
}


// 获取城市列表
export class GetCityListRequest extends APIRequest{
  provinceId = "";

  constructor(provinceId = "") {
    super();
    this.provinceId = provinceId;
  }
  
  getId() {
    return this.provinceId;
  }
}

export class CityListItem {
  id = "";
  name = "";
}
export class GetCityList {
  request;
  constructor(request = new GetCityListRequest()) {
    this.request = request;
  }
  
  send() {
    if (GetBaseInfoModel.getCityList(this.request.provinceId)
      && GetBaseInfoModel.getCityList(this.request.provinceId).length > 0) {
      return Promise.resolve(GetBaseInfoModel.getCityList(this.request.provinceId));
    }
    
    return new GetInitInfoList().send()
      .then(res => {
        if (res.errCode !== Const.successCode) return Promise.reject(res);
        
        let list = !res.data ? [] : res.data.cityList || [];
        let provinceList = !res.data ? [] : res.data.provinceList || [];
        let obj = {};
        console.log(list.entries())
        for (let [index, info] of list.entries()) {
          if (!info.cityId || (!info.provinceId && !info.countryId)) continue;
          
          if (!info.provinceId) {
            obj['countryId'+info.countryId] = obj['countryId'+info.countryId] || [];
          }else{
            obj['provinceId'+info.provinceId] = obj['provinceId'+info.provinceId] || [];
          }
          let item = new CityListItem();
          item.id = info.cityId || "";
          item.name = info.cityName || "未知";
          if (!info.provinceId) {
            obj['countryId'+info.countryId].push(item);
          }else{
            obj['provinceId'+info.provinceId].push(item);
          }
        }
        SetBaseInfoModel.setCityMap(obj);
        return obj[this.request.getId()] || [];
      });
  }
}

