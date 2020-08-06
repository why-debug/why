

<template>
  <div class="select_reg">
    <div @click="chooseInfo" class="selected_item f_r_s">
      <img class="selected_build" :src="imgSrc">
      <div :class="{'selectedTextWhite': selectText && selectText !== defaultText}"
           class="selected_text" :title="selectText || defaultText">{{ selectText || defaultText }}</div>
      <img class="selected_arrow" src="http://cdn.haofang.net/static/newHouseStandardVersion/select/smallsj_200.png">
    </div>

    <!--弹窗-->
    <transition name="el-fade-in">
      <div v-show="showTc" class="select_tc f_c_s">
        <div @click="hideClick()" class="selected_tc_item selected_item f_r_s">
          <img class="selected_build" :src="imgSrc">
          <div class="selected_text">{{ selectText || defaultText }}</div>
          <img class="selected_arrow" src="http://cdn.haofang.net/static/newHouseStandardVersion/select/smallsj_200.png">
        </div>
        <div class="area_tc_cont" @click="WithinLimits">
            <!--<div class="SelectTimeType">
                <el-radio-group v-model="TimeType">
                    <el-radio :label="1">{{TimeTypeList[0]}}</el-radio>
                    <el-radio :label="2">{{TimeTypeList[1]}}</el-radio>
                </el-radio-group>
            </div>-->
            <!-- 2019-07-11 14:37:01;2019-08-11 14:37:01 -->
            <div class="TimeSelect">
                <el-date-picker
                    v-model="Time"
                    :unlink-panels="true"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class=""><button class="SubmitBtn" @click="SubmitBtn">确定</button></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  class PrivateData {
    static timeOutVal = null;
  }

  export default {
    data() {
      return {
        showTc: false,
        selectText: "",
        hoverIndex: null,
        clickShow: false,
        TimeType: 1,
        Time: [],
        Reset:false,
      }
    },

    props: {
      TimeTypeList:{
        type:Array,
        default(){
          return ['创建日期','签约日期']
        }
      },
       // 时间类型
      timeType: {
        type: String|Number,
        default() {
          return ""
        }
      },
      imgSrc: {
        type: String,
        default() {
          return require("../../../assets/main_TJshaixuan/data_200.png");
        }
      },
      imgWidth: {
        type: String,
        default() {
          return "0.15rem";
        }
      },
      imgHeight: {
        type: String,
        default() {
          return "0.15rem";
        }
      },
      // 展示默认文案
      defaultText: {
        type: String,
        default() {
          return "时间";
        }
      },
      // 是否清空
      empty: {
        type: Boolean,
        default() {
          return false;
        }
      },
    },

    watch: {
      TimeTypeList: {
        handler: function(to, from){
          console.log(this.timeTypeList);
        },
        deep: true
      },
      timeType: {
        handler: function () {
          console.log(this.timeType,'时间类型');
        },
        deep: true
      },
      defaultText: {
        handler: function(to, from){
          this.selectText = this.defaultText;
        },
        deep: true
      },
      empty: function(){
        this.Reset = this.empty;
        if(this.Reset){
          this.emptySuccess();
        }
      },
    },
    mounted() {
       document.addEventListener('click', this.handleBodyClick);
      this.selectText = this.defaultText;
    },
    destroyed() {
      document.addEventListener('click', this.handleBodyClick);
    },
    methods: {
      //点击框内
      WithinLimits(){
        this.clickShow = true;
      },
      emptySuccess(){
        this.selectText = '';
        this.TimeType = 1;
        this.Time = '';
        this.Reset = false;
      },
      handleBodyClick() {
        this.Reset = false;
        if (this.clickShow) {
          this.clickShow = false;
          return;
        }
        this.showTc = false;
      },
      hideClick () {
        if(this.selectText == this.defaultText){
          this.Time = '';
          // this.TimeType = 1;
        }
        this.showTc = false;
      },
      // 选择
      chooseInfo() {
        if (this.timeType===''| this.timeType===undefined) {
          this.$erpCommon.toast("请选择日期类型");
          return;
        }

        this.Reset = false;
        this.clickShow = true;
        this.showTc = true;
      },
      SubmitBtn(){

        if(!this.Time || this.Time.length == 0){
          this.$erpCommon.toast("时间为空,请选择时间段..",'error');
          return
        }
        // this.selectText = this.TimeTypeList[this.TimeType-1];
        let typeList = [1,2,]
        
        let endTime = this.Time[1].split(" ")[0];
        let startTime = this.Time[0].split(" ")[0];
        let endDateTime = endTime + ' 23:59:59';
        this.selectText = startTime + "-" + endTime;

        const time = {
          startTime:this.Time[0],
          endTime: endDateTime,
          type:typeList[this.TimeType-1],
        }
        setTimeout(()=>{
            this.showTc = false;
            this.$emit("upDataTime", time);
        },500)
      }
    }
  }
