
// 选择合同
import {PostRequest} from "../../common/net/PostRequest";
import {APIRequest} from "../../common/net/API";
import {Const} from "../../common/utils/Const";

//参数
export class ContractRequestParameter extends APIRequest{
    dealName='';//合同名称
    constructor(obj = {}) {
        super();
        this.dealName = obj.dealName || "";
    }
}

// 接口地址
class ContractRequestApi extends PostRequest{
    constructor(request = new ContractRequestParameter()) {
        super(request);
    }

    getUrl() {
        return "/newBuildWeb/broker/build/getContractList";
        // return "/newBuildWeb/broker/newBuildCustomer/getBuildProjectList";
    }

    getNeedToken() {
        return true;
    }

    // 转义 qs
    getNeedQs() {
    return true;
    }
}

// 定义接口返回值 字段
export class ContractListArray {
    dealId = ""; //合同id
    check = false;//是否选中
    contractNum='';//合同编号
    contractName='';//合同名称
    extensionName='';//推广名
    signName='';//注册名
    contractDateStart='';// 合同期限开始
    contractDateEnd='';// 合同期限结束
    auditor='';//当前审核人
    statu='';//当前状态
    statuText='';//文字表述


    getStatuText(num){
        let statu = Number(num)
        let map = new Map()
            .set(1, "审核中")
            .set(2, "已审核")
            .set(3, "已驳回")
            .set(4, "已同意");
        if (!map.has(statu)) return "--";
        return map.get(statu);
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
export class GetContractList {
  request;
  constructor(request = new ContractRequestParameter()){
    this.request = request;
  }

  send(){

    return new ContractRequestApi(this.request).send()
    .then((res)=>{
        console.log(res,'这是一个帅哥');
        if (res.errCode !== Const.successCode){
            return Promise.reject(res);
        }

          if(!res || !res.data) return [];
          let list = res.data;
        // let list = [
        //     {
        //         dealId : 1,// 合同id
        //         applicationNo: 'vsd55165', //申请编号
        //         dealName: '师傅大哥', //合同名称
        //         buildName: '大的', //推广名
        //         mlLoginName: '萨达发', //注册名
        //         agencyTermStart: '2020-01-16 ', // 合同期限开始
        //         agencyTermEnd: '2020-02-16 ', // 合同期限结束
        //         userName: '李四', //当前审核人
        //         auditStatus: '1', //当前状态
        //     },
        //     {
        //         dealId : 2,// 合同id
        //         applicationNo: 'vsd55165', //申请编号
        //         dealName: '师傅大哥', //合同名称
        //         buildName: '大的', //推广名
        //         mlLoginName: '萨达发', //注册名
        //         agencyTermStart: '2020-01-16 ', // 合同期限开始
        //         agencyTermEnd: '2020-02-16 ', // 合同期限结束
        //         userName: '李四', //当前审核人
        //         auditStatus: '1', //当前状态
        //     },
        //     {
        //         dealId : 3,// 合同id
        //         applicationNo: 'vsd55165', //申请编号
        //         dealName: '师傅大哥', //合同名称
        //         buildName: '大的', //推广名
        //         mlLoginName: '萨达发', //注册名
        //         agencyTermStart: '2020-01-16 ', // 合同期限开始
        //         agencyTermEnd: '2020-02-16 ', // 合同期限结束
        //         userName: '李四', //当前审核人
        //         auditStatus: '1', //当前状态
        //     },
        // ];
        let contractList = [];
        for( let info of (list || [])){ 
            let item = new ContractListArray();

            item.dealId = item.getStatus(info.dealId);// 合同id
            item.check = false;// 是否选中
            item.contractNum = item.getStatus(info.applicationNo);// 申请编号
            item.contractName = item.getStatus(info.dealName); //合同名称
            item.extensionName = item.getStatus(info.buildName); //推广名
            item.signName = item.getStatus(info.mlLoginName); //注册名
            item.contractDateStart = item.getStatus(info.agencyTermStart); //合同期限开始
            item.contractDateEnd = item.getStatus(info.agencyTermEnd); //合同期限结束
            item.auditor = item.getStatus(info.userName); //当前审核人
            item.statu = item.getStatus(info.auditStatus); //当前状态
            item.statuText = item.getStatuText(item.statu);//状态文字表述
            
            contractList.push(item);
        }

      return contractList;
    })
  }
}