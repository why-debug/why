
<!--KPI保存时间选择弹窗-->
<template>
  <div class="popup-box" @click.stop="stopMaoPao()">
    <el-form :model="fromData" :rules="rules" :show-message="false" :hide-required-asterisk="false" ref="ruleForm">
      <div class="p-b-content">
        <div class="p-b-close" @click.stop="closeModel()"></div>
        <div class="p-b-title">选择生效时间</div>
        <div class="p-b-body">
          <div class="tip" v-if="operationType=='edit'">您对 <span style="color: #f57107">{{configName}}</span> KPI进行了修改，规则需要重新执行，请确认KPI生效时间。</div>
            <div class="form-div">
              <span class="label">生效类型：</span>
              <span class="no-required"></span>
              <el-form-item prop="execType">
                <el-select v-model="fromData.execType" @change="checkTypeChange" :style="{'width': inputWidth}">
                  <el-option
                    v-for="info in typeList"
                    :label="info.label"
                    :value="info.value" >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form-div2" v-if="fromData.execType == 2">
              <span class="label">生效时间：</span>
              <span class="no-required"></span>
              <el-form-item prop="execTime">
                <el-date-picker
                  :style="{'width': inputWidth}"
                  v-model="fromData.execTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择生效时间"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </div>
        </div>
        <div class="p-b-bottom-box">
          <!--<div class="save-btn" style="margin-right: 0.2rem" @click="closeModel()"><span>取消</span></div>-->
          <div class="save-btn" @click="save()"><span>保存</span></div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {ErpCommon} from "../../../../../utils/ErpCommon";

  export default {
    props: {
      configName: {
        type: [String],
        default() {
          return {}
        }
      },
      operationType: {
        type: [String],
        default() {
          return '';
        }
      }
    },

    data() {
      return {
        typeList:[
          {
            label: '立即生效',
            value: 1,
          },
          {
            label: '定时生效',
            value: 2,
          }
        ],
        inputWidth: '2.1rem',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < new Date().setHours(0, 0, 0, 0);
          },
        },
        rules: {
          execType: [{required: false, message: '', trigger: 'blur'}],
          execTime: [{required: false, message: '', trigger: 'blur'}],
        },

        isRequest: false, // 是否在请求中
        fromData: {
          execType:1, // 生效类型 1:立即生效 2:按时生效(选按时生效后,时间必选)
          execTime:'', // 生效时间 yyyy-MM-dd
        },
      }
    },

    methods: {
      stopMaoPao() {},
      closeModel() {
        this.$emit('update:isShow', false);
      },
      checkTypeChange(val){},
      save() {
        if (this.fromData.execType == 2 && this.fromData.execTime == ''){
          new ErpCommon().toast('请选择生效时间');return;
        }

        //验证通过
        this.$emit('saveCkeckTimeCallback', this.getData());
        this.closeModel();
      },
      getData() {
        if (this.fromData.execType == 1){
          let myDate = new Date();
          myDate.setTime(myDate.getTime());
          let year = myDate.getFullYear();
          let month = (myDate.getMonth()+1)<10 ? '0' + (myDate.getMonth()+1) : (myDate.getMonth()+1);
          let day = myDate.getDate()<10 ? '0' + myDate.getDate() : myDate.getDate();
          return year + "-" + month + "-" + day;
        }else {
          return this.fromData.execTime;
        }
      },
      validate() {
        return this.$refs['ruleForm'].validate();
      },
    },
  }
</script>

