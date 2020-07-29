// PC - 银行字典接口

import { PostRequest } from "@/common/net/PostRequest";
import { APIRequest, APIResponse } from "@/common/net/API";
import {Const} from "../../common/utils/Const";
import {ErpCommon} from "../../utils/ErpCommon";


// 银行字典 - 查询主行列表
export class GetBankDicListRequest extends APIRequest {
    bankName = ""; // 主行名称
    constructor (obj = {}) {
        super();
        this.bankName = obj.bankName || '';
    }
}
class GetBankDicListApi extends PostRequest {
    constructor (request = new GetBankDicListRequest()) {
        super(request);
    }

    getUrl () {
        return "/erpWeb/bankDic/getBankDicList";
    }

    getNeedToken() {
        return true;
    }
}
export class GetBankDicListResponse extends APIResponse {
    list = []; // 主行列表
    constructor () {
        super();
    }
}

export class GetBankDicListItem {
    id = ""; //银行ID
    compId = ""; //公司ID
    cityId = ""; //城市ID
    bankNumber = ""; //序号
    bankName = ""; //银行名
    bankDescription = ""; //描述

    getNullValue(){
        return '';
    }

    getDefaultVal() {
        return '--';
    }
}
export class GetBankDicList {
    request;
    constructor (request = new GetBankDicListRequest()) {
        this.request = request;
    }

