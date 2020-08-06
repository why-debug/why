<template>
  <div class="addAreaPopupBox" @click.stop="stopMaoPao()">
    <div class="popupBoxCon">
      <div class="popupBoxConColse"  @click.stop="closeModel()"></div>
      <div class="popupBoxConTitle">{{title}}</div>

      <!--表单内容-->
      <div class="popupCon">
        <div class="popupConAuto">
          <div class="form-div-box">
            <div class="form-div4">
              <span class="label"><div>银</div><div>行：</div></span>
              <span class="required"></span>
              <el-select v-model="fromData.parentBankId" :style="{'width': inputWidth1}">
                <el-option
                        v-for="(item,index) in bankNameList"
                        :key="index"
                        :label="item.bankName"
                        :value="item.id" >
                </el-option>
              </el-select>
            </div>
            <div class="form-div4">
              <span class="label"><div>省</div><div>份：</div></span>
              <span class="required"></span>
              <el-select v-model="fromData.provinceId" :style="{'width': inputWidth1}">
                <el-option
                        v-for="(item,index) in provinceList"
                        :key="index"
                        :label="item.provinceName"
                        :value="item.id" >
                </el-option>
              </el-select>
            </div>
            <div class="form-div4">
              <span class="label"><div>城</div><div>市：</div></span>
              <span class="required"></span>
              <el-select v-model="fromData.cityId" :style="{'width': inputWidth1}">
                <el-option
                        v-for="(item,index) in cityList"
                        :key="index"
                        :label="item.cityName"
                        :value="item.id" >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form-div-box">
            <div class="form-div">
              <span class="label"><div>编</div><div>码：</div></span>
              <span class="required"></span>
              <el-input v-model="fromData.bankCode" :maxlength="20" :style="{'width': inputWidth1}" ></el-input>
            </div>
            <div class="form-div2">
              <span class="label"><div>名</div><div>称：</div></span>
              <span class="required"></span>
              <el-input v-model="fromData.branchBankName" :maxlength="20" style="width: 4.5rem;"></el-input>
            </div>
          </div>
          <div class="form-div-box">
            <div class="form-div3">
              <span class="label"><div>地</div><div>址：</div></span>
              <span class="noRequired"></span>
              <el-input v-model="fromData.bankAddress" :maxlength="30" :style="{'width': inputWidth3}"></el-input>
            </div>
          </div>
          <div class="form-div-box">
            <div class="form-div">
              <span class="label"><div>电</div><div>话：</div></span>
              <span class="noRequired"></span>
              <el-input v-model="fromData.contactPhone" :maxlength="11" :style="{'width': inputWidth1}"></el-input>
            </div>
            <div class="form-div">
              <span class="label"><div>传</div><div>真：</div></span>
              <span class="noRequired"></span>
              <el-input v-model="fromData.bankFax" :maxlength="20" :style="{'width': inputWidth1}"></el-input>
            </div>
            <div class="form-div" style="margin-left: -0.15rem">
              <span style="flex-shrink: 0;margin-right: 0.02rem">联系人名称： </span>
              <span class="noRequired"></span>
              <el-input v-model="fromData.linkmanName" :maxlength="20" :style="{'width': inputWidth1}"></el-input>
            </div>
          </div>
          <div class="form-div-box">
            <div class="form-div4">
              <span style="color: #444444">是否境内：</span>
              <span class="noRequired"></span>
              <el-select v-model="fromData.isChurchyard" :style="{'width': inputWidth1}">
                <el-option
                        v-for="(item,index) in parentBodyList"
                        :key="index"
                        :label="item.label"
                        :value="item.value" >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form-div-box">
            <div class="form-div3">
              <span class="label"><div>备</div><div>注：</div></span>
              <span class="noRequired"></span>
              <el-input
                      type="textarea"
                      maxlength="50"
                      rows="4"
                      show-word-limit
                      v-model="fromData.bankRemark"
                      :style="{'width': inputWidth3}">
              </el-input>
            </div>
          </div>
        </div>
      </div>

      <!--保存按钮-->
      <div class="baocunBtn" @click="baocun()">
        <span>保存</span>
      </div>

    </div>
  </div>
