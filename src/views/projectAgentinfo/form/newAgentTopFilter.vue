<template>
  
    <!--弹窗-->
    <transition name="el-fade-in">
      <div v-show="showTc" class="select_tc f_c_s">
        <div class="area_tc_cont" @click="WithinLimits">
          <div class="leftSelect">
            <div class="liftTile specialTop">
              <div class="icon">
                <img
                  src="../../../assets/images/projectAgentInfo/agentContract/file.png"
                />
              </div>
              <div class="textOne">归</div>
              <div class="textTwo">档</div>
            </div>
            <div class="liftTile">
              <div class="icon">
                <img
                  src="../../../assets/images/projectAgentInfo/agentContract/stamp.png"
                />
              </div>
              <div class="textOne">盖</div>
              <div class="textTwo">章</div>
            </div>
            <div class="liftTile">
              <div class="icon">
                <img
                  src="../../../assets/images/projectAgentInfo/agentContract/void.png"
                />
              </div>
              <div class="textOne">作</div>
              <div class="textTwo">废</div>
            </div>
            <div class="liftTile">
              <div class="icon">
                <img
                  src="../../../assets/images/projectAgentInfo/agentContract/tiemOut.png"
                />
              </div>
              <div class="textOne">过</div>
              <div class="textTwo">期</div>
            </div>
            <div class="liftTile">
              <div class="icon special">
                <img
                  src="../../../assets/images/projectAgentInfo/agentContract/missData.png"
                />
              </div>
              <div class="fileText">资料缺失</div>
            </div>
            <div class="liftTile">
              <div class="icon">
                <img
                  src="../../../assets/images/projectAgentInfo/agentContract/risk.png"
                />
              </div>
              <div class="textOne">风</div>
              <div class="textTwo">险</div>
            </div>
          </div>

          <div class="rightSelect">
            <div class="rightTile specialTop">
              <div
                v-for="(item, index) in fileList"
                :class="{ titleHover: index === fileIndex }"
                @click.stop="clickItem(item, 1)"
                :key="index"
              >
                {{ item[textKey] }}
              </div>
            </div>
            <div class="rightTile">
              <div
                v-for="(item, index) in sureList"
                :class="{ titleHover: index === sureIndex }"
                @click.stop="clickItem(item, 2)"
                :key="index"
              >
                {{ item[textKey] }}
              </div>
            </div>
            <div class="rightTile">
              <div
                v-for="(item, index) in voidList"
                :class="{ titleHover: index === voidIndex }"
                @click.stop="clickItem(item, 3)"
                :key="index"
              >
                {{ item[textKey] }}
              </div>
            </div>
            <div class="rightTile">
              <div
                v-for="(item, index) in tOutList"
                :class="{ titleHover: index === tOutIndex }"
                @click.stop="clickItem(item, 4)"
                :key="index"
              >
                {{ item[textKey] }}
              </div>
            </div>
            <div class="rightTile">
              <div
                v-for="(item, index) in mDataList"
                :class="{ titleHover: index === mDataIndex }"
                @click.stop="clickItem(item, 5)"
                :key="index"
              >
                {{ item[textKey] }}
              </div>
            </div>
            <div class="rightTile">
              <div
                v-for="(item, index) in riskList"
                :class="{ titleHover: index === riskIndex }"
                @click.stop="clickItem(item, 6)"
                :key="index"
              >
                {{ item[textKey] }}
              </div>
            </div>
            <div class="rightTile">
              <div
                v-for="(item, index) in moreRisk"
                :class="{ titleHover: 2 === riskIndex }"
                @click.stop="clickItem(item, 6)"
                :key="index"
              >
                {{ item[textKey] }}
              </div>
              <div></div>
            </div>
          </div>

          <div class="fliterBottom">
            <div class="reset" @click.stop="reset">重置</div>
            <div class="sure" @click.stop="sure">确定</div>
          </div>
        </div>
      </div>
    </transition>
  
</template>

<script>
class PrivateData {
  static timeOutVal = null;
}

