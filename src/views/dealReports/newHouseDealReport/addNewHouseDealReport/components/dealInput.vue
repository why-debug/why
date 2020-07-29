<template>
  <div>
    <el-input :style="{'width': width}" v-model="nowNumber" @focus="changgeNum">
      <span slot="suffix" v-show="type==1">{{danweiPrice}}/{{danweiArea}}</span>
      <span slot="suffix" v-show="type==2">{{danweiArea}}</span>
      <span slot="suffix" v-show="type==3">{{danweiPrice}}/{{danweiArea}}/{{time}}</span>
    </el-input>
  </div>
</template>
<script>
export default {
  name: "inputBox",
  props: {
    name: {
      type: String,
      default: ""
    },
    inputValue: {},
    type: {}, 
    inputType: {
      type: String,
      default: "text"
    },
    //小数点位数
    point: {
      default: 0
    },
    //是否需要限制输入
    limit: {
      default: 0
    },
    maxValue: {
      default: null
    },
    minValue: {
      default: null
    },
    maxLength: {
      default: "100"
    },
    unit: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "1"
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    value: {
      default: ""
    },
    forKey: {
      type: String,
      default: ""
    },
    nowindex: {},
    danweiPrice: {},
    danweiArea: {},
    time: {}
  },
  data() {
    return {
      nowNumber: "",
      isFoucs: false //是否回去焦点
    };
  },
  mounted() {
    setTimeout(() => {
      this.nowNumber = this.inputValue;
    }, 200);
  },
  watch: {
    inputValue(val) {
      // if (typeof val == "undefined") {
      //   return;
      // }
      this.nowNumber = val;
    },
    nowNumber(val) {
      if (typeof val == "undefined") {
        return;
      }
      //长度限制
      if (val.length > this.maxLength) {
        val = val.substring(0, this.maxLength);
        this.nowNumber = val;
      }
      //数字输入的输入限制
      //输入变化时，根据情况看是否需要矫正输入值
      // if (!!this.maxValue && val > this.maxValue) {
      //   val = this.maxValue;
      // }
      // if (!!this.minValue && val < this.minValue) {
      //   val = this.minValue;
      // }

      //数字 输入矫正 ,只能输入
      if (this.inputType == "number") {
        if (this.limit == 1) {
          this.nowNumber = val;
          this.$emit("sendData", {
            foucs: this.isFoucs,
            index: this.nowindex,
            value: val
          });
          return;
        }
        val = parseFloat(val)
        val = val + "";
        val = val.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        val = val.replace(/^\./g, ""); //验证第一个字符是数字而不是.
        val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.

        if (0 == this.point) {
          //只能输入整数
          val = val.replace(/[^\d]/g, "");
        } else {
          //限制小数点后位数
          //保留至多两个小数点的数字
          let re = 1;
          if (
            !!val.toString().split(".")[1] &&
            val.toString().split(".")[1].length > this.point
          ) {
            val = val.substring(0, val.length - 1);
          }
        }
      }

      this.nowNumber = val;
      this.$emit("sendData", {
        foucs: this.isFoucs,
        index: this.nowindex,
        value: val
      });
    },
    gaibian() {}
  },

  methods: {
    changgeNum() {
      this.isFoucs = true;
      parseFloat;
      if (
        !!this.minValue &&
        parseFloat(this.nowNumber) < parseFloat(this.minValue)
      ) {
        console.log("this.nowNumber:", this.nowNumber);
        console.log("this.minValue:", this.minValue);
        console.log(
          "this.nowNumber < this.minValue:",
          parseFloat(this.nowNumber) < parseFloat(this.minValue)
        );
        this.nowNumber = this.minValue;
        this.$emit("sendData", {
          foucs: this.isFoucs,
          index: this.nowindex,
          value: this.nowNumber
        });
      }
    }
  }
};
</script>