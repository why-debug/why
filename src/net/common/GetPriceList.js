

import {PostRequest} from "../../common/net/PostRequest";
import {APIRequest} from "../../common/net/API";
import {Const} from "../../common/utils/Const";
import {GetBaseInfoModel, SetBaseInfoModel} from "../../model/BaseInfoModel";
import {GetInitInfoList} from "./GetInitInfo";

export class PriceListItem {
  id = "";
  name = "";
  minVal = 0;
  maxVal = 0;
}

// 获取均价列表
export class GetUnitPriceListRequest extends APIRequest{
  id = "";
  constructor(id) {
    super();
    this.id = id;
  }
  
  getId() {
    return this.id;
  }
}

export class GetUnitPriceList {
  request;
  constructor(request = new GetUnitPriceListRequest()) {
    this.request = request;
  }
  
  send() {
    return new GetInitInfoList().send()
      .then(res => {
        if (res.errCode !== Const.successCode) return Promise.reject(res);

        let unitList = res.data ? res.data.unitList || [] : [];
        let unit = "万";
        let id = this.request.getId();
        let num;
        let num1;
        let indexUnit=-1;
        if(id.indexOf('provinceId')>-1 ){
          num1=id.substring(id.indexOf('d')+1,id.length)
          indexUnit = unitList.findIndex((val) => {
            return val.provinceId == num1;
          });
        };
        if(id.indexOf('cityId')>-1 ){
          num=id.substring(id.indexOf('d')+1,id.length)
          indexUnit = unitList.findIndex((val) => {
            return val.cityId == num;
          });
        }
        
        if (indexUnit >= 0) {
          unit = unitList[indexUnit].money || unit;
        }
        let list = [
          {
            id: "1万以下",
            name: "1万以下",
            minVal: 0,
            maxVal: 1,
          },
          {
            id: "1-2万",
            name: "1-2万",
            minVal: 1,
            maxVal: 2,
          },
          {
            id: "2-4万",
            name: "2-4万",
            minVal: 2,
            maxVal: 4,
          },
          {
            id: "4-6万",
            name: "4-6万",
            minVal: 4,
            maxVal: 6,
          },
          {
            id: "6-8万",
            name: "6-8万",
            minVal: 6,
            maxVal: 8,
          },
          {
            id: "8-10万",
            name: "8-10万",
            minVal: 8,
            maxVal: 10,
          },
          {
            id: "10万以上",
            name: "10万以上",
            minVal: 10,
            maxVal: "",
          },
          {
            id: "不限",
            name: "不限",
            minVal: "",
            maxVal: ""
          }
        ];
        let newList = [];
        for (let [index, info] of list.entries()) {
          let item = new PriceListItem();
          item.name = info.name.replace(/万/g, unit=="万"?unit:"万"+unit);
          item.minVal = info.minVal;
          item.maxVal = info.maxVal;
          newList.push(item);
        }
        let map =  {};
        map[this.request.getId()] = newList;
        SetBaseInfoModel.setUnitPriceMap(map);
        SetBaseInfoModel.setEveryPriceUnit(unit=="万"?unit:"万"+unit);
        return newList;
      });
  }
}


// 获取总价列表
export class GetAllPriceListRequest extends APIRequest{
  id = "";
  constructor(id) {
    super();
    this.id = id;
  }
  
  getId() {
    return this.id;
  }
}


export class GetAllPriceList {
  request;
  constructor(request = new GetAllPriceListRequest()) {
    this.request = request;
  }
  
  send() {
    return new GetInitInfoList().send()
    .then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);

      let unitList = res.data ? res.data.unitList || [] : [];
      let unit = "万";
      let id = this.request.getId();
      let num;
      let num1;
      let indexUnit=-1;
      if(id.indexOf('provinceId')>-1 ){
        num1=id.substring(id.indexOf('d')+1,id.length)
        indexUnit = unitList.findIndex((val) => {
          return val.provinceId == num1;
        });
      };
      if(id.indexOf('cityId')>-1 ){
        num=id.substring(id.indexOf('d')+1,id.length)
        console.log(num,id)
        indexUnit = unitList.findIndex((val) => {
          return val.cityId == num;
        });
      }
      if (indexUnit >= 0) {
        unit = unitList[indexUnit].money || unit;
      }
      let list = [
        {
          id: "100万以下",
          name: "100万以下",
          minVal: 0,
          maxVal: 100,
        },
        {
          id: "100-300万",
          name: "100-300万",
          minVal: 100,
          maxVal: 300,
        },
        {
          id: "300-500万",
          name: "300-500万",
          minVal: 300,
          maxVal: 500,
        },
        {
          id: "500-800万",
          name: "500-800万",
          minVal: 500,
          maxVal: 800,
        },
        {
          id: "800-1000万",
          name: "800-1000万",
          minVal: 800,
          maxVal: 1000,
        },
        {
          id: "1000万以上",
          name: "1000万以上",
          minVal: 1000,
          maxVal: "",
        },
        {
          id: "不限",
          name: "不限",
          minVal: "",
          maxVal: ""
        }
      ];
      let newList = [];
      for (let [index, info] of list.entries()) {
        let item = new PriceListItem();
        item.id = index+1;
        item.name = info.name.replace(/万/g, unit=="万"?unit:"万"+unit);
        item.minVal = info.minVal;
        item.maxVal = info.maxVal;
        newList.push(item);
      }
      let map =  {};
      map[this.request.getId()] = newList;
      SetBaseInfoModel.setAllPriceMap(map);
      SetBaseInfoModel.setAllPriceUnit(unit=="万"?unit:"万"+unit);
      return newList;
    });
  }
}