export default {
  data() {
    return {
      showTc: false,
      selectText: "",//选中值文字
      hoverIndex: null,
      clickShow: false,
      TimeType: 1,
      Time: [],
      Reset: false,
      fileIndex: "",
      sureIndex: "",
      voidIndex: "",
      tOutIndex: "",
      mDataIndex: "",
      riskIndex: "",
      fileList: [
        { id: 1, text: "未归档" },
        { id: 2, text: "已归档" },
      ], //归档
      sureList: [
        { id: 1, text: "否" },
        { id: 2, text: "是" },
      ], //盖章
      voidList: [
        { id: 1, text: "未作废" },
        { id: 2, text: "已作废" },
      ], //作废
      tOutList: [
        { id: 1, text: "未过期" },
        { id: 2, text: "已过期" },
      ], //过期
      mDataList: [
        { id: 1, text: "未缺失" },
        { id: 2, text: "缺失" },
      ], //资料缺失
      riskList: [
        { id: 1, text: "无风险" },
        { id: 2, text: "一般风险" },
      ], //风险
      moreRisk: [{ id: 3, text: "重大风险" }],
      filterParams: {
        isFile: "",
        isStamp: "",
        isVoid: "",
        isTimeOut: "",
        isMissData: "",
        isRisk: "",
      },
    };
  },

  props: {
    // 列表文案key
    textKey: {
      type: String,
      default() {
        return "text";
      },
    },
    // 时间类型
    timeType: {
      type: String | Number,
      default() {
        return "";
      },
    },
    imgSrc: {
      type: String,
      default() {
        return require("../../../assets/main_TJshaixuan/data_200.png");
      },
    },
    imgWidth: {
      type: String,
      default() {
        return "0.15rem";
      },
    },
    imgHeight: {
      type: String,
      default() {
        return "0.15rem";
      },
    },
    // 是否清空
    empty: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },

  watch: {
    TimeTypeList: {
      handler: function(to, from) {
        console.log(this.timeTypeList);
      },
      deep: true,
    },
    timeType: {
      handler: function() {
        console.log(this.timeType, "时间类型");
      },
      deep: true,
    },
    empty: function() {
      this.Reset = this.empty;
      if (this.Reset) {
        this.emptySuccess();
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleBodyClick);
  },
  destroyed() {
    document.addEventListener("click", this.handleBodyClick);
  },
  methods: {
    //判断当前选择
    clickItem(val, index) {
      switch (index) {
        case 1:
          let isFileStr =this.selectText.replace('未归档 ','');
          isFileStr = isFileStr.replace('已归档 ','');
          this.selectText ="";
          this.selectText = isFileStr + val.text + " ";
          this.filterParams.isFile = val.id-1;
          this.fileIndex = val.id - 1;
          break;
        case 2:
          let isStampStr =this.selectText.replace('是 ','');
          isStampStr = isStampStr.replace('否 ','');
          this.selectText ="";
          this.selectText = isStampStr + val.text + " ";
          this.filterParams.isStamp = val.id-1;
          this.sureIndex = val.id - 1;
          break;
        case 3:
          let isVoidStr =this.selectText.replace('未作废 ','');
          isVoidStr = isVoidStr.replace('已作废 ','');
          this.selectText ="";
          this.selectText = isVoidStr + val.text + " ";
          this.filterParams.isVoid = val.id-1;
          this.voidIndex = val.id - 1;
          break;
        case 4:
          let isTimeOutStr =this.selectText.replace('未过期 ','');
          isTimeOutStr = isTimeOutStr.replace('已过期 ','');
          this.selectText ="";
          this.selectText = isTimeOutStr + val.text + " ";
          this.filterParams.isTimeOut = val.id-1;
          this.tOutIndex = val.id - 1;
          break;
        case 5:
          let isMissDataStr =this.selectText.replace('未缺失 ','');
          isMissDataStr = isMissDataStr.replace('缺失 ','');
          this.selectText ="";
          this.selectText = isMissDataStr + val.text + " ";
          this.filterParams.isMissData = val.id-1;
          this.mDataIndex = val.id - 1;
          break;
        case 6:
          let isRiskStr =this.selectText.replace('无风险 ','');
          isRiskStr = isRiskStr.replace('一般风险 ','');
          isRiskStr = isRiskStr.replace('重大风险 ','');
          this.selectText ="";
          this.selectText = isRiskStr + val.text + " ";
          this.filterParams.isRisk = val.id-1;
          this.riskIndex = val.id - 1;
          break;
      }
    },
    //点击框内
    WithinLimits() {
      this.clickShow = true;
    },
    emptySuccess() {
      this.selectText = "";
      this.reset();
    },
    handleBodyClick() {
      this.Reset = false;
      if (this.clickShow) {
        this.clickShow = false;
        return;
      }
      this.showTc = false;
    },
    // 选择
    chooseInfo() {
      this.Reset = false;
      this.clickShow = false;
      this.showTc = true;
    },
    //重置
    reset() {
      this.filterParams.isFile = "";
      this.fileIndex = "";
      this.filterParams.isStamp = "";
      this.sureIndex = "";
      this.filterParams.isVoid = "";
      this.voidIndex = "";
      this.filterParams.isTimeOut = "";
      this.tOutIndex = "";
      this.filterParams.isMissData = "";
      this.mDataIndex = "";
      this.filterParams.isRisk = "";
      this.riskIndex = "";
      this.selectText = '';
      let data = {
      filterParams:this.filterParams,
      selectText:this.selectText
    }
      setTimeout(() => {
      this.showTc = false;
      this.$emit("filterParams", data);
    }, 500);
    },
    //确定
    sure() {
      console.log(this.selectText,this.filterParams,'筛选');
      let data = {
        filterParams:this.filterParams,
        selectText:this.selectText
      }
      setTimeout(() => {
        this.showTc = false;
        this.$emit("filterParams", data);
      }, 500);
    },
  },
};
</script>

<style lang="less">
.SelectTimeType .el-radio__inner::after {
  width: 4px !important;
  height: 4px !important;
  background-color: #409eff !important;
}
.SelectTimeType .el-radio__input.is-checked .el-radio__inner {
  background-color: #ffffff !important;
}
.el-range-editor--small .el-range-separator {
  position: absolute;
  top: 0;
  margin-left: 1.23rem;
  left: 0;
  right: 0;
}
.el-range-editor--small .el-range-input:nth-child(2) {
  margin-left: 0.1rem;
}
.el-range-editor--small .el-range-input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-left: 1.45rem;
}
</style>
<style scoped lang="less">
.el-range-editor--small .el-range-input {
  font-size: 0.12rem;
}
.el-range__close-ico {
  width: 15px !important;
}
.SubmitBtn {
  font-size: 0.14rem;
  padding: 0.02rem 0.1rem;
  border-radius: 0.03rem;
  border-style: none;
  border: 0.01rem solid #028fed;
  background-color: #d9f1fe;
  color: #028fed;
  align-items: flex-end;
  position: absolute;
  right: 0.1rem;
  margin-top: 0.1rem;
}
.el-radio {
  margin: 0 !important;
}
.SelectTimeType {
  margin-top: 0.08rem;
}
.SelectTimeType .el-radio-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.SelectTimeType .el-radio__input {
  height: 0.25rem !important;
}
.SelectTimeType .el-radio {
  font-size: 0.18rem;
  width: 1.5rem;
  padding-left: 4%;
  line-height: 0.35rem;
  height: 0.35rem;
  float: left;
  margin-top: 0.1rem !important;
  box-sizing: border-box;
}
.area_tc_cont {
  position: relative;
  width: 2.59rem;
  height: 2.8rem;
  background-color: #fff;
  box-shadow: 0.04rem 0rem 0.09rem 0rem rgba(192, 192, 192, 0.75);
  padding-top: 0.01rem;
}
.rightSelect {
  width: 1.67rem;
  height: 100%;
  background-color: #ffffff;
  padding-top: 0.01rem;
  float: right;
}
.rightTile {
  width: 100%;
  height: 0.24rem;
  display: flex;
  justify-content: space-evenly;
  font-size: 0.12rem;
  line-height: 0.24rem;
  color: #444444;
  margin-top: 0.05rem;
}
.rightTile div {
  width: 0.51rem;
  height: 100%;
  margin-left: 0.16rem;
  text-align: left;
}

