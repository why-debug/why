import { PostRequest } from "../../common/net/PostRequest";
import { APIRequest } from "../../common/net/API";

/**
 * 图片上传 FileUpload
 */
export class FileUploadRequest extends APIRequest {
    data = {}
    constructor(obj = {}) {
        super();
        this.data = obj.data || {};
    }
}
export class FileUpload extends PostRequest {
    constructor(responseData = new FileUploadRequest()) {
        super(responseData);
    }

    getUploadFileUrl(){
        console.log('getUploadFileUrlgetUploadFileUrlgetUploadFileUrl:',this.getApiDomain()  + this.getUrl());
        return this.getApiDomain()  + this.getUrl();
    }

    getUrl() {
        let url = ''
        //dev 环境运行
        if (process.env && process.env.NODE_ENV == 'development') {
            url =  '/houseWeb/common/upload';
        }else{
            url = '/Api/Api/uploadFile'
        }
        return url;
    }
    getApiDomain(){
        return process.env.VUE_APP_ML_JAVA;
    }
}
