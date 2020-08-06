<template>
  <!-- date-picker - 表单 -->
  <div class="date-picker-box" :style="'width:'+width+'rem'">
    <div class="date-icon"></div>
    <!-- 单选 -->
    <date-picker v-if="!range"
     v-model="value1" 
     type="date"
     :format="format"
     :value-type="valueType"
     :append-to-body="false"
     :range="range"
     :inline="false"
     :clearable="false"
     :open.sync="openFlag"
     @change="handleChange"
     :range-separator="rangeSeparator"
     popup-class="popup-class"
     >
     <div slot="icon-calendar"></div>
    </date-picker>

    <!-- 范围 -->
    <date-picker v-else=""
     v-model="rangeValue1" 
     type="date"
     :value-type="valueType"
     :format="format"
     :append-to-body="false"
     :range="range"
     :inline="false"
     :clearable="false"
     :open.sync="openFlag"
     @change="handleChange"
     :range-separator="rangeSeparator"
     popup-class="popup-class"
     >
     <div slot="icon-calendar"></div>
    </date-picker>

  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import 'vue2-datepicker/locale/zh-cn';

export default {
  name: 'datePickerBox',
  components:{
    DatePicker
  },
  props: {
    width: {
      type: String,
      default: '1'
    },
    valueType: {
      type: String,
      default: 'format'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    rangeSeparator: {
      type: String,
      default: '至'
    },
    
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    dateValue: {
      type: String,
      default: ''
    },
    range: {
      type: Boolean,
      default: false
    },
    startValue: {
      type: String,
      default: ''
    },
    endValue: {
      type: String,
      default: ''
    },
    forKey: {
      type: String,
      default: ''
    },
    forKeyStart: {
      type: String,
      default: ''
    },
    forKeyEnd: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      openFlag:false,
      value1:'',

      rangeValue1:'',
      startValue1:'',
      endValue1:'',
    }
  },
  watch: {
    startValue(val){
      this.initDate()
    },
    dateValue(val){
      this.initDate()
    }
  },
 
  methods: {
    //日期初始化
    initDate(){
      this.startValue1 = this.startValue
      this.endValue1 = this.endValue
      this.rangeValue1 = [this.startValue1,this.endValue1]
      this.value1 = this.dateValue
    },
    handleChange(res){
      if(!this.range){
        this.$emit("sendData",{formKey:this.forKey,value:res});
      }else{
        this.$emit("sendData",{formKey:this.forKeyStart,value:res[0]});
        this.$emit("sendData",{formKey:this.forKeyEnd,value:res[1]});
      }
    },
  },
}
</script>

<style lang="css" scoped>
  /* 覆盖 datepicker 原有样式 */
  .mx-datepicker{
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
  }
  .mx-icon-calendar{
    display: none;
  }

  .mx-input-wrapper{
    display: none;
    opacity: 0;
  }
  .mx-input{
    width: 100%;
    height: 100%;
    border: none;
  }
</style>

<style lang="scss" scoped>
  .date-picker-box{
    // width: 1.47rem;
      height: 0.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      box-shadow: inset 0rem 0.01rem 0.05rem 0rem 
        rgba(202, 213, 223, 0.73);
      border-radius: 0.03rem;
      border: solid 0.01rem #bdc6cf;
      padding-left: 0.1rem;
      padding-right: 0.08rem;
      box-sizing: border-box;
      position: relative;
      
      .date-icon{
        position: absolute;
        right: 0.08rem;
        top: 50%;
        transform: translateY(-50%);
        width: 0.12rem;
        height: 0.12rem;
        background: url("../../assets/images/public/datePicker_200.png") center center no-repeat;
        background-size: 100% 100%;
        z-index: 10;
      }
  }

  .popup-class{
    width: 50px;
  }

  
</style>