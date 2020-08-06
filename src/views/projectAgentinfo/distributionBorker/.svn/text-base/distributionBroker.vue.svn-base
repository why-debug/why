<template>
    <!-- 分销经纪人 -->
    <div class="g_borkerAll">
        <div class="g_topselect">
            <div class="g_selectMenu">
                <div class="u_select"><topSelect @onSelectChange="f_selectCompanyName" :defaultText="'所属公司'" :empty="empty"  :defaultList="companyList" ></topSelect></div>
                <div class="u_select"><topSelect @onSelectChange="f_selectCompanySimpleName" :defaultText="'公司简称'" :empty="empty"  :defaultList="simpleNameList"></topSelect></div>
                <div class="u_select"><topSelect @onSelectChange="f_selectBorkerName" :defaultText="'经纪人姓名'" :empty="empty" :defaultList="brokerNameList" imgPath="yuangong_200"></topSelect></div>
                <div class="u_select"><selectRadio @onSelectChange="f_timeType" :list="timeList" :defaultText="'时间类型'"  :empty="empty" imgSrc="type_200"></selectRadio></div>
                <div class="u_select"><selectDataTime @upDataTime="f_selectDataTime" :empty="empty" :timeType="topParams.timeType"></selectDataTime></div>
                <div class="u_select"><selectRadio  @onSelectChange="f_relation" :list="relationList" :defaultText="'是否绑定'" :empty="empty" imgSrc="status_200"></selectRadio></div>
                <div class="u_select"><topSelect @onSelectChange="f_selectStoreNum" :defaultText="'门店码'" :empty="empty" :defaultList="storeNumList" imgPath="yongtu_200"></topSelect></div>
            </div>
            <div class="g_btnList">
                <div class="u_btn g_submit" @click="f_submit">查询</div>
                <div class="u_btn" @click="f_clear">重置</div>
            </div>
        </div>
        <div class="g_content">
            <div class="g_nav">
                <div class="g_switchLeftList g_flexLeftCenter">
                    <div class="u_switch">分销经纪人</div>
                </div>
                <div class="g_otherRightList g_flexLeftCenter">
                    <div class="u_export" @click="f_exportClick" v-if="$UserPermission.DISTRIBUTIONBrokerExportAuth()"><div class="u_exportIcon"></div> 导出</div> 
                    <div class="u_count">共{{ total }}条</div>
                </div>
            </div>
            <div class="g_lists">
                <!-- <div style="width: 100%;height: 100%;overflow-y: auto;overflow-x: hidden;"> -->
                <div class="g_header">
                    <div class="g_lineHeader">
                        <div class="u_lineHeaderContent borkerName">经纪人姓名</div>
                        <div class="u_lineHeaderContent company">所属公司</div>
                        <div class="u_lineHeaderContent ListCompanySimpleName">公司简称</div>
                        <div class="u_lineHeaderContent storeCode">门店码</div>
                        <div class="u_lineHeaderContent borkerPhone">经纪人电话</div>
                        <div class="u_lineHeaderContent account">登录账号</div>
                        <div class="u_lineHeaderContent regDate">注册日期</div>
                        <div class="u_lineHeaderContent bindDate">绑定日期</div>
                        <div class="u_lineHeaderContent desc">备注</div>
                    </div>
                </div>
                <div class="g_list" v-if="borkerList && borkerList.length>0"
                     v-infinite-scroll="!isScroll?'':scrollBottom"
                     infinite-scroll-distance="10"
                     infinite-scroll-immediate="false"
                    >
                    <div class="g_lineList" v-for="(item,index) in borkerList" :key="index" @dblclick="f_borkerDetails(item.borkerId)">
                        <div class="u_lineListContent borkerName">{{ item.borkerName}}</div>
                        <div class="u_lineListContent company">{{ item.companyName }}</div>
                        <div class="u_lineListContent g_flexLeftCenter ListCompanySimpleName">
                            <div class="companySimpleName">{{ item.simpleName }}</div>
                            <div class="g_eventList">
                                <div class="edit g_flexLeftCenter" @click="f_editBorkerInfo(item.borkerId)" v-if="$UserPermission.DISTRIBUTIONBrokerUpdateAuth()">
                                    <div class="u_editIcon"></div>
                                    <div class="g_text">编辑</div>
                                </div>
                                <div class="dele g_flexLeftCenter" @click="f_deletInfo(item.borkerId)" v-if="$UserPermission.DISTRIBUTIONBrokerDeleteAuth()">
                                    <div class="u_deleIcon"></div>
                                    <div class="g_text">删除</div>
                                </div>
                            </div>
                        </div>
                        <div class="u_lineListContent storeCode">{{ item.storeCode }}</div>
                        <div class="u_lineListContent borkerPhone">{{ item.borkerPhone }}</div>
                        <div class="u_lineListContent account">{{ item.account }}</div>
                        <div class="u_lineListContent regDate">{{ item.regDate }}</div>
                        <div class="u_lineListContent bindDate">{{ item.bindDate }}</div>
                        <div class="u_lineListContent desc">{{ item.desc }}</div>
                    </div>
                </div>
                 <div class="no_dataBox" v-if="!!NoData">
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
        <div v-if="isborkerDetailSwitch">
            <borkerDetails @f_closeView="f_closeView" :borkerId="borkerIdProp"></borkerDetails>
        </div>
        <div v-if="isEditBorkerInfo">
            <editBorkerInfo @f_closeView="f_closeView" :borkerId="borkerIdProp"></editBorkerInfo>
        </div>
    </div>
