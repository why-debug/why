
<!--收支平衡导入弹窗-->
<template>
  <div class="popup-box" @click.stop="stopMaoPao()">
    <div class="p-b-content">
      <div class="p-b-close" @click.stop="closeModel()"></div>
      <div class="p-b-title">收支平衡导入</div>
      <div class="p-b-body">
        <div class="form-div">
          <span class="label">请选择要导入的文件：</span>
        </div>

        <div class="check-down">
          <!--<el-input
            type="file"
            style="width: 2.92rem;opacity: 0;z-index: 99;">
          </el-input>-->

          <div style="" class="down-input">
            {{fileName}}
          </div>
        </div>

        <div class="form-div">
          <div class="required"></div>
          <span class="label">仅支持按照模板格式导入</span>
          <span class="down-load" @click.stop="downloadTemplate()">点击下载导入模板</span>
        </div>
      </div>
      <div class="p-b-bottom-box">
        <div class="save-btn" @click="save()"><span>导入</span></div>
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
          chanPingZhuanJie: "", // 人均产品转介
          fuWuHaoPing: "", // 人均服务好评
          yaoQing: "", // 人均邀请使用小程序或加入美联会
          zhiXingLi: "", // 执行力
          zhiShiKu: "", // 人均知识库分享文
        },
        inputWidth: '1.9rem',

        isRequest: false, // 是否在请求中
        fileName: '点击选择需要导入的文件',
      }
    },

    methods: {
      stopMaoPao() {
      },
      closeModel() {
        this.$emit('update:isShow', false);
      },
      downloadTemplate() {
        new ErpCommon().toast('下载模板');
      },
      save() {
        new ErpCommon().toast('导入');
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
          margin-bottom: 0.1rem;

          .down-load {
            color: #259cf3;
            cursor: pointer;
            margin-left: 0.1rem;
            -moz-user-select: none;
            -khtml-user-select: none;
            user-select: none;
          }

          .label {
            font-weight: bold;
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
            margin-right: 0.05rem;
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

        .check-down {
          margin-bottom: 0.2rem;

          .down-input {
            border: 1px #73baee solid;
            box-shadow: 0 0 0.01rem 0.005rem rgba(115, 186, 238, 0.8);
            height: 0.3rem;
            width: 2.92rem;
            border-radius: 0.03rem;
            color: #999999;
            display: flex;
            align-items: center;
            background-color: #ffffff;
            padding-left: 0.1rem;
            cursor: pointer;
            /*position: absolute;*/
            /*top: 117px;*/
            /*left: 38px;*/
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
