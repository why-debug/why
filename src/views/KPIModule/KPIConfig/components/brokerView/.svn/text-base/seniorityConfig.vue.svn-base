<!--年资-->
<template>
  <div class="seniority">
    <div class="label">
      <div>年</div>
      <div>资</div>
    </div>
    <div>
      <el-form :model="fromData" :rules="rules" :show-message="false" :hide-required-asterisk="false" ref="ruleForm">
        <div class="seniority-title">
          <div></div>
          <div>分数</div>
          <div></div>
          <div>分数</div>
          <div></div>
          <div>分数</div>
        </div>
        <div class="seniority-content">
          <div class="seniority-content-title">1~2年</div>
          <div>
            <el-form-item prop="onboardingYear1">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.onboardingYear1" :style="{'width': inputWidth}"></el-input>
            </el-form-item>
          </div>
          <div class="seniority-content-title">2~3年</div>
          <div>
            <el-form-item prop="onboardingYear2">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.onboardingYear2" :style="{'width': inputWidth}"></el-input>
            </el-form-item>
          </div>
          <div class="seniority-content-title">3~4年</div>
          <div>
            <el-form-item prop="onboardingYear3">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.onboardingYear3" :style="{'width': inputWidth}"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="seniority-content">
          <div class="seniority-content-title">4~5年</div>
          <div>
            <el-form-item prop="onboardingYear4">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.onboardingYear4" :style="{'width': inputWidth}"></el-input>
            </el-form-item>
          </div>
          <div class="seniority-content-title">5~6年</div>
          <div>
            <el-form-item prop="onboardingYear5">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.onboardingYear5" :style="{'width': inputWidth}"></el-input>
            </el-form-item>
          </div>
          <div class="seniority-content-title">6~7年</div>
          <div>
            <el-form-item prop="onboardingYear6">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.onboardingYear6" :style="{'width': inputWidth}"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="seniority-content">
          <div class="seniority-content-title">7~8年</div>
          <div>
            <el-form-item prop="onboardingYear7">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.onboardingYear7" :style="{'width': inputWidth}"></el-input>
            </el-form-item>
          </div>
          <div class="seniority-content-title">8~9年</div>
          <div>
            <el-form-item prop="onboardingYear8">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.onboardingYear8" :style="{'width': inputWidth}"></el-input>
            </el-form-item>
          </div>
          <div class="seniority-content-title">9~10年</div>
          <div>
            <el-form-item prop="onboardingYear9">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.onboardingYear9" :style="{'width': inputWidth}"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="seniority-content" style="margin-bottom: 0">
          <div class="seniority-content-title">10年以上</div>
          <div>
            <el-form-item prop="onboardingYear10">
              <el-input :disabled="configListItem.editOrSave==1" v-only-two-decimal :maxlength="5" v-model="fromData.onboardingYear10" :style="{'width': inputWidth}"></el-input>
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

    data() {
      return {
        inputWidth: '0.6rem',

        fromData: {
          onboardingYear1:'100',
          onboardingYear2:'200',
          onboardingYear3:'300',
          onboardingYear4:'400',
          onboardingYear5:'500',
          onboardingYear6:'600',
          onboardingYear7:'700',
          onboardingYear8:'800',
          onboardingYear9:'900',
          onboardingYear10:'1000',
        },
        rules: {
          onboardingYear1: [{required: true, message: '', trigger: 'blur'}],
          onboardingYear2: [{required: true, message: '', trigger: 'blur'}],
          onboardingYear3: [{required: true, message: '', trigger: 'blur'}],
          onboardingYear4: [{required: true, message: '', trigger: 'blur'}],
          onboardingYear5: [{required: true, message: '', trigger: 'blur'}],
          onboardingYear6: [{required: true, message: '', trigger: 'blur'}],
          onboardingYear7: [{required: true, message: '', trigger: 'blur'}],
          onboardingYear8: [{required: true, message: '', trigger: 'blur'}],
          onboardingYear9: [{required: true, message: '', trigger: 'blur'}],
          onboardingYear10: [{required: true, message: '', trigger: 'blur'}],
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
      },
    }
  }
</script>

<style scoped lang="less">
  /deep/ .el-input__inner{
    padding: 0 0.05rem;
    height: 0.34rem !important;
    font-size: 0.14rem !important;
  }

  .seniority {
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
      margin-left: 0.14rem;
      margin-right: 0.15rem;
    }

    .seniority-title {
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
      }
    }

    .seniority-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 0.14rem;
      letter-spacing: 0.01rem;
      color: #999999;
      margin-bottom: 0.05rem;

      .seniority-content-title {
        color: #666666;
        text-align: right;
      }

      & > div {
        text-align: center;
        width: 0.65rem;
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
