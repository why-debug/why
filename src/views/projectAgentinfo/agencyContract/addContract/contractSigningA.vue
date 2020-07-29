<template>
  <div class="basic">
    <dividingLine :title="`合同签署双方(甲方)`"></dividingLine>
    <div class="basic_item_i">
      <div class="basic_item_i_title">开发商名称：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'3.4rem'}" maxlength="20"></el-input>
    </div>
    <div class="basic_item_i">
      <div class="basic_item_i_title">代理商名称：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'3.4rem'}" maxlength="20"></el-input>

      <div class="right_title">
        <span>地</span>
        <span>址 ：</span>
      </div>
      <div class="nomust"></div>
      <el-input :style="{'width':'3.4rem'}" maxlength="20"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">甲方对接人：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20"></el-input>

      <div class="right_title_a">对接电话：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20"></el-input>

      <div class="right_title_a">邮箱或微信：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">财务人员：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20"></el-input>

      <div class="right_title_a">财务电话：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20"></el-input>

      <div class="right_title_a">邮箱或微信：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20"></el-input>
    </div>
  </div>
</template>
<script>
import dividingLine from "./dividingLine";
export default {
  components: {
    dividingLine
  },
  data() {
    return {
      propertyTypeList: []
    };
  }
};
</script>
<style lang="less" scoped>
.basic {
  margin-top: 0.45rem;
  .basic_item_i {
    width: 9.9rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    .basic_item_i_title {
      width: 1.02rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
    }
    .right_title {
      width: 0.64rem;
      display: flex;
      justify-content: space-around;
      margin-left: 1.1rem;
      color:#444444;
    }
    .right_title_a {
      margin-left: 0.38rem;
      color:#444444;
    }
    /deep/ .el-checkbox {
      margin-right: 0.22rem;
    }
    .qianyue {
      display: flex;
      align-items: center;
      .yewu {
        margin-left: 0.53rem;
      }
    }
    .select_fanwei {
      display: flex;
      align-items: center;
    }
  }
  .basic_item_j {
    width: 10.1rem;
    height: 1.1rem;
    display: flex;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    /deep/ .el-textarea__inner {
      height: 1.1rem;
    }
    .basic_item_i_title {
      width: 1.02rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
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