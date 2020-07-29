import {PostRequest} from "../../common/net/PostRequest";
import {APIRequest} from "../../common/net/API";
import {Const} from "../../common/utils/Const";
import {GetBaseInfoModel, SetBaseInfoModel} from "../../model/BaseInfoModel";

// 获取所有
export class GetInitInfoListRequest extends APIRequest{
  constructor() {
    super();
  }
}

class GetInitInfoListApi extends PostRequest{
  constructor(request = new GetInitInfoListRequest()) {
    super(request);
  }
  
  getUrl() {
    //return "newBuildWeb/broker/newBuildProject/getInitInfo"
    return "/newBuildWeb/broker/newBuildProject/getPcAppHasDataCity"
  }

  getNeedToken() {
    return true;
  }
}

export class GetInitInfoList {
  request;
  constructor(request = new GetInitInfoListRequest()) {
    this.request = request;
  }
  
  send() {
    if (GetBaseInfoModel.getAllPositionInfo() 
      && GetBaseInfoModel.getAllPositionInfo().data
      && GetBaseInfoModel.getAllPositionInfo().data.countryList) {
      return Promise.resolve(GetBaseInfoModel.getAllPositionInfo());
    }
    
    return new GetInitInfoListApi(this.request).send()
      .then(res => {
        if (res.errCode !== Const.successCode) return Promise.reject(res);
        
        SetBaseInfoModel.setAllPositionInfo(res || {});
        return res;
      });
  }
}

