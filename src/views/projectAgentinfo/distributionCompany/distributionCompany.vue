<template>
    <!-- 分销公司 -->
    <div class="g_companyAll">
        <div class="g_topselect">
            <div class="g_selectMenu">
                <div class="u_select"><topSelect @onSelectChange="f_selectCompanyName" :defaultText="'公司名称'" :empty="empty"  :defaultList="companyNameList" ></topSelect></div>
                <!-- <div class="u_select"><selectRadio @onSelectChange="f_selectPersonType" :list="personTypeList" :defaultText="'人员类型'" :empty="empty" imgSrc="status_200"></selectRadio></div> -->
                <div class="u_select"><topSelect @onSelectChange="f_selectPerson" :defaultText="'对接人'" :empty="empty" :defaultList="PersonList" imgPath="yuangong_200"></topSelect></div>
                <div class="u_select"><selectRadio @onSelectChange="f_selectTimeType" :list="timeList" :defaultText="'时间类型'"  :empty="empty" imgSrc="type_200"></selectRadio></div>
                <div class="u_select"><selectDataTime @upDataTime="f_selectDataTime" :empty="empty" :timeType="topParams.timeType"></selectDataTime></div>
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
                    <div class="u_switch">分销公司</div>
                </div>
                <div class="g_otherRightList g_flexLeftCenter">
                    <div class="u_export" @click="f_addClick" v-if="haveAddAuth"><div class="u_addIcon g_icon"></div> 新增</div> 
                    <div class="u_export" @click="f_exportClick" v-if="haveExportAuth"><div class="u_exportIcon g_icon"></div> 导出</div>
                    <div class="u_count">共{{ total }}条</div>
                </div>
            </div>
            <div class="g_lists">
                <div class="g_header">
                    <div class="g_lineHeader">
                        <div class="u_lineHeaderContent storeNum">门店码</div>
                        <div class="u_lineHeaderContent companyName">公司名称</div>
                        <div class="u_lineHeaderContent simpleName">公司简称 </div>
                        <div class="u_lineHeaderContent OurCharge">我司对接人</div>
                        <div class="u_lineHeaderContent themCharge">对方联系人</div>
                        <div class="u_lineHeaderContent themChargePhone">联系人电话</div>
                        <div class="u_lineHeaderContent foundDate">创建日期</div>
                        <div class="u_lineHeaderContent signDate">签约日期 </div>
                        <div class="u_lineHeaderContent desc">备注</div>
                    </div>
                </div>
                <div class="g_list" v-if="companyList && companyList.length>0"
                     v-infinite-scroll="!isScroll?'':scrollBottom"
                     infinite-scroll-distance="10"
                     infinite-scroll-immediate="false"
                    >
                    <div class="g_lineList" v-for="(item,index) in companyList" :key="index" @dblclick="f_companyDetails(item.companyId)">
                        <div class="u_lineListContent storeNum">{{ item.storeNum}}</div>
                        <div class="u_lineListContent companyName">{{ item.companyName }}</div>
                        <div class="u_lineListContent g_flexLeftCenter simpleName">
                            <div class="companySimpleName">{{ item.simpleName }}</div>
                            <div class="g_eventList">
                                <div class="edit g_flexLeftCenter" @click="f_editCompany(item.companyId)" v-if="haveEditAuth">
                                    <div class="u_editIcon"></div>
                                    <div class="g_text">编辑</div>
                                </div>
                                <div class="dele g_flexLeftCenter" @click="f_deletInfo(item.companyId)" v-if="haveDeleteAuth">
                                    <div class="u_deleIcon"></div>
                                    <div class="g_text">删除</div>
                                </div>
                            </div>
                        </div>
                        <div class="u_lineListContent OurCharge">{{ item.OurCharge }}</div>
                        <div class="u_lineListContent themCharge">{{ item.themCharge }}</div>
                        <div class="u_lineListContent themChargePhone">{{ item.themChargePhone }}</div>
                        <div class="u_lineListContent foundDate">{{ item.foundDate }}</div>
                        <div class="u_lineListContent signDate">{{ item.signDate }}</div>
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
        <div v-if="isCompanyDetailSwitch">
            <companyDetails @f_closeView="f_closeView" :compId="compId"></companyDetails>
        </div>
        <div v-if="isAddCompangSwitch">
            <addCompany @f_closeView="f_closeView" :companyId="this.companyId" :statu="statu"></addCompany>
        </div>
    </div>