.rightTile div:hover {
  color: #fff;
  background-color: #4aadf5;
}
.titleHover {
  color: #fff;
  background-color: #4aadf5;
}
.leftSelect {
  float: left;
  width: 0.92rem;
  height: 100%;
  background-color: #fafafa;
  padding-top: 0.01rem;
  /* background-color: #259cf3; */
}
.liftTile {
  width: 100%;
  height: 0.24rem;
  display: flex;
  justify-content: space-evenly;
  font-size: 0.12rem;
  line-height: 0.24rem;
  color: #444444;
  margin-top: 0.05rem;
  &>div{
    margin-left: 0.16rem;
  }
}
.specialTop{
  margin-top: 0.1rem;
}
.special {
  margin-left: 0.1rem;
}
.fileText {
  margin-left: 0.06rem;
}

/* .liftTile div:nth-of-type(2){
  width: 0.44rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
} */
.icon {
  width: 0.12rem;
  height: 0.12rem;
  /* background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  background-image: url('../../../assets/images/projectAgentInfo/agentContract/file.png'); */
}
.icon img {
  width: 100%;
  height: 100%;
}

.fliterBottom {
  width: 100%;
  height: 0.43rem;
  position: absolute;
  bottom: 0;
  &> div:nth-of-type(1){
    position: absolute;
    left: 0;
  }
   &> div:nth-of-type(2){
    position: absolute;
    right: 0;
  }
}
.reset {
  width: 49%;
  min-width: 1.25rem;
  height: 0.43rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0.43rem;
  text-align: center;
  background-color: #98dcf9;
}
.sure {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 49%;
  min-width: 1.25rem;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: center;
  background-color: #259cf3;
}

