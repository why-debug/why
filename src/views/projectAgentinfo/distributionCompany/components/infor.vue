<template>
    <div class="g_inforAll">
        <div class="g_detailTop">
            <div class="g_borkerName">{{ detailList.companyName || '--' }}</div>
        </div>
        <div class="g_columnTwo">
            <div class="g_leftInfo g_text g_flex1">
                <div class="g_maxWidth">门店码:</div>
                <span>{{ detailList.storeCode || '--' }}</span>
            </div>
        </div>
        <div class="g_columnTwo">
            <div class="g_leftInfo g_text">
                <div class="g_maxWidth">对方联系人:</div>
                <span>{{ detailList.themBorker || '--' }}</span>
            </div>
            <div class="g_rightInfo g_text">
                <div class="g_maxWidth">联系电话:</div>
                <span>{{ detailList.themPhone || '--' }}</span>
            </div>
        </div>
        <div class="g_columnTwo">
            <div class="g_leftInfo g_text g_flex1">
                <div class="g_maxWidth">公司地址:</div>
                <span>{{ detailList.companyAddress || '--' }}</span>
            </div>
        </div>
        <div class="g_columnTwo">
            <div class="g_leftInfo g_text">
                <div class="g_maxWidth">签约时间:</div>
                <span>{{ detailList.signDate | formatTime }}</span>
            </div>
            <div class="g_rightInfo g_text">
                <div class="g_maxWidth">我司对接人:</div>
                <span>{{ detailList.ourBorker || '--' }}</span>
            </div>
        </div>
        <!-- 开户行  于下一期开发 -->
        <div class="g_columnTwo">
            <div class="g_leftInfo g_text">
                <div class="g_maxWidth">开户行:</div>
                <span>{{ detailList.initCardBank || '--' }}</span>
            </div>
            <div class="g_rightInfo g_text">
                <div class="g_maxWidth">开户支行:</div>
                <span>{{ detailList.detailCardBank || '--' }}</span>
            </div>
        </div>
        <div class="g_columnTwo">
            <div class="g_leftInfo g_text">
                <div class="g_maxWidth">户&nbsp;名:</div>
                <span>{{ detailList.CardBank || '--' }}</span>
            </div>
            <div class="g_rightInfo g_text">
                <div class="g_maxWidth">账&nbsp;&nbsp;号:</div>
                <span>{{ detailList.CardNumber || '--' }}</span>
            </div>
        </div>
        <div class="g_desc">
            <div class="g_titleDesc"><span>备注: </span>{{ detailList.desc }}</div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
        }
    },
    props:{
        detailList:{
            type:Object,
            default(){
                return {};
            }
        },
    },
    components:{
    },
    created(){
    },
    methods:{
    },
    filters:{
        formatTime(val){
            if(val != '' && val !=undefined){
                return val.split(' ')[0];
            }else{
                return '--';
            }
        }
    }
}
</script>


<style scoped>
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
    border-right: none!important;
    margin-right: 0!important;
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
.g_inforAll{
	width: 100%;
    height: 100%;
	background-color: #eff4f9;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
</style>

