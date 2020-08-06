<template>
    <div class="g_inforAll">
        <div class="g_detailTop">
            <div class="g_borkerName">经纪人信息</div>
        </div>
        <div class="g_lists">
            <div class="g_header">
                <div class="u_header name">经纪人姓名</div>
                <div class="u_header phone">经纪人电话</div>
                <div class="u_header account">登录账号</div>
                <div class="u_header registerDate">注册日期</div>
                <div class="u_header bindDate">绑定日期</div>
                <div class="u_header desc">备注</div>
            </div>
            <div class="list">
                <div class="g_lineList" v-for="(item,index) in detailList" :key="index">
                    <div class="u_List name">{{ item.borkerName || '--' }}</div>
                    <div class="u_List phone">{{ item.borkerPhone || '--' }}</div>
                    <div class="u_List account">{{ item.loginNumber || '--' }}</div>
                    <div class="u_List registerDate">{{ item.registerDate |formatTime }}</div>
                    <div class="u_List bindDate">{{ item.bindDate |formatTime }}</div>
                    <div class="u_List desc">{{ item.borkerDesc }}</div>
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
    overflow-x: hidden;
    overflow-y: auto;
}
.u_header, .u_List{
    padding-left: 0.08rem;
    box-sizing: border-box;
}
.g_lineList{
    width: 100%;
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
    width: 100%;
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
.name{
    width: 1.1rem;
}
.phone{
    width: 1.28rem;
}
.account{
    width: 1.36rem;
}
.registerDate{
    width: 1.24rem;
}
.bindDate{
    width: 1.06rem;
}
.desc{
    flex: 1;
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

