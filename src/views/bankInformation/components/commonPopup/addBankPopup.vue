<template>
  <div class="addAreaPopupBox" @click.stop="stopMaoPao()">
    <div class="popupBoxCon">
      <div class="popupBoxConColse"  @click.stop="closeModel()"></div>
      <div class="popupBoxConTitle">{{title}}</div>
      <div class="popupCon">
        <div class="form-div">
          <span class="label"><div>姓</div><div>名：</div></span>
          <span class="required"></span>
          <el-input v-model="fromData.bankName" placeholder="请输入名称" :maxlength="15" :style="{'width': inputWidth1}"></el-input>
        </div>
        <div class="form-div">
          <span class="label"><div>序</div><div>号：</div></span>
          <span class="noRequired"></span>
          <el-input v-model.number="fromData.bankNumber" oninput="if(value.length>5)value=value.slice(0,5);if(isNaN(value))value=''" placeholder="请输入序号" :style="{'width': inputWidth1}" ></el-input>
        </div>
        <div class="form-div">
          <span class="label"><div>描</div><div>述：</div></span>
          <span class="noRequired"></span>
          <el-input
            type="textarea"
            maxlength="50"
            placeholder="请输入描述信息"
            rows="2"
            show-word-limit
            v-model="fromData.bankDescription"
            :style="{'width': inputWidth1}"
            >
            </el-input>
        </div>
      </div>
      <div class="popupBottomBox">
        <div class="baocunBtn" @click="baocun()">
          <span>保存</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {ErpCommon} from "../../../../utils/ErpCommon";
import {
  AddBankDic,
  AddBankDicRequest,
  UpdateBankDic,
  UpdateBankDicRequest
} from "../../../../net/bankInformation/GetBankInfoNet";
import {Const} from "../../../../common/utils/Const";

export default {
  props: {
    addEditBankPram: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      title:'',
      fromData: {
        bankName:"", // 名称
        bankNumber:'', // 序号
        bankDescription:'', // 描述
      },
      inputWidth1:'2.15rem',
    }
  },
  created(){
    if (this.addEditBankPram && this.addEditBankPram.bankName){
      this.title = '修改银行';
      this.fromData = this.addEditBankPram; // 回显
      return
    }

    this.title = '新增银行';
  },
  methods: {
    //阻止事件单击冒泡
    stopMaoPao(){},

    //关闭弹窗
    closeModel(){
      this.$emit('update:isShow', false)
    },

    //保存事件
    baocun(){
      if (!this.fromData.bankName){
        new ErpCommon().toast('请输入名称');
        return;
      }

      if (this.addEditBankPram && this.addEditBankPram.bankName){
        // 修改 UpdateBankDic
        new UpdateBankDic(new UpdateBankDicRequest(this.fromData)).send()
        .then((res)=>{
          if (res.errCode !== Const.successCode) return Promise.reject(res);

          this.$emit("successCallback",true); // 刷新页面
          new ErpCommon().toast('操作成功','success');
          this.closeModel();
        })
        .catch((res)=>{
          new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
        })

      }else {
        // 添加
        new AddBankDic(new AddBankDicRequest(this.fromData)).send()
        .then((res)=>{
                  if (res.errCode !== Const.successCode) return Promise.reject(res);

                  this.$emit("successCallback",true); // 刷新页面
                  new ErpCommon().toast('操作成功','success');
                  this.closeModel();
                })
      }
    }
  },
}
</script>


<style>
  /*去掉number的上下箭头*/
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
</style>
<style lang="less" scoped>
  /deep/.form-div .el-input .el-input__inner{
    line-height: normal;
  }
  /deep/ .el-input__inner{
    line-height: normal !important;
  }

  .addAreaPopupBox{
    position: fixed;
    font-size: 0.12rem;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    .popupBoxCon{
      position: relative;
      width: 3.5rem;
      background-color: #eff4f8;
      box-shadow: 0 0.03rem 0.05rem 0 rgba(0, 0, 0, 0.3);
      padding: 0 0 0.2rem;
      box-sizing: border-box;
      overflow: auto;
      .popupBoxConColse{
        position: absolute;
        right: 0;
        width: 0.26rem;
        height: 0.2rem;
        background-repeat: no-repeat;
        background-size: 0.1rem 0.1rem;
        background-position: center;
        cursor: pointer;
        z-index: 99;
        background-image: url('../../../../assets/images/public/close_200.png')
      }
      .popupBoxConColse:hover{
        background-image: url("../../../../assets/images/public/close_200_hover.png");
        background-color: #f05656;
      }
      .popupBoxConTitle{
        width: 100%;
        text-align: center;
        padding: 0.2rem 0 0.29rem;
        line-height: 1;
        font-size: 0.18rem;
        color:#567c98;
      }
      .popupCon{
        width: 2.92rem;
        margin: 0 auto;
        padding-bottom: 0.36rem;
        .form-div{
          width: 100%;
          height: auto;
          display: flex;
          align-items: center;
          margin-bottom: 0.1rem;
          .label{
            width: 0.6rem;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            color: #444444;
          }
          .required:before{
            content: "*";
            width: 0.15rem;
            height: 0.14rem;
            color: #ff5a1f;
            font-size:0.12rem;
            line-height: 1;
            position: relative;
            left: 0.02rem;
            top: 0.03rem;
            margin-right: 0.09rem;
          }
          .noRequired:before{
            content: "*";
            visibility: hidden;
            width: 0.15rem;
            height: 0.14rem;
            color: #ff5a1f;
            font-size:0.12rem;
            line-height: 1;
            position: relative;
            left: 0.02rem;
            top: 0.03rem;
            margin-right: 0.09rem;
          }
          .i-title{
            flex: 0 0 0.6rem;
            width: 0.6rem;
            color: #444444;
          }
          .xuhaoTitle{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          /deep/ .el-input{
            /deep/ .el-input__inner{
              height: 0.3rem;
              border-color: #bdc6cf;
            }
          }
        }
      }
      .popupBottomBox{
        width: 2.92rem;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .baocunBtn{
          width: 0.6rem;
          height: 0.25rem;
          line-height: 0.25rem;
          text-align: center;
          color: #ffffff;
          font-size: 0.12rem;
          background-image: url("../../../../assets/images/public/blue_normal.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
          &:hover {
            background-image: url("../../../../assets/images/public/blue_focus.png");
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .form-div{
    .el-input{
      .el-input__inner{
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        border-color: #bdc6cf;
        color: #444444;
      }
    }
  }
  .el-textarea .el-textarea__inner{ // 然后找到对应的类名，在这里将拉伸去掉即可
    resize: none;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    border-color: #bdc6cf;
    color: #444444;
    height: 0.6rem;
  }
  .el-select-dropdown__item{
    padding: 0 0.1rem;
  }
</style>
