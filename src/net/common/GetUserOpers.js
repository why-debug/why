import {Const} from "../../common/utils/Const";
import {ErpCommon} from "../../utils/ErpCommon";
import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import bus from "../../utils/bus";
import {SetBaseInfoModel} from "../../model/BaseInfoModel";


// 获取用户权限列表
export class GetUserOpersRequest extends APIRequest {
  userId = "";
  constructor (obj = {}) {
    super();
    this.userId = obj.userId || '';
  }
}
class GetUserOpersApi extends PostRequest {
  constructor (request = new GetUserOpersRequest()) {
    super(request);
  }

  getUrl () {
    return "/erpWeb/managerCenter/organization/getUserOpers";
  }

  getNeedToken() {
    return true;
  }
}
export class GetUserOpers {
  request;
  constructor (request = new GetUserOpersRequest()) {
    this.request = request;
  }

  send () {
    return new GetUserOpersApi(this.request).send()
      .then(res => {
        if (res.errCode !== Const.successCode) return Promise.reject(res);

        let data = res.data || [];
        let newOpersArray = [];
        for (let info of data){
          if (!info.operId) continue;

          newOpersArray.push(info.operId);
        }

        // 存权限
        SetBaseInfoModel.setUserOpers(newOpersArray);
        // 发送通知
        console.log('--权限初始化完成--');
        bus.$emit("updateUserPermission",true);

        return newOpersArray;
      })
      .catch((res)=>{
        // new ErpCommon().toast('权限初始化失败',"error");
        return [];
      })
  }
}
