<template>
  <div class="basic">
    <dividingLine :title="`电子档上传`"></dividingLine>
    <div class="basic_item_i">
      <div class="basic_item_i_title">电子附件：</div>
      <div class="nomust"></div>
      <div class="select_fanwei">
        <el-radio v-model="params.electronicAccessories" label="1" :disabled="pageIndex ===3">是</el-radio>
        <el-radio v-model="params.electronicAccessories" label="0" :disabled="pageIndex ===3">否</el-radio>
      </div>
    </div>
    <div class="basic_item_add">
      <fileInfoBase @updateFlieList="updateElectronicFlieList" :fileList="fileList" key="updateElectronicFlieList"></fileInfoBase>
      <!-- <div class="fujian">
        <div class="icon"></div>
        <div>添加附件</div>
      </div>
      <div class="fujian_list">
   
         <div class="wenjian_item" v-for="(item,index) in electronicList" :key="index">
          <fileBox :fileName="item.enclosureName" :fileSizeCn="item.attachmentSize" :filePathUrl="item.enclosurePath" @delFile="delFile(index)"></fileBox>
        </div>
      </div> -->
    </div>

    <div class="basic_item_j">
      <div class="basic_item_i_title">备注说明：</div>
      <div class="nomust"></div>
      <el-input
        v-model="params.instructionManual"
        :style="{'width':'7.3rem','height':'1.1rem'}"
        type="textarea"
        placeholder="请输入备注说明"
        resize="none"
        :disabled="pageIndex ===3"
      ></el-input>
    </div>
  </div>
