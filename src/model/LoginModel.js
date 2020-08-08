import { ErpCommon } from "../utils/ErpCommon";

// 获取登录信息
export class GetLoginModel {
    // clientKey
    static getClientKey() {
      let clientKey = new ErpCommon().getOperator('CLIENTKEY') || ''
      if (!!clientKey) window.clientKey = clientKey
      return window.clientKey || "07ee201795709d8c95fdbd12f09f0d96"

    }

}