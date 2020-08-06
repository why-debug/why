

export class ApiPrivateData {
  static isTokenError = false;
}

// 倒计时
class RequestTimeOut {
  timeoutFun = null;
  timeoutTime = 20000;

  send() {
    return new Promise((resolve, reject) => {
      this.timeoutFun = setTimeout(() => {
        this.timeoutFun = null;
        reject("超时");
      }, this.timeoutTime);
    })
  }
}

export class APIResponse {
  constructor() {}
}

export class APIRequest {
  constructor() {}
}

export class APIErrorResponse extends APIResponse{
  msg = null;
  constructor(msg) {
  super();
  if(msg) {
    this.msg = msg;
  }
}
}

export class API {
  constructor(request) {
    this.request = {};
    for (let k in request) {
      if (request[k] === undefined ||request[k] === null) continue;

      this.request[k] = request[k];
    }
  }

  getApiDomain() {
    return process.env.VUE_APP_ML_PHP;
  };

  getUrl() {
    return "";
  };

  getNeedToken() {
    return true;
  };

  getHeader(){
    return {};
  }

  run() {
    return Promise.resolve();
  };
  
  // 是否需要转义 qs
  getNeedQs() {
    return false;
  }

  send() {
    return new Promise((resolve, reject) => {
      if(!this.getUrl()) {
        reject(new APIErrorResponse("暂无url"));
        return;
      }
      //
      // if(!this.getApiDomain() && this.getUrl().indexOf("http") === -1) {
      //   reject(new APIErrorResponse("暂无域名"));
      //   return;
      // }

      Promise.race([this.run(), new RequestTimeOut().send()])
        .then((response) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    })
  }
}
