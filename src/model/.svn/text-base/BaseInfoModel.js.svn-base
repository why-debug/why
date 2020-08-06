import {DefaultModel} from "../common/model/DefaultModel";
import {GetLoginModel} from "./LoginModel";

// 基本信息model
export class BaseInfoModel extends DefaultModel{
  constructor() {
    super();
  }

  getKey() {
    return "BaseInfoModel";
  }

  getIsLocation() {
    return false;
  }
}

export class GetBaseInfoModel {
  // 获取所有的位置信息
  static getAllPositionInfo() {
    return new BaseInfoModel().getModel("allPositionInfo") || {};
  }

  // 获取区域列表
  static getRegList(cityId = GetLoginModel.getCityId()) {
    let regMap = new BaseInfoModel().getModel("regMap") || {};
    return regMap[cityId] || [];
  }

  // 获取商圈列表
  static getSectionList(regId = "") {
    let sectionMap = new BaseInfoModel().getModel("sectionMap") || {};
    return sectionMap[regId] || [];
  }

  // 获取省份列表
  static getProvinceList(countryId = GetLoginModel.getCountryId()) {
    let map = new BaseInfoModel().getModel("provinceMap") || {};
    return map[countryId] || [];
  }

  // 获取城市列表
  static getCityList(provinceId = "") {
    let cityMap = new BaseInfoModel().getModel("cityMap") || {};
    return cityMap[provinceId] || [];
  }

  // 获取国家列表
  static getCountryList() {
    return new BaseInfoModel().getModel("countryList") || [];
  }

  // 获取均价列表
  static getUnitPriceList(id = "") {
    let map = new BaseInfoModel().getModel("unitPriceMap") || {};
    return map[id] || [];
  }
  // 获取均价单位
  static getEveryPriceUnit() {
    return new BaseInfoModel().getModel("everyPriceUnit");
  }

  // 获取总价列表
  static getAllPriceList(id = "") {
    let map = new BaseInfoModel().getModel("allPriceMap") || {};
    return map[id] || [];
  }
  // 获取总价单位
  static getAllPriceUnit() {
    return new BaseInfoModel().getModel("allPriceUnit");
  }

  // 获取权限列表
  static getUserOpers() {
    return new BaseInfoModel().getModel("userOpers") || [];
  }
}

export class SetBaseInfoModel {
  // 设置所有的位置信息
  static setAllPositionInfo(allPositionInfo = {}) {
    new BaseInfoModel().setModel(allPositionInfo, "allPositionInfo");
  }

  // 设置区域map
  static setRegMap(regMap) {
    let map = new BaseInfoModel().getModel("regMap") || {};
    for (let key in regMap) {
      map[key] = regMap[key];
    }
    new BaseInfoModel().setModel(map, "regMap");
  }

  // 设置商圈map
  static setSectionMap(sectionMap) {
    let map = new BaseInfoModel().getModel("sectionMap") || {};
    for (let key in sectionMap) {
      map[key] = sectionMap[key];
    }
    new BaseInfoModel().setModel(map, "sectionMap");
  }

  // 设置省份map
  static setProvinceMap(provinceMap = {}) {
    let map = new BaseInfoModel().getModel("provinceMap") || {};
    for (let key in provinceMap) {
      map[key] = provinceMap[key];
    }
    new BaseInfoModel().setModel(map, "provinceMap");
  }

  // 设置城市map
  static setCityMap(cityMap = {}) {
    let map = new BaseInfoModel().getModel("cityMap") || {};
    for (let key in cityMap) {
      map[key] = cityMap[key];
    }
    new BaseInfoModel().setModel(map, "cityMap");
  }

  // 设置国家列表
  static setCountryList(countryList) {
    new BaseInfoModel().setModel(countryList, "countryList");
  }

  // 设置单位价格map
  static setUnitPriceMap(unitPriceMap = {}) {
    let map = new BaseInfoModel().getModel("unitPriceMap") || {};
    for (let key in unitPriceMap) {
      map[key] = unitPriceMap[key];
    }
    new BaseInfoModel().setModel(map, "unitPriceMap");
  }
  // 设置均价单位
  static setEveryPriceUnit(everyPriceUnit = "万") {
    new BaseInfoModel().setModel(everyPriceUnit, "everyPriceUnit");
  }

  // 设置总价map
  static setAllPriceMap(allPriceMap = {}) {
    let map = new BaseInfoModel().getModel("allPriceMap") || {};
    for (let key in allPriceMap) {
      map[key] = allPriceMap[key];
    }
    new BaseInfoModel().setModel(map, "allPriceMap");
  }
  // 设置总价单位
  static setAllPriceUnit(allPriceUnit = "万") {
    new BaseInfoModel().setModel(allPriceUnit, "allPriceUnit");
  }

  // 设置用户权限列表
  static setUserOpers(userOpers = []) {
    new BaseInfoModel().setModel(userOpers, "userOpers");
  }
}
