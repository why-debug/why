<template>
    <!-- 分销经纪人 详情 -->
    <div class="borkerDetail">
        <div class="g_content">
            <div class="g_detailAll">
                <div class="g_lineNav">
                    <div class="g_navDetail">
                        <img src="../../../assets/images/projectAgentInfo/contract/IconCustSelect_200.png"/>
                    </div>
                </div>
                <div class="g_detailInfo">
                    <div class="g_detailTop">
                        <div class="g_borkerName">{{ detailList.title || '何明的签约合同' }}</div>
                    </div>
                    <div class="g_columnTwo">
                        <div class="g_leftInfo g_text">
                            <div class="g_maxWidth g_max">原合同编号:</div>
                            <span>{{ detailList.contactNum || '--' }}</span>
                        </div>
                        <div class="g_rightInfo g_text">
                            <div class="g_maxWidth g_max">原合同名称:</div>
                            <span>{{ detailList.contactName || '--' }}</span>
                        </div>
                    </div>
                    <div class="g_columnTwo">
                        <div class="g_leftInfo g_text">
                            <div class="g_maxWidth g_max">原合同当前审批人:</div>
                            <span>{{ detailList.contactReviewer || '--' }}</span>
                        </div>
                        <div class="g_rightInfo g_text">
                            <div class="g_maxWidth g_max" style="width:0.75rem;">原合同当前审批状态:</div>
                            <span style="color:#ff8002">{{ detailList.reviewStatuText || '--' }}</span>
                        </div>
                    </div>
                    <div class="g_columnTwo">
                        <div class="g_leftInfo g_text">
                            <div class="g_maxWidth g_max">资料类型:</div>
                            <span>{{ detailList.infoType || '--' }}</span> 
                        </div>
                        <div class="g_rightInfo g_text">
                            <div class="g_maxWidth g_max">盖章类型:</div>
                            <span>{{ detailList.sealTypeText || '--' }}</span>
                        </div>
                    </div>
                    <div class="g_columnTwo">
                        <div class="g_leftInfo g_text g_flex1">
                            <div class="g_maxWidth g_max">法人章备注:</div>
                            <span>{{ detailList.sealDesc || '--' }}</span>
                        </div>
                    </div>
                    <div class="g_desc">
                        <div class="g_titleDesc">
                            <span>备注: </span>
                            {{ detailList.desc }}
                        </div>
                    </div>
                </div>
                <div class="g_statu"></div>
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
    GetFileInfoDetailsList,
} from "../../../net/projectAgentinfo/fileInfoRequest/GetFileInfoDetails"
export default {
    data(){
        return{
            detailList:[],
        }
    },
    props:{
        id:{
            type:Number,
            default(){
                return 0;
            }
        },
    },
    components:{
    },
    created(){
        this.initDate();
    },
    methods:{
        initDate(){
            let parameter = {
                id : this.id,
            }
            new GetFileInfoDetailsList(parameter).send()
            .then((res)=>{
                console.log("补充合同资料详情页数据:",res);
                this.detailList = res;
            })
            .catch((err)=>{

            })
        },
        f_closeView() {
            setTimeout(()=>{
                this.$emit("f_closeView", true);
            },200)
        },
    },
}
</script>
<style scoped>
    @import "../../../common/css/common.css";

.g_max{
    width: max-content!important;
}
.g_titleDesc{
	/* font-family: MicrosoftYaHei; */
	font-size: 0.14rem;
    color: #444444;
    /* margin-left: 0.08rem; */
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:5;
}
.g_titleDesc>span{
	color: #999999;
}
.g_desc{
	width: 100%;
	min-height: 0.7rem;
	height: max-content;
	background-color: #fafafa;
    margin-top: 0.06rem;
    padding: 0.04rem 0.1rem 0.08rem 0.1rem;
    box-sizing: border-box;
}
.g_maxWidth{
    width:0.7rem;
    height: 100%;
    margin-right: 0.08rem;
    white-space: nowrap;
    text-align-last:justify;
    text-align:justify;
    text-justify:distribute-all-lines;
}
.g_flex1{
    flex: 1;
}
.g_leftInfo{
    width: 49%;
    height: 100%;
    border-right: 1px dotted #d9d9d9;
    margin-right: 2%;
    display: flex;
}
.g_rightInfo{
    width: 49%;
    height: 100%;
    display: flex;
}
.g_text>span{
    color: #444444;
}
.g_text{
    line-height: 0.24rem;
    font-size: 0.14rem;
    color: #999999;
    text-align: left;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.g_columnTwo{
    width: 100%;
    height: 0.3rem;
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.04rem 0.1rem;
    box-sizing: border-box;
    margin-top: 0.06rem;
}
.g_borkerName{
    font-family: MicrosoftYaHei-Bold;
    font-size: 0.2rem;
    color: #444444;
    line-height: 1;
    font-weight: bold;
    white-space: nowrap;
}
.g_detailTop{
    width: 100%;
    height: 0.59rem;
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.1rem;
    box-sizing: border-box;
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
.g_navDetail{
  width: 100%;
  height: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #eff4f9;
}
.g_navDetail img{
  width: 0.2rem;
  height: auto;
  padding: 0.15rem;
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



