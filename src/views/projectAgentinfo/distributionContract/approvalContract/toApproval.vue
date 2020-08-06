<template>
  <div class="approval">
    <div class="title">
      <div class="approval_title">我来审批</div>
      <div class="approvel_status">
        <div class="icon"></div>
        <div class="status">相关合同</div>
      </div>
      <div class="approvel_status">
        <div class="icon"></div>
        <div class="status">操作信息</div>
      </div>
      <div class="approvel_status">
        <div class="icon"></div>
        <div class="status">补充公司资料</div>
      </div>
      <div class="approvel_status">
        <div class="icon"></div>
        <div class="status">流程详情</div>
      </div>
      <div class="dayin">打印</div>
    </div>
    <div class="content">
      <div class="suggest">
        <div>我的意见：</div>
        <div class="must"></div>
        <el-radio v-model="radio" label="1">同意</el-radio>
        <el-radio v-model="radio" label="2">不同意</el-radio>
      </div>
      <div class="reason">
        <el-input  type="textarea" :rows="2" v-model="textarea" resize="none"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      radio:1,
      textarea:'nihao',
      propertyTypeList: []
    };
  }
};
</script>
<style lang="less" scoped>
.approval {
  width: 100%;
  height: auto;
  margin-top: 0.3rem;
  .title {
    width: 8.5rem;
    display: flex;
    align-items: center;
    position: relative;
    .approval_title {
      height: 0.3rem;
      font-family: MicrosoftYaHei-Bold;
      font-size: 0.16rem;
      font-weight: bold;
      font-stretch: normal;
      line-height: 0.3rem;
      letter-spacing: 0rem;
      color: #000000;
    }
    .approvel_status {
      margin-left: 0.31rem;
      width: auto;
      height: 0.3rem;
      display: flex;
      align-items: center;
      .icon {
        width: 0.11rem;
        height: 0.13rem;
        background-color: #1f96ff;
      }
      .status {
        margin-left: 0.05rem;
        height: 0.3rem;
        font-family: MicrosoftYaHei;
        font-size: 0.13rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.3rem;
        letter-spacing: 0rem;
        color: #259cf3;
      }
    }
    .dayin {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.66rem;
      height: 0.29rem;
      background-color: #1f96ff;
      border-radius: 0.02rem;
      border: solid 0.01rem #1f96ff;
      text-align: center;
      font-family: MicrosoftYaHei;
      font-size: 0.13rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.29rem;
      letter-spacing: 0rem;
      color: #ffffff;
    }
  }
  .content {
    width: 8.5rem;
    height: 2.8rem;
    background-color: #f6f9fc;
    margin-top: 0.1rem;
    margin-bottom: 0.4rem;
    padding-top: 0.4rem;
    padding-left: 0.42rem;
    box-sizing: border-box;
    .suggest {
      height: 0.3rem;
      display: flex;
      align-items: center;
      line-height: 0.3rem;
      font-family: SimSun;
      font-size: 0.12rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #666666;
    }
    /deep/ .el-radio__label{
        font-size: 0.12rem;
    }
    .reason {
        margin-top: 0.1rem;
      padding-left: 0.76rem;
      padding-right: 0.76rem;
      /deep/ .el-textarea__inner{
          height: 1.1rem;
      }
    }
  }
}

.nomust,
.must {
  display: flex;
  height: 0.3rem;
  line-height: 0.3rem;
  margin-right: 0.06rem;
}

.must::after {
  content: "* ";
  width: 0.02rem;
  height: 0.06rem;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff5a1f;
  margin-right: 0.08rem;
  line-height: 0.3rem;
}
.nomust::after {
  content: "*";
  visibility: hidden;
  width: 0.02rem;
  height: 0.06rem;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff5a1f;
  margin-right: 0.08rem;
}
</style>