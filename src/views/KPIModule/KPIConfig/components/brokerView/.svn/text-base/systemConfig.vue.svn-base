<!--红黄蓝制度-->
<template>
  <div class="box">
    <div class="title">红黄蓝制度</div>
    <div>
      <el-form :model="fromData" :rules="rules" :show-message="false" :hide-required-asterisk="false" ref="ruleForm">
        <!--红线 violateRedLine redLineRadio-->
        <div class="system-box">
          <div class="label">触犯红线制度</div>
          <div class="radio-box" style="margin-right: 0.63rem" @click.stop="changeRadioLeft('violateRedLine')">
            <img v-if="fromData.redLineRadio == '-1'" src="../../../../../assets/images/public/radio_checked_200.png" alt="">
            <img v-else src="../../../../../assets/images/public/radio_default_200.png" alt="">
            <div>整个绩效分数扣完</div>
          </div>
          <div class="radio-box" style="margin-right: 0.1rem" @click.stop="changeRadioRight('violateRedLine')">
            <img v-if="fromData.redLineRadio != '-1'" src="../../../../../assets/images/public/radio_checked_200.png" alt="">
            <img v-else src="../../../../../assets/images/public/radio_default_200.png" alt="">
            整个绩效分数扣（上不封顶）
          </div>
          <div>
            <el-form-item prop="violateRedLine" :rules="fromData.redLineRadio != '-1'?rules.violateRedLine:[{ required: false, message: '', trigger: 'blur'}]">
              <el-input
                :disabled="getDisabledStatus('violateRedLine')" v-only-two-decimal :maxlength="5" v-model="fromData.violateRedLine" :style="{'width': inputWidth}">
              </el-input>
            </el-form-item>
          </div>
          <div style="margin-left: 0.1rem">分</div>
        </div>
        <!--黄线 violateYellowLine yellowLineRadio-->
        <div class="system-box">
          <div class="label">触犯黄线制度</div>
          <div class="radio-box" style="margin-right: 0.63rem" @click.stop="changeRadioLeft('violateYellowLine')">
            <img v-if="fromData.yellowLineRadio == '-1'" src="../../../../../assets/images/public/radio_checked_200.png" alt="">
            <img v-else src="../../../../../assets/images/public/radio_default_200.png" alt="">
            <div>整个绩效分数扣完</div>
          </div>
          <div class="radio-box" style="margin-right: 0.1rem" @click.stop="changeRadioRight('violateYellowLine')">
            <img v-if="fromData.yellowLineRadio != '-1'" src="../../../../../assets/images/public/radio_checked_200.png" alt="">
            <img v-else src="../../../../../assets/images/public/radio_default_200.png" alt="">
            整个绩效分数扣（上不封顶）
          </div>
          <div>
            <el-form-item prop="violateYellowLine" :rules="fromData.yellowLineRadio != '-1'?rules.violateYellowLine:[{ required: false, message: '', trigger: 'blur'}]">
              <el-input
                :disabled="getDisabledStatus('violateYellowLine')" v-only-two-decimal :maxlength="5" v-model="fromData.violateYellowLine" :style="{'width': inputWidth}">
              </el-input>
            </el-form-item>
          </div>
          <div style="margin-left: 0.1rem">分</div>
        </div>
        <!--蓝线 violateBlueLine blueLineRadio-->
        <div class="system-box">
          <div class="label">触犯蓝线制度</div>
          <div class="radio-box" style="margin-right: 0.63rem" @click.stop="changeRadioLeft('violateBlueLine')">
            <img v-if="fromData.blueLineRadio == '-1'" src="../../../../../assets/images/public/radio_checked_200.png" alt="">
            <img v-else src="../../../../../assets/images/public/radio_default_200.png" alt="">
            <div>整个绩效分数扣完</div>
          </div>
          <div class="radio-box" style="margin-right: 0.1rem" @click.stop="changeRadioRight('violateBlueLine')">
            <img v-if="fromData.blueLineRadio != '-1'" src="../../../../../assets/images/public/radio_checked_200.png" alt="">
            <img v-else src="../../../../../assets/images/public/radio_default_200.png" alt="">
            整个绩效分数扣（上不封顶）
          </div>
          <div>
            <el-form-item prop="violateBlueLine" :rules="fromData.blueLineRadio != '-1'?rules.violateBlueLine:[{ required: false, message: '', trigger: 'blur' }]">
              <el-input
                :disabled="getDisabledStatus('violateBlueLine')" v-only-two-decimal :maxlength="5" v-model="fromData.violateBlueLine" :style="{'width': inputWidth}">
              </el-input>
            </el-form-item>
          </div>
          <div style="margin-left: 0.1rem">分</div>
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

        // 每项值为-1表示:扣完整个绩效  大于零表示:扣绩效分xx分
        fromData:{
          violateRedLine:'', // 触犯红线 -1.扣完，>0单次都xx分
          redLineRadio:'-1',

          violateYellowLine:'', // 触犯黄线 -1.扣完，>0单次都xx分
          yellowLineRadio:'-1',

          violateBlueLine:'', // 触犯蓝线 -1.扣完，>0单次都xx分
          blueLineRadio:'-1',
        },
        rules: {
          violateRedLine: [{required: true, message: '', trigger: 'blur'}],
          violateYellowLine: [{required: true, message: '', trigger: 'blur'}],
          violateBlueLine: [{required: true, message: '', trigger: 'blur'}],
        },
        oldFromData:{},
      }
    },

    mounted(){
      this.init();
    },

    methods: {
      init() {
        // violateBlueLine:'', // 触犯蓝线 -1.扣完，>0单次都xx分
        // violateRedLine:'', // 触犯红线 -1.扣完，>0单次都xx分
        // violateYellowLine:'', // 触犯黄线 -1.扣完，>0单次都xx分
        let fromData = JSON.parse(JSON.stringify(this.dataItem));
        this.oldFromData = JSON.parse(JSON.stringify(this.dataItem));

        this.fromData.violateRedLine = fromData.violateRedLine == '-1' ? '' : fromData.violateRedLine;
        this.fromData.redLineRadio = fromData.violateRedLine == '-1' ? '-1' : fromData.violateRedLine;

        this.fromData.violateYellowLine = fromData.violateYellowLine == '-1' ? '' : fromData.violateYellowLine;
        this.fromData.yellowLineRadio = fromData.violateYellowLine == '-1' ? '-1' : fromData.violateYellowLine;

        this.fromData.violateBlueLine = fromData.violateBlueLine == '-1' ? '' : fromData.violateBlueLine;
        this.fromData.blueLineRadio = fromData.violateBlueLine == '-1' ? '-1' : fromData.violateBlueLine;
      },
      changeRadioLeft(field) {
        if (this.configListItem.editOrSave==1) return;

        if (field == 'violateRedLine'){
          this.fromData.redLineRadio = '-1';
          this.fromData.violateRedLine = '';
        }
        if (field == 'violateYellowLine'){
          this.fromData.yellowLineRadio = '-1';
          this.fromData.violateYellowLine = '';
        }
        if (field == 'violateBlueLine'){
          this.fromData.blueLineRadio = '-1';
          this.fromData.violateBlueLine = '';
        }
      },
      changeRadioRight(field) {
        if (this.configListItem.editOrSave==1) return;

        if (field == 'violateRedLine'){
          this.fromData.redLineRadio = '1';
          this.fromData.violateRedLine = this.oldFromData.violateRedLine == '-1' ? '' : this.oldFromData.violateRedLine;
        }
        if (field == 'violateYellowLine'){
          this.fromData.yellowLineRadio = '1';
          this.fromData.violateYellowLine = this.oldFromData.violateYellowLine == '-1'? '' : this.oldFromData.violateYellowLine;
        }
        if (field == 'violateBlueLine'){
          this.fromData.blueLineRadio = '1';
          this.fromData.violateBlueLine = this.oldFromData.violateBlueLine == '-1' ? '' : this.oldFromData.violateBlueLine;
        }
      },
      getDisabledStatus(field) {
        if (this.configListItem.editOrSave==1) return true;

        if (field == 'violateRedLine' && this.fromData.redLineRadio < 0){ return  true;}
        if (field == 'violateYellowLine' && this.fromData.yellowLineRadio < 0){ return  true;}
        if (field == 'violateBlueLine' && this.fromData.blueLineRadio < 0){ return  true;}
        return false;
      },
      // 所有的子组件中都需要包含两个方法 validate(验证)、getData(获取数据) 供父组件调用。
      getData() {
        let newData = {
          violateRedLine:'', // 触犯红线 -1.扣完，>0单次都xx分
          violateYellowLine:'', // 触犯黄线 -1.扣完，>0单次都xx分
          violateBlueLine:'', // 触犯蓝线 -1.扣完，>0单次都xx分
        };
        newData.violateRedLine = this.fromData.violateRedLine=='' ? '-1' : this.fromData.violateRedLine;
        newData.violateYellowLine = this.fromData.violateYellowLine=='' ? '-1' : this.fromData.violateYellowLine;
        newData.violateBlueLine = this.fromData.violateBlueLine=='' ? '-1' : this.fromData.violateBlueLine;
        return newData;
      },
      validate() {
        return this.$refs['ruleForm'].validate();
      },
      // 重置表单
      resetForm() {
        // this.$refs['ruleForm'].resetFields();
        this.fromData.violateRedLine = '';
        this.fromData.redLineRadio = '-1';

        this.fromData.violateYellowLine = '';
        this.fromData.yellowLineRadio = '-1';

        this.fromData.violateBlueLine = '800';
        this.fromData.blueLineRadio = '800';
      }
    },
  }
