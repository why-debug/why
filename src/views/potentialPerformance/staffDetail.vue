<!-- 潜在业绩 - 个人详情 -->
<template>
    <div class="detail-all">
        <div class="g_nav f_r_b">
            <div class="f_r_s" style="height:100%;flex-shrink: 0;">
                <div class="u_content">{{staffUserName}}</div>
            </div>
            <div class="g_box f_r_s">
                <div class="u_export" @click="exportClick()"><div class="u_icon"></div>导出</div>
                <div class="u_close" @click="returnHome"></div>
            </div>
        </div>
        <div class="g_lists">
          <div class="g_lists_box">

            <div class="g_header" :class="dataList.length >7 ?'loadingMore':''">
                <!-- 表头 -->
                <div class="u_header ">标题图</div>
                <div class="u_header ">房源/编号</div>
                <div class="u_header ">户型</div>
                <div class="u_header ">面积</div>
                <div class="u_header ">总价 </div>
                <div class="u_header ">带看次数</div>
                <div class="u_header ">角色名称</div>
                <div class="u_header ">角色录入时间</div>
                <div class="u_header ">对应潜在业绩(元) </div> 
            </div>

            <div class="g_listBiggest">
              <div class="g_listBiggest_box">

                <div class="g_list" 
                v-for="(item,index) in dataList" :key="index"
                @dblclick="checkHouseDetail(item.caseId,item.caseType)"
                >
                    <!-- 表单 -->
                    <div class="u_list ">
                      <img 
                      :src="(!item.funPhotoList || item.funPhotoList.length ==0)? defaultImg: item.funPhotoList[0] " 
                      @error="defImg"></div>
                    <div class="u_list ">{{ item.funNum }}</div>
                    <div class="u_list ">{{ item.houseType }}</div>
                    <div class="u_list ">{{ item.area }}㎡</div>
                    <div class="u_list ">{{ item.totalPrice }}</div>
                    <div class="u_list ">{{ item.takeLookTimeCount }}次</div>
                    <div class="u_list ">
                        <div v-for="(roleList,roleIndex) in item.performanceDetail" :key="roleIndex">
                            {{ roleList.position }}
                        </div>
                    </div>
                    <div class="u_list ">
                        <div v-for="(timeList,timeIndex) in item.performanceDetail" :key="timeIndex">
                            {{ timeList.inputTime }}
                        </div>
                    </div>
                    <div class="u_list ">
                        <div class="money" v-for="(moneyList,moneyIndex) in item.performanceDetail" :key="moneyIndex">
                            {{ moneyList.money }}
                        </div>
                    </div> 

                </div>

              </div>
                
            </div>

          </div>
        </div>
    </div>
</template>
<script>
import {
    getPersonnalPortentialPerformanceRequest,
    getPersonnalPortentialPerformance
} from "../../net/potentialPerformance/potentialPerformance"

import { ErpCommon } from "../../utils/ErpCommon";