</template>
<script>
import dividingLine from "./dividingLine";
import fileBox from "../../../../components/form/fileBox"
import fileInfoBase from '../../fileInfoBase/fileInfoBase'
export default {
  components: {
    dividingLine,
    fileBox,
    fileInfoBase
  },
  data() {
    return {
      fileList:[],
      propertyTypeList: [],
      electronicList:[
          {
            enclosureName: '',//附件名称
            attachmentSize: '',//附件大小
            enclosurePath:'',
            type: '2' // 1缺失资料 2电子附件 3公司营业执照 4合作协议 5银行开户许可证
          }
      ],//缺失资料附件
      params: {
        electronicAccessories: "", //电子附件0否1是
        instructionManual: "", //备注说明
        enclosureList: [
          // {
          //   attachmentSize:'',//附件大小
          //   enclosureName: "", //附件名称
          //   enclosurePath: "", //附件地址
          //   type: 2 //类型
          // }
        ]
      }
    };
  },
  props:{
    //当前操作界面索引(1.新增 2.编辑 3.详情)
    pageIndex:{
      type:Number,
      default(){
        return 1;
      }
    },
    initParams:{
    type:Object,
    default(){
      return {}
    }
  }
  },
  watch:{
    //编辑或详情初始化数据
   initParams:{
     handler: function(to, from){
      this.params.instructionManual = this.initParams.instructionManual;
      //获取电子附件数据
      if(this.initParams.electronicAccessories !=='') this.params.electronicAccessories = String(this.initParams.electronicAccessories);
      // if(this.initParams.dealEnclosureList.length>0){
      //   for(let item of this.initParams.dealEnclosureList){
      //    if(item.type == 2){
      //      this.params.enclosureList.push(item);
      //    }
      // }
      // }
      //附件装换
      if(this.initParams.dealEnclosureList && this.initParams.dealEnclosureList.length>0){
        for(let item of this.initParams.dealEnclosureList){
          if(item.type == 2){
            let obj = {};
            obj.fileSizeCn = item.attachmentSize;
            obj.fileName = item.enclosureName;
            obj.filePathUrl = item.enclosurePath;
            this.fileList.push(obj);
          }
        }
      }
     },
    deep: true
   }
   },
  methods: {
    updateElectronicFlieList(data){
      console.log(data,'上传附件数据');
       if(!data) return;
      if('add' == data.type){
        //新增图片
        this.fileList.push(data.fileItem);
      }
      if('del' == data.type){
        //删除图片
        this.fileList.splice(data.index,1);
      }
    },
    //删除附件资料
    delFile(index,num){
      this.electronicList.splice(index,1);
    },
    sendElectronicFile() {
      //让params参数指向不同指针防止父组件修改数据
      let submitParams = JSON.parse(JSON.stringify(this.params));
      if(this.fileList && this.fileList.length >0){
         for(let item of this.fileList){
        let obj = {};
        obj.attachmentSize = item.fileSizeCn;
        obj.enclosureName = item.fileName;
        obj.enclosurePath = item.filePathUrl;
        obj.type = 2;
        submitParams.enclosureList.push(obj);
      }
      }
      submitParams.electronicAccessories = parseInt(
        submitParams.electronicAccessories
      );
      this.$emit("electronicFile", {
        data: submitParams
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .el-input__inner {
  line-height: 1;
}
/deep/ .el-checkbox {
  display: flex;
  align-items: center;
}
/deep/ .el-checkbox__input {
  display: flex;
  height: 0.14rem;
}
/deep/ .el-radio {
  display: flex;
  align-items: center;
}
/deep/ .el-radio__input {
  display: flex;
  height: 0.14rem;
}
/deep/ .el-input__inner {
  height: 0.3rem;
}
.basic {
  margin-top: 0.45rem;
  margin-bottom: 0.3rem;
  .basic_item_i {
    width: 9.9rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    .basic_item_i_title {
      width: 1.02rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
    }
    /deep/ .el-checkbox {
      margin-right: 0.22rem;
    }
    .qianyue {
      display: flex;
      align-items: center;
      .yewu {
        margin-left: 0.53rem;
      }
    }
    .select_fanwei {
      display: flex;
      align-items: center;
    }
  }
  .basic_item_j {
    width: 10.1rem;
    height: 1.1rem;
    display: flex;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    /deep/ .el-textarea__inner {
      height: 1.1rem;
    }
    .basic_item_i_title {
      width: 1.02rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
    }
  }
  .basic_item_add {
    width: 8.67rem;
    height: auto;
    margin-left: 1.38rem;
    margin-top: 0.1rem;
    .fujian {
      height: 0.2rem;
      display: flex;
      align-items: center;
      font-family: SimSun;
      font-size: 0.12rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #259cf3;
      .icon {
        width: 0.12rem;
        height: 0.13rem;
        margin-right: 0.05rem;
        background-image: url("../../../../assets/images/projectAgentInfo/agentContract/fjHover_200.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .fujian_list {
      height: auto;
      display: flex;
      align-items: center;
      .wenjian_item {
        display: block;
        width: 1.78rem;
        height: 0.44rem;
        background-color: #f3f3f3;
        border-radius: 0.04rem;
        margin-right: 0.1rem;
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        .item_img {
          width: 0.24rem;
          height: 0.3rem;
          background-color: #ff5a1f;
          margin-left: 0.1rem;
        }
        .item_size {
          width: 1.2rem;
          height: 0.3rem;
          margin-left: 0.1rem;
          .w_title {
            font-family: MicrosoftYaHei;
            font-size: 0.12rem;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0rem;
            color: #444444;
          }
          .w_size {
            font-family: MicrosoftYaHei;
            font-size: 0.12rem;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0rem;
            color: #999999;
          }
        }
      }
    }
  }
}

.nomust,
.must {
  display: flex;
  height: 0.3rem;
  line-height: 0.3rem;
  margin-right: 0.06rem;
}

.must::after {
  content: "* ";
  width: 0.02rem;
  height: 0.06rem;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff5a1f;
  margin-right: 0.08rem;
  line-height: 0.3rem;
}
.nomust::after {
  content: "*";
  visibility: hidden;
  width: 0.02rem;
  height: 0.06rem;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff5a1f;
  margin-right: 0.08rem;
}
</style>