<template>
  <!-- file-box - 表单 -->
  <div class="file-li-box" @click.stop="previewFile">
    <div class="file-icon">
      <img v-if="checkFileType(fileExt,['doc','docx'])" src="../../assets/images/documentIcon/word_200.png">
      <img v-else-if="checkFileType(fileExt,['xls','xlsx'])" src="../../assets/images/documentIcon/excel_200.png">
      <img v-else-if="checkFileType(fileExt,['pdf'])" src="../../assets/images/documentIcon/pdf_200.png">
      <img v-else-if="checkFileType(fileExt,['ppt','pptx'])" src="../../assets/images/documentIcon/ppt_200.png">
      <img v-else-if="checkFileType(fileExt,['txt'])" src="../../assets/images/documentIcon/txt_200.png">
      <img v-else-if="checkFileType(fileExt,['avi','mp4','MPEG','DIVX','RMVB','rm','mpg','mkv','vob'])" src="../../assets/images/documentIcon/vedio_200.png">
      <img v-else-if="checkFileType(fileExt,['acm','aif','AIFC','AIFF','mp3','wma'])" src="../../assets/images/documentIcon/voice_200.png">
      <img v-else-if="checkFileType(fileExt,['png','BMP','GIF','JPEG','JPG','SVG'])" src="../../assets/images/documentIcon/photo_200.png">
      <img v-else="" src="../../assets/images/documentIcon/none_200.png">
    </div>
    <div class="file-detail">
      <div class="file-name">{{fileName}}</div>
      <div class="file-size">{{fileSizeCn}}</div>
    </div>
    <div class="file-del-btn" @click.stop="delFile" v-if="delFlag"></div>
  </div>
</template>

<script>
import {ErpCommon} from '../../utils/ErpCommon'

export default {
  name: 'fileBox',
  props: {
    delFlag:{
      type:Boolean,
      default:true
    },
    fileItem: {
      type: Object,
      default: null
    },
    fileExt: {
      type: String,
      default: null
    },
    fileName: {
      type: String,
      default: null
    },
    filePath: {
      type: String,
      default: null
    },
    filePathUrl: {
      type: String,
      default: null
    },
    fileSizeCn: {
      type: String,
      default: null
    },
    fileType: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      
    }
  },
  // created(){
  //   this.delFlag
  // },
  methods: {
    // 预览文件
    previewFile(){
      new ErpCommon().showOnlineSource(this.fileName,this.filePathUrl);
    },
    // 删除文件
    delFile(){
      this.$emit('delFile')
    },
    //检测文件是否属于 文件类型
    checkFileType(fileExt = '',fileExtList = []){
      if(!fileExtList || !fileExt) return false;
      let typeFlag = false;
      fileExtList.forEach(item => {
        if(item.toLowerCase() == fileExt.toLowerCase()){
          typeFlag = true;
        }
      });
      return typeFlag
    }
  },
}
</script>

<style lang="scss" scoped>


  .file-li-box{
    position: relative;
    width: 1.78rem;
    height: 0.44rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 0.1rem;
    padding-right: 0.12rem;
    box-sizing: border-box;
    overflow: hidden;
    .file-icon{
      display: block;
      width: 0.24rem;
      height: 0.295rem;
      position: relative;
      img{
        display: block;
        width: 100%;
        height: 100%;
        width: 0.24rem;
        height: 0.295rem;
      }
    }
    .file-detail{
      margin-left: 0.1rem;
      flex: 1;
      font-size: 0.12rem;
      overflow: hidden;
      .file-name{
        color: #444444;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .file-size{
        line-height: 1;
        margin-top: 0.05rem;
        color: #999999;
      }
    }
    .file-del-btn{
      width: 0.1rem;
      height: 0.1rem;
      background: url("../../assets/images/public/guide_del_200.png") center center no-repeat;
      background-size:  100% 100%;
      cursor: pointer;
    }

  }
</style>