</template>
<script>
import selectRadio from "../../../components/topSelect/selectRadio";
import selectDataTime from "../form/selectDataTime";
import topSelect from "../form/topSelect"
import {
    BorkerListRequestParameter,
    PortRequestParameter,
    GetBorkerList,
    DeleteDistributionBrokerApi
} from "../../../net/projectAgentinfo/borkerRequest/GetBorkerList.js"
import {
    GetCompangList,
} from "../../../net/projectAgentinfo/companyRequest/GetCompangInfoList.js"
import borkerDetails from './borkerDetails'
import editBorkerInfo from "./editBorkerInfo"
import {ErpCommon} from '../../../utils/ErpCommon'
import {GetUserOpers, GetUserOpersRequest} from "../../../net/common/GetUserOpers";
import {SetBaseInfoModel} from "../../../model/BaseInfoModel";

export default {
    data() {
        return {
            isLoad:false,//下拉加载  false加载  true不加载
            NoData:false,//是否有数据
            isScroll:true,//是否滚动
            empty: false, //是否清空
            parameter: new BorkerListRequestParameter(), //请求参数
            companyAddress: '/newBuildWeb/broker/org/getDistributionCompanyList',//请求所属公司接口地址
            brokerAddress: '/newBuildWeb/broker/org/getDistributionBrokerList',//请求经纪人接口地址:requestAddress="companyAddress"
            borkerList: [], //页面数据list
            companyList:[],//所属公司
            simpleNameList:[],//公司简称
            storeNumList:[],//门店码
            brokerNameList:[],//经纪人姓名列表
            total:0,//列表总条数
            first: {id: '',text: "全部"},//顶部筛选第一项
            timeList: [
                { id: 1, text: '注册时间' },
                { id: 2, text: '绑定时间' },
            ],//日期类型
            relationList: [
                { id: 1, text: '是' },
                { id: 0, text: '否' },
            ],
            isborkerDetailSwitch: false, //详情弹窗标志
            isEditBorkerInfo: false, //编辑弹窗标志
            borkerIdProp: '', //经纪人id
            topParams:{},//顶部筛选参数
            searchParams: {
                compId: '', //公司id
                compCname: '', //公司简称
                timeType: '',//时间类型1.注册时间 2.绑定时间
                userName: '', //经纪人姓名
                startTime: '', //开始时间
                endTime: '', //结束时间
                whetherToBind: '', //是否绑定
                deptCode: '', //门店码
                pageOffset: 1, //当前页数
                pageRows: 30, //请求条数
            },
            companyParameter: {
            export:1,
            compName : "", //公司名称
            // personType = '',//人员类型
            ourDockingPersonId : '', //对接人id 
            timeStartStr : '', // 开始时间
            timeEndStr : '', // 结束时间
            timeType : '', // 时间类型
            deptCode : '', //门店码
            pageOffset : 1,//分页加载(当前页面)
            pageRows : 30,//请求条数(当前页面)   
            },//请求参数
        }
    },
    components: {
        selectDataTime,
        selectRadio,
        borkerDetails,
        editBorkerInfo,
        topSelect
    },
    created() {
        this.topParams = JSON.parse(JSON.stringify(this.searchParams));
        console.log(this.topParams,'这是顶部筛选参数');
        this.initUserOpers();
        this.topData();
        this.initData();
    },
    methods: {
         //初始化权限
        async initUserOpers(){
            console.log('--分销经纪人权限初始化开始Index--');
            let userId = new ErpCommon().getOperator('USER_ID'); //写死测试userId:20341347 20341322

            if (!userId) return;

            let userOpers = await new GetUserOpers(new GetUserOpersRequest({userId:userId})).send();
            SetBaseInfoModel.setUserOpers(userOpers);
            console.log('--分销经纪人权限初始化完成--');
        },
        //获取顶部筛选数据
        topData(){
             //获取分销公司列表
            new GetCompangList(this.companyParameter).send()
            .then((res)=>{
                //所属公司
                this.companyList = this.topSelectList(res.companyList,'companyId','companyName');
                 this.companyList.unshift(this.first);
                //公司简称
                this.simpleNameList = this.topSelectList(res.companyList,'companyId','simpleName');
                this.simpleNameList.unshift(this.first);
                // 门店码
                this.storeNumList = this.topSelectList(res.companyList,'companyId','storeNum');
                this.storeNumList.unshift(this.first);
                console.log(this.companyList,'所属公司');
                console.log(this.simpleNameList,'公司简称');
                console.log(this.storeNumList,'门店码');
            })
            .catch((err)=>{
                console.log('分销公司请求失败');
            })

             //获取所有分销经纪人列表
            new GetBorkerList(new PortRequestParameter({export:1})).send()
                .then((res) => {
                    console.log("所有分销经纪人: ", res.borkerList);
                    this.brokerNameList = this.topSelectList(res.borkerList,'borkerId','borkerName');
                    this.brokerNameList.unshift(this.first);
                })
                .catch((err) => {
                    console.log("查询所有分销经纪人报错: ", err);
                });
        },
        //初始化
        initData() {
            //获取分销经纪人列表
            new GetBorkerList(new PortRequestParameter(this.searchParams)).send()
                .then((res) => {
                    if(res.borkerList.length<=0){
                        this.NoData = true;
                    }else{
                        this.NoData = false;
                    }
                    console.log("分销经纪人处理之后的数据: ", res.borkerList);
                    this.total = res.total;
                    this.borkerList = res.borkerList;
                })
                .catch((err) => {
                    console.log("分销经纪人报错: ", err);
                });
        },
         //下拉加载
        refresh() {
        this.isLoad = true;    
        this.isScroll = false;
        new GetBorkerList(new PortRequestParameter(this.searchParams))
            .send()
            .then(res => {
            this.isLoad = false;
            let list = res.borkerList || [];
            if(list.length<1) return;
            if(list.length<30){
             this.isScroll = false;
           }else{
             this.isScroll = true;
           }
            this.borkerList = [...this.borkerList,...list];
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
        //经纪人详情
        f_borkerDetails(id) {
            this.borkerIdProp = id;
            this.isborkerDetailSwitch = true;
        },
        //编辑
        f_editBorkerInfo(id) {
            this.borkerIdProp = id;
            this.isEditBorkerInfo = true;
        },
        //删除
        f_deletInfo(userId) {
            this.$erpConfirm({
                    msg: '是否确认删除所选分销经纪人? '
                }).then(() => {
                    // this.borkerList.splice(index,1);
                    //调用删除接口
                    new DeleteDistributionBrokerApi({ 'userId': userId }).send().then((res) => {
                        //操作成功,刷新列表
                        if (res.errCode == 200) {
                            this.initData();
                            console.log('哈哈哈哈哈哈哈哈哈哈或或或');
                        }
                    });
                })
                .catch(() => {})
        },
        //时间
        f_selectDataTime(data) {
            this.empty = false;
            console.log(data,'选择时间所有数据');
            console.log(data.startTime, data.endTime, '时间');
            this.topParams.startTime = data.startTime;
            this.topParams.endTime = data.endTime;
        },
        //时间类型
        f_timeType(data) {
            this.empty = false; 
            console.log(data.text, data.id, '日期类型');
            this.topParams.timeType = data.id;
        }, 
        //是否绑定
        f_relation(data) {
            this.empty = false;
            console.log(data.text, data.id, '是否绑定');
            this.topParams.whetherToBind = data.id;
        },
        //门店码
        f_selectStoreNum(data) {
            this.empty = false;
            console.log(data.text, '门店码');
            if(data.text == "全部"){
                this.topParams.deptCode = "";
            }else{
            this.topParams.deptCode = data.text;
            }
        },
        //经纪人名称
        f_selectBorkerName(data) {
            this.empty = false;
            if(data.text == "全部"){
                this.topParams.userName = "";
            }else{
            this.topParams.userName = data.text;
            }
            console.log(data.text, '经纪人名称');
        },
        //公司简称
        f_selectCompanySimpleName(data) {
            this.empty = false;
             if(data.text == "全部"){
                this.topParams.compCname = "";
            }else{
            this.topParams.compCname = data.text;
            }
            console.log(data.text, '公司简称');
        },
        //所属公司
        f_selectCompanyName(data) {
            this.empty = false;
            console.log(data.text, data.id, '所属公司');
            this.topParams.compId = data.id;
        },
         //触底加载
        scrollBottom() {
            console.log("到底啦");
            if(this.isScroll){
                this.searchParams.pageOffset += 1;
                this.refresh();
            }
        },
        //导出
        async f_exportClick() {
            console.log('这是导出哈哈哈哈');
            let params = {};
            // 导出参数
            let exportParam = {
                export:1,
                compId: this.searchParams.compId, //公司id
                compCname: this.searchParams.compCname, //公司简称
                userName: this.searchParams.userName, //经纪人姓名
                startTime: this.searchParams.startTime, //开始时间
                endTime: this.searchParams.endTime, //结束时间
                whetherToBind: this.searchParams.whetherToBind, //是否绑定
                deptCode: this.searchParams.deptCode, //门店码
                pageOffset: 1, //当前页数
                pageRows: 30, //请求条数
            };
            // 导出接口
            let data = await new GetBorkerList(new PortRequestParameter(exportParam)).send();
            console.log(data.borkerList, '接口数据');

            //导出数据表模板
            params = {
                fileName: "分销经纪人列表",
                headList: [
                    { name: "经纪人姓名", key: "borkerName" },
                    { name: "所属公司", key: "companyName" },
                    { name: "公司简称", key: "simpleName" },
                    { name: "门店码", key: "storeCode" },
                    { name: "经纪人电话", key: "borkerPhone" },
                    { name: "登录账号", key: "account" },
                    { name: "注册日期", key: "regDate" },
                    { name: "绑定日期", key: "bindDate" },
                    { name: "备注", key: "desc" }
                ],
                data: data.borkerList
            };

            // 拼接导出表头标题
            if(this.searchParams.startTime != ""){
                //去除时分秒
                let except = (val)=>{
                    return val.split(' ')[0];
                }
                params.fileName=except(this.searchParams.startTime)+"~"+except(this.searchParams.endTime) + params.fileName;
            } 
            console.log(params, '--导出参数--');
            console.log(params.fileName, '表头');
            new ErpCommon().exportExcelData(params);
        },
        //重置
        f_clear() {
            this.empty = true;
            this.topParams.compId = '';
            this.topParams.compCname = '';
            this.topParams.userName = '';
            this.topParams.startTime = '';
            this.topParams.endTime = '';
            this.topParams.whetherToBind = ''; 
            this.topParams.deptCode = '';
            this.topParams.timeType = ''; 
            this.topParams.pageOffset = 1;
        },
        //查询
        f_submit() {
            console.log(this.topParams,'这是顶部筛选参数');
            this.topParams.pageOffset = 1;
            //若选择了条件，没有点击查询，导出时时间不会错误，且编辑数据保存之后列表初始化不会出错
            this.searchParams = JSON.parse(JSON.stringify(this.topParams));
            this.initData();
        },
        //关闭弹窗
        f_closeView() {
            this.isborkerDetailSwitch = false;
            this.isEditBorkerInfo = false;
            this.borkerIdProp = 0;
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

<style scoped>
.g_text{
    white-space: nowrap;
    margin-left: 0.02rem;
}
.borkerName{
    min-width: 0.95rem;
    width: 6.6%;
}
.company{
    min-width: 1.85rem;
    width: 12.85%;
}
.ListCompanySimpleName{
    min-width: 2.32rem;
    width: 16.18%;
}
.storeCode{
    min-width: 1.01rem;
    width: 7.01%;
}
.borkerPhone{
    min-width: 1.15rem;
    width: 8.06%;
}
.account{
    min-width: 1.24rem;
    width: 8.61%;
}
.regDate{
    min-width: 1.45rem;
    width: 10%;
}
.bindDate{
    min-width: 9.89%;
    width: 1.43;
}
.desc{
    min-width: 20%;
    width: 2.88rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
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
    background:url("../../../assets/images/projectAgentInfo/contract/delete_200.png")no-repeat center center;
    background-size: cover;
}
.u_editIcon{
    width: 0.14rem;
    height: 0.14rem;
    background:url("../../../assets/images/projectAgentInfo/contract/addIcon_200.png")no-repeat top left;
    background-size: 0.13rem 0.14rem;
}
.g_lineList:hover .g_eventList{
    display: block;
}
.g_eventList{
    display: none;
    margin-left: 0.1rem;
    cursor: pointer;
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
.u_exportIcon{
    width: 0.11rem;
    height: 0.11rem;
    top: 0.12rem;
    position: absolute;
    left: -0.15rem;
    background:url("../../../assets/images/projectAgentInfo/contract/u_Export.png")no-repeat center center;
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
    cursor: pointer;
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
    text-overflow: ellipsis;
    white-space: nowrap;
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
}
.g_lists{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100% - 0.34rem);
    background-color: #EDF3FB;
    overflow: hidden;
}
.g_flexLeftCenter{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
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
.g_content{
    width: 100%;
    height: calc(100% - 0.64rem);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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
.g_borkerAll{
    width: 100%;
    height: 100%;
    min-height: 4.88rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
}
</style>
<style lang="less">
.u_select .select_reg .selected_item .selected_text{
    text-shadow: 0 0.01rem rgba(255, 255, 255, 0.3);
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
  top: 1.28rem;
  width: 100%;
  height: calc(~"100% - 1.28rem");
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #edf3fb;
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
.u_select .selected_text{
    font-weight: normal!important;
}
.u_select .selected_item{
    height: 0.32rem!important;
    line-height: 0.31rem!important;
    box-sizing: border-box;
    border-bottom:1px solid #126fb2;
}
</style>


