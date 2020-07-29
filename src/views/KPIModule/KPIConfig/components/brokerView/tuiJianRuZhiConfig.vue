<template>
  <div>
    <el-form :model="fromData" :rules="rules" :show-message="false" :hide-required-asterisk="false" ref="ruleForm">
      <div class="row-box">
        <span class="label"><div>业</div><div>务</div><div>员：</div></span>
        <div>入职满3个月，推荐人可获得</div>
        <div>
          <el-form-item prop="recommendBusinessPosition">
            <el-input
              :disabled="configListItem.editOrSave==1"
              v-only-two-decimal
              :maxlength="5"
              v-model="fromData.recommendBusinessPosition"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div>分</div>
      </div>
      <div class="row-box">
        <span class="label"><div>管</div><div>理</div><div>岗：</div></span>
        <div>
          在该岗位或以上满6个月，推荐人可获得
        </div>
        <div>
          <el-form-item prop="recommendManagePosition">
            <el-input
              :disabled="configListItem.editOrSave==1"
              v-only-two-decimal
              :maxlength="5"
              v-model="fromData.recommendManagePosition"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div>分</div>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      dataItem: {
        type: [Object],
        default() {
          return {}
        },
      },
      configListItem: {
        type: [Array, Object],
        default() {
          return {};
        }
      },
    },

    watch: {
      dataItem: {
        handler: function () {
          this.init();
        },
        deep: true
      }
    },

    mounted(){
      this.init();
    },

    data() {
      return {
        inputWidth: '0.6rem',

        // 入职满3个月，推荐人可获得 recommendBusinessPosition 分(业务员)
        // 在该岗位或以上满6个月，推荐人可获得 recommendManagePosition 分(管理员)
        fromData: {
          recommendBusinessPosition:'300', // 业务员
          recommendManagePosition:'500', // 管理员
        },
        rules: {
          recommendBusinessPosition: [{required: true, message: '', trigger: 'blur'}],
          recommendManagePosition: [{required: true, message: '', trigger: 'blur'}],
        },
      }
    },

    methods: {
      init() {
        this.fromData = JSON.parse(JSON.stringify(this.dataItem));
      },
      getData(){
        return this.fromData;
      },
      validate() {
        return this.$refs['ruleForm'].validate();
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      }
    }
  }
</script>

<style scoped lang="less">
  /deep/ .el-input__inner{
    padding: 0 0.05rem;
    height: 0.34rem !important;
    font-size: 0.14rem !important;
  }

  .row-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 0.14rem;
    color: #666666;
    box-sizing: border-box;

    .ac {
      vertical-align: middle;
      padding-top: 0.17rem;
      box-sizing: border-box;
      line-height: 0.16rem;
    }

    .label {
      width: 0.66rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      color: #666666;
    }

    & > div {
      margin-right: 0.1rem;
    }

    :last-child {
      margin-right: 0;
    }

    /deep/ .el-input--small .el-input__inner {
      line-height: normal;
      text-align: center;
    }

    /deep/ .el-input {
      /deep/ .el-input__inner {
        font-size: 0.14rem;
        height: 0.34rem;
        padding: 0 0.01rem;
        text-align: center;
      }
    }

    /deep/ .el-form-item--small.el-form-item{
      margin-bottom: 0;
    }
  }
</style>
