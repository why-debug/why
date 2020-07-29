
<!--收佣率调整弹窗-->
<template>
  <div class="popup-box" @click.stop="stopMaoPao()">
    <div class="p-b-content">
      <div class="p-b-close" @click.stop="closeModel()"></div>
      <div class="p-b-title">{{item.name}}-收佣率修改</div>
      <div class="p-b-body">
        <div class="form-div">
          <span class="label">2016年收佣率：</span>
          <span class="no-required"></span>
          <el-input
            v-model="fromData.commissionRateForOne"
            :maxlength.native="9"
            :style="{'width': inputWidth}">
            <template slot="suffix">%</template>
          </el-input>
        </div>
        <div class="form-div">
          <span class="label">2017年收佣率：</span>
          <span class="no-required"></span>
          <el-input
            v-model="fromData.commissionRateForTwo"
            :maxlength.native="9"
            :style="{'width': inputWidth}">
            <template slot="suffix">%</template>
          </el-input>
        </div>
      </div>
      <div class="p-b-bottom-box">
        <div class="save-btn" @click="save()"><span>保存</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ErpCommon} from "../../../../utils/ErpCommon";

  export default {
    props: {
      item: {
        type: Object | Array,
        default() {
          return {}
        }
      }
    },

    data() {
      return {
        fromData: {
          commissionRateForOne: "", // 2016年收佣率
          commissionRateForTwo: "", // 2017年收佣率
        },
        inputWidth: '1.9rem',

        isRequest: false, // 是否在请求中
      }
    },

    methods: {
      stopMaoPao() {
      },
      closeModel() {
        this.$emit('update:isShow', false);
      },
      save() {
        new ErpCommon().toast('调用保存接口');
      }
    },
  }
</script>

<style scoped lang="less">
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
        background-image: url('../../../../assets/images/public/close_200.png')
      }

      .p-b-close:hover {
        background-image: url("../../../../assets/images/public/close_200_hover.png");
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
        margin: 0 auto;
        padding-bottom: 0.36rem;

        .form-div {
          width: 100%;
          height: auto;
          display: flex;
          align-items: center;
          margin-bottom: 0.14rem;

          .label {
            width: 0.88rem;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            color: #444444;
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
              border-color: #bdc6cf;
              padding: 0 0.1rem;
            }
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
