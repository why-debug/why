import { ErpCommon } from "../utils/ErpCommon";

// 获取登录信息
export class GetLoginModel {
    // clientKey
    static getClientKey() {
      let clientKey = new ErpCommon().getOperator('CLIENTKEY') || ''
      if (!!clientKey) window.clientKey = clientKey
      return window.clientKey || "3b425b5e9e49b7ee014ebba5bcc33b01"

    }

}