</script>

<style scoped lang="less">
  /deep/ .el-input__inner{
    padding: 0 0.05rem;
    height: 0.34rem !important;
    font-size: 0.14rem !important;
  }

  .box{
    display: flex;
    .title{
      font-size: 0.16rem;
      letter-spacing: 0;
      color: #444444;
      line-height: 0.34rem;
      margin-right: 0.38rem;
      margin-left: -0.12rem;
    }
    .system-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 0.14rem;
      color: #666666;
      margin-bottom: 0.07rem;

      .title {
        font-size: 0.16rem;
        letter-spacing: 0;
        color: #444444;
      }

      .label {
        font-size: 0.14rem;
        color: #666666;
        margin-right: 0.57rem;
      }

      .radio-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;

        & > img {
          width: 0.16rem;
          height: 0.16rem;
          margin-right: 0.11rem;
        }
      }

      /deep/ .el-input--small .el-input__inner {
        line-height: normal;
        text-align: center;
      }

      /deep/ .el-input {
        /deep/ .el-input__inner {
          font-size: 0.14rem;
          height: 0.34rem;
          padding: 0 0.1rem;
          text-align: center;
        }
      }

      /deep/ .el-form-item--small.el-form-item{
        margin-bottom: 0;
      }
    }
  }
</style>
