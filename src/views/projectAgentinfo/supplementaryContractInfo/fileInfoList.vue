<template>
    <!-- 补充信息 -->
    <div class="g_All">
        <div class="g_topselect">
            <div class="g_selectMenu">
                <div class="u_topSelect"><selectOrg @onSelectChange="f_selectOrg" :empty="empty" :defaultText="'申请组织'"></selectOrg></div>
                <div class="u_topSelect"><selectProjectLeader @onSelectChange="f_getBorker" :projectId="selectOrgId" :empty="empty" :defaultText="'申请人'"></selectProjectLeader></div>
                <div class="u_topSelect"><topSelect @onSelectChange="f_selectAgentName" :defaultText="'原合同名称'" :empty="empty" :defaultList="dealNameList" ></topSelect></div>
                <div class="u_topSelect"><selectRadio :list="auditStatusList" :defaultText="'审批状态'" @onSelectChange="f_auditStatus" :empty="empty" imgSrc="status_200"></selectRadio></div>
                <div class="u_topSelect"><selectRadio :list="stampTypeList" :defaultText="'印章类型'" @onSelectChange="f_stampType" :empty="empty" imgSrc="ownership_200"></selectRadio></div>
            </div>
            <div class="g_btnList">
                <div class="u_btn g_submit" @click="f_submit">查询</div>
                <div class="u_btn" @click="f_clear">重置</div>
            </div>
        </div>
        <div class="g_nav">
            <div class="g_switchLeftList g_flexLeftCenter">
                <div class="u_switch">补充合同资料</div>
            </div>
            <div class="g_otherRightList g_flexLeftCenter">
                <div class="u_export"><searchInput placeholder="请输入申请、归档编号" @Kwd="kwdVal" @kwdSearch="kwdSearch" width="1.7" :empty="searchEmpty"></searchInput></div>
                <div class="u_export" @click="f_addClick(1)" v-if="haveAddAuth"><div class="u_addIcon g_icon"></div> 新增</div>
                <!-- <div class="u_export" @click="f_batchApprovalClick"><div class="u_exportIcon g_icon"></div> 批量审批</div> -->
                <!-- <div class="u_export"><div class="u_ApprovalIcon g_icon"></div> 批量审批</div> -->
                <div class="u_export" @click="f_exportClick" v-if="haveExportAuth"><div class="u_exportIcon g_icon"></div> 导出</div>
                <div class="u_count">共{{ total}}条</div>
            </div>
        </div>
        <div class="g_scroll">
            <div class="g_lists">
                <div class="g_header">
                    <div class="g_lineHeader">
                        <div class="u_lineHeaderContent u_select" @click.stop="allSelect">选</div>
                        <div class="u_lineHeaderContent u_file">盖章文件</div>
                        <div class="u_lineHeaderContent u_share">份数 </div>
                        <div class="u_lineHeaderContent u_page">页数</div>
                        <div class="u_lineHeaderContent u_apply">申请人</div>
                        <div class="u_lineHeaderContent u_applyOrg">申请组织</div>
                        <div class="u_lineHeaderContent u_applyNum">申请编号</div>
                        <div class="u_lineHeaderContent u_sealType">印章类型 </div>
                        <div class="u_lineHeaderContent u_review">原合同当前审批人</div>
                        <div class="u_lineHeaderContent u_reviewStatu">原合同当前审核状态</div>
                        <div class="u_lineHeaderContent u_contractNum">原合同申请编号 </div>
                        <div class="u_lineHeaderContent u_contractName">原合同名称</div>
                    </div>
                </div>
                <div class="g_list" v-if="allList && allList.length > 0"  
                    v-infinite-scroll="!isScroll?'':scrollBottom"
                     infinite-scroll-distance="10"
                     infinite-scroll-immediate="false"
                    >
                    <div class="g_lineList" v-for="(item,index) in allList" :key="index" @dblclick="f_companyDetails(item.id)">
                        <div class="u_lineListContent u_select">
                            <!-- <el-checkbox v-model="isEffeciveList" :label="index"></el-checkbox> -->
                            <el-checkbox v-model="item.check" :label="index"></el-checkbox>
                        </div>
                        <div class="u_lineListContent u_file" :title="item.fileName || '--'">{{ item.fileName || '--' }}</div>
                        <div class="u_lineListContent u_share" :title="item.share || '--'">{{ item.share || '--' }}</div>
                        <div class="u_lineListContent u_page">
                            <div class="g_share" :title="item.page || '--'">{{ item.page || '--' }}</div>
                            <div class="g_eventList">
                                <div class="g_flexLeftCenter g_iconHover" @click="f_addClick(2,item.id)" v-if="haveEditAuth">
                                    <div class="u_editIcon"></div>
                                    <div class="g_text">编辑</div>
                                </div>
                                <!-- <div class="g_flexLeftCenter g_iconHover">
                                    <div class="u_printIcon"></div>
                                    <div class="g_text">打印</div>
                                </div>
                                <div class="g_flexLeftCenter g_iconHover">
                                    <div class="u_verifyIcon"></div>
                                    <div class="g_text">审核</div>
                                </div> -->
                            </div>
                        </div>
                        <div class="u_lineListContent u_apply" :title="item.apply || '--'">{{ item.apply || '--' }}</div>
                        <div class="u_lineListContent u_applyOrg" :title="item.applyOrg || '--'">{{ item.applyOrg || '--' }}</div>
                        <div class="u_lineListContent u_applyNum" :title="item.applyNum || '--'">{{ item.applyNum || '--' }}</div>
                        <div class="u_lineListContent u_sealType" :title="item.sealTypeText || '--'">{{ item.sealTypeText || '--' }}</div>
                        <div class="u_lineListContent u_review" :title="item.review || '--'">{{ item.review || '--' }}</div>
                        <div class="u_lineListContent u_reviewStatu" :style="{color:item.reviewStatuText=='已审批'?'#008000':'#444444'}" :title="item.reviewStatuText || '--'">{{ item.reviewStatuText }}</div>
                        <div class="u_lineListContent u_contractNum" :title="item.contractNum || '--'">{{ item.contractNum || '--' }}</div>
                        <div class="u_lineListContent u_contractName" :title="item.contactName || '--'">{{ item.contactName || '--' }}</div>
                    </div>
                </div>
                  <div class="no_dataBox"  v-if="!!NoData">
                    <div class="no-data">
                    <img src="../../../assets/images/public/nodate.png" alt="">
                    <div class="no_dataSpan">暂时没有相关数据哦!</div>
                    </div>
                </div>

                <div class="isLoading" v-if="!!isLoad">
                    <img src="../../../assets/images/projectAgentInfo/common/loadIng.gif" />
                </div>
            </div>
        </div>
        <div v-if="isDetailSwitch">
            <fileInfoDetails @f_closeView="f_closeView" :id="id"></fileInfoDetails>
        </div>
        <div v-if="isFileInfoItem">
            <addFileInfoItem @f_closeView="f_closeView" :contractId="contractId" :statu="statu" :id="id"></addFileInfoItem>
        </div>
    </div>
