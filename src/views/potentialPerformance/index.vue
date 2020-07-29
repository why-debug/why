<!--直销统计-->
<template>
<div class="all">
    <div class="list_nav f_r_b">
        <div class="f_r_s" style="height:100%;flex-shrink: 0;">
            <div class="content">潜在业绩</div>
        </div>
        <div class="r-box f_r_s">
            <div class="u_export" @click="exportClick(ListAll)"><div class="u_icon"></div> 导出</div>
        </div>
    </div>
    <div class="g_header">
        <!-- 表头 -->
        <div class="box_title f_r_s">
            <div class="title_font_base ">排行</div>
            <div class="title_font_base ">姓名</div>
            <div class="title_font_base ">员工编号</div>
            <div class="title_font_base ">潜在业绩(元)</div>
            <div class="title_font_base ">接盘人</div>
            <div class="title_font_base ">实勘人</div>
            <div class="title_font_base ">钥匙人</div>
            <div class="title_font_base ">备案人</div>
        </div>
    </div>
    <div class="g_lists" v-if="!!ListAll && ListAll.length > 0 && !isLoad"
       v-infinite-scroll=" NoData ? '' : scrollBottom " 
       infinite-scroll-immediate="false">
        <!-- 表单 -->
        <div class="g_list f_r_s" 
        v-for="(item,index) in ListAll" :key="index" 
        @dblclick="lurkParformanceDetail(item.userId,item.userName,item.isOperator)">
            <div class="title_font_base indexOne">{{ item.num }}</div>
            <div class="title_font_base ">{{ item.userName }}</div>
            <div class="title_font_base ">{{ item.userNo}}</div>
            <div class="title_font_base indexOne">{{ item.portentialTotalPerFormance}}</div>
            <div class="title_font_base ">{{ item.offereeCount }}</div>
            <div class="title_font_base ">{{ item.checkCount }}</div>
            <div class="title_font_base ">{{ item .submitKeyCount }}</div>
            <div class="title_font_base ">{{ item.recordCount }}</div>
        </div>
    </div>
    <div class="isLoading" v-else-if="isLoad">
        <img src="../../assets/images/public/loadIng.gif" >
    </div>
    <div class="noData" v-else>
        <img src="../../assets/images/public/nodate.png" alt="">
        <div class="text">暂时没有相关数据哦!</div>
    </div>
    

    <!-- 员工详情弹窗 -->
    <div v-if="isStaffDetail" class="detail-model">
        <staffDetail @Close="Close" :staffId="staffId" :staffUserName="staffUserName"></staffDetail>
    </div>
</div>
</template>
<script>
import {
    getPortentialPerformanceRankRequest,
    getPortentialPerformanceRank,
} from "../../net/potentialPerformance/potentialPerformance";

import { ErpCommon } from "../../utils/ErpCommon";

// 组件
import staffDetail from "./staffDetail";


