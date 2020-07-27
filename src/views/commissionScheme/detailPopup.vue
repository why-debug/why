
<!-- 佣金计划详情 -->
<template>
<div class="g_selectCustomer f_c_c">
    <div class="g_popup" @click.stop="">
        <ul>
            <li class="g_title">查看【姓名：{{item.userName || '-'}}，工号：{{item.userNo || '-'}}，组织编码：{{item.organizationNo || '-'}}】的佣金计划</li>
        </ul>
        <div class="g_residentContent">
            <div class="g_residentContentTop f_r_s">
                <div class="u_titleItem g_code">工号</div>
                <div class="u_titleItem g_status">用户状态</div>
                <div class="u_titleItem g_org">组织</div>
                <div class="u_titleItem g_effectiveTime">有效时间</div>
                <div class="u_titleItem g_frist">一买</div>
                <div class="u_titleItem g_frist">一租</div>
                <div class="u_titleItem g_frist">一策</div>
                <div class="u_titleItem g_fristLast">一返</div>
                <div class="u_titleItem g_secend">二买</div>
                <div class="u_titleItem g_secend">二租</div>
                <div class="u_titleItem g_secend">二策</div>
                <div class="u_titleItem g_secendLast">二返</div>
            </div>
            <!-- 列表 -->
            <div class="g_residentContentList" v-if="!!list && list.length >0">
                <div class="g_residentItem f_r_s" v-for="(item,index) in list" :key="index">
                    <div class="u_listItem g_code">{{ item.userNo }}</div>
                    <div class="u_listItem g_status">{{ item.userStatus == 1?'正常':'作废' }}</div>
                    <div class="u_listItem g_org">{{ (item.organizationName || '') +"-"+ (item.organizationNo) }}</div>
                    <div class="u_listItem g_effectiveTime">{{(item.effectDate || '-') + '至' + (item.expireDate || "-")}}</div>
                    <!-- 一买 -->
                    <div class="u_listItem g_frist">{{item.firsthandSale == 1?'是':'否'}}</div>
                    <!-- 一租 -->
                    <div class="u_listItem g_frist">{{item.firsthandRent == 1?'是':'否'}}</div>
                    <!-- 一策 -->
                    <div class="u_listItem g_frist">{{item.firsthandPlan == 1?'是':'否'}}</div>
                    <!-- 一返 -->
                    <div class="u_listItem g_fristLast">{{item.firsthandBenefit == 1?'是':'否'}}</div>

                    <!-- 二买 -->
                    <div class="u_listItem g_secend">{{item.secondhandSale == 1?'是':'否'}}</div>
                    <!-- 二租 -->
                    <div class="u_listItem g_secend">{{item.secondhandRent == 1?'是':'否'}}</div>
                    <!-- 二策 -->
                    <div class="u_listItem g_secend">{{item.secondhandPlan == 1?'是':'否'}}</div>
                    <!-- 二返 -->
                    <div class="u_listItem g_secendLast">{{item.secondhandBenefit == 1?'是':'否'}}</div>
                </div>
            </div>
            <div class="g_isLoading" v-else-if="isLoading">
                <!--<img src="../../assets/images/Report/loading.gif" alt="">-->
            </div>

            <noData v-show="list.length == 0 && !isLoading" text="没有相关数据"></noData>
            
        </div>
        <!--右上角缩小关闭按钮-->
        <div class="u_rightCornerBox f_r_b">
            <div @click="f_closeView" class="g_closeView f_r_s"></div>
        </div>
    </div>
</div>
</template>
<script>
// 组件
import noData from '../../components/common/noData';
import {
    GetUserCommissionSnrList,
    GetUserCommissionSnrListRequest
} from "../../net/commissionScheme/GetUserCommissionSnrList";

export default {
    components:{
        noData,
    },
    props:{
      item:{
        type: Object,
        default(){
            return {};
        }
      },
    },
    watch: {
      item:{
        handler:function (newVal) {
            this.initData()
        },
        deep: true,
      }
    },
    data(){
        return{
          list:[],//页面数据列表
          isLoading:false,//正在加载
          paramObj: new GetUserCommissionSnrListRequest(),//参数
        }
    },
    mounted() {
      this.initData();
    },
    methods: {
      //请求获取员工佣金详细计划数据
        async initData(){
          if(!this.item.userId) return;
          this.paramObj.userId = this.item.userId;
          // this.paramObj.userId = 20341279;
          let data = await new GetUserCommissionSnrList(this.paramObj).send();
          this.list = data.list

        },
        //触底加载
        f_scrollBottom(){
            this.initData();
        },
        //关闭弹窗
        f_closeView() {
            console.log("f_closeView");
            this.$emit("f_closeView", true);
        },
    },
}
</script>

<style scoped>
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
@import "../../common/css/common.css";
.g_fristLast{
    width: 0.6rem;
}
.g_secendLast{
    flex: 1;
}
.g_code{width: 0.8rem;}
.g_status{ width: 0.6rem;}
.g_org{ width: 1.1rem;}
.g_frist, .g_secend{
    width: 0.5rem;
}
.g_effectiveTime{
    width: 2rem;
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
  background-image: url("../../assets/images/public/close_200.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.12rem auto;
  box-sizing: border-box;
}
.g_closeView:hover {
  background-color: #f05656;
  background-image: url("../../assets/images/public/close_200_hover.png");
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
    border: 0.01rem solid #ebeef0;
    box-sizing: border-box;
    padding-left: 0.01rem;
}
.u_titleItem {
  white-space: nowrap;
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
  white-space: nowrap;
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








