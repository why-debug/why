<template>
    <div class="g_annexInforAll">
        <div class="g_detailTop">
            <div class="g_annexName">附件</div>
        </div>
        <div class="g_annexLists">
            <div class="g_annexLine">
                <div class="u_annex" v-for="(item,index) in detailList" :key="index">
                    <!-- <div class="g_annexIcon"></div>
                    <div class="g_content">
                        <div class="g_title">{{ item.enclosureName }}</div>
                        <div class="g_detail">200k</div>
                    </div>-->
                    <fileBox   :fileName="item.enclosureName" :fileSizeCn="item.attachmentSize" :filePathUrl="item.enclosurePath"  :delFlag="false" ></fileBox>
                 <div class="g_look" @click="preView(item.enclosureName,item.enclosurePath)">预览</div> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import fileBox from "../../../../components/form/fileBox"
import {ErpCommon} from '../../../../utils/ErpCommon'

export default {
    data(){
        return{
         preViewFlag : false,
        }
    },
    props:{
        detailList:{
            type:Array,
            default(){
                return [];
            }
        },
    },
    components:{
        fileBox
    },
    created(){
    },
    methods:{
     preView:function(fileName,filePathUrl){
    // this.preViewFlag=true;
    new ErpCommon().showOnlineSource(fileName,filePathUrl);
     }
    },
}
</script>
<style scoped>
.g_detail{
	font-family: MicrosoftYaHei;
	font-size: 0.12rem;
	color: #999999;
}
.g_title{
	font-family: MicrosoftYaHei;
	font-size: 0.12rem;
	color: #444444;
}
.g_look{
	width: 0.42rem;
	height: 0.2rem;
	border-radius: 0.1rem;
	border: solid 0.01rem rgba(153, 153, 153, 0.4);
    margin-right: 0.1rem;
    position: absolute;
    right: 0.1rem;
    top: 0.11rem;
	font-family: MicrosoftYaHei;
	font-size: 0.12rem;
	color: #666666;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.g_content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0.07rem 0 0.08rem 0.1rem;
    box-sizing: border-box;
}
.g_annexIcon{
    margin-left: 0.11rem;
	width: 0.24rem;
	height: 0.3rem;
    border: 1px solid black;
    /* background-image: url(); */
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
}
.u_annex{
	width: 2.49rem;
	height: 0.44rem;
	background-color: #ffffff;
	border-radius: 0.02rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    flex-shrink: 1;
    margin-right: 0.16rem;
    margin-bottom: 0.1rem;
    float: left;
}
.g_annexLists{
    width: 100%;
    height: 100%;
}
.g_annexLine{
    width: 100%;
    height: auto;
    /* display: flex;
    justify-content: flex-start;
    flex-wrap: wrap; */
    float: left;
}
.g_annexName{
    font-family: MicrosoftYaHei-Bold;
    color: #444444;
    font-weight: bold;
    white-space: nowrap;
	font-size: 0.14rem;
}
.g_detailTop{
	width: 100%;
	height: 0.34rem;
	background-color: #eff4f9;
    display: flex;
}
.g_annexInforAll{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0.22rem 0.1rem 0 0.1rem;
    box-sizing: border-box;
}
</style>
