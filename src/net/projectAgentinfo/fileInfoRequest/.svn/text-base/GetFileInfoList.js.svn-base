

// 补充合同资料 列表
import { PostRequest } from "../../../common/net/PostRequest";
import { APIRequest } from "../../../common/net/API";
import { Const } from "../../../common/utils/Const";
import { ErpCommon } from "../../../utils/ErpCommon";

//请求参数 页面
export class ContractInfoListParameter extends APIRequest {
    companyId = '';//组织id
    borkerId = ''; //申请人id
    name = ''; //原合同名称
    statu = ''; //审批状态
    type = ''; //印章类型
    keyWords = "";//模糊搜素
    pageNum = 1;//分页加载(当前页面)
    pageRows = 30; //每页请求条数

    constructor() {
        super();
    }
}
//请求参数 接口
export class PortContractInfoListParameter extends APIRequest {

    constructor(obj = new ContractInfoListParameter()) {
        super();
        this.export = obj.export || 0;//是否导出
        this.orgId = this.getStatus(obj.companyId);//组织id
        this.applyUserId = this.getStatus(obj.borkerId);//申请人id
        this.dealName = this.getStatus(obj.name);//原合同名称
        this.auditStatus = this.getStatus(obj.statu);//审批状态
        this.keyWords = this.getStatus(obj.keyWords);//模糊搜素
        this.stampType = this.getStatus(obj.type);//印章类型
        this.pageOffset = this.getStatus(obj.pageNum);//分页加载(当前页面)
        this.pageRows = this.getStatus(obj.pageRows);//每页请求条数
    }

    // 判断值是否存在
    getStatus(val) {
        if (val != undefined) {
            return val;
        } else {
            return '';
        }
    }
}

// 接口地址
class ContractInfoListRequestApi extends PostRequest {
    constructor(request = new PortContractInfoListParameter()) {
        super(request);
    }

    getUrl() {
        return "/newBuildWeb/broker/build/supplementaryAttachmentsList";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }

    getNeedToken() {
        return true;
    }

    // // 转义 qs
    // getNeedQs() {
    //     return true;
    // }
}

// 定义接口返回值 字段
export class ContractInfoListArray {
    check = false;//当前是否选择
    id = ''; //主键id
    dealId = ""; //合同id
    fileName = '';//盖章文件
    share = ''; //份数
    page = ''; //页数
    apply = ''; //申请人
    applyOrg = ''; //申请组织
    applyNum = ''; //申请编号;
    sealType = ''; //印章类型
    sealTypeText = '';//印章类型文本
    review = ''; //原合同当前审批人
    reviewStatu = ''; //原和同审核状态
    reviewStatuText = '';//原和同审核状态text
    contractNum = ''; //原合同申请编号
    contactName = ''; //原合同名称

    getReviewStatu(num) {
        let map = new Map()
            .set(0, "未审批")
            .set(1, "审批中")
            .set(-1, "已驳回")
            .set(2, "已审批")
            .set(-2, "已作废");
        if (!map.has(num)) return "--";
        return map.get(num);
    }

    //判断盖章类型
    getSealType(num) {
        let map = new Map()
            .set(1, "合同章")
            .set(2, "公章")
            .set(3, "法人章")
            .set(4, "业务专用章")
            .set(5, "财务专用章");
        if (!map.has(num)) return "--";
        return map.get(num);
    }
    //获取盖章类型text
    getSealTypeText(val) {
        if (val.indexOf(',') != -1) {
            let arr = val.split(',');
            let text = '';
            for (let item of arr) {
                text += this.getSealType(Number(item)) + ' ';
            }
            return text;
        }
        return val;
    }

    // 判断值是否存在
    getStatus(val) {
        if (val != undefined) {
            return val;
        } else {
            return '';
        }
    }
}

// 发起请求
export class GetContractInfoList {
    request;
    constructor(request = new PortContractInfoListParameter()) {
        this.request = request;
    }

    send() {
        return new ContractInfoListRequestApi(this.request).send()
            .then((res) => {
                console.log("补充合同资料处理前数据: ", res);
                if (res.errCode !== Const.successCode) {
                    return Promise.reject(res);
                }
                let list = res.data.dataList;

                // let list = [
                //     {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },  {
                //         id: 1,
                //         fileName : '妮蔻.text', //盖章文件
                //         servings : '5',  //份数
                //         pages : '3',  //页数 
                //         applyUserName : '李四',  //申请人
                //         orgName : '大圆办公室',  //申请组织
                //         serialNumber : 'FFa5666',  //申请编号,
                //         stampType : '法人章',  //印章类型
                //         userName : '王五',  //原合同当前审批人
                //         auditStatus : 1,  //原和同审核状态
                //         applicationNo : 'Fd68465',  //原合同申请编号
                //         contactName : '股份对哦',  //原合同名称
                //     },
                // ]
                let response = {};
                let contactInfoList = [];

                for (let info of (list || [])) {
                    let item = new ContractInfoListArray();

                    item.id = item.getStatus(info.id);  //主键id
                    item.check = false;//当前选中
                    item.dealId = item.getStatus(info.dealId);  //合同id
                    item.fileName = item.getStatus(info.fileName);  //盖章文件
                    item.share = item.getStatus(info.servings);    //份数
                    item.page = item.getStatus(info.pages);      //页数
                    item.apply = item.getStatus(info.applyUserName);    //申请人
                    item.applyOrg = item.getStatus(info.orgName);  //申请组织
                    item.applyNum = item.getStatus(info.serialNumber);  //申请编号,
                    item.sealType = item.getStatus(info.stampType);  //印章类型
                    item.sealTypeText = item.getSealTypeText(item.sealType);//盖章类型文本
                    item.review = item.getStatus(info.userName);  //原合同当前审批人
                    item.reviewStatu = item.getStatus(info.auditStatus);    //原合同审核状态 num
                    item.reviewStatuText = item.getReviewStatu(item.reviewStatu);    //原和同审核状态 text

                    item.contractNum = item.getStatus(info.applicationNo);    //原合同申请编号
                    item.contactName = item.getStatus(info.dealName);    //原合同名称

                    contactInfoList.push(item);
                }

                response.contactInfoList = contactInfoList;
                response.total = res.total

                return response;
            })
            .catch((res) => {
                console.log(res, '--catch--');
                new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
            })
    }
}