</template>
<script>
import selectName from "../../../components/form/select";
import fileInfoDetails from "./fileInfoDetails";
import topSelect from "../form/topSelect"
import searchInput from "../form/searchInput";
import selectDataTime from "../form/selectDataTime";
import selectRadio from "../../../components/topSelect/selectRadio";
import selectOrg from "../../../components/topSelect/selectOrg.vue";
import selectProjectLeader from "../../../components/topSelect/selectProjectLeader.vue";
import addFileInfoItem from "./addFileInfoItem"
import {ErpCommon} from '../../../utils/ErpCommon'
import {GetUserOpers, GetUserOpersRequest} from "../../../net/common/GetUserOpers";
import {SetBaseInfoModel} from "../../../model/BaseInfoModel";
import {
    ContractInfoListParameter,
    PortContractInfoListParameter,
    ContractInfoListArray,
    GetContractInfoList, 
} from "../../../net/projectAgentinfo/fileInfoRequest/GetFileInfoList";

export default {
    data(){
        return{
            total: 0 ,//列表总共条数
            haveExportAuth:false,//是否有导出权限
            haveEditAuth:false,//是否有编辑权限
            haveAddAuth:false,//是否有新增权限
            isLoad:false,//下拉加载  false加载  true不加载
            NoData:false,//数据是否为空
            allSelectFlag:false,//全选flag，再次点击取反
            searchEmpty:false,//是否清空搜索框
            isDetailSwitch:false, //弹窗 详情 标志
            empty:false, //清空
            isScroll:true,//是否滚动加载
            allList: [], //页面列表数据
            selectOrgId:'',//组织id
            isEffeciveList:[],//当前选中
            dealNameList:[],//原合同名称
            auditStatusList:[
                {id:'',text:'全部'},
                {id:0,text:'未审批'},
                {id:1,text:'审批中'},
                {id:-1,text:'已驳回'},
                {id:2,text:'已审批'},
                {id:-2,text:'已作废'},
                ],//审批状态列表
            stampTypeList:[
                {id:1,text:'合同章'},
                {id:2,text:'公章'},
                {id:3,text:'法人章'},
                {id:4,text:'业务专用章'},
                {id:5,text:'财务专用章'},
            ],//印章类型列表
            topParams:{},//顶部筛选参数
            isFileInfoItem:false,//弹窗 新增 标志
            contractId:0,//编辑选中合同的id
            statu:1,//1 新增, 2 编辑
            id:1,//主键id
            searchParams: {
                export: 0 ,//是否导出 0否 1是
                companyId: '', //组织id
                borkerId: '', //申请人id
                keyWords:'',//模糊搜素
                name: '', //原合同名称
                statu: '', //审批状态
                type: '', //印章类型
                pageNum: 1, //当前页数
                pageRows: 30, //请求条数
            }
        }
    },
    components:{
        selectName,
        selectDataTime,
        selectRadio,
        selectOrg,
        selectProjectLeader,
        searchInput,
        fileInfoDetails,
        addFileInfoItem,
        topSelect
    },
    created(){
        this.topParams = JSON.parse(JSON.stringify(this.searchParams));
        console.log(this.topParams,'这是顶部筛选参数');
        this.initUserOpers();
        this.initContactNameList();
        this.initData();
    },
    methods:{
         //初始化权限
        async initUserOpers(){
            console.log('--补充公司资料权限初始化开始Index--');
            let userId = new ErpCommon().getOperator('USER_ID'); //写死测试userId:20341347 20341322

            if (!userId) return;

            let userOpers = await new GetUserOpers(new GetUserOpersRequest({userId:userId})).send();
            SetBaseInfoModel.setUserOpers(userOpers);
            this.haveExportAuth = this.$UserPermission.SUPPLEMENTARYCpyExportAuth();
            this.haveEditAuth = this.$UserPermission.SUPPLEMENTARYCpyUpdateAuth();
            this.haveAddAuth = this.$UserPermission.SUPPLEMENTARYCpyAddAuth();
            console.log('--补充公司资料权限初始化完成--');
        },
        //初始化顶部原合同名称列表
        initContactNameList(){
             new GetContractInfoList(new PortContractInfoListParameter({export:1})).send()
            .then((res)=>{
                const first = {id: '',text: "全部"};//顶部筛选第一项
                this.dealNameList = this.topSelectList(res.contactInfoList,'dealId','contactName');
                console.log(this.dealNameList,'原合同名称');
                this.dealNameList.unshift(first)
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //初始化列表
        async initData(){
           await new GetContractInfoList(new PortContractInfoListParameter(this.searchParams)).send()
            .then((res)=>{
                console.log(res.contactInfoList);
                this.total = res.total;
                this.allList = res.contactInfoList;
            if (this.allList.length == 0) {
                this.NoData = true;
            }else{
                this.NoData = false;
            }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //触底加载
        scrollBottom() {
            console.log("到底啦");
            if(!this.isScroll) return;
            //下拉加载
            this.isLoad = true;    
            this.isScroll = false;
            this.searchParams.pageNum += 1;
            new GetContractInfoList(new PortContractInfoListParameter(this.searchParams))
                .send()
                .then(res => {
                this.isLoad = false;
                let list = res.contactInfoList || [];
                if(list.length <1) return;
                if(list.length<30){
                    this.isScroll = false;
                }else{
                    this.isScroll = true;
                }
                this.allList = [...this.allList,...list];
                })
                .catch(res => {
                this.isLoad=false
                this.$erpCommon.toast(
                    "服务器开小差了,请稍后再试",
                );
                });
        },
        //顶部筛选列表
        topSelectList(arr,key1,key2){
            let list = [];
            if(arr.length>0){
             for(let info of arr){
                 //数据格式
                 let item = {id:info[key1],text:info[key2]}
                list.push(item)
             }
             return list;
         }
         return list;
        },
        //删除
        f_deletInfo(index){
            this.$erpConfirm({
                msg: '是否确认删除所选分销经纪人? '
            }).then(() => {
                console.log("删除经纪人");
                this.allList.splice(index,1);
            })
            .catch(() => {})
        },
        //组件传值
        f_componentData(data){
            console.log(data);
        },
        //公司详情
        f_companyDetails(id){
            this.id = id;
            this.isDetailSwitch = true;
        },
        //批量审批
        f_batchApprovalClick(){
            console.log(this.isEffeciveList,"isEffeciveList");
        },
        //导出
        async f_exportClick(){
           console.log('这是导出哈哈哈哈');
            let params = {};
            // 导出参数
            let exportParam = {
                export:1,
                companyId: this.searchParams.companyId, //组织id
                borkerId: this.searchParams.borkerId, //申请人id
                name: this.searchParams.name, //原合同名称
                statu: this.searchParams.statu, //审批状态
                type: this.searchParams.type, //印章类型
                pageNum: this.searchParams.pageNum, //当前页数
                pageRows: this.searchParams.pageRows, //请求条数
            };
            // 导出接口
            let data = await new GetContractInfoList(new PortContractInfoListParameter(exportParam)).send();
            console.log(data.contactInfoList, '接口数据');

            //导出数据表模板
            params = {
                fileName: "补充公司资料列表",
                headList: [
                    { name: "盖章文件", key: "fileName" },
                    { name: "份数", key: "share" },
                    { name: "页数", key: "page" },
                    { name: "申请人", key: "apply" },
                    { name: "申请组织", key: "applyOrg" },
                    { name: "申请编号", key: "applyNum" },
                    { name: "印章类型", key: "sealTypeText" },
                    { name: "原合同当前审批人", key: "review" },
                    { name: "原合同当前审核状态", key: "reviewStatuText" },
                    { name: "原合同申请编号", key: "contractNum" },
                    { name: "原合同名称", key: "contactName" },
                ],
                data: data.contactInfoList
            };

            // 拼接导出表头标题
            // params.fileName=this.exportExcelParams.month+" "+params.fileName;
            console.log(params, '--导出参数--');
            console.log(params.fileName, '表头');
            new ErpCommon().exportExcelData(params);
        },
        // 新增
        f_addClick(num,id){
            this.statu = num;
            this.id = id;
            this.isFileInfoItem = true; 
        },
         //全选
        allSelect(){
        if(this.allList.length <1) return;
        this.allSelectFlag = !this.allSelectFlag;
        this.allList.forEach((key)=>{
            key.check = this.allSelectFlag;
        })
        },
        //重置
        f_clear(){
            this.empty = true;
             this.searchEmpty = true;
            this.topParams.companyId = "";
            this.topParams.borkerId = "";
            this.topParams.name = "";
            this.topParams.statu = "";
            this.topParams.type = "";
            this.topParams.pageNum = 1; 
            this.searchParams = JSON.parse(JSON.stringify(this.topParams));
            this.initData();
        },
        //查询
        f_submit(){
            console.log(this.topParams,'这是顶部筛选参数');
            //若选择了条件，没有点击查询，导出时时间不会错误，且编辑数据保存之后列表初始化不会出错
            this.searchParams = JSON.parse(JSON.stringify(this.topParams));
            this.initData();
            console.log('执行查询');
        }, 
        kwdVal(data){
            // 关键字
             this.searchEmpty = false;
            this.topParams.keyWords = data;
            console.log(data,'hhhhhhhhhhh');
        },
        //关键字检索
        kwdSearch(data){
            this.searchParams = JSON.parse(JSON.stringify(this.topParams));
            this.initData();
            console.log(data,'关键字');
        },
        //组织
        f_selectOrg(data){
        this.empty = false; 
        console.log(data,'申请组织');
        this.selectOrgId = data.id;
        this.topParams.companyId = data.id;
        },
        //申请人
        f_getBorker(data){
            this.empty = false; 
            console.log(data,'申请人');
            this.topParams.borkerId = data.id;
        },
        //审批状态
        f_auditStatus(data){
          this.empty = false; 
          console.log(data,'申请状态');
          this.topParams.statu = data.id;
        },
        //印章类型
        f_stampType(data){
          this.empty = false; 
          console.log(data,'印章类型');
          this.topParams.type = data.id;
        },
        // 筛选项原合同名称
        f_selectAgentName(data){
            this.empty = false; 
            console.log(data,'原合同名称');
            if(data.text == "全部"){
                this.topParams.name = "";
            }else{
            this.topParams.name = data.text;
            }
        },
        //关闭弹窗
        f_closeView(){
            this.isDetailSwitch = false;
            this.isFileInfoItem = false;
        },
    },
}
</script>
<style scoped>
  /*修改滚动条样式*/
  div::-webkit-scrollbar {
    width: 0.08rem;
    height: 0.08rem;
  }
</style>

<style scoped >
.g_share{
    max-width: 0.64rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.g_effecive{
    position: absolute;
    bottom: 0.1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-family: SimSun;
    font-size: 0.12rem;
    color: #666666;
    margin-left: 0.21rem;
}
.g_iconHover{
    width: 0.5rem;
    float: left;
    line-height: 0.3rem;
}
.u_select{
    width: 0.66rem;
    cursor: pointer;
}
.u_file{
    width: 1.6rem;
}
.u_share{
    width: 0.87rem;
}
.u_page{
    width: 2.45rem;
}
.u_apply{
    width: 0.85rem;
}
.u_applyOrg{
    width: 1.57rem;
}
.u_applyNum{
    width: 1.5rem;
}
.u_sealType{
    width: 1.2rem;
}
.u_review{
    width: 1.27rem;
}
.u_reviewStatu{
    width: 1.7rem;
}
.u_contractNum{
    width: 1.47rem;
}
.u_contractName{
    width: 2.74rem;
}
.g_text{
    white-space: nowrap;
    margin-left: 0.04rem;
}
.edit, .dele{
    width: 0.4rem;
    height: 100%;
	font-family: MicrosoftYaHei;
	font-size: 0.12rem;
	color: #259cf3;
    float: left;
    margin-left: 0.05rem;
}
.u_deleIcon{
	width: 0.11rem;
	height: 0.13rem;
}
.g_lineList:hover .g_eventList{
    display: block;
}
.g_eventList{
    display: none;
    margin-left: 0.1rem;
    width: 1.5rem;
}
.u_lineHeaderContent{
    display: flex;
    justify-content: flex-start;
    align-items: center;
	font-family: MicrosoftYaHei;
	font-size: 0.12rem;
	color: #666666;
}
.u_count{
  flex-shrink:0;
  color: #999999;
  min-width:0.6rem; 
}
.u_deleIcon{
    width: 0.11rem;
    height: 0.13rem;
    background:url("../../../assets/images/projectAgentInfo/contract/delete_200.png")no-repeat center center;
    background-size: cover;
}
.u_printIcon{
    width: 0.14rem;
    height: 0.14rem;
    background:url("../../../assets/images/projectAgentInfo/common/dayin_200.png")no-repeat center center;
    background-size: cover;
}
.u_verifyIcon{
    width: 0.14rem;
    height: 0.14rem;
    background:url("../../../assets/images/projectAgentInfo/common/shenpi_200.png")no-repeat center center;
    background-size: cover;
}
.u_editIcon{
    width: 0.14rem;
    height: 0.14rem;
    background:url("../../../assets/images/projectAgentInfo/contract/addIcon_200.png")no-repeat top left;
    background-size: 0.13rem 0.14rem;
}
.u_addIcon{
    background:url("../../../assets/images/projectAgentInfo/contract/add_5_200.png")no-repeat center center;
    background-size: cover;
}
.g_icon{
    width: 0.11rem;
    height: 0.11rem;
    position: absolute;
    left: -0.15rem;
    top: 0.11rem;
}
.u_exportIcon{
    left: -0.15rem;
    background:url("../../../assets/images/projectAgentInfo/contract/u_Export.png")no-repeat center center;
    background-size: cover;
}
.u_ApprovalIcon{
    left: -0.15rem;
    background:url("../../../assets/images/projectAgentInfo/agentContract/contract_1_200.png")no-repeat center center;
    background-size: cover;
} 
.u_export{
    height: 100%;
    position: relative;
    color: #259CF3;
    flex-shrink:0;
    font-family: MicrosoftYaHei;
	font-size: 0.12rem;
    margin-right: 0.1rem;
    margin-left: 0.15rem;
    display: flex;
    align-items: center;
}
.u_switch{
	font-family: SimSun;
	font-size: 0.12rem;
    padding: 0.08rem 0.1rem;
    border: 1px solid rgb(206, 206, 206);
    border-bottom: none;
    margin-left: 0.09rem;
    border-top-left-radius:0.03rem;
    margin-top: 0.03rem;
    cursor: pointer;
    color: #00223a;
    background-color: #FFFFFF;
    z-index: 10;
}
.g_submit{
  margin-right:0.1rem;
}
.u_btn{
  text-align: center;
  font-size:0.12rem;
  padding: 0 0.1rem 0 0.1rem;
  height: 0.26rem;
  line-height: 0.24rem;
  cursor: pointer;
  color: #ffffff;
  width: 0.3rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../../../assets/images/projectAgentInfo/contract/screenDefaul_200.png");
}
.u_btn:hover{
  background-image: url("../../../assets/images/projectAgentInfo/contract/screenHover_200.png");
}
.u_btn:active{
  background-image: url("../../../assets/images/projectAgentInfo/contract/screenActive_200.png");
}
.g_btnList{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 0.1rem;
}
.u_lineListContent{
    height: 100%;
    border-right: 1px #d5d5d5 dashed;
    display: flex;
    justify-content: flex-start;
    align-items: center;
	font-family: MicrosoftYaHei;
	font-size: 0.12rem;
	color: #444444;
    padding: 0 0.1rem;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.u_lineListContent:last-child{
    border-style: none;
    flex:1;
}
.u_lineHeaderContent{
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
	font-family: MicrosoftYaHei;
	font-size: 0.12rem;
	color: #666666;
    padding: 0 0.1rem;
    box-sizing: border-box;
}
.u_lineHeaderContent:last-child{
    border-style: none;
    flex:1;
}
.g_lineList{
    width: 100%;
    min-height: 0.3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.04rem;
    background-color: #ffffff;
    border: 1px #ffffff solid;
    box-sizing: border-box;
}
.g_lineList:hover{
    background-color: #d9f1fe;
    border: 1px #73baee solid;
    box-shadow:  0rem 0rem 0.02rem 0.01rem rgba(115, 186, 238,0.8);
}
.g_lineList:focus{
    background-color: #d9f1fe;
    border: 1px #73baee solid;
    box-shadow:  0rem 0rem 0.02rem 0.01rem rgba(115, 186, 238,0.8);
}
.g_list{
    width: 100%;
    height: calc(100% - 0.3rem);
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: -0.04rem;
    padding: 0 0.1rem;
    box-sizing: border-box;
}
.g_lineHeader{
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0.1rem;
    box-sizing: border-box;
}
.g_header{
    width: 100%;
    height: 0.3rem;
    margin-bottom: 0.04rem;
    position: sticky;
    top: 0;
    z-index: 10;
}
.g_lists{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    /* overflow: auto; */
    min-width: 18.16rem;
    background-color: #EDF3FB;
}
.g_flexLeftCenter{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
}
.g_otherRightList{
    height: 100%;
    margin-right: 0.1rem;
    font-size: 0.1rem;
    font-size: 0.1rem;
    align-items: center;
}
.g_switchLeftList{
    height:100%;
}
.g_nav{
    width: 100%;
    height: 0.34rem;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(#f9f9f9, #dedede);
}
.g_scroll{
    width: 100%;
    height: calc(100% - 0.32rem - 0.34rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    overflow-x: auto;
}
.g_selectMenu{
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.g_topselect{
    width: 100%;
    height: 0.32rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #259CF3;
}
.g_All{
    width: 100%;
    /* min-height: 4.88rem;
    height: 100%; */
    height: calc(100% - 0.32rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
}
</style>
<style lang="less">
.u_topSelect .select_reg .selected_item .selected_text{
    text-shadow: 0 0.01rem rgba(255, 255, 255, 0.3);
}
.u_select .el-checkbox__label{
    display: none!important;
}

.isLoading {
  position: fixed;
  top: 1.28rem;
  width: 100%;
  height: calc(~"100% - 1.28rem");
  min-height: 2rem;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.no_dataBox {
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    height: calc(~"100% - 1.4rem");
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d9f1fe;

    .no-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > img {
        transform: scale(0.9);
    }

    .no_dataSpan {
        font-size: 0.18rem;
        margin-top: 0.1rem;
        color: #999999;
    }
    }
}
</style>
<style>
.u_topSelect .selected_text{
    font-weight: normal!important;
}
.u_topSelect .selected_item{
    height: 0.32rem!important;
    line-height: 0.31rem!important;
    box-sizing: border-box;
    border-bottom:1px solid #126fb2;
}
.u_lineListContent .el-checkbox__inner::after{
    border: 1px solid #409EFF;
    border-left: 0;
    border-top: 0;
}
.u_lineListContent .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #FFFFFF;
    border-color: #409EFF;
}
</style>