</script>

<style lang="less">
  .SelectTimeType .el-radio__inner::after{
    width: 4px!important;
    height: 4px!important;
    background-color: #409EFF!important;
  }
  .SelectTimeType .el-radio__input.is-checked .el-radio__inner{
    background-color: #ffffff!important;
  }
  .el-range-editor--small .el-range-separator{
    position: absolute;
    top: 0;
    margin-left: 1.23rem;
    left: 0;
    right: 0;

  }
  .el-range-editor--small .el-range-input:nth-child(2){
    margin-left: 0.1rem;
  }
  .el-range-editor--small .el-range-input{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin-left: 1.45rem;
  }
</style>
<style scoped>
.el-range-editor--small .el-range-input{
  font-size: 0.12rem;
}
.el-range__close-ico{
  width: 15px!important;
}
.SubmitBtn{
  font-size: 0.14rem;
  padding: 0.02rem 0.1rem;
  border-radius: 0.03rem;
  border-style: none;
  border: 0.01rem solid #028FED;
  background-color: #D9F1FE;
  color: #028FED;
  align-items: flex-end;
  position: absolute;
  right: 0.1rem;
  margin-top: 0.1rem;
}
.el-radio{
    margin: 0!important;
}
.SelectTimeType{
    
    margin-top: 0.08rem;
}
.SelectTimeType .el-radio-group{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap:wrap;
}
.SelectTimeType .el-radio__input{
  height: 0.25rem!important;
}
.SelectTimeType .el-radio{
  font-size: 0.18rem;
  width: 1.5rem;
  padding-left: 4%;
  line-height: 0.35rem;
  height: 0.35rem;
  float: left;
  margin-top: 0.1rem!important;
  box-sizing: border-box;
}
.area_tc_cont{
    position: relative;
    width: 3.1rem;
    height: 1rem;
    background-color: #d9f1fe;
    box-shadow: 0.005rem 0.0125rem 0 0.0125rem rgba(0, 0, 0, 0.25);
    padding-top: 0.01rem;
}
.TimeSelect{
    width: 3.1rem;
    height: 0.33rem;
    position: relative;
    margin-top: 0.23rem;
}
.TimeSelect .el-date-editor--daterange.el-input__inner{
    width: 2.9rem!important;
    position: absolute;
    top: 0;
    left: 0.1rem;
}
</style>
<style scoped lang="less">
  @import "../../../style/select";
  @desColor : #9ba792;

  .select_reg{
    width: @width;
    position: relative;
    cursor: pointer;
    &::after{
      content: "";
      background-image: linear-gradient(#2398ee, #015796, #2398ee);
      width: 0.01rem;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
  .selected_item{
    background: @bgColor;
    height: 0.33rem;
    line-height: 0.33rem;
    width: 100%;
    box-shadow: 0 0.01rem 0 0
    rgba(255, 255, 255, 0.3);
    position: relative;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid @borderBottomColor;
    .selected_build{
      margin: auto 0.04rem auto 0.04rem;
      flex-shrink: 0;
      width: 0.15rem;
      height: 0.15rem;
      display: flex;
    }
    .selected_arrow{
      flex-shrink: 0;
      width: 0.10rem;
      position: absolute;
      right: 0.1rem;
      top: 50%;
      transform: translateY(-50%);
    }
    .selected_text{
      font-weight: bold;
      font-family: SimSun;
      font-size: 0.12rem;
      font-stretch: normal;
      letter-spacing: 0;
      color: #00223a;
      text-align: left;
      // max-width: calc(100% - 0.26rem);
      max-width: 1.2rem;
      padding-right: 0.15rem;
      box-sizing: border-box;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .selectedTextWhite{
      color: #ffffff;
      font-weight: bold;
    }
    .selected_del{
      flex-shrink: 0;
      width: 0.15rem;
      position: absolute;
      right: 0.05rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .select_tc{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .selected_tc_item{
      border-bottom: none;
      width: 1.43rem;
      background: @tcBgColor;
      box-shadow: none;
    }
  }
  .reg_hover{
    background-color: @hoverColor;
    color: #ffffff;
  }
</style>