    send () {
        return new GetBankDicListApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                let response = new GetBankDicListResponse();
                let newList = [];
                for (let info of (res.data || [])){
                    let item = new GetBankDicListItem();
                    item.id = info.id || item.getNullValue();
                    item.compId = info.compId || item.getNullValue();
                    item.cityId = info.cityId || item.getNullValue();
                    item.bankNumber = info.bankNumber || item.getNullValue();
                    item.bankName = info.bankName || item.getNullValue();
                    item.bankDescription = info.bankDescription || item.getNullValue();
                    newList.push(item);
                }
                response.list = newList;
                return response;
            })
            .catch((res)=>{
                console.log(res,'--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

// 银行字典 - 添加主行
export class AddBankDicRequest extends APIRequest {
    bankName = ""; // 主行名称
    bankNumber = ""; // 序号
    bankDescription = ""; // 描述
    constructor (obj = {}) {
        super();
        this.bankName = obj.bankName || '';
        this.bankNumber = obj.bankNumber || '';
        this.bankDescription = obj.bankDescription || '';
    }
}
export class AddBankDicApi extends PostRequest {
    constructor (request = new AddBankDicRequest()) {
        super(request);
    }

    getUrl () {
        return "/erpWeb/bankDic/addBankDic";
    }

    getNeedToken() {
        return true;
    }
}
export class AddBankDic {
    request;
    constructor (request = new AddBankDicRequest()) {
        this.request = request;
    }

    send () {
        return new AddBankDicApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                return res;
            })
            .catch((res)=>{
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

// 银行字典 - 修改主行
export class UpdateBankDicRequest extends APIRequest {
    bankName = ""; // 主行名称
    bankNumber = ""; // 序号
    bankDescription = ""; // 描述
    id = "";
    constructor (obj = {}) {
        super();
        this.bankName = obj.bankName || '';
        this.bankNumber = obj.bankNumber || '';
        this.bankDescription = obj.bankDescription || '';
        this.id = obj.id || '';
    }
}
export class UpdateBankDicApi extends PostRequest {
    constructor (request = new UpdateBankDicRequest()) {
        super(request);
    }

    getUrl () {
        return "/erpWeb/bankDic/updateBankDic";
    }

    getNeedToken() {
        return true;
    }
}
export class UpdateBankDic {
    request;
    constructor (request = new UpdateBankDicRequest()) {
        this.request = request;
    }

    send () {
        return new UpdateBankDicApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                return res;
            })
            .catch((res)=>{
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

// 银行字典 - 删除主行
export class DeleteBankDicRequest extends APIRequest {
    cityId = ""; // 城市id
    compId = ""; // 公司id
    id = "";
    constructor (obj = {}) {
        super();
        this.cityId = obj.cityId || '';
        this.compId = obj.compId || '';
        this.id = obj.id || '';
    }
}
export class DeleteBankDicApi extends PostRequest {
    constructor (request = new DeleteBankDicRequest()) {
        super(request);
    }
    getUrl () {
        return "/erpWeb/bankDic/deleteBankDic";
    }
    getNeedToken() {
        return true;
    }
}
export class DeleteBankDic {
    request;
    constructor (request = new DeleteBankDicRequest()) {
        this.request = request;
    }
    send () {
        return new DeleteBankDicApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                return res;
            })
            .catch((res)=>{
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

// 银行字典 - 查询分行列表
export class GetBranchBankDicListRequest extends APIRequest {
    bankProvince = ""; // 省份id
    bankCity = ""; // 城市id
    bankNameOrAddress = ""; // 分行名或地址模糊查询
    parentBankId = ""; // 父行Id
    constructor (obj = {}) {
        super();
        this.bankProvince = obj.bankProvince || '';
        this.bankCity = obj.bankCity || '';
        this.bankNameOrAddress = obj.bankNameOrAddress || '';
        this.parentBankId = obj.parentBankId || '';
    }
}
class GetBranchBankDicListApi extends PostRequest {
    constructor (request = new GetBranchBankDicListRequest()) {
        super(request);
    }
    getUrl () {
        return "/erpWeb/bankDic/getBranchBankDicList";
    }

    getNeedToken() {
        return true;
    }
}
export class GetBranchBankDicListResponse extends APIResponse {
    list = []; // 主行列表
    constructor () {
        super();
    }
}

export class GetBranchBankDicListItem {
    id = ""; // 分行id
    cityId = "";
    compId = "";
    branchBankName = ""; // 该分行名
    parentBankId = ""; // 父行ID
    bankAddress = ""; // 分行地址
    bankProvince = ""; // 省份
    bankCity = ""; // 城市
    bankCode = ""; // 银行编码
    bankFax = ""; // 传真
    bankName = ""; // 父行名
    superOrganization = ""; // 上级机构
    linkmanName = ""; // 联系人
    isChurchyard = ""; // 是否境内
    contactPhone = ""; // 联系电话
    bankRemark = ""; // 备注

    getNullValue(){
        return '';
    }
    getDefaultVal() {
        return '--';
    }
}
export class GetBranchBankDicList {
    request;
    constructor (request = new GetBranchBankDicListRequest()) {
        this.request = request;
    }

    send () {
        return new GetBranchBankDicListApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                let response = new GetBranchBankDicListResponse();
                let newList = [];
                for (let info of (res.data || [])){
                    let item = new GetBranchBankDicListItem();
                    item.id = info.id || item.getNullValue();
                    item.compId = info.compId || item.getNullValue();
                    item.cityId = info.cityId || item.getNullValue();
                    item.branchBankName = info.branchBankName || item.getNullValue();
                    item.parentBankId = info.parentBankId || item.getNullValue();
                    item.bankAddress = info.bankAddress || item.getNullValue();
                    item.bankProvince = info.bankProvince || item.getNullValue();
                    item.bankCity = info.bankCity || item.getNullValue();
                    item.bankCode = info.bankCode || item.getNullValue();
                    item.bankFax = info.bankFax || item.getNullValue();
                    item.bankName = info.bankName || item.getNullValue();
                    item.superOrganization = info.superOrganization || item.getNullValue();
                    item.linkmanName = info.linkmanName || item.getNullValue();
                    item.isChurchyard = info.isChurchyard == 1 ? '是' :'否';
                    item.contactPhone = info.contactPhone || item.getNullValue();
                    item.bankRemark = info.bankRemark || item.getNullValue();

                    newList.push(item);
                }
                response.list = newList;
                return response;
            })
            .catch((res)=>{
                console.log(res,'--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

// 银行字典 - 添加分行
export class AddBranchBankDicRequest extends APIRequest {
    bankAddress = ""; // 地址
    bankProvince = ""; // 省份
    bankCity = ""; // 城市
    bankCode = ""; // 银行编码
    bankFax = ""; // 传真
    bankRemark = ""; // 备注
    branchBankName = ""; // 分行名字
    contactPhone = ""; // 联系电话
    isChurchyard = ""; // 是否境内 0:否 1：是
    linkmanName = ""; // 联系人
    parentBankId = ""; // 父行ID
    bankName = ""; // 父行名字
    constructor (obj = {}) {
        super();
        this.bankAddress = obj.bankAddress || '';
        this.bankProvince = obj.bankProvince || '';
        this.bankCity = obj.bankCity || '';
        this.bankCode = obj.bankCode || '';
        this.bankFax = obj.bankFax || '';
        this.bankRemark = obj.bankRemark || '';
        this.branchBankName = obj.branchBankName || '';
        this.contactPhone = obj.contactPhone || '';
        this.isChurchyard = obj.isChurchyard || '';
        this.linkmanName = obj.linkmanName || '';
        this.parentBankId = obj.parentBankId || '';
        this.bankName = obj.bankName || '';
    }
}
export class AddBranchBankDicApi extends PostRequest {
    constructor (request = new AddBankDicRequest()) {
        super(request);
    }

    getUrl () {
        return "/erpWeb/bankDic/addBranchBankDic";
    }

    getNeedToken() {
        return true;
    }
}
export class AddBranchBankDic {
    request;
    constructor (request = new AddBranchBankDicRequest()) {
        this.request = request;
    }

    send () {
        return new AddBranchBankDicApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                return res;
            })
            .catch((res)=>{
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

// 银行字典 - 修改分行
export class UpdateBanchBankDicRequest extends APIRequest {
    bankAddress = ""; // 地址
    bankProvince = ""; // 省份
    bankCity = ""; // 城市
    bankCode = ""; // 银行编码
    bankFax = ""; // 传真
    bankRemark = ""; // 备注
    branchBankName = ""; // 分行名字
    contactPhone = ""; // 联系电话
    isChurchyard = ""; // 是否境内 0:否 1：是
    linkmanName = ""; // 联系人
    parentBankId = ""; // 父行ID
    bankName = ""; // 父行名字
    id = "";
    constructor (obj = {}) {
        super();
        this.bankAddress = obj.bankAddress || '';
        this.bankProvince = obj.bankProvince || '';
        this.bankCity = obj.bankCity || '';
        this.bankCode = obj.bankCode || '';
        this.bankFax = obj.bankFax || '';
        this.bankRemark = obj.bankRemark || '';
        this.branchBankName = obj.branchBankName || '';
        this.contactPhone = obj.contactPhone || '';
        this.isChurchyard = obj.isChurchyard || '';
        this.linkmanName = obj.linkmanName || '';
        this.parentBankId = obj.parentBankId || '';
        this.bankName = obj.bankName || '';
        this.id = obj.id || '';
    }
}
export class UpdateBanchBankDicApi extends PostRequest {
    constructor (request = new UpdateBanchBankDicRequest()) {
        super(request);
    }

    getUrl () {
        return "/erpWeb/bankDic/updateBanchBankDic";
    }

    getNeedToken() {
        return true;
    }
}
export class UpdateBanchBankDic {
    request;
    constructor (request = new UpdateBanchBankDicRequest()) {
        this.request = request;
    }

    send () {
        return new UpdateBanchBankDicApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                return res;
            })
            .catch((res)=>{
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}

// 银行字典 - 删除分行
export class DeleteBranchBankDicRequest extends APIRequest {
    id = "";
    constructor (obj = {}) {
        super();
        this.id = obj.id || '';
    }
}
export class DeleteBranchBankDicApi extends PostRequest {
    constructor (request = new DeleteBranchBankDicRequest()) {
        super(request);
    }

    getUrl () {
        return "/erpWeb/bankDic/deleteBranchBankDic";
    }

    getNeedToken() {
        return true;
    }
}
export class DeleteBranchBankDic {
    request;
    constructor (request = new DeleteBranchBankDicRequest()) {
        this.request = request;
    }

    send () {
        return new DeleteBranchBankDicApi(this.request).send()
            .then(res => {
                if (res.errCode !== Const.successCode) return Promise.reject(res);

                return res;
            })
            .catch((res)=>{
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}
