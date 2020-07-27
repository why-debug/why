

import Cookies from "js-cookie";

class ModelMap {
  static map = new Map();

  static setMap(key, val) {
    this.map.set(key, val);
  }

  static getMap(key) {
    if (!this.map.has(key)) return null;

    return this.map.get(key);
  }
}

export class DefaultModel {
  getKey() {
    return "";
  };

  // 是否保存到缓存
  getIsLocation() {
    return false;
  };

  setModel(val, id = "") {
    let Obj = ModelMap.getMap(this.getKey()) || {};
    if (this.getIsLocation()) {
      Obj = JSON.parse(Cookies.get(this.getKey()) || "{}");
    }
    if (typeof id != 'undefined') {
      Obj[id] = val;
    } else {
      Obj = val;
    }
    if(this.getIsLocation()) {
      Cookies.set(this.getKey(), JSON.stringify(Obj));
    }
    ModelMap.setMap(this.getKey(), Obj);
  }

  getModel(id = "") {
    let obj = {};
    if (!this.getIsLocation()) {
      obj = ModelMap.getMap(this.getKey()) || {};
    }else {
      obj = JSON.parse(Cookies.get(this.getKey()) || "{}");
    }
    let val = null;
    if(id !== 0 && !id) {
      val = obj || null;
      if(typeof obj == 'object' && Object.keys(obj).length === 0) {
        val = null;
      }
    }else {
      val = obj[id] || null;
    }
    return val;
  }

  removeModel(key = "") {
    key = key || this.getKey();
    let Obj = ModelMap.getMap(this.getKey()) || {};
    if (key) {
      delete Obj[key];
      ModelMap.setMap(this.getKey(), Obj);
    }
    if(this.getIsLocation()) {
      Cookies.remove(this.getKey());
    }
  }

  clearModel() {
    Cookies.clear();
  }
}
