
<!--报备列表 客源列表-->
<template>
<div class="g_selectCustomer f_c_c">
    <div class="g_popup" @click.stop="">
        <ul>
            <li class="g_title">选择公司</li>
            <li style="position: relative;"><searchInput :placeholder="'请输入名称'" :width="'2.3'" @Kwd="f_kwd"></searchInput></li>
            <li class="g_title"><button class="u_btn" @click="f_submit">查询</button></li>
        </ul>
        <div class="g_residentContent">
            <div class="g_residentContentTop f_r_s">
            <div class="u_titleItem g_contractName">公司名称</div>
            <div class="u_titleItem g_extensionName">公司简称</div>
            <div class="u_titleItem g_number">门店码</div>
            <div class="u_titleItem g_signName">创建时间</div>
            <div class="u_titleItem g_contractDate">签约时间</div>
            </div>
            <!-- 列表 -->
            <div class="g_residentContentList" v-if="!!contractList && contractList.length >0">
                <div class="g_residentItem f_r_s" v-for="(item,index) in contractList" @dblclick="f_submitData(item)" :key="index">
                    <div class="u_listItem g_contractName">{{ item.companyName }}</div>
                    <div class="u_listItem g_extensionName">{{ item.simpleName }}</div>
                    <div class="u_listItem g_number">{{ item.storeNum }}</div>
                    <div class="u_listItem g_signName">{{ item.foundDate }}</div>
                    <div class="u_listItem g_contractDate">{{ item.signDate }}</div>
                </div>
            </div>
            <div class="g_isLoading" v-else-if="isLoading">
                <img src="../../../assets/images/projectAgentInfo/contract/loading.gif" alt="">
            </div>
            <div class="g_noData" v-else>
                <img src="../../../assets/images/projectAgentInfo/contract/nodate.png" alt="">
                <div class="g_text">没有相关数据哦!</div>
            </div>
        </div>
        <!--右上角缩小关闭按钮-->
        <div class="u_rightCornerBox f_r_b">
            <div @click="f_closeView" class="g_closeView f_r_s"></div>
        </div>
    </div>
</div>
</template>
<script>
import searchInput from "./searchInput";
import {
    CompanyRequestParameter,
    GetCompanyList,
} from "../../../net/projectAgentinfo/GetCompangList.js"

export default {
    components : {
        searchInput,
    },
    data(){
        return{
            contractList:[],//页面数据列表
            isLoading:false,//正在加载
            parameter:new CompanyRequestParameter(),//参数
            searchInputVal: '' // 搜素公司名称关键字
        }
    },
    created(){
        this.initData();
    },
    methods: {
        initData(){
            this.isLoading = true;
            let params = {
                compName:this.searchInputVal
            }
            new GetCompanyList(new CompanyRequestParameter(params)).send()
            .then((res)=>{
                this.isLoading = false;
                this.contractList = res;
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //查询
        f_submit(){
            console.log(this.searchInputVal,'this.item.sourceNo');
            setTimeout(()=>{
                this.initData();
            },200)
        },
        // 关键字(公司名称)
        f_kwd(val){
            console.log(val,'哈哈哈哈哈哈哈哈哈哈或或');
            this.searchInputVal = val;
        },
        //关闭弹窗
        f_closeView() {
            setTimeout(()=>{
                this.$emit("f_closeView", true);
            },200)
        },
        //点击公司信息
        f_submitData(data){
            setTimeout(()=>{
                this.$emit("f_componentData", data);
                this.$emit("f_closeView", true);
            },200)
        }
    },
}
</script>

<style>
.g_popup>ul>li>.f_r_s>.base-input-box{
    height: 0.26rem!important;
    padding: 0 0.1rem 0 0.1rem!important;
    border-radius: 0.03rem!important;
}
.g_popup>ul>li>.f_r_s>.search_icon_b{
    top: 0.03rem;
}
</style>
<style scoped>
@import "../../../common/css/common.css";

.g_number{
    width: 1.5rem
}
.g_contractName{
    width: 1.3rem
}
.g_extensionName, .g_signName{
    width: 1.4rem;
}
.g_contractDate{
    flex: 1;
}
.g_selectCustomer{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(68, 68, 68, 0.5)
}
.g_popup>ul>li .base-select-box{
    height: 0.26rem!important;
}
.g_popup{
	width: 8.66rem;
	height: 4.88rem;
  margin:auto;
  background-color: #eff4f9;
  position: relative;
  padding: 0.12rem 0.2rem;
}
.g_popup>ul>li{
  margin-left:0.05rem;
}
.g_popup>ul>li:nth-child(2){
  margin-left:0.21rem;
}
.g_popup>ul>li:nth-child(4){
  height: 0.26rem!important;
}
.g_popup>ul{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 0.4rem;
}
.u_rightCornerBox {
  position: absolute;
  top: 0;
  right: 0;
  height: 0.27rem;
  align-items: center;
  cursor: pointer;
}
.g_closeView {
  width: 0.33rem;
  height: 0.27rem;
  cursor: pointer;
  background-image: url("../../../assets/images/projectAgentInfo/contract/close_200.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.12rem auto;
  box-sizing: border-box;
}
.g_closeView:hover {
  background-color: #f05656;
  background-image: url("../../../assets/images/projectAgentInfo/contract/close_200_hover.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.12rem auto;
}
.g_title{
	font-family: MicrosoftYaHei-Bold;
	font-size: 0.14rem;
	color: #444444;
    font-weight: bold;
    margin-left: 0rem !important;
}
.u_btn{
  color: #666666;
  background-color: #F1F1F1;
  padding: 0.035rem 0.13rem;
  font-size: 0.12rem;
  margin-left: 0.1rem;
  border: 1px solid #BFC2C4;
}
.g_residentContent {
    min-width: 8.26rem;
    height: 4.15rem;
    position: fixed;
    margin-top: 0.1rem;
    max-width: 8.66rem;
    width: 100%;
    box-shadow: 0.01rem 0.01rem 0.01rem 0.01rem rgba(235, 238, 255, 0.7);
    border: 1px solid #EBEEF0;
    box-sizing: border-box;
}
.g_residentContentTop {
  width: 100%;
  height: 0.35rem;
  background-color: #ebeef0;
}
.u_titleItem {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.12rem;
  font-weight: bold;
  line-height: 0.35rem;
  color: #888888;
  padding-left: 0.1rem;
  box-sizing: border-box;
}
.g_residentContentList{
  height: calc(100% - 0.35rem);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.g_residentItem {
  width: 100%;
  height: 0.35rem;
  background-color: #ffffff;
  border: 0.01rem solid #ededed;
  margin-bottom: 0.015rem;
  box-sizing: border-box;
}
.g_residentItem:hover{
  background-color: #d9f1fe;
  border: 1px #73baee solid;
  cursor: pointer;
}
.u_listItem {
  font-family: MicrosoftYaHei;
  font-size: 0.14rem;
  line-height: 0.35rem;
  color: #444444;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 0.1rem;
  box-sizing: border-box;
}
.g_isLoading{
    position:absolute;
    top: 0;
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.g_noData{
    width: 100%;
    height: calc(100% - 0.35rem);
    min-width: 8.26rem;
    min-height: 3.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.g_text{
    font-size: 0.18rem;
    color: #999999;
    margin-top: 0.1rem;
}
</style>