.TimeSelect {
  width: 3.1rem;
  height: 0.33rem;
  position: relative;
  margin-top: 0.23rem;
}
.TimeSelect .el-date-editor--daterange.el-input__inner {
  width: 2.9rem !important;
  position: absolute;
  top: 0;
  left: 0.1rem;
}
</style>
<style scoped lang="less">
@import "../../../style/select";
@desColor: #9ba792;

.select_reg {
  width: @width;
  position: relative;
  cursor: pointer;
  &::after {
    content: "";
    background-image: linear-gradient(#2398ee, #015796, #2398ee);
    width: 0.01rem;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
.selected_item {
  background: @bgColor;
  height: 0.33rem;
  line-height: 0.33rem;
  width: 100%;
  box-shadow: 0 0.01rem 0 0 rgba(255, 255, 255, 0.3);
  position: relative;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid @borderBottomColor;
  .selected_build {
    margin: auto 0.04rem auto 0.04rem;
    flex-shrink: 0;
    width: 0.15rem;
    height: 0.15rem;
    display: flex;
  }
  .selected_arrow {
    flex-shrink: 0;
    width: 0.1rem;
    position: absolute;
    right: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .selected_text {
    font-weight: bold;
    font-family: SimSun;
    font-size: 0.12rem;
    font-stretch: normal;
    letter-spacing: 0;
    color: #00223a;
    text-align: left;
    max-width: calc(100% - 0.26rem);
    padding-right: 0.15rem;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .selectedTextWhite {
    color: #ffffff;
    font-weight: bold;
  }
  .selected_del {
    flex-shrink: 0;
    width: 0.15rem;
    position: absolute;
    right: 0.05rem;
    top: 50%;
    transform: translateY(-50%);
  }
}
.select_tc {
  position: absolute;
  right: 50%;
  top: 0.28rem;
  margin-right: -1.2rem;
  z-index: 999;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .selected_tc_item {
    border-bottom: none;
    width: 1.43rem;
    background: @tcBgColor;
    box-shadow: none;
  }
}
.reg_hover {
  background-color: @hoverColor;
  color: #ffffff;
}
</style>
