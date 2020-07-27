<!-- 行政管理&人才资质加分规则 -->
<template>
    <el-form :model="fromData" :rules="rules" :show-message="false" :hide-required-asterisk="false" ref="ruleForm">
      <div class="row-box">
        <div> 第一类考核基础项目完成</div>
        <div>
          <el-form-item prop="addScorePoint">
            <el-input :disabled="configListItem.editOrSave==1"
                      v-only-two-decimal
                      :maxlength="5"
                      v-model="fromData.addScorePoint"
                      :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div>分时，{{tipText}}</div>
      </div>
      <div class="row-box">
        <div>如果每月16号后入职，或降职为经纪人，则第一类考核基础项目完成</div>
        <div>
          <el-form-item prop="addScoreHalfPoint">
            <el-input :disabled="configListItem.editOrSave==1"
                      v-only-two-decimal
                      :maxlength="5"
                      v-model="fromData.addScoreHalfPoint"
                      :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div>分时，可执行本项目加分规则。</div>
      </div>
    </el-form>
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
      tipText:{
        type: [String],
        default(){
          return '可执行加分规则，有封顶分限制的，加分后分数不可超过封顶分。';
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

    data() {
      return {
        inputWidth: '0.7rem',

        // 基础项目完成 addScorePoint 时，可执行加分规则，加分不超过封顶分
        fromData: {
          addScorePoint:"",
          addScoreHalfPoint:"",
        },
        rules: {
          addScorePoint: [{required: true, message: '', trigger: 'blur'}],
          addScoreHalfPoint: [{required: true, message: '', trigger: 'blur'}],
        },
      }
    },

    mounted(){
      this.init();
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
    },
  }
</script>

<style scoped lang="less">
  /deep/ .el-input__inner{
    height: 0.34rem !important;
    font-size: 0.14rem !important;
  }

  .row-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 0.14rem;
    color: #666666;
    flex-shrink: 0;

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
        padding: 0 0.05rem;
        text-align: center;
      }
    }

    /deep/ .el-form-item--small.el-form-item{
      margin-bottom: 0;
    }
  }
</style>