export default {
    data () {
        return {
            dataList:[],//页面数据
            parameter:new getPersonnalPortentialPerformanceRequest(),
            defaultImg: require("@/assets/images/potentialPerformance/default.jpg"),
            errImg: require("@/assets/images/common/load_failed_200.png"),
        }
    },
    props:{
        staffId: {
            type: String,
            default() {
                return '';
            }
        },
        staffUserName: {
            type: String,
            default() {
                return '';
            }
        },
    },
    watch:{
        staffId(){
            this.staffIdChange();
        }
    },
    components: {

    },
    created(){
      this.parameter.userId = this.staffId
      this.initData();
    },
    methods : {
        //请求
        initData(){
          console.log('this.parameter:',this.parameter)
            new getPersonnalPortentialPerformance(this.parameter).send()
            .then((res)=>{
                console.log(res,"潜在业绩 员工详情");
                if(!res){
                    new ErpCommon().toast("暂时没有更多数据!1",'error');
                    return
                }
                this.dataList = res; 
            })
            .catch((err)=>{
                console.log(err);
                new ErpCommon().toast(err.errMsg || "服务器开小差了,请稍后再试3",'error');
            });
        },
        //监听经纪人id
        staffIdChange(){
            this.parameter.userId = this.staffId;
        },
        
        // 图片报错给默认图
        defImg(){
            let img = event.srcElement;
            img.src = this.errImg;
            img.onerror = null; //防止闪图
        },
        //返回首页
        returnHome(){
            this.$emit("Close", true);
        },
        //查看房源详情
        checkHouseDetail(caseId = '', caseType = ''){
          if(!caseId || !caseType) return
          new ErpCommon().showFunDetai(caseId,caseType)
        },
        //导出数据
        exportClick(){
          
          let params  = {
            "fileName":'员工潜在业绩详情',
            "headList": [
              {"name": "房源编号","key": "funNum"}
              ,{"name": "户型","key": "houseType"}
              ,{"name": "面积","key": "area"}
              ,{"name": "总价","key": "totalPrice"}
              ,{"name": "带看次数","key": "takeLookTimeCount"}

              ,{"name": "角色名称","key": "roleName"}
              ,{"name": "角色录入时间","key": "roleInputTime"}
              ,{"name": "对应潜在业绩(元)","key": "roleMoney"}
              ]
          }

          var data = [].concat(this.dataList);

          
          console.log(this.dataList,"导出  前的数据");
          
          data.forEach(item => {
            let dataItem = item;
            let roleNameArr = []
            let roleInputTimeArr = []
            let roleMoneyArr = []

            let performanceDetail = item.performanceDetail

            performanceDetail.forEach(performanceItem=>{
              roleNameArr.push(performanceItem.position);
              roleInputTimeArr.push(performanceItem.inputTime);
              roleMoneyArr.push(performanceItem.money);
            })

            item.roleName = roleNameArr.join('\n')
            item.roleInputTime = roleInputTimeArr.join('\n')
            item.roleMoney = roleMoneyArr.join('\n')

          });

          params['data'] = data;
          
          console.log(data,"导出数据");
          console.log(this.dataList[0]['performanceDetail'],"导出数据后的源数据");
          new ErpCommon().exportExcelData(params);
          setTimeout(()=>{
              this.initData();
          },0)
        },
    },
}
</script>
<style scoped>
.money{
	font-family: SimSun;
	font-size: 0.12rem;
	font-weight: bold;
	color: #ff7f00;
}
.detail-all{
  position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
}
.g_nav{
    padding-left: 0.09rem;
    background-color: #F4F4F4;
    width: 100%;
    height: 0.32rem;
    align-items: center;
    background-image: linear-gradient(#f9f9f9, #EFEFEF);
    box-sizing: border-box;
    box-shadow: 0rem 0rem 0.02rem 0.01rem rgba(0, 0,0, 0.1) inset
}
.g_box{
    font-size: 0.1rem;
    align-items: center;
    padding-top: 0.03rem;
}
.u_content{
    font-family: SimSun;
    font-size: 0.12rem;
    padding: 0 0.1rem;
    height: 0.28rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(206, 206, 206);
    border-bottom: none;
    margin-right: 0.08rem;
    border-top-left-radius:0.03rem;
    margin-top: 0.03rem;
    color: #00223a;
    background-color: #FFFFFF;
    z-index: 10;
}
.u_icon{
    width: 0.1rem;
    height: 0.1rem;
    position: absolute;
    left: -0.15rem;
    top: 0.02rem;
    background:url("../../assets/images/potentialPerformance/u_Export.png")no-repeat center center;
    background-size: cover;
}
.u_export{
    position: relative;
    color: #259CF3;
    flex-shrink:0;
    font-family: MicrosoftYaHei;
	  font-size: 0.12rem;
    cursor: pointer;
    margin-right: 0.1rem;
    margin-left: 0.05rem;
    font-weight: bold;
    display: flex;
    align-items: center;
}
.u_close{
  width: 0.24rem;
  height: 0.24rem;
  margin-left: 0.1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/images/public/close_200.png") no-repeat center center;
  background-size: 0.1rem 0.1rem;
}
.g_lists{
  position:relative;
  width: 100%;
  height: calc(100% - 0.33rem);
  background-color: #FFFFFF;
  overflow-x: auto;
  overflow-y: hidden;
}
.g_lists_box{
  position:relative;
  height: 100%;
  width: auto;

}
.g_list:hover{
    background-color: #d9f1fe;
    border: 1px #73baee solid;
}
.g_list:focus{
    background-color: #d9f1fe;
    border: 1px #73baee solid;
}

.g_listBiggest{
  height: calc(100% - 0.33rem);
  position:relative;
  overflow-y: auto;
  /* overflow-x: hidden; */
}
.g_listBiggest_box{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.g_list{
    display: flex;
    width: 100%;
    /* height: 100%; */
    cursor: pointer;
    border-bottom: none!important;
    border-top: none!important;
}
.g_header{
  display: flex;
  justify-content: flex-start;
  height: 0.32rem;
  border: 0.01rem solid #ebf0f5;
}
.g_header.loadingMore{
  padding-right: 0.03rem;
}
.u_header{
    min-width: 1.5rem;
    width: 11.04%;
    height: 0.32rem;
    border-left: 1px solid #d8e2e7;
    border-right: 1px solid #d8e2e7;
   background-color: #ebf0f5;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    font-family: SimSun;
    font-size: 0.12rem;
    font-weight: bold;
    color: #666666;
}
.u_header:last-child, .u_list:last-child{
    border-right: none!important;
    flex: 1;
}
.u_header:first-child, .u_list:first-child{
    border-left: none!important;
}
.u_list{
    min-width: 1.5rem;
    width: 11.04%;
    height: 1.05rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: SimSun;
    font-size: 0.12rem;
    color: #666666;
    border: 1px solid #d8e2e7;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    word-break: break-all;

}
.u_list>img{
	width: 1.1rem;
	height: 0.84rem;
    object-fit: cover;
    object-position: top center;
}
</style>
