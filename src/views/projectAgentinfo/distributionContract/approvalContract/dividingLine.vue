<template>
<!-- 分割线 新增编辑页面 -->
    <div class="g_lineAll">
        <div class="g_line" :style="{'width': max_width+'rem'}">
            <img class="g_fileicon" src="../../../../assets/images/projectAgentInfo/agentContract/follow_icon.png" alt="">
            <div class="g_content">{{ title }}</div>
            <div class="g_boederTop"></div>
        </div>
    </div>
</template>
<script>
export default {

    data(){
        return{
            
        }
    },
    props : {
        title : {
            type: String,
            default : '基本信息',
        },
        max_width:{
            type:String,
            default:'10.3',
        },
        
    }
}
</script>
<style scoped>
.g_lineAll{
    width: 100%;
    height: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.g_line{
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
}
.g_fileicon{
	width: 0.19rem;
	height: 0.23rem;
    object-position: top center;
    position: absolute;
}
.g_content{
	font-family: MicrosoftYaHei-Bold;
	font-size: 0.16rem;
	color: #999999;
    margin: 0 0.1rem 0 0.06rem;
    white-space: nowrap;
    padding-left: 0.2rem;
}
.g_boederTop{
	min-width: auto;
	border: solid 0.01rem rgba(214, 223, 230, 0.5);
    flex: 1;
}
</style>




