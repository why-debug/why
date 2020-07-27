

<template>
  <div class="select_reg">
    <div @click="chooseInfo" class="selected_item f_r_s">
      <img class="selected_build" :src="imgPath">
      <div :class="{'selectedTextWhite': selectText && selectText !== defaultText}"
           class="selected_text">{{ selectText || defaultText }}</div>
      <img class="selected_arrow" src="http://cdn.haofang.net/static/newHouseStandardVersion/select/smallsj_200.png">
    </div>

    <!--弹窗-->
    <transition name="el-fade-in">
      <div v-show="showTc" class="select_tc f_c_s">
        <div class="selected_tc_item selected_item f_r_s">
          <img class="selected_build" :src="imgPath">
          <div class="selected_text">{{ selectText || defaultText }}</div>
          <img class="selected_arrow" src="http://cdn.haofang.net/static/newHouseStandardVersion/select/smallsj_200.png">
        </div>

        <div class="area_tc_cont">
          <div @mouseenter="enterRegCheck(item, index)" v-for="(item, index) in list"
               :class="{'reg_hover' : (index === hoverIndex)}"
               @click.stop="clickItem(item)"
               :key="index">{{ item[textKey] }}</div>
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
        Reset:false,
        imgPath: '',
      }
    },

    props: {
      imgSrc: {
        type: String,
        default() {
          return 'mendian_200'
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
          return "状态";
        }
      },
      list: {
        type: Array,
        default() {
          return [];
        }
      },
      // 列表文案key
      textKey: {
        type: String,
        default() {
          return "text";
        }
      },
      // 当前文案
      nowKey: {
        type: String,
        default() {
          return "text";
        }
      },
      // 来源
      formResource: {
        type: String,
        default: ''
      },
      // 是否重置
      empty: {
        type: Boolean,
        default: false
      },
    },

    watch: {
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
      nowKey: {
        handler: function(to, from){
          console.log(to)
          console.log(from)
          if(to==''){
            this.selectText = '';
          }
        },
        deep: true
      },
    },
    created(){
    //初始化图片路径
    this.imgPath = require(`../../assets/main_TJshaixuan/${this.imgSrc}.png`);
    },
    mounted() {
      document.addEventListener('click', this.handleBodyClick);
      this.selectText = this.defaultText;
    },
    destroyed () {
      document.removeEventListener('click', this.handleBodyClick);
    },

    methods: {
      handleBodyClick() {
        this.Reset = false;
        if (this.clickShow) {
          this.clickShow = false;
          return;
        }

        this.showTc = false;
      },
      emptySuccess(){
        this.selectText = '';
        this.Reset = false;
      },
      // 选择
      chooseInfo() {
        this.clickShow = true;
        this.showTc = true;
      },

      enterRegCheck(item, index) {
        this.hoverIndex = index;
      },

      clickItem(item) {
        this.selectText = item[this.textKey] === "全部" ? "" : item[this.textKey] || "";
        this.showTc = false;
        item["formResource"] = this.formResource;
        this.$emit("onSelectChange", item);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/select";
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
    .selectedTextWhite{
      color: #ffffff;
      // font-weight: bold;
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
    z-index: 999;
    width: @contWidth;
    background: @tcBgColor;
    box-shadow: 0.005rem 0.009rem 0.03rem 0
    rgba(0, 0, 0, 0.45);
    .selected_tc_item{
      border-bottom: none;
      width: 100%;
      background: @tcBgColor;
      box-shadow: none;
    }
    .area_tc_cont{
      width: 100%;
      max-height: 3.63rem;
      overflow-y: auto;
      div{
        width: 100%;
        margin-right: 0;
        height: 0.3rem;
        line-height: 0.3rem;
        padding-left: 0.11rem;
        box-sizing: border-box;
        align-items: center;
        font-size: 0.12rem;
        border-bottom: 1px solid @borderColor1;
      }
    }
  }
  .reg_hover{
    background-color: @hoverColor;
    color: #ffffff;
  }
</style>