export default {
    data () {
        return {
            roleType: [
                {id:'',text:'全部'},
                {id:1,text:'实勘人'},
                {id:2,text:'钥匙人'},
                {id:3,text:'备案人'},
                {id:4,text:'接盘人'},
            ],
            empty:false,//是否清空
            isLoad:false,//正在加载标志
            repeat: false,//重复操作标志
            selectOrgId:'',//组织id
            selectBorderId:'',//归属人id
            parameter:new getPortentialPerformanceRankRequest(),//页面参数
            ListAll:[],//接口返回字段
            isStaffDetail:false,//员工详情
            staffId:'',//当前员工id
            staffUserName:'',//当前员工名
            NoData:false,//无数据
        }
    },
    components: {
        staffDetail,
    },
    created(){
      window.erpSearchConfirm = this.erpSearchConfirm;
      new ErpCommon().refreshData();
      this.initData();
    },
    methods : {
      //ERP 查询按钮确认
      erpSearchConfirm(erpParamsJsonString) {
        console.log('erpParamsJsonString:',erpParamsJsonString);
        //let erpParamsJsonString =  {"organizationId":"894706","position":"2","userId":""}
        let erpParamsJson = JSON.parse(erpParamsJsonString);
        this.parameter['organizationId'] = erpParamsJson.organizationId || ''
        this.parameter['position'] = erpParamsJson.position || ''
        this.parameter['userId'] = erpParamsJson.userId || ''
        this.parameter.pageNum = 1;
        this.initData();
      },
      //请求
      initData(){
          this.isLoad = true;
          this.repeat = true;
          new getPortentialPerformanceRank(this.parameter).send()
          .then((res)=>{
              console.log(res,"潜在业绩");
              if(!res){
                  new ErpCommon().toast('服务器开小差了,请稍后再试');
                  this.isLoad = false;
                  this.repeat = false;
                  this.NoData = true;
                  return
              }
              this.isLoad = false;
              this.repeat = false;
              if(this.parameter.pageNum == 1){
                this.ListAll = res; 
              }else{
                this.ListAll = this.ListAll.concat(res);
              }
              
              this.NoData = this.ListAll.length == 0 ? true:false;
              
          })
          .catch((err)=>{
              console.log(err);
              this.isLoad = false;
              this.NoData = false;
              this.repeat = false;
              new ErpCommon().toast('服务器开小差了,请稍后再试');
          });
      },
      
      //双击跳转 员工详情
      lurkParformanceDetail(userId , userName, isOperator){
        if(!userId) return;
        // 潜在业绩金额查看权: VIEW_PORTENTIAL_PERFORMANCE_MONEY
        let checkMoneyFlag = new ErpCommon().judgePermission('VIEW_PORTENTIAL_PERFORMANCE_MONEY')
        if(!checkMoneyFlag && isOperator != 1){
          //不是本人且没有金额查看权，不可查看详情
          return
        }
        //隐藏erp筛选栏
        new ErpCommon().bShowAuditFilter(false);
        this.isStaffDetail = true;
        this.staffId = userId;
        this.staffUserName = userName || '';
      },
      //关闭弹窗
      Close(){
        //展示erp筛选栏
        new ErpCommon().bShowAuditFilter(true);
        this.isStaffDetail = false;
      },
      //导出数据
      exportClick(data){
        let params  = {
            "fileName":'潜在业绩排行',
            "headList": [
              {"name": "排行","key": "num"}
              ,{"name": "姓名","key": "userName"}
              ,{"name": "员工编号","key": "userNo"}
              ,{"name": "潜在业绩（元）","key": "portentialTotalPerFormance"}
              ,{"name": "接盘人","key": "offereeCount"}
              ,{"name": "实勘人","key": "checkCount"}
              ,{"name": "钥匙人","key": "submitKeyCount"}
              ,{"name": "备案","key": "recordCount"}
            ]
          }
          params['data'] = this.ListAll;
          new ErpCommon().exportExcelData(params);
      },
      //触底加载
      scrollBottom(){
          this.parameter.pageNum +=1;
          this.initData();
      },
    },
}
</script>
<style scoped>
@import "../../common/css/common.css";
.indexOne{
	font-family: SimSun;
	font-size: 0.12rem;
	font-weight: bold;
	color: #ff7f00!important;
}
.close{
    width: 0.24rem;
    height: 0.24rem;
    margin-left: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../../assets/images/public/close_200_hover.png") no-repeat center center;
    background-size: 0.1rem 0.1rem;
}
.title_font_base:last-child{
    border-right: none;
}
.title_font_base:first-child{
    border-left: none;

}
.title_font_base{
    width: 12.5%;
    height: 100%;
    font-family: SimSun;
    font-size: 0.12rem;
    letter-spacing: 0;
    color: #666666;
    padding-left: 0.1rem;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    text-align: center;
    border: 1px solid #d8e2e7;
    border-top: none;
    border-bottom: none;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}
