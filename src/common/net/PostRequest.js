import {API, ApiPrivateData} from "./API";
import axios from "axios";
import qs from 'qs';

import { GetLoginModel } from "../../model/LoginModel";

export class PostRequest extends API{
  constructor(request) {
    super(request);
  }

  run() {
    const instance = axios.create({
      withCredentials: this.getHeader().withCredentials === undefined
        ? true
        : this.getHeader().withCredentials
    });
    let headers = this.getHeader();
    if (this.getNeedToken() && GetLoginModel.getClientKey()) {
      headers["clientKey"] = GetLoginModel.getClientKey();
    }
    
    //如果是非dev 环境， 需要将 用php环境转
    if (process.env.VUE_APP_ENV_CONFIG != 'dev') {

      // getUrl = getUrl.replace('newBuildWeb', 'houseWeb');
      //新增会话参数
      let requestParam = this.request || {}
      requestParam['clientKey'] = GetLoginModel.getClientKey()
      requestParam['javaApi'] = this.getUrl();

      return instance({
        method: 'post',
        url: '/Api/api/requestRedirect', //PHP相对域名
        data: requestParam,
        headers
      }).then((res) => {
        return res.data;
      });
    }else{
      console.log('2222');
    }

    let domain = this.getApiDomain();
    let url = this.getUrl().indexOf("http") > -1 ? this.getUrl() : domain + this.getUrl();

    return instance({
      method: 'post',
      url,
      data: this.getNeedQs() ? qs.stringify(this.request) : this.request,
      headers
    }).then((res)=>{
      let response = res.data;
      return response;
    });
  }
}