<style scoped lang="less">
  /deep/ .el-input__inner{
    height: 0.34rem !important;
    font-size: 0.14rem !important;
  }


  /deep/ .el-scrollbar__bar.is-horizontal{
    display: none;
  }

  /deep/ .el-select-dropdown__item{
    font-size: 0.12rem;
  }

  .popup-box {
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

    .p-b-content {
      position: relative;
      width: 3.5rem;
      background-color: #eff4f8;
      box-shadow: 0 0.03rem 0.05rem 0 rgba(0, 0, 0, 0.3);
      padding: 0 0 0.2rem;
      box-sizing: border-box;
      overflow: auto;

      .p-b-close {
        position: absolute;
        right: 0;
        width: 0.26rem;
        height: 0.2rem;
        background-repeat: no-repeat;
        background-size: 0.1rem 0.1rem;
        background-position: center;
        cursor: pointer;
        z-index: 99;
        background-image: url('../../../../../assets/images/public/close_200.png')
      }

      .p-b-close:hover {
        background-image: url("../../../../../assets/images/public/close_200_hover.png");
        background-color: #f05656;
      }

      .p-b-title {
        width: 100%;
        text-align: center;
        padding: 0.2rem 0 0.26rem;
        line-height: 1;
        font-size: 0.18rem;
        font-weight: bold;
        color: #567c98;
      }

      .p-b-body {
        width: 2.92rem;
        height: 1.5rem;
        margin: 0 auto;

        .tip{
          font-size: 0.13rem;
          line-height: 0.15rem;
          margin-bottom: 0.15rem;
        }

        .form-div {
          width: 100%;
          height: auto;
          display: flex;
          align-items: center;
          margin-bottom: 0.14rem;

          .label {
            /*width: 0.6rem;*/
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            color: #444444;
            flex-shrink: 0;
            font-size: 0.12rem;
          }

          .required:before {
            content: "*";
            width: 0.15rem;
            height: 0.14rem;
            color: #ff5a1f;
            font-size: 0.12rem;
            line-height: 1;
            position: relative;
            left: 0.02rem;
            top: 0.03rem;
            margin-right: 0.09rem;
          }

          .no-required:before {
            content: "*";
            visibility: hidden;
            width: 0.15rem;
            height: 0.14rem;
            color: #ff5a1f;
            font-size: 0.12rem;
            line-height: 1;
            position: relative;
            left: 0.02rem;
            top: 0.03rem;
            margin-right: 0.05rem;
          }

          /deep/ .el-input--small .el-input__inner {
            line-height: normal;
          }

          /deep/ .el-input {
            /deep/ .el-input__inner {
              font-size: 0.12rem;
              height: 0.3rem;
              padding: 0 0.1rem;
            }
          }

          /deep/ .el-form-item--small.el-form-item{
            margin-bottom: 0;
          }

          /*修改单位样式*/

          /deep/ .el-input__suffix {
            right: 0.08rem;
            display: flex;
            justify-content: center;
            flex-direction: column;
            color: #999999;
          }
        }

        .form-div2 {
          width: 100%;
          height: auto;
          display: flex;
          align-items: center;
          margin-bottom: 0.14rem;

          .label {
            /*width: 0.6rem;*/
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            color: #444444;
            flex-shrink: 0;
            font-size: 0.12rem
          }

          .required:before {
            content: "*";
            width: 0.15rem;
            height: 0.14rem;
            color: #ff5a1f;
            font-size: 0.12rem;
            line-height: 1;
            position: relative;
            left: 0.02rem;
            top: 0.03rem;
            margin-right: 0.09rem;
          }

          .no-required:before {
            content: "*";
            visibility: hidden;
            width: 0.15rem;
            height: 0.14rem;
            color: #ff5a1f;
            font-size: 0.12rem;
            line-height: 1;
            position: relative;
            left: 0.02rem;
            top: 0.03rem;
            margin-right: 0.05rem;
          }

          /deep/ .el-input--small .el-input__inner {
            line-height: normal;
          }

          /deep/ .el-input {
            /deep/ .el-input__inner {
              font-size: 0.12rem;
              height: 0.3rem;
              padding: 0 0.25rem;
            }
          }

          /deep/ .el-form-item--small.el-form-item{
            margin-bottom: 0;
          }

          /*修改单位样式*/

          /deep/ .el-input__suffix {
            right: 0.08rem;
            display: flex;
            justify-content: center;
            flex-direction: column;
            color: #999999;
          }
        }
      }

      .p-b-bottom-box {
        width: 2.92rem;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;

        .save-btn {
          width: 0.6rem;
          height: 0.25rem;
          line-height: 0.25rem;
          text-align: center;
          color: #ffffff;
          font-size: 0.12rem;
          background-image: url("../../../../../assets/images/public/blue_normal.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          cursor: pointer;

          &:hover {
            background-image: url("../../../../../assets/images/public/blue_focus.png");
          }
        }
      }
    }
  }
</style>
