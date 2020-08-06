<!--学历-->
<template>
  <div class="education">
    <div class="label">
      <div>学</div>
      <div>历</div>
    </div>
    <div>
      <el-form :model="fromData" :rules="rules" :show-message="false" :hide-required-asterisk="false" ref="ruleForm">

        <div class="education-title">
          <div></div>
          <div>分数</div>
          <div></div>
          <div>分数</div>
        </div>
        <div class="education-content">
          <div class="education-content-title">全日制大专</div>
          <div>
            <el-form-item prop="collegeDegree">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.collegeDegree" :style="{'width': inputWidth}"></el-input>
            </el-form-item>
          </div>
          <div class="education-content-title">全日制本科</div>
          <div>
            <el-form-item prop="undergraduateDegree">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.undergraduateDegree" :style="{'width': inputWidth}"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="education-content" style="margin-bottom: 0;">
          <div class="education-content-title">全日制本科以上</div>
          <div>
            <el-form-item prop="graduateDegree">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.graduateDegree" :style="{'width': inputWidth}"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
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

        fromData: {
          collegeDegree:'300', // 专科
          undergraduateDegree:'500', // 本科
          graduateDegree:'800', // 本科及以上
        },
        rules: {
          collegeDegree: [{required: true, message: '', trigger: 'blur'}],
          undergraduateDegree: [{required: true, message: '', trigger: 'blur'}],
          graduateDegree: [{required: true, message: '', trigger: 'blur'}],
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

  .education {
    display: flex;
    .label {
      width: 0.52rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      font-size: 0.16rem;
      font-weight: normal;
      font-stretch: normal;
      color: #444444;
      text-align: right;
      margin-left: 0.14rem;
    }

    .education-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 0.14rem;
      letter-spacing: 0.01rem;
      color: #999999;
      margin-bottom: 0.21rem;

      & > div {
        text-align: center;
        width: 0.65rem;

        &:nth-child(2n+1) {
          text-align: center;
          width: 1.2rem;
        }
      }
    }

    .education-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 0.14rem;
      letter-spacing: 0.01rem;
      color: #999999;
      margin-bottom: 0.05rem;

      .education-content-title {
        color: #666666;
      }

      & > div {
        text-align: right;
        width: 0.65rem;

        &:nth-child(2n+1) {
          width: 1.2rem;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }

      /deep/ .el-input--small .el-input__inner {
        line-height: normal;
        text-align: center;
      }

      /deep/ .el-input {
        /deep/ .el-input__inner {
          font-size: 0.14rem;
          height: 0.34rem;
          padding: 0 0.05rem;
          text-align: center;
        }
      }

      /deep/ .el-form-item--small.el-form-item{
        margin-bottom: 0;
      }
    }
  }
</style>
