<template>
    <div class="g_inforAll">
        <div class="g_detailTop">
            <div class="g_borkerName">收付记录</div>
        </div>
        <div class="g_lists">
            <div class="g_header">
                <div class="u_header time">录入时间</div>
                <div class="u_header receipt_pay">收付</div>
                <div class="u_header receipt_pay_rule">收付规则</div>
                <div class="u_header receipt_pay_branch">收付分行</div>
                <div class="u_header creator">制单人</div>
                <div class="u_header money">款项</div>
                <div class="u_header all_money">总金额(元)</div>
                <div class="u_header settle_info">结算信息</div>
                <div class="u_header approal_status">审批状态</div>
            </div>
            <div class="list">
                <div class="g_lineList" >
                <!-- <div class="g_lineList" v-for="(item,index) in detailList" :key="index"> -->
                    <!-- <div class="u_List name">{{ item.borkerName || '--' }}</div>
                    <div class="u_List phone">{{ item.borkerPhone || '--' }}</div>
                    <div class="u_List account">{{ item.loginNumber || '--' }}</div>
                    <div class="u_List registerDate">{{ item.registerDate |formatTime }}</div>
                    <div class="u_List bindDate">{{ item.bindDate |formatTime }}</div>
                    <div class="u_List desc">{{ item.borkerDesc }}</div>
                    <div class="u_List desc">{{ item.borkerDesc }}</div>
                    <div class="u_List desc">{{ item.borkerDesc }}</div>
                    <div class="u_List desc">{{ item.borkerDesc }}</div> -->
                      <div class="u_List time">录入时间</div>
                      <div class="u_List receipt_pay">收付</div>
                      <div class="u_List receipt_pay_rule">收付规则</div>
                      <div class="u_List receipt_pay_branch">收付分行</div>
                      <div class="u_List creator">制单人</div>
                      <div class="u_List money">款项</div>
                      <div class="u_List all_money">总金额</div>
                      <div class="u_List settle_info">结算信息</div>
                      <div class="u_List approal_status">审批状态</div>
                </div>
            </div>
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
            type:Array,
            default(){
                return [];
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
.g_lists{
    width: 100%;
	height: 4.15rem;
    overflow: auto;
}
.u_header, .u_List{
    padding-left: 0.08rem;
    box-sizing: border-box;
}
.g_lineList{
    width: 8.75rem;
    height: 0.3rem;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.04rem;
	font-family: MicrosoftYaHei;
	font-size: 0.12rem;
	color: #444444;
}
.g_header{
    width: 8.75rem;
    height: 0.3rem;
    background-color: #EBEEF0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

	font-family: MicrosoftYaHei;
	font-size: 0.12rem;
	color: #999999;
}
.time{
    width: 1.1rem;
}
.receipt_pay{
    width: 0.65rem;
}
.receipt_pay_rule{
    width: 1.36rem;
}
.receipt_pay_branch{
    width: 1.36rem;
}
.creator{
    width: 0.69rem;
}
.money{
    width: 2.37rem;
}
.all_money{
    width: 1.04rem;
}
.settle_info{
    width: 0.77rem;
}
.approal_status{
    width: 0.77rem;
}
.g_borkerName{
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
.g_inforAll{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0.22rem 0.1rem 0 0.1rem;
    box-sizing: border-box;
}
</style>