</template>
<script>
import selectRadio from "../../../components/topSelect/selectRadio";
import selectDataTime from "../form/selectDataTime";
import topSelect from "../form/topSelect"
import companyDetails from "./companyDetails"
import addCompany from "./addCompany"
import {
    GetCompangList,
    PortRequestParameter,
    DeleteDistributionCompanyApi
} from "../../../net/projectAgentinfo/companyRequest/GetCompangInfoList.js"
import {ErpCommon} from '../../../utils/ErpCommon'
import {GetUserOpers, GetUserOpersRequest} from "../../../net/common/GetUserOpers";
import {SetBaseInfoModel} from "../../../model/BaseInfoModel";

export default {
    data(){
        return{
            isLoad:false,//下拉加载  false加载  true不加载
            NoData:false,//是否有数据
            isScroll:true,//是否滚动
            haveExportAuth:false,//是否有导出权限
            haveEditAuth:false,//是否有编辑权限
            haveDeleteAuth:false,//是否有删除权限
            haveAddAuth:false,//是否有新增权限
            isCompanyDetailSwitch:false, //详情
            isAddCompangSwitch:false,//新增
            empty:false, //清空
            compId:0, // 选中分销公司的id
            companyNameList:[],//顶部公司名称类别
            personTypeList:[],//顶部人员类型
            PersonList:[],//顶部对接人列表
            companyList:[], //页面列表数据
            storeNumList:[],//顶部门店码列表
            total:0,//列表总条数
            exportStartTime:'',//导出表头时间
            exportEndTime:'',
            first: {id: '',text: "全部"},//顶部筛选第一项
            timeList:[
                { id: 1, text: '创建时间' },
                { id: 2, text: '签约时间' },
            ],
            topParams:{},//顶部筛选参数
            parameter: {
               export:0,//导出 0否 1是
               compName : "", //公司名称
               // personType = '',//人员类型
               ourDockingPersonId : '', //对接人id
               timeType: '',//时间类型1.创建时间 2.签约时间
               timeStartStr : '', // 开始时间
               timeEndStr : '', // 结束时间
               deptCode : '', //门店码
               pageOffset : 1,//分页加载(当前页面)
               pageRows : 30,//请求条数(当前页面)  
            },//请求参数
            companyId: 0,//公司Id
            statu:1,//1 新增, 2 编辑
        }
    },
    components:{
        selectDataTime,
        selectRadio,
        topSelect,
        companyDetails,
        addCompany,
    },
    created(){
        this.topParams = JSON.parse(JSON.stringify(this.parameter));
        console.log(this.topParams,'这是顶部筛选参数');
        this.initUserOpers();
        this.topData();
        this.initData();
    },
    methods:{
     //初始化权限
     async initUserOpers(){
        console.log('--分销公司权限初始化开始Index--');
        let userId = new ErpCommon().getOperator('USER_ID'); //写死测试userId:20341347 20341322

        if (!userId) return;

        let userOpers = await new GetUserOpers(new GetUserOpersRequest({userId:userId})).send(); 
        SetBaseInfoModel.setUserOpers(userOpers);
        this.haveExportAuth = this.$UserPermission.DISTRIBUTIONCpyExportAuth();
        this.haveEditAuth = this.$UserPermission.DISTRIBUTIONCpyUpdateAuth();
        this.haveDeleteAuth = this.$UserPermission.DISTRIBUTIONCpyDeleteAuth();
        this.haveAddAuth = this.$UserPermission.DISTRIBUTIONCpyAddAuth();
        console.log('--分销公司权限初始化完成--');    
      },
    //获取顶部筛选数据
    topData(){
         //获取分销公司列表
         new GetCompangList(new PortRequestParameter({export:1})).send()
        .then((res)=>{
            //所属公司
            this.companyNameList = this.topSelectList(res.companyList,'companyId','companyName');
            this.companyNameList.unshift(this.first);
            //对接人
            this.PersonList = this.topSelectList(res.companyList,'ourDockingPersonId','OurCharge');
            this.PersonList.unshift(this.first);
            // 门店码
            this.storeNumList = this.topSelectList(res.companyList,'companyId','storeNum');
            this.storeNumList.unshift(this.first);
            console.log(this.companyList,'分销公司');
            console.log(this.PersonList,'对接人');
            console.log(this.storeNumList,'门店码');
        })
        .catch((err)=>{
            console.log('分销公司请求失败');
        })
        },
        //初始化公司列表数据
        initData(){
            new GetCompangList(new PortRequestParameter(this.parameter)).send()
            .then((res)=>{
                 if(res.companyList.length<=0){
                        this.NoData = true;
                    }else{
                        this.NoData = false;
                    }
                this.total = res.total;
                this.companyList = res.companyList;
            })
            .catch((err)=>{
                 console.log(res, '--catch--');
                 new ErpCommon().toast('请求失败,请稍后再试!');
            })
        },
        //删除
        f_deletInfo(compId){
            this.$erpConfirm({
                msg: '是否确认删除所选分销经纪人? '
            }).then(() => {
                // this.companyList.splice(index,1);
                //调用删除接口
                new DeleteDistributionCompanyApi({ 'compId': compId }).send().then((res) => {
                    //操作成功,刷新列表
                    if (res.errCode == 200) {
                        console.log('哈哈哈哈哈哈哈哈哈哈或或或');
                             this.initData();
                    }
                })
                .catch((res) => {
                    console.log(res, '--catch--');
                    new ErpCommon().toast('删除失败,请稍后再试!');
                })
            })
            .catch(() => {})
        },
         //触底加载
        scrollBottom() {
            console.log("到底啦");
            if(!this.isScroll) return;
               //下拉加载
            this.isLoad = true;    
            this.isScroll = false;
            this.parameter.pageOffset += 1;
            new GetCompangList(new PortRequestParameter(this.parameter))
                .send()
                .then(res => {
                this.isLoad = false;
                let list = res.companyList || [];
                if(list.length<1) return;
                if(list.length<30){
                    this.isScroll = false;
                }else{
                    this.isScroll = true;
                }
                this.companyList = [...this.companyList,...list];
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
        //公司详情
        f_companyDetails(compId){
            this.compId = compId;
            this.isCompanyDetailSwitch = true;
        },
        //导出 
       async f_exportClick(){
            console.log('这是导出哈哈哈哈');
            let params = {};
            // 导出参数
            let exportParam = {
                 export:1,
                 compName : this.parameter.compName, //公司名称
                 // personType = '',//人员类型
                 ourDockingPersonId : this.parameter.ourDockingPersonId, //对接人id
                 timeStartStr : this.parameter.timeStartStr, // 开始时间
                 timeEndStr : this.parameter.timeEndStr, // 结束时间
                 timeType : this.parameter.timeType, // 时间类型
                 deptCode : this.parameter.deptCode, //门店码
                 pageOffset : 1,//分页加载(当前页面)
                 pageRows : 30,//请求条数(当前页面)  
            };
            // 导出接口
            let data = await new GetCompangList(new PortRequestParameter(exportParam)).send();
            console.log(data.companyList, '接口数据');

            //导出数据表模板
            params = {
                fileName: "分销公司列表",
                headList: [
                    { name: "门店码", key: "storeNum" },
                    { name: "公司名称", key: "companyName" },
                    { name: "公司简称", key: "simpleName" },
                    { name: "我司对接人", key: "OurCharge" },
                    { name: "对方联系人", key: "themCharge" },
                    { name: "联系人电话", key: "themChargePhone" },
                    { name: "创建日期", key: "foundDate" },
                    { name: "签约日期", key: "signDate" },
                    { name: "备注", key: "desc" }
                ],
                data: data.companyList
            };

            // 拼接导出表头标题
            if(this.parameter.timeStartStr != ""){
                //去除时分秒
                let except = (val)=>{
                    return val.split(' ')[0];
                }
                params.fileName=except(this.parameter.timeStartStr)+"~"+except(this.parameter.timeEndStr) + params.fileName;
            } 
            console.log(params, '--导出参数--');
            console.log(params.fileName, '表头');
            new ErpCommon().exportExcelData(params);
        },
        // 新增
        f_addClick(){
            this.statu = 1;
            this.companyId = 0;
            this.isAddCompangSwitch = true;
        },
        // 编辑
        f_editCompany(id){
            this.statu = 2;
            this.companyId = Number(id);
            this.isAddCompangSwitch = true;
        },
        //重置
        f_clear(){
            this.empty = true;
            this.topParams.compName = '';
            this.topParams.ourDockingPersonId = '';
            this.topParams.timeType = '';
            this.topParams.timeStartStr = '';
            this.topParams.timeEndStr = '';
            this.topParams.deptCode = ''; 
            this.topParams.pageOffset = 1;
            this.parameter = JSON.parse(JSON.stringify(this.topParams));
            this.initData();
        },
        //查询
        f_submit(){
        console.log(this.topParams,'这是顶部筛选参数');
        //若选择了条件，没有点击查询，导出时时间不会错误，且编辑数据保存之后列表初始化不会出错
        this.parameter = JSON.parse(JSON.stringify(this.topParams));
         this.initData();
        }, 
        //时间类型
        f_selectTimeType(data){
            this.empty = false; 
            console.log(data.text, data.id, '日期类型');
            this.topParams.timeType = data.id;
        },
        //时间
        f_selectDataTime(data){
            this.empty = false;
            console.log(data.startTime, data.endTime, '时间');
            this.topParams.timeStartStr = data.startTime;
            this.topParams.timeEndStr = data.endTime;
        },
        //门店码
        f_selectStoreNum(data){
            this.empty = false;
            console.log(data.text, data.id, '门店码');
            if(data.text == "全部"){
                this.topParams.deptCode = "";
            }else{
            this.topParams.deptCode = data.text;
            }
        },
        //对接人
        f_selectPerson(data){
            this.empty = false;
            console.log(data.text, data.id, '对接人');
            this.topParams.ourDockingPersonId = data.id;
        },
        //人员类型
        f_selectPersonType(data){
            this.empty = false;  
            console.log(data.text, data.id, '人员类型'); 
            // this.topParams.personType = data.id; 
        },
        // 筛选项 公司名称
        f_selectCompanyName(data){
            this.empty = false;
            console.log(data.text, data.id, '公司名称');
            if(data.text == "全部"){
                this.topParams.compName = "";
            }else{
            this.topParams.compName = data.text;
            }
        },
        //关闭弹窗
        f_closeView(){
            if(this.isAddCompangSwitch){
                this.isAddCompangSwitch = false;
                return
            }
            if(this.isCompanyDetailSwitch){
                this.isCompanyDetailSwitch = false;
                return
            }
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
.desc{
    min-width:2.88rem;
    width: 20%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.signDate{
    min-width:1.43rem;
    width: 9.93%;
}
.foundDate{
    min-width:1.53rem;
    width: 10.63%;
}
.themChargePhone{
    min-width:1.31rem;
    width: 9.1%;
}
.OurCharge, .themCharge{
    min-width:1rem;
    width: 7.01%;
}
.simpleName{
    min-width:2.36rem;
    width: 16.39%;
}
.companyName{
    min-width:1.85rem;
    width: 12.85%;
}
.storeNum{
    min-width:0.95rem;
    width: 6.6%;
}
.g_text{
    white-space: nowrap;
    margin-left: 0.02rem;
}
.edit{
    margin-left: 0.07rem;
}
.edit, .dele{
    width: 0.4rem;
    height: 100%;
	font-family: MicrosoftYaHei;
	font-size: 0.12rem;
	color: #259cf3;
    float: left;
    margin-left: 0.05rem;
    cursor: pointer;
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
.u_editIcon{
    width: 0.14rem;
    height: 0.14rem;
    background:url("../../../assets/images/projectAgentInfo/contract/addIcon_200.png")no-repeat top left;
    background-size: 0.13rem 0.14rem;
}
.g_icon{
    width: 0.11rem;
    height: 0.11rem;
    position: absolute;
    left: -0.15rem;
    top: 0.11rem;
}
.u_addIcon{
    background:url("../../../assets/images/projectAgentInfo/contract/add_5_200.png")no-repeat center center;
    background-size: cover;
}
.u_exportIcon{
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
    height: 100%;
    background-color: #EDF3FB;
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
    height: calc(100% - 0.32rem);

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
    height: 0.33rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #259CF3;
}
.g_companyAll{
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
<style lang="less" scoped>
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


