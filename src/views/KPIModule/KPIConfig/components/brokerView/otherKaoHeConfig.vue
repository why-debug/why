<template>
  <div>
    <el-form :model="fromData" :rules="rules" :show-message="false" :hide-required-asterisk="false" ref="ruleForm">
      <div class="row-box">
        <div>全勤：全月未请事假，无迟到、早退、旷工现象得</div>
        <div>
          <el-form-item prop="attendanceUpStd">
            <el-input
              v-only-two-decimal
              :disabled="configListItem.editOrSave==1"
              :maxlength="5"
              v-model="fromData.attendanceUpStd"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div>分</div>
      </div>
      <div class="row-box">
        <div>形象：优质服务（衣着、工牌、戴工牌在门口抽烟），分行无人违规得</div>
        <div>
          <el-form-item prop="imageUpStd">
            <el-input
              v-only-two-decimal
              :disabled="configListItem.editOrSave==1"
              :maxlength="5"
              v-model="fromData.imageUpStd"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div>分</div>
      </div>
      <div class="row-box" style="margin-bottom: 0">
        <div>经纪人星级牌照：持证上岗即得</div>
        <div>
          <el-form-item prop="starAgent">
            <el-input
              v-only-two-decimal
              :disabled="configListItem.editOrSave==1"
              :maxlength="5"
              v-model="fromData.starAgent"
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
      }
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
        inputWidth: '0.7rem',

        // 全月未请事假，无迟到、早退、旷工现象得 attendanceUpStd 分
        // 优质服务（衣着、工牌、戴工牌在门口抽烟），分行无人违规得 imageUpStd 分
        // 经纪人星级牌照：持证上岗即得 starAgent 分
        fromData: {
          attendanceUpStd:"100",
          imageUpStd:"150",
          starAgent:"50"
        },
        rules: {
          attendanceUpStd: [{required: true, message: '', trigger: 'blur'}],
          imageUpStd: [{required: true, message: '', trigger: 'blur'}],
          starAgent: [{required: true, message: '', trigger: 'blur'}],
        },
      }
    },

    methods: {
      init() {
        this.fromData = JSON.parse(JSON.stringify(this.dataItem));
      },
      // 所有的子组件中都需要包含两个方法 validate(验证)、getData(获取数据) 供父组件调用。
      getData() {
        return this.fromData;
      },
      validate() {
        return this.$refs['ruleForm'].validate();
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      },
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
    margin-bottom: 0.07rem;

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
