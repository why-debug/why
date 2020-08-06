<template>
    <!-- 新房意向单收款单 详情 -->
    <div class="borkerDetail">
        <div class="g_content">
            <div class="g_detailAll">
                <div class="g_lineNav">
                    <div class="g_navDetail" :class="navSelectIndex == 1 ? 'g_navDetailSelect' : ''" @click="f_navSelect(1)">
                        <img v-if="navSelectIndex != 1" src="../../../../assets/images/projectAgentInfo/contract/not_Infor.png"/>
                        <img v-if="navSelectIndex == 1" src="../../../../assets/images/projectAgentInfo/contract/IconCustSelect_200.png"/>
                    </div>
                    <!-- <div class="g_navDetail" :class="navSelectIndex == 2 ? 'g_navDetailSelect' : ''" @click="f_navSelect(2)">
                        <img v-if="navSelectIndex != 2" src="../../../../assets/images/projectAgentInfo/contract/icon1_200.png"/>
                        <img v-if="navSelectIndex == 2" src="../../../../assets/images/projectAgentInfo/contract/icon2_200.png"/>
                    </div> -->
                    <div class="g_navDetail" 
                   
                    :class="navSelectIndex == 3 ? 'g_navDetailSelect' : ''" 
                    @click="f_navSelect(3)">
                        <img v-if="navSelectIndex == 3" src="../../../../assets/images/projectAgentInfo/contract/Annex.png"/>
                        <img v-if="navSelectIndex != 3" src="../../../../assets/images/projectAgentInfo/contract/not_Annex.png"/>
                    </div>
                </div>
                <div class="g_select" v-if="navSelectIndex == 1">
                    <div class="g_detailInfo">
                        <div class="infor">
                            <infor :detailList="detailList"></infor>
                        </div>
                    </div>
                    <div class="g_statu">
                      <newReportNo ></newReportNo>
                    </div>
                </div>
                <div class="g_select" v-if="navSelectIndex == 2">
                    <chargeRecords :detailList="brokerList"></chargeRecords>
                </div>
                <div class="g_select" v-if="navSelectIndex == 3">
                    <Annex :detailList="detailList.annexList"></Annex>
                </div>
            </div>
            <!--右上角缩小关闭按钮-->
            <div class="g_rightCornerBox f_r_b">
                <div @click="f_closeView" class="g_closeView f_r_s"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    GetCompanyDetailsList,
    GetDistributionCompanyBrokersList
} from "../../../../net/projectAgentinfo/companyRequest/GetCompanyDetails"
import infor from "./components/infor" 
import chargeRecords from "./components/chargeRecords" 
import Annex from "./components/annex" 
import newReportNo from "./components/newReportNo" 
export default {
    data(){
        return{
            detailList:{},
            brokerList:[],
            navSelectIndex:1,
        }
    },
    props:{
        compId:{
            type:Number,
            default(){
                return 0;
            }
        },
    },
    components:{
        infor,
        chargeRecords,
        Annex,
        newReportNo,
    },
    created(){
        this.initDate();
    },
    methods:{
        initDate(){
            let parameter = {
                compId : this.compId,
            };
            // 获取分销公司详情(包括附件详情)
            new GetCompanyDetailsList(parameter).send()
            .then((res)=>{
                console.log("分销公司详情页数据:",res);
                this.detailList = res;
            })
            .catch((err)=>{
                console.log('服务器开了个小差，重稍后重试');
            });
            //获取分销公司经纪人列表
            new GetDistributionCompanyBrokersList(parameter).send()
            .then((res)=>{
                console.log("分销公司经纪人列表数据:",res);
                this.brokerList = res;
            })
            .catch((err)=>{
                console.log('服务器开了个小差，重稍后重试');
            })
        },
        f_navSelect(index){
            this.navSelectIndex = index;
            
        },
        //关闭弹窗
        f_closeView() {
            setTimeout(()=>{
                this.$emit("f_closeView", true);
            },200)
        },
    },
}
</script>
<style scoped>
    @import "../../../../common/css/common.css";
.g_select{
	width: 8.16rem;
	height: 4.87rem;
	background-color: #eff4f9;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.infor{
    width: 100%;
    height: 100%;
}
.g_detailInfo{
	width: 5.86rem;
    height: 100%;
	background-color: #eff4f9;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0.1rem;
    box-sizing: border-box;
}
.g_statu{
    width: 2.3rem;
    height: 100%;
    background-color: #d9f1fe;
}
.g_navDetailSelect{
  width: 100%;
  height: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #eff4f9;
}
.g_navDetailSelect img{
  width: 0.2rem;
  height: auto;
  padding: 0.15rem;
}
.g_navDetailSelect:hover{
  background-color: #eff4f9!important;
}
.g_navDetail{
  width: 100%;
  height: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.g_navDetail img{
  width: 0.2rem;
  height: auto;
  padding: 0.15rem;
  position: absolute;
  left: 0;
  top: 0;
}
.g_navDetail:hover{
  background-color: #7fb5ce;
}
.g_lineNav{
    width: 0.5rem;
    height: 100%;
    padding-top: 0.2rem;
    box-sizing: border-box;
    background-image: linear-gradient(#50a7cf, #4681b0);
}
.g_detailAll{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 8.66rem;
	height: 4.88rem;
}
.g_closeView {
  width: 0.33rem;
  height: 0.27rem;
  cursor: pointer;
  background-image: url("../../../../assets/images/projectAgentInfo/contract/close_200.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.12rem auto;
  box-sizing: border-box;
}
.g_closeView:hover {
  background-color: #f05656;
  background-image: url("../../../../assets/images/projectAgentInfo/contract/close_200_hover.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.12rem auto;
}
.g_content{
    width: 8.66rem;
	height: 4.88rem;
    display: flex;
    justify-content: flex-start;
    position: relative;
}
.g_rightCornerBox{
    position: absolute;
    top: 0;
    right: 0;
    height: 0.27rem;
    align-items: center;
    cursor: pointer;
}
.borkerDetail{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 99;
}
</style>

