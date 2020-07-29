<template>
  <div class="g_biggest">
    <div class="all">
      <div class="u_topTitle">{{title}}</div>
      <div class="g_photographerName">
        <div class="u_title">我的意见</div>
         <div class="i-icon">:</div>
        <div class="must"></div>
          <el-radio :label="1">同意</el-radio>
          <el-radio :label="2">不同意</el-radio>
      </div>
        <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="200"
        resize="none"
        show-word-limit
      ></el-input>
      <div class="u_btnSave" @click="saveData">确认</div>
      <!--右上角缩小关闭按钮-->
      <div class="g_box f_r_b">
        <div @click="closeView" class="u_close f_r_s"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textarea:""
    };
  },
  props: {
    operateId: {
      type: Array,
      default() {
        return [];
      }
    },
    title: {
      type: String || Number,
      default() {
        return "";
      }
    },
    reasonTilte: {
      type: String || Number,
      default() {
        return "";
      }
    }
  },
  methods: {
    //保存
    saveData() {
      let val = {
        value: this.reason,
        operateId: this.operateId,
        type: false
      };
      this.$emit("saveView", val);
    },
    //关闭弹窗
    closeView() {
      setTimeout(() => {
        this.$emit("closeView", true);
      }, 200);
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .el-input--small{
  margin-top:0.1rem;
  height:0.9rem;
}
/deep/ .el-textarea__inner{
  height: 100%;
}
/deep/ .el-radio{
  margin-right: 0.2rem;
}
/deep/ .el-radio {
  display: flex;
  align-items: center;
}
/deep/ .el-radio__input {
  display: flex;
   height: 0.14rem;
}
  .i-icon {
        font-size: 0.14rem;
        margin-right: 0.05rem;
        height: 0.3rem;
        color: #444444;
        line-height: 0.28rem;
      }
.u_btnSave {
  max-width: max-content;
  max-height: max-content;
  position: absolute;
  right: 0.4rem;
  bottom: 0.2rem;
  cursor: pointer;
  border-radius: 0.03rem;
  padding: 0.07rem 0.18rem;
  font-family: SimSun;
  font-size: 0.12rem;
  letter-spacing: 0.01rem;
  white-space: nowrap;
  color: #ffffff;
  background-image: linear-gradient(0deg, #449aff 0%, #50a7ff 100%),
    linear-gradient(#259cf3, #259cf3);
  background-blend-mode: normal, normal;
  border: solid 0.01rem #3d81ff;
}
.u_close {
  width: 0.33rem;
  height: 0.27rem;
  cursor: pointer;
  background-image: url("../../../../assets/images/projectAgentInfo/common/close_200.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.12rem auto;
  box-sizing: border-box;
}
.u_close:hover {
  background-color: #f05656;
  background-image: url("../../../../assets/images/projectAgentInfo/common/close_200_hover.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.12rem auto;
}
.g_box {
  position: absolute;
  top: 0;
  right: 0;
  height: 0.27rem;
  align-items: center;
  cursor: pointer;
}
.g_biggest {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
.all {
  width: 3.7rem;
  height: 2.9rem;
  background-color: #eff4f8;
  box-shadow: 0rem 0.03rem 0.05rem 0rem rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.19rem 0.3rem;
  box-sizing: border-box;
  position: relative;
}
.u_topTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: MicrosoftYaHei;
  font-size: 0.18rem;
  color: #567c98;
  margin-bottom: 0.22rem;
}
.g_photographerName {
  height: 0.3rem;
  font-size: 0.23rem;
  color: #666666;
  display: flex;
  align-items: center;
}
.u_title {
  width: 0.55rem;
  font-family: SimSun;
  font-size: 0.12rem;
  color: #444444;
  height: 0.3rem;
  line-height: 0.31rem;
}
.u_name {
  font-size: 0.12rem;
  width: 2.3rem;
  height: 0.3rem;
  background-color: #eeeeee;
  box-shadow: inset 0rem 0.01rem 0.05rem 0rem rgba(202, 213, 223, 0.73);
  border-radius: 0.03rem;
  border: solid 0.01rem #bdc6cf;
  display: flex;
  align-items: center;
  padding-left: 0.12rem;
  box-sizing: border-box;
}
.select {
  width: 2.3rem;
  height: 0.3rem;
  flex-shrink: 0;
  box-sizing: border-box;
}
.u_selectRegion {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.title {
  width: 0.55rem;
  font-family: SimSun;
  font-size: 0.12rem;
  color: #444444;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
  height: 100%;
}
._selectRegion {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.u_titleRegion {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-top: 0.1rem;
}
.color {
  color: #ff5a1f;
  font-size: 0.12rem;
  width: 0.14rem;
  text-align: center;
}
.icons {
  display: flex;
  align-items: center;
}
.i_add {
  width: 0.2rem;
  height: 0.2rem;
  margin-left: 0.05rem;
  font-size: 0.12rem;
  background-image: url("../../../../assets/images/projectAgentInfo/common/addPeopleHover.png");
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
}
.i_add:hover {
  background-image: url("../../../../assets/images/projectAgentInfo/common/addPeople.png");
}
.i_reduce:hover {
  background-image: url("../../../../assets/images/projectAgentInfo/common/del_200.png");
}
.i_reduce {
  background-image: url("../../../../assets/images/projectAgentInfo/common/del_hover_200.png");
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 0.12rem;
  width: 0.2rem;
  height: 0.2rem;
  margin-left: 0.05rem;
}
.must {
  height: 0.29rem;
  margin-right: 0.26rem;
  line-height: 0.2rem;
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
}
</style>