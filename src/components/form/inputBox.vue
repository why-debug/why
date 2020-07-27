<template>
  <!-- input-box - 表单 -->
  <div class="base-input-box"
   :class="{'focus':focusFlag,'warning':warningFlag}"
   :style="'width:'+width+'rem'">
   <input
           v-model="inputValue"
           @blur="blurFunc"
           @focus="focusFunc"
           @input="inputChange"
           :placeholder="placeholder">
   <div class="unit-box">{{unit}}</div>
  </div>
</template>

<script>
    export default {
  name: 'inputBox',
  props: {
    name: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: 'text'
    },
    //小数点位数
    point: {
      default: 0
    },
    maxValue: {
      default: null
    },
    minValue: {
      default: null
    },
    maxLength: {
      default: '100'
    },
    unit: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '1'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: {
      default: ''
    },
    forKey: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      inputValue:'',
      focusFlag:false,
      warningFlag:false,
    }
  },
  mounted() {
    this.inputValue = this.value
  },
  watch: {
    value(val){
      this.inputValue = val;
    },
    inputValue(val){
      //长度限制
      if(val.length > this.maxLength){
        val = val.substring(0,this.maxLength);
        this.inputValue = val
      }
      //数字输入的输入限制
      //输入变化时，根据情况看是否需要矫正输入值
      if(!!this.maxValue && (val)>(this.maxValue)){
        val = this.maxValue
      }
      if(!!this.minValue && val<this.minValue){
        val = this.minValue
      }

      //数字 输入矫正 ,只能输入
      if(this.inputType == 'number'){
        val = val+''
        val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
        val = val.replace(/^\./g,"");  //验证第一个字符是数字而不是.
        val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.

        if(0 == this.point){
          //只能输入整数
          val = val.replace(/[^\d]/g,'');
        }else{
          //限制小数点后位数
          //保留至多两个小数点的数字
          let re =  1;
          if(!!val.toString().split(".")[1] && val.toString().split(".")[1].length>this.point){
            val = val.substring(0,val.length-1);

          }
        }
      }


      //手机号的输入验证
      if(this.inputType == 'tel'){
        val = val.replace(/[^\d]/g,''); //只要数字
        if(val.match(/^(0|86|17951)?(13[0-9]|15[012356789]|16[0-9]|17[678]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/)){
          val = val.trim();
        }else if(val.trim().length == 3 && !val.match(/^13[0-9]|15[0-9]|16[0-9]|17[0-9]|19[0-9]|18[0-9]|14[0-9]$/)){
          val = '';
        }

      }

      this.inputValue = val
      this.$emit("sendData",{
        formKey:this.forKey,
        value:val
      });
    }
  },

  methods: {
    focusFunc(){
      this.focusFlag=true;
      this.warningFlag = false;
    },
    blurFunc(){
      this.focusFlag=false;
      if(this.inputType == 'tel'){
        //号码失去焦点后验证号码
        let val = this.inputValue;
        if(!val.match(/^(13[0-9]|15[0-9]|16[0-9]|17[0-9]|19[0-9]|18[0-9]|14[0-9])[0-9]{8}$/)){
          val = '';
          this.warningFlag = true;
          console.log('请输入正确手机号码');
          this.inputValue = val
          this.$emit("sendData",{
            formKey:this.forKey,
            value:val
          });
        }
      }
    },
    //清空数据
    cleanInputDateFn(){
      this.inputValue='';
    },
    inputChange(){
      this.$emit('inputChange',this.inputValue);
    }
  },
}
</script>

<style lang="less" scoped>
 input::-webkit-outer-spin-button,
 input::-webkit-inner-spin-button {
   -webkit-appearance: textfield;
 }

 input[type="number"] {
   -moz-appearance: textfield;
 }

  .base-input-box{
    overflow: hidden;
    position: relative;
    min-width: 0.7rem;
    height: 0.21rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0.3rem 0 0.1rem;
    border-radius: 0.4rem;
    border: solid 0.01rem #bdc6cf;
    background-color: #fff;
    box-shadow: inset 0 0.01rem 0.05rem 0 rgba(202, 213, 223, 0.73);
    .warning{
      border: solid 0.01rem #FFFFFF;
    }
    .focus{
      border: solid 0.01rem #FFFFFF;
    }
    input{
      display: block;
      width: 100%;
      height: 100%;
      border: none;
      font-size: 0.12rem;
      background-color: #fff;
      outline:none;
      &::placeholder{
        color: #999999;
      }
    }

    .unit-box{
      display: block;
      font-size: 0.12rem;
      color: #999999;
      white-space: nowrap;
    }

  }
</style>