.box_title{
    width: 100%;
    height: 0.3rem;
    border-left: 1px solid #d8e2e7;
}
.text{
    font-size: 0.18rem;
    color: #999999;
    margin-top: 0.1rem;
}
.u_icon{
    width: 0.11rem;
    height: 0.11rem;
    position: absolute;
    left: -0.15rem;
    top: 0.025rem;
    background:url("../../assets/images/potentialPerformance/u_Export.png")no-repeat center center;
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
    font-weight: bold;
    display: flex;
    cursor: pointer;
    align-items: center;
}
.isLoading{
    position:absolute;
    top: 0.65rem;
    width: 100%;
    height: calc(100% - 0.65rem);
    min-height: 2rem;
    background: rgba(0, 0, 0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
}
.noData{
    width: 100%;
    height: calc(100% - 0.65rem);
    min-height: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #E6E6E6;
}
.g_lists{
    width: 100%;
    height: calc(100% - 0.65rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #FFFFFF;
}
.g_list{
    width: 100%;
    height: 0.3rem;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    flex-shrink: 1;
    cursor: pointer;
    border: 1px solid #d8e2e7;
}
.g_list:hover{
    background-color: #d9f1fe;
    border: 1px #73baee solid;
}
.g_list:focus{
    background-color: #d9f1fe;
    border: 1px #73baee solid;
}
.all{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #EDF3FB;
    position: relative;
}
.g_header{
    width: 100%;
    height: 0.3rem;
    background-color: #ffffff;
    border-top: 1px solid #DEDEDE;
    z-index: 5;
}
.r-box{
    font-size: 0.1rem;
    align-items: center;
    padding-top: 0.03rem;
}
.content{
    font-family: SimSun;
    font-size: 0.12rem;
    width: 0.84rem;
    height: 0.32rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(206, 206, 206);
    border-bottom: none;
    margin-right: 0.08rem;
    border-top-left-radius:0.03rem;
    margin-top: 0.03rem;
    cursor: pointer;
    color: #00223a;
    background-color: #FFFFFF;
    z-index: 10;
}
.list_nav{
    padding-left: 0.09rem;
    background-color: #F4F4F4;
    width: 100%;
    height: 0.34rem;
    align-items: center;
    background-image: linear-gradient(#f9f9f9, #EFEFEF);
    box-sizing: border-box;
    box-shadow: 0rem 0rem 0.02rem 0.01rem rgba(0, 0,0, 0.1) inset
}
.screen_big{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 0.31rem;
    background: #259cf3;
    flex-shrink: 0;/*防止被压缩*/
    border-bottom:1px solid #126fb2;
}
.screen{
    max-width: 14.4rem;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.screen>li{
    min-width: 1.1rem;
    max-width:1.7rem;
    width: auto;
    height: 0.31rem!important;
	font-family: SimSun;
	font-size: 0.12rem;
	color: #00223a;
}
.screen_right{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right:0.15rem;
}
.Submit{
    margin-right:0.1rem;
}
.screen_right>.btn{
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
    background-image: url("../../assets/images/public/screenDefaul_200.png");
}
.screen_right>.btn:hover{
    background-image: url("../../assets/images/public/screenHover_200.png");
}
.screen_right>.btn:active{
    background-image: url("../../assets/images/public/screenActive_200.png");
}
.detail-model{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 200;
  overflow: hidden;
}
</style>
<style lang="less">
.screen li .select_reg .selected_item .selected_text{
    text-shadow: 0 0.01rem rgba(255, 255, 255, 0.3);
}
</style>
<style>
.screen>li .selected_text{
    font-weight: normal!important;
}
.screen>li .selected_item{
    height: 0.32rem!important;
    line-height: 0.31rem!important;
    box-sizing: border-box;
    border-bottom:1px solid #126fb2;
}
</style>