</template>

<script>
  import {
    AddBranchBankDic, AddBranchBankDicRequest,
    GetBankDicList,
    GetBankDicListRequest, UpdateBanchBankDic, UpdateBanchBankDicRequest
  } from "../../../../net/bankInformation/GetBankInfoNet";
  import {ErpCommon} from "../../../../utils/ErpCommon";
  import {Const} from "../../../../common/utils/Const";

  export default {
  props: {
    addEditBankPram: {
      type: Object,
      default() {
        return {}
      }
    },
    mainBankInfo: {
      type: Object|Array,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      title:'新增分行',
      fromData: {
        parentBankId:"", // 父行ID
        provinceId:"", // 省份
        cityId:"", // 城市
        bankCode:"", // 编码
        branchBankName:"", // 分行名称
        bankAddress:"", // 地址
        contactPhone:"", // 电话
        bankFax:"", // 传真
        linkmanName:"", // 联系人名称
        isChurchyard:"", // 是否境内
        bankRemark:"", // 上级机构 下拉框
      },
      inputWidth1:'1.7rem',
      inputWidth2:'2.07rem',
      inputWidth3:'7.3rem',
      provinceList:[
        {
          id:1,
          provinceName:'四川省'
        }
      ],
      cityList:[
        {
          id:1,
          cityName:'成都市',
        },
      ],
      parentBodyList:[
        {
          value:1,
          label:'是',
        },
        {
          value:2,
          label:'否',
        }
      ],
      bankNameList:[], // 主行数据 - 用于下拉
    }
  },
  created() {
    this.fromData = this.addEditBankPram;
    // this.fromData.bankName = this.mainBankInfo.bankName; //主行名称带过来 不允许修改
    if (this.addEditBankPram.id){
      this.title = '修改分行';
    }

    this.init();
  },
  methods: {
    //阻止事件单击冒泡
    async init(){
      let data = await new GetBankDicList(new GetBankDicListRequest()).send();
      this.bankNameList = data.list || [];
    },
    stopMaoPao(){},
    add(){
      console.log(222)
    },
    //关闭弹窗
    closeModel(){
      this.$emit('update:isShow', false)
    },
    //保存事件
    baocun(){
      console.log(this.fromData,'--保存--');
      if (!this.fromData.parentBankId){
        new ErpCommon().toast('请选择银行');
        return;
      }

      if (!this.fromData.provinceId){
        new ErpCommon().toast('请选择省份');
        return;
      }

      if (!this.fromData.cityId){
        new ErpCommon().toast('请选择城市');
        return;
      }

      if (!this.fromData.bankCode){
        new ErpCommon().toast('请输入编码');
        return;
      }

      if (!this.fromData.branchBankName){
        new ErpCommon().toast('请输入名称');
        return;
      }


      if (this.addEditBankPram.id){
        // 修改 updateBanchBankDic
        new UpdateBanchBankDic(new UpdateBanchBankDicRequest(this.fromData)).send()
        .then((res)=>{
          if (res.errCode !== Const.successCode) return Promise.reject(res);

          this.$emit("successCallback",true); // 刷新页面
          new ErpCommon().toast('操作成功','success');
          this.closeModel();
        })
      }else {
        // 新增 AddBranchBankDic
        new AddBranchBankDic(new AddBranchBankDicRequest(this.fromData)).send()
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

<style lang="less" scoped>
  /deep/.form-div .el-input .el-input__inner{
    line-height: normal;
  }
  /deep/.form-div2 .el-input .el-input__inner{
    line-height: normal;
  }
  /deep/.form-div3 .el-input .el-input__inner{
    line-height: normal;
  }
  /deep/.el-textarea .el-textarea__inner{
    height: 1rem !important;
  }
  /deep/ .el-input--small .el-input__icon{
    line-height: 0.25rem;
  }
  /deep/ .el-input--small{
    font-size: 0.12rem;
  }
  /deep/ .el-select-dropdown__item{
    font-size: 0.12rem !important;
    height: 0.25rem !important;
    line-height: 0.25rem !important;
  }
  /deep/ .el-input__inner{
    border: solid 0.01rem #cad5df;
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
      width: 8.66rem;
      height: 4.48rem;
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
        font-weight: bold;
        box-sizing: border-box;
        width: 100%;
        padding: 0.24rem 0 0.24rem 0.3rem;
        line-height: 1;
        font-size: 0.16rem;
        color:#000000;
      }
      .popupCon{
        min-width: 8.66rem;
        height: 3.05rem;
        overflow: hidden;
        .popupConAuto{
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: 0 0.29rem;
          .form-div-box{
            display: flex;
            .form-div{
              flex: 0 0 2.79rem;
              width: 2.79rem;
              height: auto;
              display: flex;
              align-items: center;
              margin-bottom: 0.09rem;
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
              &>img{
                width: 0.15rem;
                height: 0.15rem;
                margin-left: 0.08rem;
              }
              /deep/ .el-input{
                /deep/ .el-input__inner{
                  padding: 0 0.1rem;
                  height: 0.3rem;
                  border-color: #bdc6cf;
                }
              }
            }
            .form-div2{
              flex: 0 0 5.23rem;
              width: 5.23rem;
              height: auto;
              display: flex;
              align-items: center;
              margin-bottom: 0.09rem;
              .label{
                width: 0.6rem;
                display: flex;
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
              &>img{
                width: 0.15rem;
                height: 0.15rem;
                margin-left: 0.08rem;
              }
              /deep/ .el-input{
                /deep/ .el-input__inner{
                  padding: 0 0.1rem;
                  height: 0.3rem;
                  border-color: #bdc6cf;
                }
              }
            }
            .form-div3{
              flex: 0 0 8.02rem;
              width: 8.02rem;
              height: auto;
              display: flex;
              align-items: center;
              margin-bottom: 0.09rem;
              .label{
                width: 0.6rem;
                display: flex;
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
              &>img{
                width: 0.15rem;
                height: 0.15rem;
                margin-left: 0.08rem;
              }
              /deep/ .el-input{
                /deep/ .el-input__inner{
                  padding: 0 0.1rem;
                  height: 0.3rem;
                  border-color: #bdc6cf;
                }
              }
            }
            .form-div4{
              flex: 0 0 2.79rem;
              width: 2.79rem;
              height: auto;
              display: flex;
              align-items: center;
              margin-bottom: 0.09rem;
              .label{
                width: 0.6rem;
                display: flex;
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
              &>img{
                width: 0.15rem;
                height: 0.15rem;
                margin-left: 0.08rem;
              }
              /deep/ .el-input{
                /deep/ .el-input__inner{
                  padding: 0 0.1rem;
                  height: 0.3rem;
                  border-color: #bdc6cf;
                }
              }
            }
          }
          .businessBox{
            box-sizing: border-box;
            padding-left: 0.75rem;
            display: flex;
            flex-wrap: wrap;
            .businessItem{
              flex: 0 0 3.35rem;
              width: 3.35rem;
              .form-div-box1{
                display: flex;
                align-items: center;
                margin-bottom: 0.09rem;
                &>img{
                  width: 0.15rem;
                  height: 0.15rem;
                  margin-left: 0.08rem;
                }
                /deep/ .el-input{
                  /deep/ .el-input__inner{
                    height: 0.3rem;
                    border-color: #bdc6cf;
                  }

                }
              }
            }
          }
        }
      }
      .baocunBtn{
        position: absolute;
        bottom: 0.2rem;
        right: 0.2rem;
        margin-left:0.3rem;
        margin-top: 0.23rem;
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
    height: 1rem;
  }
  .el-select-dropdown__item{
    padding: 0 0.1rem
  }
</style>
