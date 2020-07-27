<template>
  <!-- 基础附件组件 -->
  <div class="file-section">
    <div class="base-item">
      <div class="add-file-tt" >
        {{lable}}
        <div v-if="required" class="lable-required">*</div>
      </div>
      
      <div class="add-file-btn">
        <file-upload
          ref="uploader"
          v-model="files"
          :input-id="'fileInfo'+fileListType"
          name="file"
          title="选择文件上传"
          :post-action="postAction"
          :headers="postHeader"
          :multiple="true"
          @input-file="inputFile"
          @input-filer="inputFilter"
        >
        添加附件
        </file-upload>
      </div>
      <div class="add-file-desc">（最多可上传50张）</div>
    </div>

    <div class="base-item">
      <div class="file-list clearfix">
        <div class="file-li" v-for="(item, index) in fileList" :key="index">
          <fileBox 
            :index="index"
            :fileExt="item.fileExt"
            :fileName="item.fileName"
            :filePath="item.filePath"
            :filePathUrl="item.filePathUrl"
            :fileSizeCn="item.fileSizeCn"
            :fileType="item.fileType+''"
            @delFile="delFile(index,item)"
          ></fileBox>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import VueUploadComponent  from 'vue-upload-component'

import ItemLabel from './itemLabel.vue'
import FileBox from '../../../components/form/fileBox'

import {FileUpload} from '../../../common/net/FileUpload'
import {formatBytes} from '../../../common/utils/common'
import {ErpCommon} from '../../../utils/ErpCommon.js'


export default {
  name: 'fileInfoBase',
  components:{
    FileUpload: VueUploadComponent,
    ItemLabel,
    FileBox,
  },
  props:{
    required: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: String,
      default: '2'
    },
    lable: {
      type: String,
      default: ''
    },
    fileListType: {
      type: String,
      default: ''
    },
    fileList:{
      type: Array,
      default(){
        return []
      }
    },
  },
  data() {
    return {
      //files
      postAction: new FileUpload().getUploadFileUrl(),
      postHeader:{'clientKey': window.clientKey || '9ecb9d5d363b85be1a97e28a75f4e43d',},
      files:[],
    }
  },
  created () {
   
  },
  methods: {
    //上传前校验
    inputFilter(newFile, oldFile, prevent) {
      console.log(111);
      if (newFile && !oldFile) {
        console.log(newFile);
        let fileNameArr = !newFile.name?[]:newFile.name.split('.'); //测试数据.jpg
        let fileExt = fileNameArr[1] || '';
        console.error('fileExt',fileExt);
        if(fileExt.length > 10){
          //文件后缀过长，不符合要求
          new ErpCommon().toast('文件不符合要求');
          return prevent()
        }
        // 添加文件受最大张数限制
        if(this.fileList.length >= this.maxLength){
          console.log('上传已达上限');
          return prevent()
        }
      }
    },
    // 当 add, update, remove File 这些事件的时候会触发
    //添加，更新，移除 后
    inputFile(newFile,oldFile){
      // 上传完成
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        console.log('fileListType:'+this.fileListType);
        // 获得相应数据
        if (newFile.xhr && newFile.xhr.status === 200) {
          console.log('newFile:',newFile);
          console.log('上传完成');
          if(newFile.response && newFile.response.errCode == 200 && newFile.response.data){
            // 处理上传成功的数据
            this.dealUploadSuccData(newFile); 
          }
          this.$refs.uploader.remove(newFile) // 删除当前文件对象
        }
      }

      // 自动上传
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (!this.$refs.uploader.active) {
          this.$refs.uploader.active = true;
        }
      }

    },
    // 处理上传请求数据成功的图片；
    dealUploadSuccData(newFile){
      let fileNameArr = !newFile.name?[]:newFile.name.split('.'); //测试数据.jpg
      console.log('this.fileListType:',this.fileListType);

      let fileExt = fileNameArr[1] || ''

      if(fileExt.length > 10){
          //文件后缀过长，不符合要求
          new ErpCommon().toast('文件不符合要求');
          return ;
        }

      let fileItem = {
        "fileExt" : fileNameArr[1] || '',
        "fileName" : fileNameArr[0] || '',
        "filePath" : newFile.response.data.path || '',  //文件路径 用于上传
        "filePathUrl" : newFile.response.data.url || '',  //文件全路径 用于展示
        "fileSizeCn" : formatBytes(newFile.size),  //
        "fileType" : this.fileListType,  //
      }
      console.log('2222');
      console.log(fileItem);
      this.$emit('updateFlieList', {
        "fileItem":fileItem,
        "type":'add',
        "fileType":this.fileListType,
      }) // 更新值
    },

    // 删除 文件
    delFile(index,fileItem){
      console.log(222);
      this.$emit('updateFlieList', {
        "index":index,
        "fileType":this.fileListType,
        "fileItem":fileItem,
        "type":'del',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "./editBase.scss";
  .add-file-tt{
    position: relative;
    padding-right: 0.16rem;
    color: #666;
    .lable-required{
      position: absolute;
      right: 0.08rem;
      top: 50%;
      transform: translateY(-40%);
      font-size: 0.12rem;
      color: #ff5a1f;
    }
  }
  
  .add-file-btn{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    &::before{
      content: '';
      display: block;
      width: 0.1rem;
      height: 0.12rem;
      margin-right: 0.06rem;
      background: url("../../../assets/images/projectAgentInfo/agentContract/fjHover_200.png") center center no-repeat;
      background-size:  100% 100%;
    }
    font-size: 0.12rem;
    color: #259cf3;
  }
  .add-file-desc{
    font-size: 0.12rem;
    color: #999999;
    margin-left: 0.06rem;
  }

  

  /* 附件列表 */
  .file-list{
    display: block;
    position: relative;
    width: 100%;
    margin-top: 0.1rem;
    .file-li{
      float: left;
      display: block;
      margin-right: 0.1rem;
      width: 1.78rem;
      height: 0.44rem;
      border-radius: 0.04rem;
      background-color: #fff;
      margin-bottom: 0.1rem;
      
    }
  }
</style>