<template>
  <div class="associate-customer" v-if="isShow">
    <div class="content">
      <div class="close-icon" @click="hideIt()"></div>
      <div class="top-box">
        <div class="title">新增新房资料类别</div>
      </div>
      <div>
        <el-form
          :rules="rules"
          ref="form"
          label-position="left"
          :inline="true"
          :model="form"
          class="demo-form-inline"
        >
          <section>
            <div>
              <el-form-item prop="number">
                <p>资料编号</p>：
                <div>
                  <el-input v-model="form.number"></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="name">
                <p>资料名称</p>：
                <div>
                  <el-input v-model="form.name">
                    <span slot="suffix">㎡</span>
                  </el-input>
                </div>
              </el-form-item>
            </div>
          </section>
          <section>
            <el-form-item>
              <p>合同类型</p>：
              <div>
                <el-input @click.native="contractTypeClick()" v-model="form.Ctype" readonly></el-input>
              </div>
            </el-form-item>
          </section>
          <section>
            <el-form-item>
              <p>重要性</p>：
              <div>
                <el-checkbox v-model="form.checked" label="必须上传" name="type"></el-checkbox>
              </div>
            </el-form-item>
          </section>
          <section>
            <el-form-item>
              <p>资料类型</p>：
              <div>
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="付款资料" name="type"></el-checkbox>
                  <el-checkbox label="收款资料" name="type"></el-checkbox>
                  <el-checkbox label="转款资料" name="type"></el-checkbox>
                  <el-checkbox label="事后减佣" name="type"></el-checkbox>
                  <el-checkbox label="取消交易" name="type"></el-checkbox>
                  <el-checkbox label="佣金收款" name="type"></el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </section>
          <section>
            <el-form-item>
              <p>备注</p>：
              <div>
                <el-input rows="3" resize="none" type="textarea" v-model="form.desc"></el-input>
              </div>
            </el-form-item>
          </section>
          <section>
            <el-form-item>
              <p>顺序</p>：
              <div>
                <el-input v-model="form.order"></el-input>
              </div>
            </el-form-item>
          </section>
        </el-form>
      </div>

      <el-button type="primary" class="btn" @click="confirm()">确定</el-button>
      <!-- 对应合同列表弹窗 -->
      <contractType :isShows.sync="contractType.isShow"></contractType>
    </div>
  </div>
</template>

<script>
import contractType from "./contractType";
export default {
  components: {
    contractType
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputWidth1: "1.3rem",
      inputWidth2: "2.3rem",
      testSelect: "",
      testSelectList: [],
      contractType: {
        isShow: false,
        title: "选择合同类型"
      },
      form: {
        number: "",
        name: "",
        Ctype: [],
        checked: true,
        type: [],
        desc: "",
        order: ""
      },
      rules: {
        number: [{ required: true, message: "请输入编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入资料名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    hideIt() {
      this.$emit("update:isShow", false);
    },
    sendIn() {
      console.log("递交成功");
    },
    // 打开对应合同类型弹框
    contractTypeClick() {
      this.contractType.isShow = true;
      console.log("合同类型");
    },
    confirm() {
      console.log(this.form.type, this.form.checked);
    }
  }
};
</script>

<style lang="less" scoped>
.associate-customer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;

  & > .content {
    position: relative;
    width: 8rem;
    height: 4.5rem;
    background-color: #eff4f9;
    padding: 0 0.2rem;
    box-sizing: border-box;
    /deep/ .el-form {
      .el-form-item {
        margin: 0 0 0.1rem;
        .el-form-item__error {
          top: 90%;
          left: 25%;
          &::after {
            content: "";
          }
        }
      }
      .el-form-item__content {
        font-size: 0.12rem;
        display: flex;
        p:first-child {
          width: 0.5rem;
          height: 0.3rem;
          text-align: justify;
          &::after {
            content: "";
            width: 100%;
            display: inline-block;
          }
        }
        & > div {
          margin-left: 0.1rem;
        }
      }
      //   .el-form-item__label {
      //     &:after {
      //       content: "";
      //       width: 100%;
      //       display: inline-block;
      //     }
      //     // &::before{
      //     //     content: none;
      //     // }
      //     // &::after {
      //     //   content: "*";
      //     //   color: #f56c6c;
      //     //   margin-right: 4px;
      //     // }
      //   }
      & > section {
        &:nth-of-type(1) > div {
          width: 5.2rem;
          display: flex;
          justify-content: space-between;
          .el-form-item__content {
            &::before {
              content: "*";
              color: #f56c6c;
              position: absolute;
              left: 0.6rem;
              bottom: 0;
            }
          }
        }
        &:nth-of-type(2) {
          & > .el-form-item {
            width: 5.2rem;
            .el-input {
              &::after {
                content: "选";
                color: #999999;
                top: 0;
                right: 8px;
                position: absolute;
              }
              & > .el-input__inner {
                cursor: pointer;
                position: relative;
              }
            }
          }
        }
        &:nth-of-type(5),
        &:nth-of-type(2) {
          & > .el-form-item {
            .el-form-item__content {
              & > div {
                flex: 1;
              }
            }
          }
        }
        &:nth-of-type(5) {
          .el-form-item {
            width: 100%;
          }
        }
      }
    }
    & > .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.18rem;
      height: 0.18rem;
      background-image: url("../../../../assets/images/public/close_200.png");
      background-size: 0.12rem 0.12rem;
      background-repeat: no-repeat;
      background-position: center center;
      z-index: 99;
      cursor: pointer;
      &:hover {
        background-image: url("../../../../assets/images/public/close_200_hover.png");
        background-color: red;
      }
    }
    & > .top-box {
      width: 100%;
      height: 0.5rem;
      display: flex;
      align-items: center;

      & > .title {
        width: 1.7rem;
        height: auto;
        line-height: 1;
        color: #444444;
        font-size: 0.14rem;
        font-weight: bold;
      }
      & > .search-btn-input {
        height: 0.24rem;
        line-height: 0.24rem;
        margin-right: 0.2rem;
      }
    }
    .btn {
      padding: 0.08rem 0.2rem;
      position: absolute;
      bottom: 0.1rem;
      right: 0.2rem;
    }
  }
}
</style>
