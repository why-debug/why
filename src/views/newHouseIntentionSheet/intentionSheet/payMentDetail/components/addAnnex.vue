<template>
    <div class="u_annex">
        <div class="g_annexIcon" style="margin:0 0.1rem;">
            <div v-if="item.fileType == 1" class="g_annexIcon">
                <img class="g_annexIconImg" src="../../../../../assets/images/documentIcon/none_200.png" alt="">
            </div>
            <div v-if="item.fileType == 2" class="g_annexIcon">
                <img class="g_annexIconImg" src="../../../../../assets/images/documentIcon/excel_200.png" alt="">
            </div>
            <div v-if="item.fileType == 3" class="g_annexIcon">
                <img class="g_annexIconImg" src="../../../../../assets/images/documentIcon/pdf_200.png" alt="">
            </div>
            <div v-if="item.fileType == 4" class="g_annexIcon">
                <img class="g_annexIconImg" src="../../../../../assets/images/documentIcon/photo_200.png" alt="">
            </div>
            <div v-if="item.fileType == 5" class="g_annexIcon">
                <img class="g_annexIconImg" src="../../../../../assets/images/documentIcon/ppt_200.png" alt="">
            </div>
            <div v-if="item.fileType == 6" class="g_annexIcon">
                <img class="g_annexIconImg" src="../../../../../assets/images/documentIcon/txt_200.png" alt="">
            </div>
            <div v-if="item.fileType == 7" class="g_annexIcon">
                <img class="g_annexIconImg" src="../../../../../assets/images/documentIcon/vedio_200.png" alt="">
            </div>
            <div v-if="item.fileType == 8" class="g_annexIcon">
                <img class="g_annexIconImg" src="../../../../../assets/images/documentIcon/voice_200.png" alt="">
            </div>
            <div v-if="item.fileType == 9" class="g_annexIcon">
                <img class="g_annexIconImg" src="../../../../../assets/images/documentIcon/word_200.png" alt="">
            </div>
        </div>
        <div class="g_content">
            <div class="g_title g_maxWidth">{{ item.fileName }}</div>
            <div class="g_detail g_maxWidth">{{ item.fileSize }}</div>
        </div>
        <img class="g_look" @click="f_deletAnnex(item)" src="../../../../../assets/images/projectAgentInfo/contract/close_200.png" alt="">
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    props:{
        item:{
            type:Object,
            default(){
                return {
                    fileName: "明",
                    fileSize: "213kb",
                    fileType: 1,
                };
            }
        },
    },
    components:{
    },
    created(){
    },
    methods:{
        f_deletAnnex(el){
            setTimeout(()=>{
                this.$emit("f_deletAnnex", el);
            },500)
        }
    },
}
</script>
<style scoped>
.g_maxWidth{
    max-width: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
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
	height: 0.2rem;
    position: absolute;
    right: 0.1rem;
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
    position: relative;
	width: 0.24rem;
	height: 0.31rem;
}
.g_annexIconImg{
	height: 0.31rem;
    position: absolute;
    top: 0;
    left: 0;
}
.u_annex{
	width: 1.75rem;
	height: 0.44rem;
	border-radius: 0.02rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    flex-shrink: 1;
    margin-right: 0.1rem;
    margin-bottom: 0.1rem;
	background-color: #f3f3f3;
	border-radius: 0.02rem;
}
</style>