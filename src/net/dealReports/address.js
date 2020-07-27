import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import { Const } from "@/utils/Const";

/* ---------------------------------------------------------------------------------------------------- */

// 获取省份、城市 - 请求参数
class getProvinceAndCityListRequest extends APIRequest{
  constructor () {
    super();
  }
}
// 获取省份、城市 - 接口地址
class getProvinceAndCityListApi extends PostRequest{
  constructor (request = new getProvinceAndCityListRequest()) {
    super(request);
  }
  
  getUrl () {
    // return "/newBuildWeb/broker/newBuildProject/getInitInfo";
    return "/kdbWeb/openApi/sys/getProvinceAndCityList"
  }

  getNeedToken () {
    return true;
  }
}

class getProvinceAndCityList {
  request;
  constructor (request = new getProvinceAndCityListRequest()) {
    this.request = request;
  }
  
  send () {
    return new getProvinceAndCityListApi(this.request).send().then(res => {
      if (res.errCode !== Const.successCode) return Promise.reject(res);
      
      return res.data;
    });
  }
}

/* ---------------------------------------------------------------------------------------------------- */

export {
  getProvinceAndCityList
}
